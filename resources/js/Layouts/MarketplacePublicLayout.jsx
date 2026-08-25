import { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function MarketplacePublicLayout({
    children,
    title = "MauzoVibe Ecommerce",
    categories = [],
    userLocation = "Tabora, Tanzania",
}) {
    const { auth } = usePage().props;

    const [showCategories, setShowCategories] = useState(false);

    return (
        <>
            <Head title={title} />

            <div className="min-h-screen bg-gray-50 overflow-x-hidden flex flex-col">

                {/* =========================================================
                    STICKY PUBLIC HEADER
                ========================================================= */}
                <header className="sticky top-0 z-[100] bg-white border-b border-gray-200 shadow-sm">

                    {/* =====================================================
                        TOP HEADER
                    ====================================================== */}
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3">

                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">

                            {/* =================================================
                                LOGO
                            ================================================== */}
                            <Link
                                href={route("marketplace.index")}
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


                            {/* =================================================
                                DESKTOP SEARCH
                            ================================================== */}
                            <div className="flex-1 max-w-2xl relative hidden sm:block">

                                <input
                                    type="text"
                                    placeholder="Tafuta bidhaa, mfano: iPhone 15, Laptop..."
                                    className="
                                        w-full
                                        border border-gray-300
                                        rounded-full
                                        py-2.5
                                        pl-5
                                        pr-14
                                        text-sm
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-green-500/30
                                        focus:border-green-500
                                    "
                                />

                                <button
                                    type="button"
                                    className="
                                        absolute
                                        right-1.5
                                        top-1/2
                                        -translate-y-1/2
                                        bg-green-600
                                        hover:bg-green-700
                                        text-white
                                        w-9
                                        h-9
                                        rounded-full
                                        flex
                                        items-center
                                        justify-center
                                        transition
                                    "
                                >
                                    <i className="fa-solid fa-magnifying-glass text-sm"></i>
                                </button>

                            </div>


                            {/* =================================================
                                RIGHT ACTIONS
                            ================================================== */}
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

                                    <span className="
                                        absolute
                                        -top-1.5
                                        -right-2
                                        md:static
                                        md:ml-0.5
                                        bg-green-600
                                        text-white
                                        text-[10px]
                                        rounded-full
                                        w-4
                                        h-4
                                        flex
                                        items-center
                                        justify-center
                                    ">
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

                                    <span className="
                                        absolute
                                        -top-1.5
                                        -right-2
                                        md:static
                                        md:ml-0.5
                                        bg-green-600
                                        text-white
                                        text-[10px]
                                        rounded-full
                                        w-4
                                        h-4
                                        flex
                                        items-center
                                        justify-center
                                    ">
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

                                    <span className="
                                        absolute
                                        -top-1.5
                                        -right-2
                                        md:static
                                        md:ml-0.5
                                        bg-green-600
                                        text-white
                                        text-[10px]
                                        rounded-full
                                        w-4
                                        h-4
                                        flex
                                        items-center
                                        justify-center
                                    ">
                                        1
                                    </span>
                                </Link>


                                {/* =================================================
                                    AUTH
                                ================================================== */}
                                {auth?.user ? (

                                    <Link
                                        href={route("marketplace.dashboard")}
                                        className="
                                            bg-green-600
                                            hover:bg-green-700
                                            text-white
                                            px-3
                                            py-1.5
                                            sm:px-4
                                            sm:py-2
                                            rounded-full
                                            text-sm
                                            font-medium
                                            transition
                                            whitespace-nowrap
                                            flex
                                            items-center
                                            gap-1.5
                                        "
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
                                        href={route("login")}
                                        className="
                                            bg-green-600
                                            hover:bg-green-700
                                            text-white
                                            px-4
                                            sm:px-5
                                            py-2
                                            sm:py-2.5
                                            rounded-xl
                                            font-medium
                                            flex
                                            items-center
                                            gap-2
                                            transition
                                            text-sm
                                            sm:text-base
                                            whitespace-nowrap
                                        "
                                    >
                                        <i className="fa-solid fa-upload"></i>

                                        <span>
                                            Uza Bidhaa
                                        </span>
                                    </Link>

                                )}

                            </div>

                        </div>


                        {/* =====================================================
                            MOBILE SEARCH
                        ====================================================== */}
                        <div className="mt-2.5 sm:hidden">

                            <div className="relative">

                                <input
                                    type="text"
                                    placeholder="Tafuta bidhaa..."
                                    className="
                                        w-full
                                        border border-gray-300
                                        rounded-full
                                        py-2.5
                                        pl-4
                                        pr-12
                                        text-sm
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-green-500/30
                                        focus:border-green-500
                                    "
                                />

                                <button
                                    type="button"
                                    className="
                                        absolute
                                        right-1.5
                                        top-1/2
                                        -translate-y-1/2
                                        bg-green-600
                                        hover:bg-green-700
                                        text-white
                                        w-9
                                        h-9
                                        rounded-full
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >
                                    <i className="fa-solid fa-magnifying-glass text-sm"></i>
                                </button>

                            </div>

                        </div>

                    </div>


                    {/* =========================================================
                        SECONDARY NAVIGATION
                    ========================================================= */}
                    <div className="border-t border-gray-100 bg-white">

                        <div className="max-w-7xl mx-auto px-3 sm:px-4">

                            <div className="flex items-center justify-between py-2 text-sm gap-2">

                                {/* NAVIGATION */}
                                <div className="
                                    flex
                                    items-center
                                    gap-3
                                    sm:gap-4
                                    lg:gap-6
                                    overflow-x-auto
                                    scrollbar-hide
                                    flex-1
                                    min-w-0
                                ">

                                    {/* CATEGORIES */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowCategories(!showCategories)
                                        }
                                        className="
                                            bg-green-600
                                            hover:bg-green-700
                                            text-white
                                            px-3
                                            py-1.5
                                            rounded-lg
                                            flex
                                            items-center
                                            gap-1.5
                                            font-medium
                                            text-sm
                                            whitespace-nowrap
                                            shrink-0
                                        "
                                    >
                                        <i className="fa-solid fa-bars"></i>

                                        <span className="hidden min-[380px]:inline">
                                            Categories
                                        </span>
                                    </button>


                                    {/* HOME */}
                                    <Link
                                        href={route("marketplace.index")}
                                        className="
                                            text-gray-700
                                            hover:text-green-600
                                            transition
                                            whitespace-nowrap
                                            shrink-0
                                        "
                                    >
                                        Home
                                    </Link>


                                    {/* NEW */}
                                    <Link
                                        href={route("marketplace.new")}
                                        className="
                                            text-gray-700
                                            hover:text-green-600
                                            transition
                                            whitespace-nowrap
                                            shrink-0
                                        "
                                    >
                                        Bidhaa Mpya
                                    </Link>


                                    {/* USED */}
                                    <Link
                                        href="#"
                                        className="
                                            text-gray-700
                                            hover:text-green-600
                                            transition
                                            whitespace-nowrap
                                            shrink-0
                                        "
                                    >
                                        Bidhaa Zinazotumika
                                    </Link>


                                    {/* STORES */}
                                    <Link
                                        href="#"
                                        className="
                                            text-gray-700
                                            hover:text-green-600
                                            transition
                                            whitespace-nowrap
                                            shrink-0
                                            hidden sm:inline
                                        "
                                    >
                                        Maduka
                                    </Link>


                                    {/* OFFERS */}
                                    <Link
                                        href="#"
                                        className="
                                            text-gray-700
                                            hover:text-green-600
                                            transition
                                            whitespace-nowrap
                                            shrink-0
                                            hidden md:inline
                                        "
                                    >
                                        Ofa Maalum
                                    </Link>


                                    {/* HELP */}
                                    <Link
                                        href="#"
                                        className="
                                            text-gray-700
                                            hover:text-green-600
                                            transition
                                            whitespace-nowrap
                                            shrink-0
                                            hidden lg:inline
                                        "
                                    >
                                        Msaada
                                    </Link>

                                </div>


                                {/* LOCATION */}
                                <div className="
                                    flex
                                    items-center
                                    gap-1.5
                                    text-gray-600
                                    shrink-0
                                    pl-2
                                    bg-white
                                ">
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
                    MOBILE CATEGORY DRAWER
                ========================================================= */}
                {showCategories && (
                    <div className="lg:hidden fixed inset-0 z-[90]">

                        {/* OVERLAY */}
                        <button
                            type="button"
                            aria-label="Close categories"
                            onClick={() => setShowCategories(false)}
                            className="absolute inset-0 bg-black/40"
                        />

                        {/* DRAWER */}
                        <aside className="
                            absolute
                            left-0
                            top-0
                            bottom-0
                            w-[290px]
                            max-w-[85vw]
                            bg-white
                            shadow-2xl
                            overflow-y-auto
                        ">

                            <div className="
                                bg-green-600
                                text-white
                                px-4
                                py-4
                                flex
                                items-center
                                justify-between
                                sticky
                                top-0
                                z-10
                            ">
                                <div className="font-semibold flex items-center gap-2">
                                    <i className="fa-solid fa-bars"></i>
                                    Categories
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowCategories(false)
                                    }
                                    className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>


                            <nav className="divide-y divide-gray-100">

                                {categories.length > 0 ? (

                                    categories.map((cat) => (

                                        <Link
                                            key={cat.id}
                                            href={`/marketplace/category/${cat.slug}`}
                                            onClick={() =>
                                                setShowCategories(false)
                                            }
                                            className="
                                                flex
                                                items-center
                                                justify-between
                                                px-4
                                                py-3.5
                                                hover:bg-green-50
                                                transition
                                                group
                                            "
                                        >

                                            <span className="flex items-center gap-3 text-gray-700 group-hover:text-green-700 min-w-0">

                                                <i
                                                    className={`fa-solid ${
                                                        cat.icon || "fa-tag"
                                                    } w-5 text-gray-400 group-hover:text-green-600 shrink-0`}
                                                ></i>

                                                <span className="truncate">
                                                    {cat.name}
                                                </span>

                                            </span>

                                            <i className="
                                                fa-solid
                                                fa-chevron-right
                                                text-xs
                                                text-gray-300
                                                group-hover:text-green-500
                                            "></i>

                                        </Link>

                                    ))

                                ) : (

                                    <div className="px-4 py-8 text-sm text-gray-400 text-center">
                                        Hakuna kategoria bado
                                    </div>

                                )}

                            </nav>

                        </aside>

                    </div>
                )}


                {/* =========================================================
                    PUBLIC PAGE BODY
                ========================================================= */}
                <main className="flex-1">

                    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">

                        <div className="flex gap-4 lg:gap-6">

                            {/* =================================================
                                LEFT CATEGORY SIDEBAR - DESKTOP
                            ================================================== */}
                            <aside className="w-64 shrink-0 hidden lg:block">

                                <div className="
                                    bg-white
                                    rounded-2xl
                                    shadow-sm
                                    border
                                    border-gray-200
                                    overflow-hidden
                                    sticky
                                    top-[145px]
                                ">

                                    {/* TITLE */}
                                    <div className="
                                        bg-green-600
                                        text-white
                                        px-4
                                        py-3.5
                                        font-semibold
                                        flex
                                        items-center
                                        gap-2
                                    ">
                                        <i className="fa-solid fa-bars"></i>

                                        Categories
                                    </div>


                                    {/* CATEGORY LIST */}
                                    <nav className="
                                        divide-y
                                        divide-gray-100
                                        max-h-[620px]
                                        overflow-y-auto
                                    ">

                                        {categories.length > 0 ? (

                                            categories.map((cat) => (

                                                <Link
                                                    key={cat.id}
                                                    href={`/marketplace/category/${cat.slug}`}
                                                    className="
                                                        flex
                                                        items-center
                                                        justify-between
                                                        px-4
                                                        py-3
                                                        hover:bg-green-50
                                                        transition
                                                        group
                                                    "
                                                >

                                                    <span className="
                                                        flex
                                                        items-center
                                                        gap-3
                                                        text-gray-700
                                                        group-hover:text-green-700
                                                        min-w-0
                                                    ">

                                                        <i
                                                            className={`fa-solid ${
                                                                cat.icon || "fa-tag"
                                                            } w-5 text-gray-400 group-hover:text-green-600 shrink-0`}
                                                        ></i>

                                                        <span className="truncate">
                                                            {cat.name}
                                                        </span>

                                                    </span>


                                                    <i className="
                                                        fa-solid
                                                        fa-chevron-right
                                                        text-xs
                                                        text-gray-300
                                                        group-hover:text-green-500
                                                        shrink-0
                                                    "></i>

                                                </Link>

                                            ))

                                        ) : (

                                            <div className="
                                                px-4
                                                py-6
                                                text-sm
                                                text-gray-400
                                                text-center
                                            ">
                                                Hakuna kategoria bado
                                            </div>

                                        )}

                                    </nav>

                                </div>

                            </aside>


                            {/* =================================================
                                PAGE CONTENT
                            ================================================== */}
                            <div className="flex-1 min-w-0">

                                {children}

                            </div>

                        </div>

                    </div>

                </main>


                {/* =========================================================
                    BENEFITS
                ========================================================= */}
                <section className="bg-white border-t">

                    <div className="
                        max-w-7xl
                        mx-auto
                        px-3
                        sm:px-4
                        py-6
                        sm:py-7
                        grid
                        grid-cols-1
                        min-[480px]:grid-cols-2
                        lg:grid-cols-4
                        gap-5
                        sm:gap-6
                    ">

                        {/* BENEFIT 1 */}
                        <div className="flex items-start gap-3">

                            <div className="
                                w-10
                                h-10
                                sm:w-11
                                sm:h-11
                                bg-green-100
                                text-green-600
                                rounded-full
                                flex
                                items-center
                                justify-center
                                shrink-0
                            ">
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

                            <div className="
                                w-10
                                h-10
                                sm:w-11
                                sm:h-11
                                bg-green-100
                                text-green-600
                                rounded-full
                                flex
                                items-center
                                justify-center
                                shrink-0
                            ">
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

                            <div className="
                                w-10
                                h-10
                                sm:w-11
                                sm:h-11
                                bg-green-100
                                text-green-600
                                rounded-full
                                flex
                                items-center
                                justify-center
                                shrink-0
                            ">
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

                            <div className="
                                w-10
                                h-10
                                sm:w-11
                                sm:h-11
                                bg-green-100
                                text-green-600
                                rounded-full
                                flex
                                items-center
                                justify-center
                                shrink-0
                            ">
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

                </section>


                {/* =========================================================
                    FOOTER
                ========================================================= */}
                <footer className="bg-gray-900 text-gray-300">

                    <div className="
                        max-w-7xl
                        mx-auto
                        px-3
                        sm:px-4
                        py-8
                        sm:py-10
                    ">

                        <div className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            lg:grid-cols-4
                            gap-8
                        ">

                            {/* BRAND */}
                            <div>

                                <Link
                                    href={route("marketplace.index")}
                                    className="flex items-center gap-2 mb-3"
                                >

                                    <div className="
                                        w-10
                                        h-10
                                        bg-green-600
                                        rounded-xl
                                        flex
                                        items-center
                                        justify-center
                                    ">
                                        <i className="fa-solid fa-store text-white"></i>
                                    </div>

                                    <div>
                                        <div className="font-bold text-lg text-white">
                                            MauzoVibe
                                        </div>

                                        <div className="text-[11px] text-gray-400">
                                            Ecommerce
                                        </div>
                                    </div>

                                </Link>

                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Nunua, uza na pata bidhaa bora karibu nawe
                                    kupitia MauzoVibe Ecommerce.
                                </p>

                            </div>


                            {/* QUICK LINKS */}
                            <div>

                                <h3 className="font-semibold text-white mb-3">
                                    Marketplace
                                </h3>

                                <div className="space-y-2 text-sm">

                                    <Link
                                        href={route("marketplace.index")}
                                        className="block hover:text-green-400 transition"
                                    >
                                        Home
                                    </Link>

                                    <Link
                                        href={route("marketplace.new")}
                                        className="block hover:text-green-400 transition"
                                    >
                                        Bidhaa Mpya
                                    </Link>

                                    <Link
                                        href="#"
                                        className="block hover:text-green-400 transition"
                                    >
                                        Bidhaa Zinazotumika
                                    </Link>

                                    <Link
                                        href="#"
                                        className="block hover:text-green-400 transition"
                                    >
                                        Maduka
                                    </Link>

                                </div>

                            </div>


                            {/* SELL */}
                            <div>

                                <h3 className="font-semibold text-white mb-3">
                                    Uza na MauzoVibe
                                </h3>

                                <div className="space-y-2 text-sm">

                                    <Link
                                        href={
                                            auth?.user
                                                ? route("marketplace.dashboard")
                                                : route("login")
                                        }
                                        className="block hover:text-green-400 transition"
                                    >
                                        Uza Bidhaa
                                    </Link>

                                    <Link
                                        href="#"
                                        className="block hover:text-green-400 transition"
                                    >
                                        Jinsi ya Kuuza
                                    </Link>

                                    <Link
                                        href="#"
                                        className="block hover:text-green-400 transition"
                                    >
                                        Masharti
                                    </Link>

                                </div>

                            </div>


                            {/* CONTACT */}
                            <div>

                                <h3 className="font-semibold text-white mb-3">
                                    Wasiliana Nasi
                                </h3>

                                <div className="space-y-3 text-sm">

                                    <div className="flex items-center gap-2">
                                        <i className="fa-solid fa-location-dot text-green-500"></i>
                                        <span>
                                            Tanzania
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <i className="fa-solid fa-envelope text-green-500"></i>
                                        <span>
                                            support@mauzovibe.co.tz
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <i className="fa-solid fa-headset text-green-500"></i>
                                        <span>
                                            Huduma kwa Wateja
                                        </span>
                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* COPYRIGHT */}
                        <div className="
                            border-t
                            border-gray-800
                            mt-8
                            pt-5
                            flex
                            flex-col
                            sm:flex-row
                            items-center
                            justify-between
                            gap-3
                            text-xs
                            text-gray-500
                        ">

                            <div>
                                © {new Date().getFullYear()} MauzoVibe. Haki zote zimehifadhiwa.
                            </div>

                            <div className="flex items-center gap-4">

                                <Link
                                    href="#"
                                    className="hover:text-green-400 transition"
                                >
                                    Privacy
                                </Link>

                                <Link
                                    href="#"
                                    className="hover:text-green-400 transition"
                                >
                                    Terms
                                </Link>

                            </div>

                        </div>

                    </div>

                </footer>

            </div>
        </>
    );
}