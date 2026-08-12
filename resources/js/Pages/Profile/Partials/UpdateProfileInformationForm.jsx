import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";

import {
    UserIcon,
    EnvelopeIcon,
    ShieldCheckIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const {
        data,
        setData,
        patch,
        errors,
        processing,
        recentlySuccessful,
    } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"), {
            preserveScroll: true,
        });
    };

    return (
        <section className={className}>
            {/* =========================================================
                HEADER
            ========================================================== */}
            <div className="mb-8 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50">
                    <UserIcon className="h-6 w-6 text-green-600" />
                </div>

                <div>
                    <h2 className="text-lg font-bold text-gray-900">
                        Profile Information
                    </h2>

                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                        Manage your personal information and email address
                        associated with your MauzoVibe account.
                    </p>
                </div>
            </div>

            {/* =========================================================
                ACCOUNT INFORMATION NOTICE
            ========================================================== */}
            <div className="mb-7 flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
                <ShieldCheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                <div>
                    <p className="text-sm font-semibold text-green-800">
                        Keep your information up to date
                    </p>

                    <p className="mt-1 text-xs leading-5 text-green-700">
                        Your profile information is used to identify you within
                        your MauzoVibe business account.
                    </p>
                </div>
            </div>

            {/* =========================================================
                FORM
            ========================================================== */}
            <form onSubmit={submit} className="space-y-7">

                {/* Name */}
                <div>
                    <InputLabel
                        htmlFor="name"
                        value="Full Name"
                    />

                    <div className="relative mt-2">
                        <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                        <TextInput
                            id="name"
                            className="block w-full rounded-xl border-gray-300 py-3 pl-10 pr-4 text-sm shadow-sm transition focus:border-green-500 focus:ring-green-500"
                            value={data.name}
                            onChange={(e) =>
                                setData("name", e.target.value)
                            }
                            required
                            isFocused
                            autoComplete="name"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <InputError
                        className="mt-2"
                        message={errors.name}
                    />
                </div>

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
                            className="block w-full rounded-xl border-gray-300 py-3 pl-10 pr-4 text-sm shadow-sm transition focus:border-green-500 focus:ring-green-500"
                            value={data.email}
                            onChange={(e) =>
                                setData("email", e.target.value)
                            }
                            required
                            autoComplete="username"
                            placeholder="Enter your email address"
                        />
                    </div>

                    <InputError
                        className="mt-2"
                        message={errors.email}
                    />
                </div>

                {/* =====================================================
                    EMAIL VERIFICATION
                ====================================================== */}
                {mustVerifyEmail &&
                    user.email_verified_at === null && (
                        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">

                            <div className="flex items-start gap-3">
                                <ExclamationCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-amber-800">
                                        Email address not verified
                                    </p>

                                    <p className="mt-1 text-sm leading-6 text-amber-700">
                                        Please verify your email address to
                                        keep your account secure.
                                    </p>

                                    <Link
                                        href={route(
                                            "verification.send"
                                        )}
                                        method="post"
                                        as="button"
                                        className="mt-3 inline-flex items-center rounded-lg border border-amber-300 bg-white px-4 py-2 text-xs font-semibold text-amber-700 shadow-sm transition hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                                    >
                                        Resend Verification Email
                                    </Link>
                                </div>
                            </div>

                            {status === "verification-link-sent" && (
                                <div className="mt-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2">
                                    <CheckCircleIcon className="h-5 w-5 text-green-600" />

                                    <p className="text-xs font-medium text-green-700">
                                        A new verification link has been sent
                                        to your email address.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                {/* =====================================================
                    VERIFIED EMAIL STATUS
                ====================================================== */}
                {user.email_verified_at && (
                    <div className="flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 px-4 py-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                            <CheckCircleIcon className="h-5 w-5 text-green-600" />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-green-800">
                                Email Verified
                            </p>

                            <p className="text-xs text-green-700">
                                Your email address has been successfully
                                verified.
                            </p>
                        </div>
                    </div>
                )}

                {/* =====================================================
                    ACTIONS
                ====================================================== */}
                <div className="flex flex-col gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center">

                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {processing ? (
                            <>
                                <svg
                                    className="mr-2 h-4 w-4 animate-spin"
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

                                Saving Changes...
                            </>
                        ) : (
                            <>
                                <CheckCircleIcon className="mr-2 h-5 w-5" />
                                Save Changes
                            </>
                        )}
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in-out duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                            <CheckCircleIcon className="h-5 w-5" />

                            Changes saved successfully.
                        </div>
                    </Transition>
                </div>
            </form>
        </section>
    );
}