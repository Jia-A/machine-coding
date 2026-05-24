'use client'
import { useState } from "react";

const KanbanCard = ({
  card,
  columnId,
}: {
  card: { title: string; description: string; id: number };
  columnId: number;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const handleDragStart = (e) => {
    e.dataTransfer.setData("cardId", card.id);
    e.dataTransfer.setData("sourceColumnId", columnId);
  };
  return (
    <div
      className={`flex flex-col gap-3 p-4 border border-gray-200 shadow min-h-11 min-w-96 rounded-2xl m-4 ${isDragging && "opacity-50"}`}
      onDragStart={(e) => {
        handleDragStart(e);
        setIsDragging(true)
      }}
      onDragEnd={()=> setIsDragging(false)}
      draggable={true}
    >
      <span>{card.title}</span>
      <p>{card.description}</p>
    </div>
  );
};

export default KanbanCard;
