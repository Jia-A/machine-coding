"use client";
import { useEffect, useRef, useState } from "react";
import CarouselCard from "./CarouselCard";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const handleClick = (id) => {
    setCurrentIndex(id);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") {
        if (currentIndex === 0) {
          setCurrentIndex(images.length - 1);
          return;
        }

        setCurrentIndex(currentIndex - 1);
      }
      if (e.key === "ArrowRight") {
        if (currentIndex === images.length - 1) {
          setCurrentIndex(0);
          return;
        }

        setCurrentIndex(currentIndex + 1);
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [currentIndex, images.length]);

  const handleLeft = () => {
    if (currentIndex === 0) {
      setCurrentIndex(images.length - 1);
      return;
    }

    setCurrentIndex(currentIndex - 1);
  };
  const handleRight = () => {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
      return;
    }

    setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [images.length]);
  return (
    <div className="flex flex-col gap-3 justify-center border border-gray-400 shadow rounded-2xl p-4">
      <div
        className="flex gap-4 self-center"
        onMouseEnter={() => clearInterval(intervalRef.current)}
        onMouseLeave={() => {
          intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) =>
              prev === images.length - 1 ? 0 : prev + 1,
            );
          }, 4000);
        }}
      >
        <button className="cursor-pointer">
          <ArrowLeftIcon width={30} height={30} onClick={handleLeft} />{" "}
        </button>
        <CarouselCard key={currentIndex} image={images[currentIndex]} />
        <button className="cursor-pointer">
          <ArrowRightIcon width={30} height={30} onClick={handleRight} />{" "}
        </button>
      </div>

      <div className="flex gap-2 self-center">
        {Array(images.length)
          .fill(0)
          .map((_, i) => {
            return (
              <div
                key={i}
                className={`cursor-pointer w-3 h-3 rounded-full ${currentIndex === i ? "bg-gray-800" : "bg-gray-300"}`}
                onClick={() => handleClick(i)}
              ></div>
            );
          })}
      </div>
    </div>
  );
};

export default Carousel;
