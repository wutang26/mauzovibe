import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";

import {
    LockClosedIcon,
    ShieldCheckIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef(null);
    const currentPasswordInput = useRef(null);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,

            onSuccess: () => {
                reset();
            },

            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            {/* Header */}
            <div className="mb-8 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50">
                    <LockClosedIcon className="h-6 w-6 text-green-600" />
                </div>

                <div>
                    <h2 className="text-lg font-bold text-gray-900">
                        Update Password
                    </h2>

                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                        Keep your MauzoVibe account secure by using a strong
                        password that you don't use on other websites.
                    </p>
                </div>
            </div>

            {/* Security Notice */}
            <div className="mb-7 flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
                <ShieldCheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                <div>
                    <p className="text-sm font-semibold text-green-800">
                        Security recommendation
                    </p>

                    <p className="mt-1 text-xs leading-5 text-green-700">
                        Use at least 8 characters with a combination of
                        letters, numbers and symbols.
                    </p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={updatePassword} className="space-y-6">
                {/* Current Password */}
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value="Current Password"
                    />

                    <div className="relative mt-2">
                        <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                        <TextInput
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) =>
                                setData(
                                    "current_password",
                                    e.target.value
                                )
                            }
                            type="password"
                            className="block w-full rounded-xl border-gray-300 py-3 pl-10 pr-4 text-sm shadow-sm transition focus:border-green-500 focus:ring-green-500"
                            autoComplete="current-password"
                            placeholder="Enter your current password"
                        />
                    </div>

                    <InputError
                        message={errors.current_password}
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
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            type="password"
                            className="block w-full rounded-xl border-gray-300 py-3 pl-10 pr-4 text-sm shadow-sm transition focus:border-green-500 focus:ring-green-500"
                            autoComplete="new-password"
                            placeholder="Enter your new password"
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
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData(
                                    "password_confirmation",
                                    e.target.value
                                )
                            }
                            type="password"
                            className="block w-full rounded-xl border-gray-300 py-3 pl-10 pr-4 text-sm shadow-sm transition focus:border-green-500 focus:ring-green-500"
                            autoComplete="new-password"
                            placeholder="Confirm your new password"
                        />
                    </div>

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                {/* Footer */}
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

                                Updating...
                            </>
                        ) : (
                            <>
                                <LockClosedIcon className="mr-2 h-5 w-5" />
                                Update Password
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
                            Password updated successfully.
                        </div>
                    </Transition>
                </div>
            </form>
        </section>
    );
}