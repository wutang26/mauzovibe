
import { useEffect, useState } from "react";
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

    // LOGIN
    const submit = (e) => {
        e.preventDefault();

        form.post("/login", {
            preserveScroll: true,
            onSuccess: () => setShowPassword(false),
            onFinish: () => form.reset("password"),
        });
    };

    // DAILY POSTS
    useEffect(() => {
        if (posts.length === 0) {
            setCurrentPost(0);
            return;
        }

        setCurrentPost((previous) =>
            Math.min(previous, posts.length - 1)
        );
    }, [posts.length]);

    // AUTO SLIDE
    useEffect(() => {
        if (posts.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentPost((previous) => (previous + 1) % posts.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [posts.length]);

    // REFRESH POSTS EVERY 5 MINUTES
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
            posts.length ? (previous + 1) % posts.length : 0
        );
    };

    const previousPost = () => {
        setCurrentPost((previous) =>
            posts.length ? (previous - 1 + posts.length) % posts.length : 0
        );
    };

    const closeMobileMenu = () => setMobileMenuOpen(false);

    const socialLinks = [
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
    ];

    return (
        <>
            <Head title="MauzoVibe | Sign In" />

            <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">

                {/* BACKGROUND */}
                <div className="fixed inset-0 pointer-events-none">
                    <img
                        src="/images/shop.jpg"
                        alt=""
                        className="w-full h-full object-cover opacity-[0.08]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/95 to-emerald-50/80" />
                </div>

                <div className="relative z-10 flex min-h-screen flex-col">

                    {/* CONTACT BAR */}
                    <div className="hidden lg:block bg-slate-950 text-white">
                        <div className="max-w-7xl mx-auto px-6 xl:px-8">
                            <div className="h-10 flex items-center justify-between text-xs">

                                <div className="flex items-center gap-6">
                                    <a
                                        href="mailto:mauzovibe@outlook.com"
                                        className="flex items-center gap-2 text-slate-300 hover:text-white transition"
                                    >
                                        <span className="text-emerald-400">✉</span>
                                        mauzovibe@outlook.com
                                    </a>

                                    <a
                                        href="tel:+255746856656"
                                        className="flex items-center gap-2 text-slate-300 hover:text-white transition"
                                    >
                                        <span className="text-emerald-400">☎</span>
                                        +255 746 856 656
                                    </a>
                                </div>

                                <div className="flex items-center gap-2">
                                    {socialLinks.map(({ href, label, Icon }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:bg-emerald-600 hover:text-white transition"
                                        >
                                            <Icon size={13} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* NAVBAR */}
                    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
                            <div className="min-h-[76px] flex items-center justify-between gap-4">

                                {/* LOGO */}
                                <Link
                                    href="/"
                                    onClick={closeMobileMenu}
                                    className="flex items-center gap-2.5 shrink-0"
                                >
                                    <div className="w-11 h-11 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/20">
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

                                    <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                                        Mauzo<span className="text-emerald-600">Vibe</span>
                                    </span>
                                </Link>

                                {/* DESKTOP MENU */}
                                <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
                                    <a href="#home" className="text-emerald-600">
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

                                {/* DESKTOP ACTIONS */}
                                <div className="hidden lg:flex items-center gap-3">
                                    {canRegister && (
                                        <Link
                                            href={route("register")}
                                            className="px-5 py-2.5 rounded-xl text-sm font-bold text-emerald-700 hover:bg-emerald-50 transition"
                                        >
                                            Sign Up
                                        </Link>
                                    )}

                                    {canLogin && (
                                        <a
                                            href="#login"
                                            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition"
                                        >
                                            Sign In
                                            <ChevronRightIcon className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>

                                {/* MOBILE MENU BUTTON */}
                                <button
                                    type="button"
                                    onClick={() => setMobileMenuOpen((previous) => !previous)}
                                    className="lg:hidden w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:text-emerald-600"
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

                                        {canRegister && (
                                            <Link
                                                href={route("register")}
                                                onClick={closeMobileMenu}
                                                className={`${navigationClass} text-emerald-700`}
                                            >
                                                Create an Account
                                                <ChevronRightIcon className="w-4 h-4" />
                                            </Link>
                                        )}

                                        {canLogin && (
                                            <a
                                                href="#login"
                                                onClick={closeMobileMenu}
                                                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700"
                                            >
                                                Sign In
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* MAIN CONTENT */}
                    <main
                        id="home"
                        className="flex-1 flex items-center py-8 sm:py-12"
                    >
                        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 xl:px-8">

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                                {/* DAILY POSTS */}
                                <section className="lg:col-span-7 order-2 lg:order-1">

                                    <div className="mb-5 flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-[0.18em]">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                MauzoVibe Updates
                                            </div>

                                            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                                                What's New?
                                            </h1>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Latest news, updates and announcements.
                                            </p>
                                        </div>

                                        {posts.length > 0 && (
                                            <span className="hidden sm:inline-flex items-center rounded-full bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-500">
                                                {currentPost + 1} / {posts.length}
                                            </span>
                                        )}
                                    </div>

                                    {posts.length > 0 ? (
                                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">

                                            {/* SLIDES */}
                                            <div className="relative">
                                                {posts.map((post, index) => (
                                                    <div
                                                        key={post.id ?? index}
                                                        aria-hidden={index !== currentPost}
                                                        className={`
                                                            transition-all duration-700 ease-in-out
                                                            ${index === currentPost
                                                                ? "relative opacity-100 translate-x-0"
                                                                : "absolute inset-0 opacity-0 translate-x-8 pointer-events-none"
                                                            }
                                                        `}
                                                    >
                                                        {/* IMAGE */}
                                                        <div className="relative h-[260px] sm:h-[350px] lg:h-[390px] overflow-hidden bg-slate-100">
                                                            <img
                                                                src={post.image || "/images/shop.jpg"}
                                                                alt={post.title || "MauzoVibe update"}
                                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                                                onError={(e) => {
                                                                    e.currentTarget.onerror = null;
                                                                    e.currentTarget.src = "/images/shop.jpg";
                                                                }}
                                                            />

                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

                                                            {post.type && (
                                                                <span className="absolute top-5 left-5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                                                                    {post.type}
                                                                </span>
                                                            )}

                                                            <div className="absolute bottom-5 left-6 right-6">
                                                                <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
                                                                    MauzoVibe
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* POST DETAILS */}
                                                        <div className="p-5 sm:p-6">
                                                            {post.type && (
                                                                <span className="inline-flex mb-3 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700">
                                                                    {post.type}
                                                                </span>
                                                            )}

                                                            <h2 className="text-xl sm:text-2xl font-extrabold leading-tight text-slate-900">
                                                                {post.title}
                                                            </h2>

                                                            {post.description && (
                                                                <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-3">
                                                                    {post.description}
                                                                </p>
                                                            )}

                                                            {post.button_text && post.button_url && (
                                                                <div className="mt-5">
                                                                    <Link
                                                                        href={post.button_url}
                                                                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition"
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
                                                        aria-label="Previous post"
                                                        className="absolute left-4 top-[105px] sm:top-[145px] lg:top-[165px] z-30 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/95 text-slate-800 shadow-lg hover:bg-emerald-600 hover:text-white transition"
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
                                                        aria-label="Next post"
                                                        className="absolute right-4 top-[105px] sm:top-[145px] lg:top-[165px] z-30 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/95 text-slate-800 shadow-lg hover:bg-emerald-600 hover:text-white transition"
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
                                                    <div className="absolute bottom-[15px] left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/40 px-3 py-2 backdrop-blur-md">
                                                        {posts.map((post, index) => (
                                                            <button
                                                                key={post.id ?? index}
                                                                type="button"
                                                                onClick={() => setCurrentPost(index)}
                                                                aria-label={`Show post ${index + 1}`}
                                                                aria-current={index === currentPost}
                                                                className={`
                                                                    h-2 rounded-full transition-all duration-300
                                                                    ${index === currentPost
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
                                    ) : (
                                        <div className="min-h-[300px] sm:min-h-[390px] rounded-3xl border border-dashed border-slate-300 bg-white/80 flex flex-col items-center justify-center text-center p-8">
                                            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                                                <svg
                                                    className="w-8 h-8"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth="1.7"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M19.5 14.25v-8.5A2.25 2.25 0 0017.25 3.5h-10.5A2.25 2.25 0 004.5 5.75v12.5A2.25 2.25 0 006.75 20.5h6.5M8 8h8M8 12h5"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.5 18.75l2.25 2.25 4.5-4.5"
                                                    />
                                                </svg>
                                            </div>

                                            <h2 className="text-lg font-bold text-slate-800">
                                                Stay Updated
                                            </h2>

                                            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                                                MauzoVibe announcements and business updates will appear here.
                                            </p>
                                        </div>
                                    )}

                                    {posts.length > 1 && (
                                        <div className="mt-3 flex items-center justify-between px-1 text-xs font-semibold text-slate-400">
                                            <span>BUSINESS UPDATES</span>
                                            <span>{currentPost + 1} of {posts.length}</span>
                                        </div>
                                    )}
                                </section>

                                {/* LOGIN CARD */}

                                {/* LOGIN CARD */}
                                <section
                                    id="login"
                                    className="lg:col-span-5 order-1 lg:order-2 scroll-mt-28"
                                >
                                    <div className="
        w-full max-w-lg mx-auto
        rounded-3xl bg-white
        border border-slate-200/80
        shadow-2xl shadow-slate-900/10
        p-7 sm:p-9 lg:p-10
    ">

                                        {/* LOGIN ICON */}
                                        <div className="flex justify-center mb-6">
                                            <div className="
                w-20 h-20 rounded-2xl
                bg-emerald-50 border border-emerald-100
                flex items-center justify-center
                shadow-sm
            ">
                                                <svg
                                                    className="w-10 h-10 text-emerald-600"
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

                                        {/* LOGIN HEADER */}
                                        <div className="text-center mb-8">
                                            <h2 className="
                text-3xl sm:text-4xl
                font-extrabold text-slate-900
            ">
                                                Welcome Back!
                                            </h2>

                                            <p className="mt-3 text-base text-slate-500">
                                                Sign in to access your MauzoVibe account.
                                            </p>
                                        </div>

                                        {/* LOGIN FORM */}
                                        <form
                                            onSubmit={submit}
                                            className="space-y-6"
                                        >

                                            {/* EMAIL */}
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="
                        block text-base font-semibold
                        text-slate-700 mb-3
                    "
                                                >
                                                    Email Address
                                                </label>

                                                <div className="relative">
                                                    <div className="
                        absolute inset-y-0 left-0
                        flex items-center pl-5
                        pointer-events-none
                    ">
                                                        <svg
                                                            className="w-6 h-6 text-slate-400"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            strokeWidth="1.8"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M3 7l9 6 9-6"
                                                            />
                                                            <rect
                                                                x="3"
                                                                y="5"
                                                                width="18"
                                                                height="14"
                                                                rx="2"
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
                            w-full h-14 sm:h-16
                            pl-14 pr-5 rounded-xl border
                            text-base sm:text-lg
                            ${form.errors.email
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
                    flex items-center justify-between mb-3
                ">
                                                    <label
                                                        htmlFor="password"
                                                        className="text-base font-semibold text-slate-700"
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
                        flex items-center pl-5
                        pointer-events-none
                    ">
                                                        <svg
                                                            className="w-6 h-6 text-slate-400"
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
                            w-full h-14 sm:h-16
                            pl-14 pr-14 rounded-xl border
                            text-base sm:text-lg
                            ${form.errors.password
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
                            flex items-center px-5
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
                pt-1
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
                            w-5 h-5 rounded border-slate-300
                            text-emerald-600 focus:ring-emerald-500
                        "
                                                    />

                                                    <span className="ml-3 text-sm text-slate-600">
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
                    w-full h-14 sm:h-16 rounded-xl
                    bg-emerald-600 hover:bg-emerald-700
                    text-white font-bold text-lg
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
                                                        Sign In to Your Account
                                                        <ChevronRightIcon className="w-5 h-5" />
                                                    </>
                                                )}
                                            </button>
                                        </form>

                                        {/* SIGN UP */}
                                        {canRegister && (
                                            <div className="
                mt-7 pt-7 border-t border-slate-100
                text-center
            ">
                                                <p className="text-sm sm:text-base text-slate-500">
                                                    Don't have an account?

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
                                </section>

                            </div>
                        </div>
                    </main>

                    {/* FOOTER */}
                    <footer className="mt-auto border-t border-slate-200/80 bg-white/90 backdrop-blur-md">
                        <div className="max-w-7xl mx-auto px-5 sm:px-6 xl:px-8 py-5">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">

                                <span className="text-center sm:text-left">
                                    © {currentYear} MauzoVibe. All rights reserved.
                                </span>

                                <div className="flex items-center justify-center flex-wrap gap-x-5 gap-y-2">
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

                            <div className="mt-3 text-center text-xs text-slate-400">
                                Powered by NAC Technologies
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
