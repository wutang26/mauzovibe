import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

import {
    FlagIcon,
    EyeIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";

export default function Marketplace({ reports }) {
    const reportData = reports?.data ?? [];

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

        return reasons[reason] ?? reason;
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "pending":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                        <ClockIcon className="h-4 w-4" />
                        Pending
                    </span>
                );

            case "reviewed":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        <EyeIcon className="h-4 w-4" />
                        Reviewed
                    </span>
                );

            case "resolved":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        <CheckCircleIcon className="h-4 w-4" />
                        Resolved
                    </span>
                );

            case "rejected":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        <XCircleIcon className="h-4 w-4" />
                        Rejected
                    </span>
                );

            default:
                return (
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {status ?? "Unknown"}
                    </span>
                );
        }
    };

    const pendingCount = reportData.filter(
        (report) => report.status === "pending"
    ).length;

    const reviewedCount = reportData.filter(
        (report) => report.status === "reviewed"
    ).length;

    const resolvedCount = reportData.filter(
        (report) => report.status === "resolved"
    ).length;

    const rejectedCount = reportData.filter(
        (report) => report.status === "rejected"
    ).length;

    return (
        <AdminLayout>
            <Head title="Marketplace Reports" />

            <div className="min-h-screen bg-slate-50 p-4 md:p-6">

                {/* HEADER */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
                            <FlagIcon className="h-6 w-6 text-red-600" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                Marketplace Reports
                            </h1>

                            <p className="text-sm text-slate-500">
                                Ripoti za matangazo zilizotumwa na marketplace
                                users.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
                        <div className="text-xs font-medium text-slate-400">
                            Total Reports
                        </div>

                        <div className="text-2xl font-bold text-slate-900">
                            {reports?.total ?? 0}
                        </div>
                    </div>
                </div>

                {/* SUMMARY CARDS */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    {/* TOTAL */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">
                                    Total Reports
                                </p>

                                <p className="mt-1 text-2xl font-bold text-slate-900">
                                    {reports?.total ?? 0}
                                </p>
                            </div>

                            <FlagIcon className="h-8 w-8 text-red-500" />
                        </div>
                    </div>

                    {/* PENDING */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">
                                    Pending
                                </p>

                                <p className="mt-1 text-2xl font-bold text-amber-600">
                                    {pendingCount}
                                </p>
                            </div>

                            <ClockIcon className="h-8 w-8 text-amber-500" />
                        </div>
                    </div>

                    {/* RESOLVED */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">
                                    Resolved
                                </p>

                                <p className="mt-1 text-2xl font-bold text-green-600">
                                    {resolvedCount}
                                </p>
                            </div>

                            <CheckCircleIcon className="h-8 w-8 text-green-500" />
                        </div>
                    </div>

                    {/* REJECTED */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">
                                    Rejected
                                </p>

                                <p className="mt-1 text-2xl font-bold text-red-600">
                                    {rejectedCount}
                                </p>
                            </div>

                            <XCircleIcon className="h-8 w-8 text-red-500" />
                        </div>
                    </div>
                </div>

                {/* OPTIONAL STATUS OVERVIEW */}
                <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-bold text-slate-900">
                                Report Status Overview
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Muhtasari wa hali ya marketplace reports.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {getStatusBadge("pending")}
                            {getStatusBadge("reviewed")}
                            {getStatusBadge("resolved")}
                            {getStatusBadge("rejected")}
                        </div>
                    </div>
                </div>

                {/* REPORTS TABLE */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    {/* TABLE HEADER */}
                    <div className="border-b border-slate-200 px-5 py-4">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                                <h2 className="font-bold text-slate-900">
                                    Marketplace Listing Reports
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Orodha ya reports zote zilizowasilishwa.
                                </p>
                            </div>

                            <div className="text-sm text-slate-500">
                                {reports?.total ?? 0} reports
                            </div>
                        </div>
                    </div>

                    {reportData.length > 0 ? (
                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[1050px] text-left">

                                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                    <tr>
                                        <th className="px-5 py-4 font-semibold">
                                            #
                                        </th>

                                        <th className="px-5 py-4 font-semibold">
                                            Listing
                                        </th>

                                        <th className="px-5 py-4 font-semibold">
                                            Reporter
                                        </th>

                                        <th className="px-5 py-4 font-semibold">
                                            Reason
                                        </th>

                                        <th className="px-5 py-4 font-semibold">
                                            Status
                                        </th>

                                        <th className="px-5 py-4 font-semibold">
                                            Date
                                        </th>

                                        <th className="px-5 py-4 text-right font-semibold">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">

                                    {reportData.map((report, index) => {

                                        const listing = report.listing;
                                        const reporter = report.user;

                                        return (
                                            <tr
                                                key={report.id}
                                                className="transition hover:bg-slate-50"
                                            >

                                                {/* NUMBER */}
                                                <td className="px-5 py-4 text-sm text-slate-500">
                                                    {(reports.current_page - 1) *
                                                        reports.per_page +
                                                        index +
                                                        1}
                                                </td>

                                                {/* LISTING */}
                                                <td className="px-5 py-4">
                                                    <div className="max-w-[280px]">

                                                        <div className="font-semibold text-slate-900">
                                                            {listing?.title ??
                                                                "Listing deleted"}
                                                        </div>

                                                        {listing?.id && (
                                                            <div className="mt-1 text-xs text-slate-400">
                                                                ID: {listing.id}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* REPORTER */}
                                                <td className="px-5 py-4">
                                                    <div>
                                                        <div className="font-medium text-slate-800">
                                                            {reporter?.name ??
                                                                "Unknown user"}
                                                        </div>

                                                        {reporter?.email && (
                                                            <div className="mt-1 text-xs text-slate-400">
                                                                {reporter.email}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* REASON */}
                                                <td className="px-5 py-4">
                                                    <span className="inline-flex rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
                                                        {getReasonLabel(
                                                            report.reason
                                                        )}
                                                    </span>
                                                </td>

                                                {/* STATUS */}
                                                <td className="px-5 py-4">
                                                    {getStatusBadge(
                                                        report.status
                                                    )}
                                                </td>

                                                {/* DATE */}
                                                <td className="px-5 py-4 text-sm text-slate-500">
                                                    {report.created_at
                                                        ? new Date(
                                                              report.created_at
                                                          ).toLocaleDateString(
                                                              "en-GB",
                                                              {
                                                                  day: "2-digit",
                                                                  month: "short",
                                                                  year: "numeric",
                                                              }
                                                          )
                                                        : "-"}
                                                </td>

                                                {/* ACTION */}
                                                <td className="px-5 py-4 text-right">

                                                   <Link
                                                    href={route("admin.reports.marketplace.show", report.id)}
                                                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
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
                    ) : (

                        /* EMPTY STATE */
                        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                                <FlagIcon className="h-8 w-8 text-slate-400" />
                            </div>

                            <h3 className="mt-4 text-lg font-bold text-slate-900">
                                Hakuna reports
                            </h3>

                            <p className="mt-1 max-w-md text-sm text-slate-500">
                                Hakuna marketplace listing reports
                                zilizowasilishwa kwa sasa.
                            </p>
                        </div>
                    )}

                    {/* PAGINATION */}
                    {reports?.links && reports.links.length > 3 && (
                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-5 py-4">

                            <div className="text-sm text-slate-500">
                                Showing{" "}
                                <span className="font-semibold text-slate-700">
                                    {reports.from ?? 0}
                                </span>{" "}
                                -{" "}
                                <span className="font-semibold text-slate-700">
                                    {reports.to ?? 0}
                                </span>{" "}
                                of{" "}
                                <span className="font-semibold text-slate-700">
                                    {reports.total ?? 0}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-1">

                                {reports.links.map((link, index) => {

                                    if (!link.url) {
                                        return (
                                            <span
                                                key={index}
                                                className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-300"
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        );
                                    }

                                    return (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                                                link.active
                                                    ? "border-emerald-600 bg-emerald-600 text-white"
                                                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    );
                                })}

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

