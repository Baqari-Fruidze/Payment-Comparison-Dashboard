import React from "react";
import Matching from "./Matching";
import MonthPicker from "./MonthPicker";
import DisableMatching from "./DisableMatching";

export default function MatchingAndateSection() {
  return (
    <div className="flex items-center gap-10">
      <Matching />
      <DisableMatching />
      <MonthPicker />
    </div>
  );
}
