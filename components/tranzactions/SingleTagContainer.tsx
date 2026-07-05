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
      className={`px-2 py-1 rounded-md border border-gray-200 ${isSelected ? color : "bg-gray-500"} flex items-center gap-1`}
    >
      <Cycle color={color} />
      {text}
      <span className="font-bold">({trazactionCount})</span>
    </div>
  );
}
