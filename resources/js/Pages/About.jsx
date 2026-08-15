import { Head, Link } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

import {
    ChartBarIcon,
    CubeIcon,
    UsersIcon,
    BuildingStorefrontIcon,
    CheckCircleIcon,
    RocketLaunchIcon,
} from "@heroicons/react/24/outline";

export default function About() {
    return (
        <>
            <Head title="About Us | MauzoVibe" />

            <AuthLayout
                title="Kuhusu MauzoVibe 💚"
                subtitle="Teknolojia rahisi na yenye nguvu kwa ajili ya kusimamia biashara yako."
            >

                {/* =====================================================
                    HERO
                ====================================================== */}

                <section className="w-full max-w-5xl mx-auto">

                    <div
                        className="
                            relative
                            overflow-hidden
                            rounded-3xl
                            bg-emerald-600
                            shadow-2xl
                            shadow-emerald-600/20
                        "
                    >

                        {/* BACKGROUND DECORATIONS */}

                        <div
                            className="
                                absolute
                                -top-28
                                -right-28
                                w-80
                                h-80
                                rounded-full
                                bg-white/10
                                blur-3xl
                            "
                        />

                        <div
                            className="
                                absolute
                                -bottom-32
                                -left-24
                                w-80
                                h-80
                                rounded-full
                                bg-white/10
                                blur-3xl
                            "
                        />

                        <div className="relative z-10">

                            <div
                                className="
                                    grid
                                    lg:grid-cols-[1.15fr_0.85fr]
                                    gap-8
                                    lg:gap-10
                                    items-center
                                    px-7
                                    py-10
                                    sm:px-10
                                    sm:py-12
                                    lg:px-12
                                    lg:py-14
                                "
                            >

                                {/* =================================================
                                    LEFT CONTENT
                                ================================================== */}

                                <div>

                                    {/* BADGE */}

                                    <span
                                        className="
                                            inline-flex
                                            items-center
                                            gap-2
                                            px-4
                                            py-2
                                            rounded-full
                                            bg-white/10
                                            border
                                            border-white/20
                                            text-white
                                            text-sm
                                            font-semibold
                                        "
                                    >

                                        <span
                                            className="
                                                w-2
                                                h-2
                                                rounded-full
                                                bg-white
                                                animate-pulse
                                            "
                                        />

                                        Karibu MauzoVibe

                                    </span>


                                    {/* TITLE */}

                                    <h2
                                        className="
                                            mt-6
                                            text-3xl
                                            sm:text-4xl
                                            lg:text-[42px]
                                            font-extrabold
                                            text-white
                                            leading-[1.12]
                                        "
                                    >
                                        Tunasaidia biashara

                                        <span className="block text-emerald-100">
                                            kukua kwa teknolojia.
                                        </span>

                                    </h2>


                                    {/* DESCRIPTION */}

                                    <p
                                        className="
                                            mt-5
                                            text-emerald-50
                                            text-base
                                            sm:text-lg
                                            leading-7
                                            max-w-lg
                                        "
                                    >
                                        MauzoVibe ni mfumo wa kisasa wa
                                        kusimamia mauzo, bidhaa, stock,
                                        wateja na matawi ya biashara yako
                                        sehemu moja.
                                    </p>


                                    {/* BUTTONS */}

                                    <div className="mt-8 flex flex-wrap gap-3">

                                        <Link
                                            href={route("register")}
                                            className="
                                                inline-flex
                                                items-center
                                                justify-center
                                                gap-2
                                                px-6
                                                py-3
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
                                            Anza Bure

                                            <RocketLaunchIcon className="w-5 h-5" />
                                        </Link>


                                        <Link
                                            href={route("pricing")}
                                            className="
                                                inline-flex
                                                items-center
                                                justify-center
                                                px-6
                                                py-3
                                                rounded-xl
                                                border
                                                border-white/30
                                                text-white
                                                font-semibold
                                                hover:bg-white/10
                                                transition-all
                                            "
                                        >
                                            Angalia Bei
                                        </Link>

                                    </div>

                                </div>


                                {/* =================================================
                                    RIGHT VISUAL
                                ================================================== */}

                                <div className="hidden lg:flex justify-center">

                                    <div className="relative w-64 h-64 xl:w-72 xl:h-72">

                                        {/* Rotated background */}

                                        <div
                                            className="
                                                absolute
                                                inset-0
                                                rounded-[2.5rem]
                                                bg-white/10
                                                rotate-6
                                            "
                                        />


                                        {/* Main card */}

                                        <div
                                            className="
                                                absolute
                                                inset-4
                                                rounded-[2rem]
                                                bg-white
                                                shadow-2xl
                                                flex
                                                items-center
                                                justify-center
                                            "
                                        >

                                            <div className="text-center px-5">

                                                {/* ICON */}

                                                <div
                                                    className="
                                                        mx-auto
                                                        w-20
                                                        h-20
                                                        rounded-2xl
                                                        bg-emerald-50
                                                        border
                                                        border-emerald-100
                                                        flex
                                                        items-center
                                                        justify-center
                                                    "
                                                >

                                                    <BuildingStorefrontIcon
                                                        className="
                                                            w-11
                                                            h-11
                                                            text-emerald-600
                                                        "
                                                    />

                                                </div>


                                                {/* BRAND */}

                                                <h3
                                                    className="
                                                        mt-5
                                                        text-2xl
                                                        font-extrabold
                                                        text-slate-900
                                                    "
                                                >
                                                    Mauzo
                                                    <span className="text-emerald-600">
                                                        Vibe
                                                    </span>
                                                </h3>


                                                <p className="mt-2 text-sm text-slate-500">
                                                    Business Management
                                                </p>


                                                {/* SMALL STATUS */}

                                                <div
                                                    className="
                                                        mt-4
                                                        inline-flex
                                                        items-center
                                                        gap-2
                                                        px-3
                                                        py-1.5
                                                        rounded-full
                                                        bg-emerald-50
                                                        text-emerald-700
                                                        text-xs
                                                        font-semibold
                                                    "
                                                >

                                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />

                                                    Smart Business

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =====================================================
                        WHO WE ARE
                    ====================================================== */}

                    <div className="grid lg:grid-cols-2 gap-6 mt-8">

                        {/* LEFT CARD */}

                        <div
                            className="
                                bg-white
                                rounded-3xl
                                border
                                border-slate-100
                                shadow-xl
                                shadow-slate-900/5
                                p-7
                                sm:p-8
                            "
                        >

                            <div
                                className="
                                    w-12
                                    h-12
                                    rounded-xl
                                    bg-emerald-50
                                    text-emerald-600
                                    flex
                                    items-center
                                    justify-center
                                    mb-5
                                "
                            >

                                <BuildingStorefrontIcon className="w-6 h-6" />

                            </div>


                            <h3 className="text-2xl font-bold text-slate-900">
                                Sisi ni nani?
                            </h3>


                            <p className="mt-4 text-slate-500 leading-7">
                                MauzoVibe ni mfumo uliotengenezwa kusaidia
                                wafanyabiashara kurahisisha usimamizi wa
                                biashara zao bila kutegemea mifumo migumu
                                au isiyo rafiki kwa biashara ndogo na za kati.
                            </p>


                            <p className="mt-4 text-slate-500 leading-7">
                                Tunachanganya teknolojia, urahisi wa matumizi
                                na taarifa muhimu za biashara ili kukusaidia
                                kufanya maamuzi bora kila siku.
                            </p>

                        </div>


                        {/* RIGHT CARD */}

                        <div
                            className="
                                bg-slate-900
                                rounded-3xl
                                shadow-xl
                                p-7
                                sm:p-8
                                text-white
                            "
                        >

                            <div
                                className="
                                    w-12
                                    h-12
                                    rounded-xl
                                    bg-emerald-500/15
                                    text-emerald-400
                                    flex
                                    items-center
                                    justify-center
                                    mb-5
                                "
                            >

                                <RocketLaunchIcon className="w-6 h-6" />

                            </div>


                            <h3 className="text-2xl font-bold">
                                Dira yetu
                            </h3>


                            <p className="mt-4 text-slate-300 leading-7">
                                Kujenga mazingira ambayo kila mfanyabiashara
                                anaweza kutumia teknolojia kusimamia biashara
                                yake kwa urahisi, kupata taarifa sahihi na
                                kuongeza ufanisi.
                            </p>


                            <div className="mt-6 space-y-3">

                                {[
                                    "Rahisisha usimamizi wa biashara",
                                    "Punguza makosa kwenye mauzo na stock",
                                    "Toa taarifa zinazosaidia kufanya maamuzi",
                                    "Kusaidia biashara kukua kwa teknolojia",
                                ].map((item, index) => (

                                    <div
                                        key={index}
                                        className="flex items-center gap-3"
                                    >

                                        <CheckCircleIcon
                                            className="
                                                w-5
                                                h-5
                                                text-emerald-400
                                                shrink-0
                                            "
                                        />

                                        <span className="text-sm text-slate-300">
                                            {item}
                                        </span>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>


                    {/* =====================================================
                        WHAT WE OFFER
                    ====================================================== */}

                    <div className="mt-14 text-center">

                        <span
                            className="
                                inline-flex
                                px-4
                                py-2
                                rounded-full
                                bg-emerald-50
                                border
                                border-emerald-100
                                text-emerald-700
                                text-sm
                                font-semibold
                            "
                        >
                            Tunachokusaidia
                        </span>


                        <h2
                            className="
                                mt-4
                                text-3xl
                                sm:text-4xl
                                font-extrabold
                                text-slate-900
                            "
                        >
                            Kila kitu sehemu moja
                        </h2>


                        <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
                            MauzoVibe imejengwa kwa kuzingatia mahitaji
                            halisi ya biashara za kila siku.
                        </p>

                    </div>


                    {/* FEATURES */}

                    <div
                        className="
                            grid
                            sm:grid-cols-2
                            lg:grid-cols-4
                            gap-5
                            mt-8
                        "
                    >

                        {[
                            {
                                icon: ChartBarIcon,
                                title: "Mauzo",
                                text: "Simamia mauzo yako na fuatilia utendaji wa biashara.",
                            },
                            {
                                icon: CubeIcon,
                                title: "Stock",
                                text: "Jua bidhaa ulizonazo na zinazohitaji kuongezwa.",
                            },
                            {
                                icon: UsersIcon,
                                title: "Wateja",
                                text: "Hifadhi na simamia taarifa za wateja wako.",
                            },
                            {
                                icon: BuildingStorefrontIcon,
                                title: "Matawi",
                                text: "Simamia matawi mengi ya biashara kutoka sehemu moja.",
                            },
                        ].map((feature, index) => {

                            const Icon = feature.icon;

                            return (
                                <div
                                    key={index}
                                    className="
                                        bg-white
                                        rounded-2xl
                                        border
                                        border-slate-100
                                        shadow-lg
                                        shadow-slate-900/5
                                        p-6
                                        hover:-translate-y-1
                                        hover:shadow-xl
                                        transition-all
                                    "
                                >

                                    <div
                                        className="
                                            w-12
                                            h-12
                                            rounded-xl
                                            bg-emerald-50
                                            text-emerald-600
                                            flex
                                            items-center
                                            justify-center
                                        "
                                    >

                                        <Icon className="w-6 h-6" />

                                    </div>


                                    <h3 className="mt-5 font-bold text-lg text-slate-900">
                                        {feature.title}
                                    </h3>


                                    <p className="mt-2 text-sm text-slate-500 leading-6">
                                        {feature.text}
                                    </p>

                                </div>
                            );

                        })}

                    </div>


                    {/* =====================================================
                        CTA
                    ====================================================== */}

                    <div
                        className="
                            mt-10
                            rounded-3xl
                            border
                            border-emerald-100
                            bg-emerald-50
                            p-8
                            sm:p-10
                            text-center
                        "
                    >

                        <h2
                            className="
                                text-2xl
                                sm:text-3xl
                                font-extrabold
                                text-slate-900
                            "
                        >
                            Uko tayari kuendesha biashara yako kwa urahisi?
                        </h2>


                        <p className="mt-3 text-slate-500 max-w-xl mx-auto">
                            Anza kutumia MauzoVibe leo na pata udhibiti
                            zaidi wa biashara yako.
                        </p>


                        <Link
                            href={route("register")}
                            className="
                                inline-flex
                                items-center
                                gap-2
                                mt-6
                                px-7
                                py-3.5
                                rounded-xl
                                bg-emerald-600
                                hover:bg-emerald-700
                                text-white
                                font-bold
                                shadow-lg
                                shadow-emerald-600/20
                                transition
                            "
                        >
                            Anza Free Trial

                            <RocketLaunchIcon className="w-5 h-5" />

                        </Link>

                    </div>

                </section>

            </AuthLayout>
        </>
    );
}