export function ColorSelector(diff: number) {
  if (diff > 0) return "text-green-600";
  if (diff < 0) return "text-red-500";
  return "text-gray-500";
}
