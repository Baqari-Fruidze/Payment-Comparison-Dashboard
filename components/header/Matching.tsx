"use client";
import { useAutoMatching } from "@/lib/hooks/useSupabaseData";
import { Database, Loader2 } from "lucide-react";

export default function Matching() {
  const { mutate: runMatching, isPending } = useAutoMatching();

  return (
    <div
      className={`flex items-center gap-2 border border-gray-200 rounded-md p-2 transition-transform duration-300 hover:scale-105 hover:border-accent ${
        isPending ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={() => !isPending && runMatching()}
    >
      {isPending ? (
        <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
      ) : (
        <Database className="w-5 h-5 text-gray-600" />
      )}
      <span className="font-medium text-gray-800">
        {isPending ? "მუშავდება..." : "დამთხვევების გამოთვლა"}
      </span>
    </div>
  );
}
