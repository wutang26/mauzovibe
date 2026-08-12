import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

import {
    ShieldCheckIcon,
    LockClosedIcon,
    ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function ConfirmPassword() {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.confirm"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password | MauzoVibe" />

            <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-md">

                    {/* =====================================================
                        BRAND / SECURITY ICON
                    ====================================================== */}
                    <div className="mb-7 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 ring-8 ring-green-50/50">
                            <ShieldCheckIcon className="h-8 w-8 text-green-600" />
                        </div>

                        <h1 className="mt-5 text-2xl font-bold tracking-tight text-gray-900">
                            Confirm Your Password
                        </h1>

                        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                            This is a secure area of MauzoVibe. Please confirm
                            your password before continuing.
                        </p>
                    </div>

                    {/* =====================================================
                        SECURITY CARD
                    ====================================================== */}
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                        {/* Green top accent */}
                        <div className="h-1.5 bg-green-600" />

                        <div className="p-6 sm:p-8">

                            {/* Security notice */}
                            <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
                                <LockClosedIcon className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                                <div>
                                    <p className="text-sm font-semibold text-green-800">
                                        Security verification
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-green-700">
                                        Confirm your current password to
                                        protect your account and sensitive
                                        business information.
                                    </p>
                                </div>
                            </div>

                            {/* =================================================
                                FORM
                            ================================================== */}
                            <form onSubmit={submit} className="space-y-6">

                                <div>
                                    <InputLabel
                                        htmlFor="password"
                                        value="Current Password"
                                    />

                                    <div className="relative mt-2">
                                        <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="block w-full rounded-xl border-gray-300 py-3 pl-10 pr-4 text-sm shadow-sm transition focus:border-green-500 focus:ring-green-500"
                                            isFocused={true}
                                            autoComplete="current-password"
                                            placeholder="Enter your current password"
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

                                {/* =================================================
                                    ACTION
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

                                            Verifying...
                                        </>
                                    ) : (
                                        <>
                                            Confirm & Continue

                                            <ArrowRightIcon className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* =====================================================
                        FOOTER SECURITY MESSAGE
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