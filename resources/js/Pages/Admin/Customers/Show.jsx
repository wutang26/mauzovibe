import React from "react";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowLeftIcon,
    PencilSquareIcon,
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    DocumentTextIcon,
    ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Show({ customer, branch }) {
    const sales = customer.sales || [];

    return (
        <AdminLayout>
            <Head title={customer.name} />

            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-950">
                <div className="mx-auto max-w-5xl">

                    {/* Back + Edit */}
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

                        <Link
                            href={route("admin.customers.index")}
                            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
                        >
                            <ArrowLeftIcon className="h-4 w-4" />
                            Back to Customers
                        </Link>

                        <Link
                            href={route(
                                "admin.customers.edit",
                                customer.id
                            )}
                            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                        >
                            <PencilSquareIcon className="h-5 w-5" />
                            Edit Customer
                        </Link>

                    </div>

                    {/* Customer Header */}
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">

                        <div className="bg-emerald-600 px-6 py-8 sm:px-8">

                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white text-3xl font-bold text-emerald-600 shadow">
                                    {customer.name
                                        ?.charAt(0)
                                        ?.toUpperCase()}
                                </div>

                                <div className="text-white">

                                    <p className="text-sm text-emerald-100">
                                        Customer #{customer.id}
                                    </p>

                                    <h1 className="mt-1 text-3xl font-bold">
                                        {customer.name}
                                    </h1>

                                    <p className="mt-1 text-sm text-emerald-100">
                                        {branch?.name || "Current Branch"}
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Customer Information */}
                        <div className="grid gap-5 p-6 sm:grid-cols-2 lg:grid-cols-4 sm:p-8">

                            {/* Phone */}
                            <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">

                                <PhoneIcon className="h-6 w-6 text-emerald-600" />

                                <p className="mt-3 text-xs text-gray-500">
                                    Phone
                                </p>

                                <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                                    {customer.phone || "Not provided"}
                                </p>

                            </div>

                            {/* Email */}
                            <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">

                                <EnvelopeIcon className="h-6 w-6 text-emerald-600" />

                                <p className="mt-3 text-xs text-gray-500">
                                    Email
                                </p>

                                <p className="mt-1 break-all font-semibold text-gray-900 dark:text-white">
                                    {customer.email || "Not provided"}
                                </p>

                            </div>

                            {/* Address */}
                            <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">

                                <MapPinIcon className="h-6 w-6 text-emerald-600" />

                                <p className="mt-3 text-xs text-gray-500">
                                    Address
                                </p>

                                <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                                    {customer.address || "Not provided"}
                                </p>

                            </div>

                            {/* Total Sales */}
                            <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">

                                <ShoppingBagIcon className="h-6 w-6 text-emerald-600" />

                                <p className="mt-3 text-xs text-gray-500">
                                    Total Sales
                                </p>

                                <p className="mt-1 text-2xl font-bold text-emerald-600">
                                    {sales.length}
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Notes */}
                    {customer.notes && (
                        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                            <div className="flex gap-3">

                                <DocumentTextIcon className="h-6 w-6 shrink-0 text-emerald-600" />

                                <div>

                                    <h2 className="font-bold text-gray-900 dark:text-white">
                                        Customer Notes
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                        {customer.notes}
                                    </p>

                                </div>

                            </div>

                        </div>
                    )}

                    {/* Sales */}
                    <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">

                        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 dark:border-gray-800">

                            <div>
                                <h2 className="font-bold text-gray-900 dark:text-white">
                                    Customer Sales
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Sales history for this customer
                                </p>
                            </div>

                            <ShoppingBagIcon className="h-6 w-6 text-emerald-600" />

                        </div>

                        {sales.length > 0 ? (
                            <div className="overflow-x-auto">

                                <table className="w-full text-left">

                                    <thead className="bg-emerald-50 dark:bg-emerald-950/30">

                                        <tr>

                                            <th className="px-6 py-3 text-xs font-bold uppercase text-emerald-700">
                                                Sale
                                            </th>

                                            <th className="px-6 py-3 text-xs font-bold uppercase text-emerald-700">
                                                Date
                                            </th>

                                            <th className="px-6 py-3 text-xs font-bold uppercase text-emerald-700">
                                                Total
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">

                                        {sales.map((sale) => (
                                            <tr
                                                key={sale.id}
                                                className="transition hover:bg-emerald-50/40 dark:hover:bg-gray-800"
                                            >

                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                    #{sale.id}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {sale.created_at
                                                        ? new Date(
                                                              sale.created_at
                                                          ).toLocaleDateString()
                                                        : "—"}
                                                </td>

                                                <td className="px-6 py-4 font-semibold text-emerald-600">
                                                    {sale.total
                                                        ? Number(
                                                              sale.total
                                                          ).toLocaleString()
                                                        : "0"}{" "}
                                                    TZS
                                                </td>

                                            </tr>
                                        ))}

                                    </tbody>

                                </table>

                            </div>
                        ) : (
                            <div className="p-10 text-center">

                                <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-300" />

                                <p className="mt-3 font-medium text-gray-600 dark:text-gray-300">
                                    No sales found
                                </p>

                                <p className="mt-1 text-sm text-gray-400">
                                    This customer has no sales yet.
                                </p>

                            </div>
                        )}

                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}