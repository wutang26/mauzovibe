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
    MagnifyingGlassIcon,
    ArrowPathIcon,
    PrinterIcon,
} from "@heroicons/react/24/outline";

export default function Daily({
    reportDate,
    summary,
    paymentMethods,
    sales,
}) {
    const formatMoney = (amount) => {
        return new Intl.NumberFormat("en-TZ", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(Number(amount || 0));
    };

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

    const handleDateChange = (e) => {
        router.get(
            route("admin.reports.daily"),
            {
                date: e.target.value,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    //Handle Printing
    const handlePrint = () => {
        window.print();
    };

    return (

        <>
            <AdminLayout>
                <Head title="Daily Report" />

                <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">

                        {/* Header */}
                        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 shadow-sm">
                                        <CalendarDaysIcon className="h-6 w-6 text-white" />
                                    </div>

                                    <div>
                                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                            Daily Report
                                        </h1>

                                        <p className="text-sm text-slate-500">
                                            Monitor your daily sales, payments and profit.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Date Filter */}
                            {/* Report Actions */}
                            <div className="flex flex-wrap items-center gap-2">

                                {/* Date Filter */}
                                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">

                                    <div className="flex items-center gap-2 px-2">
                                        <CalendarDaysIcon className="h-5 w-5 text-green-600" />

                                        <span className="hidden text-sm font-medium text-slate-600 sm:block">
                                            Report Date
                                        </span>
                                    </div>

                                    <input
                                        type="date"
                                        value={reportDate}
                                        onChange={handleDateChange}
                                        className="rounded-lg border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            router.get(
                                                route("admin.reports.daily"),
                                                {
                                                    date: reportDate,
                                                },
                                                {
                                                    preserveState: true,
                                                    preserveScroll: true,
                                                }
                                            )
                                        }
                                        className="flex items-center justify-center rounded-lg bg-green-600 p-2 text-white transition hover:bg-green-700"
                                        title="Refresh report"
                                    >
                                        <ArrowPathIcon className="h-5 w-5" />
                                    </button>

                                </div>

                                {/* Print Button */}
                                <button
                                    type="button"
                                    onClick={handlePrint}
                                    className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                                >
                                    <PrinterIcon className="h-5 w-5" />
                                    <span>Print Report</span>
                                </button>

                            </div>
                        </div>

                        {/* Summary Cards */}
                        {/* Financial Summary */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                            {/* Gross Revenue */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Gross Revenue
                                        </p>

                                        <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                            TZS {formatMoney(summary.grossRevenue)}
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

                            {/* Discounts */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Discounts
                                        </p>

                                        <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                            TZS {formatMoney(summary.totalDiscount)}
                                        </h2>

                                        <p className="mt-2 text-xs text-slate-500">
                                            Discounts given
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-purple-50 p-3">
                                        <ReceiptPercentIcon className="h-6 w-6 text-purple-600" />
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
                                            TZS {formatMoney(summary.netSales)}
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
                                            TZS {formatMoney(summary.totalProfit)}
                                        </h2>

                                        <p className="mt-2 text-xs text-slate-500">
                                            {summary.profitMargin}% profit margin
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-green-50 p-3">
                                        <ArrowTrendingUpIcon className="h-6 w-6 text-green-600" />
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Collection & Operations Summary */}
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
                                            TZS {formatMoney(summary.totalCost)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Amount Collected */}
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
                                            TZS {formatMoney(summary.totalPaid)}
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
                                            TZS {formatMoney(summary.totalOutstanding)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Transactions */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-xl bg-indigo-50 p-3">
                                        <ShoppingCartIcon className="h-6 w-6 text-indigo-600" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Transactions
                                        </p>

                                        <p className="mt-1 text-xl font-bold text-slate-900">
                                            {summary.totalTransactions}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Secondary Statistics */}
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">

                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-xl bg-purple-50 p-3">
                                        <ReceiptPercentIcon className="h-6 w-6 text-purple-600" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Total Discount
                                        </p>

                                        <p className="mt-1 text-xl font-bold text-slate-900">
                                            TZS {formatMoney(summary.totalDiscount)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-xl bg-indigo-50 p-3">
                                        <ShoppingCartIcon className="h-6 w-6 text-indigo-600" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Items Sold
                                        </p>

                                        <p className="mt-1 text-xl font-bold text-slate-900">
                                            {summary.totalItemsSold}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-xl bg-teal-50 p-3">
                                        <BanknotesIcon className="h-6 w-6 text-teal-600" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Amount Paid
                                        </p>

                                        <p className="mt-1 text-xl font-bold text-slate-900">
                                            TZS {formatMoney(summary.totalPaid)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="border-b border-slate-100 px-5 py-4">
                                <h2 className="text-lg font-bold text-slate-900">
                                    Payment Methods
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Breakdown of today's sales by payment method.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">

                                {Object.entries(paymentMethods).map(
                                    ([method, amount]) => {
                                        const Icon = getPaymentIcon(method);

                                        return (
                                            <div
                                                key={method}
                                                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-lg bg-white p-2 shadow-sm">
                                                            <Icon className="h-5 w-5 text-green-600" />
                                                        </div>

                                                        <span className="text-sm font-medium text-slate-600">
                                                            {formatPaymentMethod(
                                                                method
                                                            )}
                                                        </span>
                                                    </div>
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

                        {/* Sales Table */}
                        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                            <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">
                                        Daily Sales
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        All completed sales for the selected date.
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-500">
                                    <MagnifyingGlassIcon className="h-4 w-4" />
                                    {sales.length} transactions
                                </div>
                            </div>

                            {sales.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-slate-100">
                                        <thead className="bg-slate-50">
                                            <tr>
                                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                    Invoice
                                                </th>

                                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                    Time
                                                </th>

                                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                    Customer
                                                </th>

                                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                    Cashier
                                                </th>

                                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                    Items
                                                </th>

                                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                    Payment
                                                </th>

                                                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                    Amount
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-slate-100 bg-white">
                                            {sales.map((sale) => (
                                                <tr
                                                    key={sale.id}
                                                    className="transition hover:bg-slate-50"
                                                >
                                                    <td className="whitespace-nowrap px-5 py-4">
                                                        <span className="font-semibold text-green-700">
                                                            {sale.invoice_number}
                                                        </span>
                                                    </td>

                                                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                                                        {sale.time}
                                                    </td>

                                                    <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-700">
                                                        {sale.customer}
                                                    </td>

                                                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                                                        {sale.cashier}
                                                    </td>

                                                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                                                        {sale.items_count}
                                                    </td>

                                                    <td className="whitespace-nowrap px-5 py-4">
                                                        <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                                                            {formatPaymentMethod(
                                                                sale.payment_method
                                                            )}
                                                        </span>
                                                    </td>

                                                    <td className="whitespace-nowrap px-5 py-4 text-right text-sm font-bold text-slate-900">
                                                        TZS{" "}
                                                        {formatMoney(sale.total)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                                    <div className="rounded-full bg-slate-100 p-4">
                                        <ShoppingCartIcon className="h-8 w-8 text-slate-400" />
                                    </div>

                                    <h3 className="mt-4 text-lg font-semibold text-slate-900">
                                        No sales found
                                    </h3>

                                    <p className="mt-1 max-w-sm text-sm text-slate-500">
                                        There are no completed sales for the selected
                                        date.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="mt-6 text-center text-xs text-slate-400">
                            MauzoVibe Daily Report • Generated from your sales data
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}