
import { Head, Link } from "@inertiajs/react";
import MarketplaceBrowseLayout from "@/Layouts/MarketplaceBrowseLayout";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Favourites({ favourites = [] }) {
    return (
        <MarketplaceBrowseLayout title="Favourites - MauzoVibe Marketplace">

            <div className="w-full">

                {/* PAGE HEADER */}
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <i className="fa-regular fa-heart text-green-600"></i>

                                Favourites
                            </h1>

                            <p className="text-sm text-gray-500 mt-1">
                                Bidhaa ulizozihifadhi
                            </p>
                        </div>

                        <Link
                            href={route("marketplace.index")}
                            className="inline-flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-green-600 transition"
                        >
                            <i className="fa-solid fa-arrow-left"></i>

                            Marketplace
                        </Link>

                    </div>
                </div>


                {/* FAVOURITES */}
                {favourites.length > 0 ? (

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">

                        {favourites.map((product) => (

                            <Link
                                key={product.id}
                                href={`/marketplace/listing/${product.slug}`}
                                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-green-300 transition group"
                            >

                                {/* IMAGE */}
                                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">

                                    <img
                                        src={
                                            product.image ||
                                            "https://via.placeholder.com/300x220?text=No+Image"
                                        }
                                        alt={product.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                        loading="lazy"
                                    />

                                    {/* HEART */}
                                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center">
                                        <i className="fa-solid fa-heart text-green-600 text-sm"></i>
                                    </div>

                                </div>


                                {/* DETAILS */}
                                <div className="p-2.5 sm:p-3">

                                    <h3 className="font-medium text-xs sm:text-sm text-gray-900 line-clamp-2 leading-snug">
                                        {product.title}
                                    </h3>

                                    <div className="text-green-600 font-bold mt-1 text-sm sm:text-base">
                                        {product.formatted_price}
                                    </div>

                                    <div className="text-[10px] sm:text-xs text-gray-500 mt-1 flex items-center gap-1">

                                        <i className="fa-solid fa-location-dot text-[9px]"></i>

                                        <span className="truncate">
                                            {product.location || "Tanzania"}
                                        </span>

                                    </div>

                                    {product.condition && (
                                        <div className="text-[10px] sm:text-xs text-gray-500 mt-1 capitalize">
                                            {product.condition}
                                        </div>
                                    )}

                                </div>

                            </Link>

                        ))}

                    </div>

                ) : (

                    /* EMPTY STATE */
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-16 text-center">

                        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-5">

                            <i className="fa-regular fa-heart text-3xl text-green-600"></i>

                        </div>

                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                            Hakuna Favourite bado
                        </h2>

                        <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                            Bidhaa utakazopenda na kuzihifadhi zitaonekana hapa.
                        </p>

                        <Link
                            href={route("marketplace.index")}
                            className="inline-flex items-center gap-2 mt-6 bg-green-600 hover:bg-green-700 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium transition text-sm"
                        >
                            <i className="fa-solid fa-bag-shopping"></i>

                            Endelea Kununua
                        </Link>

                    </div>

                )}

            </div>

        </MarketplaceBrowseLayout>
    );
}

