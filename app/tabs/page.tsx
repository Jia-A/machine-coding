"use client";
import TabPage from "@/components/TabPage";
import accordionData from "@/data/AccordionData";
import { useToast } from "@/providers/ToastProvider";
import { useEffect, useRef, useState } from "react";

const TabComp = () => {
  const [selected, setSelected] = useState(1);
  const selectedData = accordionData.find((item) => selected === item?.id);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e);
      let currentIndex = accordionData.findIndex(
        (item) => selected === item?.id,
      );
      const last = accordionData.length - 1;
      if (e.code === "ArrowLeft") {
        if (currentIndex === 0) {
          currentIndex = last;
          setSelected(accordionData[currentIndex].id)
        } else {
          currentIndex = currentIndex - 1;
          setSelected(accordionData[currentIndex].id)
        }
      }
       if (e.code === "ArrowRight") {
        if (currentIndex === last) {
          currentIndex = 0;
          setSelected(accordionData[currentIndex].id)
        } else {
          currentIndex = currentIndex + 1;
          setSelected(accordionData[currentIndex].id)
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selected]);

  const { showToast } = useToast()

  useEffect(()=>{
    showToast({ message: "Hello!", type: "success" })
  }, [])



  return (
    <div className="m-2 p-2">
      <div className="flex gap-1">
        {accordionData.map((tab) => {
          console.log(selected);
          return (
            <button
              key={tab.id}
              id="tab-button"
              onClick={() => setSelected(tab.id)}
              className={`p-4 border-b border-black cursor-pointer hover:bg-gray-300 ${selected === tab.id && "bg-gray-300 border-b-2"}`}
            >
              {tab.question}
            </button>
          );
        })}
      </div>
      <TabPage tabData={selectedData?.answer} />
    </div>
  );
};

export default TabComp;
