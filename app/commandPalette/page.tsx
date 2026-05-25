"use client";
import CommandPaletteModal from "@/components/CommandPaletteModal";
import React, { useEffect, useRef, useState } from "react";

const CommandPalettePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
    const [recent, setRecent] = useState([])
  const handleClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open</button>
      <CommandPaletteModal
        onClose={handleClose}
        isOpen={isOpen}
        searchRef={searchRef}
        recent = {recent}
        setRecent = {setRecent}
      />
    </div>
  );
};

export default CommandPalettePage;
