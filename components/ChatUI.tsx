"use client";
import { useEffect, useRef, useState } from "react";
import MessageCard from "./MessageCard";
export type Message = {
  id: number;
  content: string;
  sender: string;
  status: "sent" | "sending" | "failed";
  timestamp?: string;
};
const initialState: Message[] = [
  {
    id: 1,
    content: "Hey, how are you?",
    sender: "them",
    status: "sent",
   timestamp: new Date().toISOString()
  },
  {
    id: 2,
    content: "Did you finish the task?",
    sender: "me",
    status: "sent",
    timestamp: new Date().toISOString()
  },
];

const mockApi = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) reject(new Error("Failed"));
      else resolve("ok");
    }, 1000);
  });
};


const ChatUI = () => {
  const [messages, setMessages] = useState<Message[]>(initialState);
  const [inputVal, setInputVal] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null)
  const handleSend = async () => {
    if (inputVal !== "") {
      const message: Message = {
        id: Date.now(),
        content: inputVal,
        sender: "me",
        status: "sending",
        timestamp: undefined,
      };
      setMessages((prev) => [...prev, message]);
      setInputVal("");
      try {
        await mockApi();
        setMessages((prev) =>
          prev.map((msg) =>
            message.id === msg.id
              ? { ...msg, status: "sent", timestamp: new Date().toISOString() }
              : msg,
          ),
        );
      } catch {
        setMessages((prev) =>
          prev.map((msg) =>
            message.id === msg.id
              ? { ...msg, status: "failed", timestamp: undefined }
              : msg,
          ),
        );
      }
    }
  };

  const handleRetry = async (message: Message) => {
    console.log("here");
    setMessages((prev) =>
      prev.map((msg) =>
        message.id === msg.id ? { ...msg, status: "sending" } : msg,
      ),
    );
    try {
      await mockApi();
      setMessages((prev) =>
        prev.map((msg) =>
          message.id === msg.id
            ? { ...msg, status: "sent", timestamp: new Date().toISOString() }
            : msg,
        ),
      );
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          message.id === msg.id
            ? { ...msg, status: "failed", timestamp: undefined }
            : msg,
        ),
      );
    }
  };

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  return (
    <div className="relative min-h-[90vh] w-screen">
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4">
        {messages.map((message: Message) => {
          return (
            <MessageCard
              key={message.id}
              message={message}
              handleRetry={handleRetry}
            />
          );
        })}
      </div>
      <footer className="border-t p-3 flex gap-2" ref={scrollRef}>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type here"
          className="p-4 border border-mauve-400 m-3 w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              return handleSend();
            }
          }}
        />
        <button
          onClick={handleSend}
          className="border border-mauve-500 bg-mauve-200 p-3 self-center"
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default ChatUI;
