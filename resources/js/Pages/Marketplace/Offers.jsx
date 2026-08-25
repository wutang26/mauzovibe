import { Link } from "@inertiajs/react";
import MarketplacePublicLayout from "@/Layouts/MarketplacePublicLayout";

export default function Offers({
    products,
    categories = [],
    userLocation = "Tabora, Tanzania",
}) {
    const items = products?.data ?? [];

    return (
        <MarketplacePublicLayout
            title="Ofa Maalum - MauzoVibe"
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
                        <i className="fa-solid fa-tags"></i>
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
                            Ofa Maalum
                        </h1>

                        <p className="text-sm text-gray-500">
                            Gundua bidhaa zilizowekwa kwenye ofa maalum
                        </p>

                    </div>

                </div>

            </div>


            {/* =====================================================
                PRODUCTS
            ====================================================== */}
            {items.length > 0 ? (

                <div
                    className="
                        grid
                        grid-cols-2
                        sm:grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-4
                        xl:grid-cols-5
                        gap-3
                        sm:gap-4
                    "
                >

                    {items.map((product) => (

                        <Link
                            key={product.id}
                            href={`/marketplace/listing/${product.slug}`}
                            className="
                                bg-white
                                border
                                border-gray-200
                                rounded-xl
                                overflow-hidden
                                hover:shadow-lg
                                transition
                                group
                            "
                        >

                            {/* =================================================
                                IMAGE
                            ================================================== */}
                            <div
                                className="
                                    relative
                                    aspect-[4/3]
                                    bg-gray-100
                                "
                            >

                                <img
                                    src={
                                        product.image ||
                                        product.images?.[0] ||
                                        "https://via.placeholder.com/300x220?text=No+Image"
                                    }
                                    alt={product.title}
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


                                {/* OFFER BADGE */}
                                <div
                                    className="
                                        absolute
                                        top-2
                                        left-2
                                        bg-red-600
                                        text-white
                                        text-[10px]
                                        font-bold
                                        px-2
                                        py-1
                                        rounded-full
                                        shadow
                                    "
                                >
                                    OFA
                                </div>


                                {/* CONDITION BADGE */}
                                {product.condition && (

                                    <div
                                        className="
                                            absolute
                                            bottom-2
                                            left-2
                                            bg-black/70
                                            text-white
                                            text-[10px]
                                            px-2
                                            py-1
                                            rounded-full
                                        "
                                    >
                                        {product.condition === "new"
                                            ? "Mpya"
                                            : "Imetumika"}
                                    </div>

                                )}


                                {/* HEART */}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    className="
                                        absolute
                                        top-2
                                        right-2
                                        bg-white/90
                                        hover:bg-white
                                        rounded-full
                                        w-8
                                        h-8
                                        flex
                                        items-center
                                        justify-center
                                        shadow-sm
                                    "
                                >
                                    <i className="fa-regular fa-heart text-gray-600 text-sm"></i>
                                </button>

                            </div>


                            {/* =================================================
                                DETAILS
                            ================================================== */}
                            <div className="p-3">

                                <h2
                                    className="
                                        font-medium
                                        text-sm
                                        text-gray-900
                                        line-clamp-2
                                    "
                                >
                                    {product.title}
                                </h2>


                                {/* PRICE */}
                                <div
                                    className="
                                        text-green-600
                                        font-bold
                                        mt-1.5
                                    "
                                >
                                    {product.formatted_price ||
                                        `TZS ${Number(
                                            product.price || 0
                                        ).toLocaleString()}`}
                                </div>


                                {/* LOCATION */}
                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-1
                                        text-xs
                                        text-gray-500
                                        mt-1.5
                                    "
                                >

                                    <i
                                        className="
                                            fa-solid
                                            fa-location-dot
                                            text-[10px]
                                        "
                                    ></i>

                                    <span className="truncate">
                                        {product.location ||
                                            product.city ||
                                            "Tanzania"}
                                    </span>

                                </div>


                                {/* CATEGORY */}
                                {product.category && (

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-1
                                            text-xs
                                            text-gray-400
                                            mt-1
                                        "
                                    >

                                        <i
                                            className={`
                                                fa-solid
                                                ${product.category.icon || "fa-tag"}
                                                text-[10px]
                                            `}
                                        ></i>

                                        <span className="truncate">
                                            {product.category.name ||
                                                product.category}
                                        </span>

                                    </div>

                                )}

                            </div>

                        </Link>

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
                        <i className="fa-solid fa-tags text-2xl"></i>
                    </div>


                    <h2
                        className="
                            text-lg
                            font-semibold
                            text-gray-900
                            mb-1
                        "
                    >
                        Hakuna ofa kwa sasa
                    </h2>


                    <p
                        className="
                            text-sm
                            text-gray-500
                            mb-5
                        "
                    >
                        Kwa sasa hakuna bidhaa zilizowekwa kwenye ofa maalum.
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


            {/* =====================================================
                PAGINATION
            ====================================================== */}
            {products?.links?.length > 3 && (

                <div
                    className="
                        flex
                        flex-wrap
                        justify-center
                        gap-2
                        mt-8
                    "
                >

                    {products.links.map((link, index) => (

                        <Link
                            key={index}
                            href={link.url || "#"}
                            preserveScroll
                            className={`
                                px-3
                                py-2
                                rounded-lg
                                text-sm
                                border
                                transition
                                ${
                                    link.active
                                        ? "bg-green-600 text-white border-green-600"
                                        : link.url
                                            ? "bg-white text-gray-700 border-gray-200 hover:border-green-400 hover:text-green-600"
                                            : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                }
                            `}
                            dangerouslySetInnerHTML={{
                                __html: link.label,
                            }}
                        />

                    ))}

                </div>

            )}

        </MarketplacePublicLayout>
    );
}

