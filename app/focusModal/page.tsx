"use client";
import { Modal } from "@/components/Modal";
import { useState } from "react";

const FocusModal = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
      setOpen(false);
  };

  return (
    <div>
      <button className="cursor-pointer" onClick={() => setOpen(true)}>
        Open modal
      </button>
      {open && <Modal onClose={handleClose}/>}
    </div>
  );
};

export default FocusModal;
