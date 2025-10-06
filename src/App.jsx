import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [res, setRes] = useState("");
  const [loading, setLoading] = useState(false);

  const promptSender = async () => {
    if (!prompt.trim()) return;
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.BACKEND_URL || "http://localhost:3000"}/ai/code-view`, { prompt });
      setRes(response.data);
    } catch (error) {
      setRes("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white px-3 md:px-6 py-6">
      <div className="w-full md:w-3/5 bg-neutral-900/80 backdrop-blur-md border border-neutral-700 rounded-2xl p-6 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-green-400 tracking-wide">AI by Mani</h2>
          <span className="text-sm text-neutral-400">Your Smart AI Assistant 👔</span>
        </div>

        {/* Response Area */}
        <div className="flex-grow bg-neutral-800 rounded-xl p-4 overflow-y-auto whitespace-pre-wrap text-gray-200 leading-relaxed shadow-inner">
          {loading ? (
            <motion.p
              className="text-yellow-400 animate-pulse text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Thinking deeply about your msg...
            </motion.p>
          ) : (
            <motion.div
              key={res}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {res ? (
                <div className="bg-neutral-700/60 border h-[65vh] overflow-x-auto border-neutral-600 rounded-lg p-4 shadow-md">
                  <ReactMarkdown >
                    {res}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-gray-400 text-center">
                  💬 Hi there! I'm here to help you.
                </p>
              )}
            </motion.div>
          )}
        </div>

        {/* Input + Button */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 items-end">
          <input
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            type="text"
            placeholder="Ask me anything..."
            className="flex-grow bg-neutral-700 w-full text-white placeholder-neutral-400 px-4 py-3 rounded-lg outline-none border border-neutral-600 focus:border-green-400 transition-all duration-200"
            onKeyDown={(e) => e.key === "Enter" && promptSender()}
          />
          <button
            onClick={promptSender}
            disabled={loading}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-black font-semibold rounded-lg transition-all duration-200 active:scale-95 shadow-lg"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
