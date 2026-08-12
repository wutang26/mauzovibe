import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

import {
    EnvelopeIcon,
    ShieldCheckIcon,
    CheckCircleIcon,
    ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function ForgotPassword({ status }) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password | MauzoVibe" />

            <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-md">

                    {/* =====================================================
                        HEADER
                    ====================================================== */}
                    <div className="mb-7 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 ring-8 ring-green-50/50">
                            <EnvelopeIcon className="h-8 w-8 text-green-600" />
                        </div>

                        <h1 className="mt-5 text-2xl font-bold tracking-tight text-gray-900">
                            Forgot Your Password?
                        </h1>

                        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                            No worries. Enter the email address associated with
                            your MauzoVibe account and we'll help you get back
                            in.
                        </p>
                    </div>

                    {/* =====================================================
                        MAIN CARD
                    ====================================================== */}
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                        {/* Green accent */}
                        <div className="h-1.5 bg-green-600" />

                        <div className="p-6 sm:p-8">

                            {/* =================================================
                                SECURITY NOTICE
                            ================================================== */}
                            <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
                                <ShieldCheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                                <div>
                                    <p className="text-sm font-semibold text-green-800">
                                        Secure password recovery
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-green-700">
                                        We'll send a secure password reset link
                                        to your registered email address.
                                    </p>
                                </div>
                            </div>

                            {/* =================================================
                                SUCCESS MESSAGE
                            ================================================== */}
                            {status && (
                                <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
                                    <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                                    <div>
                                        <p className="text-sm font-semibold text-green-800">
                                            Reset link sent
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-green-700">
                                            {status}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* =================================================
                                FORM
                            ================================================== */}
                            <form
                                onSubmit={submit}
                                className="space-y-6"
                            >
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email Address
                                    </label>

                                    <div className="relative mt-2">
                                        <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="block w-full rounded-xl border-gray-300 py-3 pl-10 pr-4 text-sm shadow-sm transition focus:border-green-500 focus:ring-green-500"
                                            isFocused={true}
                                            autoComplete="email"
                                            placeholder="you@example.com"
                                            onChange={(e) =>
                                                setData(
                                                    "email",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>

                                {/* =================================================
                                    SUBMIT
                                ================================================== */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex w-full items-center justify-center rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {processing ? (
                                        <>
                                            <svg
                                                className="mr-2 h-5 w-5 animate-spin"
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

                                            Sending Reset Link...
                                        </>
                                    ) : (
                                        <>
                                            Send Password Reset Link

                                            <ArrowRightIcon className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* =================================================
                                HELP TEXT
                            ================================================== */}
                            <div className="mt-6 border-t border-gray-100 pt-5">
                                <p className="text-center text-xs leading-5 text-gray-400">
                                    If you don't receive the email within a few
                                    minutes, check your spam or junk folder.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* =====================================================
                        FOOTER
                    ====================================================== */}
                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                        <ShieldCheckIcon className="h-4 w-4 text-green-500" />

                        <span>
                            Secure account recovery by MauzoVibe
                        </span>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}