import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";

import {
    ArrowLeftIcon,
    FlagIcon,
    EyeIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    ExclamationTriangleIcon,
    UserIcon,
    MapPinIcon,
    CalendarDaysIcon,
    ShieldExclamationIcon,
    NoSymbolIcon,
} from "@heroicons/react/24/outline";

export default function MarketplaceShow({ report }) {
    const [processing, setProcessing] = useState(false);

    const listing = report?.listing;
    const reporter = report?.user;

    const getReasonLabel = (reason) => {
        const reasons = {
            scam: "Scam / Utapeli",
            fake_product: "Bidhaa bandia",
            wrong_information: "Taarifa si sahihi",
            inappropriate: "Maudhui yasiyofaa",
            prohibited_item: "Bidhaa hairuhusiwi",
            seller_behavior: "Tabia mbaya ya seller",
            other: "Nyingine",
        };

        return reasons[reason] ?? reason ?? "Haijulikani";
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "pending":
                return (
                    <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-700">
                        <ClockIcon className="h-4 w-4" />
                        Pending
                    </span>
                );

            case "reviewed":
                return (
                    <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-bold text-blue-700">
                        <EyeIcon className="h-4 w-4" />
                        Reviewed
                    </span>
                );

            case "resolved":
                return (
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
                        <CheckCircleIcon className="h-4 w-4" />
                        Resolved
                    </span>
                );

            case "rejected":
                return (
                    <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1.5 text-xs font-bold text-red-700">
                        <XCircleIcon className="h-4 w-4" />
                        Rejected
                    </span>
                );

            default:
                return (
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                        {status ?? "Unknown"}
                    </span>
                );
        }
    };

    const changeStatus = (status) => {
        if (!report?.id) return;

        setProcessing(true);

        router.patch(
            route(
                "admin.reports.marketplace.status",
                report.id
            ),
            {
                status,
            },
            {
                preserveScroll: true,
                onFinish: () => setProcessing(false),
            }
        );
    };

    const disableListing = () => {
        if (!report?.id) return;

        const confirmed = window.confirm(
            "Una uhakika unataka kuzima listing hii? Listing haitaonekana tena kwa marketplace users."
        );

        if (!confirmed) return;

        setProcessing(true);

        router.patch(
            route(
                "admin.reports.marketplace.disable-listing",
                report.id
            ),
            {},
            {
                preserveScroll: true,
                onFinish: () => setProcessing(false),
            }
        );
    };

    return (
        <AdminLayout>
            <Head title="View Marketplace Report" />

            <div className="min-h-screen bg-slate-50 p-4 md:p-6">

                {/* BACK */}
                <div className="mb-6">
                    <Link
                        href={route("admin.reports.marketplace")}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700"
                    >
                        <ArrowLeftIcon className="h-4 w-4" />
                        Back to Marketplace Reports
                    </Link>
                </div>

                {/* HEADER */}
                <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">

                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
                            <FlagIcon className="h-6 w-6 text-red-600" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                Marketplace Report
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Review taarifa ya report na chukua hatua
                                inayohitajika.
                            </p>
                        </div>

                    </div>

                    <div>
                        {getStatusBadge(report?.status)}
                    </div>

                </div>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                    {/* LEFT */}
                    <div className="space-y-6 lg:col-span-2">

                        {/* LISTING */}
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                            <div className="border-b border-slate-200 px-5 py-4">
                                <div className="flex items-center gap-2">
                                    <ShieldExclamationIcon className="h-5 w-5 text-red-500" />

                                    <h2 className="font-bold text-slate-900">
                                        Reported Listing
                                    </h2>
                                </div>
                            </div>

                            <div className="p-5">

                                {listing ? (
                                    <div className="space-y-5">

                                        {/* TITLE */}
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                Listing Title
                                            </p>

                                            <h3 className="mt-1 text-xl font-bold text-slate-900">
                                                {listing.title}
                                            </h3>
                                        </div>

                                        {/* LISTING INFO */}
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                            <div className="rounded-xl bg-slate-50 p-4">
                                                <p className="text-xs text-slate-400">
                                                    Listing ID
                                                </p>

                                                <p className="mt-1 font-semibold text-slate-800">
                                                    #{listing.id}
                                                </p>
                                            </div>

                                            <div className="rounded-xl bg-slate-50 p-4">
                                                <p className="text-xs text-slate-400">
                                                    Listing Status
                                                </p>

                                                <p className="mt-1 font-semibold text-slate-800">
                                                    {listing.status ?? "Unknown"}
                                                </p>
                                            </div>

                                        </div>

                                        {/* DESCRIPTION */}
                                        {listing.description && (
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                    Description
                                                </p>

                                                <div className="mt-2 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                                                    {listing.description}
                                                </div>
                                            </div>
                                        )}

                                        {/* SELLER */}
                                        {listing.user && (
                                            <div className="rounded-xl border border-slate-200 p-4">

                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                                                        <UserIcon className="h-5 w-5 text-emerald-700" />
                                                    </div>

                                                    <div>
                                                        <p className="text-xs text-slate-400">
                                                            Seller
                                                        </p>

                                                        <p className="font-semibold text-slate-900">
                                                            {listing.user.name}
                                                        </p>

                                                        {listing.user.email && (
                                                            <p className="text-xs text-slate-500">
                                                                {listing.user.email}
                                                            </p>
                                                        )}
                                                    </div>

                                                </div>

                                            </div>
                                        )}

                                    </div>
                                ) : (
                                    <div className="rounded-xl bg-red-50 p-5 text-sm text-red-700">
                                        Listing hii haipo tena kwenye
                                        marketplace.
                                    </div>
                                )}

                            </div>

                        </div>

                        {/* REPORT DETAILS */}
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                            <div className="border-b border-slate-200 px-5 py-4">
                                <h2 className="font-bold text-slate-900">
                                    Report Details
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2">

                                {/* REASON */}
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Reason
                                    </p>

                                    <div className="mt-2 inline-flex rounded-lg bg-red-50 px-3 py-2 text-sm font-bold text-red-700">
                                        {getReasonLabel(report?.reason)}
                                    </div>
                                </div>

                                {/* DATE */}
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Reported Date
                                    </p>

                                    <div className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                                        <CalendarDaysIcon className="h-5 w-5 text-slate-400" />

                                        {report?.created_at
                                            ? new Date(
                                                  report.created_at
                                              ).toLocaleString("en-GB", {
                                                  day: "2-digit",
                                                  month: "short",
                                                  year: "numeric",
                                                  hour: "2-digit",
                                                  minute: "2-digit",
                                              })
                                            : "-"}
                                    </div>
                                </div>

                                {/* DESCRIPTION */}
                                <div className="sm:col-span-2">

                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        User Comment
                                    </p>

                                    <div className="mt-2 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                                        {report?.description ||
                                            "Hakuna maelezo yaliyotolewa na reporter."}
                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* REPORTER */}
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                            <div className="border-b border-slate-200 px-5 py-4">
                                <h2 className="font-bold text-slate-900">
                                    Reporter Information
                                </h2>
                            </div>

                            <div className="p-5">

                                <div className="flex items-center gap-4">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                                        <UserIcon className="h-6 w-6 text-slate-500" />
                                    </div>

                                    <div>
                                        <p className="font-bold text-slate-900">
                                            {reporter?.name ??
                                                "Unknown user"}
                                        </p>

                                        <p className="text-sm text-slate-500">
                                            {reporter?.email ??
                                                "No email"}
                                        </p>

                                        {reporter?.phone && (
                                            <p className="mt-1 text-sm text-slate-500">
                                                {reporter.phone}
                                            </p>
                                        )}
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT ACTION PANEL */}
                    <div className="lg:col-span-1">

                        <div className="sticky top-6 space-y-6">

                            {/* ACTIONS */}
                            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                                <div className="border-b border-slate-200 px-5 py-4">
                                    <h2 className="font-bold text-slate-900">
                                        Admin Actions
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Chagua hatua kulingana na review yako.
                                    </p>
                                </div>

                                <div className="space-y-3 p-5">

                                    {/* REVIEWED */}
                                    <button
                                        type="button"
                                        disabled={processing}
                                        onClick={() =>
                                            changeStatus("reviewed")
                                        }
                                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <EyeIcon className="h-5 w-5" />
                                        Mark as Reviewed
                                    </button>

                                    {/* RESOLVED */}
                                    <button
                                        type="button"
                                        disabled={processing}
                                        onClick={() =>
                                            changeStatus("resolved")
                                        }
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <CheckCircleIcon className="h-5 w-5" />
                                        Mark as Resolved
                                    </button>

                                    {/* REJECT */}
                                    <button
                                        type="button"
                                        disabled={processing}
                                        onClick={() =>
                                            changeStatus("rejected")
                                        }
                                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <XCircleIcon className="h-5 w-5" />
                                        Reject Report
                                    </button>

                                    {/* PENDING */}
                                    <button
                                        type="button"
                                        disabled={processing}
                                        onClick={() =>
                                            changeStatus("pending")
                                        }
                                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-700 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <ClockIcon className="h-5 w-5" />
                                        Return to Pending
                                    </button>

                                </div>

                            </div>

                            {/* DANGEROUS ACTION */}
                            {listing && (
                                <div className="rounded-2xl border border-red-200 bg-red-50 shadow-sm">

                                    <div className="p-5">

                                        <div className="flex items-start gap-3">

                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100">
                                                <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                                            </div>

                                            <div>
                                                <h3 className="font-bold text-red-900">
                                                    Disable Listing
                                                </h3>

                                                <p className="mt-1 text-xs leading-5 text-red-700">
                                                    Kama report ni halali na
                                                    listing inakiuka sheria za
                                                    marketplace, unaweza
                                                    kuizima.
                                                </p>
                                            </div>

                                        </div>

                                        <button
                                            type="button"
                                            disabled={processing}
                                            onClick={disableListing}
                                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <NoSymbolIcon className="h-5 w-5" />
                                            Disable Listing
                                        </button>

                                    </div>

                                </div>
                            )}

                            {/* CURRENT STATUS */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Current Report Status
                                </p>

                                <div className="mt-3">
                                    {getStatusBadge(report?.status)}
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </AdminLayout>
    );
}