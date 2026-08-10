export default function QuickStats({ stats = {} }) {

    const money = (value) =>
        new Intl.NumberFormat("en-TZ", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(Number(value) || 0);


    const items = [
        {
            icon: "📦",
            title: "Bidhaa Zote",
            value: stats.totalProducts ?? 0,
            subtitle: "Total Products",
        },
        {
            icon: "👥",
            title: "Wateja Zote",
            value: stats.totalCustomers ?? 0,
            subtitle: "Total Customers",
        },
        {
            icon: "💳",
            title: "Mauzo Leo",
            value: stats.todayTransactions ?? 0,
            subtitle: "Total Transactions",
        },
        {
            icon: "💵",
            title: "Cash in Hand",
            value: `TZS ${money(stats.cashInHand)}`,
            subtitle: "Today",
        },
        {
            icon: "🧾",
            title: "Credit Sales",
            value: `TZS ${money(stats.creditSales)}`,
            subtitle: "Today",
        },
        {
            icon: "📈",
            title: "Profit This Month",
            value: `TZS ${money(stats.monthProfit)}`,
            subtitle: "This Month",
        },
    ];


    return (
        <div>

            <div className="mb-3 flex items-center gap-2">

                <span className="text-sm">
                    📊
                </span>

                <h2 className="text-sm font-black text-slate-800">
                    Quick Stats
                </h2>

            </div>


            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

                {items.map((item, index) => (

                    <div
                        key={index}
                        className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
                    >

                        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-lg">
                            {item.icon}
                        </div>

                        <p className="text-[10px] font-bold text-slate-400">
                            {item.title}
                        </p>

                        <p className="mt-1 truncate text-lg font-black text-slate-800">
                            {item.value}
                        </p>

                        <p className="mt-1 text-[9px] text-slate-400">
                            {item.subtitle}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
}