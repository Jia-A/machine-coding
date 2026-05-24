"use client";
import React, { useEffect, useState } from "react";

type DataRes = {
  word: string;
  score: number;
}[];

const DebounceSearch = () => {
  const [inputVal, setInputVal] = useState("");
  const [debounceVal, setDebounceVal] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [data, setData] = useState<DataRes>();
  useEffect(() => {
    const controller = new AbortController();
    if (!debounceVal) return;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.datamuse.com/words?sp=${debounceVal}*&max=20`,
          { signal: controller.signal },
        );
        const results = await res.json();
        if (results.length === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
        }
        setData(results);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [debounceVal]);

  useEffect(() => {
    const t = setTimeout(() => setDebounceVal(inputVal), 300);
    return () => clearTimeout(t);
  }, [inputVal]);

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setLoading(false);
      setNoResults(false);
      setError(false);
      setData([]);
    }
    setInputVal(e.target.value);
  };

  console.log(data);
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="search">Type here</label>
      <input
        className="border border-amber-950 p-2"
        name="search"
        type="text"
        value={inputVal}
        onChange={(e) => handleChange(e)}
      />
      <div>
        {data?.map((item) => (
          <div key={`${item.score} ${item?.word}`}>{item.word}</div>
        ))}
      </div>
      {error && (
        <div>
          An error occured, please try again{" "}
          <button onClick={() => setError(false)}>Retry</button>
        </div>
      )}
      {loading && <div>Loading...</div>}
      {noResults && <div>No results found, try to find something else</div>}
    </div>
  );
};

export default DebounceSearch;
