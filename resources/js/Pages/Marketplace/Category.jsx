import { Head, Link } from "@inertiajs/react";
import MarketplaceBrowseLayout from "@/Layouts/MarketplaceBrowseLayout";

import {
    Package,
    MapPin,
    ChevronRight,
    Plus,
    SlidersHorizontal,
} from "lucide-react";

export default function Category({
    category,
    listings,
}) {
    const products =
        listings?.data ??
        listings?.listings ??
        [];

    const total =
        listings?.total ??
        products.length ??
        0;

    const categoryName =
        category?.name ?? "Category";

    return (
        <MarketplaceBrowseLayout>

            <Head
                title={`${categoryName} - MauzoVibe Marketplace`}
            />

            <div className="w-full">

                {/* =====================================================
                    BREADCRUMB
                ====================================================== */}
                <div className="mb-5">

                    <div className="flex items-center gap-2 text-sm text-slate-500">

                        <Link
                            href={route("marketplace.index")}
                            className="transition hover:text-green-600"
                        >
                            Marketplace
                        </Link>

                        <ChevronRight
                            size={15}
                            className="shrink-0 text-slate-400"
                        />

                        <span className="truncate font-medium text-slate-900">
                            {categoryName}
                        </span>

                    </div>

                </div>


                {/* =====================================================
                    CATEGORY HEADER
                ====================================================== */}
                <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        {/* CATEGORY INFORMATION */}
                        <div className="flex min-w-0 items-center gap-4">

                            {/* CATEGORY ICON */}
                            <div className="
                                flex
                                h-14
                                w-14
                                shrink-0
                                items-center
                                justify-center
                                rounded-2xl
                                bg-green-50
                                text-green-600
                            ">
                                <Package size={28} />
                            </div>


                            {/* TITLE */}
                            <div className="min-w-0">

                                <h1 className="
                                    text-xl
                                    font-bold
                                    text-slate-900
                                    sm:text-2xl
                                ">
                                    {categoryName}
                                </h1>

                                <p className="
                                    mt-1
                                    text-sm
                                    leading-6
                                    text-slate-500
                                ">
                                    Bidhaa za{" "}
                                    {categoryName}{" "}
                                    zinazopatikana kwenye MauzoVibe.
                                </p>

                            </div>

                        </div>


                        {/* ADD PRODUCT */}
                        <Link
                            href={route("marketplace.dashboard")}
                            className="
                                inline-flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-green-600
                                px-5
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                shadow-sm
                                transition
                                hover:bg-green-700
                                focus:outline-none
                                focus:ring-2
                                focus:ring-green-500
                                focus:ring-offset-2
                                sm:w-auto
                            "
                        >
                            <Plus size={18} />

                            Weka Bidhaa
                        </Link>

                    </div>

                </div>


                {/* =====================================================
                    RESULTS HEADER
                ====================================================== */}
                <div className="
                    mb-4
                    flex
                    flex-col
                    gap-3
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                ">

                    <div>

                        <h2 className="
                            text-lg
                            font-bold
                            text-slate-900
                        ">
                            Bidhaa za {categoryName}
                        </h2>

                        <p className="
                            mt-1
                            text-sm
                            text-slate-500
                        ">
                            {total}{" "}
                            {total === 1
                                ? "bidhaa imepatikana"
                                : "bidhaa zimepatikana"}
                        </p>

                    </div>


                    {/* FILTER BUTTON */}
                    <button
                        type="button"
                        className="
                            inline-flex
                            w-fit
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            px-4
                            py-2.5
                            text-sm
                            font-medium
                            text-slate-700
                            transition
                            hover:bg-slate-50
                            hover:text-slate-900
                        "
                    >
                        <SlidersHorizontal size={17} />

                        Filter
                    </button>

                </div>


                {/* =====================================================
                    PRODUCTS
                ====================================================== */}
                {products.length > 0 ? (

                    <div className="
                        grid
                        grid-cols-2
                        gap-3
                        sm:grid-cols-3
                        sm:gap-4
                        lg:grid-cols-4
                        xl:grid-cols-5
                    ">

                        {products.map((product) => (

                            <Link
                                key={product.id}
                                href={route(
                                    "marketplace.listing.show",
                                    product.slug
                                )}
                                className="
                                    group
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    transition
                                    duration-200
                                    hover:-translate-y-0.5
                                    hover:border-green-200
                                    hover:shadow-lg
                                "
                            >

                                {/* =================================================
                                    PRODUCT IMAGE
                                ================================================== */}
                                <div className="
                                    relative
                                    aspect-square
                                    overflow-hidden
                                    bg-slate-100
                                ">

                                    {product.image ? (

                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            loading="lazy"
                                            className="
                                                h-full
                                                w-full
                                                object-cover
                                                transition
                                                duration-500
                                                group-hover:scale-105
                                            "
                                        />

                                    ) : (

                                        <div className="
                                            flex
                                            h-full
                                            w-full
                                            flex-col
                                            items-center
                                            justify-center
                                            text-slate-400
                                        ">

                                            <Package size={38} />

                                            <span className="
                                                mt-2
                                                text-xs
                                            ">
                                                Hakuna picha
                                            </span>

                                        </div>

                                    )}


                                    {/* =================================================
                                        CONDITION BADGE
                                    ================================================== */}
                                    {product.condition && (

                                        <div className="
                                            absolute
                                            left-2
                                            top-2
                                        ">

                                            <span className="
                                                rounded-full
                                                bg-white/95
                                                px-2.5
                                                py-1
                                                text-[10px]
                                                font-semibold
                                                capitalize
                                                text-slate-700
                                                shadow-sm
                                                backdrop-blur-sm
                                            ">
                                                {product.condition}
                                            </span>

                                        </div>

                                    )}

                                </div>


                                {/* =================================================
                                    PRODUCT DETAILS
                                ================================================== */}
                                <div className="p-3 sm:p-4">

                                    {/* PRODUCT TITLE */}
                                    <h3 className="
                                        line-clamp-2
                                        text-sm
                                        font-semibold
                                        leading-snug
                                        text-slate-900
                                        transition
                                        group-hover:text-green-600
                                    ">
                                        {product.title}
                                    </h3>


                                    {/* PRICE */}
                                    <div className="mt-2">

                                        <p className="
                                            text-base
                                            font-extrabold
                                            text-green-600
                                            sm:text-lg
                                        ">
                                            {product.formatted_price ??
                                                `TZS ${Number(
                                                    product.price ?? 0
                                                ).toLocaleString()}`}
                                        </p>

                                    </div>


                                    {/* LOCATION */}
                                    {product.location && (

                                        <div className="
                                            mt-2
                                            flex
                                            min-w-0
                                            items-center
                                            gap-1.5
                                            text-xs
                                            text-slate-500
                                        ">

                                            <MapPin
                                                size={13}
                                                className="shrink-0"
                                            />

                                            <span className="truncate">
                                                {product.location}
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
                    <div className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        px-6
                        py-14
                        text-center
                        sm:py-20
                    ">

                        {/* ICON */}
                        <div className="
                            mx-auto
                            flex
                            h-20
                            w-20
                            items-center
                            justify-center
                            rounded-full
                            bg-green-50
                            text-green-600
                        ">

                            <Package size={38} />

                        </div>


                        {/* TITLE */}
                        <h3 className="
                            mt-5
                            text-xl
                            font-bold
                            text-slate-900
                        ">
                            Hakuna bidhaa bado
                        </h3>


                        {/* DESCRIPTION */}
                        <p className="
                            mx-auto
                            mt-2
                            max-w-md
                            text-sm
                            leading-6
                            text-slate-500
                        ">

                            Hakuna bidhaa zilizowekwa kwenye category ya{" "}

                            <strong className="
                                font-semibold
                                text-slate-700
                            ">
                                {categoryName}
                            </strong>{" "}

                            bado.

                        </p>


                        {/* BROWSE MARKETPLACE */}
                        <Link
                            href={route("marketplace.index")}
                            className="
                                mt-6
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                bg-green-600
                                px-6
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                transition
                                hover:bg-green-700
                                focus:outline-none
                                focus:ring-2
                                focus:ring-green-500
                                focus:ring-offset-2
                            "
                        >
                            <ChevronRight size={18} />

                            Browse Marketplace
                        </Link>

                    </div>

                )}


                {/* =====================================================
                    PAGINATION
                ====================================================== */}
                {listings?.links &&
                    listings.links.length > 3 && (

                        <div className="
                            mt-8
                            flex
                            flex-wrap
                            items-center
                            justify-center
                            gap-2
                        ">

                            {listings.links.map((link, index) => {

                                const label = link.label
                                    ?.replace("&laquo;", "«")
                                    ?.replace("&raquo;", "»");

                                /* =================================================
                                    DISABLED PAGINATION
                                ================================================== */
                                if (!link.url) {

                                    return (
                                        <span
                                            key={index}
                                            className="
                                                rounded-xl
                                                bg-slate-100
                                                px-3.5
                                                py-2
                                                text-sm
                                                text-slate-400
                                            "
                                            dangerouslySetInnerHTML={{
                                                __html: label,
                                            }}
                                        />
                                    );

                                }


                                /* =================================================
                                    ACTIVE / NORMAL PAGINATION
                                ================================================== */
                                return (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        preserveScroll
                                        className={`
                                            rounded-xl
                                            px-3.5
                                            py-2
                                            text-sm
                                            font-medium
                                            transition
                                            ${
                                                link.active
                                                    ? "bg-green-600 text-white shadow-sm"
                                                    : "border border-slate-200 bg-white text-slate-700 hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                            }
                                        `}
                                        dangerouslySetInnerHTML={{
                                            __html: label,
                                        }}
                                    />
                                );

                            })}

                        </div>

                    )}

            </div>

        </MarketplaceBrowseLayout>
    );
}

