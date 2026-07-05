import React from "react";

export default function Cycle({ color }: { color: string }) {
  return (
    <div className="w-1 h-1 rounded-full" style={{ background: color }}></div>
  );
}
