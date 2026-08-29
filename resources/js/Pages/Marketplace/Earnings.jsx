import { Head, Link } from "@inertiajs/react";
import MarketplaceLayout from "@/Layouts/MarketplaceLayout";

import {
    BanknotesIcon,
    ArrowLeftIcon,
    ArrowTrendingUpIcon,
    ClockIcon,
    CheckCircleIcon,
    CreditCardIcon,
} from "@heroicons/react/24/outline";

export default function Earnings({ stats = {}, transactions = [] }) {

    const formatMoney = (amount) => {
        return new Intl.NumberFormat("en-TZ", {
            style: "currency",
            currency: "TZS",
            maximumFractionDigits: 0,
        }).format(amount ?? 0);
    };

    return (
        <MarketplaceLayout>
            <Head title="Hesabu Zangu" />

            <div className="min-h-screen bg-slate-50 p-4 md:p-6">

                {/* HEADER */}
                <div className="mb-6">

                    <Link
                        href={route("marketplace.dashboard")}
                        className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600"
                    >
                        <ArrowLeftIcon className="h-4 w-4" />
                        Dashboard
                    </Link>

                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                            <BanknotesIcon className="h-6 w-6 text-emerald-600" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                Hesabu Zangu
                            </h1>

                            <p className="text-sm text-slate-500">
                                Fuatilia mapato na fedha zako za mauzo.
                            </p>
                        </div>

                    </div>

                </div>

                {/* MAIN BALANCE */}
                <div className="mb-6 rounded-2xl bg-[#063f2d] p-6 text-white shadow-sm">

                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                        <div>
                            <p className="text-sm text-white/70">
                                Mapato Yote
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                {formatMoney(stats.total_earnings ?? 0)}
                            </h2>

                            <p className="mt-2 text-sm text-white/60">
                                Jumla ya mapato kutokana na mauzo yako.
                            </p>
                        </div>

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                            <ArrowTrendingUpIcon className="h-8 w-8" />
                        </div>

                    </div>

                </div>

                {/* STAT CARDS */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-slate-500">
                                    Inasubiri
                                </p>

                                <p className="mt-2 text-2xl font-bold text-amber-600">
                                    {formatMoney(stats.pending ?? 0)}
                                </p>
                            </div>

                            <ClockIcon className="h-8 w-8 text-amber-500" />

                        </div>

                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-slate-500">
                                    Imelipwa
                                </p>

                                <p className="mt-2 text-2xl font-bold text-green-600">
                                    {formatMoney(stats.paid ?? 0)}
                                </p>
                            </div>

                            <CheckCircleIcon className="h-8 w-8 text-green-500" />

                        </div>

                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-slate-500">
                                    Transactions
                                </p>

                                <p className="mt-2 text-2xl font-bold text-slate-900">
                                    {stats.transactions ?? 0}
                                </p>
                            </div>

                            <CreditCardIcon className="h-8 w-8 text-slate-500" />

                        </div>

                    </div>

                </div>

                {/* TRANSACTIONS */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    <div className="border-b border-slate-200 px-5 py-4">

                        <h2 className="font-bold text-slate-900">
                            Transactions
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Historia ya fedha zako.
                        </p>

                    </div>

                    {transactions.length > 0 ? (

                        <div className="divide-y divide-slate-100">

                            {transactions.map((transaction) => (

                                <div
                                    key={transaction.id}
                                    className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                                >

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                                            <BanknotesIcon className="h-5 w-5 text-emerald-600" />
                                        </div>

                                        <div>

                                            <p className="font-semibold text-slate-900">
                                                {transaction.description ??
                                                    "Sale"}
                                            </p>

                                            <p className="text-xs text-slate-400">
                                                {transaction.created_at
                                                    ? new Date(
                                                          transaction.created_at
                                                      ).toLocaleDateString(
                                                          "en-GB"
                                                      )
                                                    : "-"}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="text-left sm:text-right">

                                        <p className="font-bold text-emerald-600">
                                            +{" "}
                                            {formatMoney(
                                                transaction.amount
                                            )}
                                        </p>

                                        <span className="text-xs text-slate-400">
                                            {transaction.status ?? "Completed"}
                                        </span>

                                    </div>

                                </div>

                            ))}

                        </div>

                    ) : (

                        <div className="flex flex-col items-center justify-center px-6 py-20 text-center">

                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                                <BanknotesIcon className="h-8 w-8 text-slate-400" />
                            </div>

                            <h3 className="mt-4 text-lg font-bold text-slate-900">
                                Hakuna transactions
                            </h3>

                            <p className="mt-1 max-w-md text-sm text-slate-500">
                                Transactions zako zitaonekana hapa baada ya
                                kufanya mauzo.
                            </p>

                        </div>

                    )}

                </div>

            </div>
        </MarketplaceLayout>
    );
}

