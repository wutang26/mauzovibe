
import { Head, Link } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

import {
    CheckCircleIcon,
    RocketLaunchIcon,
    BuildingStorefrontIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";

export default function Pricing() {
    const plans = [
        {
            name: "Free Trial",
            description: "Jaribu MauzoVibe bila malipo kabla ya kuchagua mpango.",
            price: "BURE",
            period: "kwa siku 14",
            icon: RocketLaunchIcon,

            features: [
                "Dashboard",
                "POS & Mauzo",
                "Product Management",
                "Stock Management",
                "Customer Management",
                "Basic Reports",
                "Branch 1",
                "Access to core features",
            ],

            button: "Anza Free Trial",
            popular: false,
            type: "trial",
        },

        {
            name: "Starter",
            description: "Kwa biashara ndogo zinazohitaji kusimamia mauzo na bidhaa.",
            price: "15,000",
            period: "kwa mwezi / kwa kila tawi",
            icon: BuildingStorefrontIcon,

            features: [
                "POS & Mauzo",
                "Inventory Management",
                "Customer Management",
                "Sales Reports",
                "Stock Reports",
                "User Management",
                "Branch 1",
                "Regular Support",
            ],

            button: "Anza na Starter",
            popular: false,
            type: "paid",
        },

        {
            name: "Business",
            description: "Kwa biashara zinazokua na kusimamia matawi mengi.",
            price: "20,000",
            period: "kwa mwezi / kwa kila tawi",
            icon: SparklesIcon,

            features: [
                "Kila kitu kwenye Starter",
                "Multiple Branches",
                "Multiple Users",
                "Advanced Reports",
                "Profit Reports",
                "Credit Sales",
                "Debtor Management",
                "Payment History",
                "Priority Support",
            ],

            button: "Anza na Business",
            popular: true,
            type: "paid",
        },

        {
            name: "Enterprise",
            description: "Kwa biashara kubwa zenye mahitaji maalumu.",
            price: "Wasiliana Nasi",
            period: "kwa bei maalumu",
            icon: BuildingStorefrontIcon,

            features: [
                "Kila kitu kwenye Business",
                "Custom Branch Management",
                "Advanced Business Reports",
                "Custom Business Setup",
                "Dedicated Support",
                "Custom Integrations",
                "Business Consultation",
            ],

            button: "Wasiliana Nasi",
            popular: false,
            type: "enterprise",
        },
    ];

    return (
        <>
            <Head title="Pricing | MauzoVibe" />

            <AuthLayout
                title="Bei za MauzoVibe 💚"
                subtitle="Chagua mpango unaofaa kwa biashara yako."
            >
                <div className="mx-auto w-full max-w-6xl">

                    {/* INTRO */}
                    <div className="mx-auto mb-8 max-w-xl text-center">

                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">

                            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-600" />

                            Simple & Transparent Pricing

                        </div>

                        <h2 className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                            Chagua mpango wako
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Anza na Free Trial ya siku 14 bila malipo.
                            Baada ya hapo, chagua mpango unaolingana
                            na mahitaji ya biashara yako.
                        </p>

                    </div>

                    {/* PRICING CARDS */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        {plans.map((plan) => {
                            const Icon = plan.icon;

                            return (
                                <div
                                    key={plan.name}
                                    className={
                                        plan.popular
                                            ? "relative flex flex-col overflow-hidden rounded-2xl border-2 border-emerald-500 bg-white shadow-xl shadow-emerald-600/10 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl"
                                            : "relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-900/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                                    }
                                >

                                    {/* POPULAR BADGE */}
                                    {plan.popular && (
                                        <div className="absolute left-0 right-0 top-0 bg-emerald-600 py-1.5 text-center text-[10px] font-extrabold tracking-wide text-white">
                                            ★ MOST POPULAR
                                        </div>
                                    )}

                                    <div className={plan.popular ? "p-5 pt-10" : "p-5"}>

                                        {/* ICON */}
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        {/* PLAN NAME */}
                                        <h3 className="mt-4 text-lg font-extrabold text-slate-900">
                                            {plan.name}
                                        </h3>

                                        {/* DESCRIPTION */}
                                        <p className="mt-1.5 min-h-[60px] text-xs leading-5 text-slate-500">
                                            {plan.description}
                                        </p>

                                        {/* PRICE */}
                                        <div className="mt-5">

                                            {plan.type === "enterprise" ? (
                                                <h4 className="text-xl font-extrabold text-slate-900">
                                                    {plan.price}
                                                </h4>
                                            ) : plan.type === "trial" ? (
                                                <h4 className="text-3xl font-extrabold text-emerald-600">
                                                    {plan.price}
                                                </h4>
                                            ) : (
                                                <div className="flex items-end gap-1">

                                                    <span className="pb-1 text-xs font-semibold text-slate-500">
                                                        TZS
                                                    </span>

                                                    <span className="text-3xl font-extrabold text-slate-900">
                                                        {plan.price}
                                                    </span>

                                                </div>
                                            )}

                                            <p className="mt-1 text-[11px] text-slate-400">
                                                {plan.period}
                                            </p>

                                        </div>

                                        {/* BUTTON */}
                                        {plan.type === "enterprise" ? (
                                            <a
                                                href="mailto:mauzovibe@outlook.com?subject=MauzoVibe%20Enterprise%20Inquiry"
                                                className="mt-5 flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-slate-100 text-xs font-bold text-slate-800 transition-all hover:bg-emerald-600 hover:text-white"
                                            >
                                                {plan.button}

                                                <svg
                                                    className="h-3.5 w-3.5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M5 12h14M13 6l6 6-6 6"
                                                    />
                                                </svg>
                                            </a>
                                        ) : (
                                            <Link
                                                href={route("register")}
                                                className={
                                                    plan.popular
                                                        ? "mt-5 flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-600 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700"
                                                        : "mt-5 flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-slate-100 text-xs font-bold text-slate-800 transition-all hover:bg-emerald-600 hover:text-white"
                                                }
                                            >
                                                {plan.button}

                                                <svg
                                                    className="h-3.5 w-3.5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M5 12h14M13 6l6 6-6 6"
                                                    />
                                                </svg>
                                            </Link>
                                        )}

                                        {/* DIVIDER */}
                                        <div className="my-5 border-t border-slate-100" />

                                        {/* FEATURES TITLE */}
                                        <p className="mb-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                                            Kinachopatikana
                                        </p>

                                        {/* FEATURES */}
                                        <div className="space-y-2.5">

                                            {plan.features.map((feature) => (
                                                <div
                                                    key={feature}
                                                    className="flex items-start gap-2"
                                                >
                                                    <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />

                                                    <span className="text-xs leading-4 text-slate-600">
                                                        {feature}
                                                    </span>
                                                </div>
                                            ))}

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                    {/* CTA BANNER */}
                    <div className="relative mt-8 overflow-hidden rounded-2xl bg-emerald-600 shadow-xl shadow-emerald-600/15">

                        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

                        <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

                        <div className="relative z-10 p-6 text-center sm:p-8">

                            <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                                <RocketLaunchIcon className="h-5 w-5 text-white" />
                            </div>

                            <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                                Tayari kuanza?
                            </h2>

                            <p className="mx-auto mt-1.5 max-w-lg text-sm leading-6 text-emerald-50">
                                Anza kutumia MauzoVibe kwa siku 14 bila
                                malipo na ujionee jinsi inavyoweza
                                kurahisisha biashara yako.
                            </p>

                            <Link
                                href={route("register")}
                                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-bold text-emerald-700 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                            >
                                Anza Free Trial

                                <RocketLaunchIcon className="h-4 w-4" />
                            </Link>

                        </div>

                    </div>

                    {/* NOTE */}
                    <p className="mb-2 mt-4 text-center text-[11px] text-slate-400">
                        Free Trial ni ya siku 14. Hakuna malipo yanayohitajika kuanza.
                    </p>

                    <p className="mb-6 text-center text-[11px] text-slate-400">
                        Bei za Starter na Business zinatozwa kwa mwezi kwa kila branch.
                    </p>

                </div>
            </AuthLayout>
        </>
    );
}
