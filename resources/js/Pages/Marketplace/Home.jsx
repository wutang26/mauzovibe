import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Home({
    categories = [],
    quickCategories = [],
    featuredProducts = [],
    userLocation = 'Tabora, Tanzania',
}) {
    const { auth } = usePage().props;

    /*
    |--------------------------------------------------------------------------
    | CATEGORY VIEW MORE
    |--------------------------------------------------------------------------
    */
    const [showAllCategories, setShowAllCategories] = useState(false);


    /*
    |--------------------------------------------------------------------------
    | FIRST 7 CATEGORIES
    |--------------------------------------------------------------------------
    */
    const visibleQuickCategories = showAllCategories
        ? categories
        : quickCategories;


    /*
    |--------------------------------------------------------------------------
    | REMAINING CATEGORIES
    |--------------------------------------------------------------------------
    */
    const remainingCategories = categories.slice(7);


    return (
        <>
            <Head title="MauzoVibe Ecommerce - Nunua. Uza. Pata Deals." />

            <div className="min-h-screen bg-gray-50 overflow-x-hidden">

                {/* =========================================================
                    STICKY HEADER
                ========================================================= */}
                <header className="sticky top-0 z-[100] bg-white border-b border-gray-200 shadow-sm">

                    {/* ================= TOP HEADER ================= */}
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3">

                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">

                            {/* LOGO */}
                            <Link
                                href={route('marketplace.index')}
                                className="flex items-center gap-2 shrink-0"
                            >

                                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-md">

                                    <i className="fa-solid fa-store text-white text-sm sm:text-base"></i>

                                </div>


                                <div className="hidden min-[400px]:block">

                                    <div className="font-bold text-lg sm:text-xl leading-tight text-gray-900">
                                        MauzoVibe
                                    </div>

                                    <div className="text-[11px] text-gray-500 -mt-0.5">
                                        Ecommerce
                                    </div>

                                </div>

                            </Link>


                            {/* DESKTOP SEARCH */}
                            <div className="flex-1 max-w-2xl relative hidden sm:block">

                                <input
                                    type="text"
                                    placeholder="Tafuta bidhaa, mfano: iPhone 15, Laptop..."
                                    className="w-full border border-gray-300 rounded-full py-2.5 pl-5 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
                                />

                                <button
                                    type="button"
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white w-9 h-9 rounded-full flex items-center justify-center transition"
                                >
                                    <i className="fa-solid fa-magnifying-glass text-sm"></i>
                                </button>

                            </div>


                            {/* RIGHT ACTIONS */}
                            <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 ml-auto shrink-0">

                                {/* FAVOURITES */}
                                <Link
                                    href="#"
                                    className="relative flex items-center gap-1.5 text-gray-700 hover:text-green-600 transition"
                                >

                                    <i className="fa-regular fa-heart text-lg"></i>

                                    <span className="hidden md:inline text-sm">
                                        Favourites
                                    </span>

                                    <span className="absolute -top-1.5 -right-2 md:static md:ml-0.5 bg-green-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                                        1
                                    </span>

                                </Link>


                                {/* MESSAGES */}
                                <Link
                                    href="#"
                                    className="relative flex items-center gap-1.5 text-gray-700 hover:text-green-600 transition"
                                >

                                    <i className="fa-regular fa-comment text-lg"></i>

                                    <span className="hidden md:inline text-sm">
                                        Messages
                                    </span>

                                    <span className="absolute -top-1.5 -right-2 md:static md:ml-0.5 bg-green-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                                        2
                                    </span>

                                </Link>


                                {/* CART */}
                                <Link
                                    href="#"
                                    className="relative flex items-center gap-1.5 text-gray-700 hover:text-green-600 transition"
                                >

                                    <i className="fa-solid fa-cart-shopping text-lg"></i>

                                    <span className="hidden md:inline text-sm">
                                        Cart
                                    </span>

                                    <span className="absolute -top-1.5 -right-2 md:static md:ml-0.5 bg-green-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                                        1
                                    </span>

                                </Link>


                                {/* AUTH */}
                                {auth?.user ? (

                                    <Link
                                        href={route('marketplace.dashboard')}
                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm font-medium transition whitespace-nowrap flex items-center gap-1.5"
                                    >

                                        <i className="fa-solid fa-store"></i>

                                        <span className="hidden sm:inline">
                                            Seller Dashboard
                                        </span>

                                        <span className="sm:hidden">
                                            Seller
                                        </span>

                                    </Link>

                                ) : (

                                    <Link
                                        href={route('login')}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-medium flex items-center gap-2 transition text-sm sm:text-base whitespace-nowrap"
                                    >

                                        <i className="fa-solid fa-upload"></i>

                                        <span>
                                            Uza Bidhaa
                                        </span>

                                    </Link>

                                )}

                            </div>

                        </div>


                        {/* MOBILE SEARCH */}
                        <div className="mt-2.5 sm:hidden">

                            <div className="relative">

                                <input
                                    type="text"
                                    placeholder="Tafuta bidhaa..."
                                    className="w-full border border-gray-300 rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
                                />

                                <button
                                    type="button"
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white w-9 h-9 rounded-full flex items-center justify-center transition"
                                >

                                    <i className="fa-solid fa-magnifying-glass text-sm"></i>

                                </button>

                            </div>

                        </div>

                    </div>


                    {/* =====================================================
                        SECONDARY NAV
                    ===================================================== */}
                    <div className="border-t border-gray-100 bg-white">

                        <div className="max-w-7xl mx-auto px-3 sm:px-4">

                            <div className="flex items-center justify-between py-2 text-sm gap-2">

                                <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 overflow-x-auto scrollbar-hide flex-1 min-w-0 pb-0.5">

                                    {/* CATEGORIES */}
                                    <button
                                        type="button"
                                        onClick={() => setShowAllCategories(true)}
                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium text-sm whitespace-nowrap shrink-0 transition"
                                    >

                                        <i className="fa-solid fa-bars"></i>

                                        <span className="hidden min-[380px]:inline">
                                            Categories
                                        </span>

                                    </button>


                                    {/* HOME */}
                                    <Link
                                        href={route('marketplace.index')}
                                        className="font-semibold text-green-600 border-b-2 border-green-600 pb-0.5 whitespace-nowrap shrink-0"
                                    >
                                        Home
                                    </Link>


                                    {/* NEW */}
                                    <Link
                                        href={route('marketplace.new')}
                                        className="text-gray-700 hover:text-green-600 transition whitespace-nowrap shrink-0"
                                    >
                                        Bidhaa Mpya
                                    </Link>


                                    {/* USED */}
                                    <Link
                                        href={route('marketplace.used')}
                                        className="text-gray-700 hover:text-green-600 transition whitespace-nowrap shrink-0"
                                    >
                                        Bidhaa Zilizotumika
                                    </Link>


                                    {/* STORES */}
                                    <Link
                                        href={route("marketplace.stores")}
                                        className="text-gray-700 hover:text-green-600 transition whitespace-nowrap shrink-0 hidden sm:inline"
                                    >
                                        Maduka
                                    </Link>


                                    {/* OFFERS */}
                                    <Link
                                         href={route("marketplace.offers")}
                                        className="text-gray-700 hover:text-green-600 transition whitespace-nowrap shrink-0 hidden md:inline"
                                    >
                                        Ofa Maalum
                                    </Link>


                                    {/* HELP */}
                                    <Link
                                        href={route("marketplace.help")}
                                        className="text-gray-700 hover:text-green-600 transition whitespace-nowrap shrink-0 hidden lg:inline"
                                    >
                                        Msaada
                                    </Link>

                                </div>


                                {/* LOCATION */}
                                <div className="flex items-center gap-1.5 text-gray-600 shrink-0 pl-2 bg-white">

                                    <i className="fa-solid fa-location-dot text-green-600"></i>

                                    <span className="hidden sm:inline truncate max-w-[120px] lg:max-w-none text-sm">
                                        {userLocation}
                                    </span>

                                    <span className="sm:hidden text-xs">
                                        Tabora
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </header>


                {/* =========================================================
                    MAIN
                ========================================================= */}
                <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">

                    <div className="flex gap-4 lg:gap-6">

                        {/* =================================================
                            LEFT SIDEBAR
                        ================================================= */}
                        <aside className="w-64 shrink-0 hidden lg:block">

                            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden sticky top-[145px]">

                                <div className="bg-green-600 text-white px-4 py-3.5 font-semibold flex items-center gap-2">

                                    <i className="fa-solid fa-bars"></i>

                                    Categories

                                </div>


                                <nav className="divide-y divide-gray-100 max-h-[620px] overflow-y-auto">

                                    {categories.length > 0 ? (

                                        categories.map((cat) => (

                                            <Link
                                                key={cat.id}
                                                href={`/marketplace/category/${cat.slug}`}
                                                className="flex items-center justify-between px-4 py-3 hover:bg-green-50 transition group"
                                            >

                                                <span className="flex items-center gap-3 text-gray-700 group-hover:text-green-700 min-w-0">

                                                    <i
                                                        className={`fa-solid ${cat.icon || 'fa-tag'} w-5 text-gray-400 group-hover:text-green-600 shrink-0`}
                                                    ></i>

                                                    <span className="truncate">
                                                        {cat.name}
                                                    </span>

                                                </span>


                                                <i className="fa-solid fa-chevron-right text-xs text-gray-300 group-hover:text-green-500 shrink-0"></i>

                                            </Link>

                                        ))

                                    ) : (

                                        <div className="px-4 py-6 text-sm text-gray-400 text-center">
                                            Hakuna kategoria bado
                                        </div>

                                    )}

                                </nav>

                            </div>

                        </aside>


                        {/* =================================================
                            RIGHT CONTENT
                        ================================================= */}
                        <div className="flex-1 space-y-5 sm:space-y-6 min-w-0">


                            {/* =================================================
                                HERO
                            ================================================= */}
                            <div className="relative bg-gradient-to-br from-green-950 via-green-900 to-green-800 rounded-xl sm:rounded-2xl overflow-hidden text-white shadow-lg">

                                <div className="absolute inset-y-0 right-0 w-[55%] md:w-[52%] pointer-events-none">

                                    <div className="absolute inset-0 bg-gradient-to-l from-emerald-50/10 via-emerald-50/5 to-transparent rounded-l-[100%] scale-y-[1.35] origin-right translate-x-8 md:translate-x-12"></div>

                                    <div className="absolute inset-0 bg-gradient-to-l from-white/10 to-transparent rounded-l-[90%] scale-y-[1.2] origin-right translate-x-4 opacity-60"></div>

                                </div>


                                <div className="relative grid md:grid-cols-2 gap-6 p-5 sm:p-8 md:p-10 lg:p-12 items-center">

                                    {/* HERO LEFT */}
                                    <div className="relative z-10">

                                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight mb-2 sm:mb-3">
                                            Nunua. Uza. Pata Deals.
                                        </h1>


                                        <p className="text-green-100/90 mb-5 sm:mb-7 max-w-md text-sm md:text-base leading-relaxed">
                                            Bidhaa mpya na zilizotumika kwa bei nafuu na karibu nawe.
                                        </p>


                                        <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-6 sm:mb-8">

                                            <Link
                                                href="#"
                                                className="bg-green-500 hover:bg-green-400 text-white px-5 sm:px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition shadow-md text-sm sm:text-base"
                                            >

                                                <i className="fa-solid fa-bag-shopping"></i>

                                                Nunua Sasa

                                            </Link>


                                            {auth?.user ? (

                                                <Link
                                                    href={route('marketplace.dashboard')}
                                                    className="bg-white/10 hover:bg-white/20 border border-white/25 text-white px-5 sm:px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition backdrop-blur-sm text-sm sm:text-base"
                                                >

                                                    <i className="fa-solid fa-store"></i>

                                                    Seller Dashboard

                                                </Link>

                                            ) : (

                                                <Link
                                                    href={route('login')}
                                                    className="bg-white/10 hover:bg-white/20 border border-white/25 text-white px-5 sm:px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition backdrop-blur-sm text-sm sm:text-base"
                                                >

                                                    <i className="fa-solid fa-upload"></i>

                                                    Uza Bidhaa

                                                </Link>

                                            )}

                                        </div>


                                        <div className="flex flex-wrap gap-x-5 gap-y-2.5 sm:gap-x-6 text-sm text-green-100/90">

                                            <div className="flex items-center gap-2">

                                                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">

                                                    <i className="fa-solid fa-shield-halved text-xs"></i>

                                                </div>

                                                <span>
                                                    Salama
                                                </span>

                                            </div>


                                            <div className="flex items-center gap-2">

                                                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">

                                                    <i className="fa-solid fa-bolt text-xs"></i>

                                                </div>

                                                <span>
                                                    Haraka
                                                </span>

                                            </div>


                                            <div className="flex items-center gap-2">

                                                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">

                                                    <i className="fa-solid fa-location-dot text-xs"></i>

                                                </div>

                                                <span>
                                                    Karibu Nawe
                                                </span>

                                            </div>

                                        </div>

                                    </div>


                                    {/* HERO RIGHT */}
                                    <div className="hidden md:flex justify-center items-center relative min-h-[280px]">

                                        <div className="absolute top-2 right-4 lg:right-8 bg-white text-green-900 rounded-2xl px-4 py-2.5 text-xs font-semibold shadow-xl flex items-center gap-2.5 z-20">

                                            <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center">

                                                <i className="fa-solid fa-star text-white text-[11px]"></i>

                                            </div>


                                            <div>

                                                <div className="leading-tight">
                                                    Matangazo Bora
                                                </div>

                                                <div className="font-normal text-[10px] text-gray-500 mt-0.5">
                                                    Pata bidhaa bora kwa bei nafuu!
                                                </div>

                                            </div>

                                        </div>


                                        <div className="relative z-10 flex items-end gap-3 lg:gap-4">

                                            <div className="flex flex-col gap-2 -rotate-6">

                                                <div className="w-16 h-28 bg-gradient-to-b from-gray-800 to-black rounded-xl border-2 border-gray-700 shadow-2xl"></div>

                                                <div className="w-14 h-24 bg-gradient-to-b from-green-700 to-green-900 rounded-xl border-2 border-green-600 shadow-xl -ml-3"></div>

                                            </div>


                                            <div className="flex flex-col items-center gap-3">

                                                <div className="w-14 h-16 bg-black rounded-2xl border border-gray-700 shadow-xl"></div>

                                                <div className="w-16 h-10 bg-white rounded-xl shadow-lg"></div>

                                            </div>


                                            <div className="w-40 h-28 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg shadow-2xl border border-gray-300 relative overflow-hidden">

                                                <div className="absolute inset-1 bg-gradient-to-br from-green-600 to-green-900 rounded-md opacity-80"></div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* =================================================
                                QUICK CATEGORIES
                            ================================================= */}
                            <section>

                                {/* SECTION HEADER */}
                                <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">

                                    <div>

                                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">

                                            Categories

                                            <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                                {categories.length}
                                            </span>

                                        </h2>

                                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                            Chagua aina ya bidhaa unayotafuta
                                        </p>

                                    </div>


                                    {/* VIEW MORE */}
                                    {categories.length > 7 && (

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowAllCategories(
                                                    !showAllCategories
                                                )
                                            }
                                            className="inline-flex items-center gap-1.5 text-green-600 hover:text-green-700 font-semibold text-sm whitespace-nowrap transition"
                                        >

                                            {showAllCategories
                                                ? 'Funga categories'
                                                : 'View all categories'}

                                            <i
                                                className={`fa-solid ${
                                                    showAllCategories
                                                        ? 'fa-chevron-up'
                                                        : 'fa-chevron-down'
                                                } text-xs`}
                                            ></i>

                                        </button>

                                    )}

                                </div>


                                {/* CATEGORY GRID */}
                                <div className="grid grid-cols-2 min-[400px]:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2.5 sm:gap-3">

                                    {visibleQuickCategories.length > 0 ? (

                                        visibleQuickCategories.map((cat) => (

                                            <Link
                                                key={cat.id}
                                                href={`/marketplace/category/${cat.slug}`}
                                                className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 text-center hover:shadow-md hover:border-green-400 hover:-translate-y-0.5 transition-all group"
                                            >

                                                {/* ICON */}
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1.5 sm:mb-2 bg-green-50 text-green-600 rounded-xl flex items-center justify-center group-hover:bg-green-100 group-hover:scale-105 transition">

                                                    <i
                                                        className={`fa-solid ${
                                                            cat.icon || 'fa-tag'
                                                        } text-lg sm:text-xl`}
                                                    ></i>

                                                </div>


                                                {/* NAME */}
                                                <div className="font-semibold text-xs sm:text-sm text-gray-800 line-clamp-1 group-hover:text-green-700">
                                                    {cat.name}
                                                </div>


                                                {/* COUNT */}
                                                <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5">

                                                    {Number(
                                                        cat.listings_count ||
                                                        cat.products_count ||
                                                        0
                                                    ).toLocaleString()}

                                                    {' '}

                                                    bidhaa

                                                </div>

                                            </Link>

                                        ))

                                    ) : (

                                        <div className="col-span-full bg-white border border-gray-200 rounded-xl p-8 text-center">

                                            <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">

                                                <i className="fa-solid fa-tags text-gray-400"></i>

                                            </div>

                                            <p className="text-sm text-gray-400">
                                                Hakuna kategoria bado
                                            </p>

                                        </div>

                                    )}

                                </div>


                                {/* VIEW ALL INFO */}
                                {!showAllCategories &&
                                    remainingCategories.length > 0 && (

                                        <div className="mt-3">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowAllCategories(true)
                                                }
                                                className="w-full bg-white border border-dashed border-green-300 hover:border-green-500 hover:bg-green-50 rounded-xl py-3 px-4 flex items-center justify-center gap-2 text-green-700 font-medium text-sm transition"
                                            >

                                                <i className="fa-solid fa-grid-2"></i>

                                                <span>
                                                    View {remainingCategories.length} more categories
                                                </span>

                                                <i className="fa-solid fa-arrow-down text-xs"></i>

                                            </button>

                                        </div>

                                    )}

                            </section>


                            {/* =================================================
                                FEATURED PRODUCTS
                            ================================================= */}
                            <section>

                                <div className="flex items-center justify-between mb-3 sm:mb-4 gap-3">

                                    <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-gray-900">

                                        Bidhaa Maarufu

                                        <span className="bg-green-600 text-white text-xs px-2 sm:px-2.5 py-0.5 rounded-full font-medium">
                                            Mpya
                                        </span>

                                    </h2>


                                    <Link
                                        href="#"
                                        className="text-green-600 text-sm font-medium hover:underline whitespace-nowrap"
                                    >
                                        Tazama zote →
                                    </Link>

                                </div>


                                {featuredProducts.length > 0 ? (

                                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4">

                                        {featuredProducts.map((product) => (

                                            <Link
                                                key={product.id}
                                                href={`/marketplace/listing/${product.slug}`}
                                                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition group"
                                            >

                                                <div className="relative aspect-[4/3] bg-gray-100">

                                                    <img
                                                        src={
                                                            product.image ||
                                                            'https://via.placeholder.com/300x220?text=No+Image'
                                                        }
                                                        alt={product.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                                        loading="lazy"
                                                    />


                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                        }}
                                                        className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shadow-sm transition"
                                                    >

                                                        <i className="fa-regular fa-heart text-gray-600 text-sm"></i>

                                                    </button>

                                                </div>


                                                <div className="p-2.5 sm:p-3.5">

                                                    <h3 className="font-medium text-xs sm:text-sm text-gray-900 line-clamp-2 leading-snug">
                                                        {product.title}
                                                    </h3>


                                                    <div className="text-green-600 font-bold mt-1 sm:mt-1.5 text-sm sm:text-[15px]">
                                                        {product.formatted_price}
                                                    </div>


                                                    <div className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-1.5 flex items-center gap-1">

                                                        <i className="fa-solid fa-location-dot text-[9px] sm:text-[10px]"></i>

                                                        <span className="truncate">
                                                            {product.location}
                                                        </span>

                                                    </div>


                                                    <div className="text-[10px] sm:text-xs mt-0.5 sm:mt-1 capitalize text-gray-500">
                                                        {product.condition}
                                                    </div>

                                                </div>

                                            </Link>

                                        ))}

                                    </div>

                                ) : (

                                    <div className="bg-white border rounded-xl p-8 sm:p-12 text-center text-gray-400">

                                        <div className="text-4xl mb-3">
                                            <i className="fa-solid fa-box-open"></i>
                                        </div>


                                        <p className="text-sm sm:text-base mb-5">
                                            Hakuna bidhaa bado. Kuwa wa kwanza kuweka!
                                        </p>


                                        {auth?.user ? (

                                            <Link
                                                href={route('marketplace.dashboard')}
                                                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 sm:px-6 py-2.5 rounded-xl font-medium transition text-sm sm:text-base"
                                            >

                                                <i className="fa-solid fa-store"></i>

                                                Seller Dashboard

                                            </Link>

                                        ) : (

                                            <Link
                                                href={route('login')}
                                                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 sm:px-6 py-2.5 rounded-xl font-medium transition text-sm sm:text-base"
                                            >

                                                <i className="fa-solid fa-upload"></i>

                                                Uza Bidhaa

                                            </Link>

                                        )}

                                    </div>

                                )}

                            </section>

                        </div>

                    </div>

                </main>


                {/* =========================================================
                    BENEFITS
                ========================================================= */}
                <div className="bg-white border-t mt-8 sm:mt-10">

                    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-7 grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">

                        {/* BENEFIT 1 */}
                        <div className="flex items-start gap-3">

                            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">

                                <i className="fa-solid fa-pen"></i>

                            </div>


                            <div>

                                <div className="font-semibold text-sm text-gray-900">
                                    Bure Kuorodhesha
                                </div>

                                <div className="text-xs text-gray-500 mt-0.5">
                                    Weka bidhaa zako bure
                                </div>

                            </div>

                        </div>


                        {/* BENEFIT 2 */}
                        <div className="flex items-start gap-3">

                            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">

                                <i className="fa-solid fa-comments"></i>

                            </div>


                            <div>

                                <div className="font-semibold text-sm text-gray-900">
                                    Wasiliana Moja kwa Moja
                                </div>

                                <div className="text-xs text-gray-500 mt-0.5">
                                    Ongea na muuzaji moja kwa moja
                                </div>

                            </div>

                        </div>


                        {/* BENEFIT 3 */}
                        <div className="flex items-start gap-3">

                            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">

                                <i className="fa-solid fa-shield-halved"></i>

                            </div>


                            <div>

                                <div className="font-semibold text-sm text-gray-900">
                                    Salama na Iaminika
                                </div>

                                <div className="text-xs text-gray-500 mt-0.5">
                                    Tunazingatia usalama wako
                                </div>

                            </div>

                        </div>


                        {/* BENEFIT 4 */}
                        <div className="flex items-start gap-3">

                            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">

                                <i className="fa-solid fa-headset"></i>

                            </div>


                            <div>

                                <div className="font-semibold text-sm text-gray-900">
                                    Huduma kwa Wateja
                                </div>

                                <div className="text-xs text-gray-500 mt-0.5">
                                    Tupo kusaidia 24/7
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}