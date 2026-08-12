import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import {
    UserCircleIcon,
    LockClosedIcon,
    ExclamationTriangleIcon,
    ShieldCheckIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";

import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({ mustVerifyEmail, status, auth }) {
    const user = auth?.user;

    return (
        <AdminLayout>
            <Head title="My Profile" />

            <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">

                    {/* =====================================================
                        PAGE HEADER
                    ====================================================== */}
                    <div className="mb-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 shadow-sm">
                                        <UserCircleIcon className="h-7 w-7 text-white" />
                                    </div>

                                    <div>
                                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                            My Profile
                                        </h1>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Manage your personal information, password and account settings.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Account Status */}
                            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2">
                                <CheckCircleIcon className="h-5 w-5 text-green-600" />

                                <span className="text-sm font-semibold text-green-700">
                                    Active Account
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* =====================================================
                        PROFILE SUMMARY
                    ====================================================== */}
                    <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                        {/* Green Header */}
                        <div className="relative bg-green-600 px-6 py-8 sm:px-8">

                            {/* Decorative circles */}
                            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
                            <div className="absolute -bottom-16 right-24 h-48 w-48 rounded-full bg-white/5" />

                            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">

                                {/* Avatar */}
                                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-white/80 bg-white shadow-lg">
                                    <span className="text-3xl font-bold uppercase text-green-600">
                                        {user?.name?.charAt(0) || "U"}
                                    </span>
                                </div>

                                {/* User information */}
                                <div className="text-white">
                                    <h2 className="text-2xl font-bold">
                                        {user?.name || "User"}
                                    </h2>

                                    <p className="mt-1 text-sm text-green-50">
                                        {user?.email || "No email available"}
                                    </p>

                                    <div className="mt-3 flex flex-wrap gap-2">

                                        <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                                            <ShieldCheckIcon className="mr-1.5 h-4 w-4" />
                                            Account User
                                        </span>

                                        {user?.branch?.name && (
                                            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                                                {user.branch.name}
                                            </span>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick information */}
                        <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

                            <div className="px-6 py-5">
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                    Account
                                </p>

                                <p className="mt-1 text-sm font-semibold text-gray-900">
                                    Active
                                </p>
                            </div>

                            <div className="px-6 py-5">
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                    Email
                                </p>

                                <p className="mt-1 truncate text-sm font-semibold text-gray-900">
                                    {user?.email || "Not available"}
                                </p>
                            </div>

                            <div className="px-6 py-5">
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                    Member Since
                                </p>

                                <p className="mt-1 text-sm font-semibold text-gray-900">
                                    {user?.created_at
                                        ? new Date(user.created_at).toLocaleDateString()
                                        : "—"}
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* =====================================================
                        PROFILE INFORMATION
                    ====================================================== */}
                    <div className="mb-6 rounded-2xl border border-gray-200 bg-white shadow-sm">

                        <div className="border-b border-gray-100 px-6 py-5 sm:px-8">
                            <div className="flex items-start gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50">
                                    <UserCircleIcon className="h-6 w-6 text-green-600" />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Profile Information
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Update your name and email address associated with your account.
                                    </p>
                                </div>

                            </div>
                        </div>

                        <div className="px-6 py-6 sm:px-8 sm:py-8">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-3xl"
                            />
                        </div>
                    </div>

                    {/* =====================================================
                        PASSWORD
                    ====================================================== */}
                    <div className="mb-6 rounded-2xl border border-gray-200 bg-white shadow-sm">

                        <div className="border-b border-gray-100 px-6 py-5 sm:px-8">
                            <div className="flex items-start gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50">
                                    <LockClosedIcon className="h-6 w-6 text-green-600" />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Password & Security
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Use a strong password to keep your MauzoVibe account secure.
                                    </p>
                                </div>

                            </div>
                        </div>

                        <div className="px-6 py-6 sm:px-8 sm:py-8">
                            <UpdatePasswordForm className="max-w-3xl" />
                        </div>
                    </div>

                    {/* =====================================================
                        DANGER ZONE
                    ====================================================== */}
                    <div className="rounded-2xl border border-red-200 bg-white shadow-sm">

                        <div className="border-b border-red-100 bg-red-50/50 px-6 py-5 sm:px-8">

                            <div className="flex items-start gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100">
                                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-red-700">
                                        Danger Zone
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Permanently delete your account and all associated information.
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="px-6 py-6 sm:px-8 sm:py-8">
                            <DeleteUserForm className="max-w-3xl" />
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="py-8 text-center">
                        <p className="text-xs text-gray-400">
                            MauzoVibe • Business Management System
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                            Manage your business. Track your sales. Grow smarter.
                        </p>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}