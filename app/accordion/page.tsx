"use client";
import React, { useState } from "react";
import accordionData from "@/data/AccordionData";
import AccordionCard from "@/components/AccordionCard";

const Accordion = () => {
  const [isOpen, setIsOpen] = useState(0);
  return (
    <div className="flex flex-col gap-4 m-4">
      {accordionData.map((item) => {
        return (
          <AccordionCard
            key={item.question}
            item={item}
            setOpen={setIsOpen}
            open={isOpen}
          />
        );
      })}
    </div>
  );
};

export default Accordion;
