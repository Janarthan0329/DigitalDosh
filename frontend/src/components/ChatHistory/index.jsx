import React from "react";
import ReactMarkdown from "react-markdown";
import "../../pages/ChatBot/ChatBot.css";

const ChatHistory = ({ chatHistory }) => {
  return (
    <div className="chat-history">
      {chatHistory.map((message, index) => (
        <div
          key={index}
          className={`message-container ${
            message.type === "user" ? "user-message" : "bot-message"
          }`}
        >
          {message.type === "user" && (
            <span className="user-label">You:</span>
          )}

          <div>
            <ReactMarkdown>{message.message}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
