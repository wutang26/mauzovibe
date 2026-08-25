import { Head, Link } from "@inertiajs/react";
import MarketplacePublicLayout from "@/Layouts/MarketplacePublicLayout";

export default function Help({
    categories = [],
    userLocation = "Tabora, Tanzania",
}) {
    return (
        <>
            <Head title="Msaada - MauzoVibe" />

            <MarketplacePublicLayout
                title="Msaada - MauzoVibe"
                categories={categories}
                userLocation={userLocation}
            >
                <div className="max-w-5xl mx-auto">

                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div
                                className="
                                    w-11 h-11
                                    rounded-xl
                                    bg-green-100
                                    text-green-600
                                    flex
                                    items-center
                                    justify-center
                                "
                            >
                                <i className="fa-solid fa-circle-question text-xl"></i>
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Msaada
                                </h1>

                                <p className="text-sm text-gray-500">
                                    Pata msaada kuhusu matumizi ya MauzoVibe Marketplace.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Help cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div className="bg-white border border-gray-200 rounded-2xl p-6">
                            <div className="w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>

                            <h2 className="font-semibold text-gray-900 mb-2">
                                Kutafuta bidhaa
                            </h2>

                            <p className="text-sm text-gray-500 leading-6">
                                Tumia sehemu ya kutafuta bidhaa au chagua category
                                ili kupata bidhaa unayoihitaji.
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl p-6">
                            <div className="w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4">
                                <i className="fa-solid fa-cart-shopping"></i>
                            </div>

                            <h2 className="font-semibold text-gray-900 mb-2">
                                Kununua bidhaa
                            </h2>

                            <p className="text-sm text-gray-500 leading-6">
                                Fungua bidhaa unayoipenda ili kuona bei, maelezo,
                                location na taarifa za muuzaji.
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl p-6">
                            <div className="w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4">
                                <i className="fa-solid fa-store"></i>
                            </div>

                            <h2 className="font-semibold text-gray-900 mb-2">
                                Kuuza bidhaa
                            </h2>

                            <p className="text-sm text-gray-500 leading-6">
                                Ingia kwenye akaunti yako na tumia Marketplace
                                Dashboard kuongeza na kusimamia bidhaa zako.
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl p-6">
                            <div className="w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4">
                                <i className="fa-solid fa-shield-halved"></i>
                            </div>

                            <h2 className="font-semibold text-gray-900 mb-2">
                                Usalama
                            </h2>

                            <p className="text-sm text-gray-500 leading-6">
                                Usitume fedha kabla ya kuhakikisha bidhaa,
                                muuzaji na taarifa zote muhimu.
                            </p>
                        </div>

                    </div>

                    {/* Contact */}
                    <div className="mt-6 bg-green-50 border border-green-100 rounded-2xl p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                            {/* Contact */}
                            <div className="mt-6 bg-green-50 border border-green-100 rounded-2xl p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                                    <div>
                                        <h2 className="font-semibold text-gray-900">
                                            Bado unahitaji msaada?
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Wasiliana na timu ya MauzoVibe kwa msaada zaidi.
                                        </p>

                                        <a
                                            href="https://wa.me/255746856656"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="
                                inline-flex
                                items-center
                                gap-2
                                mt-3
                                text-green-700
                                hover:text-green-800
                                font-semibold
                                text-sm
                            "
                                        >
                                            <i className="fa-brands fa-whatsapp text-lg"></i>
                                            WhatsApp: 0746 856 656
                                        </a>
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
                            bg-green-600
                            hover:bg-green-700
                            text-white
                            px-5
                            py-2.5
                            rounded-xl
                            text-sm
                            font-medium
                            transition
                            shrink-0
                        "
                                    >
                                        <i className="fa-brands fa-whatsapp text-lg"></i>
                                        Chat WhatsApp
                                    </a>

                                </div>
                            </div>


                            <Link
                                href={route("marketplace.index")}
                                className="
                                                inline-flex
                                                items-center
                                                justify-center
                                                gap-2
                                                bg-green-600
                                                hover:bg-green-700
                                                text-white
                                                px-5
                                                py-2.5
                                                rounded-xl
                                                text-sm
                                                font-medium
                                                transition
                                            "
                            >
                                <i className="fa-solid fa-house"></i>
                                Rudi Marketplace
                            </Link>

                        </div>
                    </div>

                </div>
            </MarketplacePublicLayout>
        </>
    );
}

