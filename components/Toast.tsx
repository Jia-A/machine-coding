import { useToast } from "@/providers/ToastProvider";
import { useEffect, useRef } from "react";

const Toasts = ({
  message,
  type,
  id,
}: {
  message: string;
  type: "error" | "success" | "warning" | "info";
  id: number;
}) => {
  const { dispatch } = useToast();
  const timerRef = useRef<any>(null);
  const startTimerRef = useRef<any>(null);
  const endTimerRef = useRef<any>(null);

  const colorMap = {
    error: "bg-red-300",
    success: "bg-green-300",
    warning: "bg-orange-300",
    info: "bg-blue-300",
  };

  const colorClass = colorMap[type];
  const handleRemove = () => {
    dispatch({ type: "REMOVE", payload: id });
  };

  useEffect(() => {
    startTimerRef.current = Date.now();
    endTimerRef.current = 3000;
    timerRef.current = setTimeout(() => handleRemove(), 3000);
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(timerRef.current);
    endTimerRef.current =
      endTimerRef.current - (Date.now() - startTimerRef.current);
  };

  const handleMouseLeave = () => {
    startTimerRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      handleRemove();
    }, endTimerRef.current);
  };
  return (
    <div
      className={`flex justify-between rounded p-4 m-2 border border-gray-300 shadow-olive-50 ${colorClass}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p>{message}</p>
      <button onClick={handleRemove}>x</button>
    </div>
  );
};

export default Toasts;
