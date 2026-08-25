import { Link } from "@inertiajs/react";
import MarketplacePublicLayout from "@/Layouts/MarketplacePublicLayout";

export default function Stores({
    stores,
    categories = [],
    userLocation = "Tabora, Tanzania",
}) {
    const items = stores ?? [];

    return (
        <MarketplacePublicLayout
            title="Maduka - MauzoVibe"
            categories={categories}
            userLocation={userLocation}
        >

            {/* =====================================================
                PAGE HEADER
            ====================================================== */}
            <div className="mb-6">

                <div className="flex items-center gap-3 mb-2">

                    <div
                        className="
                            w-10
                            h-10
                            bg-green-100
                            text-green-600
                            rounded-xl
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <i className="fa-solid fa-store"></i>
                    </div>

                    <div>

                        <h1
                            className="
                                text-xl
                                sm:text-2xl
                                font-bold
                                text-gray-900
                            "
                        >
                            Maduka
                        </h1>

                        <p className="text-sm text-gray-500">
                            Gundua wauzaji na maduka mbalimbali kwenye MauzoVibe
                        </p>

                    </div>

                </div>

            </div>


            {/* =====================================================
                STORES
            ====================================================== */}
            {items.length > 0 ? (

                <div
                    className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-4
                        gap-4
                    "
                >

                    {items.map((store) => (

                        <div
                            key={store.id}
                            className="
                                bg-white
                                border
                                border-gray-200
                                rounded-2xl
                                overflow-hidden
                                hover:shadow-lg
                                transition
                                group
                            "
                        >

                            {/* =================================================
                                STORE COVER
                            ================================================== */}
                            <div
                                className="
                                    relative
                                    h-32
                                    bg-gradient-to-br
                                    from-green-50
                                    to-green-100
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                {store.image ? (

                                    <img
                                        src={store.image}
                                        alt={store.name}
                                        className="
                                            w-full
                                            h-full
                                            object-cover
                                            group-hover:scale-105
                                            transition
                                            duration-300
                                        "
                                        loading="lazy"
                                    />

                                ) : (

                                    <div
                                        className="
                                            w-16
                                            h-16
                                            rounded-2xl
                                            bg-white
                                            text-green-600
                                            flex
                                            items-center
                                            justify-center
                                            shadow-sm
                                        "
                                    >
                                        <i className="fa-solid fa-store text-2xl"></i>
                                    </div>

                                )}

                            </div>


                            {/* =================================================
                                STORE DETAILS
                            ================================================== */}
                            <div className="p-4">

                                <div className="flex items-start gap-3">

                                    <div
                                        className="
                                            w-11
                                            h-11
                                            shrink-0
                                            rounded-xl
                                            bg-green-100
                                            text-green-600
                                            flex
                                            items-center
                                            justify-center
                                        "
                                    >
                                        <i className="fa-solid fa-store"></i>
                                    </div>

                                    <div className="min-w-0">

                                        <h2
                                            className="
                                                font-semibold
                                                text-gray-900
                                                truncate
                                            "
                                        >
                                            {store.name}
                                        </h2>

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-1
                                                text-xs
                                                text-gray-500
                                                mt-1
                                            "
                                        >

                                            <i className="fa-solid fa-location-dot text-[10px]"></i>

                                            <span className="truncate">
                                                {store.location || "Tanzania"}
                                            </span>

                                        </div>

                                    </div>

                                </div>


                                {/* =================================================
                                    STORE STATS
                                ================================================== */}
                                <div
                                    className="
                                        grid
                                        grid-cols-2
                                        gap-2
                                        mt-4
                                    "
                                >

                                    <div
                                        className="
                                            bg-gray-50
                                            rounded-xl
                                            p-3
                                            text-center
                                        "
                                    >

                                        <div
                                            className="
                                                text-lg
                                                font-bold
                                                text-gray-900
                                            "
                                        >
                                            {store.products_count ?? 0}
                                        </div>

                                        <div
                                            className="
                                                text-[11px]
                                                text-gray-500
                                            "
                                        >
                                            Bidhaa
                                        </div>

                                    </div>


                                    <div
                                        className="
                                            bg-green-50
                                            rounded-xl
                                            p-3
                                            text-center
                                        "
                                    >

                                        <div
                                            className="
                                                text-lg
                                                font-bold
                                                text-green-600
                                            "
                                        >
                                            {store.new_products_count ?? 0}
                                        </div>

                                        <div
                                            className="
                                                text-[11px]
                                                text-gray-500
                                            "
                                        >
                                            Mpya
                                        </div>

                                    </div>

                                </div>


                                {/* =================================================
                                    LATEST PRODUCT
                                ================================================== */}
                                {store.latest_product && (

                                    <div
                                        className="
                                            mt-4
                                            pt-3
                                            border-t
                                            border-gray-100
                                        "
                                    >

                                        <p
                                            className="
                                                text-[11px]
                                                text-gray-400
                                                mb-1
                                            "
                                        >
                                            Bidhaa ya hivi karibuni
                                        </p>

                                        <p
                                            className="
                                                text-sm
                                                text-gray-700
                                                font-medium
                                                truncate
                                            "
                                        >
                                            {store.latest_product}
                                        </p>

                                    </div>

                                )}


                                {/* =================================================
                                    VIEW STORE
                                ================================================== */}
                                <Link
                                    href={route("marketplace.store", store.id)}
                                    className="
                                        mt-4
                                        w-full
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        bg-green-600
                                        hover:bg-green-700
                                        text-white
                                        px-4
                                        py-2.5
                                        rounded-xl
                                        text-sm
                                        font-medium
                                        transition
                                    "
                                >

                                    <i className="fa-solid fa-store"></i>

                                    Angalia Duka

                                </Link>

                            </div>

                        </div>

                    ))}

                </div>

            ) : (

                /* =====================================================
                    EMPTY STATE
                ====================================================== */
                <div
                    className="
                        bg-white
                        border
                        border-gray-200
                        rounded-2xl
                        p-10
                        sm:p-16
                        text-center
                    "
                >

                    <div
                        className="
                            w-16
                            h-16
                            mx-auto
                            mb-4
                            bg-green-50
                            text-green-600
                            rounded-full
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <i className="fa-solid fa-store-slash text-2xl"></i>
                    </div>

                    <h2
                        className="
                            text-lg
                            font-semibold
                            text-gray-900
                            mb-1
                        "
                    >
                        Hakuna maduka bado
                    </h2>

                    <p
                        className="
                            text-sm
                            text-gray-500
                            mb-5
                        "
                    >
                        Bado hakuna wauzaji wenye bidhaa sokoni.
                    </p>

                    <Link
                        href={route("marketplace.index")}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            bg-green-600
                            hover:bg-green-700
                            text-white
                            px-5
                            py-2.5
                            rounded-xl
                            font-medium
                            transition
                        "
                    >

                        <i className="fa-solid fa-house"></i>

                        Rudi Marketplace

                    </Link>

                </div>

            )}

        </MarketplacePublicLayout>
    );
}