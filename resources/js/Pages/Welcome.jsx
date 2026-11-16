
import { useEffect, useMemo, useState } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";

import {
    Bars3Icon,
    XMarkIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
    FaWhatsapp,
} from "react-icons/fa";

export default function Welcome({
    canLogin = true,
    canRegister = true,
    dailyPosts = [],
}) {
    const posts = Array.isArray(dailyPosts) ? dailyPosts : [];

    const [showPassword, setShowPassword] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState(0);

    const form = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const currentYear = new Date().getFullYear();

    const navigationClass = `
        flex items-center justify-between
        px-4 py-3 rounded-xl
        text-sm font-semibold text-slate-700
        hover:bg-emerald-50 hover:text-emerald-600
        transition
    `;

    const trialButtonText = useMemo(() => {
        return "Create Your Account";
    }, []);

    // --------------------------------------------------
    // LOGIN
    // --------------------------------------------------

    const submit = (e) => {
        e.preventDefault();

        form.post("/login", {
            preserveScroll: true,
            onSuccess: () => {
                setShowPassword(false);
            },
            onFinish: () => {
                form.reset("password");
            },
        });
    };

    // --------------------------------------------------
    // DAILY POSTS
    // --------------------------------------------------

    useEffect(() => {
        if (posts.length === 0) {
            setCurrentPost(0);
            return;
        }

        setCurrentPost((previous) =>
            Math.min(previous, posts.length - 1)
        );
    }, [posts.length]);

    // Automatically change slides every 6 seconds.
    useEffect(() => {
        if (posts.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentPost((previous) =>
                (previous + 1) % posts.length
            );
        }, 6000);

        return () => clearInterval(interval);
    }, [posts.length]);

    // Refresh daily posts every 5 minutes.
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({
                only: ["dailyPosts"],
                preserveScroll: true,
                preserveState: true,
            });
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    const nextPost = () => {
        setCurrentPost((previous) =>
            posts.length > 0
                ? (previous + 1) % posts.length
                : 0
        );
    };

    const previousPost = () => {
        setCurrentPost((previous) =>
            posts.length > 0
                ? (previous - 1 + posts.length) % posts.length
                : 0
        );
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            <Head title="MauzoVibe | Smart Business Management" />

            <div className="min-h-screen bg-white text-slate-900">

                {/* HERO SECTION */}

                <section
                    id="home"
                    className="relative min-h-screen overflow-hidden"
                >
                    {/* BACKGROUND */}

                    <div className="absolute inset-0">
                        <img
                            src="/images/shop.jpg"
                            alt="MauzoVibe business management"
                            className="h-full w-full object-cover brightness-110 contrast-90"
                        />

                        <div className="absolute inset-0 bg-white/30" />

                        <div className="
                            absolute inset-0 bg-gradient-to-r
                            from-white/95 via-white/75 to-white/20
                        " />

                        <div className="
                            absolute inset-x-0 bottom-0 h-40
                            bg-gradient-to-t from-white/80 to-transparent
                        " />
                    </div>

                    <div className="relative z-10 min-h-screen flex flex-col">

                        {/* CONTACT BAR */}

                        <div className="
                            hidden lg:block border-b border-slate-200/70
                            bg-white/85 backdrop-blur-md
                        ">
                            <div className="max-w-7xl mx-auto px-6 xl:px-8">
                                <div className="
                                    h-12 flex items-center
                                    justify-between text-xs text-slate-600
                                ">
                                    <div className="flex items-center gap-6">
                                        <a
                                            href="mailto:mauzovibe@outlook.com"
                                            className="flex items-center gap-2 hover:text-emerald-600"
                                        >
                                            <span className="text-emerald-600">✉</span>
                                            mauzovibe@outlook.com
                                        </a>

                                        <a
                                            href="tel:+255746856656"
                                            className="flex items-center gap-2 hover:text-emerald-600"
                                        >
                                            <span className="text-emerald-600">☎</span>
                                            +255 746 856 656
                                        </a>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {[
                                            {
                                                href: "https://www.facebook.com/mauzovibe",
                                                label: "Facebook",
                                                Icon: FaFacebookF,
                                            },
                                            {
                                                href: "https://www.instagram.com/mauzovibe",
                                                label: "Instagram",
                                                Icon: FaInstagram,
                                            },
                                            {
                                                href: "https://www.linkedin.com/company/mauzovibe",
                                                label: "LinkedIn",
                                                Icon: FaLinkedinIn,
                                            },
                                            {
                                                href: "https://www.youtube.com/@mauzovibe",
                                                label: "YouTube",
                                                Icon: FaYoutube,
                                            },
                                            {
                                                href: "https://wa.me/255746856656",
                                                label: "WhatsApp",
                                                Icon: FaWhatsapp,
                                            },
                                        ].map(({ href, label, Icon }) => (
                                            <a
                                                key={label}
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={label}
                                                className="
                                                    w-9 h-9 rounded-xl bg-slate-100
                                                    flex items-center justify-center
                                                    hover:bg-emerald-600 hover:text-white
                                                    transition
                                                "
                                            >
                                                <Icon />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* NAVBAR */}

                        <nav className="
                            sticky top-0 z-50 border-b border-slate-200/70
                            bg-white/95 backdrop-blur-xl shadow-sm
                        ">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
                                <div className="
                                    min-h-[72px] flex items-center
                                    justify-between gap-4
                                ">
                                    {/* LOGO */}

                                    <Link
                                        href="/"
                                        onClick={closeMobileMenu}
                                        className="flex items-center gap-2.5 shrink-0"
                                    >
                                        <div className="
                                            w-11 h-11 rounded-xl bg-emerald-600
                                            flex items-center justify-center
                                            shadow-lg shadow-emerald-600/20
                                        ">
                                            <svg
                                                className="w-7 h-7 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 8h12l1 13H5L6 8z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 8a3 3 0 016 0"
                                                />
                                            </svg>
                                        </div>

                                        <div className="
                                            text-2xl sm:text-3xl
                                            font-extrabold tracking-tight text-slate-900
                                        ">
                                            Mauzo<span className="text-emerald-600">Vibe</span>
                                        </div>
                                    </Link>

                                    {/* DESKTOP MENU */}

                                    <div className="
                                        hidden lg:flex items-center gap-8
                                        text-sm font-semibold text-slate-700
                                    ">
                                        <a
                                            href="#home"
                                            className="hover:text-emerald-600 transition"
                                        >
                                            Home
                                        </a>

                                        <Link
                                            href={route("faq")}
                                            className="hover:text-emerald-600 transition"
                                        >
                                            FAQ
                                        </Link>

                                        <Link
                                            href={route("pricing")}
                                            className="hover:text-emerald-600 transition"
                                        >
                                            Pricing
                                        </Link>

                                        <Link
                                            href={route("about")}
                                            className="hover:text-emerald-600 transition"
                                        >
                                            About Us
                                        </Link>
                                    </div>

                                    {/* DESKTOP LOGIN */}

                                    <div className="hidden lg:block">
                                        {canLogin && (
                                            <Link
                                                href="/login"
                                                className="
                                                    inline-flex items-center gap-2
                                                    rounded-xl bg-emerald-600
                                                    px-6 py-3 text-sm font-bold
                                                    text-white shadow-lg
                                                    hover:bg-emerald-700
                                                    hover:-translate-y-0.5 transition
                                                "
                                            >
                                                Sign In
                                                <ChevronRightIcon className="w-4 h-4" />
                                            </Link>
                                        )}
                                    </div>

                                    {/* MOBILE MENU BUTTON */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setMobileMenuOpen((previous) => !previous)
                                        }
                                        className="
                                            lg:hidden w-11 h-11 rounded-xl
                                            border border-slate-200 bg-white
                                            flex items-center justify-center
                                            text-slate-700 hover:text-emerald-600
                                        "
                                        aria-label="Toggle navigation"
                                        aria-expanded={mobileMenuOpen}
                                    >
                                        {mobileMenuOpen ? (
                                            <XMarkIcon className="w-6 h-6" />
                                        ) : (
                                            <Bars3Icon className="w-6 h-6" />
                                        )}
                                    </button>
                                </div>

                                {/* MOBILE MENU */}

                                {mobileMenuOpen && (
                                    <div className="lg:hidden border-t border-slate-100 py-4">
                                        <div className="flex flex-col gap-1">
                                            <a
                                                href="#home"
                                                onClick={closeMobileMenu}
                                                className={navigationClass}
                                            >
                                                Home
                                                <ChevronRightIcon className="w-4 h-4" />
                                            </a>

                                            <Link
                                                href={route("faq")}
                                                onClick={closeMobileMenu}
                                                className={navigationClass}
                                            >
                                                FAQ
                                                <ChevronRightIcon className="w-4 h-4" />
                                            </Link>

                                            <Link
                                                href={route("pricing")}
                                                onClick={closeMobileMenu}
                                                className={navigationClass}
                                            >
                                                Pricing
                                                <ChevronRightIcon className="w-4 h-4" />
                                            </Link>

                                            <Link
                                                href={route("about")}
                                                onClick={closeMobileMenu}
                                                className={navigationClass}
                                            >
                                                About Us
                                                <ChevronRightIcon className="w-4 h-4" />
                                            </Link>

                                            {canLogin && (
                                                <Link
                                                    href="/login"
                                                    onClick={closeMobileMenu}
                                                    className="
                                                        mt-3 flex items-center justify-center
                                                        gap-2 rounded-xl bg-emerald-600
                                                        px-5 py-3 text-sm font-bold text-white
                                                        hover:bg-emerald-700
                                                    "
                                                >
                                                    Sign In
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </nav>

                        {/* HERO CONTENT */}

                        <div className="flex-1 flex items-center">
                            <div className="
                                max-w-7xl w-full mx-auto
                                px-5 sm:px-6 xl:px-8
                                py-10 lg:py-14
                            ">
                                <div className="
                                    grid grid-cols-1 lg:grid-cols-12
                                    gap-10 lg:gap-14 items-center
                                ">

                                    {/* LEFT CONTENT */}

                                    <div className="lg:col-span-7 text-slate-950">

                                        {/* BADGE */}

                                        <div className="
                                            inline-flex items-center gap-2
                                            px-4 py-2 rounded-full
                                            bg-emerald-50 border border-emerald-200
                                            text-sm font-semibold text-emerald-700
                                            mb-6 shadow-sm
                                        ">
                                            <span className="relative flex h-2.5 w-2.5">
                                                <span className="
                                                    absolute inline-flex h-full w-full
                                                    rounded-full bg-emerald-400
                                                    opacity-75 animate-ping
                                                " />
                                                <span className="
                                                    relative inline-flex h-2.5 w-2.5
                                                    rounded-full bg-emerald-600
                                                " />
                                            </span>

                                            Your Business. Your Growth. One Platform.
                                        </div>

                                        {/* HEADING */}

                                        <h1 className="
                                            text-4xl sm:text-5xl
                                            lg:text-6xl xl:text-7xl
                                            font-extrabold leading-[1.05]
                                            tracking-tight text-slate-950
                                        ">
                                            Run Your Business
                                            <br />
                                            <span className="text-emerald-600">
                                                The Smarter Way.
                                            </span>
                                        </h1>

                                        {/* DESCRIPTION */}

                                        <p className="
                                            mt-6 max-w-2xl
                                            text-base sm:text-lg
                                            leading-8 text-slate-700
                                        ">
                                            Take control of your sales, inventory,
                                            customers and business performance with
                                            MauzoVibe. Everything you need to manage
                                            your business efficiently, make informed
                                            decisions and grow with confidence — all
                                            from one simple platform.
                                        </p>

                                        {/* DAILY POSTS SLIDER */}

                                        {posts.length > 0 && (
                                            <div className="mt-8 w-full max-w-2xl">
                                                <div className="
                                                    relative overflow-hidden rounded-3xl
                                                    border border-slate-200 bg-white
                                                    shadow-2xl shadow-slate-900/15
                                                ">
                                                    <div className="relative">
                                                        {posts.map((post, index) => (
                                                            <div
                                                                key={post.id ?? index}
                                                                aria-hidden={index !== currentPost}
                                                                className={`
                                                                    transition-all duration-700 ease-in-out
                                                                    ${
                                                                        index === currentPost
                                                                            ? "relative opacity-100 translate-x-0"
                                                                            : "absolute inset-0 opacity-0 translate-x-8 pointer-events-none"
                                                                    }
                                                                `}
                                                            >
                                                                {/* IMAGE */}

                                                                <div className="
                                                                    relative w-full
                                                                    h-[280px] sm:h-[350px]
                                                                    lg:h-[390px] xl:h-[420px]
                                                                    overflow-hidden bg-slate-100
                                                                ">
                                                                    <img
                                                                        src={post.image || "/images/shop.jpg"}
                                                                        alt={post.title || "MauzoVibe business update"}
                                                                        className="
                                                                            absolute inset-0 w-full h-full
                                                                            object-cover transition-transform
                                                                            duration-700 hover:scale-105
                                                                        "
                                                                        onError={(e) => {
                                                                            e.currentTarget.onerror = null;
                                                                            e.currentTarget.src = "/images/shop.jpg";
                                                                        }}
                                                                    />

                                                                    <div className="
                                                                        absolute inset-0 bg-gradient-to-t
                                                                        from-black/65 via-black/10 to-black/10
                                                                    " />

                                                                    {post.type && (
                                                                        <span className="
                                                                            absolute top-5 left-5 rounded-full
                                                                            bg-emerald-600 px-4 py-2
                                                                            text-xs font-bold uppercase
                                                                            tracking-wide text-white shadow-lg
                                                                        ">
                                                                            {post.type}
                                                                        </span>
                                                                    )}

                                                                    <div className="
                                                                        absolute bottom-5 left-6 right-6 text-white
                                                                    ">
                                                                        <span className="
                                                                            text-xs font-semibold uppercase
                                                                            tracking-widest text-white/90
                                                                        ">
                                                                            MauzoVibe Business Updates
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                {/* POST CONTENT */}

                                                                <div className="p-5 sm:p-6">
                                                                    {post.type && (
                                                                        <span className="
                                                                            inline-flex mb-3 rounded-full
                                                                            bg-emerald-50 px-3 py-1
                                                                            text-xs font-bold uppercase
                                                                            tracking-wide text-emerald-700
                                                                        ">
                                                                            {post.type}
                                                                        </span>
                                                                    )}

                                                                    <h3 className="
                                                                        text-xl sm:text-2xl font-extrabold
                                                                        leading-tight text-slate-900
                                                                    ">
                                                                        {post.title}
                                                                    </h3>

                                                                    {post.description && (
                                                                        <p className="
                                                                            mt-3 text-sm leading-6
                                                                            text-slate-600 line-clamp-3
                                                                        ">
                                                                            {post.description}
                                                                        </p>
                                                                    )}

                                                                    {post.button_text && post.button_url && (
                                                                        <div className="mt-5">
                                                                            <Link
                                                                                href={post.button_url}
                                                                                className="
                                                                                    inline-flex items-center gap-2
                                                                                    rounded-xl bg-emerald-600
                                                                                    px-5 py-3 text-sm font-bold
                                                                                    text-white shadow-md
                                                                                    hover:bg-emerald-700 transition
                                                                                "
                                                                            >
                                                                                {post.button_text}
                                                                                <ChevronRightIcon className="w-4 h-4" />
                                                                            </Link>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}

                                                        {/* PREVIOUS */}

                                                        {posts.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={previousPost}
                                                                className="
                                                                    absolute left-4 top-[115px]
                                                                    sm:top-[150px] lg:top-[170px]
                                                                    z-30 flex h-11 w-11 items-center
                                                                    justify-center rounded-full
                                                                    bg-white/95 text-slate-800 shadow-lg
                                                                    hover:bg-emerald-600 hover:text-white transition
                                                                "
                                                                aria-label="Previous post"
                                                            >
                                                                <svg
                                                                    className="h-5 w-5"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M15 19l-7-7 7-7"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        )}

                                                        {/* NEXT */}

                                                        {posts.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={nextPost}
                                                                className="
                                                                    absolute right-4 top-[115px]
                                                                    sm:top-[150px] lg:top-[170px]
                                                                    z-30 flex h-11 w-11 items-center
                                                                    justify-center rounded-full
                                                                    bg-white/95 text-slate-800 shadow-lg
                                                                    hover:bg-emerald-600 hover:text-white transition
                                                                "
                                                                aria-label="Next post"
                                                            >
                                                                <svg
                                                                    className="h-5 w-5"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M9 5l7 7-7 7"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        )}

                                                        {/* DOTS */}

                                                        {posts.length > 1 && (
                                                            <div className="
                                                                absolute bottom-[15px] left-1/2 z-30
                                                                flex -translate-x-1/2 items-center gap-2
                                                                rounded-full bg-black/40 px-3 py-2
                                                                backdrop-blur-md
                                                            ">
                                                                {posts.map((post, index) => (
                                                                    <button
                                                                        key={post.id ?? index}
                                                                        type="button"
                                                                        onClick={() => setCurrentPost(index)}
                                                                        aria-label={`Show post ${index + 1}`}
                                                                        aria-current={index === currentPost}
                                                                        className={`
                                                                            h-2 rounded-full transition-all duration-300
                                                                            ${
                                                                                index === currentPost
                                                                                    ? "w-7 bg-emerald-400"
                                                                                    : "w-2 bg-white/80"
                                                                            }
                                                                        `}
                                                                    />
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {posts.length > 1 && (
                                                    <div className="
                                                        mt-3 flex items-center justify-between
                                                        px-1 text-xs font-semibold text-slate-500
                                                    ">
                                                        <span>BUSINESS UPDATES</span>
                                                        <span>
                                                            {currentPost + 1} / {posts.length}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* FEATURES */}

                                        <div
                                            id="features"
                                            className="
                                                mt-7 flex flex-wrap gap-x-6 gap-y-3
                                                text-sm sm:text-base text-slate-700
                                            "
                                        >
                                            {[
                                                "Point of Sale",
                                                "Inventory Control",
                                                "Customer Management",
                                                "Business Reports",
                                            ].map((feature) => (
                                                <span
                                                    key={feature}
                                                    className="flex items-center gap-2"
                                                >
                                                    <span className="text-emerald-600">●</span>
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>

                                        {/* CTA BUTTONS */}

                                        <div className="
                                            mt-9 flex flex-col sm:flex-row
                                            items-stretch sm:items-center gap-3
                                        ">
                                            {canRegister && (
                                                <Link
                                                    href={route("register")}
                                                    className="
                                                        inline-flex items-center justify-center gap-2.5
                                                        px-6 py-3.5 rounded-xl bg-emerald-600
                                                        hover:bg-emerald-700 text-white font-bold
                                                        shadow-xl shadow-emerald-600/20
                                                        hover:-translate-y-1 transition
                                                    "
                                                >
                                                    <span className="text-xl">🚀</span>
                                                    {trialButtonText}
                                                    <ChevronRightIcon className="w-5 h-5" />
                                                </Link>
                                            )}

                                            <a
                                                href="#login"
                                                className="
                                                    inline-flex items-center justify-center gap-3
                                                    px-6 py-3.5 rounded-xl bg-white/90
                                                    hover:bg-white border border-slate-300
                                                    text-slate-900 font-semibold shadow-sm
                                                    hover:shadow-md transition
                                                "
                                            >
                                                <span className="
                                                    flex items-center justify-center
                                                    w-8 h-8 rounded-full bg-emerald-100
                                                    text-emerald-600
                                                ">
                                                    ▶
                                                </span>
                                                Access Your Account
                                            </a>
                                        </div>

                                        {/* TRUST MESSAGE */}

                                        <div className="
                                            mt-8 flex items-center gap-3
                                            text-sm text-slate-600
                                        ">
                                            <div className="flex -space-x-2">
                                                <div className="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white" />
                                                <div className="w-8 h-8 rounded-full bg-emerald-400 border-2 border-white" />
                                                <div className="w-8 h-8 rounded-full bg-emerald-200 border-2 border-white" />
                                            </div>

                                            <span>
                                                Built to help businesses work smarter and grow faster.
                                            </span>
                                        </div>
                                    </div>

                                    {/* LOGIN CARD - PRESERVED ON THE RIGHT */}

                                    <div id="login" className="lg:col-span-5">
                                        <div className="
                                            w-full max-w-md mx-auto
                                            rounded-3xl bg-white
                                            border border-slate-100
                                            shadow-2xl shadow-slate-900/10
                                            p-6 sm:p-8
                                        ">
                                            {/* ICON */}

                                            <div className="flex justify-center mb-5">
                                                <div className="
                                                    w-16 h-16 rounded-2xl
                                                    bg-emerald-50 border border-emerald-100
                                                    flex items-center justify-center shadow-sm
                                                ">
                                                    <svg
                                                        className="w-8 h-8 text-emerald-600"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth="1.8"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M4.5 21a7.5 7.5 0 0115 0"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* HEADER */}

                                            <div className="text-center mb-7">
                                                <h2 className="
                                                    text-2xl sm:text-3xl
                                                    font-bold text-slate-900
                                                ">
                                                    Welcome Back!
                                                </h2>

                                                <p className="mt-2 text-sm text-slate-500">
                                                    Sign in to manage your business and keep things moving.
                                                </p>
                                            </div>

                                            {/* LOGIN FORM */}

                                            <form onSubmit={submit} className="space-y-5">

                                                {/* EMAIL */}

                                                <div>
                                                    <label
                                                        htmlFor="email"
                                                        className="
                                                            block text-sm font-semibold
                                                            text-slate-700 mb-2
                                                        "
                                                    >
                                                        Email Address
                                                    </label>

                                                    <div className="relative">
                                                        <div className="
                                                            absolute inset-y-0 left-0
                                                            flex items-center pl-4
                                                            pointer-events-none
                                                        ">
                                                            <svg
                                                                className="w-5 h-5 text-slate-400"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth="1.8"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                                                />
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M4.5 21a7.5 7.5 0 0115 0"
                                                                />
                                                            </svg>
                                                        </div>

                                                        <input
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            value={form.data.email}
                                                            autoComplete="username"
                                                            autoFocus
                                                            required
                                                            placeholder="Enter your email address"
                                                            onChange={(e) =>
                                                                form.setData("email", e.target.value)
                                                            }
                                                            className={`
                                                                w-full h-12 pl-12 pr-4 rounded-xl border
                                                                ${
                                                                    form.errors.email
                                                                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                                                                        : "border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                                                }
                                                                bg-slate-50 text-slate-900
                                                                placeholder-slate-400 outline-none transition-all
                                                            `}
                                                        />
                                                    </div>

                                                    {form.errors.email && (
                                                        <p className="mt-2 text-sm text-red-600">
                                                            {form.errors.email}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* PASSWORD */}

                                                <div>
                                                    <div className="
                                                        flex items-center justify-between mb-2
                                                    ">
                                                        <label
                                                            htmlFor="password"
                                                            className="text-sm font-semibold text-slate-700"
                                                        >
                                                            Password
                                                        </label>

                                                        <span className="text-xs text-slate-400">
                                                            Secure Login
                                                        </span>
                                                    </div>

                                                    <div className="relative">
                                                        <div className="
                                                            absolute inset-y-0 left-0
                                                            flex items-center pl-4
                                                            pointer-events-none
                                                        ">
                                                            <svg
                                                                className="w-5 h-5 text-slate-400"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth="1.8"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M16.5 10.5V7a4.5 4.5 0 00-9 0v3.5"
                                                                />
                                                                <rect
                                                                    x="4.5"
                                                                    y="10.5"
                                                                    width="15"
                                                                    height="10"
                                                                    rx="2"
                                                                />
                                                            </svg>
                                                        </div>

                                                        <input
                                                            id="password"
                                                            name="password"
                                                            type={showPassword ? "text" : "password"}
                                                            value={form.data.password}
                                                            autoComplete="current-password"
                                                            required
                                                            placeholder="Enter your password"
                                                            onChange={(e) =>
                                                                form.setData("password", e.target.value)
                                                            }
                                                            className={`
                                                                w-full h-12 pl-12 pr-12 rounded-xl border
                                                                ${
                                                                    form.errors.password
                                                                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                                                                        : "border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                                                }
                                                                bg-slate-50 text-slate-900
                                                                placeholder-slate-400 outline-none transition-all
                                                            `}
                                                        />

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setShowPassword((previous) => !previous)
                                                            }
                                                            aria-label={
                                                                showPassword
                                                                    ? "Hide password"
                                                                    : "Show password"
                                                            }
                                                            className="
                                                                absolute inset-y-0 right-0
                                                                flex items-center px-4
                                                                text-slate-400 hover:text-emerald-600
                                                            "
                                                        >
                                                            {showPassword ? "🙈" : "👁"}
                                                        </button>
                                                    </div>

                                                    {form.errors.password && (
                                                        <p className="mt-2 text-sm text-red-600">
                                                            {form.errors.password}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* REMEMBER ME */}

                                                <div className="
                                                    flex items-center justify-between
                                                ">
                                                    <label className="
                                                        inline-flex items-center
                                                        cursor-pointer select-none
                                                    ">
                                                        <input
                                                            type="checkbox"
                                                            checked={form.data.remember}
                                                            onChange={(e) =>
                                                                form.setData("remember", e.target.checked)
                                                            }
                                                            className="
                                                                w-4 h-4 rounded border-slate-300
                                                                text-emerald-600 focus:ring-emerald-500
                                                            "
                                                        />

                                                        <span className="ml-2 text-sm text-slate-600">
                                                            Remember me
                                                        </span>
                                                    </label>

                                                    <span className="text-xs text-slate-400">
                                                        Secure &amp; protected
                                                    </span>
                                                </div>

                                                {/* LOGIN BUTTON */}

                                                <button
                                                    type="submit"
                                                    disabled={form.processing}
                                                    className="
                                                        w-full h-12 rounded-xl
                                                        bg-emerald-600 hover:bg-emerald-700
                                                        text-white font-bold text-base
                                                        shadow-lg shadow-emerald-600/20
                                                        transition-all disabled:opacity-60
                                                        disabled:cursor-not-allowed
                                                        flex items-center justify-center gap-2
                                                    "
                                                >
                                                    {form.processing ? (
                                                        <>
                                                            <svg
                                                                className="w-5 h-5 animate-spin"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                            >
                                                                <circle
                                                                    className="opacity-25"
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="10"
                                                                    stroke="currentColor"
                                                                    strokeWidth="4"
                                                                />
                                                                <path
                                                                    className="opacity-75"
                                                                    fill="currentColor"
                                                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                                />
                                                            </svg>
                                                            Signing in...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Sign In to Your Account
                                                            <ChevronRightIcon className="w-5 h-5" />
                                                        </>
                                                    )}
                                                </button>
                                            </form>

                                            {/* REGISTER */}

                                            {canRegister && (
                                                <div className="
                                                    mt-6 pt-6 border-t border-slate-100
                                                    text-center
                                                ">
                                                    <p className="text-sm text-slate-500">
                                                        New to MauzoVibe?

                                                        <Link
                                                            href={route("register")}
                                                            className="
                                                                ml-1 font-bold text-emerald-600
                                                                hover:text-emerald-700
                                                            "
                                                        >
                                                            Create an Account
                                                        </Link>
                                                    </p>
                                                </div>
                                            )}

                                            <p className="
                                                mt-5 text-center text-xs
                                                leading-5 text-slate-400
                                            ">
                                                Your business information is protected.
                                                Sign in securely to access your workspace.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FOOTER */}

                        <footer className="
                            mt-auto border-t border-slate-200/70
                            bg-white/90 backdrop-blur-md
                        ">
                            <div className="
                                max-w-7xl mx-auto px-5 sm:px-6
                                xl:px-8 py-5
                            ">
                                <div className="
                                    flex flex-col sm:flex-row
                                    items-center justify-between gap-4
                                    text-xs text-slate-500
                                ">
                                    <span className="text-center sm:text-left">
                                        © {currentYear} MauzoVibe.
                                        All rights reserved.
                                    </span>

                                    <div className="
                                        flex items-center justify-center
                                        flex-wrap gap-x-5 gap-y-2
                                    ">
                                        <Link
                                            href={route("privacy")}
                                            className="font-medium hover:text-emerald-600 transition"
                                        >
                                            Privacy
                                        </Link>

                                        <Link
                                            href={route("terms")}
                                            className="font-medium hover:text-emerald-600 transition"
                                        >
                                            Terms
                                        </Link>

                                        <Link
                                            href={route("support")}
                                            className="font-medium hover:text-emerald-600 transition"
                                        >
                                            Support
                                        </Link>
                                    </div>
                                </div>

                                <div className="
                                    mt-3 text-center text-xs text-slate-400
                                ">
                                    Powered by NAC Technologies
                                </div>
                            </div>
                        </footer>
                    </div>
                </section>
            </div>
        </>
    );
}
