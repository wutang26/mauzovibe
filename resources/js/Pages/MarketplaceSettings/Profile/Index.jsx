import { Head, Link, usePage } from "@inertiajs/react";
import MarketplaceLayout from "@/Layouts/MarketplaceLayout";

export default function Index() {
    const { auth } = usePage().props;

    const user = auth?.user || {};

    return (
        <>
            <Head title="Wasifu wa Marketplace | MauzoVibe" />

            <MarketplaceLayout>
                <div className="min-h-screen bg-slate-50">

                    {/* PAGE CONTAINER */}
                    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

                        {/* HEADER */}
                        <div className="mb-6">

                            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                                <span>Marketplace</span>
                                <span>/</span>
                                <span>Settings</span>
                                <span>/</span>
                                <span className="text-emerald-600">
                                    Profile
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                                        Wasifu wa Marketplace
                                    </h1>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Simamia taarifa ambazo wanunuzi wataona kuhusu wewe.
                                    </p>
                                </div>

                                <Link
                                    href={route(
                                        "marketplace.settings.profile.edit"
                                    )}
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
                                        transition
                                    "
                                >
                                    <i className="fa-solid fa-pen-to-square"></i>

                                    Edit Profile
                                </Link>

                            </div>
                        </div>


                        {/* PROFILE CARD */}
                        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

                            {/* PROFILE HEADER */}
                            <div className="p-6 sm:p-8 border-b border-slate-100">

                                <div className="flex flex-col sm:flex-row sm:items-center gap-5">

                                    {/* AVATAR */}
                                    <div
                                        className="
                                            w-20
                                            h-20
                                            rounded-2xl
                                            bg-emerald-100
                                            flex
                                            items-center
                                            justify-center
                                            text-emerald-700
                                            text-3xl
                                            font-bold
                                            overflow-hidden
                                        "
                                    >
                                        {user.avatar ? (
                                            <img
                                                src={user.avatar}
                                                alt={user.name || "User"}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            user.name
                                                ?.charAt(0)
                                                ?.toUpperCase() || "M"
                                        )}
                                    </div>


                                    {/* USER NAME */}
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">
                                            {user.name || "Jina lako"}
                                        </h2>

                                        <p className="text-sm text-slate-500 mt-1">
                                            {user.email || "Email haijawekwa"}
                                        </p>

                                        <div className="flex items-center gap-1 mt-2 text-xs text-emerald-600 font-medium">
                                            <i className="fa-solid fa-circle-check"></i>
                                            Marketplace Seller
                                        </div>
                                    </div>

                                </div>

                            </div>


                            {/* INFORMATION */}
                            <div className="p-6 sm:p-8">

                                <h3 className="text-base font-bold text-slate-900 mb-5">
                                    Taarifa za Muuzaji
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                    {/* NAME */}
                                    <div>
                                        <p className="text-xs font-medium text-slate-400 mb-1">
                                            Jina
                                        </p>

                                        <p className="text-sm font-semibold text-slate-800">
                                            {user.name || "Haijawekwa"}
                                        </p>
                                    </div>


                                    {/* EMAIL */}
                                    <div>
                                        <p className="text-xs font-medium text-slate-400 mb-1">
                                            Email
                                        </p>

                                        <p className="text-sm font-semibold text-slate-800 break-all">
                                            {user.email || "Haijawekwa"}
                                        </p>
                                    </div>


                                    {/* PHONE */}
                                    <div>
                                        <p className="text-xs font-medium text-slate-400 mb-1">
                                            Namba ya Simu
                                        </p>

                                        {user.phone ? (
                                            <p className="text-sm font-semibold text-slate-800">
                                                {user.phone}
                                            </p>
                                        ) : (
                                            <div>
                                                <p className="text-sm font-semibold text-amber-600">
                                                    Haijawekwa
                                                </p>

                                                <p className="text-xs text-slate-400 mt-1">
                                                    Ongeza namba ili wanunuzi waweze kuwasiliana nawe.
                                                </p>
                                            </div>
                                        )}
                                    </div>


                                    {/* BUSINESS */}
                                    <div>
                                        <p className="text-xs font-medium text-slate-400 mb-1">
                                            Jina la Biashara
                                        </p>

                                        <p className="text-sm font-semibold text-slate-800">
                                            {user.business_name || "Haijawekwa"}
                                        </p>
                                    </div>

                                </div>


                                {/* PHONE WARNING */}
                                {!user.phone && (
                                    <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-100">

                                        <div className="flex items-start gap-3">

                                            <div className="text-amber-500 mt-0.5">
                                                <i className="fa-solid fa-triangle-exclamation"></i>
                                            </div>

                                            <div className="flex-1">

                                                <p className="text-sm font-semibold text-amber-800">
                                                    Ongeza namba yako ya simu
                                                </p>

                                                <p className="text-xs text-amber-700 mt-1">
                                                    Namba ya simu itasaidia wanunuzi
                                                    kuwasiliana nawe kuhusu bidhaa zako.
                                                </p>

                                                <Link
                                                    href={route(
                                                        "marketplace.settings.profile.edit"
                                                    )}
                                                    className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-amber-700 hover:text-amber-800"
                                                >
                                                    Ongeza sasa
                                                    <i className="fa-solid fa-arrow-right"></i>
                                                </Link>

                                            </div>

                                        </div>

                                    </div>
                                )}

                            </div>

                        </div>

                    </div>

                </div>
            </MarketplaceLayout>
        </>
    );
}

