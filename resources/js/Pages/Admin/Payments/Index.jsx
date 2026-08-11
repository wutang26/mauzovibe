import React, { useEffect, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import {
    MagnifyingGlassIcon,
    EyeIcon,
    CreditCardIcon,
    BanknotesIcon,
    DevicePhoneMobileIcon,
    BuildingLibraryIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Index({
    payments,
    branch,
    summary,
    filters,
}) {
    const [search, setSearch] = useState(filters?.search || "");

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                route("admin.paymentHistory.index"),
                { search },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }, 400);

        return () => clearTimeout(timeout);
    }, [search]);

    const formatMoney = (amount) => {
        return Number(amount || 0).toLocaleString("en-TZ", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const getPaymentMethod = (method) => {
        switch (method) {
            case "cash":
                return {
                    label: "Cash",
                    className:
                        "bg-emerald-100 text-emerald-700",
                    icon: BanknotesIcon,
                };

            case "mobile_money":
                return {
                    label: "Mobile Money",
                    className:
                        "bg-blue-100 text-blue-700",
                    icon: DevicePhoneMobileIcon,
                };

            case "bank":
                return {
                    label: "Bank",
                    className:
                        "bg-purple-100 text-purple-700",
                    icon: BuildingLibraryIcon,
                };

            default:
                return {
                    label: method || "Unknown",
                    className:
                        "bg-gray-100 text-gray-700",
                    icon: CreditCardIcon,
                };
        }
    };

    return (
        <AdminLayout>
            <Head title="Payment History" />

            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-950">
                <div className="mx-auto max-w-7xl">

                    {/* Header */}
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex items-center gap-3">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                                <CreditCardIcon className="h-7 w-7 text-emerald-600" />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Payment History
                                </h1>

                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Track all customer payments
                                </p>

                                {branch && (
                                    <p className="mt-1 text-xs font-semibold text-emerald-600">
                                        Branch: {branch.name}
                                    </p>
                                )}
                            </div>

                        </div>

                        <Link
                            href={route("admin.debtors.index")}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-50 dark:border-gray-700 dark:bg-gray-900 dark:text-emerald-400"
                        >
                            <UserGroupIcon className="h-5 w-5" />
                            View Debtors
                        </Link>

                    </div>

                    {/* Summary Cards */}
                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        {/* Total Payments */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Total Payments
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                                        {summary?.totalPayments ?? 0}
                                    </h2>
                                </div>

                                <div className="rounded-xl bg-emerald-100 p-3">
                                    <CreditCardIcon className="h-6 w-6 text-emerald-600" />
                                </div>

                            </div>

                        </div>

                        {/* Total Amount */}
                        <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Total Amount
                                    </p>

                                    <h2 className="mt-2 text-xl font-bold text-emerald-600">
                                        TZS {formatMoney(summary?.totalAmount)}
                                    </h2>
                                </div>

                                <div className="rounded-xl bg-emerald-100 p-3">
                                    <BanknotesIcon className="h-6 w-6 text-emerald-600" />
                                </div>

                            </div>

                        </div>

                        {/* Mobile Money */}
                        <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Mobile Money
                                    </p>

                                    <h2 className="mt-2 text-xl font-bold text-blue-600">
                                        TZS {formatMoney(summary?.mobileMoneyPayments)}
                                    </h2>
                                </div>

                                <div className="rounded-xl bg-blue-100 p-3">
                                    <DevicePhoneMobileIcon className="h-6 w-6 text-blue-600" />
                                </div>

                            </div>

                        </div>

                        {/* Bank */}
                        <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Bank Payments
                                    </p>

                                    <h2 className="mt-2 text-xl font-bold text-purple-600">
                                        TZS {formatMoney(summary?.bankPayments)}
                                    </h2>
                                </div>

                                <div className="rounded-xl bg-purple-100 p-3">
                                    <BuildingLibraryIcon className="h-6 w-6 text-purple-600" />
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Search */}
                    <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                        <div className="relative">

                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search customer, phone, invoice or reference..."
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />

                        </div>

                    </div>

                    {/* Desktop Table */}
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
                                            Amount
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase text-emerald-700">
                                            Method
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase text-emerald-700">
                                            Reference
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase text-emerald-700">
                                            Received By
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase text-emerald-700">
                                            Date
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-bold uppercase text-emerald-700">
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">

                                    {payments?.data?.map((payment) => {

                                        const method =
                                            getPaymentMethod(
                                                payment.payment_method
                                            );

                                        const MethodIcon =
                                            method.icon;

                                        return (
                                            <tr
                                                key={payment.id}
                                                className="transition hover:bg-emerald-50/40 dark:hover:bg-gray-800"
                                            >

                                                {/* Customer */}
                                                <td className="px-6 py-4">

                                                    <div>
                                                        <p className="font-semibold text-gray-900 dark:text-white">
                                                            {payment.customer?.name ||
                                                                "Unknown Customer"}
                                                        </p>

                                                        <p className="text-xs text-gray-400">
                                                            {payment.customer?.phone ||
                                                                "No phone"}
                                                        </p>
                                                    </div>

                                                </td>

                                                {/* Invoice */}
                                                <td className="px-6 py-4">

                                                    <span className="font-medium text-gray-700 dark:text-gray-300">
                                                        {payment.sale
                                                            ?.invoice_number ||
                                                            "—"}
                                                    </span>

                                                </td>

                                                {/* Amount */}
                                                <td className="px-6 py-4">

                                                    <span className="font-bold text-emerald-600">
                                                        TZS{" "}
                                                        {formatMoney(
                                                            payment.amount
                                                        )}
                                                    </span>

                                                </td>

                                                {/* Method */}
                                                <td className="px-6 py-4">

                                                    <span
                                                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${method.className}`}
                                                    >
                                                        <MethodIcon className="h-4 w-4" />
                                                        {method.label}
                                                    </span>

                                                </td>

                                                {/* Reference */}
                                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                                    {payment.reference ||
                                                        "—"}
                                                </td>

                                                {/* User */}
                                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                                    {payment.user?.name ||
                                                        "—"}
                                                </td>

                                                {/* Date */}
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {payment.created_at
                                                        ? new Date(
                                                              payment.created_at
                                                          ).toLocaleDateString(
                                                              "en-GB"
                                                          )
                                                        : "—"}
                                                </td>

                                                {/* Action */}
                                                <td className="px-6 py-4 text-right">

                                                    <Link
                                                        href={route(
                                                            "admin.paymentHistory.show",
                                                            payment.id
                                                        )}
                                                        className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                                                    >
                                                        <EyeIcon className="h-4 w-4" />
                                                        View
                                                    </Link>

                                                </td>

                                            </tr>
                                        );
                                    })}

                                </tbody>

                            </table>

                        </div>

                        {(!payments?.data ||
                            payments.data.length === 0) && (
                            <div className="p-12 text-center">

                                <CreditCardIcon className="mx-auto h-14 w-14 text-gray-300" />

                                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                                    No payments found
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Payment records will appear here.
                                </p>

                            </div>
                        )}

                    </div>

                    {/* Mobile Cards */}
                    <div className="space-y-4 md:hidden">

                        {payments?.data?.map((payment) => {

                            const method =
                                getPaymentMethod(
                                    payment.payment_method
                                );

                            const MethodIcon =
                                method.icon;

                            return (
                                <div
                                    key={payment.id}
                                    className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                                >

                                    <div className="flex items-start justify-between gap-3">

                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white">
                                                {payment.customer?.name ||
                                                    "Unknown Customer"}
                                            </h3>

                                            <p className="mt-1 text-xs text-gray-400">
                                                {payment.customer?.phone ||
                                                    "No phone"}
                                            </p>
                                        </div>

                                        <span
                                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${method.className}`}
                                        >
                                            <MethodIcon className="h-4 w-4" />
                                            {method.label}
                                        </span>

                                    </div>

                                    <div className="mt-5 grid grid-cols-2 gap-3">

                                        <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
                                            <p className="text-xs text-gray-500">
                                                Invoice
                                            </p>

                                            <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
                                                {payment.sale
                                                    ?.invoice_number ||
                                                    "—"}
                                            </p>
                                        </div>

                                        <div className="rounded-xl bg-emerald-50 p-3">
                                            <p className="text-xs text-emerald-600">
                                                Amount
                                            </p>

                                            <p className="mt-1 text-sm font-bold text-emerald-700">
                                                TZS{" "}
                                                {formatMoney(
                                                    payment.amount
                                                )}
                                            </p>
                                        </div>

                                        <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
                                            <p className="text-xs text-gray-500">
                                                Reference
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                                                {payment.reference ||
                                                    "—"}
                                            </p>
                                        </div>

                                        <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
                                            <p className="text-xs text-gray-500">
                                                Received By
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                                                {payment.user?.name ||
                                                    "—"}
                                            </p>
                                        </div>

                                    </div>

                                    <p className="mt-4 text-xs text-gray-400">
                                        {payment.created_at
                                            ? new Date(
                                                  payment.created_at
                                              ).toLocaleString(
                                                  "en-GB"
                                              )
                                            : "—"}
                                    </p>

                                    <Link
                                        href={route(
                                            "admin.paymentHistory.show",
                                            payment.id
                                        )}
                                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                    >
                                        <EyeIcon className="h-5 w-5" />
                                        View Payment
                                    </Link>

                                </div>
                            );
                        })}

                    </div>

                    {/* Pagination */}
                    {payments?.links &&
                        payments.links.length > 3 && (

                            <div className="mt-6 flex flex-wrap justify-center gap-2">

                                {payments.links.map(
                                    (link, index) => (

                                        <Link
                                            key={index}
                                            href={
                                                link.url ||
                                                "#"
                                            }
                                            preserveScroll
                                            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                                                link.active
                                                    ? "bg-emerald-600 text-white"
                                                    : "bg-white text-gray-600 hover:bg-emerald-50 dark:bg-gray-900 dark:text-gray-300"
                                            } ${
                                                !link.url
                                                    ? "pointer-events-none opacity-50"
                                                    : ""
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    link.label,
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