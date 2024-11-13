"use client";
import { useState, useEffect } from "react";

export default function Analytics() {
  const [prompt, setPrompt] = useState("");
  const [expectedResponse, setExpectedResponse] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [stats, setStats] = useState({
    accuracy: 70.02,
    responseTime: 1.2,
    satisfaction: 94.16,
    errorRate: 26.27,
  });

  const handleTestPrompt = async () => {
    if (prompt.trim()) {
      const actualResponse = await fetchBotResponse({expected_output : expectedResponse, user_input : prompt});

      // Add to chat history
      setChatHistory([
        ...chatHistory,
        { type: "user", text: prompt },
        { type: "expected", text: expectedResponse },
        { type: "actual", text: actualResponse },
      ]);

      // Clear inputs after submission
      setPrompt("");
      setExpectedResponse("");
    }
  };

  async function fetchBotResponse(query) {
    const searchURL = `http://localhost:3000/testing/test_model?query=${encodeURIComponent(JSON.stringify(query))}`;
  
    try {
      const response = await fetch(searchURL);
      if (!response.ok) throw new Error(response.statusText);
      const json = await response.json();
      return json.message;
    } catch (error) {
      console.error("Error fetching bot response:", error);
      throw error; // Rethrow the error so handleSubmit can catch it
    }
  };

  return (
    <div className="h-screen overflow-y-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">ISO New England Chatbot Developer Interface</h1>
      
      {/* Chat Interface */}
      <div className="bg-gray-300 rounded-lg p-4 shadow-md mb-6">
        <div className="flex flex-col h-60 overflow-y-auto bg-gray-100 p-3 rounded-md mb-4">
          {chatHistory.map((entry, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-md ${
                entry.type === "user" ? "bg-blue-200 text-right" :
                entry.type === "expected" ? "bg-yellow-200 text-left" : "bg-green-200 text-left"
              }`}
            >
              <strong>{entry.type === "user" ? "User" : entry.type === "expected" ? "Expected" : "Actual"}:</strong> {entry.text}
            </div>
          ))}
        </div>

        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your prompt here..."
          className="w-full mb-2 p-2 rounded-md border border-gray-400"
        />
        <input
          type="text"
          value={expectedResponse}
          onChange={(e) => setExpectedResponse(e.target.value)}
          placeholder="Expected response..."
          className="w-full mb-2 p-2 rounded-md border border-gray-400"
        />
        <button
          onClick={handleTestPrompt}
          className="w-full py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600"
        >
          Submit
        </button>
      </div>

      {/* Testing Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-200 rounded-lg p-4 shadow-md text-center">
          <h3 className="text-lg font-semibold">Accuracy</h3>
          <p className={`text-2xl ${stats.accuracy > 80 ? "text-green-500" : "text-red-500"}`}>{stats.accuracy}%</p>
        </div>
        <div className="bg-gray-200 rounded-lg p-4 shadow-md text-center">
          <h3 className="text-lg font-semibold">Response Time</h3>
          <p className="text-2xl text-blue-500">{stats.responseTime}s</p>
        </div>
        <div className="bg-gray-200 rounded-lg p-4 shadow-md text-center">
          <h3 className="text-lg font-semibold">Satisfaction</h3>
          <p className={`text-2xl ${stats.satisfaction > 80 ? "text-green-500" : "text-red-500"}`}>{stats.satisfaction}%</p>
        </div>
        <div className="bg-gray-200 rounded-lg p-4 shadow-md text-center">
          <h3 className="text-lg font-semibold">Error Rate</h3>
          <p className={`text-2xl ${stats.errorRate < 20 ? "text-green-500" : "text-red-500"}`}>{stats.errorRate}%</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* Pie Chart Placeholder */}
        <div className="bg-gray-200 rounded-lg p-4 shadow-md">
          <h2 className="text-center text-lg font-semibold mb-2">Response Distribution</h2>
          <div className="h-40 flex justify-center items-center">[Pie Chart]</div>
        </div>
        
        {/* Line Chart Placeholder */}
        <div className="bg-gray-200 rounded-lg p-4 shadow-md">
          <h2 className="text-center text-lg font-semibold mb-2">Performance Over Time</h2>
          <div className="h-40 flex justify-center items-center">[Line Chart]</div>
        </div>
      </div>
    </div>
  );
}