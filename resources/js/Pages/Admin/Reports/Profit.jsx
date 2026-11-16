
import React from "react";
import { Head, router } from "@inertiajs/react";

import AdminLayout from "@/Layouts/AdminLayout";

import {
    BanknotesIcon,
    ChartBarIcon,
    CurrencyDollarIcon,
    CubeIcon,
    ArrowTrendingUpIcon,
    ReceiptPercentIcon,
    PrinterIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import "./Profit.css";

export default function Profit({
    startDate,
    endDate,
    summary = {},
    products = [],
    sales = [],
}) {
    const [filters, setFilters] = React.useState({
        start_date: startDate || "",
        end_date: endDate || "",
    });

    const safeProducts = Array.isArray(products) ? products : [];
    const safeSales = Array.isArray(sales) ? sales : [];

    const formatMoney = (amount) => {
        return new Intl.NumberFormat("en-TZ", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(Number(amount || 0));
    };

    const formatNumber = (amount) => {
        return new Intl.NumberFormat("en-TZ", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(Number(amount || 0));
    };

    const handleFilter = (e) => {
        e.preventDefault();

        router.get(
            route("admin.reports.profit"),
            filters,
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handlePrint = () => {
        window.print();
    };

    // Product totals
    const productTotals = safeProducts.reduce(
        (totals, product) => {
            totals.quantity += Number(product.quantity || 0);
            totals.revenue += Number(product.revenue || 0);
            totals.cost += Number(product.cost || 0);
            totals.profit += Number(product.profit || 0);

            return totals;
        },
        {
            quantity: 0,
            revenue: 0,
            cost: 0,
            profit: 0,
        }
    );

    // Sales totals
    const salesTotals = safeSales.reduce(
        (totals, sale) => {
            totals.sales += Number(sale.sales || 0);
            totals.cost += Number(sale.cost || 0);
            totals.profit += Number(sale.profit || 0);

            return totals;
        },
        {
            sales: 0,
            cost: 0,
            profit: 0,
        }
    );

    const generatedAt = new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <AdminLayout>
            <Head title="Profit Report" />

            {/* =====================================================
                PRINT-ONLY FINANCIAL REPORT
            ====================================================== */}

            <div className="profit-print-area">

                {/* Report Header */}
                <div className="print-report-header">

                    <div className="print-brand-row">

                        <div className="print-brand-mark">
                            MV
                        </div>

                        <div className="print-brand-details">
                            <h1>MAUZOVIBE</h1>
                            <p>BUSINESS MANAGEMENT SYSTEM</p>
                        </div>

                    </div>

                    <div className="print-report-title">
                        <h2>PROFIT &amp; FINANCIAL REPORT</h2>
                        <p>CONFIDENTIAL BUSINESS REPORT</p>
                    </div>

                    <div className="print-header-line"></div>

                    <div className="print-report-meta">

                        <div>
                            <span className="print-meta-label">
                                REPORT PERIOD
                            </span>

                            <strong>
                                {startDate || "Not specified"} — {endDate || "Not specified"}
                            </strong>
                        </div>

                        <div>
                            <span className="print-meta-label">
                                GENERATED ON
                            </span>

                            <strong>{generatedAt}</strong>
                        </div>

                        <div>
                            <span className="print-meta-label">
                                TOTAL TRANSACTIONS
                            </span>

                            <strong>
                                {formatNumber(summary.totalTransactions ?? safeSales.length)}
                            </strong>
                        </div>

                        <div>
                            <span className="print-meta-label">
                                CURRENCY
                            </span>

                            <strong>Tanzanian Shilling (TZS)</strong>
                        </div>

                    </div>
                </div>

                {/* Financial Summary */}
                <section className="print-report-section">

                    <div className="print-section-heading">
                        <h3>01. FINANCIAL SUMMARY</h3>
                        <span>BUSINESS PERFORMANCE OVERVIEW</span>
                    </div>

                    <div className="print-summary-grid">

                        <div className="print-summary-item">
                            <span>Gross Revenue</span>
                            <strong>
                                TZS {formatMoney(summary.grossRevenue)}
                            </strong>
                        </div>

                        <div className="print-summary-item">
                            <span>Total Discounts</span>
                            <strong>
                                TZS {formatMoney(summary.totalDiscount)}
                            </strong>
                        </div>

                        <div className="print-summary-item">
                            <span>Net Sales</span>
                            <strong>
                                TZS {formatMoney(summary.netSales)}
                            </strong>
                        </div>

                        <div className="print-summary-item">
                            <span>Cost of Goods</span>
                            <strong>
                                TZS {formatMoney(summary.totalCost)}
                            </strong>
                        </div>

                        <div className="print-summary-item print-summary-highlight">
                            <span>Total Profit</span>
                            <strong>
                                TZS {formatMoney(summary.totalProfit)}
                            </strong>
                        </div>

                        <div className="print-summary-item">
                            <span>Profit Margin</span>
                            <strong>
                                {formatNumber(summary.profitMargin)}%
                            </strong>
                        </div>

                        <div className="print-summary-item">
                            <span>Amount Paid</span>
                            <strong>
                                TZS {formatMoney(summary.totalPaid)}
                            </strong>
                        </div>

                        <div className="print-summary-item">
                            <span>Outstanding</span>
                            <strong>
                                TZS {formatMoney(summary.totalOutstanding)}
                            </strong>
                        </div>

                    </div>
                </section>

                {/* Product Profitability */}
                <section className="print-report-section">

                    <div className="print-section-heading">
                        <h3>02. PRODUCT PROFITABILITY</h3>

                        <span>
                            {safeProducts.length} PRODUCTS
                        </span>
                    </div>

                    <table className="print-report-table">

                        <thead>
                            <tr>
                                <th className="print-col-number">#</th>
                                <th>PRODUCT / SKU</th>
                                <th className="text-right">QTY SOLD</th>
                                <th className="text-right">REVENUE</th>
                                <th className="text-right">COST</th>
                                <th className="text-right">PROFIT</th>
                                <th className="text-right">MARGIN</th>
                            </tr>
                        </thead>

                        <tbody>
                            {safeProducts.length > 0 ? (
                                safeProducts.map((product, index) => (
                                    <tr key={product.product_id ?? index}>
                                        <td>{index + 1}</td>

                                        <td>
                                            <strong>
                                                {product.product || "Unknown Product"}
                                            </strong>

                                            <small>
                                                SKU: {product.sku || "-"}
                                            </small>
                                        </td>

                                        <td className="text-right">
                                            {formatNumber(product.quantity)}
                                        </td>

                                        <td className="text-right">
                                            {formatMoney(product.revenue)}
                                        </td>

                                        <td className="text-right">
                                            {formatMoney(product.cost)}
                                        </td>

                                        <td className="text-right print-profit-value">
                                            {formatMoney(product.profit)}
                                        </td>

                                        <td className="text-right">
                                            {formatNumber(product.margin)}%
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="print-empty">
                                        No product profitability data found for this period.
                                    </td>
                                </tr>
                            )}
                        </tbody>

                        {safeProducts.length > 0 && (
                            <tfoot>
                                <tr>
                                    <td colSpan="2">
                                        TOTAL
                                    </td>

                                    <td className="text-right">
                                        {formatNumber(productTotals.quantity)}
                                    </td>

                                    <td className="text-right">
                                        {formatMoney(productTotals.revenue)}
                                    </td>

                                    <td className="text-right">
                                        {formatMoney(productTotals.cost)}
                                    </td>

                                    <td className="text-right print-profit-value">
                                        {formatMoney(productTotals.profit)}
                                    </td>

                                    <td className="text-right">—</td>
                                </tr>
                            </tfoot>
                        )}

                    </table>
                </section>

                {/* Sales Profit */}
                <section className="print-report-section">

                    <div className="print-section-heading">
                        <h3>03. SALES PROFIT ANALYSIS</h3>

                        <span>
                            {safeSales.length} TRANSACTIONS
                        </span>
                    </div>

                    <table className="print-report-table print-sales-table">

                        <thead>
                            <tr>
                                <th className="print-col-number">#</th>
                                <th>INVOICE</th>
                                <th>DATE</th>
                                <th>CUSTOMER</th>
                                <th className="text-right">SALES</th>
                                <th className="text-right">COST</th>
                                <th className="text-right">PROFIT</th>
                                <th className="text-right">MARGIN</th>
                            </tr>
                        </thead>

                        <tbody>
                            {safeSales.length > 0 ? (
                                safeSales.map((sale, index) => (
                                    <tr key={sale.id ?? index}>
                                        <td>{index + 1}</td>

                                        <td>
                                            <strong>
                                                {sale.invoice_number || "-"}
                                            </strong>
                                        </td>

                                        <td>
                                            {sale.date || "-"}
                                            {sale.time && (
                                                <small>{sale.time}</small>
                                            )}
                                        </td>

                                        <td>
                                            {sale.customer || "Walk-in Customer"}
                                        </td>

                                        <td className="text-right">
                                            {formatMoney(sale.sales)}
                                        </td>

                                        <td className="text-right">
                                            {formatMoney(sale.cost)}
                                        </td>

                                        <td className="text-right print-profit-value">
                                            {formatMoney(sale.profit)}
                                        </td>

                                        <td className="text-right">
                                            {formatNumber(sale.margin)}%
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="print-empty">
                                        No completed sales found for this period.
                                    </td>
                                </tr>
                            )}
                        </tbody>

                        {safeSales.length > 0 && (
                            <tfoot>
                                <tr>
                                    <td colSpan="4">
                                        TOTAL
                                    </td>

                                    <td className="text-right">
                                        {formatMoney(salesTotals.sales)}
                                    </td>

                                    <td className="text-right">
                                        {formatMoney(salesTotals.cost)}
                                    </td>

                                    <td className="text-right print-profit-value">
                                        {formatMoney(salesTotals.profit)}
                                    </td>

                                    <td className="text-right">—</td>
                                </tr>
                            </tfoot>
                        )}

                    </table>
                </section>

                {/* Final Financial Result */}
                <section className="print-final-result">

                    <div>
                        <span>NET BUSINESS PROFIT</span>
                        <strong>
                            TZS {formatMoney(summary.totalProfit)}
                        </strong>
                    </div>

                    <div>
                        <span>PROFIT MARGIN</span>
                        <strong>
                            {formatNumber(summary.profitMargin)}%
                        </strong>
                    </div>

                </section>

                {/* Report Footer */}
                <footer className="print-report-footer">

                    <div className="print-footer-note">
                        <strong>IMPORTANT NOTICE</strong>

                        <p>
                            This report contains confidential business and
                            financial information. It is intended for
                            authorised management use only.
                        </p>
                    </div>

                    <div className="print-footer-bottom">
                        <span>
                            MAUZOVIBE | BUSINESS MANAGEMENT &amp; REPORTING
                        </span>

                        <strong>
                            Powered by NAC Technologies
                        </strong>
                    </div>

                    <p className="print-generated-note">
                        This is a computer-generated financial report.
                    </p>

                </footer>

            </div>

            {/* =====================================================
                NORMAL SCREEN DASHBOARD
            ====================================================== */}

            <div className="min-h-screen bg-gray-50 p-4 sm:p-6">

                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Profit Report
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Analyse your sales, costs and business profit.
                        </p>
                    </div>

                    <button
                        onClick={handlePrint}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
                    >
                        <PrinterIcon className="h-5 w-5" />
                        Print Report
                    </button>
                </div>

                {/* Date Filter */}
                <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">

                    <form
                        onSubmit={handleFilter}
                        className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-end"
                    >

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                Start Date
                            </label>

                            <input
                                type="date"
                                value={filters.start_date}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        start_date: e.target.value,
                                    })
                                }
                                className="w-full rounded-xl border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                End Date
                            </label>

                            <input
                                type="date"
                                value={filters.end_date}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        end_date: e.target.value,
                                    })
                                }
                                className="w-full rounded-xl border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:ring-green-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                        >
                            <MagnifyingGlassIcon className="h-5 w-5" />
                            Generate Report
                        </button>

                    </form>
                </div>

                {/* Report Period */}
                <div className="mb-6 rounded-xl border border-green-100 bg-green-50 px-4 py-3">

                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-green-700">
                                Report Period
                            </p>

                            <p className="text-sm font-semibold text-gray-900">
                                {startDate} — {endDate}
                            </p>
                        </div>

                        <div className="text-sm text-gray-600">
                            {summary.totalTransactions ?? safeSales.length} completed transactions
                        </div>

                    </div>
                </div>

                {/* Summary Cards */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    <SummaryCard
                        title="Net Sales"
                        value={`TZS ${formatMoney(summary.netSales)}`}
                        subtitle="Sales after discounts"
                        icon={CurrencyDollarIcon}
                    />

                    <SummaryCard
                        title="Cost of Goods"
                        value={`TZS ${formatMoney(summary.totalCost)}`}
                        subtitle="Total product cost"
                        icon={CubeIcon}
                    />

                    <SummaryCard
                        title="Total Profit"
                        value={`TZS ${formatMoney(summary.totalProfit)}`}
                        subtitle="Gross profit"
                        icon={ArrowTrendingUpIcon}
                        highlight
                    />

                    <SummaryCard
                        title="Profit Margin"
                        value={`${formatNumber(summary.profitMargin)}%`}
                        subtitle="Profit percentage"
                        icon={ChartBarIcon}
                    />

                </div>

                {/* Secondary Stats */}
                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    <MiniStat
                        title="Gross Revenue"
                        value={`TZS ${formatMoney(summary.grossRevenue)}`}
                        icon={BanknotesIcon}
                    />

                    <MiniStat
                        title="Discounts"
                        value={`TZS ${formatMoney(summary.totalDiscount)}`}
                        icon={ReceiptPercentIcon}
                    />

                    <MiniStat
                        title="Amount Paid"
                        value={`TZS ${formatMoney(summary.totalPaid)}`}
                        icon={BanknotesIcon}
                    />

                    <MiniStat
                        title="Outstanding"
                        value={`TZS ${formatMoney(summary.totalOutstanding)}`}
                        icon={CurrencyDollarIcon}
                    />

                </div>

                {/* Product Profitability */}
                <div className="mb-8 rounded-2xl border border-gray-100 bg-white shadow-sm">

                    <div className="border-b border-gray-100 px-5 py-4 sm:px-6">

                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                                <h2 className="text-lg font-bold text-gray-900">
                                    Product Profitability
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Profit generated by each product.
                                </p>
                            </div>

                            <div className="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                                {safeProducts.length} Products
                            </div>

                        </div>
                    </div>

                    <div className="overflow-x-auto">

                        <table className="min-w-full divide-y divide-gray-100">

                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Product
                                    </th>

                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Qty Sold
                                    </th>

                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Revenue
                                    </th>

                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Cost
                                    </th>

                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Profit
                                    </th>

                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Margin
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 bg-white">

                                {safeProducts.length > 0 ? (
                                    safeProducts.map((product, index) => (
                                        <tr
                                            key={product.product_id ?? index}
                                            className="transition hover:bg-green-50/40"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="font-semibold text-gray-900">
                                                    {product.product}
                                                </div>

                                                <div className="text-xs text-gray-500">
                                                    SKU: {product.sku}
                                                </div>
                                            </td>

                                            <td className="px-5 py-4 text-right text-sm text-gray-700">
                                                {formatNumber(product.quantity)}
                                            </td>

                                            <td className="px-5 py-4 text-right text-sm font-medium text-gray-700">
                                                TZS {formatMoney(product.revenue)}
                                            </td>

                                            <td className="px-5 py-4 text-right text-sm text-gray-600">
                                                TZS {formatMoney(product.cost)}
                                            </td>

                                            <td className="px-5 py-4 text-right">
                                                <span className="font-bold text-green-600">
                                                    TZS {formatMoney(product.profit)}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4 text-right">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                        Number(product.margin) >= 30
                                                            ? "bg-green-100 text-green-700"
                                                            : Number(product.margin) >= 15
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                                >
                                                    {formatNumber(product.margin)}%
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-5 py-12 text-center">
                                            <CubeIcon className="mx-auto h-10 w-10 text-gray-300" />

                                            <p className="mt-3 text-sm font-medium text-gray-500">
                                                No product profit data found.
                                            </p>

                                            <p className="mt-1 text-xs text-gray-400">
                                                Try selecting another date range.
                                            </p>
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                            {safeProducts.length > 0 && (
                                <tfoot className="border-t-2 border-gray-200 bg-gray-50">
                                    <tr>
                                        <td className="px-5 py-4 text-sm font-bold text-gray-900">
                                            Total
                                        </td>

                                        <td className="px-5 py-4 text-right text-sm font-bold text-gray-900">
                                            {formatNumber(productTotals.quantity)}
                                        </td>

                                        <td className="px-5 py-4 text-right text-sm font-bold text-gray-900">
                                            TZS {formatMoney(productTotals.revenue)}
                                        </td>

                                        <td className="px-5 py-4 text-right text-sm font-bold text-gray-900">
                                            TZS {formatMoney(productTotals.cost)}
                                        </td>

                                        <td className="px-5 py-4 text-right text-sm font-bold text-green-600">
                                            TZS {formatMoney(productTotals.profit)}
                                        </td>

                                        <td className="px-5 py-4 text-right">—</td>
                                    </tr>
                                </tfoot>
                            )}

                        </table>
                    </div>
                </div>

                {/* Sales Profit Table */}
                <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">

                    <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
                        <h2 className="text-lg font-bold text-gray-900">
                            Sales Profit
                        </h2>

                        <p className="text-sm text-gray-500">
                            Profit generated from individual transactions.
                        </p>
                    </div>

                    <div className="overflow-x-auto">

                        <table className="min-w-full divide-y divide-gray-100">

                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Invoice
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Date
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Customer
                                    </th>

                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Sales
                                    </th>

                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Cost
                                    </th>

                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Profit
                                    </th>

                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Margin
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">

                                {safeSales.length > 0 ? (
                                    safeSales.map((sale, index) => (
                                        <tr
                                            key={sale.id ?? index}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                                                {sale.invoice_number}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                <div>{sale.date}</div>

                                                <div className="text-xs text-gray-400">
                                                    {sale.time}
                                                </div>
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-700">
                                                {sale.customer}
                                            </td>

                                            <td className="px-5 py-4 text-right text-sm font-medium">
                                                TZS {formatMoney(sale.sales)}
                                            </td>

                                            <td className="px-5 py-4 text-right text-sm text-gray-600">
                                                TZS {formatMoney(sale.cost)}
                                            </td>

                                            <td className="px-5 py-4 text-right text-sm font-bold text-green-600">
                                                TZS {formatMoney(sale.profit)}
                                            </td>

                                            <td className="px-5 py-4 text-right">
                                                <span
                                                    className={`text-sm font-semibold ${
                                                        Number(sale.margin) >= 30
                                                            ? "text-green-600"
                                                            : Number(sale.margin) >= 15
                                                            ? "text-yellow-600"
                                                            : "text-red-600"
                                                    }`}
                                                >
                                                    {formatNumber(sale.margin)}%
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="px-5 py-12 text-center text-sm text-gray-500"
                                        >
                                            No completed sales found for this period.
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}

/*
|--------------------------------------------------------------------------
| Summary Card
|--------------------------------------------------------------------------
*/

function SummaryCard({
    title,
    value,
    subtitle,
    icon: Icon,
    highlight = false,
}) {
    return (
        <div
            className={`rounded-2xl border bg-white p-5 shadow-sm ${
                highlight
                    ? "border-green-200 ring-1 ring-green-100"
                    : "border-gray-100"
            }`}
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {title}
                    </p>

                    <p
                        className={`mt-2 text-xl font-bold ${
                            highlight ? "text-green-600" : "text-gray-900"
                        }`}
                    >
                        {value}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                        {subtitle}
                    </p>
                </div>

                <div className="rounded-xl bg-green-50 p-3">
                    <Icon className="h-6 w-6 text-green-600" />
                </div>
            </div>
        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Mini Stat
|--------------------------------------------------------------------------
*/

function MiniStat({
    title,
    value,
    icon: Icon,
}) {
    return (
        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="rounded-xl bg-gray-100 p-3">
                <Icon className="h-5 w-5 text-gray-600" />
            </div>

            <div className="min-w-0">
                <p className="text-xs font-medium text-gray-500">
                    {title}
                </p>

                <p className="mt-1 truncate text-sm font-bold text-gray-900">
                    {value}
                </p>
            </div>
        </div>
    );
}
