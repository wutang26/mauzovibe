import { useEffect, useMemo, useState } from "react";
import { Head, Link, useForm,  router, usePage } from "@inertiajs/react";

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
    /*
    |--------------------------------------------------------------------------
    | PAGE PROPS
    |--------------------------------------------------------------------------
    */

    const page = usePage();
    const auth = page?.props?.auth ?? null;

    /*
    |--------------------------------------------------------------------------
    | STATE
    |--------------------------------------------------------------------------
    */

    const [showPassword, setShowPassword] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [daysRemaining, setDaysRemaining] = useState(null);
    const [currentPost, setCurrentPost] = useState(0);

    /*
    |--------------------------------------------------------------------------
    | TRIAL INFORMATION
    |--------------------------------------------------------------------------
    */

    const trial = auth?.trial ?? null;
    const trialEndsAt = trial?.trial_ends_at ?? null;

    /*
    |--------------------------------------------------------------------------
    | CALCULATE TRIAL DAYS
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!trialEndsAt) {
            setDaysRemaining(null);
            return;
        }

        const calculateDaysRemaining = () => {
            const now = new Date();
            const trialEnd = new Date(trialEndsAt);

            if (Number.isNaN(trialEnd.getTime())) {
                setDaysRemaining(null);
                return;
            }

            const difference = trialEnd.getTime() - now.getTime();

            const days = Math.max(
                0,
                Math.ceil(
                    difference / (1000 * 60 * 60 * 24)
                )
            );

            setDaysRemaining(days);
        };

        calculateDaysRemaining();

        const interval = setInterval(
            calculateDaysRemaining,
            60 * 1000
        );

        return () => clearInterval(interval);
    }, [trialEndsAt]);

// =================================================
// DAILY POSTS SLIDER + DAILY REFRESH
// =================================================

useEffect(() => {
    const refreshDailyPosts = () => {
        router.reload({
            only: ["dailyPosts"],
            preserveScroll: true,
            preserveState: true,
        });
    };

    const interval = setInterval(
        refreshDailyPosts,
        5 * 60 * 1000
    );

    return () => clearInterval(interval);
}, []);


// =================================================
// REFRESH DAILY POSTS FROM LARAVEL
// =================================================

useEffect(() => {
    const refreshDailyPosts = () => {
        router.reload({
            only: ["dailyPosts"],
            preserveScroll: true,
            preserveState: true,
        });
    };

    // Check every 1 hour
    const refreshInterval = setInterval(
        refreshDailyPosts,
        60 * 60 * 1000
    );

    return () => clearInterval(refreshInterval);
}, []);



    /*
    |--------------------------------------------------------------------------
    | TRIAL BUTTON
    |--------------------------------------------------------------------------
    */

    const trialButtonText = useMemo(() => {
        if (trial?.is_expired || daysRemaining === 0) {
            return "Trial Expired";
        }

        if (daysRemaining !== null) {
            return `${daysRemaining} Days Left`;
        }

        return "Start Free Trial";
    }, [trial?.is_expired, daysRemaining]);

    /*
    |--------------------------------------------------------------------------
    | LOGIN FORM
    |--------------------------------------------------------------------------
    */

    const form = useForm({
        email: "",
        password: "",
        remember: false,
    });

    /*
    |--------------------------------------------------------------------------
    | LOGIN SUBMIT
    |--------------------------------------------------------------------------
    */

    const submit = (e) => {
        e.preventDefault();

        form.post(route("login"), {
            preserveScroll: true,

            onFinish: () => {
                form.reset("password");
            },
        });
    };

    /*
    |--------------------------------------------------------------------------
    | CLOSE MOBILE MENU
    |--------------------------------------------------------------------------
    */

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    /*
    |--------------------------------------------------------------------------
    | CURRENT YEAR
    |--------------------------------------------------------------------------
    */

    const currentYear = new Date().getFullYear();

    /*
    |--------------------------------------------------------------------------
    | RENDER
    |--------------------------------------------------------------------------
    */

    return (
        <>
            <Head title="MauzoVibe - Grow Your Business" />

            <div className="min-h-screen bg-white text-slate-900">

                {/* =====================================================
                    HERO
                ====================================================== */}

                <section
                    id="home"
                    className="relative min-h-screen overflow-hidden"
                >

                    {/* =================================================
                        BACKGROUND
                    ================================================== */}

                    <div className="absolute inset-0">

                        <img
                            src="/images/shop.jpg"
                            alt="MauzoVibe Business"
                            className="
                                h-full
                                w-full
                                object-cover
                                brightness-110
                                contrast-90
                            "
                        />

                        <div className="absolute inset-0 bg-white/30" />

                        <div
                            className="
                                absolute
                                inset-0
                                bg-gradient-to-r
                                from-white/90
                                via-white/55
                                to-white/10
                            "
                        />

                        <div
                            className="
                                absolute
                                inset-x-0
                                bottom-0
                                h-40
                                bg-gradient-to-t
                                from-white/70
                                to-transparent
                            "
                        />

                    </div>


                    {/* =================================================
                        PAGE CONTENT
                    ================================================== */}

                    <div className="relative z-10 min-h-screen flex flex-col">

                        {/* =================================================
                            CONTACT BAR
                        ================================================== */}

                        <div
                            className="
                                hidden
                                lg:block
                                border-b
                                border-slate-200/70
                                bg-white/85
                                backdrop-blur-md
                            "
                        >

                            <div className="max-w-7xl mx-auto px-6 xl:px-8">

                                <div
                                    className="
                                        h-10
                                        flex
                                        items-center
                                        justify-between
                                        text-xs
                                        text-slate-600
                                    "
                                >

                                    {/* Contact */}

                                    <div className="flex items-center gap-6">

                                        <span className="flex items-center gap-2">

                                            <svg
                                                className="w-4 h-4 text-emerald-600"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                            </svg>

                                            <span>
                                                mauzovibe@outlook.com
                                            </span>

                                        </span>


                                        <span className="flex items-center gap-2">

                                            <svg
                                                className="w-4 h-4 text-emerald-600"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M3 5a2 2 0 012-2h2.28a2 2 0 011.9 1.37l1.1 3.3a2 2 0 01-.45 2.05l-1.4 1.4a16 16 0 006.14 6.14l1.4-1.4a2 2 0 012.05-.45l3.3 1.1A2 2 0 0121 17.72V20a2 2 0 01-2 2h-1C9.72 22 2 14.28 2 5V4a2 2 0 012-2h1"
                                                />
                                            </svg>

                                            <span>
                                                +255 (0)748565656
                                            </span>

                                        </span>

                                    </div>


                                    {/* Social */}

                                    <div className="flex items-center gap-3">

                                        <a
                                            href="https://www.facebook.com/mauzovibe"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="MauzoVibe Facebook"
                                            className="
                                                w-10
                                                h-10
                                                rounded-xl
                                                bg-slate-100
                                                flex
                                                items-center
                                                justify-center
                                                text-slate-500
                                                hover:bg-emerald-600
                                                hover:text-white
                                                hover:-translate-y-1
                                                transition-all
                                                duration-200
                                            "
                                        >
                                            <FaFacebookF className="w-4 h-4" />
                                        </a>


                                        <a
                                            href="https://www.instagram.com/mauzovibe"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="MauzoVibe Instagram"
                                            className="
                                                w-10
                                                h-10
                                                rounded-xl
                                                bg-slate-100
                                                flex
                                                items-center
                                                justify-center
                                                text-slate-500
                                                hover:bg-emerald-600
                                                hover:text-white
                                                hover:-translate-y-1
                                                transition-all
                                                duration-200
                                            "
                                        >
                                            <FaInstagram className="w-5 h-5" />
                                        </a>


                                        <a
                                            href="https://www.linkedin.com/company/mauzovibe"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="MauzoVibe LinkedIn"
                                            className="
                                                w-10
                                                h-10
                                                rounded-xl
                                                bg-slate-100
                                                flex
                                                items-center
                                                justify-center
                                                text-slate-500
                                                hover:bg-emerald-600
                                                hover:text-white
                                                hover:-translate-y-1
                                                transition-all
                                                duration-200
                                            "
                                        >
                                            <FaLinkedinIn className="w-5 h-5" />
                                        </a>


                                        <a
                                            href="https://www.youtube.com/@mauzovibe"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="MauzoVibe YouTube"
                                            className="
                                                w-10
                                                h-10
                                                rounded-xl
                                                bg-slate-100
                                                flex
                                                items-center
                                                justify-center
                                                text-slate-500
                                                hover:bg-emerald-600
                                                hover:text-white
                                                hover:-translate-y-1
                                                transition-all
                                                duration-200
                                            "
                                        >
                                            <FaYoutube className="w-5 h-5" />
                                        </a>


                                        <a
                                            href="https://wa.me/255746856656"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="MauzoVibe WhatsApp"
                                            className="
                                                w-10
                                                h-10
                                                rounded-xl
                                                bg-slate-100
                                                flex
                                                items-center
                                                justify-center
                                                text-slate-500
                                                hover:bg-emerald-600
                                                hover:text-white
                                                hover:-translate-y-1
                                                transition-all
                                                duration-200
                                            "
                                        >
                                            <FaWhatsapp className="w-5 h-5" />
                                        </a>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            NAVBAR
                        ================================================== */}

                        <nav
                            className="
                                sticky
                                top-0
                                z-50
                                border-b
                                border-slate-200/70
                                bg-white/95
                                backdrop-blur-xl
                                shadow-sm
                            "
                        >

                            <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">

                                <div
                                    className="
                                        min-h-[72px]
                                        flex
                                        items-center
                                        justify-between
                                        gap-4
                                    "
                                >

                                    {/* LOGO */}

                                    <Link
                                        href="/"
                                        onClick={closeMobileMenu}
                                        className="
                                            flex
                                            items-center
                                            gap-2.5
                                            group
                                            shrink-0
                                        "
                                    >

                                        <div
                                            className="
                                                relative
                                                flex
                                                items-center
                                                justify-center
                                                w-10
                                                h-10
                                                sm:w-11
                                                sm:h-11
                                                rounded-xl
                                                bg-emerald-600
                                                shadow-lg
                                                shadow-emerald-600/20
                                                transition-all
                                                duration-200
                                                group-hover:-translate-y-0.5
                                            "
                                        >

                                            <svg
                                                className="
                                                    w-6
                                                    h-6
                                                    sm:w-7
                                                    sm:h-7
                                                    text-white
                                                "
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

                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M8 12h.01M16 12h.01"
                                                />

                                            </svg>

                                        </div>


                                        <div className="leading-none">

                                            <div
                                                className="
                                                    text-xl
                                                    sm:text-2xl
                                                    lg:text-3xl
                                                    font-extrabold
                                                    tracking-tight
                                                    text-slate-900
                                                "
                                            >
                                                Mauzo
                                                <span className="text-emerald-600">
                                                    Vibe
                                                </span>
                                            </div>

                                        </div>

                                    </Link>


                                    {/* DESKTOP MENU */}

                                    <div
                                        className="
                                            hidden
                                            lg:flex
                                            items-center
                                            gap-7
                                            xl:gap-9
                                            text-sm
                                            font-semibold
                                            text-slate-700
                                        "
                                    >

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


                                        <Link
                                            href={route("marketplace.index")}
                                            className="hover:text-emerald-600 transition"
                                        >
                                          🛍️  MarketPlace
                                        </Link>

                                    </div>


                                    {/* DESKTOP LOGIN */}

                                    <div className="hidden lg:block shrink-0">

                                        {canLogin && (
                                            <Link
                                                href={route("login")}
                                                className="
                                                    group
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    rounded-xl
                                                    bg-emerald-600
                                                    px-5
                                                    xl:px-6
                                                    py-3
                                                    text-sm
                                                    font-bold
                                                    text-white
                                                    shadow-lg
                                                    shadow-emerald-600/20
                                                    transition-all
                                                    duration-200
                                                    hover:-translate-y-0.5
                                                    hover:bg-emerald-700
                                                    hover:shadow-xl
                                                "
                                            >

                                                Sign In

                                                <svg
                                                    className="
                                                        w-4
                                                        h-4
                                                        transition-transform
                                                        group-hover:translate-x-1
                                                    "
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >

                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M5 12h14M13 6l6 6-6 6"
                                                    />

                                                </svg>

                                            </Link>
                                        )}

                                    </div>


                                    {/* MOBILE BUTTON */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setMobileMenuOpen(
                                                (previous) => !previous
                                            )
                                        }
                                        className="
                                            lg:hidden
                                            flex
                                            items-center
                                            justify-center
                                            w-11
                                            h-11
                                            rounded-xl
                                            border
                                            border-slate-200
                                            bg-white
                                            text-slate-700
                                            shadow-sm
                                            hover:border-emerald-300
                                            hover:text-emerald-600
                                            transition-all
                                        "
                                        aria-label="Toggle navigation menu"
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
                                    <div
                                        className="
                                            lg:hidden
                                            border-t
                                            border-slate-100
                                            py-4
                                        "
                                    >

                                        <div className="flex flex-col gap-1">

                                            {/* Home */}

                                            <a
                                                href="#home"
                                                onClick={closeMobileMenu}
                                                className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                    px-4
                                                    py-3
                                                    rounded-xl
                                                    text-sm
                                                    font-semibold
                                                    text-slate-700
                                                    hover:bg-emerald-50
                                                    hover:text-emerald-600
                                                    transition
                                                "
                                            >

                                                <span>
                                                    Home
                                                </span>

                                                <ChevronRightIcon className="w-4 h-4" />

                                            </a>


                                            {/* FAQ */}

                                            <Link
                                                href={route("faq")}
                                                onClick={closeMobileMenu}
                                                className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                    px-4
                                                    py-3
                                                    rounded-xl
                                                    text-sm
                                                    font-semibold
                                                    text-slate-700
                                                    hover:bg-emerald-50
                                                    hover:text-emerald-600
                                                    transition
                                                "
                                            >

                                                <span>
                                                    FAQ
                                                </span>

                                                <ChevronRightIcon className="w-4 h-4" />

                                            </Link>


                                            {/* Pricing */}

                                            <Link
                                                href={route("pricing")}
                                                onClick={closeMobileMenu}
                                                className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                    px-4
                                                    py-3
                                                    rounded-xl
                                                    text-sm
                                                    font-semibold
                                                    text-slate-700
                                                    hover:bg-emerald-50
                                                    hover:text-emerald-600
                                                    transition
                                                "
                                            >

                                                <span>
                                                    Pricing
                                                </span>

                                                <ChevronRightIcon className="w-4 h-4" />

                                            </Link>


                                            {/* About */}

                                            <Link
                                                href={route("about")}
                                                onClick={closeMobileMenu}
                                                className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                    px-4
                                                    py-3
                                                    rounded-xl
                                                    text-sm
                                                    font-semibold
                                                    text-slate-700
                                                    hover:bg-emerald-50
                                                    hover:text-emerald-600
                                                    transition
                                                "
                                            >

                                                <span>
                                                    About Us
                                                </span>

                                                <ChevronRightIcon className="w-4 h-4" />

                                            </Link>


                                            {/* Marketplace */}

                                            <Link
                                                href={route("marketplace.index")}
                                                onClick={closeMobileMenu}
                                                className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                    px-4
                                                    py-3
                                                    rounded-xl
                                                    text-sm
                                                    font-semibold
                                                    text-slate-700
                                                    hover:bg-emerald-50
                                                    hover:text-emerald-600
                                                    transition
                                                "
                                            >

                                                <span>
                                                    MarketPlace
                                                </span>

                                                <ChevronRightIcon className="w-4 h-4" />

                                            </Link>


                                            {/* Mobile Sign In */}

                                            {canLogin && (
                                                <Link
                                                    href={route("login")}
                                                    onClick={closeMobileMenu}
                                                    className="
                                                        mt-3
                                                        flex
                                                        items-center
                                                        justify-center
                                                        gap-2
                                                        w-full
                                                        rounded-xl
                                                        bg-emerald-600
                                                        px-5
                                                        py-3
                                                        text-sm
                                                        font-bold
                                                        text-white
                                                        shadow-lg
                                                        shadow-emerald-600/20
                                                        hover:bg-emerald-700
                                                        transition
                                                    "
                                                >

                                                    Sign In

                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >

                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M5 12h14M13 6l6 6-6 6"
                                                        />

                                                    </svg>

                                                </Link>
                                            )}

                                        </div>

                                    </div>
                                )}

                            </div>

                        </nav>


                        {/* =================================================
                            HERO CONTENT
                        ================================================== */}

                        <div className="flex-1 flex items-center">

                            <div
                                className="
                                    max-w-7xl
                                    w-full
                                    mx-auto
                                    px-5
                                    sm:px-6
                                    xl:px-8
                                    py-10
                                    lg:py-14
                                "
                            >

                                <div
                                    className="
                                        grid
                                        grid-cols-1
                                        lg:grid-cols-12
                                        gap-10
                                        lg:gap-16
                                        items-center
                                    "
                                >

                                    {/* =================================================
                                        LEFT
                                    ================================================== */}

                                    <div className="lg:col-span-7 text-slate-950">

                                        {/* Badge */}

                                        <div
                                            className="
                                                inline-flex
                                                items-center
                                                gap-2
                                                px-4
                                                py-2
                                                rounded-full
                                                bg-emerald-50
                                                border
                                                border-emerald-200
                                                text-sm
                                                font-medium
                                                text-emerald-700
                                                mb-6
                                                shadow-sm
                                            "
                                        >

                                            <span className="relative flex h-2.5 w-2.5">

                                                <span
                                                    className="
                                                        absolute
                                                        inline-flex
                                                        h-full
                                                        w-full
                                                        rounded-full
                                                        bg-emerald-400
                                                        opacity-75
                                                        animate-ping
                                                    "
                                                />

                                                <span
                                                    className="
                                                        relative
                                                        inline-flex
                                                        h-2.5
                                                        w-2.5
                                                        rounded-full
                                                        bg-emerald-600
                                                    "
                                                />

                                            </span>

                                            Smart Business Management System

                                        </div>


                                        {/* Heading */}

                                        <h1
                                            className="
                                                text-4xl
                                                sm:text-5xl
                                                lg:text-6xl
                                                xl:text-7xl
                                                font-extrabold
                                                leading-[1.05]
                                                tracking-tight
                                                text-slate-950
                                            "
                                        >

                                            Grow Your Business

                                            <br />

                                            With{" "}

                                            <span className="text-emerald-600">
                                                MauzoVibe
                                            </span>

                                        </h1>


                                     
{/* DAILY POSTS SLIDER */}
{/* =================================================
    DAILY POSTS SLIDER
================================================== */}

