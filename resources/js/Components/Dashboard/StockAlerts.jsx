export default function StockAlerts({ alerts = [] }) {
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
                        ⚠️ Stock Alerts
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
                ALERTS
            ===================================================== */}

            {alerts.length === 0 ? (
                <div className="flex flex-1 items-center justify-center text-center">

                    <div>

                        <div className="mb-2 text-2xl">
                            ✓
                        </div>

                        <p className="text-xs font-semibold text-slate-400">
                            Stock iko salama
                        </p>

                    </div>

                </div>
            ) : (
                <div className="min-h-0 flex-1 overflow-hidden">

                    <div className="space-y-1.5">

                        {alerts.slice(0, 5).map((item, index) => {
                            const quantity = Number(
                                item.quantity ??
                                item.stock ??
                                0
                            );

                            const minimum = Number(
                                item.minimum_stock ??
                                item.min_stock ??
                                item.reorder_level ??
                                0
                            );

                            return (
                                <div
                                    key={item.id ?? index}
                                    className="
                                        flex
                                        min-w-0
                                        items-center
                                        gap-2
                                        rounded-lg
                                        border
                                        border-slate-100
                                        p-1.5
                                    "
                                >

                                    {/* IMAGE */}

                                    <div
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            overflow-hidden
                                            rounded-lg
                                            bg-slate-50
                                        "
                                    >
                                        {item.image ? (
                                            <img
                                                src={`/storage/${item.image}`}
                                                alt=""
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-sm">
                                                📦
                                            </span>
                                        )}
                                    </div>

                                    {/* PRODUCT */}

                                    <div className="min-w-0 flex-1">

                                        <p className="truncate text-[10px] font-black text-slate-700">
                                            {item.name ??
                                                item.product?.name ??
                                                "Product"}
                                        </p>

                                        <p className="truncate text-[8px] text-slate-400">
                                            Stock: {quantity} • Min: {minimum}
                                        </p>

                                    </div>

                                    {/* BADGE */}

                                    <span
                                        className="
                                            shrink-0
                                            rounded-md
                                            bg-red-500
                                            px-1.5
                                            py-1
                                            text-[8px]
                                            font-black
                                            text-white
                                        "
                                    >
                                        {quantity} Left
                                    </span>

                                </div>
                            );
                        })}

                    </div>

                </div>
            )}

            {/* =====================================================
                FOOTER
            ===================================================== */}

            {alerts.length > 0 && (
                <div className="mt-2 shrink-0 border-t border-slate-100 pt-2 text-center">

                    <span className="text-[9px] font-semibold text-blue-500">
                        Jumla ya Bidhaa Zinazoisha: {alerts.length}
                    </span>

                </div>
            )}

        </div>
    );
}