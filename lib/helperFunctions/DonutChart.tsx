 export default function MatchRateDonut( {
  matched,
  total,
  isLoading,
}: {
  matched: number | undefined;
  total: number | undefined;
  isLoading: boolean;
}) {
  const isUndefined = matched === undefined || total === undefined;
  const showSkeleton = isLoading || isUndefined;

  const rate = showSkeleton || total === 0 ? 0 : (matched! / total!) * 100;
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (rate / 100) * circumference;

  return (
    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-5 py-4 flex-1 min-w-0 shadow-sm">
      {/* Left */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-gray-500">Match Rate</span>
        {showSkeleton ? (
          <>
            <div className="animate-pulse bg-gray-200 rounded h-7 w-16" />
            <div className="animate-pulse bg-gray-200 rounded h-4 w-24 mt-1" />
          </>
        ) : (
          <>
            <span className="text-2xl font-bold text-gray-900 leading-none">
              {rate.toFixed(1)}%
            </span>
            <span className="text-sm text-gray-500">
              დამთხვეული / სულ:{" "}
              <span className="font-semibold text-gray-700">
                {matched} / {total}
              </span>
            </span>
          </>
        )}
      </div>

      {/* Right — SVG donut */}
      <div className="shrink-0 ml-4">
        {showSkeleton ? (
          <div className="animate-pulse bg-gray-200 rounded-full w-12 h-12" />
        ) : (
          <svg width="52" height="52" viewBox="0 0 52 52">
            {/* Track */}
            <circle
              cx="26"
              cy="26"
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="6"
            />
            {/* Progress */}
            <circle
              cx="26"
              cy="26"
              r={radius}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 26 26)"
              style={{ transition: "stroke-dashoffset 0.5s ease" }}
            />
            <text
              x="26"
              y="30"
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              fill="#1f2937"
            >
              {rate.toFixed(0)}%
            </text>
          </svg>
        )}
      </div>
    </div>
  );
}