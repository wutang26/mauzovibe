import { Link } from "@inertiajs/react";
import MarketplacePublicLayout from "@/Layouts/MarketplacePublicLayout";

export default function New({
    products,
    categories = [],
    quickCategories = [],
    userLocation = "Tabora, Tanzania",
}) {
    const items = products?.data ?? [];

    return (
        <MarketplacePublicLayout
            title="Bidhaa Mpya - MauzoVibe"
            categories={categories}
            quickCategories={quickCategories}
            userLocation={userLocation}
        >

            {/* =====================================================
                PAGE HEADER
            ====================================================== */}
            <div className="mb-6">

                <div className="flex items-center justify-between gap-4">

                    <div className="flex items-center gap-3">

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
                                shrink-0
                            "
                        >
                            <i className="fa-solid fa-sparkles"></i>
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
                                Bidhaa Mpya
                            </h1>

                            <p className="text-sm text-gray-500">
                                Angalia bidhaa mpya zilizowekwa hivi karibuni
                            </p>

                        </div>

                    </div>

                    {/* COUNT */}
                    {products?.total !== undefined && (
                        <div
                            className="
                                hidden
                                sm:flex
                                items-center
                                gap-1.5
                                bg-green-50
                                text-green-700
                                px-3
                                py-1.5
                                rounded-full
                                text-xs
                                font-semibold
                                shrink-0
                            "
                        >
                            <i className="fa-solid fa-box"></i>

                            <span>
                                {Number(products.total).toLocaleString()}
                            </span>

                            <span>
                                bidhaa
                            </span>
                        </div>
                    )}

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
                        min-[400px]:grid-cols-2
                        sm:grid-cols-3
                        md:grid-cols-3
                        lg:grid-cols-4
                        xl:grid-cols-5
                        2xl:grid-cols-6
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
                                hover:border-green-300
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
                                    overflow-hidden
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


                                {/* NEW BADGE */}

                                <div
                                    className="
                                        absolute
                                        top-2
                                        left-2
                                        bg-green-600
                                        text-white
                                        text-[10px]
                                        font-semibold
                                        px-2
                                        py-1
                                        rounded-full
                                        shadow
                                    "
                                >
                                    MPYA
                                </div>


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
                                        transition
                                    "
                                >
                                    <i
                                        className="
                                            fa-regular
                                            fa-heart
                                            text-gray-600
                                            text-sm
                                        "
                                    ></i>
                                </button>

                            </div>


                            {/* =================================================
                                DETAILS
                            ================================================== */}

                            <div className="p-3">

                                {/* TITLE */}

                                <h2
                                    className="
                                        font-medium
                                        text-sm
                                        text-gray-900
                                        line-clamp-2
                                        leading-snug
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
                                        text-sm
                                        sm:text-[15px]
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
                                        text-[10px]
                                        sm:text-xs
                                        text-gray-500
                                        mt-1.5
                                    "
                                >

                                    <i
                                        className="
                                            fa-solid
                                            fa-location-dot
                                            text-[9px]
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
                                            text-[10px]
                                            sm:text-xs
                                            text-gray-400
                                            mt-1
                                            truncate
                                        "
                                    >
                                        {product.category.name ||
                                            product.category}
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
                        <i className="fa-solid fa-box-open text-2xl"></i>
                    </div>


                    <h2
                        className="
                            text-lg
                            font-semibold
                            text-gray-900
                            mb-1
                        "
                    >
                        Hakuna bidhaa mpya
                    </h2>


                    <p
                        className="
                            text-sm
                            text-gray-500
                            mb-5
                        "
                    >
                        Bado hakuna bidhaa mpya zilizowekwa sokoni.
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
                                        ? `
                                            bg-green-600
                                            text-white
                                            border-green-600
                                        `
                                        : link.url
                                            ? `
                                                bg-white
                                                text-gray-700
                                                border-gray-200
                                                hover:border-green-400
                                                hover:text-green-600
                                            `
                                            : `
                                                bg-gray-100
                                                text-gray-400
                                                border-gray-200
                                                cursor-not-allowed
                                            `
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