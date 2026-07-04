"use client";
import { navigationData } from "@/lib/constants";
import { useState } from "react";



export default function Sidebar() {
  const [active, setActive] = useState(0);

  return (
    <aside className="flex flex-col w-48 border-r border-gray-100 bg-white py-3 shrink-0 min-h-screen">
      <nav className="flex flex-col gap-0.5 px-2">
        {navigationData.map((item, index) => {
          const Icon = item.icon;
          const isActive = active === index;
          return (
            <button
              key={item.label}
              onClick={() => setActive(index)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 w-full text-left cursor-pointer
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                }`}
            >
              <Icon
                size={17}
                className={isActive ? "text-blue-600" : "text-gray-400"}
                strokeWidth={isActive ? 2.2 : 1.8}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
