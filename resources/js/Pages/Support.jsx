import { Head } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

import {
    LifebuoyIcon,
    ChatBubbleLeftRightIcon,
    EnvelopeIcon,
    QuestionMarkCircleIcon,
    ClockIcon,
    RocketLaunchIcon,
} from "@heroicons/react/24/outline";

export default function Support() {
    const supportOptions = [
        {
            icon: ChatBubbleLeftRightIcon,
            title: "WhatsApp",
            description:
                "Pata msaada wa haraka kupitia WhatsApp kutoka kwa timu ya MauzoVibe.",
            button: "Chat WhatsApp",
            href: "https://wa.me/255746856656",
            external: true,
        },
        {
            icon: EnvelopeIcon,
            title: "Email Support",
            description:
                "Tuma swali au changamoto yako kupitia email na tutakusaidia.",
            button: "Tuma Email",
            href: "mailto:mauzovibe@outlook.com",
            external: false,
        },
        {
            icon: QuestionMarkCircleIcon,
            title: "FAQ",
            description:
                "Angalia majibu ya maswali yanayoulizwa mara nyingi kuhusu MauzoVibe.",
            button: "Angalia FAQ",
            href: "/faq",
            external: false,
        },
    ];

    return (
        <>
            <Head title="Support | MauzoVibe" />

            <AuthLayout
                title="Msaada wa MauzoVibe 💚"
                subtitle="Tuko tayari kukusaidia kutumia MauzoVibe kwa ufanisi zaidi."
            >

                <div className="w-full max-w-5xl mx-auto">

                    {/* HERO */}

                    <div className="relative overflow-hidden rounded-3xl bg-emerald-600 shadow-2xl shadow-emerald-600/20">

                        <div className="absolute -top-28 -right-28 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

                        <div className="absolute -bottom-28 -left-28 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

                        <div className="relative z-10 p-8 sm:p-10 lg:p-12">

                            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">

                                <LifebuoyIcon className="w-9 h-9 text-white" />

                            </div>

                            <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold text-white">
                                Tunakusaidia kufanikiwa
                            </h2>

                            <p className="mt-4 max-w-2xl text-emerald-50 leading-7">
                                Umekwama kwenye mfumo? Una swali kuhusu
                                account, subscription, branches, POS au
                                matumizi ya MauzoVibe? Timu yetu ipo tayari
                                kukusaidia.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">

                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm">

                                    <ClockIcon className="w-4 h-4" />

                                    Support Available

                                </div>

                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm">

                                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />

                                    MauzoVibe Support Team

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* SUPPORT OPTIONS */}

                    <div className="grid md:grid-cols-3 gap-5 mt-8">

                        {supportOptions.map((option, index) => {

                            const Icon = option.icon;

                            return (
                                <div
                                    key={index}
                                    className="
                                        bg-white
                                        rounded-3xl
                                        border
                                        border-slate-100
                                        shadow-lg
                                        shadow-slate-900/5
                                        p-6
                                        flex
                                        flex-col
                                        hover:-translate-y-1
                                        hover:shadow-xl
                                        transition-all
                                    "
                                >

                                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">

                                        <Icon className="w-6 h-6" />

                                    </div>


                                    <h3 className="mt-5 text-xl font-bold text-slate-900">
                                        {option.title}
                                    </h3>


                                    <p className="mt-3 text-sm text-slate-500 leading-7 flex-1">
                                        {option.description}
                                    </p>


                                    <a
                                        href={option.href}
                                        target={
                                            option.external
                                                ? "_blank"
                                                : undefined
                                        }
                                        rel={
                                            option.external
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                        className="
                                            mt-6
                                            inline-flex
                                            items-center
                                            justify-center
                                            gap-2
                                            w-full
                                            px-5
                                            py-3
                                            rounded-xl
                                            bg-emerald-600
                                            hover:bg-emerald-700
                                            text-white
                                            font-bold
                                            text-sm
                                            transition
                                        "
                                    >
                                        {option.button}
                                    </a>

                                </div>
                            );

                        })}

                    </div>


                    {/* WHATSAPP QUICK CONTACT */}

                    <div className="mt-8 bg-slate-900 rounded-3xl p-7 sm:p-9">

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                            <div>

                                <div className="flex items-center gap-3">

                                    <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center">

                                        <ChatBubbleLeftRightIcon className="w-6 h-6 text-emerald-400" />

                                    </div>

                                    <div>

                                        <h3 className="text-xl font-bold text-white">
                                            WhatsApp Support
                                        </h3>

                                        <p className="text-sm text-slate-400">
                                            +255 746 856 656
                                        </p>

                                    </div>

                                </div>

                                <p className="mt-4 text-slate-300 leading-7 max-w-xl">
                                    Kwa msaada wa haraka kuhusu MauzoVibe,
                                    unaweza kuwasiliana nasi moja kwa moja
                                    kupitia WhatsApp.
                                </p>

                            </div>


                            <a
                                href="https://wa.me/255746856656"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    px-7
                                    py-3.5
                                    rounded-xl
                                    bg-emerald-600
                                    hover:bg-emerald-500
                                    text-white
                                    font-bold
                                    transition
                                    shrink-0
                                "
                            >
                                Fungua WhatsApp

                                <ChatBubbleLeftRightIcon className="w-5 h-5" />

                            </a>

                        </div>

                    </div>


                    {/* GETTING STARTED */}

                    <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-3xl p-7 sm:p-9">

                        <div className="flex flex-col sm:flex-row gap-5">

                            <div className="w-12 h-12 rounded-xl bg-white text-emerald-600 flex items-center justify-center shadow-sm shrink-0">

                                <RocketLaunchIcon className="w-6 h-6" />

                            </div>

                            <div>

                                <h3 className="text-xl font-bold text-slate-900">
                                    Unaanza kutumia MauzoVibe?
                                </h3>

                                <p className="mt-2 text-slate-500 leading-7">
                                    Anza kwa kutengeneza account yako,
                                    ongeza taarifa za biashara, tengeneza
                                    branch yako na anza kusimamia mauzo,
                                    bidhaa na stock.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* CONTACT DETAILS */}

                    <div className="mt-8 text-center">

                        <p className="text-sm text-slate-400">
                            Email
                        </p>

                        <a
                            href="mailto:mauzovibe@outlook.com"
                            className="mt-1 inline-block text-emerald-600 font-semibold hover:text-emerald-700"
                        >
                            mauzovibe@outlook.com
                        </a>

                        <p className="mt-4 text-xs text-slate-400">
                            MauzoVibe — Rahisisha biashara yako, ongeza mauzo.
                        </p>

                    </div>

                </div>

            </AuthLayout>
        </>
    );
}