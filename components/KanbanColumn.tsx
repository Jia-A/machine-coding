"use client";
import { useState, useRef } from "react";
import KanbanCard from "./KanbanCard";

const KanbanColumn = ({ column, data, setData }) => {
  const inputRef = useRef(null);
  const descriptionRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const handleOnDrop = (e) => {
    const cardId = e.dataTransfer.getData("cardId");
    const sourceColumnId = e.dataTransfer.getData("sourceColumnId");
    console.log(cardId, sourceColumnId);
    setData((prev) => {
      const draggedCard = prev
        .find((col) => col.id === Number(sourceColumnId))
        ?.cards.find((card) => card.id === Number(cardId));

      if (!draggedCard) return prev;

      return prev.map((col) => {
        if (col.id === column.id) {
          return { ...col, cards: [...col.cards, draggedCard] };
        }
        if (col.id === Number(sourceColumnId)) {
          return {
            ...col,
            cards: col.cards.filter((card) => card.id !== Number(cardId)),
          };
        }
        return col;
      });
    });
  };

  const handleAdd = () => {
    const title = inputRef.current.value.trim();
    const description = descriptionRef.current.value.trim();
    if (!title) return;

    const card = {
      title,
      description,
      id: Math.floor(Math.random() * 100000),
    };

    setData((prev) =>
      prev.map((col) => {
        if (col.id === column.id) {
          return { ...col, cards: [...col.cards, card] };
        }
        return col;
      }),
    );

    inputRef.current.value = "";
    descriptionRef.current.value = "";
    setIsAddOpen(false);
  };
  return (
    <div
      style={{ backgroundColor: column.background }}
      className={`p-10 border border-gray-100 shadow-2xl min-h-80 min-w-96 rounded-2xl ${isDragOver && "border-gray-600"}`}
      onDrop={(e) => {
        handleOnDrop(e);
        setIsDragOver(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setIsDragOver(true)}
      onDragLeave={() => setIsDragOver(false)}
    >
      <h2 className="text-[20px]">{column.title}</h2>
      <div className="flex flex-col gap-3">
        {column.cards.map((card) => {
          return <KanbanCard key={card.id} card={card} columnId={column.id} />;
        })}
      </div>
      {isAddOpen && (
        <div>
          <label htmlFor="add-card">Title and description below</label>
          <div className="flex">
            <input
              name="add-card"
              placeholder="Title"
              ref={inputRef}
              id={column.id}
              defaultValue={""}
              className="rounded p-2 w-full border border-black"
              type="text"
            />
            <input
              name="add-card"
              placeholder="Description"
              ref={descriptionRef}
              id={column.id}
              defaultValue={""}
              className="rounded p-2 w-full border border-black"
              type="text"
            />
          </div>
        </div>
      )}

      <button
        className="cursor-pointer p-2 m-2 border border-black rounded"
        onClick={isAddOpen ? handleAdd : () => setIsAddOpen(true)}
      >
        Add a new item
      </button>
      {isAddOpen && (
        <button
          className=" bg-red-500 cursor-pointer p-2 m-2 border border-black rounded-full"
          onClick={() => setIsAddOpen(false)}
        >
          X
        </button>
      )}
    </div>
  );
};

export default KanbanColumn;
