import React from "react";
import { Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

import {
CalendarDaysIcon,
BanknotesIcon,
ShoppingCartIcon,
ArrowTrendingUpIcon,
CubeIcon,
ReceiptPercentIcon,
CreditCardIcon,
DevicePhoneMobileIcon,
BuildingLibraryIcon,
ArrowPathIcon,
PrinterIcon,
ChartBarIcon,
} from "@heroicons/react/24/outline";

export default function Weekly({
    weekStart = "",
    weekEnd = "",
    summary = {},
    paymentMethods = {},
    dailySales = [],
}) {

const formatMoney = (amount) => {
return new Intl.NumberFormat("en-TZ", {
minimumFractionDigits: 2,
maximumFractionDigits: 2,
}).format(Number(amount || 0));
};


/*
|--------------------------------------------------------------------------
| Safe Defaults
|--------------------------------------------------------------------------
*/

const safeSummary = {
    grossRevenue: 0,
    totalDiscount: 0,
    netSales: 0,
    totalCost: 0,
    totalProfit: 0,
    profitMargin: 0,
    totalPaid: 0,
    totalOutstanding: 0,
    totalChange: 0,
    totalTransactions: 0,
    totalItemsSold: 0,
    ...summary,
};

const safePaymentMethods = {
    cash: 0,
    mobileMoney: 0,
    bank: 0,
    credit: 0,
    ...paymentMethods,
};

const safeDailySales = Array.isArray(dailySales)
    ? dailySales
    : [];

/*
|--------------------------------------------------------------------------
| Payment Method Helpers
|--------------------------------------------------------------------------
*/

const formatPaymentMethod = (method) => {
    const methods = {
        cash: "Cash",
        mobileMoney: "Mobile Money",
        mobile_money: "Mobile Money",
        bank: "Bank",
        credit: "Credit",
    };

    return methods[method] || method;
};

const getPaymentIcon = (method) => {
    const icons = {
        cash: BanknotesIcon,
        mobileMoney: DevicePhoneMobileIcon,
        mobile_money: DevicePhoneMobileIcon,
        bank: BuildingLibraryIcon,
        credit: CreditCardIcon,
    };

    return icons[method] || CreditCardIcon;
};

/*
|--------------------------------------------------------------------------
| Week Change
|--------------------------------------------------------------------------
*/

const handleWeekChange = (e) => {
    const selectedDate = e.target.value;

    if (!selectedDate) {
        return;
    }

    router.get(
        route("admin.reports.weekly"),
        {
            date: selectedDate,
        },
        {
            preserveState: true,
            preserveScroll: true,
        }
    );
};

/*
|--------------------------------------------------------------------------
| Refresh
|--------------------------------------------------------------------------
*/

const refreshReport = () => {
    router.get(
        route("admin.reports.weekly"),
        {
            date: weekStart || undefined,
        },
        {
            preserveState: true,
            preserveScroll: true,
        }
    );
};
/*
|--------------------------------------------------------------------------
| Print
|--------------------------------------------------------------------------
*/

const printReport = () => {
    window.print();
};

/*
|--------------------------------------------------------------------------
| Render
|--------------------------------------------------------------------------
*/

return (
    <>
        <Head title="Weekly Report" />

        <AdminLayout>
            <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8 print:bg-white print:px-0 print:py-0">
                <div className="mx-auto max-w-7xl">

                    {/* =====================================================
                        HEADER
                    ====================================================== */}

                    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between print:mb-4">

                        <div className="flex items-center gap-3">

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-600 shadow-sm print:hidden">
                                <ChartBarIcon className="h-6 w-6 text-white" />
                            </div>

                            <div>

                                <div className="flex items-center gap-2">

                                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                        Weekly Report
                                    </h1>

                                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 print:hidden">
                                        Weekly
                                    </span>

                                </div>

                                <p className="mt-1 text-sm text-slate-500">
                                    Monitor your weekly sales, revenue and business performance.
                                </p>

                               <p className="mt-1 text-xs font-medium text-slate-400">
                                    {weekStart || "—"} — {weekEnd || "—"}
                                </p>

                            </div>
                        </div>

                        {/* Controls */}

                        <div className="flex flex-wrap items-center gap-2 print:hidden">

                            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">

                                <CalendarDaysIcon className="ml-1 h-5 w-5 text-green-600" />

                                <input
                                    type="date"
                                    value={weekStart || ""}
                                    onChange={handleWeekChange}
                                    className="border-0 bg-transparent px-2 py-1.5 text-sm font-medium text-slate-700 outline-none focus:ring-0"
                                />

                            </div>

                            <button
                                type="button"
                                onClick={refreshReport}
                                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                            >
                                <ArrowPathIcon className="h-5 w-5" />

                                <span className="hidden sm:inline">
                                    Refresh
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={printReport}
                                className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
                            >
                                <PrinterIcon className="h-5 w-5" />

                                <span>
                                    Print Report
                                </span>
                            </button>

                        </div>
                    </div>

                    {/* =====================================================
                        PERIOD SUMMARY
                    ====================================================== */}

                    <div className="mb-6 rounded-2xl border border-green-100 bg-gradient-to-r from-green-600 to-green-700 p-5 text-white shadow-sm print:border print:border-slate-200 print:bg-white print:text-slate-900">

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                            <div>

                                <p className="text-sm font-medium text-green-100 print:text-slate-500">
                                    Reporting Period
                                </p>

                               <h2 className="mt-1 text-xl font-bold">
                                    {weekStart || "—"} — {weekEnd || "—"}
                                </h2>

                            </div>

                            <div className="text-left sm:text-right">

                                <p className="text-sm text-green-100 print:text-slate-500">
                                    Net Sales
                                </p>

                                <p className="text-2xl font-bold">
                                    TZS {formatMoney(safeSummary.netSales)}
                                </p>

                            </div>

                        </div>
                    </div>

                    {/* =====================================================
                        MAIN FINANCIAL CARDS
                    ====================================================== */}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        {/* Gross Revenue */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

                            <div className="flex items-start justify-between">

                                <div>

                                    <p className="text-sm font-medium text-slate-500">
                                        Gross Revenue
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                        TZS {formatMoney(safeSummary.grossRevenue)}
                                    </h2>

                                    <p className="mt-2 text-xs text-slate-500">
                                        Sales before discounts
                                    </p>

                                </div>

                                <div className="rounded-xl bg-green-50 p-3">
                                    <BanknotesIcon className="h-6 w-6 text-green-600" />
                                </div>

                            </div>
                        </div>

                        {/* Net Sales */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

                            <div className="flex items-start justify-between">

                                <div>

                                    <p className="text-sm font-medium text-slate-500">
                                        Net Sales
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                        TZS {formatMoney(safeSummary.netSales)}
                                    </h2>

                                    <p className="mt-2 text-xs text-slate-500">
                                        Revenue after discounts
                                    </p>

                                </div>

                                <div className="rounded-xl bg-blue-50 p-3">
                                    <ShoppingCartIcon className="h-6 w-6 text-blue-600" />
                                </div>

                            </div>
                        </div>

                        {/* Gross Profit */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

                            <div className="flex items-start justify-between">

                                <div>

                                    <p className="text-sm font-medium text-slate-500">
                                        Gross Profit
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-green-600">
                                        TZS {formatMoney(safeSummary.totalProfit)}
                                    </h2>

                                    <p className="mt-2 text-xs text-slate-500">
                                        {safeSummary.profitMargin}% profit margin
                                    </p>

                                </div>

                                <div className="rounded-xl bg-green-50 p-3">
                                    <ArrowTrendingUpIcon className="h-6 w-6 text-green-600" />
                                </div>

                            </div>
                        </div>

                        {/* Transactions */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

                            <div className="flex items-start justify-between">

                                <div>

                                    <p className="text-sm font-medium text-slate-500">
                                        Transactions
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                        {safeSummary.totalTransactions}
                                    </h2>

                                    <p className="mt-2 text-xs text-slate-500">
                                        Completed sales
                                    </p>

                                </div>

                                <div className="rounded-xl bg-indigo-50 p-3">
                                    <ReceiptPercentIcon className="h-6 w-6 text-indigo-600" />
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* =====================================================
                        OPERATIONS SUMMARY
                    ====================================================== */}

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        {/* Cost */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                            <div className="flex items-center gap-4">

                                <div className="rounded-xl bg-orange-50 p-3">
                                    <CubeIcon className="h-6 w-6 text-orange-600" />
                                </div>

                                <div>

                                    <p className="text-sm text-slate-500">
                                        Cost of Goods
                                    </p>

                                    <p className="mt-1 text-xl font-bold text-slate-900">
                                        TZS {formatMoney(safeSummary.totalCost)}
                                    </p>

                                </div>

                            </div>
                        </div>

                        {/* Collected */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                            <div className="flex items-center gap-4">

                                <div className="rounded-xl bg-teal-50 p-3">
                                    <BanknotesIcon className="h-6 w-6 text-teal-600" />
                                </div>

                                <div>

                                    <p className="text-sm text-slate-500">
                                        Amount Collected
                                    </p>

                                    <p className="mt-1 text-xl font-bold text-slate-900">
                                        TZS {formatMoney(safeSummary.totalPaid)}
                                    </p>

                                </div>

                            </div>
                        </div>

                        {/* Outstanding */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                            <div className="flex items-center gap-4">

                                <div className="rounded-xl bg-red-50 p-3">
                                    <CreditCardIcon className="h-6 w-6 text-red-600" />
                                </div>

                                <div>

                                    <p className="text-sm text-slate-500">
                                        Outstanding
                                    </p>

                                    <p className="mt-1 text-xl font-bold text-red-600">
                                        TZS {formatMoney(safeSummary.totalOutstanding)}
                                    </p>

                                </div>

                            </div>
                        </div>

                        {/* Discounts */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                            <div className="flex items-center gap-4">

                                <div className="rounded-xl bg-purple-50 p-3">
                                    <ReceiptPercentIcon className="h-6 w-6 text-purple-600" />
                                </div>

                                <div>

                                    <p className="text-sm text-slate-500">
                                        Total Discounts
                                    </p>

                                    <p className="mt-1 text-xl font-bold text-slate-900">
                                        TZS {formatMoney(safeSummary.totalDiscount)}
                                    </p>

                                </div>

                            </div>
                        </div>

                    </div>

                    {/* =====================================================
                        PAYMENT METHODS
                    ====================================================== */}

                    <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

                        <div className="border-b border-slate-100 px-5 py-4">

                            <h2 className="text-lg font-bold text-slate-900">
                                Payment Methods
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Weekly breakdown of collected payments.
                            </p>

                        </div>

                        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">

                            {Object.entries(safePaymentMethods).map(
                                ([method, amount]) => {

                                    const Icon = getPaymentIcon(method);

                                    return (
                                        <div
                                            key={method}
                                            className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                                        >

                                            <div className="flex items-center gap-3">

                                                <div className="rounded-lg bg-white p-2 shadow-sm">
                                                    <Icon className="h-5 w-5 text-green-600" />
                                                </div>

                                                <span className="text-sm font-semibold text-slate-600">
                                                    {formatPaymentMethod(method)}
                                                </span>

                                            </div>

                                            <p className="mt-4 text-xl font-bold text-slate-900">
                                                TZS {formatMoney(amount)}
                                            </p>

                                        </div>
                                    );
                                }
                            )}

                        </div>
                    </div>

                    {/* =====================================================
                        DAILY PERFORMANCE
                    ====================================================== */}

                    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                            <div>

                                <h2 className="text-lg font-bold text-slate-900">
                                    Daily Sales Performance
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Sales performance for each day of the selected week.
                                </p>

                            </div>

                            <div className="rounded-lg bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
                                {safeDailySales.length} days
                            </div>

                        </div>

                        {safeDailySales.length > 0 ? (

                            <div className="overflow-x-auto">

                                <table className="min-w-full divide-y divide-slate-100">

                                    <thead className="bg-slate-50">

                                        <tr>

                                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Date
                                            </th>

                                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Transactions
                                            </th>

                                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Items Sold
                                            </th>

                                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Revenue
                                            </th>

                                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Profit
                                            </th>

                                            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Margin
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody className="divide-y divide-slate-100 bg-white">

                                        {safeDailySales.map((day, index) => {

                                            const margin = Number(
                                                day.margin ?? (
                                                    Number(day.netSales || 0) > 0
                                                        ? (
                                                            Number(day.profit || 0) /
                                                            Number(day.netSales || 0)
                                                        ) * 100
                                                        : 0
                                                )
                                            );

                                            return (
                                                <tr
                                                    key={day.date || index}
                                                    className="transition hover:bg-slate-50"
                                                >

                                                    <td className="whitespace-nowrap px-5 py-4">

                                                        <div className="font-semibold text-slate-800">
                                                            {day.date}
                                                        </div>

                                                        {day.day && (
                                                            <div className="text-xs text-slate-400">
                                                                {day.day}
                                                            </div>
                                                        )}

                                                    </td>

                                                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                                                        {day.transactions ?? 0}
                                                    </td>

                                                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                                                        {day.items ?? day.itemsSold ?? 0}
                                                    </td>

                                                  <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-800">
                                                        TZS {formatMoney(day.revenue)}
                                                  </td>

                                                    <td className="whitespace-nowrap px-5 py-4 text-sm font-bold text-green-600">
                                                        TZS {formatMoney(day.profit)}
                                                    </td>

                                                    <td className="whitespace-nowrap px-5 py-4 text-right">

                                                        <span
                                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                                margin > 0
                                                                    ? "bg-green-50 text-green-700"
                                                                    : "bg-slate-100 text-slate-500"
                                                            }`}
                                                        >
                                                            {margin.toFixed(2)}%
                                                        </span>

                                                    </td>

                                                </tr>
                                            );
                                        })}

                                    </tbody>

                                </table>

                            </div>

                        ) : (

                            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

                                <div className="rounded-full bg-slate-100 p-4">
                                    <ChartBarIcon className="h-8 w-8 text-slate-400" />
                                </div>

                                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                                    No sales found
                                </h3>

                                <p className="mt-1 max-w-sm text-sm text-slate-500">
                                    There are no completed sales for the selected week.
                                </p>

                            </div>

                        )}

                    </div>

                    {/* =====================================================
                        FOOTER
                    ====================================================== */}

                    <div className="mt-6 border-t border-slate-200 pt-4 text-center text-xs text-slate-400">
                        MauzoVibe Weekly Report • Generated from your sales data
                    </div>

                </div>
            </div>
        </AdminLayout>

        {/* =============================================================
            PRINT STYLES
        ============================================================== */}

        <style>{`
            @media print {

                @page {
                    size: A4;
                    margin: 12mm;
                }

                body {
                    background: white !important;
                }

                nav,
                aside {
                    display: none !important;
                }

                button,
                input {
                    display: none !important;
                }

                .shadow-sm,
                .shadow-md {
                    box-shadow: none !important;
                }

                table {
                    page-break-inside: auto;
                }

                tr {
                    page-break-inside: avoid;
                    page-break-after: auto;
                }
            }
        `}</style>
    </>
);


}
