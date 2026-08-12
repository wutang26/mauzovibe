import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";

import {
    ExclamationTriangleIcon,
    TrashIcon,
    ShieldExclamationIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] =
        useState(false);

    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);

        setTimeout(() => {
            passwordInput.current?.focus();
        }, 100);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,

            onSuccess: () => closeModal(),

            onError: () => {
                passwordInput.current?.focus();
            },

            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            {/* =====================================================
                DANGER ZONE HEADER
            ====================================================== */}
            <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50">
                    <TrashIcon className="h-6 w-6 text-red-600" />
                </div>

                <div>
                    <h2 className="text-lg font-bold text-gray-900">
                        Delete Account
                    </h2>

                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                        Permanently remove your MauzoVibe account and associated
                        personal information.
                    </p>
                </div>
            </div>

            {/* =====================================================
                WARNING CARD
            ====================================================== */}
            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                <div className="flex items-start gap-3">
                    <ExclamationTriangleIcon className="mt-0.5 h-6 w-6 shrink-0 text-red-600" />

                    <div className="flex-1">
                        <h3 className="text-sm font-bold text-red-800">
                            Permanent account deletion
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-red-700">
                            Once your account is deleted, this action cannot be
                            undone. Your account information and associated
                            resources may be permanently removed.
                        </p>

                        <div className="mt-4 rounded-lg border border-red-200 bg-white/70 p-3">
                            <div className="flex items-start gap-2">
                                <ShieldExclamationIcon className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

                                <p className="text-xs leading-5 text-red-700">
                                    Make sure you have downloaded or retained
                                    any important information before continuing.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =====================================================
                DELETE BUTTON
            ====================================================== */}
            <div className="flex justify-start border-t border-gray-100 pt-6">
                <button
                    type="button"
                    onClick={confirmUserDeletion}
                    className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-600 shadow-sm transition hover:border-red-300 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    <TrashIcon className="mr-2 h-5 w-5" />

                    Delete My Account
                </button>
            </div>

            {/* =====================================================
                CONFIRMATION MODAL
            ====================================================== */}
            <Modal
                show={confirmingUserDeletion}
                onClose={closeModal}
            >
                <form
                    onSubmit={deleteUser}
                    className="overflow-hidden"
                >
                    {/* Modal Header */}
                    <div className="border-b border-gray-100 bg-red-50 px-6 py-5">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100">
                                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Delete your account?
                                    </h2>

                                    <p className="mt-1 text-sm text-red-700">
                                        This action cannot be undone.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="rounded-lg p-1.5 text-gray-400 transition hover:bg-white hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                aria-label="Close"
                            >
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Modal Body */}
                    <div className="px-6 py-6">
                        <p className="text-sm leading-6 text-gray-600">
                            You're about to permanently delete your MauzoVibe
                            account. To continue, please enter your current
                            password to confirm this action.
                        </p>

                        {/* Password */}
                        <div className="mt-6">
                            <InputLabel
                                htmlFor="delete_account_password"
                                value="Current Password"
                            />

                            <TextInput
                                id="delete_account_password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="mt-2 block w-full rounded-xl border-gray-300 py-3 text-sm shadow-sm focus:border-red-500 focus:ring-red-500"
                                isFocused
                                autoComplete="current-password"
                                placeholder="Enter your current password"
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        {/* Final warning */}
                        <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
                            <p className="text-xs leading-5 text-gray-600">
                                <span className="font-semibold text-gray-800">
                                    Important:
                                </span>{" "}
                                Deleting your account is permanent. Please make
                                sure you are certain before confirming.
                            </p>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
                        <SecondaryButton
                            type="button"
                            onClick={closeModal}
                            disabled={processing}
                            className="justify-center rounded-xl px-5 py-2.5"
                        >
                            Cancel
                        </SecondaryButton>

                        <DangerButton
                            type="submit"
                            disabled={processing}
                            className="inline-flex justify-center rounded-xl px-5 py-2.5"
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

                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <TrashIcon className="mr-2 h-5 w-5" />

                                    Permanently Delete
                                </>
                            )}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}