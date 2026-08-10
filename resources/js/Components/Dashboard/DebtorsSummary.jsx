export default function DebtorsSummary({
    debtors = {},
}) {
    const totalCustomers = Number(
        debtors.totalCustomers ?? 0
    );

    const totalDebt = Number(
        debtors.totalDebt ?? 0
    );

    const current = Number(
        debtors.current ?? 0
    );

    const overdue = Number(
        debtors.overdue ?? 0
    );

    const critical = Number(
        debtors.critical ?? 0
    );

    const money = (value) =>
        new Intl.NumberFormat("en-TZ", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);

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

            <div className="mb-3 flex shrink-0 items-center justify-between gap-2">

                <div className="min-w-0">

                    <h2 className="truncate text-sm font-black text-slate-800">
                        👥 Debtors Summary
                    </h2>

                </div>

                <button
                    type="button"
                    className="
                        shrink-0
                        rounded-lg
                        bg-slate-50
                        px-2
                        py-1.5
                        text-[9px]
                        font-black
                        text-slate-600
                    "
                >
                    View All
                </button>

            </div>

            {/* =====================================================
                DEBTORS MAIN
            ===================================================== */}

            <div className="flex min-w-0 items-center gap-3">

                {/* DONUT */}

                <div
                    className="
                        relative
                        flex
                        h-[105px]
                        w-[105px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border-[11px]
                        border-red-300
                    "
                >
                    <div className="text-center">

                        <strong className="block text-xl font-black text-slate-800">
                            {totalCustomers}
                        </strong>

                        <span className="block text-[8px] font-bold leading-tight text-slate-400">
                            Wateja
                        </span>

                        <span className="block text-[8px] font-bold leading-tight text-slate-400">
                            Wanaodaiwa
                        </span>

                    </div>
                </div>

                {/* DETAILS */}

                <div className="min-w-0 flex-1">

                    <p className="text-[9px] font-semibold text-slate-400">
                        Jumla ya Madeni
                    </p>

                    <p className="mb-3 truncate text-base font-black text-slate-800">
                        TZS {money(totalDebt)}
                    </p>

                    <div className="space-y-2">

                        {/* CURRENT */}

                        <div className="min-w-0">

                            <div className="flex items-center justify-between gap-1">

                                <span className="truncate text-[8px] text-slate-500">
                                    Current (0-30)
                                </span>

                                <strong className="shrink-0 text-[8px] text-red-500">
                                    TZS {money(current)}
                                </strong>

                            </div>

                        </div>

                        {/* OVERDUE */}

                        <div className="min-w-0">

                            <div className="flex items-center justify-between gap-1">

                                <span className="truncate text-[8px] text-slate-500">
                                    Overdue (31-60)
                                </span>

                                <strong className="shrink-0 text-[8px] text-red-500">
                                    TZS {money(overdue)}
                                </strong>

                            </div>

                        </div>

                        {/* CRITICAL */}

                        <div className="min-w-0">

                            <div className="flex items-center justify-between gap-1">

                                <span className="truncate text-[8px] text-slate-500">
                                    Overdue (60+)
                                </span>

                                <strong className="shrink-0 text-[8px] text-red-500">
                                    TZS {money(critical)}
                                </strong>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* =====================================================
                FOOTER
            ===================================================== */}

            <div className="mt-auto border-t border-slate-100 pt-2 text-center">

                <span className="text-[9px] font-semibold text-slate-400">
                    Jumla ya Wateja Wanaodaiwa: {totalCustomers}
                </span>

            </div>

        </div>
    );
}