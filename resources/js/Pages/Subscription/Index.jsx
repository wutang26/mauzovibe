import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function Index({
    branch,
    subscription,
    trialDaysLeft = 0,
    subscriptionDaysLeft = 0,
}) {

    // =====================================================
    // PLAN
    // =====================================================

    const [billingCycle, setBillingCycle] = useState("monthly");

    // =====================================================
    // STATUS
    // =====================================================

    const isTrial =
        subscription?.status === "trial";

    const isActive =
        subscription?.status === "active";

    const isExpired =
        subscription?.status === "expired";

    const isPending =
        subscription?.status === "pending";


    // =====================================================
    // PLAN DETAILS
    // =====================================================

    const plans = {

        monthly: {
            name: "Monthly",
            price: 10000,
            period: "month",
            description: "Flexible monthly billing",
        },

        yearly: {
            name: "Yearly",
            price: 100000,
            period: "year",
            description: "Save TZS 20,000 per year",
        },

    };

    const selectedPlan =
        plans[billingCycle];


    // =====================================================
    // SUBSCRIBE
    // =====================================================

    function subscribe() {

        router.post(
            route("subscription.subscribe"),
            {
                billing_cycle: billingCycle,
            }
        );

    }


    return (

        <AdminLayout>

            <Head title="Subscription" />


            <div
                className="
                    mx-auto
                    w-full
                    max-w-6xl
                    px-4
                    sm:px-6
                    lg:px-8
                "
            >


                {/* =====================================================
                    PAGE HEADER
                ===================================================== */}

                {/* =====================================================
                    TRIAL INFORMATION + CURRENT BRANCH
                ===================================================== */}

                {isTrial && (

                    <div
                        className="
            mb-8
            rounded-2xl
            border
            border-emerald-200
            bg-emerald-50
            px-6
            py-6
            shadow-sm
            dark:border-emerald-800
            dark:bg-emerald-900/20
        "
                    >

                        <div
                            className="
                grid
                grid-cols-1
                gap-6
                md:grid-cols-[1fr_auto_auto]
                md:items-center
            "
                        >

                            {/* =================================================
                LEFT — FREE TRIAL
            ================================================= */}

                            <div className="min-w-0">

                                <p
                                    className="
                        text-base
                        font-bold
                        text-emerald-800
                        dark:text-emerald-400
                    "
                                >
                                    🎉 Your free trial is active
                                </p>

                                <p
                                    className="
                        mt-1
                        text-sm
                        text-emerald-700
                        dark:text-emerald-500
                    "
                                >
                                    You have{" "}
                                    <strong className="font-black">
                                        {trialDaysLeft}
                                    </strong>{" "}
                                    {trialDaysLeft === 1
                                        ? "day"
                                        : "days"}{" "}
                                    remaining.
                                </p>

                            </div>


                            {/* =================================================
                CENTER — CURRENT BRANCH
            ================================================= */}

                            <div
                                className="
                    min-w-0
                    md:border-l
                    md:border-emerald-200
                    md:pl-8
                    dark:md:border-emerald-800
                "
                            >

                                <p
                                    className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-wider
                        text-emerald-600
                        dark:text-emerald-400
                    "
                                >
                                    Current Branch
                                </p>

                                <h2
                                    className="
                        mt-1
                        text-lg
                        font-black
                        text-slate-900
                        dark:text-white
                    "
                                >
                                    🏪 {branch?.name || "No Branch"}
                                </h2>

                                {branch?.location && (

                                    <p
                                        className="
                            mt-0.5
                            text-sm
                            text-slate-500
                            dark:text-slate-400
                        "
                                    >
                                        {branch.location}
                                    </p>

                                )}

                            </div>


                            {/* =================================================
                RIGHT — DAYS REMAINING
            ================================================= */}

                            <div
                                className="
                    flex
                    items-center
                    justify-center
                    md:min-w-[90px]
                    md:justify-end
                "
                            >

                                <span
                                    className="
                        text-5xl
                        font-black
                        leading-none
                        text-emerald-600
                        dark:text-emerald-400
                    "
                                >
                                    {trialDaysLeft}
                                </span>

                            </div>

                        </div>

                    </div>

                )}

                {/* =====================================================
                    ACTIVE INFORMATION + CURRENT BRANCH
                ===================================================== */}

                {isActive && (

                    <div
                        className="
                            mb-8
                            rounded-2xl
                            border
                            border-green-200
                            bg-green-50
                            p-5
                            shadow-sm
                            dark:border-green-800
                            dark:bg-green-900/20
                        "
                    >

                        <div
                            className="
                                flex
                                flex-col
                                gap-5
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                            "
                        >

                            <div>

                                <p
                                    className="
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-wider
                                        text-green-600
                                        dark:text-green-400
                                    "
                                >
                                    Current Branch
                                </p>

                                <h2
                                    className="
                                        mt-1
                                        text-lg
                                        font-black
                                        text-slate-900
                                        dark:text-white
                                    "
                                >
                                    🏪 {branch?.name || "No Branch"}
                                </h2>

                                {branch?.location && (

                                    <p
                                        className="
                                            mt-0.5
                                            text-sm
                                            text-slate-500
                                            dark:text-slate-400
                                        "
                                    >
                                        {branch.location}
                                    </p>

                                )}

                                <div
                                    className="
                                        my-4
                                        h-px
                                        max-w-md
                                        bg-green-200
                                        dark:bg-green-800
                                    "
                                />

                                <p
                                    className="
                                        font-bold
                                        text-green-800
                                        dark:text-green-400
                                    "
                                >
                                    ✓ Subscription Active
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-green-700
                                        dark:text-green-500
                                    "
                                >
                                    You have{" "}
                                    <strong>
                                        {subscriptionDaysLeft}
                                    </strong>{" "}
                                    days remaining.
                                </p>

                                {subscription?.ends_at && (

                                    <p
                                        className="
                                            mt-2
                                            text-xs
                                            text-green-600
                                            dark:text-green-500
                                        "
                                    >
                                        Expires on{" "}
                                        {new Date(
                                            subscription.ends_at
                                        ).toLocaleDateString()}
                                    </p>

                                )}

                            </div>

                        </div>

                    </div>

                )}


                {/* =====================================================
                    EXPIRED INFORMATION + CURRENT BRANCH
                ===================================================== */}

                {isExpired && (

                    <div
                        className="
                            mb-8
                            rounded-2xl
                            border
                            border-red-200
                            bg-red-50
                            p-5
                            shadow-sm
                            dark:border-red-800
                            dark:bg-red-900/20
                        "
                    >

                        <p
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-red-600
                                dark:text-red-400
                            "
                        >
                            Current Branch
                        </p>

                        <h2
                            className="
                                mt-1
                                text-lg
                                font-black
                                text-slate-900
                                dark:text-white
                            "
                        >
                            🏪 {branch?.name || "No Branch"}
                        </h2>

                        {branch?.location && (

                            <p
                                className="
                                    mt-0.5
                                    text-sm
                                    text-slate-500
                                    dark:text-slate-400
                                "
                            >
                                {branch.location}
                            </p>

                        )}

                        <div
                            className="
                                my-4
                                h-px
                                max-w-md
                                bg-red-200
                                dark:bg-red-800
                            "
                        />

                        <p
                            className="
                                font-bold
                                text-red-800
                                dark:text-red-400
                            "
                        >
                            ⚠ Your subscription has expired
                        </p>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-red-700
                                dark:text-red-500
                            "
                        >
                            Choose a plan below to continue using
                            this branch.
                        </p>

                    </div>

                )}


                {/* =====================================================
                    BILLING TOGGLE
                ===================================================== */}

                <div className="mb-6 flex justify-center">

                    <div
                        className="
                            inline-flex
                            rounded-xl
                            bg-slate-100
                            p-1
                            dark:bg-slate-800
                        "
                    >

                        <button
                            type="button"
                            onClick={() =>
                                setBillingCycle("monthly")
                            }
                            className={`
                                rounded-lg
                                px-5
                                py-2.5
                                text-sm
                                font-bold
                                transition

                                ${billingCycle === "monthly"
                                    ? `
                                            bg-white
                                            text-emerald-600
                                            shadow
                                            dark:bg-slate-700
                                            dark:text-emerald-400
                                        `
                                    : `
                                            text-slate-500
                                            hover:text-slate-800
                                            dark:text-slate-400
                                            dark:hover:text-white
                                        `
                                }
                            `}
                        >
                            Monthly
                        </button>


                        <button
                            type="button"
                            onClick={() =>
                                setBillingCycle("yearly")
                            }
                            className={`
                                rounded-lg
                                px-5
                                py-2.5
                                text-sm
                                font-bold
                                transition

                                ${billingCycle === "yearly"
                                    ? `
                                            bg-white
                                            text-emerald-600
                                            shadow
                                            dark:bg-slate-700
                                            dark:text-emerald-400
                                        `
                                    : `
                                            text-slate-500
                                            hover:text-slate-800
                                            dark:text-slate-400
                                            dark:hover:text-white
                                        `
                                }
                            `}
                        >
                            Yearly
                        </button>

                    </div>

                </div>


                {/* =====================================================
                    PLAN CARD
                ===================================================== */}

                <div className="mx-auto max-w-xl">

                    <div
                        className="
                            relative
                            overflow-hidden
                            rounded-3xl
                            border-2
                            border-emerald-500
                            bg-white
                            p-7
                            shadow-xl
                            dark:bg-slate-900
                        "
                    >

                        {/* Popular */}

                        {billingCycle === "yearly" && (

                            <div
                                className="
                                    absolute
                                    right-5
                                    top-5
                                    rounded-full
                                    bg-emerald-100
                                    px-3
                                    py-1
                                    text-xs
                                    font-black
                                    text-emerald-700
                                    dark:bg-emerald-900/40
                                    dark:text-emerald-400
                                "
                            >
                                SAVE 20%
                            </div>

                        )}


                        <p
                            className="
                                text-sm
                                font-semibold
                                text-emerald-600
                            "
                        >
                            MauzoVibe {selectedPlan.name} Plan
                        </p>


                        <h2
                            className="
                                mt-2
                                text-2xl
                                font-black
                                text-slate-900
                                dark:text-white
                            "
                        >
                            Complete Business Management
                        </h2>


                        <p
                            className="
                                mt-2
                                text-sm
                                text-slate-500
                                dark:text-slate-400
                            "
                        >
                            {selectedPlan.description}
                        </p>


                        {/* PRICE */}

                        <div className="mt-6">

                            <span
                                className="
                                    text-4xl
                                    font-black
                                    text-slate-900
                                    dark:text-white
                                "
                            >
                                TZS{" "}
                                {selectedPlan.price.toLocaleString()}
                            </span>

                            <span
                                className="
                                    ml-2
                                    text-sm
                                    text-slate-500
                                "
                            >
                                / {selectedPlan.period}
                            </span>

                        </div>


                        {/* FEATURES */}

                        <div className="mt-7 space-y-3">

                            {[
                                "POS & Sales Management",
                                "Inventory Management",
                                "Customer Management",
                                "Sales Reports",
                                "Stock Alerts",
                                "Branch Management",
                                "Business Dashboard",
                                "Regular System Updates",
                            ].map((feature) => (

                                <div
                                    key={feature}
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        text-sm
                                        text-slate-700
                                        dark:text-slate-300
                                    "
                                >

                                    <span
                                        className="
                                            flex
                                            h-6
                                            w-6
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-emerald-100
                                            text-emerald-600
                                            dark:bg-emerald-900/40
                                            dark:text-emerald-400
                                        "
                                    >
                                        ✓
                                    </span>

                                    {feature}

                                </div>

                            ))}

                        </div>


                        {/* SUBSCRIBE BUTTON */}

                        <button
                            type="button"
                            onClick={subscribe}
                            disabled={isPending}
                            className="
                                mt-8
                                w-full
                                rounded-xl
                                bg-emerald-600
                                px-6
                                py-4
                                text-sm
                                font-black
                                text-white
                                shadow-lg
                                shadow-emerald-600/20
                                transition
                                hover:-translate-y-0.5
                                hover:bg-emerald-700
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >

                            {isPending
                                ? "Payment Pending..."
                                : isActive
                                    ? "Renew Subscription"
                                    : "Subscribe Now"}

                        </button>


                        <p
                            className="
                                mt-3
                                text-center
                                text-xs
                                text-slate-400
                            "
                        >
                            Secure payment • Cancel anytime
                        </p>

                    </div>

                </div>


                {/* =====================================================
                    TEMPORARY PAYMENT TEST
                ===================================================== */}

                {isPending && (

                    <div
                        className="
                            mx-auto
                            mt-8
                            max-w-xl
                            rounded-2xl
                            border
                            border-yellow-200
                            bg-yellow-50
                            p-5
                            dark:border-yellow-800
                            dark:bg-yellow-900/20
                        "
                    >

                        <p
                            className="
                                font-bold
                                text-yellow-800
                                dark:text-yellow-400
                            "
                        >
                            Payment Pending
                        </p>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-yellow-700
                                dark:text-yellow-500
                            "
                        >
                            This is currently a temporary payment
                            testing option.
                        </p>


                        <button
                            type="button"
                            onClick={() => {

                                router.post(
                                    route(
                                        "subscription.payment.success"
                                    )
                                );

                            }}
                            className="
                                mt-4
                                w-full
                                rounded-xl
                                bg-slate-900
                                px-5
                                py-3
                                text-sm
                                font-bold
                                text-white
                                transition
                                hover:bg-slate-800
                            "
                        >
                            Simulate Successful Payment
                        </button>

                    </div>

                )}


                {/* =====================================================
                    BACK
                ===================================================== */}

                <div className="mt-8 pb-8 text-center">

                    <Link
                        href={route("dashboard")}
                        className="
                            text-sm
                            font-semibold
                            text-slate-500
                            hover:text-emerald-600
                        "
                    >
                        ← Back to Dashboard
                    </Link>

                </div>

            </div>

        </AdminLayout>
    );
}