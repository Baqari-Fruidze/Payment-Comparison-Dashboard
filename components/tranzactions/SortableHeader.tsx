import { ArrowUpDown } from "lucide-react";
import { SortDir, SortField } from "@/Types";

export default function SortableHeader({
  label,
  field,
  currentSort,
  onSort,
}: {
  label: string;
  field: SortField;
  currentSort: SortField;
  currentDir: SortDir;
  onSort: (field: SortField) => void;
}) {
  const isActive = currentSort === field;
  return (
    <th
      className="px-4 pb-2 cursor-pointer select-none hover:text-gray-700 transition-colors group"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown
          className={`w-3 h-3 transition-colors ${
            isActive
              ? "text-blue-500"
              : "text-gray-300 group-hover:text-gray-400"
          }`}
        />
      </div>
    </th>
  );
}
