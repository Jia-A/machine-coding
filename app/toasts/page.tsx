"use client";
import Toasts from "@/components/Toast";
import { useToast } from "@/providers/ToastProvider";

const ToastContainer = () => {
  const { toasts } = useToast();
  return (
    <div className="fixed top-0 right-0">
      {toasts.map((toast) => {
        return (
          <Toasts
            message={toast.message}
            id={toast.id}
            key={toast.id}
            type={toast.type}
          />
        );
      })}
    </div>
  );
};

export default ToastContainer;
