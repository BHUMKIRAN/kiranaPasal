"use client";

import { SearchIcon, Settings2, LayoutDashboard, BarChart3 } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

const SideBarAll = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/home");
  };

  return (
    <aside className="flex flex-col w-56 bg-gray-400 p-4 shadow-xl rounded">
      
      {/* Title */}
      <button
        onClick={handleClick}
        className="text-lg font-bold mb-3 text-center hover:underline"
      >
        HOME
      </button>

      <hr className="border-2 border-black mb-4" />

      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search here"
          className="w-full pl-9 pr-2 py-1 rounded-md outline-none"
        />
        <SearchIcon
          size={18}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600"
        />
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

      {/* Settings (Bottom) */}
      <div className="mt-auto flex justify-end">
        <Settings2 className="cursor-pointer" />
      </div>
    </aside>
  );
};

export default SideBarAll;
