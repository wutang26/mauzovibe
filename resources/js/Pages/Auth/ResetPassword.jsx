import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

import {
    LockClosedIcon,
    ShieldCheckIcon,
    CheckCircleIcon,
    ArrowRightIcon,
    EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function ResetPassword({ token, email }) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.store"), {
            onFinish: () =>
                reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password | MauzoVibe" />

            <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-md">

                    {/* =====================================================
                        HEADER
                    ====================================================== */}
                    <div className="mb-7 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 ring-8 ring-green-50/50">
                            <LockClosedIcon className="h-8 w-8 text-green-600" />
                        </div>

                        <h1 className="mt-5 text-2xl font-bold tracking-tight text-gray-900">
                            Create a New Password
                        </h1>

                        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                            Choose a strong new password to secure your
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
                                SECURITY NOTICE
                            ================================================== */}
                            <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
                                <ShieldCheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                                <div>
                                    <p className="text-sm font-semibold text-green-800">
                                        Create a strong password
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-green-700">
                                        Use a password that is difficult to
                                        guess and different from passwords you
                                        use elsewhere.
                                    </p>
                                </div>
                            </div>

                            {/* =================================================
                                FORM
                            ================================================== */}
                            <form
                                onSubmit={submit}
                                className="space-y-6"
                            >

                                {/* Email */}
                                <div>
                                    <InputLabel
                                        htmlFor="email"
                                        value="Email Address"
                                    />

                                    <div className="relative mt-2">
                                        <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="block w-full rounded-xl border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-sm shadow-sm transition focus:border-green-500 focus:ring-green-500"
                                            autoComplete="username"
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

                                {/* New Password */}
                                <div>
                                    <InputLabel
                                        htmlFor="password"
                                        value="New Password"
                                    />

                                    <div className="relative mt-2">
                                        <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="block w-full rounded-xl border-gray-300 py-3 pl-10 pr-4 text-sm shadow-sm transition focus:border-green-500 focus:ring-green-500"
                                            autoComplete="new-password"
                                            isFocused={true}
                                            placeholder="Enter your new password"
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Confirm New Password"
                                    />

                                    <div className="relative mt-2">
                                        <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={
                                                data.password_confirmation
                                            }
                                            className="block w-full rounded-xl border-gray-300 py-3 pl-10 pr-4 text-sm shadow-sm transition focus:border-green-500 focus:ring-green-500"
                                            autoComplete="new-password"
                                            placeholder="Confirm your new password"
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <InputError
                                        message={
                                            errors.password_confirmation
                                        }
                                        className="mt-2"
                                    />
                                </div>

                                {/* =================================================
                                    PASSWORD REQUIREMENT
                                ================================================== */}
                                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                    <p className="text-xs font-semibold text-gray-700">
                                        Password recommendation
                                    </p>

                                    <ul className="mt-2 space-y-1 text-xs text-gray-500">
                                        <li className="flex items-center gap-2">
                                            <CheckCircleIcon className="h-4 w-4 text-green-500" />
                                            Use a strong password
                                        </li>

                                        <li className="flex items-center gap-2">
                                            <CheckCircleIcon className="h-4 w-4 text-green-500" />
                                            Avoid using easily guessed
                                            information
                                        </li>

                                        <li className="flex items-center gap-2">
                                            <CheckCircleIcon className="h-4 w-4 text-green-500" />
                                            Don't reuse your old password
                                        </li>
                                    </ul>
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

                                            Resetting Password...
                                        </>
                                    ) : (
                                        <>
                                            Reset Password

                                            <ArrowRightIcon className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* =====================================================
                        FOOTER
                    ====================================================== */}
                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                        <ShieldCheckIcon className="h-4 w-4 text-green-500" />

                        <span>
                            Your account security is important to MauzoVibe
                        </span>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}