"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

type ChatMessage = {
  role: "user" | "bot";
  text: string;
};

export default function ChatPage() {
  const searchParams = useSearchParams();
  const sidebarQuery = searchParams.get("q");

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Use useCallback to prevent infinite loops
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);
    setInput("");

    try {
      const res = await axios.post("/api/chat", { message: text });
      const reply = res.data.reply;

      setMessages((prev) => [...prev, { role: "bot", text: reply }]);

      // Optional: save to json-server
      // await axios.post("http://localhost:3001/chats", {
      //   question: text,
      //   answer: reply,
      //   createdAt: new Date(),
      // });
    } catch (err: any) {
      console.error(
        "Frontend POST error:",
        err?.response?.data || err?.message || err
      );

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Failed to get AI response" },
      ]);
    }

    setLoading(false);
  }, []); // ✅ No dependencies needed

  // ✅ Auto-send message from sidebar search
  useEffect(() => {
    if (sidebarQuery) {
      sendMessage(sidebarQuery);
    }
  }, [sidebarQuery, sendMessage]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Kirana-Pasal chatBOT</h1>

      {/* Chat box */}
      <div className="border rounded-lg p-4 h-[450px] overflow-y-auto mb-4 bg-white">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-3 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-4 py-2 rounded-lg max-w-[80%] ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}

        {loading && (
          <p className="text-sm text-gray-400 italic">AI is thinking…</p>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) sendMessage(input);
          }}
          placeholder="Ask something..."
          className="flex-1 border px-3 py-2 rounded-md outline-none"
          disabled={loading}
        />
        <button
          onClick={() => !loading && sendMessage(input)}
          className="bg-black text-white px-4 rounded-md disabled:opacity-50 hover:bg-gray-800"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}