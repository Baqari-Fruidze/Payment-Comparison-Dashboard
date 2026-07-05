
import MatchingAndateSection from "./MatchingAndateSection";
import NameAndIcon from "./NameAndIcon";
import { LogOut } from "lucide-react";
import { logout } from "@/app/login/actions";

export default function MainHeader() {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 h-16 p-2">
      <NameAndIcon />
      <div className="flex items-center gap-6">
        <MatchingAndateSection />
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
          >
            <LogOut className="w-4 h-4" />
            გასვლა
          </button>
        </form>
      </div>
    </header>
  );
}
