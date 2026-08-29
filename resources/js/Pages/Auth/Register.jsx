import { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

// export default function Register() {

export default function Register({ marketplace = false }) {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        name: "",
        email: "",
        phone: "",
        business_name: "",
        location: "",
        password: "",
        password_confirmation: "",
    });


    // const submit = (e) => {

    //     e.preventDefault();

    //     post(route("register"), {
    //         onFinish: () =>
    //             reset(
    //                 "password",
    //                 "password_confirmation"
    //             ),
    //     });

    // };

const submit = (e) => {

    e.preventDefault();

    post(
        marketplace
            ? route("marketplace.register.store")
            : route("register.store"),
        {
            onFinish: () =>
                reset(
                    "password",
                    "password_confirmation"
                ),
        }
    );

};
    return (
        <>
            <Head title="Create Your Business | MauzoVibe" />

            <AuthLayout >
                 {/* title="Anzisha Biashara Yako 🚀"
                 subtitle="Jaza taarifa zako na uanze kusimamia biashara yako kwa MauzoVibe." */}

                <div className="w-full max-w-2xl mx-auto">

                    {/* =====================================================
                        REGISTER CARD
                    ====================================================== */}
                    <div className="bg-white rounded-3xl shadow-2xl shadow-slate-900/10 border border-slate-100 p-6 sm:p-8">

                        {/* Header */}
                        <div className="text-center mb-8">

                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 shadow-sm mb-5">

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
                                        d="M3 3v18h18M7 16l3-4 3 2 5-7"
                                    />
                                </svg>

                            </div>

                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                                Anzisha Biashara Yako
                            </h2>

                            <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
                               Jaza taarifa zako na uanze kusimamia biashara yako kwa MauzoVibe
                            </p>

                        </div>


                        {/* =====================================================
                            FORM
                        ====================================================== */}
                        <form
                            onSubmit={submit}
                            className="space-y-5"
                        >

                            {/* NAME */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-semibold text-slate-700 mb-2"
                                >
                                    Jina lako
                                </label>

                                <div className="relative">

                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">

                                        <svg
                                            className="w-5 h-5 text-slate-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.8"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM5 21a7 7 0 0114 0"
                                            />
                                        </svg>

                                    </div>

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={data.name}
                                        autoComplete="name"
                                        autoFocus
                                        placeholder="Mfano: Nimloadi Chelesi"
                                        onChange={(e) =>
                                            setData(
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        required
                                        className={`w-full h-12 pl-12 pr-4 rounded-xl border ${
                                            errors.name
                                                ? "border-red-400"
                                                : "border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        } bg-slate-50 text-slate-900 placeholder-slate-400 outline-none transition-all`}
                                    />

                                </div>

                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>


                            {/* EMAIL */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-slate-700 mb-2"
                                >
                                    Email
                                </label>

                                <div className="relative">

                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">

                                        <svg
                                            className="w-5 h-5 text-slate-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.8"
                                                d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14"
                                            />
                                        </svg>

                                    </div>

                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
                                        placeholder="you@example.com"
                                        onChange={(e) =>
                                            setData(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        required
                                        className={`w-full h-12 pl-12 pr-4 rounded-xl border ${
                                            errors.email
                                                ? "border-red-400"
                                                : "border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        } bg-slate-50 text-slate-900 placeholder-slate-400 outline-none transition-all`}
                                    />

                                </div>

                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                                {/* PHONE */}

                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-sm font-semibold text-slate-700 mb-2"
                            >
                                Namba ya Simu
                                <span className="ml-1 text-slate-400 font-normal">
                                    (Hiari)
                                </span>
                            </label>


                        <div className="relative">

                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <svg
                                    className="w-5 h-5 text-slate-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.8"
                                        d="M3 5a2 2 0 012-2h3.28a2 2 0 011.94 1.515l.72 2.88a2 2 0 01-.53 1.92L9.1 9.63a16.01 16.01 0 005.27 5.27l1.315-1.315a2 2 0 011.92-.53l2.88.72A2 2 0 0122 15.72V19a2 2 0 01-2 2h-1C9.611 21 3 14.389 3 6V5z"
                                    />
                                </svg>
                            </div>

                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={data.phone}
                                autoComplete="tel"
                                placeholder="Mfano: 0746856656"
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                className={`w-full h-12 pl-12 pr-4 rounded-xl border ${
                                    errors.phone
                                        ? "border-red-400"
                                        : "border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                } bg-slate-50 text-slate-900 placeholder-slate-400 outline-none transition-all`}
                            />

                        </div>

                        {errors.phone && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.phone}
                            </p>
                        )}


                        </div>


                            {/* BUSINESS NAME */}
                            <div>
                                <label
                                    htmlFor="business_name"
                                    className="block text-sm font-semibold text-slate-700 mb-2"
                                >
                                    Jina la Biashara
                                </label>

                                <div className="relative">

                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">

                                        <svg
                                            className="w-5 h-5 text-slate-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.8"
                                                d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M12 9h.01M15 9h.01"
                                            />
                                        </svg>

                                    </div>

                                    <input
                                        id="business_name"
                                        name="business_name"
                                        type="text"
                                        value={data.business_name}
                                        placeholder="Mfano: MauzoVibe Shop"
                                        onChange={(e) =>
                                            setData(
                                                "business_name",
                                                e.target.value
                                            )
                                        }
                                        required
                                        className={`w-full h-12 pl-12 pr-4 rounded-xl border ${
                                            errors.business_name
                                                ? "border-red-400"
                                                : "border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        } bg-slate-50 text-slate-900 placeholder-slate-400 outline-none transition-all`}
                                    />

                                </div>

                                {errors.business_name && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.business_name}
                                    </p>
                                )}
                            </div>


                            {/* LOCATION */}
                            <div>
                                <label
                                    htmlFor="location"
                                    className="block text-sm font-semibold text-slate-700 mb-2"
                                >
                                    Mahali pa Biashara

                                    <span className="ml-1 text-slate-400 font-normal">
                                        (Hiari)
                                    </span>
                                </label>

                                <div className="relative">

                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">

                                        <svg
                                            className="w-5 h-5 text-slate-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.8"
                                                d="M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"
                                            />

                                            <circle
                                                cx="12"
                                                cy="9"
                                                r="2.5"
                                            />
                                        </svg>

                                    </div>

                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        value={data.location}
                                        placeholder="Mfano: Kariakoo, Dar es Salaam"
                                        onChange={(e) =>
                                            setData(
                                                "location",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full h-12 pl-12 pr-4 rounded-xl border ${
                                            errors.location
                                                ? "border-red-400"
                                                : "border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        } bg-slate-50 text-slate-900 placeholder-slate-400 outline-none transition-all`}
                                    />

                                </div>

                                {errors.location && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.location}
                                    </p>
                                )}
                            </div>


                            {/* PASSWORD */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-slate-700 mb-2"
                                >
                                    Password
                                </label>

                                <div className="relative">

                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">

                                        <svg
                                            className="w-5 h-5 text-slate-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.8"
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v2h8z"
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
                                        name="password"
                                        value={data.password}
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                        onChange={(e) =>
                                            setData(
                                                "password",
                                                e.target.value
                                            )
                                        }
                                        required
                                        className={`w-full h-12 pl-12 pr-12 rounded-xl border ${
                                            errors.password
                                                ? "border-red-400"
                                                : "border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        } bg-slate-50 text-slate-900 placeholder-slate-400 outline-none transition-all`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-emerald-600 transition"
                                    >
                                        {showPassword ? "◉" : "◌"}
                                    </button>

                                </div>

                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>


                            {/* CONFIRM PASSWORD */}
                            <div>
                                <label
                                    htmlFor="password_confirmation"
                                    className="block text-sm font-semibold text-slate-700 mb-2"
                                >
                                    Thibitisha Password
                                </label>

                                <div className="relative">

                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">

                                        <svg
                                            className="w-5 h-5 text-slate-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.8"
                                                d="M9 12l2 2 4-4m5.5-1A7.5 7.5 0 0112 19.5 7.5 7.5 0 014.5 12 7.5 7.5 0 0112 4.5 7.5 7.5 0 0120.5 12z"
                                            />
                                        </svg>

                                    </div>

                                    <input
                                        id="password_confirmation"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        required
                                        className={`w-full h-12 pl-12 pr-12 rounded-xl border ${
                                            errors.password_confirmation
                                                ? "border-red-400"
                                                : "border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        } bg-slate-50 text-slate-900 placeholder-slate-400 outline-none transition-all`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-emerald-600 transition"
                                    >
                                        {showConfirmPassword ? "◉" : "◌"}
                                    </button>

                                </div>

                                {errors.password_confirmation && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.password_confirmation}
                                    </p>
                                )}
                            </div>


                            {/* SUBMIT */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="
                                    group
                                    w-full
                                    h-12
                                    rounded-xl
                                    bg-emerald-600
                                    hover:bg-emerald-700
                                    active:bg-emerald-800
                                    text-white
                                    font-bold
                                    shadow-lg
                                    shadow-emerald-600/20
                                    transition-all
                                    duration-200
                                    disabled:opacity-60
                                    disabled:cursor-not-allowed
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                "
                            >

                                {processing ? (
                                    <>
                                        <svg
                                            className="animate-spin h-5 w-5"
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

                                        Inatengeneza akaunti...
                                    </>
                                ) : (
                                    <>
                                        Tengeneza Akaunti

                                        <svg
                                            className="w-5 h-5 transition-transform group-hover:translate-x-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 12h14M13 6l6 6-6 6"
                                            />
                                        </svg>
                                    </>
                                )}

                            </button>

                        </form>


                        {/* LOGIN LINK */}
                        <div className="mt-7 pt-6 border-t border-slate-100 text-center">

                            <p className="text-sm text-slate-500">
                                Tayari una akaunti?
                            </p>

                            <Link
                                href={route("login")}
                                className="inline-flex items-center gap-1 mt-1 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition"
                            >
                                Ingia kwenye akaunti
                                <span>→</span>
                            </Link>

                        </div>

                    </div>

                </div>

            </AuthLayout>
        </>
    );
}