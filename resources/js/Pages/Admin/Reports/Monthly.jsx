
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

export default function Monthly({
    monthStart = "",
    monthEnd = "",
    month = "",
    year = "",
    summary = {},
    paymentMethods = {},
    dailySales = [],
    sales = [],
}) {
    /*
    |--------------------------------------------------------------------------
    | Format Money
    |--------------------------------------------------------------------------
    */

    const formatMoney = (amount) => {
        return new Intl.NumberFormat("en-TZ", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(Number(amount || 0));
    };

    /*
    |--------------------------------------------------------------------------
    | Safe Summary
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

    /*
    |--------------------------------------------------------------------------
    | Safe Payment Methods
    |--------------------------------------------------------------------------
    */

    const safePaymentMethods = {
        cash: 0,
        mobileMoney: 0,
        bank: 0,
        credit: 0,
        ...paymentMethods,
    };

    /*
    |--------------------------------------------------------------------------
    | Safe Daily Sales
    |--------------------------------------------------------------------------
    */

    const safeDailySales = Array.isArray(dailySales)
        ? dailySales
        : [];

    /*
    |--------------------------------------------------------------------------
    | Safe Transactions
    |--------------------------------------------------------------------------
    */

    const safeSales = Array.isArray(sales)
        ? sales
        : [];

    /*
    |--------------------------------------------------------------------------
    | Payment Method Labels
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

    /*
    |--------------------------------------------------------------------------
    | Payment Method Icons
    |--------------------------------------------------------------------------
    */

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
    | Month Change
    |--------------------------------------------------------------------------
    */

    const handleMonthChange = (e) => {
        const selectedDate = e.target.value;

        if (!selectedDate) {
            return;
        }

        router.get(
            route("admin.reports.monthly"),
            {
                date: `${selectedDate}-01`,
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
            route("admin.reports.monthly"),
            {
                date: monthStart || undefined,
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
    | Display Month
    |--------------------------------------------------------------------------
    */

    const displayMonth =
        month && year
            ? `${month} ${year}`
            : monthStart && monthEnd
                ? `${monthStart} — ${monthEnd}`
                : "Monthly Report";

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <>
            <Head title="Monthly Report" />

            <AdminLayout>

                <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-7xl">

                        {/* =====================================================
                            HEADER
                        ====================================================== */}

                        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                            <div className="flex items-center gap-3">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-600 shadow-sm">
                                    <ChartBarIcon className="h-6 w-6 text-white" />
                                </div>

                                <div>

                                    <div className="flex items-center gap-2">

                                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                            Monthly Report
                                        </h1>

                                        <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                                            Monthly
                                        </span>

                                    </div>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Monitor your monthly sales, revenue and business performance.
                                    </p>

                                    <p className="mt-1 text-xs font-medium text-slate-400">
                                        {monthStart || "—"} — {monthEnd || "—"}
                                    </p>

                                </div>

                            </div>

                            {/* Controls */}

                            <div className="flex flex-wrap items-center gap-2">

                                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">

                                    <CalendarDaysIcon className="ml-1 h-5 w-5 text-green-600" />

                                    <input
                                        type="month"
                                        value={
                                            monthStart
                                                ? monthStart.substring(0, 7)
                                                : ""
                                        }
                                        onChange={handleMonthChange}
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

                        <div className="mb-6 rounded-2xl border border-green-100 bg-gradient-to-r from-green-600 to-green-700 p-5 text-white shadow-sm">

                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                                <div>

                                    <p className="text-sm font-medium text-green-100">
                                        Reporting Period
                                    </p>

                                    <h2 className="mt-1 text-xl font-bold">
                                        {displayMonth}
                                    </h2>

                                    <p className="mt-1 text-xs text-green-100">
                                        {monthStart || "—"} — {monthEnd || "—"}
                                    </p>

                                </div>

                                <div className="text-left sm:text-right">

                                    <p className="text-sm text-green-100">
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
                                    Monthly breakdown of collected payments.
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
                                        Sales performance for each day of the selected month.
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
                                                    day.margin || 0
                                                );

                                                const hasSales =
                                                    Number(day.transactions || 0) > 0;

                                                return (
                                                    <tr
                                                        key={day.date || index}
                                                        className={`transition hover:bg-slate-50 ${
                                                            hasSales
                                                                ? ""
                                                                : "bg-slate-50/40"
                                                        }`}
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
                                                            {day.itemsSold ?? 0}
                                                        </td>

                                                        <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-800">
                                                            TZS {formatMoney(
                                                                day.netSales ??
                                                                day.revenue ??
                                                                0
                                                            )}
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
                                        There are no completed sales for the selected month.
                                    </p>

                                </div>

                            )}

                        </div>

                        {/* =====================================================
                            FOOTER
                        ====================================================== */}

                        <div className="mt-6 border-t border-slate-200 pt-4 text-center text-xs text-slate-400">
                            MauzoVibe Monthly Report • Generated from your sales data
                        </div>

                    </div>
                </div>

            </AdminLayout>

            {/* =============================================================
                PRINT-ONLY MONTHLY RECEIPT
            ============================================================== */}

            <div className="monthly-print-report">

                {/* HEADER */}

                <div className="monthly-print-header">

                    <h1>MAUZOVIBE</h1>

                    <p className="monthly-print-subtitle">
                        SALES MANAGEMENT REPORT
                    </p>

                    <h2>MONTHLY SALES REPORT</h2>

                    <p className="monthly-print-period">
                        {displayMonth}
                    </p>

                    <p className="monthly-print-date">
                        Reporting Period: {monthStart} — {monthEnd}
                    </p>

                </div>

                {/* TOTAL SALES */}

                <div className="monthly-print-total">

                    <p>TOTAL MONTHLY SALES</p>

                    <h1>
                        TZS {formatMoney(safeSummary.netSales)}
                    </h1>

                </div>

                {/* STATISTICS */}

                <div className="monthly-print-statistics">

                    <div>
                        <span>Transactions</span>
                        <strong>{safeSummary.totalTransactions}</strong>
                    </div>

                    <div>
                        <span>Items Sold</span>
                        <strong>{safeSummary.totalItemsSold}</strong>
                    </div>

                    <div>
                        <span>Discounts</span>
                        <strong>
                            TZS {formatMoney(safeSummary.totalDiscount)}
                        </strong>
                    </div>

                    <div>
                        <span>Gross Profit</span>
                        <strong>
                            TZS {formatMoney(safeSummary.totalProfit)}
                        </strong>
                    </div>

                </div>

                {/* DAILY SALES SUMMARY */}

                <div className="monthly-print-section">

                    <h3>DAILY SALES SUMMARY</h3>

                    <table>

                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Transactions</th>
                                <th>Items Sold</th>
                                <th>Revenue (TZS)</th>
                                <th>Profit (TZS)</th>
                            </tr>
                        </thead>

                        <tbody>

                            {safeDailySales.map((day, index) => (

                                <tr key={day.date || index}>

                                    <td>
                                        {day.date}
                                        {day.day ? ` (${day.day})` : ""}
                                    </td>

                                    <td>{day.transactions ?? 0}</td>

                                    <td>{day.itemsSold ?? 0}</td>

                                    <td className="monthly-print-amount">
                                        {formatMoney(
                                            day.netSales ?? day.revenue ?? 0
                                        )}
                                    </td>

                                    <td className="monthly-print-amount">
                                        {formatMoney(day.profit)}
                                    </td>

                                </tr>

                            ))}

                            {safeDailySales.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="monthly-print-empty">
                                        No daily sales found.
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>

                </div>

                {/* SALES TRANSACTIONS */}

                <div className="monthly-print-section">

                    <h3>SALES TRANSACTIONS</h3>

                    <table>

                        <thead>
                            <tr>
                                <th>Invoice</th>
                                <th>Customer</th>
                                <th>Products Sold</th>
                                <th className="monthly-print-amount">
                                    Amount (TZS)
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {safeSales.map((sale) => (

                                <tr key={sale.id}>

                                    <td>
                                        {sale.invoice_number || "-"}
                                        {sale.date && (
                                            <div className="monthly-print-muted">
                                                {sale.date} {sale.time || ""}
                                            </div>
                                        )}
                                    </td>

                                    <td>
                                        {sale.customer || "Walk-in Customer"}
                                    </td>

                                    <td>

                                        <div className="monthly-print-product-list">

                                            {(Array.isArray(sale.items) ? sale.items : []).map(
                                                (item, index) => (

                                                    <div
                                                        className="monthly-print-product-item"
                                                        key={item.id || `${sale.id}-${index}`}
                                                    >

                                                        <span>
                                                            {item.product_name || "Unknown Product"}
                                                        </span>

                                                        <strong>
                                                            × {item.quantity}
                                                        </strong>

                                                    </div>

                                                )
                                            )}

                                            {(!sale.items || sale.items.length === 0) && (
                                                <span>-</span>
                                            )}

                                        </div>

                                    </td>

                                    <td className="monthly-print-amount">
                                        {formatMoney(sale.total)}
                                    </td>

                                </tr>

                            ))}

                            {safeSales.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="monthly-print-empty">
                                        No sales found for this month.
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>

                </div>

                {/* FINANCIAL SUMMARY */}

                <div className="monthly-print-financial">

                    <div className="monthly-print-grand-total">
                        <span>TOTAL SALES</span>

                        <strong>
                            TZS {formatMoney(safeSummary.netSales)}
                        </strong>
                    </div>

                    <div>
                        <span>Gross Revenue</span>

                        <strong>
                            TZS {formatMoney(safeSummary.grossRevenue)}
                        </strong>
                    </div>

                    <div>
                        <span>Total Discounts</span>

                        <strong>
                            TZS {formatMoney(safeSummary.totalDiscount)}
                        </strong>
                    </div>

                    <div>
                        <span>Amount Collected</span>

                        <strong>
                            TZS {formatMoney(safeSummary.totalPaid)}
                        </strong>
                    </div>

                    <div>
                        <span>Outstanding</span>

                        <strong>
                            TZS {formatMoney(safeSummary.totalOutstanding)}
                        </strong>
                    </div>

                    <div>
                        <span>Cost of Goods</span>

                        <strong>
                            TZS {formatMoney(safeSummary.totalCost)}
                        </strong>
                    </div>

                    <div>
                        <span>Gross Profit</span>

                        <strong>
                            TZS {formatMoney(safeSummary.totalProfit)}
                        </strong>
                    </div>

                </div>

                {/* FOOTER */}

                <div className="monthly-print-footer">

                    <strong>Powered by NAC Technologies</strong>

                    <p>Thank you for your business.</p>

                </div>

            </div>

            {/* =============================================================
                PRINT STYLES
            ============================================================== */}

            <style>{`

                .monthly-print-report {
                    display: none;
                }

                @page {
                    size: A4 portrait;
                    margin: 10mm;
                }

                @media print {

                    html,
                    body {
                        background: #ffffff !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }

                    body * {
                        visibility: hidden !important;
                    }

                    .monthly-print-report,
                    .monthly-print-report * {
                        visibility: visible !important;
                    }

                    .monthly-print-report {
                        display: block !important;
                        position: absolute !important;
                        top: 0 !important;
                        left: 0 !important;
                        width: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        background: #ffffff !important;
                        color: #111827 !important;
                        font-family: Arial, Helvetica, sans-serif !important;
                        font-size: 11px !important;
                        line-height: 1.4 !important;
                        z-index: 999999 !important;
                    }

                    .monthly-print-header {
                        text-align: center;
                        border-bottom: 2px solid #111827;
                        padding-bottom: 10px;
                        margin-bottom: 14px;
                    }

                    .monthly-print-header h1 {
                        font-size: 32px !important;
                        font-weight: 900 !important;
                        letter-spacing: 2px;
                        margin: 0;
                    }

                    .monthly-print-subtitle {
                        font-size: 12px !important;
                        font-weight: 700;
                        letter-spacing: 2px;
                        margin: 2px 0 8px;
                    }

                    .monthly-print-header h2 {
                        font-size: 20px !important;
                        font-weight: 800;
                        margin: 6px 0;
                    }

                    .monthly-print-period {
                        font-size: 15px !important;
                        font-weight: 700;
                        margin: 5px 0;
                    }

                    .monthly-print-date {
                        font-size: 12px !important;
                        margin-top: 5px;
                    }

                    .monthly-print-total {
                        text-align: center;
                        border: 2px solid #111827;
                        padding: 10px;
                        margin-bottom: 12px;
                    }

                    .monthly-print-total p {
                        font-size: 13px !important;
                        font-weight: 700;
                        margin: 0;
                    }

                    .monthly-print-total h1 {
                        font-size: 30px !important;
                        font-weight: 900;
                        margin: 4px 0 0;
                    }

                    .monthly-print-statistics {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 8px;
                        margin-bottom: 14px;
                    }

                    .monthly-print-statistics div {
                        border: 1px solid #999;
                        padding: 8px 5px;
                        text-align: center;
                    }

                    .monthly-print-statistics span,
                    .monthly-print-statistics strong {
                        display: block;
                    }

                    .monthly-print-statistics span {
                        font-size: 10px !important;
                    }

                    .monthly-print-statistics strong {
                        font-size: 13px !important;
                        margin-top: 3px;
                    }

                    .monthly-print-section {
                        margin-top: 12px;
                    }

                    .monthly-print-section h3 {
                        font-size: 14px !important;
                        font-weight: 800;
                        border-bottom: 1px solid #333;
                        padding-bottom: 5px;
                        margin-bottom: 6px;
                    }

                    .monthly-print-report table {
                        width: 100%;
                        border-collapse: collapse !important;
                        table-layout: auto;
                    }

                    .monthly-print-report th {
                        background: #eeeeee !important;
                        font-size: 10px !important;
                        font-weight: 800;
                        text-align: left;
                        padding: 6px 5px;
                        border: 1px solid #777;
                    }

                    .monthly-print-report td {
                        font-size: 10px !important;
                        padding: 5px;
                        border: 1px solid #999;
                        vertical-align: top;
                    }

                    .monthly-print-amount {
                        text-align: right !important;
                        white-space: nowrap;
                    }

                    .monthly-print-muted {
                        color: #666;
                        font-size: 9px !important;
                        margin-top: 2px;
                    }

                    .monthly-print-product-list {
                        display: flex;
                        flex-direction: column;
                        gap: 2px;
                    }

                    .monthly-print-product-item {
                        display: flex;
                        justify-content: space-between;
                        gap: 6px;
                        font-size: 10px !important;
                        line-height: 1.35;
                    }

                    .monthly-print-product-item span {
                        flex: 1;
                    }

                    .monthly-print-product-item strong {
                        white-space: nowrap;
                    }

                    .monthly-print-empty {
                        text-align: center;
                        padding: 12px !important;
                    }

                    .monthly-print-financial {
                        width: 55%;
                        margin: 14px 0 0 auto;
                        border-top: 2px solid #111827;
                        padding-top: 7px;
                    }

                    .monthly-print-financial div {
                        display: flex;
                        justify-content: space-between;
                        gap: 12px;
                        padding: 4px 0;
                        font-size: 11px !important;
                    }

                    .monthly-print-financial .monthly-print-grand-total {
                        font-size: 14px !important;
                        font-weight: 900;
                        border-bottom: 1px solid #777;
                        padding-bottom: 7px;
                        margin-bottom: 5px;
                    }

                    .monthly-print-footer {
                        text-align: center;
                        border-top: 1px solid #777;
                        margin-top: 18px;
                        padding-top: 9px;
                        page-break-inside: avoid;
                    }

                    .monthly-print-footer strong {
                        font-size: 12px !important;
                    }

                    .monthly-print-footer p {
                        font-size: 10px !important;
                        margin-top: 3px;
                    }

                    .monthly-print-report tr {
                        page-break-inside: avoid;
                    }
                }

            `}</style>

        </>
    );
}
