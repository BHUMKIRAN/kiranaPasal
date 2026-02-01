"use client";

import {
  SearchIcon,
  Settings2,
  LayoutDashboard,
  BarChart3,
  Search,
  ChartBarIcon,
  ChartGanttIcon,
  ChartAreaIcon,
} from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";

const SideBarAll = () => {
  const router = useRouter();
  const [message, setMessage] = useState(""); // ✅ string

  const handleSearch = () => {
    if (!message.trim()) return;

    router.push(`/chat?q=${encodeURIComponent(message)}`);

    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <aside className="flex flex-col justify-center w-56 bg-gray-400 p-4 shadow-xl rounded">
      <div>
        <img
          src="/Logo.png"
          alt="Logo"
          className="rounded-[50%] mb-4 w-25 h-25"
        />
      </div>

      <hr className="border-2 border-black mb-4" />

      {/* Search */}
      <div className="relative mb-2">
        <span>
          ChatBot 🤖
        </span>

        
 
        <textarea
          placeholder="Ask bot something interesting "
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-30 bg-white  mt-2 rounded p-1 focus:bg-blue-300"
        />
        <button
          className="absolute right-7  bottom-2 text-gray-600 cursor-pointer
          transition-all duration-200 active:scale-90 bg-blue-600 rounded text-white p-1"
          onClick={handleSearch} // ✅ click support
        >Ask</button>
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
