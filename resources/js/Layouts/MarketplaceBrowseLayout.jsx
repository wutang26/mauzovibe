import { useEffect, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function MarketplaceBrowseLayout({
    children,
    title = "MauzoVibe Marketplace",
}) {
    const { auth } = usePage().props;

    const user = auth?.user ?? null;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [location, setLocation] = useState("Tanzania");
    const [locationLoading, setLocationLoading] = useState(true);

    /*
    |--------------------------------------------------------------------------
    | CLOSE MOBILE SIDEBAR WHEN SCREEN BECOMES DESKTOP
    |--------------------------------------------------------------------------
    */
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    /*
    |--------------------------------------------------------------------------
    | CURRENT LOCATION
    |--------------------------------------------------------------------------
    */
    useEffect(() => {
        let cancelled = false;

        if (!navigator.geolocation) {
            setLocation("Tanzania");
            setLocationLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                if (cancelled) return;

                try {
                    const { latitude, longitude } = position.coords;

                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
                        {
                            headers: {
                                Accept: "application/json",
                            },
                        }
                    );

                    if (!response.ok) {
                        throw new Error("Location request failed");
                    }

                    const data = await response.json();

                    if (cancelled) return;

                    const address = data?.address || {};

                    const city =
                        address.city ||
                        address.town ||
                        address.municipality ||
                        address.village ||
                        address.city_district ||
                        "";

                    const region =
                        address.state ||
                        address.region ||
                        "";

                    const country = address.country || "";

                    let readableLocation = "";

                    if (city && country) {
                        readableLocation = `${city}, ${country}`;
                    } else if (city && region) {
                        readableLocation = `${city}, ${region}`;
                    } else if (region && country) {
                        readableLocation = `${region}, ${country}`;
                    } else if (country) {
                        readableLocation = country;
                    }

                    setLocation(readableLocation || "Tanzania");
                } catch (error) {
                    console.warn("Location error:", error);

                    if (!cancelled) {
                        setLocation("Tanzania");
                    }
                } finally {
                    if (!cancelled) {
                        setLocationLoading(false);
                    }
                }
            },
            () => {
                if (!cancelled) {
                    setLocation("Tanzania");
                    setLocationLoading(false);
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000,
            }
        );

        return () => {
            cancelled = true;
        };
    }, []);

    /*
    |--------------------------------------------------------------------------
    | CATEGORIES
    |--------------------------------------------------------------------------
    */
    const categories = [
        {
            name: "Electronics",
            slug: "electronics",
            icon: "fa-mobile-screen-button",
        },
        {
            name: "Vehicles",
            slug: "vehicles",
            icon: "fa-car",
        },
        {
            name: "Property",
            slug: "property",
            icon: "fa-house",
        },
        {
            name: "Fashion",
            slug: "fashion",
            icon: "fa-shirt",
        },
        {
            name: "Jobs",
            slug: "jobs",
            icon: "fa-briefcase",
        },
        {
            name: "Services",
            slug: "services",
            icon: "fa-screwdriver-wrench",
        },
        {
            name: "Furniture",
            slug: "furniture",
            icon: "fa-couch",
        },
        {
            name: "Phones",
            slug: "phones",
            icon: "fa-mobile-screen",
        },
        {
            name: "Computers",
            slug: "computers",
            icon: "fa-laptop",
        },
        {
            name: "Beauty",
            slug: "beauty",
            icon: "fa-wand-magic-sparkles",
        },
        {
            name: "Sports",
            slug: "sports",
            icon: "fa-futbol",
        },
        {
            name: "Agriculture",
            slug: "agriculture",
            icon: "fa-wheat-awn",
        },
        {
            name: "Animals",
            slug: "animals",
            icon: "fa-paw",
        },
        {
            name: "Baby Products",
            slug: "baby-products",
            icon: "fa-baby",
        },
        {
            name: "Books",
            slug: "books",
            icon: "fa-book",
        },
        {
            name: "Gaming",
            slug: "gaming",
            icon: "fa-gamepad",
        },
        {
            name: "Music",
            slug: "music",
            icon: "fa-music",
        },
        {
            name: "Health",
            slug: "health",
            icon: "fa-heart-pulse",
        },
        {
            name: "Industrial Equipment",
            slug: "industrial-equipment",
            icon: "fa-gears",
        },
        {
            name: "Other",
            slug: "other",
            icon: "fa-tags",
        },
    ];

    /*
    |--------------------------------------------------------------------------
    | NAVIGATION
    |--------------------------------------------------------------------------
    */
    const navigation = [
        {
            name: "Home",
            href: route("marketplace.index"),
        },
        {
            name: "Bidhaa Mpya",
            href: route("marketplace.new"),
        },
        {
            name: "Bidhaa Used",
            href: route("marketplace.used"),
        },
        {
            name: "Maduka",
            href: route("marketplace.stores"),
        },
        {
            name: "Ofa Maalum",
            href: route("marketplace.offers"),
        },
        {
            name: "Msaada",
            href: route("marketplace.help"),
        },
    ];

    return (
        <>
            <Head title={title} />

            <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
                {/* =====================================================
                    MOBILE OVERLAY
                ====================================================== */}
                {sidebarOpen && (
                    <button
                        type="button"
                        aria-label="Close menu"
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-[90] bg-black/50 lg:hidden"
                    />
                )}

                {/* =====================================================
                    STICKY TOP HEADER
                ====================================================== */}
                <header className="sticky top-0 z-[100] bg-white border-b border-gray-200 shadow-sm">
                    {/* TOP ROW */}
                    <div className="max-w-7xl mx-auto px-3 sm:px-4">
                        <div className="min-h-[64px] sm:min-h-[72px] flex items-center gap-2 sm:gap-4">
                            {/* MOBILE MENU BUTTON */}
                            <button
                                type="button"
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden w-10 h-10 shrink-0 rounded-xl border border-gray-200 bg-white text-gray-700 hover:text-green-600 hover:border-green-300 flex items-center justify-center transition"
                                aria-label="Open menu"
                            >
                                <i className="fa-solid fa-bars text-lg"></i>
                            </button>

                            {/* LOGO */}
                            <Link
                                href={route("marketplace.index")}
                                className="flex items-center gap-2 shrink-0"
                            >
                                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-sm">
                                    <i className="fa-solid fa-store text-white text-sm sm:text-base"></i>
                                </div>

                                <div className="hidden min-[380px]:block leading-tight">
                                    <div className="font-bold text-lg sm:text-xl text-gray-900">
                                        MauzoVibe
                                    </div>

                                    <div className="text-[10px] sm:text-[11px] text-gray-500">
                                        Ecommerce
                                    </div>
                                </div>
                            </Link>

                            {/* DESKTOP NAV */}
                            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 ml-5 flex-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-sm font-medium text-gray-700 hover:text-green-600 whitespace-nowrap transition"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>

                            {/* RIGHT ACTIONS */}
                            <div className="flex items-center gap-1.5 sm:gap-2.5 ml-auto shrink-0">
                                {/* FAVOURITES */}
                                <Link
                                    href={route(
                                        "marketplace.favourites"
                                    )}
                                    className="relative w-9 h-9 sm:w-auto sm:h-10 sm:px-2 flex items-center justify-center sm:justify-start gap-1.5 text-gray-700 hover:text-green-600 transition"
                                    title="Favourites"
                                >
                                    <i className="fa-regular fa-heart text-lg"></i>

                                    <span className="hidden xl:inline text-sm">
                                        Favourites
                                    </span>

                                    <span className="absolute -top-0.5 -right-0.5 sm:static sm:ml-0.5 bg-green-600 text-white text-[9px] sm:text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                                        1
                                    </span>
                                </Link>

                                {/* MESSAGES */}
                                <Link
                                    href={route(
                                        "marketplace.messages"
                                    )}
                                    className="relative w-9 h-9 sm:w-auto sm:h-10 sm:px-2 flex items-center justify-center sm:justify-start gap-1.5 text-gray-700 hover:text-green-600 transition"
                                    title="Messages"
                                >
                                    <i className="fa-regular fa-comment text-lg"></i>

                                    <span className="hidden xl:inline text-sm">
                                        Messages
                                    </span>

                                    <span className="absolute -top-0.5 -right-0.5 sm:static sm:ml-0.5 bg-green-600 text-white text-[9px] sm:text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                                        2
                                    </span>
                                </Link>

                                {/* CART */}
                                <Link
                                    href={route("marketplace.cart")}
                                    className="relative w-9 h-9 sm:w-auto sm:h-10 sm:px-2 flex items-center justify-center sm:justify-start gap-1.5 text-gray-700 hover:text-green-600 transition"
                                    title="Cart"
                                >
                                    <i className="fa-solid fa-cart-shopping text-lg"></i>

                                    <span className="hidden xl:inline text-sm">
                                        Cart
                                    </span>

                                    <span className="absolute -top-0.5 -right-0.5 sm:static sm:ml-0.5 bg-green-600 text-white text-[9px] sm:text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                                        1
                                    </span>
                                </Link>

                                {/* SELLER */}
                                {user ? (
                                    <Link
                                        href={route(
                                            "marketplace.dashboard"
                                        )}
                                        className="hidden sm:flex bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold items-center gap-1.5 whitespace-nowrap transition"
                                    >
                                        <i className="fa-solid fa-store"></i>

                                        <span className="hidden md:inline">
                                            Seller Dashboard
                                        </span>

                                        <span className="md:hidden">
                                            Seller
                                        </span>
                                    </Link>
                                ) : (
                                    <Link
                                        href={route("login")}
                                        className="bg-green-600 hover:bg-green-700 text-white px-2.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap transition"
                                    >
                                        <i className="fa-solid fa-upload"></i>

                                        <span className="hidden sm:inline">
                                            Uza Bidhaa
                                        </span>

                                        <span className="sm:hidden">
                                            Uza
                                        </span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* =================================================
                        MOBILE NAVIGATION
                    ================================================== */}
                    <div className="lg:hidden border-t border-gray-100 bg-white">
                        <div className="max-w-7xl mx-auto px-3 sm:px-4">
                            <div className="flex items-center gap-4 overflow-x-auto py-2 scrollbar-hide">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-xs sm:text-sm font-medium text-gray-700 hover:text-green-600 whitespace-nowrap shrink-0 transition"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* =================================================
                        LOCATION BAR
                    ================================================== */}
                    <div className="border-t border-gray-100 bg-gray-50/80">
                        <div className="max-w-7xl mx-auto px-3 sm:px-4">
                            <div className="h-8 flex items-center justify-end">
                                <div className="flex items-center gap-1.5 text-xs text-gray-600 min-w-0">
                                    <i
                                        className={`fa-solid ${
                                            locationLoading
                                                ? "fa-spinner fa-spin"
                                                : "fa-location-dot"
                                        } text-green-600`}
                                    ></i>

                                    <span className="truncate max-w-[180px] sm:max-w-none">
                                        {locationLoading
                                            ? "Inatafuta location..."
                                            : location}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* =====================================================
                    MOBILE SIDEBAR
                ====================================================== */}
                <aside
                    className={`
                        fixed
                        top-0
                        left-0
                        bottom-0
                        z-[110]
                        w-[280px]
                        max-w-[85vw]
                        bg-white
                        shadow-2xl
                        transform
                        transition-transform
                        duration-300
                        ease-in-out
                        lg:hidden
                        overflow-hidden
                        ${
                            sidebarOpen
                                ? "translate-x-0"
                                : "-translate-x-full"
                        }
                    `}
                >
                    <div className="h-full flex flex-col">
                        {/* SIDEBAR HEADER */}
                        <div className="h-16 shrink-0 bg-green-600 text-white px-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-9 h-9 bg-white/15 rounded-lg flex items-center justify-center">
                                    <i className="fa-solid fa-store"></i>
                                </div>

                                <div>
                                    <div className="font-bold">
                                        MauzoVibe
                                    </div>

                                    <div className="text-[10px] text-green-100">
                                        Marketplace
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSidebarOpen(false)}
                                className="w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center transition"
                                aria-label="Close menu"
                            >
                                <i className="fa-solid fa-xmark text-lg"></i>
                            </button>
                        </div>

                        {/* MOBILE SIDEBAR CONTENT */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="p-4">
                                <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                                    Navigation
                                </div>

                                <nav className="space-y-1">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() =>
                                                setSidebarOpen(false)
                                            }
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                                        >
                                            <i className="fa-solid fa-chevron-right text-[10px] text-gray-300"></i>

                                            {item.name}
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            <div className="border-t border-gray-100"></div>

                            <div className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                        Categories
                                    </div>

                                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                        {categories.length}
                                    </span>
                                </div>

                                <nav className="space-y-1">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.slug}
                                            href={`/marketplace/category/${category.slug}`}
                                            onClick={() =>
                                                setSidebarOpen(false)
                                            }
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                                        >
                                            <i
                                                className={`fa-solid ${
                                                    category.icon
                                                } w-5 text-center text-gray-400`}
                                            ></i>

                                            <span className="flex-1">
                                                {category.name}
                                            </span>

                                            <i className="fa-solid fa-chevron-right text-[10px] text-gray-300"></i>
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* =====================================================
                    BODY
                ====================================================== */}
                <div className="flex-1">
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
                        <div className="flex gap-4 lg:gap-6">
                            {/* =================================================
                                DESKTOP SIDEBAR
                            ================================================== */}
                            <aside className="hidden lg:block w-60 xl:w-64 shrink-0">
                                <div className="sticky top-[105px]">
                                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                                        {/* HEADER */}
                                        <div className="bg-green-600 text-white px-4 py-3.5 font-semibold flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <i className="fa-solid fa-bars"></i>
                                                <span>Categories</span>
                                            </div>

                                            <span className="text-[10px] bg-white/15 px-2 py-1 rounded-full">
                                                {categories.length}
                                            </span>
                                        </div>

                                        {/* CATEGORY LIST */}
                                        <nav className="max-h-[calc(100vh-145px)] overflow-y-auto divide-y divide-gray-100">
                                            {categories.map(
                                                (category) => (
                                                    <Link
                                                        key={
                                                            category.slug
                                                        }
                                                        href={`/marketplace/category/${category.slug}`}
                                                        className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 group transition"
                                                    >
                                                        <i
                                                            className={`fa-solid ${
                                                                category.icon
                                                            } w-5 text-center text-gray-400 group-hover:text-green-600`}
                                                        ></i>

                                                        <span className="flex-1 min-w-0 text-sm text-gray-700 group-hover:text-green-700 truncate">
                                                            {
                                                                category.name
                                                            }
                                                        </span>

                                                        <i className="fa-solid fa-chevron-right text-[9px] text-gray-300 group-hover:text-green-500"></i>
                                                    </Link>
                                                )
                                            )}
                                        </nav>
                                    </div>
                                </div>
                            </aside>

                            {/* =================================================
                                PAGE CONTENT
                            ================================================== */}
                            <main className="flex-1 min-w-0">
                                {children}
                            </main>
                        </div>
                    </div>
                </div>

                {/* =====================================================
                    FOOTER
                ====================================================== */}
                <footer className="bg-white border-t border-gray-200 mt-auto">
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-8">
                            {/* BRAND */}
                            <div>
                                <Link
                                    href={route(
                                        "marketplace.index"
                                    )}
                                    className="inline-flex items-center gap-2"
                                >
                                    <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                                        <i className="fa-solid fa-store text-white"></i>
                                    </div>

                                    <div>
                                        <div className="font-bold text-lg text-gray-900">
                                            MauzoVibe
                                        </div>

                                        <div className="text-xs text-gray-500">
                                            Ecommerce
                                        </div>
                                    </div>
                                </Link>

                                <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                                    Nunua, uza na pata bidhaa bora karibu
                                    nawe kupitia MauzoVibe Marketplace.
                                </p>
                            </div>

                            {/* MARKETPLACE */}
                            <div>
                                <h3 className="font-bold text-gray-900 mb-3">
                                    Marketplace
                                </h3>

                                <div className="space-y-2 text-sm">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="block text-gray-500 hover:text-green-600 transition"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* CATEGORIES */}
                            <div>
                                <h3 className="font-bold text-gray-900 mb-3">
                                    Categories
                                </h3>

                                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                    {categories
                                        .slice(0, 10)
                                        .map((category) => (
                                            <Link
                                                key={
                                                    category.slug
                                                }
                                                href={`/marketplace/category/${category.slug}`}
                                                className="text-gray-500 hover:text-green-600 transition truncate"
                                            >
                                                {category.name}
                                            </Link>
                                        ))}
                                </div>
                            </div>

                            {/* CONTACT */}
                            <div>
                                <h3 className="font-bold text-gray-900 mb-3">
                                    Wasiliana Nasi
                                </h3>

                                <div className="space-y-3 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <i className="fa-solid fa-envelope text-green-600 w-4"></i>
                                        <span className="truncate">
                                            mauzovibe@outlook.com
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <i className="fa-solid fa-phone text-green-600 w-4"></i>
                                        <span>
                                            +255 0746856656
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <i className="fa-solid fa-location-dot text-green-600 w-4"></i>
                                        <span>{location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FOOTER BOTTOM */}
                        <div className="border-t border-gray-100 mt-8 pt-5 flex flex-col md:flex-row items-center justify-between gap-3">
                            <p className="text-xs text-gray-500 text-center md:text-left">
                                © {new Date().getFullYear()} MauzoVibe.
                                All rights reserved.
                            </p>

                            <div className="flex items-center gap-5 text-xs">
                                <Link
                                    href="/privacy"
                                    className="text-gray-500 hover:text-green-600 transition"
                                >
                                    Privacy
                                </Link>

                                <Link
                                    href="/terms"
                                    className="text-gray-500 hover:text-green-600 transition"
                                >
                                    Terms
                                </Link>

                                <Link
                                    href="/support"
                                    className="text-gray-500 hover:text-green-600 transition"
                                >
                                    Support
                                </Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}