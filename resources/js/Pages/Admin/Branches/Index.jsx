import { Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

import {
    BuildingStorefrontIcon,
    MapPinIcon,
    UsersIcon,
    PencilSquareIcon,
    UserPlusIcon,
    EyeIcon,
} from "@heroicons/react/24/outline";

function Index({ branches }) {
    return (
        <div className="min-h-screen bg-slate-50">

            {/* =====================================================
                PAGE HEADER
            ====================================================== */}
            <div className="mb-6">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <div>
                        <div className="flex items-center gap-3">

                            <div className="
                                w-12
                                h-12
                                rounded-2xl
                                bg-emerald-50
                                border
                                border-emerald-100
                                flex
                                items-center
                                justify-center
                            ">
                                <BuildingStorefrontIcon
                                    className="w-6 h-6 text-emerald-600"
                                />
                            </div>

                            <div>
                                <h1 className="
                                    text-2xl
                                    sm:text-3xl
                                    font-bold
                                    text-slate-900
                                ">
                                    Branch Management
                                </h1>

                                <p className="text-sm text-slate-500 mt-1">
                                    Simamia branches, maeneo na watumiaji wa biashara yako.
                                </p>
                            </div>

                        </div>
                    </div>


                    {/* ADD BRANCH */}
                    <Link
                        href="/admin/branches/create"
                        className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            bg-emerald-600
                            hover:bg-emerald-700
                            active:bg-emerald-800
                            text-white
                            px-5
                            py-3
                            rounded-xl
                            font-semibold
                            shadow-lg
                            shadow-emerald-600/20
                            transition-all
                        "
                    >
                        <span className="text-xl leading-none">
                            +
                        </span>

                        Add Branch
                    </Link>

                </div>

            </div>


            {/* =====================================================
                SUMMARY
            ====================================================== */}
            <div className="mb-6">

                <div className="
                    bg-white
                    border
                    border-slate-100
                    rounded-2xl
                    shadow-sm
                    p-5
                ">

                    <div className="flex items-center gap-3">

                        <div className="
                            w-10
                            h-10
                            rounded-xl
                            bg-emerald-50
                            flex
                            items-center
                            justify-center
                        ">
                            <BuildingStorefrontIcon
                                className="w-5 h-5 text-emerald-600"
                            />
                        </div>

                        <div>
                            <p className="text-xs text-slate-500">
                                Total Branches
                            </p>

                            <p className="
                                text-xl
                                font-bold
                                text-slate-900
                            ">
                                {branches.length}
                            </p>
                        </div>

                    </div>

                </div>

            </div>


            {/* =====================================================
                BRANCHES TABLE
            ====================================================== */}
            <div className="
                bg-white
                rounded-2xl
                shadow-sm
                border
                border-slate-100
                overflow-hidden
            ">

                {/* Desktop Table */}
                <div className="overflow-x-auto">

                    <table className="w-full min-w-[900px]">

                        <thead>

                            <tr className="
                                bg-slate-50
                                border-b
                                border-slate-100
                                text-slate-500
                                text-xs
                                uppercase
                                tracking-wide
                            ">

                                <th className="p-4 text-left font-semibold">
                                    Branch
                                </th>

                                <th className="p-4 text-left font-semibold">
                                    Location
                                </th>

                                <th className="p-4 text-center font-semibold">
                                    Users
                                </th>

                                <th className="p-4 text-center font-semibold">
                                    Assign User
                                </th>

                                <th className="p-4 text-center font-semibold">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {branches.length > 0 ? (

                                branches.map((branch) => (

                                    <tr
                                        key={branch.id}
                                        className="
                                            border-b
                                            border-slate-100
                                            last:border-0
                                            hover:bg-emerald-50/30
                                            transition
                                        "
                                    >

                                        {/* =================================================
                                            BRANCH
                                        ================================================== */}
                                        <td className="p-4">

                                            <div className="flex items-center gap-3">

                                                <div className="
                                                    w-11
                                                    h-11
                                                    rounded-xl
                                                    bg-emerald-50
                                                    border
                                                    border-emerald-100
                                                    flex
                                                    items-center
                                                    justify-center
                                                    shrink-0
                                                ">

                                                    <BuildingStorefrontIcon
                                                        className="
                                                            w-6
                                                            h-6
                                                            text-emerald-600
                                                        "
                                                    />

                                                </div>


                                                <div>

                                                    <p className="
                                                        font-semibold
                                                        text-slate-800
                                                    ">
                                                        {branch.name}
                                                    </p>

                                                    <p className="
                                                        text-xs
                                                        text-slate-400
                                                        mt-0.5
                                                    ">
                                                        Branch ID #{branch.id}
                                                    </p>

                                                </div>

                                            </div>

                                        </td>


                                        {/* =================================================
                                            LOCATION
                                        ================================================== */}
                                        <td className="p-4">

                                            <div className="
                                                flex
                                                items-center
                                                gap-2
                                                text-sm
                                                text-slate-600
                                            ">

                                                <MapPinIcon
                                                    className="
                                                        w-5
                                                        h-5
                                                        text-emerald-600
                                                    "
                                                />

                                                <span>
                                                    {branch.location || "No Location"}
                                                </span>

                                            </div>

                                        </td>


                                        {/* =================================================
                                            USERS
                                        ================================================== */}
                                        <td className="p-4 text-center">

                                            <span className="
                                                inline-flex
                                                items-center
                                                gap-2
                                                bg-emerald-50
                                                border
                                                border-emerald-100
                                                text-emerald-700
                                                px-3
                                                py-1.5
                                                rounded-full
                                                text-xs
                                                font-semibold
                                            ">

                                                <UsersIcon className="w-4 h-4" />

                                                {branch.users_count ?? 0}

                                                <span className="hidden sm:inline">
                                                    Users
                                                </span>

                                            </span>

                                        </td>


                                        {/* =================================================
                                            ASSIGN USER
                                        ================================================== */}
                                        <td className="p-4 text-center">

                                            <Link
                                                href={`/admin/branches/${branch.id}/assign-user`}
                                                className="
                                                    inline-flex
                                                    items-center
                                                    justify-center
                                                    gap-2
                                                    bg-slate-100
                                                    hover:bg-emerald-50
                                                    text-slate-700
                                                    hover:text-emerald-700
                                                    border
                                                    border-slate-200
                                                    hover:border-emerald-200
                                                    px-4
                                                    py-2
                                                    rounded-xl
                                                    text-sm
                                                    font-semibold
                                                    transition
                                                "
                                            >

                                                <UserPlusIcon className="w-5 h-5" />

                                                Assign User

                                            </Link>

                                        </td>


                                        {/* =================================================
                                            ACTIONS
                                        ================================================== */}
                                        <td className="p-4">

                                            <div className="
                                                flex
                                                justify-center
                                                items-center
                                                gap-2
                                            ">

                                                {/* VIEW */}

                                                <Link
                                                    href={route(
                                                        "branches.show",
                                                        branch.id
                                                    )}
                                                    className="
                                                        inline-flex
                                                        items-center
                                                        gap-2
                                                        bg-emerald-600
                                                        hover:bg-emerald-700
                                                        text-white
                                                        px-4
                                                        py-2
                                                        rounded-xl
                                                        text-sm
                                                        font-semibold
                                                        shadow-sm
                                                        transition
                                                    "
                                                >

                                                    <EyeIcon className="w-4 h-4" />

                                                    View

                                                </Link>


                                                {/* MANAGE */}

                                                <Link
                                                    href={`/admin/branches/${branch.id}/edit`}
                                                    className="
                                                        inline-flex
                                                        items-center
                                                        gap-2
                                                        bg-white
                                                        hover:bg-slate-50
                                                        text-slate-700
                                                        border
                                                        border-slate-200
                                                        px-4
                                                        py-2
                                                        rounded-xl
                                                        text-sm
                                                        font-semibold
                                                        transition
                                                    "
                                                >

                                                    <PencilSquareIcon className="w-4 h-4" />

                                                    Manage

                                                </Link>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                /* =================================================
                                    EMPTY STATE
                                ================================================== */

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="p-12 text-center"
                                    >

                                        <div className="
                                            flex
                                            flex-col
                                            items-center
                                            justify-center
                                        ">

                                            <div className="
                                                w-16
                                                h-16
                                                rounded-2xl
                                                bg-emerald-50
                                                flex
                                                items-center
                                                justify-center
                                                mb-4
                                            ">

                                                <BuildingStorefrontIcon
                                                    className="
                                                        w-8
                                                        h-8
                                                        text-emerald-600
                                                    "
                                                />

                                            </div>

                                            <h3 className="
                                                text-lg
                                                font-bold
                                                text-slate-800
                                            ">
                                                No branches yet
                                            </h3>

                                            <p className="
                                                text-sm
                                                text-slate-500
                                                mt-1
                                                mb-5
                                            ">
                                                Add your first business branch
                                                to get started.
                                            </p>

                                            <Link
                                                href="/admin/branches/create"
                                                className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    bg-emerald-600
                                                    hover:bg-emerald-700
                                                    text-white
                                                    px-5
                                                    py-2.5
                                                    rounded-xl
                                                    font-semibold
                                                    transition
                                                "
                                            >
                                                + Add Branch
                                            </Link>

                                        </div>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* =====================================================
                FOOTER
            ====================================================== */}
            <div className="
                text-center
                mt-8
                pb-4
            ">

                <p className="text-xs text-slate-400">
                    © {new Date().getFullYear()}{" "}
                    <span className="font-semibold text-emerald-600">
                        MauzoVibe
                    </span>
                    . All rights reserved.
                </p>

                <p className="text-xs text-slate-400 mt-1">
                    Smart business management made simple.
                </p>

            </div>

        </div>
    );
}


/*
|--------------------------------------------------------------------------
| ADMIN LAYOUT
|--------------------------------------------------------------------------
*/

Index.layout = (page) => (
    <AdminLayout>
        {page}
    </AdminLayout>
);

export default Index;