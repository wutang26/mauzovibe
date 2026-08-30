import MarketplacePublicLayout from "@/Layouts/MarketplacePublicLayout";
import { Head, Link } from "@inertiajs/react";

export default function Search({
    query,
    products,
    categories,
    userLocation,
}) {
    const results = products?.data ?? [];

    return (
        <>
            <Head title={`Search: ${query}`} />

            <MarketplacePublicLayout
                categories={categories}
                userLocation={userLocation}
            >
                <div className="py-2 sm:py-4">

                    {/* =====================================================
                        SEARCH HEADER
                    ===================================================== */}
                    <div className="mb-6">

                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                            Matokeo ya utafutaji
                        </h1>

                        {query && (
                            <p className="mt-1 text-sm text-slate-500">
                                Matokeo ya:{" "}
                                <span className="font-semibold text-slate-800">
                                    "{query}"
                                </span>
                            </p>
                        )}

                        <p className="mt-1 text-sm text-slate-500">
                            {products?.total ?? 0} bidhaa zimepatikana
                        </p>

                    </div>


                    {/* =====================================================
                        RESULTS
                    ===================================================== */}
                    {results.length > 0 ? (

                        <div className="
                            grid
                            grid-cols-2
                            sm:grid-cols-2
                            md:grid-cols-3
                            lg:grid-cols-4
                            gap-3
                            sm:gap-4
                        ">

                            {results.map((product) => (

                                <Link
                                    key={product.id}
                                   href={route(
                                    "marketplace.listing.show",
                                    {
                                        listing: product.slug,
                                    }
                                )}
                                    className="
                                        group
                                        overflow-hidden
                                        rounded-xl
                                        bg-white
                                        border
                                        border-gray-200
                                        shadow-sm
                                        hover:shadow-md
                                        transition
                                    "
                                >

                                    {/* IMAGE */}
                                    <div className="
                                        relative
                                        aspect-square
                                        bg-gray-100
                                        overflow-hidden
                                    ">

                                        {product.image ? (

                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="
                                                    h-full
                                                    w-full
                                                    object-cover
                                                    group-hover:scale-105
                                                    transition
                                                    duration-300
                                                "
                                            />

                                        ) : (

                                            <div className="
                                                h-full
                                                w-full
                                                flex
                                                items-center
                                                justify-center
                                                text-gray-400
                                            ">
                                                <i className="fa-solid fa-image text-3xl"></i>
                                            </div>

                                        )}

                                        {/* CONDITION */}
                                        {product.condition && (
                                            <span className="
                                                absolute
                                                top-2
                                                left-2
                                                bg-white/95
                                                text-gray-700
                                                text-[10px]
                                                sm:text-xs
                                                font-medium
                                                px-2
                                                py-1
                                                rounded-full
                                                shadow-sm
                                            ">
                                                {product.condition === "new"
                                                    ? "Mpya"
                                                    : "Imetumika"}
                                            </span>
                                        )}

                                    </div>


                                    {/* PRODUCT INFO */}
                                    <div className="p-3 sm:p-4">

                                        <h2 className="
                                            text-sm
                                            sm:text-base
                                            font-semibold
                                            text-slate-900
                                            line-clamp-2
                                            group-hover:text-green-600
                                            transition
                                        ">
                                            {product.title}
                                        </h2>


                                        <p className="
                                            mt-2
                                            text-sm
                                            sm:text-base
                                            font-bold
                                            text-green-600
                                        ">
                                            {product.formatted_price}
                                        </p>


                                        {product.location && (
                                            <p className="
                                                mt-1.5
                                                flex
                                                items-center
                                                gap-1
                                                text-xs
                                                sm:text-sm
                                                text-slate-500
                                                truncate
                                            ">
                                                <i className="fa-solid fa-location-dot text-green-600"></i>

                                                <span className="truncate">
                                                    {product.location}
                                                </span>
                                            </p>
                                        )}


                                        {product.category?.name && (
                                            <p className="
                                                mt-1
                                                text-xs
                                                text-gray-400
                                                truncate
                                            ">
                                                {product.category.name}
                                            </p>
                                        )}

                                    </div>

                                </Link>

                            ))}

                        </div>

                    ) : (

                        /* =================================================
                           NO RESULTS
                        ================================================== */
                        <div className="
                            rounded-2xl
                            bg-white
                            border
                            border-gray-200
                            p-10
                            sm:p-14
                            text-center
                            shadow-sm
                        ">

                            <div className="
                                mx-auto
                                mb-4
                                w-16
                                h-16
                                rounded-full
                                bg-green-50
                                text-green-600
                                flex
                                items-center
                                justify-center
                            ">
                                <i className="fa-solid fa-magnifying-glass text-2xl"></i>
                            </div>


                            <h2 className="
                                text-lg
                                sm:text-xl
                                font-semibold
                                text-slate-800
                            ">
                                Hakuna bidhaa iliyopatikana
                            </h2>


                            <p className="
                                mt-2
                                text-sm
                                text-slate-500
                            ">
                                Hatukupata bidhaa inayolingana na{" "}
                                <span className="font-semibold text-slate-700">
                                    "{query}"
                                </span>.
                            </p>


                            <p className="
                                mt-1
                                text-sm
                                text-slate-500
                            ">
                                Jaribu kutumia jina tofauti la bidhaa,
                                category, mji au jina la muuzaji.
                            </p>


                            <Link
                                href={route("marketplace.index")}
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    mt-6
                                    px-5
                                    py-2.5
                                    rounded-xl
                                    bg-green-600
                                    hover:bg-green-700
                                    text-white
                                    text-sm
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
                    ===================================================== */}
                    {products?.links?.length > 3 && (

                        <div className="
                            mt-8
                            flex
                            flex-wrap
                            justify-center
                            gap-1
                        ">

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
                                                : "bg-white text-gray-700 border-gray-200 hover:bg-green-50"
                                        }
                                        ${
                                            !link.url
                                                ? "opacity-40 pointer-events-none"
                                                : ""
                                        }
                                    `}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />

                            ))}

                        </div>

                    )}

                </div>
            </MarketplacePublicLayout>
        </>
    );
}

