
import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    UserPlusIcon,
    ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Create({ branch }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        phone: "",
        email: "",
        address: "",
        notes: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("admin.customers.store"));
    };

    return (
        <AdminLayout>
            <Head title="Add Customer" />

            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-950">
                <div className="mx-auto max-w-4xl">

                    {/* Header */}
                    <div className="mb-6">
                        <Link
                            href={route("admin.customers.index")}
                            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 transition hover:text-emerald-700"
                        >
                            <ArrowLeftIcon className="h-4 w-4" />
                            Back to Customers
                        </Link>

                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                                <UserPlusIcon className="h-7 w-7 text-emerald-600" />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Add Customer
                                </h1>

                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Register a new customer
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={submit}
                        className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
                    >

                        {/* Form Header */}
                        <div className="border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-white px-6 py-5 dark:border-gray-800 dark:from-emerald-950/30 dark:to-gray-900">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                Customer Information
                            </h2>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Enter the customer's details below.
                            </p>
                        </div>

                        <div className="p-6 sm:p-8">

                            {/* Current Branch */}
                            <div className="mb-7 rounded-xl border border-emerald-100 bg-emerald-50 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/30">
                                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                                    Current Branch
                                </p>

                                <p className="mt-1 text-base font-bold text-emerald-800 dark:text-emerald-400">
                                    {branch?.name ?? "Current Branch"}
                                </p>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">

                                {/* Name */}
                                <div className="sm:col-span-2">
                                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        Customer Name *
                                    </label>

                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        placeholder="Enter customer name"
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-800"
                                    />

                                    {errors.name && (
                                        <p className="mt-1.5 text-sm text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                        placeholder="07XX XXX XXX"
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-800"
                                    />

                                    {errors.phone && (
                                        <p className="mt-1.5 text-sm text-red-500">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        placeholder="customer@example.com"
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-800"
                                    />

                                    {errors.email && (
                                        <p className="mt-1.5 text-sm text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Address */}
                                <div className="sm:col-span-2">
                                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        Address
                                    </label>

                                    <textarea
                                        rows="3"
                                        value={data.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                        placeholder="Customer address"
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-800"
                                    />

                                    {errors.address && (
                                        <p className="mt-1.5 text-sm text-red-500">
                                            {errors.address}
                                        </p>
                                    )}
                                </div>

                                {/* Notes */}
                                <div className="sm:col-span-2">
                                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        Notes
                                    </label>

                                    <textarea
                                        rows="3"
                                        value={data.notes}
                                        onChange={(e) =>
                                            setData("notes", e.target.value)
                                        }
                                        placeholder="Additional notes..."
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-800"
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end dark:border-gray-800">

                                <Link
                                    href={route("admin.customers.index")}
                                    className="rounded-xl border border-gray-200 px-6 py-3 text-center text-sm font-semibold text-gray-600 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                    Cancel
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <UserPlusIcon className="mr-2 h-5 w-5" />

                                    {processing
                                        ? "Saving..."
                                        : "Save Customer"}
                                </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

