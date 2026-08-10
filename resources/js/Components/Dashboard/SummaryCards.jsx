
export default function SummaryCards({ stats = {} }) {
    const money = (value) =>
        new Intl.NumberFormat("en-TZ", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(Number(value) || 0);

    const number = (value) =>
        new Intl.NumberFormat("en-TZ").format(Number(value) || 0);

    const cards = [
        {
            title: "Mauzo ya Leo",
            value: `TZS ${money(stats.todaySales)}`,
            icon: "🛒",
            bg: "bg-blue-600",
            light: "bg-blue-100",
        },
        {
            title: "Faida ya Leo",
            value: `TZS ${money(stats.todayProfit)}`,
            icon: "📈",
            bg: "bg-emerald-500",
            light: "bg-emerald-100",
        },
        {
            title: "Bidhaa Zilizopo",
            value: number(stats.totalProducts),
            icon: "📦",
            bg: "bg-violet-500",
            light: "bg-violet-100",
        },
        {
            title: "Bidhaa Zinazoisha",
            value: number(stats.lowStock),
            icon: "⚠️",
            bg: "bg-amber-500",
            light: "bg-amber-100",
        },
        {
            title: "Wateja",
            value: number(stats.totalCustomers),
            icon: "👥",
            bg: "bg-rose-500",
            light: "bg-rose-100",
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">

            {cards.map((card) => (
                <div
                    key={card.title}
                    className="min-w-0 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >

                    {/* =================================================
                        CARD HEADER
                    ================================================= */}

                    <div className={`${card.bg} px-3 py-3 text-white sm:px-4 sm:py-4`}>

                        <div className="flex items-center justify-between gap-2">

                            <div className="min-w-0">

                                <p className="truncate text-[10px] font-bold uppercase tracking-wide opacity-90 sm:text-xs">
                                    {card.title}
                                </p>

                                <h3 className="mt-1 truncate text-base font-black leading-tight sm:text-lg lg:text-xl">
                                    {card.value}
                                </h3>

                            </div>

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/20 text-base sm:h-9 sm:w-9 sm:text-lg">
                                {card.icon}
                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        MINI CHART
                    ================================================= */}

                    <div className="h-8 bg-white px-3 pt-1.5 sm:h-9 sm:px-4">

                        <div className="flex h-full items-end gap-0.5 opacity-70">

                            {[25, 45, 30, 60, 40, 70, 50, 75].map(
                                (height, index) => (
                                    <div
                                        key={index}
                                        className={`w-full rounded-t-sm ${card.light}`}
                                        style={{
                                            height: `${Math.max(
                                                height / 3,
                                                5
                                            )}px`,
                                        }}
                                    />
                                )
                            )}

                        </div>

                    </div>

                </div>
            ))}

        </div>
    );
}

