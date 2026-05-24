"use client";

import { useEffect, useState } from "react";

type DataRes = {
  word: string;
  score: number;
}[];

const Autocomplete = () => {
  const [inputVal, setInputVal] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [debounceVal, setDebounceVal] = useState(inputVal);
  const [data, setData] = useState<DataRes>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const handleInput = (e) => {
    if (e.target.value === "") {
      setInputVal("");
      setIsOpen(false);
      setData([]);
      return;
    }
    setInputVal(e.target.value);
    setIsOpen(true);
  };

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      if (debounceVal === "") return;
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(
          `https://api.datamuse.com/words?sp=${debounceVal}*&max=5`,
          { signal: controller.signal },
        );
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [debounceVal]);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceVal(inputVal), 300);
    return () => clearTimeout(timer);
  }, [inputVal]);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClose);
    return () => document.removeEventListener("click", handleClose);
  }, []);

  const handleNavigation = (e) => {
    if (e.key === "Escape") {
      handleClose();
    }
    if (e.key === "ArrowDown") {
      setCurrentIndex((prev) => {
        if (prev === null) return 0;
        if (prev === data.length - 1) return 0;
        return prev + 1;
      });
    }
    if (e.key === "ArrowUp") {
      setCurrentIndex((prev) => {
        if (prev === null) return 0;
        if (prev === 0) return data.length - 1;
        return prev - 1;
      });
    }
    if (e.key === "Enter") {
      if (currentIndex !== null) {
        setInputVal(data[currentIndex].word);
        setIsOpen(false);
        setCurrentIndex(null);
      }
    }
  };

  const handleSuggestionSelection = (word: string) => {
    setInputVal(word);
    setIsOpen(false);
  };

  const highlightMatch = (word: string, query: string) => {
    const index = word.toLowerCase().indexOf(query.toLowerCase());
    const before = word.slice(0, index);
    const match = word.slice(index, index + query.length);
    const after = word.slice(index + query.length);

    return (
      <span>
        {before}
        <strong>{match}</strong>
        {after}
      </span>
    );
  };

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <label htmlFor="search">Type here</label>
      <input
        name="search"
        value={inputVal}
        className="p-2 m-2 rounded w-1/2 border border-amber-950"
        onChange={(e) => handleInput(e)}
        onKeyDown={(e) => handleNavigation(e)}
      />
      {loading && <div>Loading, please wait</div>}
      {error && (
        <div>
          Error happened, please try again{" "}
          <button onClick={() => setError(false)}>Retry</button>
        </div>
      )}
      {isOpen && (
        <div className="flex flex-col gap-2 absolute top-full left-0 w-full">
          {data?.length === 0 && !loading && inputVal !== "" ? (
            <div>No results</div>
          ) : (
            data?.map((item, index) => {
              const active = currentIndex === index;
              return (
                <div
                  onClick={() => handleSuggestionSelection(item?.word)}
                  className={`${active ? "bg-gray-300" : ""}`}
                  key={item.word}
                >
                  {highlightMatch(item.word, inputVal)}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
