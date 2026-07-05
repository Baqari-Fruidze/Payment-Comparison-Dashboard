import React from "react";
import Cycle from "./Cycle";

export default function SingleTagContainer({
  text,
  isSelected,
  color,
  trazactionCount,
}: {
  text: string;
  isSelected: boolean;
  color: string;
  trazactionCount: number;
}) {
  return (
    <div
      className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all ${
        isSelected
          ? "bg-white border border-gray-300 shadow-sm"
          : "border border-transparent text-gray-500 hover:bg-gray-100"
      }`}
    >
      <Cycle color={color} />
      <span>{text}</span>
      <span className="font-semibold">({trazactionCount})</span>
    </div>
  );
}
