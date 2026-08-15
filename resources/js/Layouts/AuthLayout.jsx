import { Link } from "@inertiajs/react";

export default function AuthLayout({ children, title, subtitle }) {
    return (
        <div className="min-h-screen bg-white text-slate-900">

            {/* =====================================================
                TOP CONTACT BAR
            ====================================================== */}
            <div className="hidden lg:block border-b border-slate-200/70 bg-white/95 backdrop-blur-md">
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

                                +255 0748565656
                            </span>

                        </div>

                        {/* Social */}
                        <div className="flex items-center gap-5 text-slate-500">

                            <span className="cursor-pointer hover:text-emerald-600 transition font-bold">
                                f
                            </span>

                            <span className="cursor-pointer hover:text-emerald-600 transition">
                                ◎
                            </span>

                            <span className="cursor-pointer hover:text-emerald-600 transition font-semibold">
                                in
                            </span>

                            <span className="cursor-pointer hover:text-emerald-600 transition">
                                ▶
                            </span>

                        </div>

                    </div>
                </div>
            </div>


            {/* =====================================================
                NAVBAR
            ====================================================== */}
            <nav className="border-b border-slate-200/70 bg-white/95 backdrop-blur-xl shadow-sm">

                <div className="max-w-7xl mx-auto px-5 sm:px-6 xl:px-8">

                    <div className="h-20 flex items-center justify-between">

                        {/* LOGO */}
                        <Link
                            href="/"
                            className="flex items-center gap-3 group"
                        >

                            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-600 shadow-lg shadow-emerald-600/20 transition-all duration-200 group-hover:-translate-y-0.5">

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

                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8 12h.01M16 12h.01"
                                    />
                                </svg>

                            </div>

                            <div className="leading-none">
                                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                                    Mauzo
                                    <span className="text-emerald-600">
                                        Vibe
                                    </span>
                                </div>
                            </div>

                        </Link>


                        {/* NAVIGATION */}
                        <div className="hidden lg:flex items-center gap-9 text-sm font-medium text-slate-700">

                            <Link
                                href="/"
                                className="hover:text-emerald-600 transition"
                            >
                                Home
                            </Link>

                            {/* <a
                                href="/#features"
                                className="hover:text-emerald-600 transition"
                            >
                                Features
                            </a> */}

                            <a
                                href="/#solutions"
                                className="hover:text-emerald-600 transition"
                            >
                                Faq
                            </a>

                            <a
                                href="/#pricing"
                                className="hover:text-emerald-600 transition"
                            >
                                Pricing
                            </a>

                            <a
                                href="/#about"
                                className="hover:text-emerald-600 transition"
                            >
                                About Us
                            </a>

                        </div>


                        {/* SIGN IN */}
                        <Link
                            href={route("login")}
                            className="
                                group
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                bg-emerald-600
                                px-6
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
                            "
                        >

                            Sign In

                            <svg
                                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
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

                    </div>

                </div>

            </nav>


            {/* =====================================================
                PAGE CONTENT
            ====================================================== */}
            <main className="relative min-h-[calc(100vh-130px)] overflow-hidden">

                {/* Background decorations */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">

                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-60" />

                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50" />

                    <div className="absolute top-1/3 left-1/2 w-72 h-72 bg-emerald-50 rounded-full blur-3xl opacity-40" />

                </div>


                <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 xl:px-8 py-10 lg:py-14">

                    {/* Page heading */}
                    <div className="text-center mb-8">

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-sm font-medium text-emerald-700 mb-4">

                            <span className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />

                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600" />
                            </span>

                            MauzoVibe Business Management
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                            {title}
                        </h1>

                        {subtitle && (
                            <p className="mt-2 text-slate-500">
                                {subtitle}
                            </p>
                        )}

                    </div>


                    {/* Actual page */}
                    {children}

                </div>

            </main>


            {/* =====================================================
                FOOTER
            ====================================================== */}
            <footer className="border-t border-slate-200 bg-white">

                <div className="max-w-7xl mx-auto px-5 sm:px-6 xl:px-8 py-6">

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">

                        <span>
                            © {new Date().getFullYear()} MauzoVibe.
                            All rights reserved.
                        </span>

                        <div className="flex items-center gap-5">

                            <Link
                                href="/"
                                className="hover:text-emerald-600 transition"
                            >
                                Home
                            </Link>

                            <a
                                href="/#privacy"
                                className="hover:text-emerald-600 transition"
                            >
                                Privacy
                            </a>

                            <a
                                href="/#terms"
                                className="hover:text-emerald-600 transition"
                            >
                                Terms
                            </a>

                            <a
                                href="/#support"
                                className="hover:text-emerald-600 transition"
                            >
                                Support
                            </a>

                        </div>

                    </div>

                </div>

            </footer>

        </div>
    );
}