import { Head, Link, useForm, usePage } from "@inertiajs/react";
import MarketplaceLayout from "@/Layouts/MarketplaceLayout";

export default function Edit() {
    const { auth } = usePage().props;

    const user = auth?.user || {};

    const {
        data,
        setData,
        put,
        processing,
        errors,
    } = useForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        business_name: user.business_name || "",
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("marketplace.settings.profile.update"));
    };

    return (
        <>
            <Head title="Hariri Wasifu wa Marketplace | MauzoVibe" />

            <MarketplaceLayout>

                <div className="min-h-screen bg-slate-50">

                    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

                        {/* HEADER */}
                        <div className="mb-6">

                            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                                <Link
                                    href={route(
                                        "marketplace.settings.profile"
                                    )}
                                    className="hover:text-emerald-600"
                                >
                                    Marketplace Profile
                                </Link>

                                <span>/</span>

                                <span className="text-emerald-600">
                                    Hariri
                                </span>
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                                Hariri Wasifu
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Sasisha taarifa zako za Marketplace.
                            </p>

                        </div>


                        {/* FORM CARD */}
                        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

                            <form onSubmit={submit}>

                                {/* FORM HEADER */}
                                <div className="p-6 sm:p-8 border-b border-slate-100">

                                    <h2 className="text-lg font-bold text-slate-900">
                                        Taarifa za Muuzaji
                                    </h2>

                                    <p className="text-sm text-slate-500 mt-1">
                                        Taarifa hizi zitatumika kwenye Marketplace.
                                    </p>

                                </div>


                                {/* FORM BODY */}
                                <div className="p-6 sm:p-8 space-y-6">

                                    {/* NAME */}
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-semibold text-slate-700 mb-2"
                                        >
                                            Jina lako
                                        </label>

                                        <input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            className="
                                                w-full
                                                h-12
                                                px-4
                                                rounded-xl
                                                border
                                                border-slate-200
                                                bg-slate-50
                                                focus:border-emerald-500
                                                focus:ring-4
                                                focus:ring-emerald-500/10
                                                outline-none
                                            "
                                        />

                                        {errors.name && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>


                                    {/* EMAIL */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-semibold text-slate-700 mb-2"
                                        >
                                            Email
                                        </label>

                                        <input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            disabled
                                            className="
                                                w-full
                                                h-12
                                                px-4
                                                rounded-xl
                                                border
                                                border-slate-200
                                                bg-slate-100
                                                text-slate-500
                                                cursor-not-allowed
                                            "
                                        />

                                        <p className="mt-1 text-xs text-slate-400">
                                            Email haiwezi kubadilishwa hapa.
                                        </p>
                                    </div>


                                    {/* PHONE */}
                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="block text-sm font-semibold text-slate-700 mb-2"
                                        >
                                            Namba ya Simu
                                            <span className="ml-1 text-red-500">
                                                *
                                            </span>
                                        </label>

                                        <div className="relative">

                                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                                <i className="fa-solid fa-phone text-slate-400"></i>
                                            </div>

                                            <input
                                                id="phone"
                                                type="tel"
                                                inputMode="tel"
                                                value={data.phone}
                                                onChange={(e) =>
                                                    setData(
                                                        "phone",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Mfano: 0746856656"
                                                className={`
                                                    w-full
                                                    h-12
                                                    pl-12
                                                    pr-4
                                                    rounded-xl
                                                    border
                                                    ${
                                                        errors.phone
                                                            ? "border-red-400"
                                                            : "border-slate-200"
                                                    }
                                                    bg-slate-50
                                                    focus:border-emerald-500
                                                    focus:ring-4
                                                    focus:ring-emerald-500/10
                                                    outline-none
                                                `}
                                            />

                                        </div>

                                        {errors.phone && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.phone}
                                            </p>
                                        )}

                                        <p className="mt-2 text-xs text-slate-400">
                                            Namba hii inaweza kutumika na wanunuzi
                                            kuwasiliana nawe kuhusu bidhaa zako.
                                        </p>
                                    </div>


                                    {/* BUSINESS NAME */}
                                    <div>
                                        <label
                                            htmlFor="business_name"
                                            className="block text-sm font-semibold text-slate-700 mb-2"
                                        >
                                            Jina la Biashara
                                        </label>

                                        <input
                                            id="business_name"
                                            type="text"
                                            value={data.business_name}
                                            onChange={(e) =>
                                                setData(
                                                    "business_name",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Mfano: MauzoVibe Shop"
                                            className="
                                                w-full
                                                h-12
                                                px-4
                                                rounded-xl
                                                border
                                                border-slate-200
                                                bg-slate-50
                                                focus:border-emerald-500
                                                focus:ring-4
                                                focus:ring-emerald-500/10
                                                outline-none
                                            "
                                        />

                                        {errors.business_name && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.business_name}
                                            </p>
                                        )}
                                    </div>

                                </div>


                                {/* FOOTER */}
                                <div className="px-6 sm:px-8 py-5 bg-slate-50 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">

                                    <Link
                                        href={route(
                                            "marketplace.settings.profile"
                                        )}
                                        className="
                                            inline-flex
                                            items-center
                                            justify-center
                                            px-5
                                            py-2.5
                                            rounded-xl
                                            border
                                            border-slate-300
                                            bg-white
                                            text-sm
                                            font-semibold
                                            text-slate-700
                                            hover:bg-slate-100
                                        "
                                    >
                                        Ghairi
                                    </Link>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="
                                            inline-flex
                                            items-center
                                            justify-center
                                            gap-2
                                            px-5
                                            py-2.5
                                            rounded-xl
                                            bg-emerald-600
                                            text-white
                                            text-sm
                                            font-semibold
                                            hover:bg-emerald-700
                                            disabled:opacity-60
                                            disabled:cursor-not-allowed
                                        "
                                    >
                                        {processing ? (
                                            <>
                                                <i className="fa-solid fa-spinner animate-spin"></i>
                                                Inahifadhi...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fa-solid fa-floppy-disk"></i>
                                                Hifadhi Mabadiliko
                                            </>
                                        )}
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </MarketplaceLayout>
        </>
    );
}

