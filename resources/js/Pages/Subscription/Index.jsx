
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function Index({
    branch,
    subscription,
    trialDaysLeft = 0,
    subscriptionDaysLeft = 0,
    isInGracePeriod = false,
    graceDaysLeft = 0,
    graceEndsAt = null,
}) {
    const [selectedPlan, setSelectedPlan] = useState("starter");
    const [processing, setProcessing] = useState(false);

    // Subscription status
    const isTrial = subscription?.status === "trial";
    const isActive = subscription?.status === "active";
    const isExpired = subscription?.status === "expired";
    const isCancelled = subscription?.status === "cancelled";

    // Pending payment is separate from current subscription status
    const hasPendingPlan = Boolean(subscription?.pending_plan);

    const plans = [
        {
            id: "starter",
            name: "Starter",
            price: 15000,
            description: "Muhimu kwa biashara ndogo zinazoanza kutumia mfumo.",
            features: [
                "POS & Sales Management",
                "Inventory Management",
                "Customer Management",
                "Sales Reports",
                "Stock Alerts",
                "Business Dashboard",
                "Regular System Updates",
            ],
        },
        {
            id: "business",
            name: "Business",
            price: 20000,
            description: "Kwa biashara zinazohitaji usimamizi mpana zaidi.",
            popular: true,
            features: [
                "Everything in Starter",
                "Multiple Users",
                "Branch Management",
                "Advanced Business Reports",
                "Customer Credit Management",
                "Sales & Stock Tracking",
                "Priority Support",
            ],
        },
    ];

    const currentPendingPlan = plans.find(
        (plan) => plan.id === subscription?.pending_plan
    );

    function subscribe() {
        if (processing) return;

        setProcessing(true);

        router.post(
            route("subscription.subscribe"),
            {
                plan: selectedPlan,
            },
            {
                onFinish: () => setProcessing(false),
            }
        );
    }

    function simulatePayment() {
        if (processing) return;

        setProcessing(true);

        router.post(
            route("subscription.payment.success"),
            {},
            {
                onFinish: () => setProcessing(false),
            }
        );
    }

    function formatDate(date) {
        if (!date) return "—";

        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    }

    function formatMoney(amount) {
        return Number(amount || 0).toLocaleString("en-TZ");
    }

    return (
        <AdminLayout>
            <Head title="Subscription" />

            <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">

                {/* PAGE HEADER */}
                <div className="mb-8">
                    <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
                        MauzoVibe Subscription
                    </p>

                    <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                        Manage Your Subscription
                    </h1>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Chagua mpango unaofaa mahitaji ya biashara yako.
                    </p>
                </div>

                {/* CURRENT BRANCH */}
                <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Current Branch
                    </p>

                    <h2 className="mt-2 text-xl font-black text-slate-900 dark:text-white">
                        🏪 {branch?.name || "No Branch"}
                    </h2>

                    {branch?.location && (
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {branch.location}
                        </p>
                    )}
                </div>

                {/* FREE TRIAL */}
                {isTrial && (
                    <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-800 dark:bg-emerald-900/20">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="font-black text-emerald-800 dark:text-emerald-400">
                                    🎉 Free Trial Active
                                </p>

                                <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-300">
                                    Trial yako ni ya siku 14. Una siku{" "}
                                    <strong>{trialDaysLeft}</strong>{" "}
                                    zilizobaki.
                                </p>

                                <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400">
                                    Baada ya trial kuisha, utahitaji kuchagua mpango wa kulipia.
                                </p>
                            </div>

                            <div className="text-5xl font-black text-emerald-600 dark:text-emerald-400">
                                {trialDaysLeft}
                                <span className="ml-1 text-sm">days</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* ACTIVE SUBSCRIPTION */}
                {isActive && !isInGracePeriod && (
                    <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/20">
                        <p className="font-black text-green-800 dark:text-green-400">
                            ✓ Subscription Active
                        </p>

                        <p className="mt-2 text-sm text-green-700 dark:text-green-300">
                            Mpango wako wa{" "}
                            <strong className="capitalize">
                                {subscription?.plan}
                            </strong>{" "}
                            unaendelea kufanya kazi.
                        </p>

                        <div className="mt-4 grid gap-4 sm:grid-cols-3">
                            <div>
                                <p className="text-xs text-green-700 dark:text-green-400">
                                    Amount
                                </p>
                                <p className="mt-1 font-black text-green-900 dark:text-white">
                                    TZS {formatMoney(subscription?.amount)}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-green-700 dark:text-green-400">
                                    Days Remaining
                                </p>
                                <p className="mt-1 font-black text-green-900 dark:text-white">
                                    {subscriptionDaysLeft} days
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-green-700 dark:text-green-400">
                                    Expires On
                                </p>
                                <p className="mt-1 font-black text-green-900 dark:text-white">
                                    {formatDate(subscription?.ends_at)}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* GRACE PERIOD */}
                {isActive && isInGracePeriod && (
                    <div className="mb-6 rounded-2xl border border-amber-300 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-900/20">
                        <p className="font-black text-amber-800 dark:text-amber-400">
                            ⚠ Subscription Grace Period
                        </p>

                        <p className="mt-2 text-sm text-amber-800 dark:text-amber-300">
                            Muda wa subscription umeisha. Umepewa siku 7 za ziada
                            ili kufanya malipo na kuendelea kutumia mfumo.
                        </p>

                        <p className="mt-3 text-3xl font-black text-amber-700 dark:text-amber-400">
                            {graceDaysLeft} days remaining
                        </p>

                        <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">
                            Grace period ends: {formatDate(graceEndsAt)}
                        </p>
                    </div>
                )}

                {/* EXPIRED SUBSCRIPTION */}
                {(isExpired || isCancelled || !subscription) && (
                    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
                        <p className="font-black text-red-800 dark:text-red-400">
                            ⚠ Subscription Not Active
                        </p>

                        <p className="mt-2 text-sm text-red-700 dark:text-red-300">
                            {isCancelled
                                ? "Subscription hii imefutwa. Chagua mpango mpya ili kuendelea."
                                : "Subscription yako imeisha. Chagua mpango mpya ili kuendelea kutumia huduma."}
                        </p>
                    </div>
                )}

                {/* PENDING PLAN */}
                {hasPendingPlan && (
                    <div className="mb-6 rounded-2xl border border-yellow-300 bg-yellow-50 p-6 dark:border-yellow-800 dark:bg-yellow-900/20">
                        <p className="font-black text-yellow-800 dark:text-yellow-400">
                            Payment Awaiting Confirmation
                        </p>

                        <p className="mt-2 text-sm text-yellow-800 dark:text-yellow-300">
                            Umechagua mpango wa{" "}
                            <strong className="capitalize">
                                {currentPendingPlan?.name || subscription.pending_plan}
                            </strong>.
                        </p>

                        <p className="mt-1 text-sm text-yellow-800 dark:text-yellow-300">
                            Kiasi:{" "}
                            <strong>
                                TZS {formatMoney(subscription?.pending_amount)}
                            </strong>{" "}
                            kwa mwezi kwa branch hii.
                        </p>

                        <p className="mt-2 text-xs text-yellow-700 dark:text-yellow-400">
                            Subscription yako ya sasa haijazimwa. Itabadilika baada ya malipo kuthibitishwa.
                        </p>

                        {/* TEMPORARY TEST ONLY */}
                        <button
                            type="button"
                            onClick={simulatePayment}
                            disabled={processing}
                            className="mt-5 w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing
                                ? "Processing..."
                                : "Simulate Successful Payment (Testing Only)"}
                        </button>

                        <p className="mt-2 text-center text-xs text-yellow-700 dark:text-yellow-400">
                            Testing only. Do not use this button for real production payments.
                        </p>
                    </div>
                )}

                {/* PLAN INTRO */}
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                        Choose Your Plan
                    </h2>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Bei ni kwa mwezi kwa kila branch.
                    </p>
                </div>

                {/* PLAN CARDS */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                    {plans.map((plan) => {
                        const isSelected = selectedPlan === plan.id;
                        const isCurrentPlan =
                            isActive && subscription?.plan === plan.id;

                        const isPendingThisPlan =
                            subscription?.pending_plan === plan.id;

                        return (
                            <div
                                key={plan.id}
                                className={`relative rounded-3xl border-2 bg-white p-7 shadow-sm transition dark:bg-slate-900 ${
                                    isSelected
                                        ? "border-emerald-500 shadow-xl shadow-emerald-500/10"
                                        : "border-slate-200 dark:border-slate-700"
                                }`}
                            >
                                {plan.popular && (
                                    <span className="absolute right-5 top-5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                                        RECOMMENDED
                                    </span>
                                )}

                                <p className="text-sm font-bold text-emerald-600">
                                    MauzoVibe {plan.name}
                                </p>

                                <h3 className="mt-3 text-2xl font-black text-slate-900 dark:text-white">
                                    {plan.name}
                                </h3>

                                <p className="mt-2 min-h-10 text-sm text-slate-500 dark:text-slate-400">
                                    {plan.description}
                                </p>

                                <div className="mt-5">
                                    <span className="text-3xl font-black text-slate-900 dark:text-white">
                                        TZS {formatMoney(plan.price)}
                                    </span>

                                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                        / mwezi / branch
                                    </p>
                                </div>

                                <div className="my-6 h-px bg-slate-200 dark:bg-slate-700" />

                                <div className="space-y-3">
                                    {plan.features.map((feature) => (
                                        <div
                                            key={feature}
                                            className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300"
                                        >
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-black text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
                                                ✓
                                            </span>

                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {isCurrentPlan && (
                                    <p className="mt-5 rounded-lg bg-green-50 px-3 py-2 text-center text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                        CURRENT PLAN
                                    </p>
                                )}

                                {isPendingThisPlan && (
                                    <p className="mt-2 rounded-lg bg-yellow-50 px-3 py-2 text-center text-xs font-bold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                                        AWAITING PAYMENT
                                    </p>
                                )}

                                <button
                                    type="button"
                                    onClick={() => setSelectedPlan(plan.id)}
                                    className={`mt-6 w-full rounded-xl px-5 py-3 text-sm font-black transition ${
                                        isSelected
                                            ? "bg-emerald-600 text-white"
                                            : "border border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-600 dark:text-slate-200"
                                    }`}
                                >
                                    {isSelected ? "Selected Plan" : "Select Plan"}
                                </button>
                            </div>
                        );
                    })}

                </div>

                {/* SUBSCRIBE ACTION */}
                <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                        Selected plan
                    </p>

                    <h3 className="mt-2 text-center text-xl font-black text-slate-900 dark:text-white">
                        {plans.find((plan) => plan.id === selectedPlan)?.name}
                    </h3>

                    <p className="mt-1 text-center text-2xl font-black text-emerald-600">
                        TZS {formatMoney(
                            plans.find((plan) => plan.id === selectedPlan)?.price
                        )}
                    </p>

                    <p className="mt-1 text-center text-xs text-slate-500 dark:text-slate-400">
                        Per month, per branch
                    </p>

                    <button
                        type="button"
                        onClick={subscribe}
                        disabled={processing || hasPendingPlan}
                        className="mt-6 w-full rounded-xl bg-emerald-600 px-6 py-4 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing
                            ? "Please wait..."
                            : hasPendingPlan
                                ? "Payment Already Pending"
                                : isActive
                                    ? "Continue to Payment"
                                    : "Subscribe Now"}
                    </button>

                    {hasPendingPlan && (
                        <p className="mt-3 text-center text-xs text-yellow-600 dark:text-yellow-400">
                            Una ombi la malipo linalosubiri. Kamilisha au futa ombi hilo kabla ya kuchagua mpango mwingine.
                        </p>
                    )}
                </div>

                {/* ENTERPRISE */}
                <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-700 dark:bg-slate-800/50">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                        Need Enterprise?
                    </h3>

                    <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
                        Kwa biashara kubwa zinazohitaji suluhisho maalumu,
                        matawi mengi au mahitaji ya kipekee, wasiliana nasi
                        kwa bei maalumu.
                    </p>

                    <a
                        href="mailto:mauzovibe@outlook.com"
                        className="mt-4 inline-flex rounded-xl border border-emerald-600 px-6 py-3 text-sm font-bold text-emerald-700 transition hover:bg-emerald-600 hover:text-white dark:text-emerald-400"
                    >
                        Contact Sales
                    </a>
                </div>

                {/* BACK */}
                <div className="mt-8 pb-8 text-center">
                    <Link
                        href={route("dashboard")}
                        className="text-sm font-semibold text-slate-500 transition hover:text-emerald-600"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>

            </div>
        </AdminLayout>
    );
}
