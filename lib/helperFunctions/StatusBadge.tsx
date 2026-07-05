import { IBankTransactionType } from "@/Types";

export default function StatusBadge({
  status,
}: {
  status: IBankTransactionType["status"];
}) {
  const config: Record<string, { label: string; className: string }> = {
    matched: {
      label: "✓ დამთხვეული",
      className: "text-green-700 bg-green-50",
    },
    unmatched: {
      label: "✗ შეუსაბამო",
      className: "text-red-600 bg-red-50",
    },
    ignored: {
      label: "— იგნორირებული",
      className: "text-gray-500 bg-gray-100",
    },
  };

  const c = config[status] ?? config.unmatched;

  return (
    <span
      className={`text-xs px-2 py-1 rounded-md font-medium whitespace-nowrap ${c.className}`}
    >
      {c.label}
    </span>
  );
}
