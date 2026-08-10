import { useMemo } from "react";

export default function SalesChart({ data = [] }) {
    const points = useMemo(() => {
        if (!data.length) return [];

        const values = data.map((item) =>
            Number(
                item.total ??
                item.sales ??
                item.amount ??
                0
            )
        );

        const max = Math.max(...values, 1);

        const width = 700;
        const height = 230;

        const paddingLeft = 35;
        const paddingRight = 20;
        const paddingTop = 20;
        const paddingBottom = 30;

        return data.map((item, index) => {
            const value = values[index];

            const x =
                data.length === 1
                    ? width / 2
                    : paddingLeft +
                      (index *
                          (width -
                              paddingLeft -
                              paddingRight)) /
                          (data.length - 1);

            const y =
                paddingTop +
                (height -
                    paddingTop -
                    paddingBottom) *
                    (1 - value / max);

            return {
                ...item,
                value,
                x,
                y,
            };
        });
    }, [data]);

    const polyline = points
        .map((point) => `${point.x},${point.y}`)
        .join(" ");

    const areaPoints =
        points.length > 0
            ? `
                ${points[0].x},200
                ${polyline}
                ${points[points.length - 1].x},200
              `
            : "";

    return (
        <div
            className="
                flex
                h-[315px]
                min-w-0
                flex-col
                overflow-hidden
                rounded-2xl
                bg-white
                p-4
                shadow-sm
                ring-1
                ring-slate-100
            "
        >
            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="mb-2 flex shrink-0 items-center justify-between gap-2">

                <div className="min-w-0">

                    <h2 className="truncate text-sm font-black text-slate-800">
                        📊 Mauzo (Sales Trend)
                    </h2>

                </div>

                <div className="flex shrink-0 items-center gap-1.5">

                    <select
                        className="
                            h-7
                            rounded-lg
                            border
                            border-slate-200
                            bg-white
                            px-2
                            text-[9px]
                            font-semibold
                            text-slate-600
                            outline-none
                        "
                    >
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>This Month</option>
                    </select>

                    <button
                        type="button"
                        className="
                            flex
                            h-7
                            w-7
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-slate-200
                            text-[11px]
                        "
                    >
                        📅
                    </button>

                </div>
            </div>

            {/* =====================================================
                CHART
            ===================================================== */}

            {points.length === 0 ? (
                <div className="flex flex-1 items-center justify-center text-xs text-slate-400">
                    Hakuna data ya mauzo bado.
                </div>
            ) : (
                <div className="min-h-0 flex-1">

                    <svg
                        viewBox="0 0 700 230"
                        className="h-[230px] w-full"
                        preserveAspectRatio="none"
                    >

                        {/* GRID */}

                        {[0, 1, 2, 3, 4].map((row) => {
                            const y = 20 + row * 40;

                            return (
                                <line
                                    key={row}
                                    x1="35"
                                    y1={y}
                                    x2="680"
                                    y2={y}
                                    stroke="#e2e8f0"
                                    strokeDasharray="4 4"
                                    strokeWidth="1"
                                />
                            );
                        })}

                        {/* AREA */}

                        <polygon
                            points={areaPoints}
                            fill="rgba(37,99,235,0.08)"
                        />

                        {/* LINE */}

                        <polyline
                            points={polyline}
                            fill="none"
                            stroke="#2563eb"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* POINTS */}

                        {points.map((point, index) => (
                            <circle
                                key={index}
                                cx={point.x}
                                cy={point.y}
                                r="4"
                                fill="#2563eb"
                                stroke="#ffffff"
                                strokeWidth="2"
                            />
                        ))}

                    </svg>

                    {/* DATE LABELS */}

                    <div className="mt-0 flex justify-between px-1">

                        {points.map((point, index) => (
                            <span
                                key={index}
                                className="max-w-[55px] truncate text-[8px] text-slate-400"
                            >
                                {point.label ??
                                    point.date ??
                                    ""}
                            </span>
                        ))}

                    </div>

                    {/* LEGEND */}

                    <div className="mt-2 flex items-center justify-center gap-1.5">

                        <span className="h-1.5 w-4 rounded-full bg-blue-600" />

                        <span className="text-[9px] text-slate-500">
                            Mauzo (TZS)
                        </span>

                    </div>

                </div>
            )}
        </div>
    );
}