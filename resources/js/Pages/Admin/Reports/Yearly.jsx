
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
    year = "",
    startDate = "",
    endDate = "",
    stats = {},
    paymentMethods = {},
    monthlySales = [],
    sales = [],
}) {
    const formatCurrency = (amount) => {
        return `TZS ${Number(amount || 0).toLocaleString("en-TZ", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    };

    const formatPercent = (value) => {
        return `${Number(value || 0).toFixed(2)}%`;
    };

    const safeStats = {
        netSales: 0,
        grossProfit: 0,
        profitMargin: 0,
        transactions: 0,
        costOfGoods: 0,
        grossRevenue: 0,
        amountCollected: 0,
        outstanding: 0,
        totalDiscount: 0,
        itemsSold: 0,
        ...stats,
    };

    const safePaymentMethods = {
        cash: 0,
        mobileMoney: 0,
        bank: 0,
        credit: 0,
        ...paymentMethods,
    };

    const safeMonthlySales = Array.isArray(monthlySales)
        ? monthlySales
        : [];

    const safeSales = Array.isArray(sales) ? sales : [];

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
            safeMonthlySales.find(
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

    const getSaleDate = (sale) => {
        const date =
            sale.date ||
            sale.sold_at ||
            sale.created_at ||
            "-";

        if (date === "-") return "-";

        return String(date).substring(0, 10);
    };

    const getInvoiceNumber = (sale) => {
        return (
            sale.invoice_number ||
            sale.reference ||
            sale.receipt_number ||
            sale.invoice ||
            sale.id ||
            "-"
        );
    };

    const getCustomerName = (sale) => {
        return (
            sale.customer?.name ||
            sale.customer_name ||
            "Walk-in Customer"
        );
    };

    const getSaleAmount = (sale) => {
        return (
            sale.net_total ??
            sale.total_amount ??
            sale.total ??
            sale.amount ??
            0
        );
    };

    const displayYear = year || "Yearly";

    return (
        <>
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
                                        {formatCurrency(safeStats.netSales)}
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
                                        {formatCurrency(safeStats.grossProfit)}
                                    </h3>

                                    <p className="mt-1 text-xs text-gray-500">
                                        {formatPercent(safeStats.profitMargin)} profit
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
                                            safeStats.transactions || 0
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
                                        {formatCurrency(safeStats.costOfGoods)}
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
                                {formatCurrency(safeStats.grossRevenue)}
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
                                {formatCurrency(safeStats.amountCollected)}
                            </h3>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">
                                Outstanding
                            </p>

                            <h3 className="mt-2 text-xl font-bold text-red-600">
                                {formatCurrency(safeStats.outstanding)}
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
                                    {formatCurrency(safePaymentMethods.cash)}
                                </p>
                            </div>

                            <div className="p-5">
                                <p className="text-sm text-gray-500">
                                    Mobile Money
                                </p>

                                <p className="mt-2 text-xl font-bold text-gray-900">
                                    {formatCurrency(safePaymentMethods.mobileMoney)}
                                </p>
                            </div>

                            <div className="p-5">
                                <p className="text-sm text-gray-500">Bank</p>

                                <p className="mt-2 text-xl font-bold text-gray-900">
                                    {formatCurrency(safePaymentMethods.bank)}
                                </p>
                            </div>

                            <div className="p-5">
                                <p className="text-sm text-gray-500">Credit</p>

                                <p className="mt-2 text-xl font-bold text-gray-900">
                                    {formatCurrency(safePaymentMethods.credit)}
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
                                        <th className="px-5 py-4">Month</th>
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
            </AdminLayout>

            {/* PRINT-ONLY YEARLY REPORT */}
            <div className="yearly-print-report">

                <div className="yearly-print-header">
                    <h1>MAUZOVIBE</h1>
                    <p className="yearly-print-subtitle">
                        SALES MANAGEMENT REPORT
                    </p>
                    <h2>YEARLY SALES REPORT</h2>

                    <div className="yearly-print-period">
                        <strong>Reporting Period:</strong> {displayYear}
                        <br />
                        <strong>From:</strong> {startDate || "-"}
                        <span className="yearly-print-separator"> | </span>
                        <strong>To:</strong> {endDate || "-"}
                    </div>
                </div>

                {/* Main Total */}
                <div className="yearly-print-total">
                    <span>TOTAL NET SALES</span>
                    <strong>{formatCurrency(safeStats.netSales)}</strong>
                </div>

                {/* Key Statistics */}
                <div className="yearly-print-stats">
                    <div>
                        <span>Total Transactions</span>
                        <strong>
                            {Number(safeStats.transactions || 0).toLocaleString()}
                        </strong>
                    </div>

                    <div>
                        <span>Items Sold</span>
                        <strong>
                            {Number(
                                safeStats.itemsSold ||
                                safeStats.items_sold ||
                                0
                            ).toLocaleString()}
                        </strong>
                    </div>

                    <div>
                        <span>Gross Profit</span>
                        <strong>{formatCurrency(safeStats.grossProfit)}</strong>
                    </div>

                    <div>
                        <span>Profit Margin</span>
                        <strong>{formatPercent(safeStats.profitMargin)}</strong>
                    </div>

                    <div>
                        <span>Total Discounts</span>
                        <strong>
                            {formatCurrency(
                                safeStats.totalDiscount ||
                                safeStats.totalDiscounts ||
                                0
                            )}
                        </strong>
                    </div>
                </div>

                {/* Monthly Summary */}
                <div className="yearly-print-section">
                    <h3>MONTHLY SALES SUMMARY</h3>

                    <table className="yearly-print-table">
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Transactions</th>
                                <th>Items Sold</th>
                                <th>Revenue (TZS)</th>
                                <th>Profit (TZS)</th>
                                <th>Margin</th>
                            </tr>
                        </thead>

                        <tbody>
                            {months.map((monthName, index) => {
                                const data = getMonthData(index + 1);

                                const margin =
                                    Number(data.revenue || 0) > 0
                                        ? (Number(data.profit || 0) /
                                            Number(data.revenue)) *
                                          100
                                        : 0;

                                return (
                                    <tr key={monthName}>
                                        <td>{monthName}</td>
                                        <td className="text-center">
                                            {Number(
                                                data.transactions || 0
                                            ).toLocaleString()}
                                        </td>
                                        <td className="text-center">
                                            {Number(
                                                data.items_sold || 0
                                            ).toLocaleString()}
                                        </td>
                                        <td className="text-right">
                                            {formatCurrency(data.revenue)}
                                        </td>
                                        <td className="text-right">
                                            {formatCurrency(data.profit)}
                                        </td>
                                        <td className="text-right">
                                            {formatPercent(margin)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Sales Transactions */}
                <div className="yearly-print-section">
                    <h3>SALES TRANSACTIONS</h3>

                    <table className="yearly-print-table yearly-transactions-table">
                        <thead>
                            <tr>
                                <th>Invoice</th>
                                <th>Date</th>
                                <th>Customer</th>
                                <th>Products Sold</th>
                                <th className="text-right">Amount (TZS)</th>
                            </tr>
                        </thead>

                        <tbody>
                            {safeSales.length > 0 ? (
                                safeSales.map((sale, index) => (
                                    <tr key={sale.id || index}>
                                        <td>
                                            {getInvoiceNumber(sale)}
                                        </td>

                                        <td>{getSaleDate(sale)}</td>

                                        <td>{getCustomerName(sale)}</td>

                                        <td className="yearly-print-products">
                                            {Array.isArray(sale.items) &&
                                            sale.items.length > 0 ? (
                                                sale.items.map((item, itemIndex) => (
                                                    <div
                                                        key={item.id || itemIndex}
                                                        className="yearly-print-product-item"
                                                    >
                                                        <span>
                                                            {item.product_name ||
                                                                item.product?.name ||
                                                                "Unknown Product"}
                                                        </span>

                                                        <strong>
                                                            × {Number(
                                                                item.quantity || 0
                                                            ).toLocaleString()}
                                                        </strong>
                                                    </div>
                                                ))
                                            ) : (
                                                <span>-</span>
                                            )}
                                        </td>

                                        <td className="text-right">
                                            {formatCurrency(getSaleAmount(sale))}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="yearly-print-empty">
                                        No sales transactions found for this year.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Financial Summary */}
                <div className="yearly-print-section yearly-print-financials">
                    <h3>FINANCIAL SUMMARY</h3>

                    <table>
                        <tbody>
                            <tr>
                                <td>Gross Revenue</td>
                                <td>{formatCurrency(safeStats.grossRevenue)}</td>
                            </tr>

                            <tr>
                                <td>Total Discounts</td>
                                <td>
                                    {formatCurrency(
                                        safeStats.totalDiscount ||
                                        safeStats.totalDiscounts ||
                                        0
                                    )}
                                </td>
                            </tr>

                            <tr className="yearly-print-highlight">
                                <td>Net Sales</td>
                                <td>{formatCurrency(safeStats.netSales)}</td>
                            </tr>

                            <tr>
                                <td>Cost of Goods</td>
                                <td>{formatCurrency(safeStats.costOfGoods)}</td>
                            </tr>

                            <tr className="yearly-print-highlight">
                                <td>Gross Profit</td>
                                <td>{formatCurrency(safeStats.grossProfit)}</td>
                            </tr>

                            <tr>
                                <td>Amount Collected</td>
                                <td>
                                    {formatCurrency(safeStats.amountCollected)}
                                </td>
                            </tr>

                            <tr>
                                <td>Outstanding</td>
                                <td>{formatCurrency(safeStats.outstanding)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Payment Methods */}
                <div className="yearly-print-section">
                    <h3>PAYMENT METHODS</h3>

                    <table className="yearly-print-table">
                        <thead>
                            <tr>
                                <th>Payment Method</th>
                                <th className="text-right">Amount (TZS)</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Cash</td>
                                <td className="text-right">
                                    {formatCurrency(safePaymentMethods.cash)}
                                </td>
                            </tr>

                            <tr>
                                <td>Mobile Money</td>
                                <td className="text-right">
                                    {formatCurrency(safePaymentMethods.mobileMoney)}
                                </td>
                            </tr>

                            <tr>
                                <td>Bank</td>
                                <td className="text-right">
                                    {formatCurrency(safePaymentMethods.bank)}
                                </td>
                            </tr>

                            <tr>
                                <td>Credit</td>
                                <td className="text-right">
                                    {formatCurrency(safePaymentMethods.credit)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="yearly-print-footer">
                    <strong>MAUZOVIBE</strong>
                    <p>Powered by NAC Technologies</p>
                    <small>
                        Yearly Sales Report • {displayYear}
                    </small>
                </div>
            </div>

            {/* PRINT STYLES */}
            <style>{`
                .yearly-print-report {
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

                    .yearly-print-report,
                    .yearly-print-report * {
                        visibility: visible !important;
                    }

                    .yearly-print-report {
                        display: block !important;
                        position: absolute !important;
                        left: 0 !important;
                        top: 0 !important;
                        width: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        background: #ffffff !important;
                        color: #111111 !important;
                        font-family: Arial, Helvetica, sans-serif !important;
                        font-size: 9px !important;
                    }

                    .yearly-print-header {
                        text-align: center;
                        border-bottom: 2px solid #222;
                        padding-bottom: 10px;
                        margin-bottom: 12px;
                    }

                    .yearly-print-header h1 {
                        font-size: 25px !important;
                        font-weight: 900 !important;
                        letter-spacing: 2px;
                        margin: 0 0 2px !important;
                    }

                    .yearly-print-subtitle {
                        font-size: 9px !important;
                        letter-spacing: 2px;
                        margin: 0 0 8px !important;
                    }

                    .yearly-print-header h2 {
                        font-size: 15px !important;
                        font-weight: 800 !important;
                        margin: 5px 0 8px !important;
                    }

                    .yearly-print-period {
                        font-size: 9px !important;
                        line-height: 1.7;
                    }

                    .yearly-print-separator {
                        padding: 0 8px;
                    }

                    .yearly-print-total {
                        display: flex !important;
                        justify-content: space-between !important;
                        align-items: center !important;
                        background: #f0f0f0 !important;
                        border: 1px solid #999 !important;
                        padding: 11px 12px !important;
                        margin-bottom: 10px !important;
                    }

                    .yearly-print-total span {
                        font-size: 11px !important;
                        font-weight: 700 !important;
                    }

                    .yearly-print-total strong {
                        font-size: 17px !important;
                        font-weight: 900 !important;
                    }

                    .yearly-print-stats {
                        display: grid !important;
                        grid-template-columns: repeat(5, 1fr) !important;
                        gap: 5px !important;
                        margin-bottom: 14px !important;
                    }

                    .yearly-print-stats > div {
                        border: 1px solid #bbb !important;
                        padding: 7px 5px !important;
                        text-align: center !important;
                    }

                    .yearly-print-stats span {
                        display: block !important;
                        font-size: 8px !important;
                        margin-bottom: 5px !important;
                    }

                    .yearly-print-stats strong {
                        display: block !important;
                        font-size: 10px !important;
                    }

                    .yearly-print-section {
                        margin-top: 13px !important;
                        page-break-inside: auto !important;
                    }

                    .yearly-print-section h3 {
                        font-size: 10px !important;
                        font-weight: 800 !important;
                        padding: 6px 7px !important;
                        background: #e9e9e9 !important;
                        border: 1px solid #aaa !important;
                        margin: 0 0 5px !important;
                        letter-spacing: 0.4px;
                    }

                    .yearly-print-table {
                        width: 100% !important;
                        border-collapse: collapse !important;
                        table-layout: auto !important;
                        font-size: 8px !important;
                    }

                    .yearly-print-table thead {
                        display: table-header-group !important;
                    }

                    .yearly-print-table th {
                        background: #f1f1f1 !important;
                        font-weight: 700 !important;
                        text-align: left !important;
                        border: 1px solid #999 !important;
                        padding: 6px 5px !important;
                    }

                    .yearly-print-table td {
                        border: 1px solid #bbb !important;
                        padding: 5px !important;
                        vertical-align: top !important;
                        overflow-wrap: anywhere !important;
                    }

                    .yearly-print-table tr {
                        page-break-inside: avoid !important;
                    }

                    .yearly-print-table .text-center {
                        text-align: center !important;
                    }

                    .yearly-print-table .text-right {
                        text-align: right !important;
                    }

                    .yearly-transactions-table {
                        font-size: 7.5px !important;
                    }

                    .yearly-transactions-table th:nth-child(1) {
                        width: 12%;
                    }

                    .yearly-transactions-table th:nth-child(2) {
                        width: 12%;
                    }

                    .yearly-transactions-table th:nth-child(3) {
                        width: 17%;
                    }

                    .yearly-transactions-table th:nth-child(4) {
                        width: 39%;
                    }

                    .yearly-transactions-table th:nth-child(5) {
                        width: 20%;
                    }

                    .yearly-print-products {
                        min-width: 130px;
                    }

                    .yearly-print-product-item {
                        display: flex !important;
                        justify-content: space-between !important;
                        gap: 8px !important;
                        padding: 2px 0 !important;
                        border-bottom: 1px dotted #ddd !important;
                    }

                    .yearly-print-product-item:last-child {
                        border-bottom: none !important;
                    }

                    .yearly-print-product-item strong {
                        white-space: nowrap !important;
                    }

                    .yearly-print-empty {
                        text-align: center !important;
                        padding: 12px !important;
                    }

                    .yearly-print-financials {
                        width: 65% !important;
                        margin-left: auto !important;
                    }

                    .yearly-print-financials table {
                        width: 100% !important;
                        border-collapse: collapse !important;
                    }

                    .yearly-print-financials td {
                        padding: 6px 8px !important;
                        border-bottom: 1px solid #ddd !important;
                        font-size: 9px !important;
                    }

                    .yearly-print-financials td:last-child {
                        text-align: right !important;
                        font-weight: 700 !important;
                    }

                    .yearly-print-highlight {
                        font-weight: 800 !important;
                        background: #f1f1f1 !important;
                    }

                    .yearly-print-footer {
                        text-align: center !important;
                        border-top: 1px solid #777 !important;
                        padding-top: 9px !important;
                        margin-top: 18px !important;
                        page-break-inside: avoid !important;
                    }

                    .yearly-print-footer strong {
                        font-size: 12px !important;
                        letter-spacing: 1px;
                    }

                    .yearly-print-footer p {
                        font-size: 9px !important;
                        font-weight: 700 !important;
                        margin: 4px 0 !important;
                    }

                    .yearly-print-footer small {
                        font-size: 8px !important;
                    }
                }
            `}</style>
        </>
    );
}
