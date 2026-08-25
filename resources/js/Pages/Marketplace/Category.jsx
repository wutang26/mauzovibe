import { Head, Link } from "@inertiajs/react";
import MarketplaceLayout from "@/Layouts/MarketplaceLayout";

export default function Category({
    category,
    listings,
}) {
    const products = listings?.data ?? [];

    return (
        <MarketplaceLayout>

            <Head title={`${category.name} - Marketplace`} />

            <div className="min-h-screen bg-slate-50">

                {/* =====================================================
                    HEADER
                ====================================================== */}

                <div className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">

                            <Link
                                href="/marketplace"
                                className="hover:text-green-600"
                            >
                                Marketplace
                            </Link>

                            <span>/</span>

                            <span className="text-slate-900">
                                {category.name}
                            </span>

                        </div>


                        <div className="flex items-center justify-between gap-4">

                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                                    {category.name}
                                </h1>

                                <p className="mt-1 text-slate-500">
                                    Bidhaa za {category.name} zinazopatikana
                                    kwenye MauzoVibe.
                                </p>
                            </div>

                            <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl bg-green-50 text-green-600 text-2xl">
                                {category.icon ? "●" : "●"}
                            </div>

                        </div>

                    </div>
                </div>


                {/* =====================================================
                    CONTENT
                ====================================================== */}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* RESULTS COUNT */}

                    <div className="flex items-center justify-between mb-6">

                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">
                                Bidhaa za {category.name}
                            </h2>

                            <p className="text-sm text-slate-500">
                                {listings?.total ?? 0} bidhaa
                            </p>
                        </div>

                    </div>


                    {/* =================================================
                        PRODUCTS
                    ================================================== */}

                    {products.length > 0 ? (

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

                            {products.map((product) => (

                                <Link
                                    key={product.id}
                                    href={`/marketplace/product/${product.slug}`}
                                    className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition"
                                >

                                    {/* IMAGE */}

                                    <div className="aspect-square bg-slate-100 overflow-hidden">

                                        {product.image ? (

                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                            />

                                        ) : (

                                            <div className="w-full h-full flex items-center justify-center text-slate-400">

                                                <div className="text-center">
                                                    <div className="text-4xl mb-2">
                                                        📦
                                                    </div>

                                                    <span className="text-xs">
                                                        Hakuna picha
                                                    </span>
                                                </div>

                                            </div>

                                        )}

                                    </div>


                                    {/* DETAILS */}

                                    <div className="p-4">

                                        <h3 className="font-medium text-slate-900 line-clamp-2 group-hover:text-green-600 transition">
                                            {product.title}
                                        </h3>


                                        <div className="mt-2">

                                            <p className="text-lg font-bold text-green-600">
                                                {product.formatted_price}
                                            </p>

                                        </div>


                                        <div className="mt-2 flex items-center justify-between text-xs text-slate-500">

                                            <span>
                                                {product.location}
                                            </span>

                                            {product.condition && (
                                                <span className="capitalize">
                                                    {product.condition}
                                                </span>
                                            )}

                                        </div>

                                    </div>

                                </Link>

                            ))}

                        </div>

                    ) : (

                        /* =================================================
                            EMPTY STATE
                        ================================================== */

                        <div className="bg-white border border-slate-200 rounded-2xl py-16 px-6 text-center">

                            <div className="text-6xl mb-4">
                                📦
                            </div>

                            <h3 className="text-xl font-semibold text-slate-900">
                                Hakuna bidhaa bado
                            </h3>

                            <p className="mt-2 text-slate-500 max-w-md mx-auto">
                                Hakuna bidhaa zilizowekwa kwenye category ya{" "}
                                <strong>{category.name}</strong> bado.
                            </p>

                            <Link
                                href="/marketplace/dashboard"
                                className="inline-flex mt-6 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                            >
                                Weka Bidhaa
                            </Link>

                        </div>

                    )}


                    {/* =================================================
                        PAGINATION
                    ================================================== */}

                    {listings?.links && listings.links.length > 3 && (

                        <div className="flex flex-wrap justify-center gap-2 mt-8">

                            {listings.links.map((link, index) => (

                                link.url ? (

                                    <Link
                                        key={index}
                                        href={link.url}
                                        preserveScroll
                                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                            link.active
                                                ? "bg-green-600 text-white"
                                                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />

                                ) : (

                                    <span
                                        key={index}
                                        className="px-4 py-2 rounded-lg text-sm text-slate-400 bg-slate-100"
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />

                                )

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </MarketplaceLayout>
    );
}