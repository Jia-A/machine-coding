import React from "react";
import { Message } from "./ChatUI";

const MessageCard = ({
  message,
  handleRetry,
}: {
  message: Message;
  handleRetry: (message: Message) => void;
}) => {
  return (
    <div
      className={`flex gap-2 ${message.sender === "me" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`p-3 rounded border flex flex-col gap-2  ${message.sender === "me" ? "right-0 bg-mauve-300" : "left-0 bg-mist-400 "} ${message.status === "failed" ? "border-red-500" : message.status === "sending" ? "border-amber-400" : "border-mauve-100"}`}
      >
        <p>{message.content}</p>
        {message.timestamp && (
          <span className="text-xs text-black">
            Sent : {message.timestamp}
          </span>
        )}
      </div>
      {message.status === "sending" && (
        <span className="bg-amber-100 p-1 text-sm rounded border border-amber-400 cursor-pointer self-center">
          Sending...
        </span>
      )}
      {message.status === "failed" && (
        <button
          onClick={() => handleRetry(message)}
          className="bg-red-200 p-1 text-sm rounded border border-red-700 cursor-pointer self-center"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default MessageCard;
