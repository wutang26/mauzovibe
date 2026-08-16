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
                    HEADER
                ===================================================== */}

                <div className="mb-8">

                    <p
                        className="
                            text-sm
                            font-semibold
                            text-emerald-600
                        "
                    >
                        MauzoVibe Subscription
                    </p>

                    <h1
                        className="
                            mt-1
                            text-3xl
                            font-black
                            tracking-tight
                            text-slate-900
                            dark:text-white
                            sm:text-4xl
                        "
                    >
                        Choose your subscription plan
                    </h1>

                    <p
                        className="
                            mt-2
                            max-w-2xl
                            text-sm
                            text-slate-500
                            dark:text-slate-400
                        "
                    >
                        Continue using MauzoVibe POS, inventory,
                        sales reports and other business tools
                        by subscribing for your branch.
                    </p>

                </div>


                {/* =====================================================
                    CURRENT BRANCH
                ===================================================== */}

                <div
                    className="
                        mb-8
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-5
                        shadow-sm
                        dark:border-slate-700
                        dark:bg-slate-900
                    "
                >

                    <div
                        className="
                            flex
                            flex-col
                            gap-3
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
                                    tracking-wide
                                    text-slate-400
                                "
                            >
                                Current Branch
                            </p>

                            <h2
                                className="
                                    mt-1
                                    text-xl
                                    font-bold
                                    text-slate-900
                                    dark:text-white
                                "
                            >
                                🏪 {branch?.name}
                            </h2>

                            {branch?.location && (

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-slate-500
                                        dark:text-slate-400
                                    "
                                >
                                    {branch.location}
                                </p>

                            )}

                        </div>


                        {/* STATUS */}

                        <div>

                            {isTrial && (

                                <span
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        bg-emerald-50
                                        px-4
                                        py-2
                                        text-sm
                                        font-bold
                                        text-emerald-700
                                        dark:bg-emerald-900/30
                                        dark:text-emerald-400
                                    "
                                >

                                    <span
                                        className="
                                            h-2.5
                                            w-2.5
                                            rounded-full
                                            bg-emerald-500
                                        "
                                    />

                                    Free Trial

                                </span>

                            )}


                            {isActive && (

                                <span
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        bg-green-50
                                        px-4
                                        py-2
                                        text-sm
                                        font-bold
                                        text-green-700
                                        dark:bg-green-900/30
                                        dark:text-green-400
                                    "
                                >

                                    <span
                                        className="
                                            h-2.5
                                            w-2.5
                                            rounded-full
                                            bg-green-500
                                        "
                                    />

                                    Active

                                </span>

                            )}


                            {isExpired && (

                                <span
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        bg-red-50
                                        px-4
                                        py-2
                                        text-sm
                                        font-bold
                                        text-red-700
                                        dark:bg-red-900/30
                                        dark:text-red-400
                                    "
                                >

                                    <span
                                        className="
                                            h-2.5
                                            w-2.5
                                            rounded-full
                                            bg-red-500
                                        "
                                    />

                                    Expired

                                </span>

                            )}


                            {isPending && (

                                <span
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        bg-yellow-50
                                        px-4
                                        py-2
                                        text-sm
                                        font-bold
                                        text-yellow-700
                                        dark:bg-yellow-900/30
                                        dark:text-yellow-400
                                    "
                                >

                                    <span
                                        className="
                                            h-2.5
                                            w-2.5
                                            rounded-full
                                            bg-yellow-500
                                        "
                                    />

                                    Payment Pending

                                </span>

                            )}

                        </div>

                    </div>

                </div>


                {/* =====================================================
                    TRIAL INFORMATION
                ===================================================== */}

                {isTrial && (

                    <div
                        className="
                            mb-8
                            rounded-2xl
                            border
                            border-emerald-200
                            bg-emerald-50
                            p-5
                            dark:border-emerald-800
                            dark:bg-emerald-900/20
                        "
                    >

                        <div
                            className="
                                flex
                                flex-col
                                gap-4
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                            "
                        >

                            <div>

                                <p
                                    className="
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
                                    <strong>
                                        {trialDaysLeft}
                                    </strong>{" "}
                                    days remaining.
                                </p>

                            </div>


                            <div
                                className="
                                    text-4xl
                                    font-black
                                    text-emerald-600
                                "
                            >
                                {trialDaysLeft}
                            </div>

                        </div>

                    </div>

                )}


                {/* =====================================================
                    ACTIVE INFORMATION
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
                            dark:border-green-800
                            dark:bg-green-900/20
                        "
                    >

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

                )}


                {/* =====================================================
                    EXPIRED INFORMATION
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
                            dark:border-red-800
                            dark:bg-red-900/20
                        "
                    >

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

                                ${
                                    billingCycle === "monthly"
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

                                ${
                                    billingCycle === "yearly"
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