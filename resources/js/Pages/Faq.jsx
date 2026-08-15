import { Head } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

import {
    QuestionMarkCircleIcon,
    ChevronDownIcon,
    ChatBubbleLeftRightIcon,
    EnvelopeIcon,
} from "@heroicons/react/24/outline";

import { useState } from "react";

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "MauzoVibe ni nini?",
            answer:
                "MauzoVibe ni mfumo wa kisasa wa kusimamia biashara unaokusaidia kudhibiti mauzo, bidhaa, stock, wateja, watumiaji, matawi na reports kutoka sehemu moja.",
        },
        {
            question: "Je, naweza kujaribu MauzoVibe bila kulipa?",
            answer:
                "Ndiyo. MauzoVibe inakupa Free Trial ya siku 30 bila malipo ili uweze kujaribu mfumo na kuona namna unavyoweza kurahisisha uendeshaji wa biashara yako.",
        },
        {
            question: "Baada ya Free Trial kuisha nini hutokea?",
            answer:
                "Baada ya siku 30, unaweza kuchagua mpango unaokufaa na kuendelea kutumia MauzoVibe. Unaweza kuangalia mipango na bei kwenye ukurasa wetu wa Pricing.",
        },
        {
            question: "Je, MauzoVibe inafaa kwa biashara gani?",
            answer:
                "MauzoVibe inaweza kutumika na maduka, supermarkets, pharmacies, hardware, boutiques, salons, electronics shops na biashara nyingine zinazohitaji kusimamia bidhaa na mauzo.",
        },
        {
            question: "Je, ninaweza kuwa na branches zaidi ya moja?",
            answer:
                "Ndiyo. Mpango wa Business unakuwezesha kusimamia biashara yenye branches nyingi. Kila branch inaweza kuwa na watumiaji na taarifa zake huku ukiendelea kusimamia biashara yako kutoka sehemu moja.",
        },
        {
            question: "Bei ya Business ni kiasi gani?",
            answer:
                "Mpango wa Business unaanzia TZS 10,000 kwa mwezi kwa kila branch. Hii inakupa uwezo wa kutumia features za juu pamoja na kusimamia branches na users.",
        },
        {
            question: "Je, naweza kuongeza users kwenye biashara yangu?",
            answer:
                "Ndiyo. Unaweza kuongeza users kulingana na mahitaji ya biashara yako. Unaweza pia kuwapa roles na permissions kulingana na majukumu yao.",
        },
        {
            question: "Je, MauzoVibe inaweza kusimamia stock?",
            answer:
                "Ndiyo. Unaweza kuongeza bidhaa, kusimamia stock, kufanya stock-in, kufuatilia bidhaa na kuona taarifa za inventory.",
        },
        {
            question: "Je, ninaweza kuona reports za biashara?",
            answer:
                "Ndiyo. MauzoVibe inatoa reports zinazokusaidia kufuatilia sales, revenue, profit, stock na taarifa nyingine muhimu za biashara.",
        },
        {
            question: "Je, data yangu inalindwa?",
            answer:
                "Ndiyo. MauzoVibe imeundwa kwa kuzingatia usalama wa data na access control ili kuhakikisha taarifa za biashara zinaonekana kwa watumiaji wenye ruhusa.",
        },
        {
            question: "Ninawezaje kuanza kutumia MauzoVibe?",
            answer:
                "Bonyeza 'Start Free Trial', tengeneza akaunti yako, weka taarifa za biashara yako na anza kutumia MauzoVibe.",
        },
        {
            question: "Ninaweza kupata support nikikwama?",
            answer:
                "Ndiyo. Unaweza kuwasiliana na MauzoVibe kwa msaada kuhusu mfumo, account yako au matumizi ya features mbalimbali.",
        },
    ];

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <Head title="FAQ | MauzoVibe" />

            <AuthLayout
                title="Maswali Yanayoulizwa Mara kwa Mara 💚"
                subtitle="Pata majibu ya maswali muhimu kuhusu MauzoVibe, bei, branches na matumizi ya mfumo."
            >
                <div className="w-full max-w-6xl mx-auto">

                    {/* =====================================================
                        INTRO
                    ====================================================== */}

                    <div className="text-center max-w-2xl mx-auto mb-10">

                        <div className="
                            inline-flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-full
                            bg-emerald-50
                            border
                            border-emerald-100
                            text-emerald-700
                            text-sm
                            font-semibold
                        ">
                            <QuestionMarkCircleIcon className="w-5 h-5" />

                            Frequently Asked Questions
                        </div>

                        <h2 className="
                            mt-5
                            text-3xl
                            sm:text-4xl
                            font-extrabold
                            text-slate-900
                        ">
                            Una swali kuhusu MauzoVibe?
                        </h2>

                        <p className="
                            mt-3
                            text-slate-500
                            leading-7
                        ">
                            Tumekusanya majibu ya maswali yanayoulizwa
                            mara nyingi ili kukusaidia kuelewa MauzoVibe
                            kwa urahisi.
                        </p>

                    </div>


                    {/* =====================================================
                        FAQ CARDS - LEFT & RIGHT
                    ====================================================== */}

                    <div className="
                        grid
                        grid-cols-1
                        lg:grid-cols-2
                        gap-5
                        items-start
                    ">

                        {/* LEFT CARD */}

                        <div className="
                            bg-white
                            rounded-3xl
                            border
                            border-slate-200
                            shadow-lg
                            shadow-slate-900/5
                            overflow-hidden
                        ">

                            <div className="
                                px-6
                                py-5
                                border-b
                                border-slate-100
                                bg-gradient-to-r
                                from-emerald-50
                                to-white
                            ">

                                <div className="flex items-center gap-3">

                                    <div className="
                                        w-10
                                        h-10
                                        rounded-xl
                                        bg-emerald-600
                                        text-white
                                        flex
                                        items-center
                                        justify-center
                                        shadow-md
                                    ">
                                        <QuestionMarkCircleIcon className="w-5 h-5" />
                                    </div>

                                    <div>
                                        <h3 className="font-extrabold text-slate-900">
                                            Kuhusu MauzoVibe
                                        </h3>

                                        <p className="text-xs text-slate-500 mt-0.5">
                                            Maswali ya msingi
                                        </p>
                                    </div>

                                </div>

                            </div>


                            <div className="p-4">

                                {faqs.slice(0, 6).map((faq, index) => {

                                    const isOpen = openIndex === index;

                                    return (
                                        <div
                                            key={index}
                                            className={`
                                                border
                                                rounded-2xl
                                                mb-3
                                                last:mb-0
                                                overflow-hidden
                                                transition-all
                                                duration-200
                                                ${
                                                    isOpen
                                                        ? "border-emerald-300 shadow-md shadow-emerald-600/5"
                                                        : "border-slate-100 hover:border-emerald-200"
                                                }
                                            `}
                                        >

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toggleFaq(index)
                                                }
                                                className="
                                                    w-full
                                                    flex
                                                    items-center
                                                    justify-between
                                                    gap-4
                                                    text-left
                                                    px-4
                                                    py-4
                                                "
                                            >

                                                <div className="flex items-center gap-3">

                                                    <div className={`
                                                        w-8
                                                        h-8
                                                        rounded-lg
                                                        flex
                                                        items-center
                                                        justify-center
                                                        shrink-0
                                                        ${
                                                            isOpen
                                                                ? "bg-emerald-600 text-white"
                                                                : "bg-emerald-50 text-emerald-600"
                                                        }
                                                    `}>
                                                        <QuestionMarkCircleIcon className="w-4 h-4" />
                                                    </div>

                                                    <span className="
                                                        text-sm
                                                        font-bold
                                                        text-slate-800
                                                    ">
                                                        {faq.question}
                                                    </span>

                                                </div>


                                                <ChevronDownIcon
                                                    className={`
                                                        w-5
                                                        h-5
                                                        shrink-0
                                                        transition-transform
                                                        duration-200
                                                        ${
                                                            isOpen
                                                                ? "rotate-180 text-emerald-600"
                                                                : "text-slate-400"
                                                        }
                                                    `}
                                                />

                                            </button>


                                            {isOpen && (
                                                <div className="
                                                    px-4
                                                    pb-5
                                                    pl-15
                                                ">
                                                    <p className="
                                                        text-sm
                                                        text-slate-600
                                                        leading-6
                                                    ">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            )}

                                        </div>
                                    );
                                })}

                            </div>

                        </div>


                        {/* RIGHT CARD */}

                        <div className="
                            bg-white
                            rounded-3xl
                            border
                            border-slate-200
                            shadow-lg
                            shadow-slate-900/5
                            overflow-hidden
                        ">

                            <div className="
                                px-6
                                py-5
                                border-b
                                border-slate-100
                                bg-gradient-to-r
                                from-blue-50
                                to-white
                            ">

                                <div className="flex items-center gap-3">

                                    <div className="
                                        w-10
                                        h-10
                                        rounded-xl
                                        bg-blue-600
                                        text-white
                                        flex
                                        items-center
                                        justify-center
                                        shadow-md
                                    ">
                                        <QuestionMarkCircleIcon className="w-5 h-5" />
                                    </div>

                                    <div>
                                        <h3 className="font-extrabold text-slate-900">
                                            Matumizi & Support
                                        </h3>

                                        <p className="text-xs text-slate-500 mt-0.5">
                                            Maswali ya matumizi ya mfumo
                                        </p>
                                    </div>

                                </div>

                            </div>


                            <div className="p-4">

                                {faqs.slice(6).map((faq, index) => {

                                    const actualIndex = index + 6;

                                    const isOpen =
                                        openIndex === actualIndex;

                                    return (
                                        <div
                                            key={actualIndex}
                                            className={`
                                                border
                                                rounded-2xl
                                                mb-3
                                                last:mb-0
                                                overflow-hidden
                                                transition-all
                                                duration-200
                                                ${
                                                    isOpen
                                                        ? "border-emerald-300 shadow-md shadow-emerald-600/5"
                                                        : "border-slate-100 hover:border-emerald-200"
                                                }
                                            `}
                                        >

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toggleFaq(actualIndex)
                                                }
                                                className="
                                                    w-full
                                                    flex
                                                    items-center
                                                    justify-between
                                                    gap-4
                                                    text-left
                                                    px-4
                                                    py-4
                                                "
                                            >

                                                <div className="flex items-center gap-3">

                                                    <div className={`
                                                        w-8
                                                        h-8
                                                        rounded-lg
                                                        flex
                                                        items-center
                                                        justify-center
                                                        shrink-0
                                                        ${
                                                            isOpen
                                                                ? "bg-emerald-600 text-white"
                                                                : "bg-emerald-50 text-emerald-600"
                                                        }
                                                    `}>
                                                        <QuestionMarkCircleIcon className="w-4 h-4" />
                                                    </div>

                                                    <span className="
                                                        text-sm
                                                        font-bold
                                                        text-slate-800
                                                    ">
                                                        {faq.question}
                                                    </span>

                                                </div>


                                                <ChevronDownIcon
                                                    className={`
                                                        w-5
                                                        h-5
                                                        shrink-0
                                                        transition-transform
                                                        duration-200
                                                        ${
                                                            isOpen
                                                                ? "rotate-180 text-emerald-600"
                                                                : "text-slate-400"
                                                        }
                                                    `}
                                                />

                                            </button>


                                            {isOpen && (
                                                <div className="px-4 pb-5">

                                                    <p className="
                                                        text-sm
                                                        text-slate-600
                                                        leading-6
                                                        pl-11
                                                    ">
                                                        {faq.answer}
                                                    </p>

                                                </div>
                                            )}

                                        </div>
                                    );
                                })}

                            </div>

                        </div>

                    </div>


                    {/* =====================================================
                        CONTACT CARD
                    ====================================================== */}

                    <div className="
                        relative
                        overflow-hidden
                        mt-10
                        rounded-3xl
                        bg-emerald-600
                        shadow-2xl
                        shadow-emerald-600/20
                    ">

                        <div className="
                            absolute
                            -top-24
                            -right-24
                            w-72
                            h-72
                            rounded-full
                            bg-white/10
                            blur-3xl
                        " />

                        <div className="
                            absolute
                            -bottom-24
                            -left-24
                            w-72
                            h-72
                            rounded-full
                            bg-white/5
                            blur-3xl
                        " />


                        <div className="
                            relative
                            z-10
                            p-8
                            sm:p-10
                            text-center
                        ">

                            <div className="
                                inline-flex
                                items-center
                                justify-center
                                w-14
                                h-14
                                rounded-2xl
                                bg-white/10
                                border
                                border-white/20
                                mb-5
                            ">
                                <ChatBubbleLeftRightIcon className="w-7 h-7 text-white" />
                            </div>


                            <h2 className="
                                text-2xl
                                sm:text-3xl
                                font-extrabold
                                text-white
                            ">
                                Bado una swali?
                            </h2>


                            <p className="
                                mt-2
                                text-emerald-50
                                max-w-xl
                                mx-auto
                                leading-7
                            ">
                                Timu ya MauzoVibe iko tayari kukusaidia.
                                Wasiliana nasi kupitia WhatsApp au Email.
                            </p>


                            {/* CONTACT BUTTONS */}

                            <div className="
                                flex
                                flex-col
                                sm:flex-row
                                items-center
                                justify-center
                                gap-3
                                mt-6
                            ">

                                {/* WHATSAPP */}

                                <a
                                    href="https://wa.me/255746856656"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        w-full
                                        sm:w-auto
                                        px-6
                                        py-3.5
                                        rounded-xl
                                        bg-white
                                        text-emerald-700
                                        font-bold
                                        shadow-lg
                                        hover:-translate-y-0.5
                                        hover:shadow-xl
                                        transition-all
                                    "
                                >
                                    <ChatBubbleLeftRightIcon className="w-5 h-5" />

                                    WhatsApp
                                </a>


                                {/* EMAIL */}

                                <a
                                    href="mailto:mauzovibe@outlook.com"
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        w-full
                                        sm:w-auto
                                        px-6
                                        py-3.5
                                        rounded-xl
                                        bg-white/10
                                        border
                                        border-white/30
                                        text-white
                                        font-bold
                                        hover:bg-white/20
                                        transition-all
                                    "
                                >
                                    <EnvelopeIcon className="w-5 h-5" />

                                    Email Support
                                </a>

                            </div>


                            <p className="
                                mt-5
                                text-sm
                                text-emerald-100
                            ">
                                WhatsApp: +255 746 856 656
                            </p>

                        </div>

                    </div>


                    <p className="
                        text-center
                        text-xs
                        text-slate-400
                        mt-6
                    ">
                        MauzoVibe — Rahisisha biashara yako, ongeza mauzo.
                    </p>

                </div>
            </AuthLayout>
        </>
    );
}