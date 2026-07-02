import { SupabaseRpc } from "@/lib/helperFunctions/SupabaseRpc";
import { Database } from "lucide-react";

export default function Matching() {
  return (
    <div className="flex items-center gap-2" onClick={SupabaseRpc}>
        <Database />
        <span>დამთხვევების გამოთვლა</span>
    </div>
  )
}
