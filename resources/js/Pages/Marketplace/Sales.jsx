import { Head, Link, usePage } from "@inertiajs/react";
import MarketplaceLayout from "@/Layouts/MarketplaceLayout";

import {
    ShoppingBagIcon,
    ArrowLeftIcon,
    EyeIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon,
    CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

export default function Sales({ sales = [], stats = {} }) {
    const { props } = usePage();
    const user = props?.auth?.user;

    const salesData = sales?.data ?? sales ?? [];

    const formatMoney = (amount) => {
        return new Intl.NumberFormat("en-TZ", {
            style: "currency",
            currency: "TZS",
            maximumFractionDigits: 0,
        }).format(amount ?? 0);
    };

    const getStatus = (status) => {
        switch (status) {
            case "completed":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        <CheckCircleIcon className="h-4 w-4" />
                        Completed
                    </span>
                );

            case "pending":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                        <ClockIcon className="h-4 w-4" />
                        Pending
                    </span>
                );

            case "cancelled":
            case "rejected":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        <XCircleIcon className="h-4 w-4" />
                        Cancelled
                    </span>
                );

            default:
                return (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {status ?? "Unknown"}
                    </span>
                );
        }
    };

    return (
        <MarketplaceLayout>
            <Head title="Mauzo Yangu" />

            <div className="min-h-screen bg-slate-50 p-4 md:p-6">

                {/* HEADER */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <div>
                        <div className="mb-2">
                            <Link
                                href={route("marketplace.dashboard")}
                                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600"
                            >
                                <ArrowLeftIcon className="h-4 w-4" />
                                Dashboard
                            </Link>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                                <ShoppingBagIcon className="h-6 w-6 text-emerald-600" />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">
                                    Mauzo Yangu
                                </h1>

                                <p className="text-sm text-slate-500">
                                    Angalia na fuatilia mauzo ya bidhaa zako.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SUMMARY */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Mauzo Yote
                        </p>

                        <p className="mt-2 text-2xl font-bold text-slate-900">
                            {stats.total_sales ?? salesData.length}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Completed
                        </p>

                        <p className="mt-2 text-2xl font-bold text-green-600">
                            {stats.completed ?? 0}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Pending
                        </p>

                        <p className="mt-2 text-2xl font-bold text-amber-600">
                            {stats.pending ?? 0}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Mapato
                        </p>

                        <p className="mt-2 text-xl font-bold text-emerald-600">
                            {formatMoney(stats.earnings ?? 0)}
                        </p>
                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    <div className="border-b border-slate-200 px-5 py-4">
                        <h2 className="font-bold text-slate-900">
                            Historia ya Mauzo
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Orodha ya bidhaa zilizouzwa.
                        </p>
                    </div>

                    {salesData.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px] text-left">

                                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                    <tr>
                                        <th className="px-5 py-4">
                                            Bidhaa
                                        </th>

                                        <th className="px-5 py-4">
                                            Mnunuzi
                                        </th>

                                        <th className="px-5 py-4">
                                            Kiasi
                                        </th>

                                        <th className="px-5 py-4">
                                            Tarehe
                                        </th>

                                        <th className="px-5 py-4">
                                            Status
                                        </th>

                                        <th className="px-5 py-4 text-right">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">

                                    {salesData.map((sale) => (
                                        <tr
                                            key={sale.id}
                                            className="hover:bg-slate-50"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="font-semibold text-slate-900">
                                                    {sale.listing?.title ??
                                                        sale.product_name ??
                                                        "Bidhaa"}
                                                </div>

                                                <div className="text-xs text-slate-400">
                                                    #{sale.id}
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="font-medium text-slate-700">
                                                    {sale.buyer?.name ??
                                                        sale.buyer_name ??
                                                        "Mnunuzi"}
                                                </div>
                                            </td>

                                            <td className="px-5 py-4 font-semibold text-slate-900">
                                                {formatMoney(
                                                    sale.amount ??
                                                        sale.total ??
                                                        sale.price
                                                )}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-slate-500">
                                                {sale.created_at
                                                    ? new Date(
                                                          sale.created_at
                                                      ).toLocaleDateString(
                                                          "en-GB"
                                                      )
                                                    : "-"}
                                            </td>

                                            <td className="px-5 py-4">
                                                {getStatus(sale.status)}
                                            </td>

                                            <td className="px-5 py-4 text-right">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                                                >
                                                    <EyeIcon className="h-4 w-4" />
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                                <ShoppingBagIcon className="h-8 w-8 text-slate-400" />
                            </div>

                            <h3 className="mt-4 text-lg font-bold text-slate-900">
                                Bado hujafanya mauzo
                            </h3>

                            <p className="mt-1 max-w-md text-sm text-slate-500">
                                Mauzo ya bidhaa zako yataonekana hapa baada ya
                                mnunuzi kufanya order.
                            </p>

                            <Link
                                href={route("marketplace.create")}
                                className="mt-5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                            >
                                Ongeza Bidhaa
                            </Link>

                        </div>
                    )}

                </div>
            </div>
        </MarketplaceLayout>
    );
}

