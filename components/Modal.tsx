"use client";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ModalType = {
  onClose: () => void;
};
const focusableSelectors =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export const Modal = ({ onClose }: ModalType) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
        return;
      }
      if (e.key === "Tab") {
        const focusable =
          modalRef.current?.querySelectorAll(focusableSelectors);
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0] as HTMLElement;
        const last = focusable[focusable.length - 1] as HTMLElement;
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

useEffect(() => {
  const timer = setTimeout(() => {
    const focusable = modalRef.current?.querySelectorAll(focusableSelectors)
    if (focusable && focusable.length > 0) {
      (focusable[0] as HTMLElement).focus()
    }
  }, 10)

  return () => clearTimeout(timer)
}, [])
  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <p>Modal content</p>
        <button className="cursor-pointer" onClick={onClose}>
          Close
        </button>
        <button>Hi</button>
        <button>Hello</button>
        <button>ki</button>
      </div>
    </div>,
    document.body,
  );
};
