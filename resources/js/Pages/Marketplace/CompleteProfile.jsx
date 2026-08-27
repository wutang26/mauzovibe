import { Head, useForm } from "@inertiajs/react";
import MarketplaceLayout from "@/Layouts/MarketplaceLayout";
import { Phone, ShieldCheck, AlertTriangle } from "lucide-react";

export default function CompleteProfile({ phone = "" }) {
    const { data, setData, put, processing, errors } = useForm({
        phone: phone ?? "",
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("marketplace.complete-profile.update"));
    };

    return (
        <>
            <Head title="Kamilisha Profile" />

            <MarketplaceLayout>
                <div className="min-h-screen bg-slate-50 px-4 py-10">

                    <div className="mx-auto max-w-lg">

                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                            {/* HEADER */}

                            <div className="border-b border-slate-200 px-6 py-6">

                                <div className="flex items-start gap-4">

                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                                        <AlertTriangle size={24} />
                                    </div>

                                    <div>
                                        <h1 className="text-xl font-bold text-slate-900">
                                            Kamilisha profile yako
                                        </h1>

                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            Ili uweze kuuza bidhaa kwenye
                                            MauzoVibe unahitaji kuongeza
                                            namba yako ya simu.
                                        </p>
                                    </div>

                                </div>

                            </div>


                            {/* FORM */}

                            <form
                                onSubmit={submit}
                                className="space-y-6 px-6 py-6"
                            >

                                <div>

                                    <label
                                        htmlFor="phone"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Phone Number
                                    </label>

                                    <div className="relative">

                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                            <Phone size={18} />
                                        </div>

                                        <input
                                            id="phone"
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData(
                                                    "phone",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="07XXXXXXXX"
                                            autoComplete="tel"
                                            className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:ring-2 ${
                                                errors.phone
                                                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                                                    : "border-slate-300 focus:border-green-500 focus:ring-green-100"
                                            }`}
                                        />

                                    </div>

                                    {errors.phone && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.phone}
                                        </p>
                                    )}

                                    <p className="mt-2 text-xs text-slate-500">
                                        Mfano: 0712345678
                                    </p>

                                </div>


                                {/* PRIVACY */}

                                <div className="flex gap-3 rounded-xl bg-green-50 p-4">

                                    <ShieldCheck
                                        size={20}
                                        className="mt-0.5 shrink-0 text-green-600"
                                    />

                                    <p className="text-xs leading-5 text-green-800">
                                        Namba yako itatumika kuwawezesha
                                        wanunuzi kuwasiliana nawe kuhusu
                                        bidhaa zako.
                                    </p>

                                </div>


                                {/* BUTTON */}

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex w-full items-center justify-center rounded-xl bg-green-600 px-5 py-3.5 font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {processing
                                        ? "Inahifadhi..."
                                        : "Save & Continue"}
                                </button>

                            </form>

                        </div>

                    </div>

                </div>
            </MarketplaceLayout>
        </>
    );
}