"use client";

import { useToast } from "@/providers/ToastProvider";
import { HeartIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

const mockApi = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) reject(new Error("Failed"));
      else resolve("ok");
    }, 1000);
  });
};

const OptimisticButton = () => {
  const [counter, setCounter] = useState(24);
  const [liked, setLiked] = useState(false);

  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    const prevState = { counter: counter, liked: liked };
    setLiked((prev) => !prev);
    setCounter(liked ? counter - 1 : counter + 1);
    setLoading(true);

    try {
      await mockApi();
    } catch {
      // rollback
      setLiked(prevState.liked);
      setCounter(prevState.counter);
      showToast({
        message: "There's been some error, last action not successful.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <button disabled={loading} onClick={() => handleLike()}>
        <HeartIcon
          width={30}
          height={30}
          className={liked ? "text-red-500" : "text-red-50 stroke-red-600 "}
          strokeWidth="0.5"
        />
      </button>

      <div>{counter}</div>

      {loading && <div>Loading</div>}
    </div>
  );
};

export default OptimisticButton;
