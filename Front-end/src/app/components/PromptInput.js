"use client";
import { useState, useRef, useEffect } from "react";
import Button from "./Button";

export default function PromptInput() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);
  let inputEmpty = inputValue.trim().length === 0;

  async function handleSubmit() {
    const trimmedInput = inputValue.trim();
    if (trimmedInput.length > 0) {
      try {
        const botResponse = await fetchBotResponse(trimmedInput);
        const newMessages = [
          ...messages,
          { id: messages.length + 1, text: trimmedInput, sender: "user" },
          { id: messages.length + 2, text: botResponse, sender: "bot" },
        ];
        setMessages(newMessages);
        setInputValue("");
      } catch (error) {
        console.error("Failed to fetch bot response:", error);
      }
    }
  }
  
  async function fetchBotResponse(query) {
    const searchURL = `http://localhost:3000/frontend/get_query?query=${encodeURIComponent(query)}`;
  
    try {
      const response = await fetch(searchURL);
      if (!response.ok) throw new Error(response.statusText);
      const json = await response.json();
      return json.message;
    } catch (error) {
      console.error("Error fetching bot response:", error);
      throw error; // Rethrow the error so handleSubmit can catch it
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  // Automatically scroll to the bottom of the chat on new message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const containerHeight = inputEmpty ? "h-24" : "h-60";
  const innerContainerHeight = inputEmpty ? "h-16" : "h-52";
  const textareaContainerHeight = inputEmpty ? "h-3/4" : "h-[90%]";

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages display area */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-auto p-4"
        style={{ maxHeight: "80vh" }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`${
                message.sender === "user" ? "bg-[var(--p5)]" : "bg-[var(--s5)]"
              } text-white p-3 rounded-lg max-w-xs`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      {/* Original Prompt Input Design */}
      <div
        className={`bg-[var(--s4)] flex flex-col justify-center ${containerHeight} transition-all duration-200 ease-out max-w-full overflow-hidden`}
      >
        <div
          className={`bg-[var(--s5)] mx-4 mb-4 rounded-md flex items-center justify-between ${innerContainerHeight}`}
        >
          <div
            className={`bg-[var(--s6)] mr-5 flex-1 ml-2 rounded-md justify-center items-center relative ${textareaContainerHeight}`}
          >
            <textarea
              placeholder="Type your prompt here..."
              className="w-full h-full bg-transparent outline-none px-6 text-[var(--s2)] placeholder:text-[var(--p6)] placeholder:opacity-30 resize-none overflow-auto text-left"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              style={{
                lineHeight: "1.5rem",
                paddingTop: "1rem",
                paddingBottom: "1rem",
              }}
            />
          </div>
          <Button size="none" className="w-12 h-12 mr-3" onClick={handleSubmit}>
            <p>Send</p>
          </Button>
        </div>
      </div>
    </div>
  );
}