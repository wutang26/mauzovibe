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
            description: "Jaribu MauzoVibe bila malipo.",
            price: "BURE",
            period: "kwa siku 30",
            icon: RocketLaunchIcon,

            features: [
                "Dashboard",
                "POS & Mauzo",
                "Product Management",
                "Stock Management",
                "Customer Management",
                "Basic Reports",
                "Branch 1",
            ],

            button: "Anza Free Trial",
            popular: false,
        },

        {
            name: "Starter",
            description: "Kwa biashara ndogo zinazoanza kukua.",
            price: "10,000",
            period: "kwa mwezi",
            icon: BuildingStorefrontIcon,

            features: [
                "POS & Mauzo",
                "Inventory Management",
                "Customer Management",
                "Sales Reports",
                "Stock Reports",
                "User Management",
                "Branch 1",
                "Support",
            ],

            button: "Chagua Starter",
            popular: false,
        },

        {
            name: "Business",
            description: "Kwa biashara zinazokua na matawi.",
            price: "10,000",
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

            button: "Chagua Business",
            popular: true,
        },

        {
            name: "Enterprise",
            description: "Kwa biashara kubwa na mahitaji maalum.",
            price: "Wasiliana Nasi",
            period: "kwa bei maalum",
            icon: BuildingStorefrontIcon,

            features: [
                "Kila kitu kwenye Business",
                "Unlimited Branches",
                "Unlimited Users",
                "Advanced Business Reports",
                "Custom Business Setup",
                "Dedicated Support",
                "Custom Integrations",
                "Business Consultation",
            ],

            button: "Wasiliana Nasi",
            popular: false,
        },
    ];

    return (
        <>
            <Head title="Pricing | MauzoVibe" />

            <AuthLayout
                title="Bei za MauzoVibe 💚"
                subtitle="Chagua mpango unaofaa kwa biashara yako."
            >
                <div className="w-full max-w-6xl mx-auto">

                    {/* =====================================================
                        INTRO
                    ====================================================== */}

                    <div className="text-center max-w-xl mx-auto mb-8">

                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold">

                            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>

                            Simple & Transparent Pricing

                        </div>

                        <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900">
                            Chagua mpango wako
                        </h2>

                        <p className="mt-2 text-sm text-slate-500 leading-6">
                            Anza na Free Trial ya siku 30 bila malipo.
                            Badilisha mpango wako kulingana na mahitaji ya biashara yako.
                        </p>

                    </div>


                    {/* =====================================================
                        PRICING CARDS
                    ====================================================== */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                        {plans.map((plan, index) => {
                            const Icon = plan.icon;

                            return (
                                <div
                                    key={index}
                                    className={
                                        plan.popular
                                            ? "relative flex flex-col bg-white rounded-2xl border-2 border-emerald-500 shadow-xl shadow-emerald-600/10 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl"
                                            : "relative flex flex-col bg-white rounded-2xl border border-slate-200 shadow-md shadow-slate-900/5 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                                    }
                                >

                                    {/* =====================================================
                                        POPULAR BADGE
                                    ====================================================== */}

                                    {plan.popular && (
                                        <div className="absolute top-0 left-0 right-0 bg-emerald-600 text-white text-[10px] font-extrabold tracking-wide text-center py-1.5">
                                            ★ MOST POPULAR
                                        </div>
                                    )}


                                    <div
                                        className={
                                            plan.popular
                                                ? "p-5 pt-10"
                                                : "p-5"
                                        }
                                    >

                                        {/* =====================================================
                                            ICON
                                        ====================================================== */}

                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">

                                            <Icon className="w-5 h-5" />

                                        </div>


                                        {/* =====================================================
                                            PLAN NAME
                                        ====================================================== */}

                                        <h3 className="mt-4 text-lg font-extrabold text-slate-900">
                                            {plan.name}
                                        </h3>


                                        {/* DESCRIPTION */}

                                        <p className="mt-1.5 text-xs text-slate-500 leading-5 min-h-[40px]">
                                            {plan.description}
                                        </p>


                                        {/* =====================================================
                                            PRICE
                                        ====================================================== */}

                                        <div className="mt-5">

                                            {plan.price === "Wasiliana Nasi" ? (

                                                <h4 className="text-xl font-extrabold text-slate-900">
                                                    {plan.price}
                                                </h4>

                                            ) : plan.price === "BURE" ? (

                                                <h4 className="text-3xl font-extrabold text-emerald-600">
                                                    {plan.price}
                                                </h4>

                                            ) : (

                                                <div className="flex items-end gap-1">

                                                    <span className="text-xs font-semibold text-slate-500 pb-1">
                                                        TZS
                                                    </span>

                                                    <span className="text-3xl font-extrabold text-slate-900">
                                                        {plan.price}
                                                    </span>

                                                </div>

                                            )}

                                            <p className="mt-0.5 text-[11px] text-slate-400">
                                                {plan.period}
                                            </p>

                                        </div>


                                        {/* =====================================================
                                            BUTTON
                                        ====================================================== */}

                                        <Link
                                            href={route("register")}
                                            className={
                                                plan.popular
                                                    ? "mt-5 w-full h-10 rounded-lg flex items-center justify-center gap-1.5 font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all"
                                                    : "mt-5 w-full h-10 rounded-lg flex items-center justify-center gap-1.5 font-bold text-xs bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 transition-all"
                                            }
                                        >
                                            {plan.button}

                                            <svg
                                                className="w-3.5 h-3.5"
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


                                        {/* =====================================================
                                            DIVIDER
                                        ====================================================== */}

                                        <div className="my-5 border-t border-slate-100"></div>


                                        {/* =====================================================
                                            FEATURES TITLE
                                        ====================================================== */}

                                        <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mb-3">
                                            Kinachopatikana
                                        </p>


                                        {/* =====================================================
                                            FEATURES
                                        ====================================================== */}

                                        <div className="space-y-2.5">

                                            {plan.features.map(
                                                (feature, featureIndex) => (

                                                    <div
                                                        key={featureIndex}
                                                        className="flex items-start gap-2"
                                                    >

                                                        <CheckCircleIcon
                                                            className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"
                                                        />

                                                        <span className="text-xs text-slate-600 leading-4">
                                                            {feature}
                                                        </span>

                                                    </div>

                                                )
                                            )}

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>


                    {/* =====================================================
                        CTA BANNER
                    ====================================================== */}

                    <div className="relative overflow-hidden mt-8 rounded-2xl bg-emerald-600 shadow-xl shadow-emerald-600/15">

                        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-2xl"></div>

                        <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-white/5 blur-3xl"></div>


                        <div className="relative z-10 p-6 sm:p-8 text-center">

                            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 border border-white/20 mb-3">

                                <RocketLaunchIcon className="w-5 h-5 text-white" />

                            </div>


                            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                                Tayari kuanza?
                            </h2>


                            <p className="mt-1.5 text-sm text-emerald-50 max-w-lg mx-auto leading-6">
                                Anza kutumia MauzoVibe kwa siku 30 bila
                                malipo na ujionee jinsi inavyoweza
                                kurahisisha biashara yako.
                            </p>


                            <Link
                                href={route("register")}
                                className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-lg bg-white text-emerald-700 text-sm font-bold shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all"
                            >
                                Anza Free Trial

                                <RocketLaunchIcon className="w-4 h-4" />

                            </Link>

                        </div>

                    </div>


                    {/* =====================================================
                        NOTE
                    ====================================================== */}

                    <p className="text-center text-[11px] text-slate-400 mt-4 mb-2">
                        Hakuna kadi ya benki inayohitajika kuanza Free Trial.
                    </p>

                </div>
            </AuthLayout>
        </>
    );
}