import { Head } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

import {
    DocumentCheckIcon,
    UserGroupIcon,
    CreditCardIcon,
    ExclamationTriangleIcon,
    NoSymbolIcon,
} from "@heroicons/react/24/outline";

export default function Terms() {
    const terms = [
        {
            icon: UserGroupIcon,
            title: "Matumizi ya Akaunti",
            text: "Unapaswa kutoa taarifa sahihi wakati wa kutengeneza akaunti na kuhakikisha taarifa zako za kuingia zinatunzwa kwa usalama.",
        },
        {
            icon: DocumentCheckIcon,
            title: "Matumizi ya Mfumo",
            text: "MauzoVibe inapaswa kutumiwa kwa shughuli halali za biashara na kwa kufuata sheria pamoja na masharti haya.",
        },
        {
            icon: CreditCardIcon,
            title: "Subscriptions na Malipo",
            text: "Baada ya kipindi cha Free Trial, matumizi ya baadhi ya huduma yanaweza kuhitaji kuchagua mpango wa malipo unaofaa.",
        },
        {
            icon: NoSymbolIcon,
            title: "Matumizi Yasiyoruhusiwa",
            text: "Hairuhusiwi kutumia mfumo kwa shughuli za udanganyifu, kuvuruga huduma, kupata access isiyoruhusiwa au kuingilia usalama wa mfumo.",
        },
    ];

    return (
        <>
            <Head title="Terms & Conditions | MauzoVibe" />

            <AuthLayout
                title="Terms & Conditions 📄"
                subtitle="Masharti ya matumizi ya huduma za MauzoVibe."
            >

                <div className="w-full max-w-5xl mx-auto">

                    {/* HERO */}

                    <div className="relative overflow-hidden rounded-3xl bg-slate-900 shadow-2xl">

                        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl" />

                        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl" />

                        <div className="relative z-10 p-8 sm:p-10 lg:p-12">

                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                                <DocumentCheckIcon className="w-8 h-8 text-emerald-400" />
                            </div>

                            <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold text-white">
                                Masharti ya Matumizi
                            </h2>

                            <p className="mt-4 max-w-2xl text-slate-300 leading-7">
                                Kwa kutumia MauzoVibe, unakubali masharti
                                yaliyoelezwa hapa. Tafadhali yasome kabla
                                ya kutumia huduma zetu.
                            </p>

                        </div>

                    </div>


                    {/* ACCEPTANCE */}

                    <div className="mt-8 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-900/5 p-7 sm:p-9">

                        <h2 className="text-2xl font-bold text-slate-900">
                            Kukubali Masharti
                        </h2>

                        <p className="mt-4 text-slate-500 leading-7">
                            Unapofungua akaunti au kutumia MauzoVibe,
                            unathibitisha kuwa umesoma na kukubali masharti
                            haya. Ikiwa hukubaliani na masharti haya,
                            tafadhali usitumie huduma.
                        </p>

                    </div>


                    {/* TERMS CARDS */}

                    <div className="grid md:grid-cols-2 gap-5 mt-6">

                        {terms.map((term, index) => {

                            const Icon = term.icon;

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
                                    "
                                >

                                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                        <Icon className="w-6 h-6" />
                                    </div>

                                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                                        {term.title}
                                    </h3>

                                    <p className="mt-3 text-sm text-slate-500 leading-7">
                                        {term.text}
                                    </p>

                                </div>
                            );
                        })}

                    </div>


                    {/* BUSINESS DATA */}

                    <div className="mt-6 bg-white rounded-3xl border border-slate-100 shadow-lg p-7 sm:p-9">

                        <h2 className="text-2xl font-bold text-slate-900">
                            Taarifa za Biashara
                        </h2>

                        <p className="mt-4 text-slate-500 leading-7">
                            Mtumiaji anawajibika kuhakikisha taarifa anazoingiza
                            kwenye mfumo ni sahihi. MauzoVibe haitawajibika
                            kwa makosa yanayotokana na taarifa zisizo sahihi
                            zilizoingizwa na mtumiaji.
                        </p>

                    </div>


                    {/* SERVICE */}

                    <div className="mt-6 bg-white rounded-3xl border border-slate-100 shadow-lg p-7 sm:p-9">

                        <h2 className="text-2xl font-bold text-slate-900">
                            Upatikanaji wa Huduma
                        </h2>

                        <p className="mt-4 text-slate-500 leading-7">
                            Tunajitahidi kuhakikisha MauzoVibe inapatikana
                            kwa wakati wote. Hata hivyo, huduma inaweza
                            kusitishwa kwa muda kutokana na maintenance,
                            updates, matatizo ya kiufundi au sababu nyingine
                            zisizotarajiwa.
                        </p>

                    </div>


                    {/* WARNING */}

                    <div className="mt-6 rounded-3xl bg-amber-50 border border-amber-100 p-7">

                        <div className="flex gap-4">

                            <ExclamationTriangleIcon className="w-7 h-7 text-amber-600 shrink-0" />

                            <div>

                                <h3 className="font-bold text-slate-900">
                                    Muhimu
                                </h3>

                                <p className="mt-2 text-sm text-slate-600 leading-7">
                                    Masharti haya yanaweza kusasishwa
                                    tunapoboresha huduma zetu. Ni jukumu
                                    la mtumiaji kuangalia mabadiliko
                                    yanapofanyika.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* CONTACT */}

                    <div className="mt-6 text-center bg-emerald-50 border border-emerald-100 rounded-3xl p-8">

                        <h2 className="text-xl font-bold text-slate-900">
                            Una swali kuhusu Terms?
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Wasiliana nasi ikiwa unahitaji ufafanuzi zaidi.
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
                            "
                        >
                            Wasiliana Nasi
                        </a>

                    </div>

                </div>

            </AuthLayout>
        </>
    );
}