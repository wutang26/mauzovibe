
import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    ArrowPathIcon,
    PrinterIcon,
    ChartBarIcon,
    CurrencyDollarIcon,
    BanknotesIcon,
    ShoppingCartIcon,
    ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

export default function Yearly({
    year,
    startDate,
    endDate,
    stats,
    paymentMethods,
    monthlySales,
}) {
    const formatCurrency = (amount) => {
        return `TZS ${Number(amount || 0).toLocaleString()}`;
    };

    const formatPercent = (value) => {
        return `${Number(value || 0).toFixed(2)}%`;
    };

    const handlePrint = () => {
        window.print();
    };

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const getMonthData = (monthNumber) => {
        return (
            monthlySales?.find(
                (item) => Number(item.month) === monthNumber
            ) || {
                month: monthNumber,
                transactions: 0,
                items_sold: 0,
                revenue: 0,
                profit: 0,
            }
        );
    };

    return (
        <AdminLayout>
            <Head title="Yearly Report" />

            <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-green-100 p-3">
                                <ChartBarIcon className="h-7 w-7 text-green-600" />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Yearly Report
                                </h1>

                                <p className="text-sm text-gray-500">
                                    Monitor your yearly sales, revenue and
                                    business performance.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Link
                            href={route("admin.reports.yearly")}
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
                        >
                            <ArrowPathIcon className="h-5 w-5" />
                            Refresh
                        </Link>

                        <button
                            onClick={handlePrint}
                            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-green-700"
                        >
                            <PrinterIcon className="h-5 w-5" />
                            Print Report
                        </button>
                    </div>
                </div>

                {/* Reporting Period */}
                <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                        Reporting Period
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-gray-900">
                        {year}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        {startDate} — {endDate}
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    {/* Net Sales */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Net Sales
                                </p>

                                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                                    {formatCurrency(stats?.netSales)}
                                </h3>

                                <p className="mt-1 text-xs text-gray-500">
                                    Revenue after discounts
                                </p>
                            </div>

                            <div className="rounded-lg bg-green-100 p-3">
                                <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    {/* Gross Profit */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Gross Profit
                                </p>

                                <h3 className="mt-2 text-2xl font-bold text-green-600">
                                    {formatCurrency(stats?.grossProfit)}
                                </h3>

                                <p className="mt-1 text-xs text-gray-500">
                                    {formatPercent(stats?.profitMargin)} profit
                                    margin
                                </p>
                            </div>

                            <div className="rounded-lg bg-green-100 p-3">
                                <BanknotesIcon className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    {/* Transactions */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Transactions
                                </p>

                                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                                    {Number(
                                        stats?.transactions || 0
                                    ).toLocaleString()}
                                </h3>

                                <p className="mt-1 text-xs text-gray-500">
                                    Completed sales
                                </p>
                            </div>

                            <div className="rounded-lg bg-blue-100 p-3">
                                <ShoppingCartIcon className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    {/* Cost of Goods */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Cost of Goods
                                </p>

                                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                                    {formatCurrency(stats?.costOfGoods)}
                                </h3>

                                <p className="mt-1 text-xs text-gray-500">
                                    Total product cost
                                </p>
                            </div>

                            <div className="rounded-lg bg-orange-100 p-3">
                                <ExclamationCircleIcon className="h-6 w-6 text-orange-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Financial Summary */}
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">

                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-gray-500">
                            Gross Revenue
                        </p>

                        <h3 className="mt-2 text-xl font-bold text-gray-900">
                            {formatCurrency(stats?.grossRevenue)}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                            Sales before discounts
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-gray-500">
                            Amount Collected
                        </p>

                        <h3 className="mt-2 text-xl font-bold text-green-600">
                            {formatCurrency(stats?.amountCollected)}
                        </h3>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-gray-500">
                            Outstanding
                        </p>

                        <h3 className="mt-2 text-xl font-bold text-red-600">
                            {formatCurrency(stats?.outstanding)}
                        </h3>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-6 rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 p-5">
                        <h2 className="text-lg font-bold text-gray-900">
                            Payment Methods
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Yearly breakdown of collected payments.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">

                        <div className="p-5">
                            <p className="text-sm text-gray-500">Cash</p>

                            <p className="mt-2 text-xl font-bold text-gray-900">
                                {formatCurrency(paymentMethods?.cash)}
                            </p>
                        </div>

                        <div className="p-5">
                            <p className="text-sm text-gray-500">
                                Mobile Money
                            </p>

                            <p className="mt-2 text-xl font-bold text-gray-900">
                                {formatCurrency(paymentMethods?.mobileMoney)}
                            </p>
                        </div>

                        <div className="p-5">
                            <p className="text-sm text-gray-500">Bank</p>

                            <p className="mt-2 text-xl font-bold text-gray-900">
                                {formatCurrency(paymentMethods?.bank)}
                            </p>
                        </div>

                        <div className="p-5">
                            <p className="text-sm text-gray-500">Credit</p>

                            <p className="mt-2 text-xl font-bold text-gray-900">
                                {formatCurrency(paymentMethods?.credit)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Monthly Performance */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

                    <div className="border-b border-gray-200 p-5">
                        <h2 className="text-lg font-bold text-gray-900">
                            Monthly Sales Performance
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Sales performance for each month of the selected
                            year.
                        </p>
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden overflow-x-auto md:block">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                                <tr>
                                    <th className="px-5 py-4">
                                        Month
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Transactions
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Items Sold
                                    </th>

                                    <th className="px-5 py-4 text-right">
                                        Revenue
                                    </th>

                                    <th className="px-5 py-4 text-right">
                                        Profit
                                    </th>

                                    <th className="px-5 py-4 text-right">
                                        Margin
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {months.map((monthName, index) => {
                                    const data = getMonthData(index + 1);

                                    const margin =
                                        Number(data.revenue || 0) > 0
                                            ? (Number(data.profit || 0) /
                                                  Number(data.revenue)) *
                                              100
                                            : 0;

                                    return (
                                        <tr
                                            key={monthName}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="font-semibold text-gray-900">
                                                    {monthName}
                                                </div>

                                                <div className="text-xs text-gray-500">
                                                    {year}-{String(
                                                        index + 1
                                                    ).padStart(2, "0")}
                                                </div>
                                            </td>

                                            <td className="px-5 py-4 text-center text-gray-700">
                                                {Number(
                                                    data.transactions || 0
                                                ).toLocaleString()}
                                            </td>

                                            <td className="px-5 py-4 text-center text-gray-700">
                                                {Number(
                                                    data.items_sold || 0
                                                ).toLocaleString()}
                                            </td>

                                            <td className="px-5 py-4 text-right font-semibold text-gray-900">
                                                {formatCurrency(data.revenue)}
                                            </td>

                                            <td className="px-5 py-4 text-right font-semibold text-green-600">
                                                {formatCurrency(data.profit)}
                                            </td>

                                            <td className="px-5 py-4 text-right font-semibold text-gray-700">
                                                {formatPercent(margin)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="space-y-3 p-4 md:hidden">
                        {months.map((monthName, index) => {
                            const data = getMonthData(index + 1);

                            const margin =
                                Number(data.revenue || 0) > 0
                                    ? (Number(data.profit || 0) /
                                          Number(data.revenue)) *
                                      100
                                    : 0;

                            return (
                                <div
                                    key={monthName}
                                    className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-gray-900">
                                                {monthName}
                                            </h3>

                                            <p className="text-xs text-gray-500">
                                                {year}-{String(index + 1).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </p>
                                        </div>

                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                            {formatPercent(margin)}
                                        </span>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-3">

                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Transactions
                                            </p>

                                            <p className="font-semibold text-gray-900">
                                                {Number(
                                                    data.transactions || 0
                                                ).toLocaleString()}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Items Sold
                                            </p>

                                            <p className="font-semibold text-gray-900">
                                                {Number(
                                                    data.items_sold || 0
                                                ).toLocaleString()}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Revenue
                                            </p>

                                            <p className="font-semibold text-gray-900">
                                                {formatCurrency(data.revenue)}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Profit
                                            </p>

                                            <p className="font-semibold text-green-600">
                                                {formatCurrency(data.profit)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center text-xs text-gray-400">
                    MauzoVibe Yearly Report • Generated from your sales data
                    <br />
                    © {year} MauzoVibe. All rights reserved.
                </div>
            </div>

            {/* Print CSS */}
            <style>{`
                @media print {
                    body {
                        background: white !important;
                    }

                    aside,
                    nav,
                    button {
                        display: none !important;
                    }

                    .min-h-screen {
                        min-height: auto !important;
                        padding: 0 !important;
                    }

                    .shadow-sm {
                        box-shadow: none !important;
                    }

                    .border {
                        border-color: #ddd !important;
                    }
                }
            `}</style>
        </AdminLayout>
    );
}

