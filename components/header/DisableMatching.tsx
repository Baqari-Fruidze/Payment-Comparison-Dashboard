import React from "react";
import { useDisableMatching } from "@/lib/hooks/useSupabaseData";

export default function DisableMatching() {
  const { mutate: disableMatching, isPending } = useDisableMatching();
  return (
    <button
      onClick={() => disableMatching(undefined, { onError: (err) => console.error(err) })}
      disabled={isPending}
      className={`bg-red-500 text-white px-4 py-2 rounded-lg transition-colors ${
        isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-red-600"
      }`}
    >
      {isPending ? "Disabling..." : "Disable Matching"}
    </button>
  );
}
