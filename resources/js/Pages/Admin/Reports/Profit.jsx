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

export default function Profit({
    startDate,
    endDate,
    summary,
    products = [],
    sales = [],
}) {
    const [filters, setFilters] = React.useState({
        start_date: startDate || "",
        end_date: endDate || "",
    });

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

    return (
        <AdminLayout>
            <Head title="Profit Report" />

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
                            {summary.totalTransactions} completed transactions
                        </div>

                    </div>
                </div>

                {/* Summary Cards */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    {/* Net Sales */}
                    <SummaryCard
                        title="Net Sales"
                        value={`TZS ${formatMoney(summary.netSales)}`}
                        subtitle="Sales after discounts"
                        icon={CurrencyDollarIcon}
                    />

                    {/* Cost */}
                    <SummaryCard
                        title="Cost of Goods"
                        value={`TZS ${formatMoney(summary.totalCost)}`}
                        subtitle="Total product cost"
                        icon={CubeIcon}
                    />

                    {/* Profit */}
                    <SummaryCard
                        title="Total Profit"
                        value={`TZS ${formatMoney(summary.totalProfit)}`}
                        subtitle="Gross profit"
                        icon={ArrowTrendingUpIcon}
                        highlight
                    />

                    {/* Margin */}
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
                                {products.length} Products
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

                                {products.length > 0 ? (
                                    products.map((product) => (

                                        <tr
                                            key={product.product_id}
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
                                                        product.margin >= 30
                                                            ? "bg-green-100 text-green-700"
                                                            : product.margin >= 15
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

                                        <td
                                            colSpan="6"
                                            className="px-5 py-12 text-center"
                                        >

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

                            {products.length > 0 && (
                                <tfoot className="border-t-2 border-gray-200 bg-gray-50">

                                    <tr>

                                        <td className="px-5 py-4 text-sm font-bold text-gray-900">
                                            Total
                                        </td>

                                        <td className="px-5 py-4 text-right text-sm font-bold text-gray-900">
                                            {formatNumber(
                                                products.reduce(
                                                    (sum, item) =>
                                                        sum +
                                                        Number(item.quantity || 0),
                                                    0
                                                )
                                            )}
                                        </td>

                                        <td className="px-5 py-4 text-right text-sm font-bold text-gray-900">
                                            TZS{" "}
                                            {formatMoney(
                                                products.reduce(
                                                    (sum, item) =>
                                                        sum +
                                                        Number(item.revenue || 0),
                                                    0
                                                )
                                            )}
                                        </td>

                                        <td className="px-5 py-4 text-right text-sm font-bold text-gray-900">
                                            TZS{" "}
                                            {formatMoney(
                                                products.reduce(
                                                    (sum, item) =>
                                                        sum +
                                                        Number(item.cost || 0),
                                                    0
                                                )
                                            )}
                                        </td>

                                        <td className="px-5 py-4 text-right text-sm font-bold text-green-600">
                                            TZS{" "}
                                            {formatMoney(
                                                products.reduce(
                                                    (sum, item) =>
                                                        sum +
                                                        Number(item.profit || 0),
                                                    0
                                                )
                                            )}
                                        </td>

                                        <td className="px-5 py-4 text-right">
                                            —
                                        </td>

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

                                {sales.length > 0 ? (
                                    sales.map((sale) => (

                                        <tr
                                            key={sale.id}
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
                                                        sale.margin >= 30
                                                            ? "text-green-600"
                                                            : sale.margin >= 15
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
                            highlight
                                ? "text-green-600"
                                : "text-gray-900"
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