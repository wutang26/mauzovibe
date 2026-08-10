const money = (value) =>
    new Intl.NumberFormat("en-TZ", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(Number(value) || 0);

export default function RecentSales({ sales = [] }) {

    return (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">

            <div className="flex items-center justify-between border-b border-slate-100 p-5">

                <div>

                    <h2 className="font-black text-slate-800">
                        🧾 Recent Sales
                    </h2>

                    <p className="text-xs text-slate-400">
                        Mauzo ya hivi karibuni
                    </p>

                </div>

                <span className="rounded-lg bg-slate-100 px-3 py-2 text-[10px] font-black text-slate-600">
                    View All Sales
                </span>

            </div>


            <div className="overflow-x-auto">

                <table className="w-full min-w-[650px] text-left">

                    <thead>

                        <tr className="border-b border-slate-100 text-[10px] uppercase text-slate-400">

                            <th className="px-5 py-3">#</th>
                            <th className="px-3 py-3">Bidhaa</th>
                            <th className="px-3 py-3">Idadi</th>
                            <th className="px-3 py-3">Bei</th>
                            <th className="px-3 py-3">Jumla</th>
                            <th className="px-3 py-3">Malipo</th>
                            <th className="px-5 py-3">Wakati</th>

                        </tr>

                    </thead>

                    <tbody>

                        {sales.slice(0, 5).map((sale, index) => (

                            <tr
                                key={sale.id ?? index}
                                className="border-b border-slate-50 last:border-0"
                            >

                                <td className="px-5 py-3 text-xs font-bold text-slate-400">
                                    {index + 1}
                                </td>

                                <td className="px-3 py-3">

                                    <div className="flex items-center gap-2">

                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50">
                                            📦
                                        </div>

                                        <span className="text-xs font-bold text-slate-700">
                                            {sale.product_name ??
                                                sale.product?.name ??
                                                sale.items?.[0]?.product?.name ??
                                                "Sale"}
                                        </span>

                                    </div>

                                </td>

                                <td className="px-3 py-3 text-xs text-slate-600">
                                    {sale.quantity ?? sale.items?.[0]?.quantity ?? 1}
                                </td>

                                <td className="px-3 py-3 text-xs text-slate-600">
                                    TZS{" "}
                                    {money(
                                        sale.unit_price ??
                                        sale.items?.[0]?.unit_price ??
                                        0
                                    )}
                                </td>

                                <td className="px-3 py-3 text-xs font-black text-slate-700">
                                    TZS {money(sale.total)}
                                </td>

                                <td className="px-3 py-3">

                                    <span className="rounded-md bg-emerald-50 px-2 py-1 text-[9px] font-black capitalize text-emerald-600">
                                        {sale.payment_method ??
                                            "cash"}
                                    </span>

                                </td>

                                <td className="px-5 py-3 text-[10px] text-slate-400">
                                    {sale.created_at
                                        ? new Date(
                                              sale.created_at
                                          ).toLocaleTimeString(
                                              "en-TZ",
                                              {
                                                  hour: "2-digit",
                                                  minute: "2-digit",
                                              }
                                          )
                                        : "-"}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}