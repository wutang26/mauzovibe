import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

import {
    ShieldCheckIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    UserIcon,
    BuildingStorefrontIcon,
    ClockIcon,
    GlobeAltIcon,
    EyeIcon,
    XMarkIcon,
    ArrowPathIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function Index({
    audits,
    modules = [],
    actions = [],
    filters = {},
}) {
    const [search, setSearch] = useState(filters.search || "");
    const [module, setModule] = useState(filters.module || "");
    const [action, setAction] = useState(filters.action || "");
    const [selectedAudit, setSelectedAudit] = useState(null);

    const applyFilters = (e) => {
        e?.preventDefault();

        router.get(
            route("admin.audit.index"),
            {
                search: search || undefined,
                module: module || undefined,
                action: action || undefined,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const clearFilters = () => {
        setSearch("");
        setModule("");
        setAction("");

        router.get(
            route("admin.audit.index"),
            {},
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString("en-TZ", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatTime = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleTimeString("en-TZ", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const actionBadge = (action) => {
        const normalized = String(action || "").toLowerCase();

        let classes = "bg-gray-100 text-gray-700";

        if (normalized === "created" || normalized === "create") {
            classes = "bg-green-100 text-green-700";
        }

        if (normalized === "updated" || normalized === "update") {
            classes = "bg-blue-100 text-blue-700";
        }

        if (normalized === "deleted" || normalized === "delete") {
            classes = "bg-red-100 text-red-700";
        }

        if (normalized === "login") {
            classes = "bg-purple-100 text-purple-700";
        }

        if (normalized === "logout") {
            classes = "bg-orange-100 text-orange-700";
        }

        return (
            <span
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${classes}`}
            >
                {action || "Unknown"}
            </span>
        );
    };

    const getUserName = (audit) => {
        return audit.user?.name || "System";
    };

    const getBranchName = (audit) => {
        return audit.branch?.name || "-";
    };

    const getPaginationUrl = (url) => {
        if (!url) return;

        router.get(
            url,
            {},
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    return (
        <AdminLayout>
            <Head title="System Audit" />

            <div className="min-h-screen bg-gray-50 px-4 py-5 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                            <div className="rounded-xl bg-green-100 p-3">
                                <ShieldCheckIcon className="h-7 w-7 text-green-600" />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    System Audit
                                </h1>

                                <p className="mt-1 text-sm text-gray-500">
                                    Track who changed what, when, and where in
                                    the system.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
                            <span className="font-semibold text-gray-900">
                                {audits?.total || 0}
                            </span>{" "}
                            audit records
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <form
                        onSubmit={applyFilters}
                        className="grid grid-cols-1 gap-3 lg:grid-cols-12"
                    >
                        {/* Search */}
                        <div className="lg:col-span-5">
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Search
                            </label>

                            <div className="relative">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search user, module or description..."
                                    className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />
                            </div>
                        </div>

                        {/* Module */}
                        <div className="lg:col-span-2">
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Module
                            </label>

                            <select
                                value={module}
                                onChange={(e) => setModule(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            >
                                <option value="">All Modules</option>

                                {modules.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Action */}
                        <div className="lg:col-span-2">
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Action
                            </label>

                            <select
                                value={action}
                                onChange={(e) => setAction(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            >
                                <option value="">All Actions</option>

                                {actions.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-end gap-2 lg:col-span-3">
                            <button
                                type="submit"
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                            >
                                <FunnelIcon className="h-4 w-4" />
                                Filter
                            </button>

                            <button
                                type="button"
                                onClick={clearFilters}
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                                <ArrowPathIcon className="h-4 w-4" />
                                <span className="hidden sm:inline">
                                    Clear
                                </span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Desktop Table */}
                <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:block">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        User
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Action
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Module
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Description
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Branch
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Date & Time
                                    </th>

                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        View
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 bg-white">
                                {audits?.data?.length > 0 ? (
                                    audits.data.map((audit) => (
                                        <tr
                                            key={audit.id}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                                                        <UserIcon className="h-5 w-5 text-green-600" />
                                                    </div>

                                                    <div>
                                                        <p className="font-semibold text-gray-900">
                                                            {getUserName(audit)}
                                                        </p>

                                                        <p className="text-xs text-gray-500">
                                                            ID: {audit.user_id || "-"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                {actionBadge(audit.action)}
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
                                                    {audit.module || "-"}
                                                </span>
                                            </td>

                                            <td className="max-w-sm px-5 py-4">
                                                <p className="truncate text-sm text-gray-700">
                                                    {audit.description || "-"}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <BuildingStorefrontIcon className="h-4 w-4 text-gray-400" />
                                                    {getBranchName(audit)}
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {formatDate(
                                                        audit.created_at
                                                    )}
                                                </p>

                                                <p className="text-xs text-gray-500">
                                                    {formatTime(
                                                        audit.created_at
                                                    )}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4 text-right">
                                                <button
                                                    onClick={() =>
                                                        setSelectedAudit(audit)
                                                    }
                                                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-green-300 hover:bg-green-50 hover:text-green-700"
                                                >
                                                    <EyeIcon className="h-4 w-4" />
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="px-5 py-14 text-center"
                                        >
                                            <ShieldCheckIcon className="mx-auto h-12 w-12 text-gray-300" />

                                            <p className="mt-3 text-sm font-semibold text-gray-700">
                                                No audit records found
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                Try changing your search or
                                                filters.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile / Tablet Cards */}
                <div className="space-y-3 lg:hidden">
                    {audits?.data?.length > 0 ? (
                        audits.data.map((audit) => (
                            <div
                                key={audit.id}
                                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                                            <UserIcon className="h-5 w-5 text-green-600" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate font-semibold text-gray-900">
                                                {getUserName(audit)}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                {getBranchName(audit)}
                                            </p>
                                        </div>
                                    </div>

                                    {actionBadge(audit.action)}
                                </div>

                                <div className="mt-4 rounded-lg bg-gray-50 p-3">
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-gray-700 shadow-sm">
                                            {audit.module || "-"}
                                        </span>

                                        <span className="text-xs text-gray-500">
                                            #{audit.id}
                                        </span>
                                    </div>

                                    <p className="mt-3 text-sm text-gray-700">
                                        {audit.description || "-"}
                                    </p>
                                </div>

                                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <ClockIcon className="h-4 w-4" />

                                        <span>
                                            {formatDate(audit.created_at)}{" "}
                                            {formatTime(audit.created_at)}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() =>
                                            setSelectedAudit(audit)
                                        }
                                        className="inline-flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 hover:bg-green-100"
                                    >
                                        <EyeIcon className="h-4 w-4" />
                                        Details
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="rounded-xl border border-gray-200 bg-white px-5 py-14 text-center">
                            <ShieldCheckIcon className="mx-auto h-12 w-12 text-gray-300" />

                            <p className="mt-3 text-sm font-semibold text-gray-700">
                                No audit records found
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {audits?.links && audits.links.length > 3 && (
                    <div className="mt-5 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-gray-500">
                            Showing{" "}
                            <span className="font-semibold text-gray-900">
                                {audits.from || 0}
                            </span>{" "}
                            to{" "}
                            <span className="font-semibold text-gray-900">
                                {audits.to || 0}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-gray-900">
                                {audits.total || 0}
                            </span>{" "}
                            records
                        </p>

                        <div className="flex items-center gap-1">
                            {audits.links.map((link, index) => {
                                const isPrevious = index === 0;
                                const isNext =
                                    index === audits.links.length - 1;

                                return (
                                    <button
                                        key={index}
                                        disabled={!link.url}
                                        onClick={() =>
                                            getPaginationUrl(link.url)
                                        }
                                        className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-medium transition ${
                                            link.active
                                                ? "bg-green-600 text-white"
                                                : link.url
                                                ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                                : "cursor-not-allowed text-gray-300"
                                        }`}
                                    >
                                        {isPrevious ? (
                                            <ChevronLeftIcon className="h-4 w-4" />
                                        ) : isNext ? (
                                            <ChevronRightIcon className="h-4 w-4" />
                                        ) : (
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-8 border-t border-gray-200 pt-5 text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} MauzoVibe. All rights
                    reserved.
                </div>
            </div>

            {/* Audit Details Modal */}
            {selectedAudit && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-green-100 p-2">
                                    <ShieldCheckIcon className="h-6 w-6 text-green-600" />
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        Audit Details
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Audit #{selectedAudit.id}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedAudit(null)}
                                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="max-h-[calc(90vh-80px)] overflow-y-auto p-5">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-lg bg-gray-50 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        User
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">
                                        {getUserName(selectedAudit)}
                                    </p>
                                </div>

                                <div className="rounded-lg bg-gray-50 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Action
                                    </p>

                                    <div className="mt-2">
                                        {actionBadge(selectedAudit.action)}
                                    </div>
                                </div>

                                <div className="rounded-lg bg-gray-50 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Module
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">
                                        {selectedAudit.module || "-"}
                                    </p>
                                </div>

                                <div className="rounded-lg bg-gray-50 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Record ID
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">
                                        {selectedAudit.record_id || "-"}
                                    </p>
                                </div>

                                <div className="rounded-lg bg-gray-50 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Branch
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">
                                        {getBranchName(selectedAudit)}
                                    </p>
                                </div>

                                <div className="rounded-lg bg-gray-50 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        IP Address
                                    </p>

                                    <div className="mt-1 flex items-center gap-2">
                                        <GlobeAltIcon className="h-4 w-4 text-gray-400" />

                                        <span className="font-mono text-sm text-gray-900">
                                            {selectedAudit.ip_address || "-"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mt-4 rounded-lg border border-gray-200 p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Description
                                </p>

                                <p className="mt-2 text-sm text-gray-700">
                                    {selectedAudit.description || "-"}
                                </p>
                            </div>

                            {/* Old Values */}
                            <div className="mt-4">
                                <p className="mb-2 text-sm font-bold text-gray-900">
                                    Previous Values
                                </p>

                                <pre className="max-h-64 overflow-auto rounded-lg bg-gray-900 p-4 text-xs text-green-300">
                                    {JSON.stringify(
                                        selectedAudit.old_values || {},
                                        null,
                                        2
                                    )}
                                </pre>
                            </div>

                            {/* New Values */}
                            <div className="mt-4">
                                <p className="mb-2 text-sm font-bold text-gray-900">
                                    New Values
                                </p>

                                <pre className="max-h-64 overflow-auto rounded-lg bg-gray-900 p-4 text-xs text-blue-300">
                                    {JSON.stringify(
                                        selectedAudit.new_values || {},
                                        null,
                                        2
                                    )}
                                </pre>
                            </div>

                            {/* User Agent */}
                            <div className="mt-4">
                                <p className="mb-2 text-sm font-bold text-gray-900">
                                    Device / Browser
                                </p>

                                <div className="rounded-lg bg-gray-50 p-3 font-mono text-xs break-all text-gray-600">
                                    {selectedAudit.user_agent || "-"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}