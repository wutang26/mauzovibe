import { Head } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

import {
    ShieldCheckIcon,
    LockClosedIcon,
    UserCircleIcon,
    ServerIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function Privacy() {
    const sections = [
        {
            icon: InformationCircleIcon,
            title: "Taarifa Tunazokusanya",
            text: "Tunapokusanya taarifa zinazohitajika ili kukuwezesha kutumia MauzoVibe, kama vile jina, barua pepe, taarifa za biashara, matawi, watumiaji na taarifa nyingine unazoweka kwenye mfumo.",
        },
        {
            icon: UserCircleIcon,
            title: "Matumizi ya Taarifa",
            text: "Taarifa zako hutumika kutoa huduma za MauzoVibe, kuboresha mfumo, kusaidia akaunti yako na kuhakikisha mfumo unafanya kazi kwa usalama na ufanisi.",
        },
        {
            icon: LockClosedIcon,
            title: "Usalama wa Taarifa",
            text: "Tunachukua hatua zinazofaa za kiusalama kulinda taarifa za akaunti na biashara yako dhidi ya matumizi yasiyoruhusiwa, upotevu au uharibifu.",
        },
        {
            icon: ServerIcon,
            title: "Uhifadhi wa Data",
            text: "Taarifa zako huhifadhiwa katika miundombinu inayolenga kutoa usalama, upatikanaji na uaminifu wa data ya biashara yako.",
        },
    ];

    return (
        <>
            <Head title="Privacy Policy | MauzoVibe" />

            <AuthLayout
                title="Privacy Policy 🔐"
                subtitle="Tunathamini faragha na usalama wa taarifa zako."
            >
                <div className="w-full max-w-5xl mx-auto">

                    {/* HERO */}

                    <div className="relative overflow-hidden rounded-3xl bg-emerald-600 shadow-2xl shadow-emerald-600/20">

                        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

                        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

                        <div className="relative z-10 p-8 sm:p-10 lg:p-12">

                            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                                <ShieldCheckIcon className="w-8 h-8 text-white" />
                            </div>

                            <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold text-white">
                                Faragha yako ni muhimu kwetu
                            </h2>

                            <p className="mt-4 max-w-2xl text-emerald-50 leading-7">
                                Sera hii inaeleza namna MauzoVibe
                                inavyokusanya, kutumia, kuhifadhi na
                                kulinda taarifa zako unapokuwa unatumia
                                huduma zetu.
                            </p>

                            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm">
                                <span className="w-2 h-2 rounded-full bg-white" />
                                Last updated: August 2026
                            </div>

                        </div>
                    </div>


                    {/* INTRO */}

                    <div className="mt-8 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-900/5 p-7 sm:p-9">

                        <h2 className="text-2xl font-bold text-slate-900">
                            Utangulizi
                        </h2>

                        <p className="mt-4 text-slate-500 leading-7">
                            MauzoVibe ni mfumo wa usimamizi wa biashara
                            unaosaidia wafanyabiashara kusimamia mauzo,
                            bidhaa, stock, wateja, watumiaji na matawi.
                            Tunajitahidi kuhakikisha taarifa zinazotumika
                            katika mfumo zinatunzwa kwa uangalifu.
                        </p>

                    </div>


                    {/* PRIVACY CARDS */}

                    <div className="grid md:grid-cols-2 gap-5 mt-6">

                        {sections.map((section, index) => {

                            const Icon = section.icon;

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

                                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                        <Icon className="w-6 h-6" />
                                    </div>

                                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                                        {section.title}
                                    </h3>

                                    <p className="mt-3 text-sm text-slate-500 leading-7">
                                        {section.text}
                                    </p>

                                </div>
                            );
                        })}

                    </div>


                    {/* DATA SHARING */}

                    <div className="mt-6 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-900/5 p-7 sm:p-9">

                        <h2 className="text-2xl font-bold text-slate-900">
                            Kushirikisha Taarifa
                        </h2>

                        <p className="mt-4 text-slate-500 leading-7">
                            Hatutauza taarifa zako binafsi. Taarifa zinaweza
                            kushughulikiwa na watoa huduma wanaohitajika
                            kuwezesha huduma za MauzoVibe, kwa kuzingatia
                            usalama na matumizi yaliyokusudiwa.
                        </p>

                    </div>


                    {/* YOUR RESPONSIBILITY */}

                    <div className="mt-6 bg-slate-900 rounded-3xl p-7 sm:p-9 text-white">

                        <h2 className="text-2xl font-bold">
                            Wajibu wako
                        </h2>

                        <p className="mt-4 text-slate-300 leading-7">
                            Unawajibika kuhakikisha taarifa za kuingia kwenye
                            akaunti yako, kama password, zinatunzwa kwa
                            usalama na hazishirikishwi na watu wasioruhusiwa.
                        </p>

                    </div>


                    {/* CONTACT */}

                    <div className="mt-6 text-center bg-emerald-50 border border-emerald-100 rounded-3xl p-8">

                        <h2 className="text-xl font-bold text-slate-900">
                            Una swali kuhusu Privacy?
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Wasiliana nasi kwa msaada zaidi.
                        </p>

                        <a
                            href="mailto:mauzovibe@outlook.com"
                            className="
                                inline-flex
                                mt-5
                                px-6
                                py-3
                                rounded-xl
                                bg-emerald-600
                                hover:bg-emerald-700
                                text-white
                                font-bold
                                transition
                            "
                        >
                            mauzovibe@outlook.com
                        </a>

                    </div>

                </div>
            </AuthLayout>
        </>
    );
}