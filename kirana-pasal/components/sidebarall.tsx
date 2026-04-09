"use client";

import {
  Settings2,
  LayoutDashboard,
  BarChart3,
  MessageCircle,
} from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";


interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const SideBarAll = ({ isOpen = false, onClose = () => {} }: SidebarProps) => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleSearch = () => {
    if (!message.trim()) return;
    router.push(`/chat?q=${encodeURIComponent(message)}`);
    setMessage("");
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-16 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo / Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold text-slate-900">Kirana Dashboard</h2>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 transition"
          >
            ✕
          </button>
        </div>

        {/* Chat Section */}
        <div className="p-4 border-b">
          <span className="font-semibold text-slate-700 flex justify-between">ChatBot <span><MessageCircle/></span></span>
          <textarea
            placeholder="Ask bot something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="mt-2 h-24 w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
          />
          <button
            onClick={handleSearch}
            className="mt-2 w-full rounded-md bg-amber-500 text-white py-2 font-medium hover:bg-amber-600 transition"
          >
            Ask
          </button>
        </div>

        {/* Categories */}
        <div className="p-4 border-b">
          <span className="font-semibold text-slate-700">Categories</span>
          <select
            className="mt-2 w-full rounded-md border py-2 px-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            onChange={(e) =>
              router.push(`/category/${e.target.value.toLowerCase()}`)
            }
          >
            <option value="">Select Category</option>
            <option value="Dairy">Dairy</option>
            <option value="Biscuits">Biscuits</option>
          </select>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-4 gap-2 flex-1">
          <div
            onClick={() => {
              router.push("/admin");
              onClose();
            }}
            className="flex items-center gap-3 cursor-pointer rounded-md p-2 hover:bg-amber-50 transition"
          >
            <LayoutDashboard size={20} className="text-amber-500" />
            <span className="font-medium text-slate-700">Dashboard</span>
          </div>

          <div
            onClick={() => {
              router.push("/statistics");
              onClose();
            }}
            className="flex items-center gap-3 cursor-pointer rounded-md p-2 hover:bg-amber-50 transition"
          >
            <BarChart3 size={20} className="text-amber-500" />
            <span className="font-medium text-slate-700">Statistics</span>
          </div>
        </nav>

        {/* Settings */}
        <div className="p-4 border-t">
          <div
            onClick={() => {
              router.push("/settings");
              onClose();
            }}
            className="flex items-center gap-3 cursor-pointer rounded-md p-2 hover:bg-amber-50 transition"
          >
            <Settings2 size={20} className="text-amber-500" />
            <span className="font-medium text-slate-700">Settings</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBarAll;