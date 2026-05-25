import { COMMANDS } from "@/data/CommandsData";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const CommandPaletteModal = ({ onClose, isOpen, searchRef,recent, setRecent }) => {
  const [inputVal, setInputVal] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
    const filtered = COMMANDS.filter((c) =>
    c.name.toLowerCase().includes(inputVal.toLowerCase()),
  );

  const displayed = [
  ...recent.filter(c => c.name.toLowerCase().includes(inputVal.toLowerCase())),
  ...filtered.filter(c => !recent.find(r => r.id === c.id))
]


  useEffect(() => {
    if (isOpen) searchRef.current?.focus();
  }, [isOpen, searchRef]);

  const handleNavigation = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => {
        if (prev === null) return 0
        if (prev === filtered.length - 1) return 0;
        return prev + 1
      });
    }
    if (e.key === "ArrowUp") {
     setActiveIndex((prev) => {
        if (prev === null) return 0
        if (prev === 0) return filtered.length - 1;
        return prev - 1
      });
    }
   if (e.key === 'Enter') {
  onClose()
  setInputVal('')
  setActiveIndex(0)
  setRecent(prev => [filtered[activeIndex], ...prev.filter(c => c.id !== filtered[activeIndex].id)])
  console.log('Executing:', filtered[activeIndex].name)
}
  };
  if (!isOpen) return null;
  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-160 h-120 rounded-2xl p-5 shadow border-gray-200 bg-mauve-100 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={searchRef}
          className="border w-full border-mauve-500 rounded-2xl p-3 text-2xl"
          placeholder="Type here..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => handleNavigation(e)}
        />
        <div className="flex flex-col gap-4 p-5 overflow-scroll">
          {displayed.map((command, i) => {
            return (
              <p key={command.id} className={`text-[20px] p-2 rounded ${i === activeIndex ? 'bg-mauve-300' : ''}`}>
                {command.icon} {command.name} {command.shortcut}
              </p>
            );
          })}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default CommandPaletteModal;
