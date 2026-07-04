import type { ISingleInfoContainerProps } from "../../Types";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className ?? ""}`}
    />
  );
}

export default function SingleInfoContainer({
  title,
  count,
  totalAmount,
  icon,
  countColor = "text-gray-900",
  amountColor = "text-gray-500",
  rightSlot,
  isLoading = false,
}: ISingleInfoContainerProps) {
  const isUndefined = count === undefined || totalAmount === undefined;
  const showSkeleton = isLoading || isUndefined;

  return (
    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-5 py-4 flex-1 min-w-0 shadow-sm ">
      {/* Left — icon + labels */}
      <div className="flex items-start gap-3 min-w-0">
        {/* Icon badge */}
        <div className="mt-0.5 shrink-0">{icon}</div>

        {/* Text stack */}
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-xs font-medium text-gray-500 truncate">
            {title}
          </span>

          {showSkeleton ? (
            <>
              <Skeleton className="h-7 w-12" />
              <Skeleton className="h-4 w-20 mt-1" />
            </>
          ) : (
            <>
              <span className={`text-2xl font-bold leading-none ${countColor}`}>
                {count}
              </span>
              <span className={`text-sm font-medium ${amountColor}`}>
                სულ თანხა:{" "}
                <span className="font-semibold">
                  {totalAmount.toLocaleString("ka-GE", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}{" "}
                  ₾
                </span>
              </span>
            </>
          )}
        </div>
      </div>

      
      {rightSlot && (
        <div className="shrink-0 ml-4">{rightSlot}</div>
      )}
    </div>
  );
}
