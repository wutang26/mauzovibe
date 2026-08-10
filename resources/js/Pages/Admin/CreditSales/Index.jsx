
import React, { useEffect, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import {
    MagnifyingGlassIcon,
    EyeIcon,
    CreditCardIcon,
    UserGroupIcon,
    CurrencyDollarIcon,
    ClockIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    FunnelIcon,
} from "@heroicons/react/24/outline";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Index({
    creditSales,
    branch,
    filters,
}) {
    const [search, setSearch] = useState(filters?.search || "");

    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                route("admin.credit-sales.index"),
                {
                    search: search || undefined,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }, 400);

        return () => clearTimeout(timeout);
    }, [search]);

    /*
    |--------------------------------------------------------------------------
    | Data
    |--------------------------------------------------------------------------
    */

    const sales = creditSales?.data || [];

    /*
    |--------------------------------------------------------------------------
    | Currency
    |--------------------------------------------------------------------------
    */

    const formatCurrency = (amount) => {
        return `${Number(amount || 0).toLocaleString()} TZS`;
    };

    /*
    |--------------------------------------------------------------------------
    | Balance
    |--------------------------------------------------------------------------
    */

    const getBalance = (sale) => {
        return Math.max(
            Number(sale.total || 0) -
                Number(sale.paid_amount || 0),
            0
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    */

    const getStatus = (sale) => {
        if (sale.payment_status === "paid") {
            return {
                label: "Paid",
                className:
                    "bg-emerald-100 text-emerald-700",
                icon: CheckCircleIcon,
            };
        }

        if (sale.payment_status === "partial") {
            return {
                label: "Partial",
                className:
                    "bg-amber-100 text-amber-700",
                icon: ClockIcon,
            };
        }

        return {
            label: "Unpaid",
            className:
                "bg-red-100 text-red-700",
            icon: ExclamationCircleIcon,
        };
    };

    /*
    |--------------------------------------------------------------------------
    | Summary
    |--------------------------------------------------------------------------
    */

    const totalCreditSales =
        creditSales?.total || sales.length;

    const totalAmount = sales.reduce(
        (sum, sale) =>
            sum + Number(sale.total || 0),
        0
    );

    const totalPaid = sales.reduce(
        (sum, sale) =>
            sum + Number(sale.paid_amount || 0),
        0
    );

    const totalBalance = sales.reduce(
        (sum, sale) =>
            sum + getBalance(sale),
        0
    );

    return (
        <AdminLayout>
            <Head title="Credit Sales" />

            <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-950 sm:p-6 lg:p-8">

                <div className="mx-auto max-w-7xl">

                    {/* ======================================================
                        HEADER
                    ====================================================== */}

                    <div className="mb-7">

                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                            <div className="flex items-center gap-4">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 shadow-sm">
                                    <CreditCardIcon className="h-7 w-7 text-emerald-600" />
                                </div>

                                <div>

                                    <div className="flex flex-wrap items-center gap-2">

                                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                                            Credit Sales
                                        </h1>

                                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                                            Outstanding
                                        </span>

                                    </div>

                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        Manage customer credit sales and outstanding balances.
                                    </p>

                                    {branch && (
                                        <p className="mt-2 text-sm text-emerald-600">
                                            Branch:{" "}
                                            <span className="font-semibold">
                                                {branch.name}
                                            </span>
                                        </p>
                                    )}

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ======================================================
                        SUMMARY CARDS
                    ====================================================== */}

                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        {/* Total Credit Sales */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm font-medium text-gray-500">
                                        Credit Sales
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                                        {totalCreditSales}
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-400">
                                        Outstanding records
                                    </p>

                                </div>

                                <div className="rounded-xl bg-emerald-100 p-3">
                                    <CreditCardIcon className="h-6 w-6 text-emerald-600" />
                                </div>

                            </div>

                        </div>


                        {/* Total Amount */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm font-medium text-gray-500">
                                        Total Credit
                                    </p>

                                    <h2 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                                        {formatCurrency(totalAmount)}
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-400">
                                        Total sale value
                                    </p>

                                </div>

                                <div className="rounded-xl bg-blue-100 p-3">
                                    <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
                                </div>

                            </div>

                        </div>


                        {/* Paid */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm font-medium text-gray-500">
                                        Paid
                                    </p>

                                    <h2 className="mt-2 text-xl font-bold text-emerald-600">
                                        {formatCurrency(totalPaid)}
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-400">
                                        Amount received
                                    </p>

                                </div>

                                <div className="rounded-xl bg-emerald-100 p-3">
                                    <CheckCircleIcon className="h-6 w-6 text-emerald-600" />
                                </div>

                            </div>

                        </div>


                        {/* Balance */}
                        <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm font-medium text-gray-500">
                                        Outstanding
                                    </p>

                                    <h2 className="mt-2 text-xl font-bold text-red-600">
                                        {formatCurrency(totalBalance)}
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-400">
                                        Remaining balance
                                    </p>

                                </div>

                                <div className="rounded-xl bg-red-100 p-3">
                                    <ExclamationCircleIcon className="h-6 w-6 text-red-600" />
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ======================================================
                        SEARCH / FILTER
                    ====================================================== */}

                    <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                        <div className="flex flex-col gap-3 lg:flex-row">

                            <div className="relative flex-1">

                                <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search invoice, customer name or phone..."
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                />

                            </div>

                            <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">

                                <FunnelIcon className="h-5 w-5" />

                                Outstanding Credit

                            </div>

                        </div>

                    </div>


                    {/* ======================================================
                        DESKTOP TABLE
                    ====================================================== */}

                    <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:block dark:border-gray-800 dark:bg-gray-900">

                        <div className="overflow-x-auto">

                            <table className="w-full text-left">

                                <thead className="bg-emerald-50 dark:bg-emerald-950/30">

                                    <tr>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-emerald-700">
                                            Customer
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-emerald-700">
                                            Invoice
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-emerald-700">
                                            Date
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-emerald-700">
                                            Total
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-emerald-700">
                                            Paid
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-emerald-700">
                                            Balance
                                        </th>

                                        <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wide text-emerald-700">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-emerald-700">
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">

                                    {sales.map((sale) => {

                                        const balance =
                                            getBalance(sale);

                                        const status =
                                            getStatus(sale);

                                        const StatusIcon =
                                            status.icon;

                                        return (
                                            <tr
                                                key={sale.id}
                                                className="transition hover:bg-emerald-50/40 dark:hover:bg-gray-800"
                                            >

                                                {/* Customer */}
                                                <td className="px-6 py-4">

                                                    <div className="flex items-center gap-3">

                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                                                            {sale.customer?.name
                                                                ?.charAt(0)
                                                                ?.toUpperCase() ||
                                                                "C"}
                                                        </div>

                                                        <div>

                                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                                {sale.customer?.name ||
                                                                    "Walk-in Customer"}
                                                            </p>

                                                            <p className="text-xs text-gray-400">
                                                                {sale.customer?.phone ||
                                                                    "No phone"}
                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* Invoice */}
                                                <td className="px-6 py-4">

                                                    <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                                        {sale.invoice_number}
                                                    </span>

                                                </td>


                                                {/* Date */}
                                                <td className="px-6 py-4 text-sm text-gray-500">

                                                    {sale.created_at
                                                        ? new Date(
                                                              sale.created_at
                                                          ).toLocaleDateString()
                                                        : "—"}

                                                </td>


                                                {/* Total */}
                                                <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">

                                                    {formatCurrency(
                                                        sale.total
                                                    )}

                                                </td>


                                                {/* Paid */}
                                                <td className="px-6 py-4 text-right text-sm font-semibold text-emerald-600">

                                                    {formatCurrency(
                                                        sale.paid_amount
                                                    )}

                                                </td>


                                                {/* Balance */}
                                                <td className="px-6 py-4 text-right">

                                                    <span className="font-bold text-red-600">
                                                        {formatCurrency(
                                                            balance
                                                        )}
                                                    </span>

                                                </td>


                                                {/* Status */}
                                                <td className="px-6 py-4 text-center">

                                                    <span
                                                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${status.className}`}
                                                    >

                                                        <StatusIcon className="h-4 w-4" />

                                                        {status.label}

                                                    </span>

                                                </td>


                                                {/* Action */}
                                                <td className="px-6 py-4">

                                                    <div className="flex justify-end">

                                                        <Link
                                                            href={route(
                                                                "admin.sales.show",
                                                                sale.id
                                                            )}
                                                            className="rounded-lg p-2 text-gray-500 transition hover:bg-emerald-50 hover:text-emerald-600"
                                                            title="View Sale"
                                                        >

                                                            <EyeIcon className="h-5 w-5" />

                                                        </Link>

                                                    </div>

                                                </td>

                                            </tr>
                                        );
                                    })}

                                </tbody>

                            </table>

                        </div>


                        {/* Empty State */}

                        {sales.length === 0 && (

                            <div className="p-12 text-center">

                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">

                                    <UserGroupIcon className="h-8 w-8 text-emerald-500" />

                                </div>

                                <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                                    No Credit Sales Found
                                </h3>

                                <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                                    There are currently no outstanding credit
                                    sales for this branch.
                                </p>

                            </div>

                        )}

                    </div>


                    {/* ======================================================
                        MOBILE CARDS
                    ====================================================== */}

                    <div className="space-y-4 md:hidden">

                        {sales.map((sale) => {

                            const balance =
                                getBalance(sale);

                            const status =
                                getStatus(sale);

                            const StatusIcon =
                                status.icon;

                            return (
                                <div
                                    key={sale.id}
                                    className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                                >

                                    {/* Customer */}

                                    <div className="flex items-start justify-between gap-3">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">

                                                {sale.customer?.name
                                                    ?.charAt(0)
                                                    ?.toUpperCase() ||
                                                    "C"}

                                            </div>

                                            <div>

                                                <h3 className="font-bold text-gray-900 dark:text-white">

                                                    {sale.customer?.name ||
                                                        "Walk-in Customer"}

                                                </h3>

                                                <p className="text-xs text-gray-400">

                                                    {sale.customer?.phone ||
                                                        "No phone"}

                                                </p>

                                            </div>

                                        </div>

                                        <span
                                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${status.className}`}
                                        >

                                            <StatusIcon className="h-3.5 w-3.5" />

                                            {status.label}

                                        </span>

                                    </div>


                                    {/* Invoice */}

                                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">

                                        <div>

                                            <p className="text-xs text-gray-400">
                                                Invoice
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-gray-200">
                                                {sale.invoice_number}
                                            </p>

                                        </div>

                                        <div className="text-right">

                                            <p className="text-xs text-gray-400">
                                                Date
                                            </p>

                                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">

                                                {sale.created_at
                                                    ? new Date(
                                                          sale.created_at
                                                      ).toLocaleDateString()
                                                    : "—"}

                                            </p>

                                        </div>

                                    </div>


                                    {/* Financial Information */}

                                    <div className="mt-4 grid grid-cols-3 gap-2">

                                        <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">

                                            <p className="text-[11px] text-gray-400">
                                                Total
                                            </p>

                                            <p className="mt-1 text-xs font-bold text-gray-900 dark:text-white">

                                                {formatCurrency(
                                                    sale.total
                                                )}

                                            </p>

                                        </div>

                                        <div className="rounded-xl bg-emerald-50 p-3 dark:bg-emerald-950/30">

                                            <p className="text-[11px] text-emerald-600">
                                                Paid
                                            </p>

                                            <p className="mt-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">

                                                {formatCurrency(
                                                    sale.paid_amount
                                                )}

                                            </p>

                                        </div>

                                        <div className="rounded-xl bg-red-50 p-3 dark:bg-red-950/30">

                                            <p className="text-[11px] text-red-500">
                                                Balance
                                            </p>

                                            <p className="mt-1 text-xs font-bold text-red-600">

                                                {formatCurrency(
                                                    balance
                                                )}

                                            </p>

                                        </div>

                                    </div>


                                    {/* View */}

                                    <Link
                                        href={route(
                                            "admin.sales.show",
                                            sale.id
                                        )}
                                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                    >

                                        <EyeIcon className="h-5 w-5" />

                                        View Sale

                                    </Link>

                                </div>
                            );
                        })}


                        {/* Mobile Empty State */}

                        {sales.length === 0 && (

                            <div className="rounded-2xl bg-white p-10 text-center shadow-sm dark:bg-gray-900">

                                <CreditCardIcon className="mx-auto h-12 w-12 text-gray-300" />

                                <h3 className="mt-4 font-bold text-gray-900 dark:text-white">
                                    No Credit Sales Found
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    No outstanding credit sales are available.
                                </p>

                            </div>

                        )}

                    </div>


                    {/* ======================================================
                        PAGINATION
                    ====================================================== */}

                    {creditSales?.links &&
                        creditSales.links.length > 3 && (

                            <div className="mt-6 flex flex-wrap justify-center gap-2">

                                {creditSales.links.map(
                                    (link, index) => (

                                        <Link
                                            key={index}
                                            href={
                                                link.url || "#"
                                            }
                                            preserveScroll
                                            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                                                link.active
                                                    ? "bg-emerald-600 text-white"
                                                    : "bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-gray-900 dark:text-gray-300"
                                            } ${
                                                !link.url
                                                    ? "pointer-events-none opacity-50"
                                                    : ""
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />

                                    )
                                )}

                            </div>
                        )}

                </div>

            </div>
        </AdminLayout>
    );
}

