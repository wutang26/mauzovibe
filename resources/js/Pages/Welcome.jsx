
import { useEffect, useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";

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

export default function Welcome({ canLogin, canRegister }) {

    const { auth } = usePage().props;

    const [showPassword, setShowPassword] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // kuendelea na code yako...
// export default function Welcome({ canLogin, canRegister }) {
//     const [showPassword, setShowPassword] = useState(false);
//export default function Welcome({ canLogin, canRegister }) {

    //const { auth } = usePage().props;

    //const [showPassword, setShowPassword] = useState(false);

    // ==========================================================
    // FREE TRIAL COUNTDOWN
    // ==========================================================

    const trialEndsAt = auth?.trial?.trial_ends_at;

    const [daysRemaining, setDaysRemaining] = useState(
        auth?.trial?.days_remaining ?? null
    );

    useEffect(() => {

        if (!trialEndsAt) {
            return;
        }

        const calculateDaysRemaining = () => {

            const now = new Date();

            const trialEnd = new Date(trialEndsAt);

            const difference = trialEnd.getTime() - now.getTime();

            const days = Math.max(
                0,
                Math.ceil(
                    difference / (1000 * 60 * 60 * 24)
                )
            );

            setDaysRemaining(days);
        };

        // Calculate immediately
        calculateDaysRemaining();

        // Update every minute
        const interval = setInterval(
            calculateDaysRemaining,
            60000
        );

        return () => clearInterval(interval);

    }, [trialEndsAt]);

    // ==========================================================
    // TRIAL BUTTON TEXT
    // ==========================================================

    const trialButtonText =
        auth?.trial?.is_expired || daysRemaining === 0
            ? "Trial Expired"
            : daysRemaining !== null
                ? `${daysRemaining} Days Left`
                : "Start Free Trial";
    const form = useForm({
        email: "",
        password: "",
        remember: false,
    });

    function submit(e) {
        e.preventDefault();

        form.post(route("login"), {
            onFinish: () => form.reset("password"),
        });
    }

    return (
        <>
            <Head title="MauzoVibe - Grow Your Business" />

            <div className="min-h-screen bg-white text-slate-900">

                {/* =====================================================
                    HERO SECTION
                ====================================================== */}
                <section
                    id="home"
                    className="relative min-h-screen overflow-hidden"
                >

                    {/* =================================================
                        BACKGROUND IMAGE
                    ================================================== */}
                    <div className="absolute inset-0">

                        <img
                            src="/images/shop.jpg"
                            alt="MauzoVibe Business"
                            className="h-full w-full object-cover brightness-110 contrast-90"
                        />

                        {/* Bright overlay */}
                        <div className="absolute inset-0 bg-white/30" />

                        {/* Left readability overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/55 to-white/10" />

                        {/* Soft bottom fade */}
                        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/70 to-transparent" />

                    </div>


                    {/* =================================================
                        PAGE CONTENT
                    ================================================== */}
                    <div className="relative z-10 min-h-screen flex flex-col">


                        {/* =================================================
                            TOP CONTACT BAR
                        ================================================== */}
                        <div className="hidden lg:block border-b border-slate-200/70 bg-white/85 backdrop-blur-md">

                            <div className="max-w-7xl mx-auto px-6 xl:px-8">

                                <div className="h-10 flex items-center justify-between text-xs text-slate-600">

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

                                            mauzovibe@outlook.com

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

                                            +255 (0)748565656

                                        </span>

                                    </div>


                                    {/* Social */}
                                    <div className="flex items-center gap-3">

                                        {/* Facebook */}
                                        <a
                                            href="https://www.facebook.com/mauzovibe"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="MauzoVibe Facebook"
                                            className="
            w-10 h-10
            rounded-xl
            bg-slate-100
            flex items-center justify-center
            text-slate-500
            hover:bg-emerald-600
            hover:text-white
            hover:-translate-y-1
            transition-all duration-200
        "
                                        >
                                            <FaFacebookF className="w-4 h-4" />
                                        </a>

                                        {/* Instagram */}
                                        <a
                                            href="https://www.instagram.com/mauzovibe"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="MauzoVibe Instagram"
                                            className="
            w-10 h-10
            rounded-xl
            bg-slate-100
            flex items-center justify-center
            text-slate-500
            hover:bg-emerald-600
            hover:text-white
            hover:-translate-y-1
            transition-all duration-200
        "
                                        >
                                            <FaInstagram className="w-5 h-5" />
                                        </a>

                                        {/* LinkedIn */}
                                        <a
                                            href="https://www.linkedin.com/company/mauzovibe"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="MauzoVibe LinkedIn"
                                            className="
            w-10 h-10
            rounded-xl
            bg-slate-100
            flex items-center justify-center
            text-slate-500
            hover:bg-emerald-600
            hover:text-white
            hover:-translate-y-1
            transition-all duration-200
        "
                                        >
                                            <FaLinkedinIn className="w-5 h-5" />
                                        </a>

                                        {/* YouTube */}
                                        <a
                                            href="https://www.youtube.com/@mauzovibe"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="MauzoVibe YouTube"
                                            className="
            w-10 h-10
            rounded-xl
            bg-slate-100
            flex items-center justify-center
            text-slate-500
            hover:bg-emerald-600
            hover:text-white
            hover:-translate-y-1
            transition-all duration-200
        "
                                        >
                                            <FaYoutube className="w-5 h-5" />
                                        </a>

                                        {/* WhatsApp */}
                                        <a
                                            href="https://wa.me/255746856656"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="MauzoVibe WhatsApp"
                                            className="
            w-10 h-10
            rounded-xl
            bg-slate-100
            flex items-center justify-center
            text-slate-500
            hover:bg-emerald-600
            hover:text-white
            hover:-translate-y-1
            transition-all duration-200
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
                        {/* =================================================
    NAVBAR
================================================= */}
                        <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl shadow-sm">

                            <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">

                                <div className="min-h-[72px] flex items-center justify-between gap-4">

                                    {/* =================================================
                LOGO
            ================================================= */}
                                    <Link
                                        href="/"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-2.5 group shrink-0"
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
                                                className="w-6 h-6 sm:w-7 sm:h-7 text-white"
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

                                            <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900">

                                                Mauzo
                                                <span className="text-emerald-600">
                                                    Vibe
                                                </span>

                                            </div>

                                        </div>

                                    </Link>


                                    {/* =================================================
                DESKTOP MENU
            ================================================= */}
                                    <div className="hidden lg:flex items-center gap-7 xl:gap-9 text-sm font-semibold text-slate-700">

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


                                    {/* =================================================
                DESKTOP LOGIN
            ================================================= */}
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
                                                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
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


                                    {/* =================================================
                MOBILE MENU BUTTON
            ================================================= */}
                                    <button
                                        type="button"
                                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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


                                {/* =================================================
            MOBILE MENU
        ================================================= */}
                                {mobileMenuOpen && (
                                    <div
                                        className="
                    lg:hidden
                    border-t
                    border-slate-100
                    py-4
                    animate-in
                    fade-in
                    slide-in-from-top-2
                    duration-200
                "
                                    >

                                        <div className="flex flex-col gap-1">

                                            <a
                                                href="#home"
                                                onClick={() => setMobileMenuOpen(false)}
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
                                                <span>Home</span>
                                                <ChevronRightIcon className="w-4 h-4" />
                                            </a>


                                            <Link
                                                href={route("faq")}
                                                onClick={() => setMobileMenuOpen(false)}
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
                                                <span>FAQ</span>
                                                <ChevronRightIcon className="w-4 h-4" />
                                            </Link>


                                            <Link
                                                href={route("pricing")}
                                                onClick={() => setMobileMenuOpen(false)}
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
                                                <span>Pricing</span>
                                                <ChevronRightIcon className="w-4 h-4" />
                                            </Link>


                                            <Link
                                                href={route("about")}
                                                onClick={() => setMobileMenuOpen(false)}
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
                                                <span>About Us</span>
                                                <ChevronRightIcon className="w-4 h-4" />
                                            </Link>


                                            {/* Mobile Sign In */}
                                            {canLogin && (
                                                <Link
                                                    href={route("login")}
                                                    onClick={() => setMobileMenuOpen(false)}
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

                            <div className="max-w-7xl w-full mx-auto px-5 sm:px-6 xl:px-8 py-10 lg:py-14">

                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">


                                    {/* =================================================
                                        LEFT CONTENT
                                    ================================================== */}
                                    <div className="lg:col-span-7 text-slate-950">


                                        {/* Badge */}
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-sm font-medium text-emerald-700 mb-6 shadow-sm">

                                            <span className="relative flex h-2.5 w-2.5">

                                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />

                                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600" />

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


                                        {/* Description */}
                                        <p
                                            className="
                                                mt-6
                                                max-w-2xl
                                                text-base
                                                sm:text-lg
                                                lg:text-xl
                                                leading-8
                                                text-slate-600
                                            "
                                        >

                                            Simamia biashara yako kwa mfumo mmoja
                                            wenye nguvu. Dhibiti{" "}

                                            <span className="font-semibold text-slate-900">
                                                mauzo
                                            </span>
                                            ,{" "}

                                            <span className="font-semibold text-slate-900">
                                                stock
                                            </span>
                                            ,{" "}

                                            <span className="font-semibold text-slate-900">
                                                wateja
                                            </span>
                                            ,{" "}

                                            <span className="font-semibold text-slate-900">
                                                faida
                                            </span>{" "}

                                            na ripoti kwa urahisi.

                                        </p>


                                        {/* =================================================
                                            FEATURES
                                        ================================================== */}
                                        <div
                                            id="features"
                                            className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm sm:text-base text-slate-700"
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

                                        </div>


                                        {/* =================================================
                                            CTA BUTTONS
                                        ================================================== */}
                                        <div className="mt-9 flex flex-col sm:flex-row gap-4">


                                            {/* Start Free Trial */}
                                            {canRegister && (
                                                <Link
                                                    href={route("register")}
                                                    className="
                                                        group
                                                        inline-flex
                                                        items-center
                                                        justify-center
                                                        gap-3
                                                        px-7
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
                                                    "
                                                >

                                                    {trialButtonText}

                                                    <svg
                                                        className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
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


                                            {/* Watch Demo */}
                                            <button
                                                type="button"
                                                className="
                                                    group
                                                    inline-flex
                                                    items-center
                                                    justify-center
                                                    gap-3
                                                    px-7
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
                                                "
                                            >

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
                                                    "
                                                >
                                                    ▶
                                                </span>

                                                Watch Demo

                                            </button>

                                        </div>


                                        {/* =================================================
                                            TRUST
                                        ================================================== */}
                                        <div className="mt-8 flex items-center gap-3 text-sm text-slate-600">

                                            <div className="flex -space-x-2">

                                                <div className="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white shadow-sm" />

                                                <div className="w-8 h-8 rounded-full bg-emerald-400 border-2 border-white shadow-sm" />

                                                <div className="w-8 h-8 rounded-full bg-emerald-200 border-2 border-white shadow-sm" />

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


                                            {/* =================================================
                                                LOGIN ICON
                                            ================================================== */}
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


                                            {/* =================================================
                                                CARD HEADER
                                            ================================================== */}
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


                                            {/* =================================================
                                                LOGIN FORM
                                            ================================================== */}
                                            <form
                                                onSubmit={submit}
                                                className="space-y-5"
                                            >


                                                {/* =================================================
                                                    EMAIL
                                                ================================================== */}
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

                                                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">

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


                                                {/* =================================================
                                                    PASSWORD
                                                ================================================== */}
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

                                                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">

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


                                                        {/* Show Password */}
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setShowPassword(
                                                                    !showPassword
                                                                )
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


                                                {/* =================================================
                                                    REMEMBER ME
                                                ================================================== */}
                                                <div className="flex items-center justify-between">

                                                    <label className="inline-flex items-center cursor-pointer select-none">

                                                        <input
                                                            type="checkbox"
                                                            checked={form.data.remember}
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


                                                {/* =================================================
                                                    LOGIN BUTTON
                                                ================================================== */}
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
                                                                className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
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


                                            {/* =================================================
                                                REGISTER
                                            ================================================== */}
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
                            BOTTOM INFO
                        ================================================== */}
                        {/* <div className="hidden md:block pb-5">

                            <div className="max-w-7xl mx-auto px-6 xl:px-8">

                                <div className="flex items-center justify-between text-xs text-slate-500">

                                    <span>
                                        © {new Date().getFullYear()} MauzoVibe.
                                        All rights reserved.
                                    </span>


                                    <div className="flex gap-5">

                                        <a
                                            href={route("privacy")}
                                            className="hover:text-emerald-600 transition"
                                        >
                                            Privacy
                                        </a>

                                        <a
                                            href={route("terms")}
                                            className="hover:text-emerald-600 transition"
                                        >
                                            Terms
                                        </a>

                                        <a
                                            href={route("support")}
                                            className="hover:text-emerald-600 transition"
                                        >
                                            Support
                                        </a>

                                    </div>

                                </div>

                            </div>

                        </div> */}

                        {/* =================================================
    FOOTER
================================================= */}
                        <footer className="mt-auto border-t border-slate-200/70 bg-white/90 backdrop-blur-md">

                            <div className="max-w-7xl mx-auto px-5 sm:px-6 xl:px-8 py-5">

                                <div className="
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-4
            text-xs
            text-slate-500
        ">

                                    {/* Copyright */}
                                    <span className="text-center sm:text-left">
                                        © {new Date().getFullYear()} MauzoVibe.
                                        All rights reserved.
                                    </span>

                                    {/* Footer Links */}
                                    <div className="
                flex
                items-center
                justify-center
                flex-wrap
                gap-x-5
                gap-y-2
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

                            </div>

                        </footer>

                    </div>

                </section>

            </div>
        </>
    );
}