{dailyPosts.length > 0 && (
    <div className="mt-7 w-full max-w-2xl">

        <div
            className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-xl
                shadow-slate-900/10
            "
        >

            {/* =================================================
                SLIDES
            ================================================== */}

            <div className="relative min-h-[240px] sm:min-h-[280px]">

                {dailyPosts.map((post, index) => (

                    <div
                        key={post.id ?? index}
                        className={`
                            absolute
                            inset-0
                            transition-all
                            duration-700
                            ease-in-out
                            ${
                                index === currentPost
                                    ? "opacity-100 translate-x-0 z-10"
                                    : "opacity-0 translate-x-8 pointer-events-none z-0"
                            }
                        `}
                    >

                        <div className="grid grid-cols-1 sm:grid-cols-2 min-h-[240px] sm:min-h-[280px]">

                            {/* =================================================
                                IMAGE
                            ================================================== */}

                            <div className="relative h-[220px] sm:h-[280px] bg-slate-100">

                                {post.image ? (
                                    <img
                                        src={post.image}
                                        alt={
                                            post.title ||
                                            "MauzoVibe Daily Post"
                                        }
                                        className="
                                            absolute
                                            inset-0
                                            h-full
                                            w-full
                                            object-cover
                                        "
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                "/images/shop.jpg";
                                        }}
                                    />
                                ) : (
                                    <img
                                        src="/images/shop.jpg"
                                        alt="MauzoVibe"
                                        className="
                                            absolute
                                            inset-0
                                            h-full
                                            w-full
                                            object-cover
                                        "
                                    />
                                )}

                                {/* Image overlay */}

                                <div
                                    className="
                                        absolute
                                        inset-0
                                        bg-gradient-to-t
                                        from-black/50
                                        via-black/10
                                        to-transparent
                                    "
                                />

                                {/* Post type */}

                                {post.type && (
                                    <div
                                        className="
                                            absolute
                                            top-4
                                            left-4
                                            rounded-full
                                            bg-emerald-600
                                            px-3
                                            py-1
                                            text-xs
                                            font-bold
                                            text-white
                                            shadow-lg
                                        "
                                    >
                                        {post.type}
                                    </div>
                                )}

                            </div>


                            {/* =================================================
                                CONTENT
                            ================================================== */}

                            <div
                                className="
                                    flex
                                    flex-col
                                    justify-center
                                    bg-white
                                    p-5
                                    sm:p-6
                                "
                            >

                                {/* Type */}

                                {post.type && (
                                    <span
                                        className="
                                            mb-2
                                            inline-flex
                                            w-fit
                                            rounded-full
                                            bg-emerald-50
                                            px-3
                                            py-1
                                            text-[11px]
                                            font-bold
                                            uppercase
                                            tracking-wide
                                            text-emerald-700
                                        "
                                    >
                                        {post.type}
                                    </span>
                                )}


                                {/* Title */}

                                <h3
                                    className="
                                        text-lg
                                        sm:text-xl
                                        font-extrabold
                                        leading-tight
                                        text-slate-900
                                    "
                                >
                                    {post.title}
                                </h3>


                                {/* Description */}

                                {post.description && (
                                    <p
                                        className="
                                            mt-2
                                            text-sm
                                            leading-6
                                            text-slate-600
                                            line-clamp-4
                                        "
                                    >
                                        {post.description}
                                    </p>
                                )}


                                {/* Button */}

                                {post.button_text && post.button_url && (
                                    <div className="mt-4">

                                        <Link
                                            href={post.button_url}
                                            className="
                                                inline-flex
                                                items-center
                                                gap-2
                                                rounded-xl
                                                bg-emerald-600
                                                px-4
                                                py-2.5
                                                text-sm
                                                font-bold
                                                text-white
                                                shadow-md
                                                shadow-emerald-600/20
                                                transition
                                                hover:bg-emerald-700
                                                hover:-translate-y-0.5
                                            "
                                        >

                                            {post.button_text}

                                            <ChevronRightIcon
                                                className="w-4 h-4"
                                            />

                                        </Link>

                                    </div>
                                )}

                            </div>

                        </div>

                    </div>

                ))}


                {/* =================================================
                    PREVIOUS BUTTON
                ================================================== */}

                {dailyPosts.length > 1 && (
                    <button
                        type="button"
                        onClick={() =>
                            setCurrentPost(
                                (currentPost - 1 + dailyPosts.length) %
                                    dailyPosts.length
                            )
                        }
                        className="
                            absolute
                            left-3
                            top-1/2
                            z-30
                            flex
                            h-9
                            w-9
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            bg-white/95
                            text-slate-700
                            shadow-lg
                            transition
                            hover:bg-emerald-600
                            hover:text-white
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


                {/* =================================================
                    NEXT BUTTON
                ================================================== */}

                {dailyPosts.length > 1 && (
                    <button
                        type="button"
                        onClick={() =>
                            setCurrentPost(
                                (currentPost + 1) %
                                    dailyPosts.length
                            )
                        }
                        className="
                            absolute
                            right-3
                            top-1/2
                            z-30
                            flex
                            h-9
                            w-9
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            bg-white/95
                            text-slate-700
                            shadow-lg
                            transition
                            hover:bg-emerald-600
                            hover:text-white
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


                {/* =================================================
                    DOTS
                ================================================== */}

                {dailyPosts.length > 1 && (
                    <div
                        className="
                            absolute
                            bottom-3
                            left-1/2
                            z-30
                            flex
                            -translate-x-1/2
                            items-center
                            gap-1.5
                            rounded-full
                            bg-black/20
                            px-2.5
                            py-1.5
                            backdrop-blur-sm
                        "
                    >

                        {dailyPosts.map((post, index) => (
                            <button
                                key={post.id ?? index}
                                type="button"
                                onClick={() =>
                                    setCurrentPost(index)
                                }
                                aria-label={`Show post ${index + 1}`}
                                className={`
                                    h-2
                                    rounded-full
                                    transition-all
                                    duration-300
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
                                        {/* Features */}

                                        <div
                                            id="features"
                                            className="
                                                mt-7
                                                flex
                                                flex-wrap
                                                gap-x-6
                                                gap-y-3
                                                text-sm
                                                sm:text-base
                                                text-slate-700
                                            "
                                        >

                                            <span className="flex items-center gap-2">
                                                <span className="text-emerald-600">
                                                    ●
                                                </span>
                                                POS
                                            </span>

                                            <span className="flex items-center gap-2">
                                                <span className="text-emerald-600">
                                                    ●
                                                </span>
                                                Inventory
                                            </span>

                                            <span className="flex items-center gap-2">
                                                <span className="text-emerald-600">
                                                    ●
                                                </span>
                                                Customers
                                            </span>

                                            <span className="flex items-center gap-2">
                                                <span className="text-emerald-600">
                                                    ●
                                                </span>
                                                Reports
                                            </span>
                                             <span className="flex items-center gap-2">
                                                <span className="text-emerald-600">
                                                    ●
                                                </span>
                                                MarketPlace
                                            </span>
                                        </div>


                                        {/* CTA */}

                                      
                                 
<div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

    {/* Start Free Trial */}
    {canRegister && (
        <Link
            href={route("register")}
            className="
                group
                inline-flex
                items-center
                justify-center
                gap-2.5
                px-6
                py-3.5
                rounded-xl
                bg-emerald-600
                hover:bg-emerald-700
                text-white
                font-bold
                shadow-xl
                shadow-emerald-600/20
                hover:-translate-y-1
                transition-all
                duration-200
                whitespace-nowrap
            "
        >
            {/* 👋 Hand Icon */}
            <span
                className="
                    text-xl
                    leading-none
                    transition-transform
                    duration-200
                    group-hover:scale-110
                    group-hover:-rotate-6
                "
            >
                👋
            </span>

            <span>
                {trialButtonText}
            </span>

            {/* Arrow */}
            {/* <svg
                className="
                    w-5
                    h-5
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M13 6l6 6-6 6"
                />
            </svg> */}
        </Link>
    )}

    {/* Watch Demo */}
    <button
        type="button"
        className="
            group
            inline-flex
            items-center
            justify-center
            gap-3
            px-6
            py-3.5
            rounded-xl
            bg-white/90
            hover:bg-white
            border
            border-slate-300
            text-slate-900
            font-semibold
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:shadow-md
            whitespace-nowrap
        "
    >
        {/* ▶ Play Icon */}
        <span
            className="
                flex
                items-center
                justify-center
                w-8
                h-8
                rounded-full
                bg-emerald-100
                text-emerald-600
                group-hover:bg-emerald-600
                group-hover:text-white
                transition-all
                duration-200
                group-hover:scale-110
            "
        >
            ▶
        </span>

        <span>
            Watch Demo
        </span>
    </button>

    {/* MauzoVibe Ecommerce */}
    <Link
        href={route("marketplace.index")}
        className="
            group
            inline-flex
            items-center
            justify-center
            gap-2.5
            px-5
            py-3
            rounded-xl
            bg-white/90
            hover:bg-white
            border
            border-emerald-300
            text-slate-900
            font-bold
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:shadow-md
            whitespace-nowrap
        "
    >
        {/* 🛍️ Shopping Icon */}
        <span
            className="
                flex
                items-center
                justify-center
                w-8
                h-8
                rounded-lg
                bg-emerald-100
                text-emerald-600
                group-hover:bg-emerald-600
                group-hover:text-white
                transition-all
                duration-200
                group-hover:scale-110
            "
        >
            🛍️
        </span>

        {/* Brand */}
        <span className="flex flex-col items-start leading-tight">
            <span className="text-sm font-extrabold">
                MauzoVibe
            </span>

            <span className="text-xs text-emerald-600 font-semibold">
                Ecommerce
            </span>
        </span>

        {/* Arrow */}
        {/* <svg
            className="
                w-4
                h-4
                transition-transform
                duration-200
                group-hover:translate-x-1
            "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M13 6l6 6-6 6"
            />
        </svg> */}
    </Link>

</div>




                                        {/* Trust */}

                                        <div
                                            className="
                                                mt-8
                                                flex
                                                items-center
                                                gap-3
                                                text-sm
                                                text-slate-600
                                            "
                                        >

                                            <div className="flex -space-x-2">

                                                <div
                                                    className="
                                                        w-8
                                                        h-8
                                                        rounded-full
                                                        bg-emerald-600
                                                        border-2
                                                        border-white
                                                        shadow-sm
                                                    "
                                                />

                                                <div
                                                    className="
                                                        w-8
                                                        h-8
                                                        rounded-full
                                                        bg-emerald-400
                                                        border-2
                                                        border-white
                                                        shadow-sm
                                                    "
                                                />

                                                <div
                                                    className="
                                                        w-8
                                                        h-8
                                                        rounded-full
                                                        bg-emerald-200
                                                        border-2
                                                        border-white
                                                        shadow-sm
                                                    "
                                                />

                                            </div>

                                            <span>
                                                Built for growing businesses
                                            </span>

                                        </div>

                                    </div>


                                    {/* =================================================
                                        LOGIN CARD
                                    ================================================== */}

                                    <div className="lg:col-span-5">

                                        <div
                                            className="
                                                w-full
                                                max-w-md
                                                mx-auto
                                                rounded-3xl
                                                bg-white
                                                border
                                                border-slate-100
                                                shadow-2xl
                                                shadow-slate-900/10
                                                p-6
                                                sm:p-8
                                            "
                                        >

                                            {/* Icon */}

                                            <div className="flex justify-center mb-5">

                                                <div
                                                    className="
                                                        w-16
                                                        h-16
                                                        rounded-2xl
                                                        bg-emerald-50
                                                        border
                                                        border-emerald-100
                                                        flex
                                                        items-center
                                                        justify-center
                                                        shadow-sm
                                                    "
                                                >

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


                                            {/* Header */}

                                            <div className="text-center mb-7">

                                                <h2
                                                    className="
                                                        text-2xl
                                                        sm:text-3xl
                                                        font-bold
                                                        text-slate-900
                                                    "
                                                >
                                                    Welcome back 👋
                                                </h2>

                                                <p className="mt-2 text-sm text-slate-500">
                                                    Sign in to continue to your
                                                    MauzoVibe account.
                                                </p>

                                            </div>


                                            {/* Login Form */}

                                            <form
                                                onSubmit={submit}
                                                className="space-y-5"
                                            >

                                                {/* Email */}

                                                <div>

                                                    <label
                                                        htmlFor="email"
                                                        className="
                                                            block
                                                            text-sm
                                                            font-semibold
                                                            text-slate-700
                                                            mb-2
                                                        "
                                                    >
                                                        Username / Email
                                                    </label>


                                                    <div className="relative">

                                                        <div
                                                            className="
                                                                absolute
                                                                inset-y-0
                                                                left-0
                                                                flex
                                                                items-center
                                                                pl-4
                                                                pointer-events-none
                                                            "
                                                        >

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
                                                            placeholder="Enter your email"
                                                            onChange={(e) =>
                                                                form.setData(
                                                                    "email",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className={`
                                                                w-full
                                                                h-12
                                                                pl-12
                                                                pr-4
                                                                rounded-xl
                                                                border
                                                                ${form.errors.email
                                                                    ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                                                                    : "border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                                                }
                                                                bg-slate-50
                                                                text-slate-900
                                                                placeholder-slate-400
                                                                outline-none
                                                                transition-all
                                                            `}
                                                        />

                                                    </div>


                                                    {form.errors.email && (
                                                        <p className="mt-2 text-sm text-red-600">
                                                            {form.errors.email}
                                                        </p>
                                                    )}

                                                </div>


                                                {/* Password */}

                                                <div>

                                                    <div className="flex items-center justify-between mb-2">

                                                        <label
                                                            htmlFor="password"
                                                            className="
                                                                block
                                                                text-sm
                                                                font-semibold
                                                                text-slate-700
                                                            "
                                                        >
                                                            Password
                                                        </label>

                                                        <span className="text-xs text-slate-400">
                                                            Secure Login
                                                        </span>

                                                    </div>


                                                    <div className="relative">

                                                        <div
                                                            className="
                                                                absolute
                                                                inset-y-0
                                                                left-0
                                                                flex
                                                                items-center
                                                                pl-4
                                                                pointer-events-none
                                                            "
                                                        >

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
                                                            type={
                                                                showPassword
                                                                    ? "text"
                                                                    : "password"
                                                            }
                                                            value={form.data.password}
                                                            autoComplete="current-password"
                                                            placeholder="Enter your password"
                                                            onChange={(e) =>
                                                                form.setData(
                                                                    "password",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className={`
                                                                w-full
                                                                h-12
                                                                pl-12
                                                                pr-12
                                                                rounded-xl
                                                                border
                                                                ${form.errors.password
                                                                    ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                                                                    : "border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                                                }
                                                                bg-slate-50
                                                                text-slate-900
                                                                placeholder-slate-400
                                                                outline-none
                                                                transition-all
                                                            `}
                                                        />


                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setShowPassword(
                                                                    (previous) =>
                                                                        !previous
                                                                )
                                                            }
                                                            aria-label={
                                                                showPassword
                                                                    ? "Hide password"
                                                                    : "Show password"
                                                            }
                                                            className="
                                                                absolute
                                                                inset-y-0
                                                                right-0
                                                                flex
                                                                items-center
                                                                px-4
                                                                text-slate-400
                                                                hover:text-emerald-600
                                                                transition
                                                            "
                                                        >

                                                            {showPassword ? (
                                                                <svg
                                                                    className="w-5 h-5"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1.8"
                                                                >

                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M3 3l18 18"
                                                                    />

                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M10.58 10.58a2 2 0 102.83 2.83"
                                                                    />

                                                                </svg>
                                                            ) : (
                                                                <svg
                                                                    className="w-5 h-5"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1.8"
                                                                >

                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M2.5 12S6 4 12 4s9.5 8 9.5 8S18 20 12 20 2.5 12 2.5 12z"
                                                                    />

                                                                    <circle
                                                                        cx="12"
                                                                        cy="12"
                                                                        r="3"
                                                                    />

                                                                </svg>
                                                            )}

                                                        </button>

                                                    </div>


                                                    {form.errors.password && (
                                                        <p className="mt-2 text-sm text-red-600">
                                                            {form.errors.password}
                                                        </p>
                                                    )}

                                                </div>


                                                {/* Remember */}

                                                <div className="flex items-center justify-between">

                                                    <label
                                                        className="
                                                            inline-flex
                                                            items-center
                                                            cursor-pointer
                                                            select-none
                                                        "
                                                    >

                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                form.data.remember
                                                            }
                                                            onChange={(e) =>
                                                                form.setData(
                                                                    "remember",
                                                                    e.target.checked
                                                                )
                                                            }
                                                            className="
                                                                w-4
                                                                h-4
                                                                rounded
                                                                border-slate-300
                                                                text-emerald-600
                                                                focus:ring-emerald-500
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


                                                {/* Login Button */}

                                                <button
                                                    type="submit"
                                                    disabled={form.processing}
                                                    className="
                                                        group
                                                        relative
                                                        w-full
                                                        h-12
                                                        overflow-hidden
                                                        rounded-xl
                                                        bg-emerald-600
                                                        hover:bg-emerald-700
                                                        active:bg-emerald-800
                                                        text-white
                                                        font-bold
                                                        text-base
                                                        shadow-lg
                                                        shadow-emerald-600/20
                                                        transition-all
                                                        duration-200
                                                        hover:-translate-y-0.5
                                                        hover:shadow-xl
                                                        hover:shadow-emerald-600/25
                                                        disabled:opacity-60
                                                        disabled:cursor-not-allowed
                                                        disabled:hover:translate-y-0
                                                        flex
                                                        items-center
                                                        justify-center
                                                        gap-2
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
                                                            <span>
                                                                Sign In
                                                            </span>

                                                            <svg
                                                                className="
                                                                    w-5
                                                                    h-5
                                                                    transition-transform
                                                                    duration-200
                                                                    group-hover:translate-x-1
                                                                "
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                            >

                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M5 12h14M13 6l6 6-6 6"
                                                                />

                                                            </svg>
                                                        </>
                                                    )}

                                                </button>

                                            </form>


                                            {/* Register */}

                                            {canRegister && (
                                                <div
                                                    className="
                                                        mt-6
                                                        pt-6
                                                        border-t
                                                        border-slate-100
                                                        text-center
                                                    "
                                                >

                                                    <p className="text-sm text-slate-500">

                                                        Don't have an account?

                                                        <Link
                                                            href={route("register")}
                                                            className="
                                                                ml-1
                                                                font-bold
                                                                text-emerald-600
                                                                hover:text-emerald-700
                                                                transition
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


                        {/* =================================================
                            FOOTER
                        ================================================== */}

                        <footer
                            className="
                                mt-auto
                                border-t
                                border-slate-200/70
                                bg-white/90
                                backdrop-blur-md
                            "
                        >

                            <div
                                className="
                                    max-w-7xl
                                    mx-auto
                                    px-5
                                    sm:px-6
                                    xl:px-8
                                    py-5
                                "
                            >

                                <div
                                    className="
                                        flex
                                        flex-col
                                        sm:flex-row
                                        items-center
                                        justify-between
                                        gap-4
                                        text-xs
                                        text-slate-500
                                    "
                                >

                                    <span className="text-center sm:text-left">
                                        © {currentYear} MauzoVibe.
                                        All rights reserved.
                                    </span>


                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            flex-wrap
                                            gap-x-5
                                            gap-y-2
                                        "
                                    >

                                        <Link
                                            href={route("privacy")}
                                            className="
                                                font-medium
                                                hover:text-emerald-600
                                                transition
                                            "
                                        >
                                            Privacy
                                        </Link>


                                        <Link
                                            href={route("terms")}
                                            className="
                                                font-medium
                                                hover:text-emerald-600
                                                transition
                                            "
                                        >
                                            Terms
                                        </Link>


                                        <Link
                                            href={route("support")}
                                            className="
                                                font-medium
                                                hover:text-emerald-600
                                                transition
                                            "
                                        >
                                            Support
                                        </Link>

                                    </div>

                                </div>

                            </div>

                        </footer>

                    </div>

                </section>

            </div>
        </>
    );
}

