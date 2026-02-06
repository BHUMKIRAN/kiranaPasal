"use client";

import {
  Settings2,
  LayoutDashboard,
  BarChart3,
} from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBarAll = ({ isOpen, onClose }: SidebarProps) => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleSearch = () => {
    if (!message.trim()) return;
    router.push(`/chat?q=${encodeURIComponent(message)}`);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full w-56 bg-gray-400 p-4 shadow-xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-xl"
      >
        ✕
      </button>

      <div className="mt-10">
        <img
          src="/Logo.png"
          alt="Logo"
          className="rounded-full mb-4 w-24 h-24 mx-auto"
        />
      </div>

      <hr className="border-2 border-black mb-4" />

      {/* Chat */}
      <div className="relative mb-2">
        <span>ChatBot 🤖</span>

        <textarea
          placeholder="Ask bot something interesting"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-24 bg-white mt-2 rounded p-2 w-full focus:bg-blue-300"
        />

        <button
          onClick={handleSearch}
          className="absolute right-2 bottom-2 bg-blue-600 text-white px-2 py-1 rounded active:scale-90"
        >
          Ask
        </button>
      </div>

      {/* Category */}
      <div className="mb-4">
        <select className="w-full py-1 px-2 rounded-md outline-none">
          <option>Dairy</option>
          <option>Biscuits</option>
        </select>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 text-sm font-medium">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 p-2 rounded">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 p-2 rounded">
          <BarChart3 size={18} />
          <span>Statistics</span>
        </div>
      </nav>

      {/* Settings */}
      <div className="mt-auto flex justify-end">
        <Settings2 className="cursor-pointer" />
      </div>
    </aside>
  );
};

export default SideBarAll;
