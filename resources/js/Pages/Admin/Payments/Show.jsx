import React from "react";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowLeftIcon,
    CreditCardIcon,
    UserIcon,
    UserGroupIcon,
    BanknotesIcon,
    DevicePhoneMobileIcon,
    BuildingLibraryIcon,
    DocumentTextIcon,
    CalendarDaysIcon,
    IdentificationIcon,
} from "@heroicons/react/24/outline";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Show({ payment, branch }) {
    const formatMoney = (amount) => {
        return Number(amount || 0).toLocaleString("en-TZ", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const getMethod = () => {
        switch (payment.payment_method) {
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
                    label: payment.payment_method || "Unknown",
                    className:
                        "bg-gray-100 text-gray-700",
                    icon: CreditCardIcon,
                };
        }
    };

    const method = getMethod();
    const MethodIcon = method.icon;

    return (
        <AdminLayout>
            <Head title="Payment Details" />

            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-950">

                <div className="mx-auto max-w-5xl">

                    {/* Top Navigation */}
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

                        <Link
                            href={route(
                                "admin.paymentHistory.index"
                            )}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                        >
                            <ArrowLeftIcon className="h-4 w-4" />
                            Back to Payment History
                        </Link>

                        <span className="text-sm text-gray-500">
                            Branch:{" "}
                            <span className="font-semibold text-emerald-600">
                                {branch?.name}
                            </span>
                        </span>

                    </div>

                    {/* Main Payment Card */}
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">

                        {/* Green Header */}
                        <div className="bg-emerald-600 px-6 py-8 sm:px-8">

                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                                <div className="flex items-center gap-4">

                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                                        <CreditCardIcon className="h-9 w-9 text-emerald-600" />
                                    </div>

                                    <div className="text-white">

                                        <p className="text-sm text-emerald-100">
                                            Payment #{payment.id}
                                        </p>

                                        <h1 className="mt-1 text-2xl font-bold">
                                            TZS{" "}
                                            {formatMoney(
                                                payment.amount
                                            )}
                                        </h1>

                                        <p className="mt-1 text-sm text-emerald-100">
                                            Payment received successfully
                                        </p>

                                    </div>

                                </div>

                                <span
                                    className={`inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm font-bold sm:self-center ${method.className}`}
                                >
                                    <MethodIcon className="h-5 w-5" />
                                    {method.label}
                                </span>

                            </div>

                        </div>

                        {/* Payment Information */}
                        <div className="grid gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3 sm:p-8">

                            {/* Customer */}
                            <div className="rounded-xl bg-gray-50 p-5 dark:bg-gray-800">

                                <UserGroupIcon className="h-6 w-6 text-emerald-600" />

                                <p className="mt-3 text-xs font-medium uppercase text-gray-500">
                                    Customer
                                </p>

                                <p className="mt-1 font-bold text-gray-900 dark:text-white">
                                    {payment.customer?.name ||
                                        "Unknown Customer"}
                                </p>

                                {payment.customer?.phone && (
                                    <p className="mt-1 text-sm text-gray-500">
                                        {payment.customer.phone}
                                    </p>
                                )}

                            </div>

                            {/* Invoice */}
                            <div className="rounded-xl bg-gray-50 p-5 dark:bg-gray-800">

                                <DocumentTextIcon className="h-6 w-6 text-emerald-600" />

                                <p className="mt-3 text-xs font-medium uppercase text-gray-500">
                                    Invoice
                                </p>

                                <p className="mt-1 font-bold text-gray-900 dark:text-white">
                                    {payment.sale
                                        ?.invoice_number ||
                                        "—"}
                                </p>

                                {payment.sale && (
                                    <p className="mt-1 text-sm text-gray-500">
                                        Invoice Total: TZS{" "}
                                        {formatMoney(
                                            payment.sale.total
                                        )}
                                    </p>
                                )}

                            </div>

                            {/* Payment Date */}
                            <div className="rounded-xl bg-gray-50 p-5 dark:bg-gray-800">

                                <CalendarDaysIcon className="h-6 w-6 text-emerald-600" />

                                <p className="mt-3 text-xs font-medium uppercase text-gray-500">
                                    Payment Date
                                </p>

                                <p className="mt-1 font-bold text-gray-900 dark:text-white">
                                    {payment.created_at
                                        ? new Date(
                                              payment.created_at
                                          ).toLocaleDateString(
                                              "en-GB"
                                          )
                                        : "—"}
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    {payment.created_at
                                        ? new Date(
                                              payment.created_at
                                          ).toLocaleTimeString(
                                              "en-GB",
                                              {
                                                  hour: "2-digit",
                                                  minute: "2-digit",
                                              }
                                          )
                                        : ""}
                                </p>

                            </div>

                            {/* Amount */}
                            <div className="rounded-xl bg-emerald-50 p-5">

                                <BanknotesIcon className="h-6 w-6 text-emerald-600" />

                                <p className="mt-3 text-xs font-medium uppercase text-emerald-600">
                                    Amount Paid
                                </p>

                                <p className="mt-1 text-2xl font-bold text-emerald-700">
                                    TZS{" "}
                                    {formatMoney(
                                        payment.amount
                                    )}
                                </p>

                            </div>

                            {/* Reference */}
                            <div className="rounded-xl bg-gray-50 p-5 dark:bg-gray-800">

                                <IdentificationIcon className="h-6 w-6 text-emerald-600" />

                                <p className="mt-3 text-xs font-medium uppercase text-gray-500">
                                    Reference
                                </p>

                                <p className="mt-1 break-all font-bold text-gray-900 dark:text-white">
                                    {payment.reference ||
                                        "No reference"}
                                </p>

                            </div>

                            {/* Received By */}
                            <div className="rounded-xl bg-gray-50 p-5 dark:bg-gray-800">

                                <UserIcon className="h-6 w-6 text-emerald-600" />

                                <p className="mt-3 text-xs font-medium uppercase text-gray-500">
                                    Received By
                                </p>

                                <p className="mt-1 font-bold text-gray-900 dark:text-white">
                                    {payment.user?.name ||
                                        "Unknown User"}
                                </p>

                                {payment.user?.email && (
                                    <p className="mt-1 break-all text-sm text-gray-500">
                                        {payment.user.email}
                                    </p>
                                )}

                            </div>

                        </div>

                    </div>

                    {/* Sale Summary */}
                    {payment.sale && (
                        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                            <div className="mb-5 flex items-center gap-3">

                                <div className="rounded-xl bg-emerald-100 p-3">
                                    <DocumentTextIcon className="h-6 w-6 text-emerald-600" />
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900 dark:text-white">
                                        Invoice Summary
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        Current payment position
                                    </p>
                                </div>

                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">

                                <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                                    <p className="text-xs text-gray-500">
                                        Invoice Total
                                    </p>

                                    <p className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
                                        TZS{" "}
                                        {formatMoney(
                                            payment.sale.total
                                        )}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-emerald-50 p-4">
                                    <p className="text-xs text-emerald-600">
                                        Total Paid
                                    </p>

                                    <p className="mt-2 text-lg font-bold text-emerald-700">
                                        TZS{" "}
                                        {formatMoney(
                                            payment.sale.paid_amount
                                        )}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-red-50 p-4">
                                    <p className="text-xs text-red-600">
                                        Remaining Balance
                                    </p>

                                    <p className="mt-2 text-lg font-bold text-red-700">
                                        TZS{" "}
                                        {formatMoney(
                                            Number(
                                                payment.sale.total
                                            ) -
                                                Number(
                                                    payment.sale
                                                        .paid_amount
                                                )
                                        )}
                                    </p>
                                </div>

                            </div>

                        </div>
                    )}

                    {/* Notes */}
                    {payment.notes && (
                        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                            <div className="flex gap-3">

                                <DocumentTextIcon className="h-6 w-6 shrink-0 text-emerald-600" />

                                <div>
                                    <h2 className="font-bold text-gray-900 dark:text-white">
                                        Payment Notes
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                        {payment.notes}
                                    </p>
                                </div>

                            </div>

                        </div>
                    )}

                </div>
            </div>
        </AdminLayout>
    );
}