import React from "react";
import { Head, Link, router } from "@inertiajs/react";

import {
    MagnifyingGlassIcon,
    UserGroupIcon,
    BanknotesIcon,
    CreditCardIcon,
    ArrowTrendingUpIcon,
    EyeIcon,
    PhoneIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/outline";

import AdminLayout from "@/Layouts/AdminLayout";

export default function Index({
    debtors,
    branch,
    summary,
    filters,
}) {
    const search = filters?.search || "";

    const handleSearch = (e) => {
        router.get(
            route("admin.Debtors.index"),
            {
                search: e.target.value,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const formatMoney = (amount) => {
        return Number(amount || 0).toLocaleString("en-TZ");
    };

    const getBalance = (sale) => {
        return Number(sale.total || 0) - Number(sale.paid_amount || 0);
    };

    const getStatus = (sale) => {
        const balance = getBalance(sale);

        if (balance <= 0) {
            return {
                label: "Paid",
                className:
                    "bg-emerald-100 text-emerald-700",
            };
        }

        if (Number(sale.paid_amount || 0) > 0) {
            return {
                label: "Partial",
                className:
                    "bg-yellow-100 text-yellow-700",
            };
        }

        return {
            label: "Unpaid",
            className:
                "bg-red-100 text-red-700",
        };
    };

    return (
        <AdminLayout>
            <Head title="Debtors" />

            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-950">

                <div className="mx-auto max-w-7xl">

                    {/* HEADER */}
                    <div className="mb-6">

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex items-center gap-3">

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                                    <UserGroupIcon className="h-7 w-7 text-emerald-600" />
                                </div>

                                <div>

                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Debtors
                                    </h1>

                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Manage outstanding customer debts
                                    </p>

                                </div>

                            </div>

                            {branch && (
                                <div className="rounded-xl bg-emerald-50 px-4 py-3 dark:bg-emerald-950/30">

                                    <p className="text-xs text-emerald-600">
                                        Current Branch
                                    </p>

                                    <p className="font-bold text-emerald-800 dark:text-emerald-400">
                                        {branch.name}
                                    </p>

                                </div>
                            )}

                        </div>

                    </div>


                    {/* SUMMARY CARDS */}

                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        {/* Total Debt */}

                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Total Outstanding
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-red-600">
                                        TZS {formatMoney(summary?.totalDebt)}
                                    </h2>

                                </div>

                                <div className="rounded-xl bg-red-50 p-3">
                                    <BanknotesIcon className="h-6 w-6 text-red-600" />
                                </div>

                            </div>

                        </div>


                        {/* Credit Sales */}

                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Credit Sales
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-emerald-600">
                                        {summary?.totalCreditSales ?? 0}
                                    </h2>

                                </div>

                                <div className="rounded-xl bg-emerald-100 p-3">
                                    <CreditCardIcon className="h-6 w-6 text-emerald-600" />
                                </div>

                            </div>

                        </div>


                        {/* Paid */}

                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Amount Paid
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-blue-600">
                                        TZS {formatMoney(summary?.totalPaid)}
                                    </h2>

                                </div>

                                <div className="rounded-xl bg-blue-50 p-3">
                                    <ArrowTrendingUpIcon className="h-6 w-6 text-blue-600" />
                                </div>

                            </div>

                        </div>


                        {/* Credit Amount */}

                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Total Credit
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                                        TZS {formatMoney(summary?.totalCreditAmount)}
                                    </h2>

                                </div>

                                <div className="rounded-xl bg-gray-100 p-3 dark:bg-gray-800">
                                    <DocumentTextIcon className="h-6 w-6 text-gray-600" />
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* SEARCH */}

                    <div className="mb-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                        <div className="relative">

                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                            <input
                                type="text"
                                defaultValue={search}
                                onChange={handleSearch}
                                placeholder="Search customer or invoice..."
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />

                        </div>

                    </div>


                    {/* DESKTOP TABLE */}

                    <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:block dark:border-gray-800 dark:bg-gray-900">

                        <div className="overflow-x-auto">

                            <table className="w-full text-left">

                                <thead className="bg-emerald-50 dark:bg-emerald-950/30">

                                    <tr>

                                        <th className="px-6 py-4 text-xs font-bold uppercase text-emerald-700">
                                            Customer
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase text-emerald-700">
                                            Invoice
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase text-emerald-700">
                                            Total
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase text-emerald-700">
                                            Paid
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase text-emerald-700">
                                            Balance
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase text-emerald-700">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-bold uppercase text-emerald-700">
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">

                                    {debtors?.data?.map((sale) => {

                                        const balance = getBalance(sale);
                                        const status = getStatus(sale);

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
                                                                ?.toUpperCase()}
                                                        </div>

                                                        <div>

                                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                                {sale.customer?.name || "Unknown"}
                                                            </p>

                                                            {sale.customer?.phone && (
                                                                <p className="text-xs text-gray-400">
                                                                    {sale.customer.phone}
                                                                </p>
                                                            )}

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* Invoice */}

                                                <td className="px-6 py-4">

                                                    <span className="font-medium text-gray-700 dark:text-gray-300">
                                                        {sale.invoice_number}
                                                    </span>

                                                </td>


                                                {/* Total */}

                                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">

                                                    TZS {formatMoney(sale.total)}

                                                </td>


                                                {/* Paid */}

                                                <td className="px-6 py-4 font-semibold text-blue-600">

                                                    TZS {formatMoney(sale.paid_amount)}

                                                </td>


                                                {/* Balance */}

                                                <td className="px-6 py-4 font-bold text-red-600">

                                                    TZS {formatMoney(balance)}

                                                </td>


                                                {/* Status */}

                                                <td className="px-6 py-4">

                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-bold ${status.className}`}
                                                    >
                                                        {status.label}
                                                    </span>

                                                </td>


                                                {/* Action */}

                                                <td className="px-6 py-4">

                                                    <div className="flex justify-end">

                                                        <Link
                                                            href={route(
                                                                "admin.Debtors.show",
                                                                sale.id
                                                            )}
                                                            className="rounded-lg p-2 text-emerald-600 transition hover:bg-emerald-50"
                                                            title="View Debt"
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

                    </div>


                    {/* MOBILE CARDS */}

                    <div className="space-y-4 md:hidden">

                        {debtors?.data?.map((sale) => {

                            const balance = getBalance(sale);
                            const status = getStatus(sale);

                            return (
                                <div
                                    key={sale.id}
                                    className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                                >

                                    <div className="flex items-start justify-between">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                                                {sale.customer?.name
                                                    ?.charAt(0)
                                                    ?.toUpperCase()}
                                            </div>

                                            <div>

                                                <h3 className="font-bold text-gray-900 dark:text-white">
                                                    {sale.customer?.name || "Unknown"}
                                                </h3>

                                                <p className="text-xs text-gray-400">
                                                    {sale.invoice_number}
                                                </p>

                                            </div>

                                        </div>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-bold ${status.className}`}
                                        >
                                            {status.label}
                                        </span>

                                    </div>


                                    <div className="mt-5 grid grid-cols-2 gap-3">

                                        <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">

                                            <p className="text-xs text-gray-500">
                                                Total
                                            </p>

                                            <p className="mt-1 font-bold text-gray-900 dark:text-white">
                                                TZS {formatMoney(sale.total)}
                                            </p>

                                        </div>


                                        <div className="rounded-xl bg-red-50 p-3">

                                            <p className="text-xs text-red-500">
                                                Balance
                                            </p>

                                            <p className="mt-1 font-bold text-red-600">
                                                TZS {formatMoney(balance)}
                                            </p>

                                        </div>

                                    </div>


                                    {sale.customer?.phone && (
                                        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">

                                            <PhoneIcon className="h-5 w-5 text-emerald-500" />

                                            {sale.customer.phone}

                                        </div>
                                    )}


                                    <div className="mt-5 border-t pt-4">

                                        <Link
                                            href={route(
                                                "admin.Debtors.show",
                                                sale.id
                                            )}
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                        >
                                            <EyeIcon className="h-5 w-5" />
                                            View Debt
                                        </Link>

                                    </div>

                                </div>
                            );
                        })}

                    </div>


                    {/* EMPTY STATE */}

                    {(!debtors?.data || debtors.data.length === 0) && (

                        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">

                            <UserGroupIcon className="mx-auto h-14 w-14 text-gray-300" />

                            <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                                No Debtors Found
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                There are currently no outstanding credit sales.
                            </p>

                        </div>

                    )}


                    {/* PAGINATION */}

                    {debtors?.links && debtors.links.length > 3 && (

                        <div className="mt-6 flex flex-wrap justify-center gap-2">

                            {debtors.links.map((link, index) => (

                                <Link
                                    key={index}
                                    href={link.url || "#"}
                                    preserveScroll
                                    className={`rounded-lg px-4 py-2 text-sm ${
                                        link.active
                                            ? "bg-emerald-600 text-white"
                                            : "bg-white text-gray-600 hover:bg-emerald-50"
                                    } ${
                                        !link.url
                                            ? "pointer-events-none opacity-50"
                                            : ""
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />

                            ))}

                        </div>

                    )}

                </div>

            </div>
        </AdminLayout>
    );
}