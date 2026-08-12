import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

import {
    EnvelopeIcon,
    ShieldCheckIcon,
    CheckCircleIcon,
    ArrowPathIcon,
    ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Verify Email | MauzoVibe" />

            <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-md">

                    {/* =====================================================
                        HEADER
                    ====================================================== */}
                    <div className="mb-7 text-center">

                        {/* Icon */}
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 ring-8 ring-green-50/50">
                            <EnvelopeIcon className="h-8 w-8 text-green-600" />
                        </div>

                        <h1 className="mt-5 text-2xl font-bold tracking-tight text-gray-900">
                            Verify Your Email
                        </h1>

                        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                            One quick step before you continue using your
                            MauzoVibe account.
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
                                INFORMATION
                            ================================================== */}
                            <div className="flex items-start gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50">
                                    <ShieldCheckIcon className="h-6 w-6 text-green-600" />
                                </div>

                                <div>
                                    <h2 className="text-sm font-bold text-gray-900">
                                        Check your inbox
                                    </h2>

                                    <p className="mt-1 text-sm leading-6 text-gray-500">
                                        Thanks for using MauzoVibe. We've sent
                                        a verification link to your email
                                        address.
                                    </p>
                                </div>
                            </div>

                            {/* =================================================
                                INSTRUCTIONS
                            ================================================== */}
                            <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-4">

                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    What to do next
                                </p>

                                <div className="mt-3 space-y-3">

                                    <div className="flex items-start gap-3">
                                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                                            1
                                        </div>

                                        <p className="text-sm leading-5 text-gray-600">
                                            Open the verification email sent
                                            to your registered email address.
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                                            2
                                        </div>

                                        <p className="text-sm leading-5 text-gray-600">
                                            Click the verification link inside
                                            the email.
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                                            3
                                        </div>

                                        <p className="text-sm leading-5 text-gray-600">
                                            You'll then be able to continue to
                                            your MauzoVibe dashboard.
                                        </p>
                                    </div>

                                </div>
                            </div>

                            {/* =================================================
                                SUCCESS MESSAGE
                            ================================================== */}
                            {status === "verification-link-sent" && (
                                <div className="mt-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">

                                    <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                                    <div>
                                        <p className="text-sm font-semibold text-green-800">
                                            Verification email sent
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-green-700">
                                            A new verification link has been
                                            sent to your registered email
                                            address.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* =================================================
                                RESEND FORM
                            ================================================== */}
                            <form
                                onSubmit={submit}
                                className="mt-6"
                            >
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

                                            Sending Verification Email...
                                        </>
                                    ) : (
                                        <>
                                            <ArrowPathIcon className="mr-2 h-5 w-5" />

                                            Resend Verification Email
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* =================================================
                                EMAIL HELP
                            ================================================== */}
                            <div className="mt-5 flex items-start gap-2 rounded-lg bg-gray-50 p-3">

                                <EnvelopeIcon className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

                                <p className="text-xs leading-5 text-gray-500">
                                    Can't find the email? Check your
                                    <span className="font-medium text-gray-700">
                                        {" "}Spam or Junk
                                    </span>
                                    {" "}folder.
                                </p>

                            </div>

                            {/* =================================================
                                LOGOUT
                            ================================================== */}
                            <div className="mt-6 border-t border-gray-100 pt-6">

                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="group mx-auto flex items-center justify-center gap-2 text-sm font-medium text-gray-500 transition hover:text-red-600 focus:outline-none"
                                >
                                    <ArrowRightOnRectangleIcon className="h-5 w-5 transition group-hover:text-red-600" />

                                    Log Out
                                </Link>

                            </div>
                        </div>
                    </div>

                    {/* =====================================================
                        FOOTER
                    ====================================================== */}
                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">

                        <ShieldCheckIcon className="h-4 w-4 text-green-500" />

                        <span>
                            Secure account verification by MauzoVibe
                        </span>

                    </div>

                </div>
            </div>
        </GuestLayout>
    );
}