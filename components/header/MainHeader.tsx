
import MatchingAndateSection from "./MatchingAndateSection";
import NameAndIcon from "./NameAndIcon";

export default function MainHeader() {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 h-16 p-2">
      <NameAndIcon />
      <MatchingAndateSection />
    </header>
  );
}
