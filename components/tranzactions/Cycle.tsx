import React from "react";

export default function Cycle({ color }: { color: string }) {
  return (
    <div
      className="w-2 h-2 rounded-full flex-shrink-0"
      style={{ background: color }}
    />
  );
}
