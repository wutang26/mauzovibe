import React from "react";

import { Head, Link } from "@inertiajs/react";

import {
    ArrowLeftIcon,
    UserIcon,
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    DocumentTextIcon,
    BanknotesIcon,
    CreditCardIcon,
} from "@heroicons/react/24/outline";

import AdminLayout from "@/Layouts/AdminLayout";

export default function Show({
    sale,
    branch,
    balance,
}) {
    const formatMoney = (amount) => {
        return Number(amount || 0).toLocaleString("en-TZ");
    };

    const customer = sale?.customer;

    const paid = Number(sale?.paid_amount || 0);
    const total = Number(sale?.total || 0);
    const remaining = Number(balance || total - paid);

    let status = "Unpaid";

    if (remaining <= 0) {
        status = "Paid";
    } else if (paid > 0) {
        status = "Partial";
    }

    return (
        <AdminLayout>

            <Head title={`Debt - ${customer?.name || "Customer"}`} />

            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-950">

                <div className="mx-auto max-w-5xl">

                    {/* HEADER */}

                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <Link
                            href={route("admin.Debtors.index")}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                        >
                            <ArrowLeftIcon className="h-5 w-5" />
                            Back to Debtors
                        </Link>

                        <div className="rounded-xl bg-emerald-50 px-4 py-3 dark:bg-emerald-950/30">

                            <p className="text-xs text-emerald-600">
                                Branch
                            </p>

                            <p className="font-bold text-emerald-800 dark:text-emerald-400">
                                {branch?.name}
                            </p>

                        </div>

                    </div>


                    {/* CUSTOMER HEADER */}

                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">

                        <div className="bg-emerald-600 px-6 py-8 sm:px-8">

                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl font-bold text-emerald-600 shadow">

                                    {customer?.name
                                        ?.charAt(0)
                                        ?.toUpperCase()}

                                </div>

                                <div className="text-white">

                                    <p className="text-sm text-emerald-100">
                                        Credit Sale
                                    </p>

                                    <h1 className="mt-1 text-3xl font-bold">
                                        {customer?.name || "Unknown Customer"}
                                    </h1>

                                    <p className="mt-1 text-sm text-emerald-100">
                                        Invoice: {sale?.invoice_number}
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* CUSTOMER INFORMATION */}

                        <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">

                            <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">

                                <PhoneIcon className="h-6 w-6 text-emerald-600" />

                                <p className="mt-3 text-xs text-gray-500">
                                    Phone
                                </p>

                                <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                                    {customer?.phone || "Not provided"}
                                </p>

                            </div>


                            <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">

                                <EnvelopeIcon className="h-6 w-6 text-emerald-600" />

                                <p className="mt-3 text-xs text-gray-500">
                                    Email
                                </p>

                                <p className="mt-1 break-all font-semibold text-gray-900 dark:text-white">
                                    {customer?.email || "Not provided"}
                                </p>

                            </div>


                            <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">

                                <MapPinIcon className="h-6 w-6 text-emerald-600" />

                                <p className="mt-3 text-xs text-gray-500">
                                    Address
                                </p>

                                <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                                    {customer?.address || "Not provided"}
                                </p>

                            </div>


                            <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">

                                <DocumentTextIcon className="h-6 w-6 text-emerald-600" />

                                <p className="mt-3 text-xs text-gray-500">
                                    Invoice
                                </p>

                                <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                                    {sale?.invoice_number}
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* DEBT SUMMARY */}

                    <div className="mt-6 grid gap-4 sm:grid-cols-3">

                        {/* Total */}

                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Sale Total
                                    </p>

                                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                                        TZS {formatMoney(total)}
                                    </p>

                                </div>

                                <div className="rounded-xl bg-emerald-100 p-3">
                                    <CreditCardIcon className="h-6 w-6 text-emerald-600" />
                                </div>

                            </div>

                        </div>


                        {/* Paid */}

                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Paid
                                    </p>

                                    <p className="mt-2 text-2xl font-bold text-blue-600">
                                        TZS {formatMoney(paid)}
                                    </p>

                                </div>

                                <div className="rounded-xl bg-blue-50 p-3">
                                    <BanknotesIcon className="h-6 w-6 text-blue-600" />
                                </div>

                            </div>

                        </div>


                        {/* Balance */}

                        <div className="rounded-2xl border border-red-100 bg-red-50 p-6 shadow-sm dark:border-red-900/30 dark:bg-red-950/20">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-red-500">
                                        Outstanding Balance
                                    </p>

                                    <p className="mt-2 text-2xl font-bold text-red-600">
                                        TZS {formatMoney(remaining)}
                                    </p>

                                </div>

                                <div className="rounded-xl bg-white p-3">
                                    <BanknotesIcon className="h-6 w-6 text-red-600" />
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* STATUS */}

                    <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div>

                                <h2 className="font-bold text-gray-900 dark:text-white">
                                    Payment Status
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Current status of this credit sale
                                </p>

                            </div>

                            <span
                                className={`rounded-full px-5 py-2 text-sm font-bold ${
                                    status === "Paid"
                                        ? "bg-emerald-100 text-emerald-700"
                                        : status === "Partial"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {status}
                            </span>

                        </div>

                    </div>


                    {/* SALE INFORMATION */}

                    <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                        <div className="flex items-center gap-3">

                            <DocumentTextIcon className="h-6 w-6 text-emerald-600" />

                            <h2 className="font-bold text-gray-900 dark:text-white">
                                Credit Sale Information
                            </h2>

                        </div>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">

                            <div>

                                <p className="text-xs text-gray-500">
                                    Invoice Number
                                </p>

                                <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                                    {sale?.invoice_number}
                                </p>

                            </div>


                            <div>

                                <p className="text-xs text-gray-500">
                                    Payment Method
                                </p>

                                <p className="mt-1 font-semibold capitalize text-gray-900 dark:text-white">
                                    {sale?.payment_method?.replace(
                                        "_",
                                        " "
                                    )}
                                </p>

                            </div>


                            <div>

                                <p className="text-xs text-gray-500">
                                    Sale Date
                                </p>

                                <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                                    {sale?.created_at
                                        ? new Date(
                                              sale.created_at
                                          ).toLocaleDateString(
                                              "en-TZ"
                                          )
                                        : "—"}
                                </p>

                            </div>


                            <div>

                                <p className="text-xs text-gray-500">
                                    Cashier
                                </p>

                                <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                                    {sale?.user?.name || "—"}
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* ACTION */}

                    <div className="mt-6 flex justify-end">

                        <Link
                            href={route(
                                "admin.CreditSales.show",
                                sale.id
                            )}
                            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                        >
                            View Credit Sale
                        </Link>

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}