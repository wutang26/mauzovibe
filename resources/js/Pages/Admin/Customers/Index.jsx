
import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import {
    PlusIcon,
    MagnifyingGlassIcon,
    EyeIcon,
    PencilSquareIcon,
    TrashIcon,
    UserGroupIcon,
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
} from "@heroicons/react/24/outline";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Index({ customers, branch }) {
    const [search, setSearch] = useState("");

    const customerData = customers?.data ?? [];

    const filteredCustomers = customerData.filter((customer) => {
        const value = search.toLowerCase();

        return (
            customer.name?.toLowerCase().includes(value) ||
            customer.phone?.toLowerCase().includes(value) ||
            customer.email?.toLowerCase().includes(value)
        );
    });

    const deleteCustomer = (customer) => {
        if (
            confirm(
                `Are you sure you want to delete ${customer.name}?`
            )
        ) {
            router.delete(
                route("admin.customers.destroy", customer.id)
            );
        }
    };

    return (
        <AdminLayout>
            <Head title="Customers" />

            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-950">

                {/* Header */}
                <div className="mb-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <div className="flex items-center gap-3">

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                                    <UserGroupIcon className="h-7 w-7 text-emerald-600" />
                                </div>

                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Customers
                                    </h1>

                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Manage your business customers
                                    </p>
                                </div>

                            </div>

                            {branch && (
                                <p className="mt-3 text-sm text-emerald-600">
                                    Branch:{" "}
                                    <span className="font-semibold">
                                        {branch.name}
                                    </span>
                                </p>
                            )}
                        </div>

                        <Link
                            href={route("admin.customers.create")}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                        >
                            <PlusIcon className="h-5 w-5" />
                            Add Customer
                        </Link>

                    </div>
                </div>

                {/* Summary Cards */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Total Customers
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                                    {customers?.total ?? customerData.length}
                                </h2>
                            </div>

                            <div className="rounded-xl bg-emerald-100 p-3">
                                <UserGroupIcon className="h-6 w-6 text-emerald-600" />
                            </div>

                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <p className="text-sm text-gray-500">
                            Current Branch
                        </p>

                        <h2 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                            {branch?.name ?? "Current Branch"}
                        </h2>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <p className="text-sm text-gray-500">
                            Customer Records
                        </p>

                        <h2 className="mt-2 text-2xl font-bold text-emerald-600">
                            {filteredCustomers.length}
                        </h2>
                    </div>

                </div>

                {/* Search */}
                <div className="mb-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                    <div className="relative">

                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search customer by name, phone or email..."
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
                                        Phone
                                    </th>

                                    <th className="px-6 py-4 text-xs font-bold uppercase text-emerald-700">
                                        Email
                                    </th>

                                    <th className="px-6 py-4 text-xs font-bold uppercase text-emerald-700">
                                        Address
                                    </th>

                                    <th className="px-6 py-4 text-right text-xs font-bold uppercase text-emerald-700">
                                        Actions
                                    </th>
                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">

                                {filteredCustomers.map((customer) => (

                                    <tr
                                        key={customer.id}
                                        className="transition hover:bg-emerald-50/40 dark:hover:bg-gray-800"
                                    >

                                        <td className="px-6 py-4">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                                                    {customer.name
                                                        ?.charAt(0)
                                                        ?.toUpperCase()}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-white">
                                                        {customer.name}
                                                    </p>

                                                    <p className="text-xs text-gray-400">
                                                        Customer #{customer.id}
                                                    </p>
                                                </div>

                                            </div>

                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                            {customer.phone || "—"}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                            {customer.email || "—"}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                            {customer.address || "—"}
                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="flex justify-end gap-2">

                                                <Link
                                                    href={route(
                                                        "admin.customers.show",
                                                        customer.id
                                                    )}
                                                    className="rounded-lg p-2 text-gray-500 transition hover:bg-emerald-50 hover:text-emerald-600"
                                                    title="View"
                                                >
                                                    <EyeIcon className="h-5 w-5" />
                                                </Link>

                                                <Link
                                                    href={route(
                                                        "admin.customers.edit",
                                                        customer.id
                                                    )}
                                                    className="rounded-lg p-2 text-blue-500 transition hover:bg-blue-50"
                                                    title="Edit"
                                                >
                                                    <PencilSquareIcon className="h-5 w-5" />
                                                </Link>

                                                <button
                                                    onClick={() =>
                                                        deleteCustomer(customer)
                                                    }
                                                    className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                                                    title="Delete"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* Mobile Cards */}
                <div className="space-y-4 md:hidden">

                    {filteredCustomers.map((customer) => (

                        <div
                            key={customer.id}
                            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                        >

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                                    {customer.name
                                        ?.charAt(0)
                                        ?.toUpperCase()}
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">
                                        {customer.name}
                                    </h3>

                                    <p className="text-xs text-gray-400">
                                        Customer #{customer.id}
                                    </p>
                                </div>

                            </div>

                            <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">

                                {customer.phone && (
                                    <div className="flex items-center gap-2">
                                        <PhoneIcon className="h-5 w-5 text-emerald-500" />
                                        {customer.phone}
                                    </div>
                                )}

                                {customer.email && (
                                    <div className="flex items-center gap-2">
                                        <EnvelopeIcon className="h-5 w-5 text-emerald-500" />
                                        {customer.email}
                                    </div>
                                )}

                                {customer.address && (
                                    <div className="flex items-center gap-2">
                                        <MapPinIcon className="h-5 w-5 text-emerald-500" />
                                        {customer.address}
                                    </div>
                                )}

                            </div>

                            <div className="mt-5 flex gap-2 border-t pt-4">

                                <Link
                                    href={route(
                                        "admin.customers.show",
                                        customer.id
                                    )}
                                    className="flex-1 rounded-lg bg-emerald-50 py-2 text-center text-sm font-semibold text-emerald-700"
                                >
                                    View
                                </Link>

                                <Link
                                    href={route(
                                        "admin.customers.edit",
                                        customer.id
                                    )}
                                    className="flex-1 rounded-lg bg-blue-50 py-2 text-center text-sm font-semibold text-blue-700"
                                >
                                    Edit
                                </Link>

                                <button
                                    onClick={() =>
                                        deleteCustomer(customer)
                                    }
                                    className="rounded-lg bg-red-50 px-4 py-2 text-red-600"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

                {/* Empty State */}
                {filteredCustomers.length === 0 && (

                    <div className="mt-6 rounded-2xl bg-white p-10 text-center shadow-sm dark:bg-gray-900">

                        <UserGroupIcon className="mx-auto h-12 w-12 text-gray-300" />

                        <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">
                            No customers found
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            Add your first customer to get started.
                        </p>

                        <Link
                            href={route("admin.customers.create")}
                            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                        >
                            <PlusIcon className="h-5 w-5" />
                            Add Customer
                        </Link>

                    </div>

                )}

                {/* Pagination */}
                {customers?.links && customers.links.length > 3 && (

                    <div className="mt-6 flex flex-wrap justify-center gap-2">

                        {customers.links.map((link, index) => (

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
        </AdminLayout>
    );
}

