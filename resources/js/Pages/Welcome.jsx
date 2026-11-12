
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
    // --------------------------------------------------
    // SAFE PAGE DATA
    // --------------------------------------------------

    const posts = Array.isArray(dailyPosts) ? dailyPosts : [];

    // --------------------------------------------------
    // STATE
    // --------------------------------------------------

    const [showPassword, setShowPassword] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [daysRemaining, setDaysRemaining] = useState(null);
    const [currentPost, setCurrentPost] = useState(0);

    // --------------------------------------------------
    // AUTH / TRIAL
    // --------------------------------------------------

    const trial = null;
    const trialEndsAt = null;

    // --------------------------------------------------
    // TRIAL DAYS CALCULATION
    // --------------------------------------------------

    useEffect(() => {
        if (!trialEndsAt) {
            setDaysRemaining(null);
            return;
        }

        const calculateDays = () => {
            const endDate = new Date(trialEndsAt);

            if (Number.isNaN(endDate.getTime())) {
                setDaysRemaining(null);
                return;
            }

            const difference = endDate.getTime() - Date.now();

            setDaysRemaining(
                Math.max(
                    0,
                    Math.ceil(difference / (1000 * 60 * 60 * 24))
                )
            );
        };

        calculateDays();

        const interval = setInterval(calculateDays, 60000);

        return () => clearInterval(interval);
    }, [trialEndsAt]);

    // --------------------------------------------------
    // TRIAL BUTTON TEXT
    // --------------------------------------------------

    const trialButtonText = useMemo(() => {
        if (trial?.is_expired || daysRemaining === 0) {
            return "Trial Expired";
        }

        if (daysRemaining !== null) {
            return `${daysRemaining} Days Left`;
        }

        return "Start Free Trial";
    }, [trial, daysRemaining]);

    // --------------------------------------------------
    // LOGIN FORM
    // --------------------------------------------------

    const form = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        form.post(route("login"), {
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
        setCurrentPost((previous) => {
            if (posts.length === 0) return 0;
            return previous % posts.length;
        });
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
            posts.length > 0 ? (previous + 1) % posts.length : 0
        );
    };

    const previousPost = () => {
        setCurrentPost((previous) =>
            posts.length > 0
                ? (previous - 1 + posts.length) % posts.length
                : 0
        );
    };

    // --------------------------------------------------
    // MOBILE MENU
    // --------------------------------------------------

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    // --------------------------------------------------
    // YEAR
    // --------------------------------------------------

    const currentYear = new Date().getFullYear();

    // --------------------------------------------------
    // SHARED NAVIGATION LINK
    // --------------------------------------------------

    const navigationClass = `
        flex items-center justify-between
        px-4 py-3 rounded-xl
        text-sm font-semibold text-slate-700
        hover:bg-emerald-50 hover:text-emerald-600
        transition
    `;

    return (
        <>
            <Head title="MauzoVibe - Grow Your Business" />

            <div className="min-h-screen bg-white text-slate-900">

                {/* =========================================
                    HERO SECTION
                ========================================== */}

                <section
                    id="home"
                    className="relative min-h-screen overflow-hidden"
                >

                    {/* BACKGROUND */}

                    <div className="absolute inset-0">

                        <img
                            src="/images/shop.jpg"
                            alt="MauzoVibe Business"
                            className="h-full w-full object-cover brightness-110 contrast-90"
                        />

                        <div className="absolute inset-0 bg-white/30" />

                        <div className="
                            absolute inset-0
                            bg-gradient-to-r
                            from-white/90 via-white/55 to-white/10
                        " />

                        <div className="
                            absolute inset-x-0 bottom-0 h-40
                            bg-gradient-to-t from-white/70 to-transparent
                        " />

                    </div>

                    <div className="relative z-10 min-h-screen flex flex-col">

                        {/* =================================
                            CONTACT BAR
                        ================================== */}

                        <div className="
                            hidden lg:block
                            border-b border-slate-200/70
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

                                        <a
                                            href="https://www.facebook.com/mauzovibe"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Facebook"
                                            className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition"
                                        >
                                            <FaFacebookF />
                                        </a>

                                        <a
                                            href="https://www.instagram.com/mauzovibe"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Instagram"
                                            className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition"
                                        >
                                            <FaInstagram />
                                        </a>

                                        <a
                                            href="https://www.linkedin.com/company/mauzovibe"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="LinkedIn"
                                            className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition"
                                        >
                                            <FaLinkedinIn />
                                        </a>

                                        <a
                                            href="https://www.youtube.com/@mauzovibe"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="YouTube"
                                            className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition"
                                        >
                                            <FaYoutube />
                                        </a>

                                        <a
                                            href="https://wa.me/255746856656"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="WhatsApp"
                                            className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition"
                                        >
                                            <FaWhatsapp />
                                        </a>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* =================================
                            NAVBAR
                        ================================== */}

                        <nav className="
                            sticky top-0 z-50
                            border-b border-slate-200/70
                            bg-white/95 backdrop-blur-xl shadow-sm
                        ">

                            <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">

                                <div className="min-h-[72px] flex items-center justify-between gap-4">

                                    {/* LOGO */}

                                    <Link
                                        href="/"
                                        onClick={closeMobileMenu}
                                        className="flex items-center gap-2.5 shrink-0"
                                    >

                                        <div className="
                                            w-11 h-11 rounded-xl
                                            bg-emerald-600
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
                                            font-extrabold tracking-tight
                                            text-slate-900
                                        ">
                                            Mauzo<span className="text-emerald-600">Vibe</span>
                                        </div>

                                    </Link>

                                    {/* DESKTOP MENU */}

                                    <div className="
                                        hidden lg:flex items-center gap-8
                                        text-sm font-semibold text-slate-700
                                    ">

                                        <a href="#home" className="hover:text-emerald-600 transition">
                                            Home
                                        </a>

                                        <Link href={route("faq")} className="hover:text-emerald-600 transition">
                                            FAQ
                                        </Link>

                                        <Link href={route("pricing")} className="hover:text-emerald-600 transition">
                                            Pricing
                                        </Link>

                                        <Link href={route("about")} className="hover:text-emerald-600 transition">
                                            About Us
                                        </Link>

                                    </div>

                                    {/* DESKTOP LOGIN */}

                                    <div className="hidden lg:block">

                                        {canLogin && (
                                            <Link
                                                href={route("login")}
                                                className="
                                                    inline-flex items-center gap-2
                                                    rounded-xl bg-emerald-600
                                                    px-6 py-3 text-sm font-bold
                                                    text-white shadow-lg
                                                    hover:bg-emerald-700
                                                    hover:-translate-y-0.5
                                                    transition
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
                                        onClick={() => setMobileMenuOpen((previous) => !previous)}
                                        className="
                                            lg:hidden w-11 h-11
                                            rounded-xl border border-slate-200
                                            bg-white flex items-center justify-center
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
                                                    href={route("login")}
                                                    onClick={closeMobileMenu}
                                                    className="
                                                        mt-3 flex items-center
                                                        justify-center gap-2
                                                        rounded-xl bg-emerald-600
                                                        px-5 py-3 text-sm
                                                        font-bold text-white
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

                        {/* =================================
                            HERO CONTENT
                        ================================== */}

                        <div className="flex-1 flex items-center">

                            <div className="
                                max-w-7xl w-full mx-auto
                                px-5 sm:px-6 xl:px-8
                                py-10 lg:py-14
                            ">

                                <div className="
                                    grid grid-cols-1 lg:grid-cols-12
                                    gap-10 lg:gap-16 items-center
                                ">

                                    {/* LEFT CONTENT */}

                                    <div className="lg:col-span-7 text-slate-950">

                                        {/* BADGE */}

                                        <div className="
                                            inline-flex items-center gap-2
                                            px-4 py-2 rounded-full
                                            bg-emerald-50 border border-emerald-200
                                            text-sm font-medium text-emerald-700
                                            mb-6 shadow-sm
                                        ">

                                            <span className="relative flex h-2.5 w-2.5">
                                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600" />
                                            </span>

                                            Smart Business Management System

                                        </div>

                                        {/* HEADING */}

                                        <h1 className="
                                            text-4xl sm:text-5xl
                                            lg:text-6xl xl:text-7xl
                                            font-extrabold leading-[1.05]
                                            tracking-tight text-slate-950
                                        ">
                                            Grow Your Business
                                            <br />
                                            With{" "}
                                            <span className="text-emerald-600">
                                                MauzoVibe
                                            </span>
                                        </h1>

                                        <p className="
                                            mt-5 max-w-xl
                                            text-base sm:text-lg
                                            leading-8 text-slate-700
                                        ">
                                            Manage sales, inventory, customers and
                                            business performance in one simple,
                                            powerful platform. Focus on growing
                                            your business while MauzoVibe handles
                                            the numbers.
                                        </p>

                                        {/* =================================
                                            DAILY POSTS SLIDER
                                        ================================== */}

                                        {posts.length > 0 && (
                                            <div className="mt-7 w-full max-w-2xl">

                                                <div className="
                                                    relative overflow-hidden
                                                    rounded-2xl border border-slate-200
                                                    bg-white shadow-xl
                                                    shadow-slate-900/10
                                                ">

                                                    <div className="
                                                        relative min-h-[240px]
                                                        sm:min-h-[280px]
                                                    ">

                                                        {posts.map((post, index) => (

                                                            <div
                                                                key={post.id ?? index}
                                                                aria-hidden={index !== currentPost}
                                                                className={`
                                                                    absolute inset-0
                                                                    transition-all duration-700
                                                                    ease-in-out
                                                                    ${
                                                                        index === currentPost
                                                                            ? "opacity-100 translate-x-0 z-10"
                                                                            : "opacity-0 translate-x-8 pointer-events-none z-0"
                                                                    }
                                                                `}
                                                            >

                                                                <div className="
                                                                    grid grid-cols-1
                                                                    sm:grid-cols-2
                                                                    min-h-[240px]
                                                                    sm:min-h-[280px]
                                                                ">

                                                                    {/* IMAGE */}

                                                                    <div className="
                                                                        relative h-[220px]
                                                                        sm:h-[280px]
                                                                        bg-slate-100
                                                                    ">

                                                                        <img
                                                                            src={post.image || "/images/shop.jpg"}
                                                                            alt={post.title || "MauzoVibe Daily Post"}
                                                                            className="absolute inset-0 w-full h-full object-cover"
                                                                            onError={(e) => {
                                                                                e.currentTarget.onerror = null;
                                                                                e.currentTarget.src = "/images/shop.jpg";
                                                                            }}
                                                                        />

                                                                        <div className="
                                                                            absolute inset-0
                                                                            bg-gradient-to-t
                                                                            from-black/50
                                                                            via-black/10
                                                                            to-transparent
                                                                        " />

                                                                        {post.type && (
                                                                            <span className="
                                                                                absolute top-4 left-4
                                                                                rounded-full bg-emerald-600
                                                                                px-3 py-1 text-xs
                                                                                font-bold text-white
                                                                            ">
                                                                                {post.type}
                                                                            </span>
                                                                        )}

                                                                    </div>

                                                                    {/* CONTENT */}

                                                                    <div className="
                                                                        flex flex-col justify-center
                                                                        bg-white p-5 sm:p-6
                                                                    ">

                                                                        {post.type && (
                                                                            <span className="
                                                                                mb-2 inline-flex w-fit
                                                                                rounded-full bg-emerald-50
                                                                                px-3 py-1 text-[11px]
                                                                                font-bold uppercase
                                                                                tracking-wide text-emerald-700
                                                                            ">
                                                                                {post.type}
                                                                            </span>
                                                                        )}

                                                                        <h3 className="
                                                                            text-lg sm:text-xl
                                                                            font-extrabold leading-tight
                                                                            text-slate-900
                                                                        ">
                                                                            {post.title}
                                                                        </h3>

                                                                        {post.description && (
                                                                            <p className="
                                                                                mt-2 text-sm
                                                                                leading-6 text-slate-600
                                                                                line-clamp-4
                                                                            ">
                                                                                {post.description}
                                                                            </p>
                                                                        )}

                                                                        {post.button_text && post.button_url && (
                                                                            <div className="mt-4">
                                                                                <Link
                                                                                    href={post.button_url}
                                                                                    className="
                                                                                        inline-flex items-center gap-2
                                                                                        rounded-xl bg-emerald-600
                                                                                        px-4 py-2.5 text-sm
                                                                                        font-bold text-white
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

                                                            </div>

                                                        ))}

                                                        {/* PREVIOUS */}

                                                        {posts.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={previousPost}
                                                                className="
                                                                    absolute left-3 top-1/2 z-30
                                                                    flex h-9 w-9 -translate-y-1/2
                                                                    items-center justify-center
                                                                    rounded-full bg-white/95
                                                                    text-slate-700 shadow-lg
                                                                    hover:bg-emerald-600
                                                                    hover:text-white transition
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
                                                                    absolute right-3 top-1/2 z-30
                                                                    flex h-9 w-9 -translate-y-1/2
                                                                    items-center justify-center
                                                                    rounded-full bg-white/95
                                                                    text-slate-700 shadow-lg
                                                                    hover:bg-emerald-600
                                                                    hover:text-white transition
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
                                                                absolute bottom-3 left-1/2 z-30
                                                                flex -translate-x-1/2 items-center
                                                                gap-1.5 rounded-full bg-black/20
                                                                px-2.5 py-1.5 backdrop-blur-sm
                                                            ">

                                                                {posts.map((post, index) => (
                                                                    <button
                                                                        key={post.id ?? index}
                                                                        type="button"
                                                                        onClick={() => setCurrentPost(index)}
                                                                        aria-label={`Show post ${index + 1}`}
                                                                        aria-current={index === currentPost}
                                                                        className={`
                                                                            h-2 rounded-full
                                                                            transition-all duration-300
                                                                            ${
                                                                                index === currentPost
                                                                                    ? "w-6 bg-emerald-500"
                                                                                    : "w-2 bg-white/70 hover:bg-white"
                                                                            }
                                                                        `}
                                                                    />
                                                                ))}

                                                            </div>
                                                        )}

                                                    </div>

                                                </div>

                                            </div>
                                        )}

                                        {/* FEATURES */}

                                        <div id="features" className="
                                            mt-7 flex flex-wrap
                                            gap-x-6 gap-y-3
                                            text-sm sm:text-base text-slate-700
                                        ">

                                            {["POS", "Inventory", "Customers", "Reports"].map((feature) => (
                                                <span key={feature} className="flex items-center gap-2">
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
                                                        px-6 py-3.5 rounded-xl
                                                        bg-emerald-600 hover:bg-emerald-700
                                                        text-white font-bold shadow-xl
                                                        shadow-emerald-600/20
                                                        hover:-translate-y-1 transition
                                                    "
                                                >
                                                    <span className="text-xl">👋</span>
                                                    {trialButtonText}
                                                </Link>
                                            )}

                                            <a
                                                href="#login"
                                                className="
                                                    inline-flex items-center justify-center gap-3
                                                    px-6 py-3.5 rounded-xl
                                                    bg-white/90 hover:bg-white
                                                    border border-slate-300
                                                    text-slate-900 font-semibold
                                                    shadow-sm hover:shadow-md transition
                                                "
                                            >
                                                <span className="
                                                    flex items-center justify-center
                                                    w-8 h-8 rounded-full
                                                    bg-emerald-100 text-emerald-600
                                                ">
                                                    ▶
                                                </span>
                                                Sign In
                                            </a>

                                        </div>

                                        {/* TRUST */}

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
                                                Built for growing businesses
                                            </span>

                                        </div>

                                    </div>

                                    {/* =================================
                                        LOGIN CARD
                                    ================================== */}

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
                                                    Welcome back 👋
                                                </h2>

                                                <p className="mt-2 text-sm text-slate-500">
                                                    Sign in to continue to your MauzoVibe account.
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
                                                        Username / Email
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
                                                            placeholder="Enter your email"
                                                            onChange={(e) => form.setData("email", e.target.value)}
                                                            className={`
                                                                w-full h-12 pl-12 pr-4
                                                                rounded-xl border
                                                                ${
                                                                    form.errors.email
                                                                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                                                                        : "border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                                                }
                                                                bg-slate-50 text-slate-900
                                                                placeholder-slate-400
                                                                outline-none transition-all
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
                                                            onChange={(e) => form.setData("password", e.target.value)}
                                                            className={`
                                                                w-full h-12 pl-12 pr-12
                                                                rounded-xl border
                                                                ${
                                                                    form.errors.password
                                                                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                                                                        : "border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                                                }
                                                                bg-slate-50 text-slate-900
                                                                placeholder-slate-400
                                                                outline-none transition-all
                                                            `}
                                                        />

                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword((previous) => !previous)}
                                                            aria-label={showPassword ? "Hide password" : "Show password"}
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

                                                <div className="flex items-center justify-between">

                                                    <label className="
                                                        inline-flex items-center
                                                        cursor-pointer select-none
                                                    ">

                                                        <input
                                                            type="checkbox"
                                                            checked={form.data.remember}
                                                            onChange={(e) => form.setData("remember", e.target.checked)}
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
                                                        Secure & safe
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
                                                        transition-all
                                                        disabled:opacity-60
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
                                                            Sign In
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
                                                        Don't have an account?

                                                        <Link
                                                            href={route("register")}
                                                            className="
                                                                ml-1 font-bold
                                                                text-emerald-600
                                                                hover:text-emerald-700
                                                            "
                                                        >
                                                            Sign Up
                                                        </Link>
                                                    </p>

                                                </div>
                                            )}

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* =================================
                            FOOTER
                        ================================== */}

                        <footer className="
                            mt-auto border-t border-slate-200/70
                            bg-white/90 backdrop-blur-md
                        ">

                            <div className="
                                max-w-7xl mx-auto
                                px-5 sm:px-6 xl:px-8 py-5
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
                                    Powered by Nac Technologies
                                </div>

                            </div>

                        </footer>

                    </div>

                </section>

            </div>
        </>
    );
}
