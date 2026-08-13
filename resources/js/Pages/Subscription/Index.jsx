import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({
    branch,
    subscription,
    trialDaysLeft = 0,
    subscriptionDaysLeft = 0,
}) {

    const isTrial =
        subscription?.status === "trial";

    const isActive =
        subscription?.status === "active";

    const isExpired =
        subscription?.status === "expired";


    return (
        <AdminLayout>

            <Head title="Subscription" />

            <div className="mx-auto w-full max-w-5xl">

                {/* =====================================================
                    HEADER
                ===================================================== */}

                <div className="mb-6">

                    <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">
                        Subscription
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage your MauzoVibe subscription.
                    </p>

                </div>


                {/* =====================================================
                    BRANCH
                ===================================================== */}

                <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Current Branch
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-slate-900">
                        {branch?.name}
                    </h2>

                    {branch?.location && (
                        <p className="mt-1 text-sm text-slate-500">
                            {branch.location}
                        </p>
                    )}

                </div>


                {/* =====================================================
                    SUBSCRIPTION CARD
                ===================================================== */}

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">

                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <p className="text-sm font-medium text-slate-500">
                                Subscription Status
                            </p>


                            {/* STATUS */}

                            {isTrial && (
                                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">

                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                                    Free Trial

                                </div>
                            )}


                            {isActive && (
                                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-bold text-green-700">

                                    <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                                    Active

                                </div>
                            )}


                            {isExpired && (
                                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-700">

                                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />

                                    Expired

                                </div>
                            )}

                        </div>


                        {/* PRICE */}

                        <div className="text-left sm:text-right">

                            <p className="text-sm text-slate-500">
                                Monthly Plan
                            </p>

                            <p className="mt-1 text-3xl font-black text-slate-900">
                                TZS 10,000
                            </p>

                            <p className="text-xs text-slate-400">
                                per branch / month
                            </p>

                        </div>

                    </div>


                    {/* =====================================================
                        TRIAL INFORMATION
                    ===================================================== */}

                    {isTrial && (
                        <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm font-semibold text-emerald-800">
                                        Free Trial
                                    </p>

                                    <p className="mt-1 text-sm text-emerald-700">
                                        You have{" "}
                                        <span className="font-black">
                                            {trialDaysLeft}
                                        </span>{" "}
                                        days remaining.
                                    </p>

                                </div>


                                <div className="text-4xl font-black text-emerald-600">
                                    {trialDaysLeft}
                                </div>

                            </div>

                        </div>
                    )}


                    {/* =====================================================
                        ACTIVE INFORMATION
                    ===================================================== */}

                    {isActive && (
                        <div className="mt-8 rounded-2xl border border-green-100 bg-green-50 p-5">

                            <p className="text-sm font-semibold text-green-800">
                                Subscription Active
                            </p>

                            <p className="mt-1 text-sm text-green-700">

                                You have{" "}
                                <span className="font-black">
                                    {subscriptionDaysLeft}
                                </span>{" "}
                                days remaining.

                            </p>

                            {subscription?.ends_at && (
                                <p className="mt-2 text-xs text-green-600">

                                    Expires on{" "}
                                    {new Date(
                                        subscription.ends_at
                                    ).toLocaleDateString()}

                                </p>
                            )}

                        </div>
                    )}


                    {/* =====================================================
                        EXPIRED
                    ===================================================== */}

                    {isExpired && (
                        <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-5">

                            <p className="text-sm font-semibold text-red-800">
                                Your subscription has expired.
                            </p>

                            <p className="mt-1 text-sm text-red-700">
                                Subscribe now to continue using this branch.
                            </p>

                        </div>
                    )}


                    {/* =====================================================
                        PAYMENT BUTTON
                    ===================================================== */}

                    <div className="mt-8">

                        <button
                            type="button"
                            onClick={() => {
                                router.post(
                                    route("subscription.subscribe")
                                );
                            }}
                            className="
                                w-full
                                rounded-xl
                                bg-emerald-600
                                px-6
                                py-3.5
                                text-sm
                                font-bold
                                text-white
                                shadow-lg
                                shadow-emerald-600/20
                                transition
                                hover:bg-emerald-700
                                hover:-translate-y-0.5
                            "
                        >

                            {isTrial
                                ? "Subscribe Now"
                                : "Renew Subscription"}

                        </button>


                        {subscription?.status === "pending" && (
    <div className="mt-4 rounded-xl border border-yellow-200 bg-yellow-50 p-4">

        <p className="text-sm font-semibold text-yellow-800">
            Payment Pending
        </p>

        <p className="mt-1 text-xs text-yellow-700">
            This is a temporary payment testing option.
        </p>

        <button
            type="button"
            onClick={() => {
                router.post(
                    route("subscription.payment.success")
                );
            }}
            className="
                mt-3
                w-full
                rounded-lg
                bg-slate-900
                px-4
                py-3
                text-sm
                font-bold
                text-white
                hover:bg-slate-800
            "
        >
            Simulate Successful Payment
        </button>

    </div>
)}

                    </div>
                        
                        Temporary test thr payment gate

                    {/* =====================================================
                        BACK
                    ===================================================== */}

                    <div className="mt-4 text-center">

                        <Link
                            href={route("dashboard")}
                            className="text-sm font-semibold text-slate-500 hover:text-emerald-600"
                        >
                            ← Back to Dashboard
                        </Link>

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}