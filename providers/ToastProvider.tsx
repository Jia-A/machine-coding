'use client'
import { createContext, useContext, useReducer } from "react";

type ToastContextType = {
  toasts: {
    id: number;
    message: string;
    type: "error" | "success" | "warning" | "info";
  }[];
  showToast: ({ message, type }: { message: string; type: string }) => void;
  dispatch: React.Dispatch<{ type: string; payload: any }>;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};

export const ToastProvider = ({ children }) => {
  const toastReducer = (state, action) => {
    switch (action.type) {
      case "ADD": {
        const updated = state.length >= 5 ? state.slice(1) : state;
        return [...updated, action.payload];
      }
      case "REMOVE": {
        return state.filter((t) => t.id !== action.payload);
      }
      default:
        return state;
    }
  };
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const showToast = ({ message, type }) => {
    dispatch({ type: "ADD", payload: { id: Date.now(), message, type } });
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, dispatch }}>
      {children}
    </ToastContext.Provider>
  );
};
