
import {
    Bars3Icon,
    BellIcon,
    ChevronDownIcon,
    MoonIcon,
    SunIcon,
    LanguageIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";

import { useState } from "react";
import { router, usePage } from "@inertiajs/react";

export default function Topbar({ toggleSidebar }) {

    const { auth } = usePage().props;

    const user = auth?.user;

    const activeBranch = auth?.active_branch;

    const [open, setOpen] = useState(false);

    const [darkMode, setDarkMode] = useState(false);

    const [language, setLanguage] = useState("EN");


    // =====================================================
    // LOGOUT
    // =====================================================

    function logout() {

        router.post("/logout");

    }


    // =====================================================
    // DARK MODE
    // =====================================================

    function toggleDarkMode() {

        setDarkMode(!darkMode);

        document.documentElement.classList.toggle(
            "dark"
        );

    }


    // =====================================================
    // CHANGE LANGUAGE
    // =====================================================

    function changeLanguage() {

        setLanguage(
            language === "EN"
                ? "SW"
                : "EN"
        );

    }


    // =====================================================
    // REGISTER ANOTHER BRANCH
    // =====================================================

    function registerAnotherBranch() {

        // Close dropdown first
        setOpen(false);

        // Go to register branch page
        router.get(
            route("branches.register")
        );

    }


    // =====================================================
    // SWITCH BRANCH
    // =====================================================

    function switchBranch(branchId) {

        // Close dropdown
        setOpen(false);

        // Switch selected branch
        router.post(
            `/switch-branch/${branchId}`
        );

    }


    return (

        <header
            className="
                h-16
                bg-white
                dark:bg-gray-900
                shadow
                flex
                items-center
                justify-between
                px-6
            "
        >

            {/* =====================================================
                SIDEBAR TOGGLE
            ===================================================== */}

            <button
                onClick={toggleSidebar}
                className="
                    hover:bg-gray-100
                    dark:hover:bg-gray-800
                    p-2
                    rounded-lg
                "
            >

                <Bars3Icon
                    className="
                        w-7
                        h-7
                        text-gray-700
                        dark:text-white
                    "
                />

            </button>


            {/* =====================================================
                RIGHT MENU
            ===================================================== */}

            <div
                className="
                    flex
                    items-center
                    gap-4
                "
            >


                {/* =================================================
                    LANGUAGE
                ================================================= */}

                <button
                    onClick={changeLanguage}
                    className="
                        flex
                        items-center
                        gap-1
                        hover:bg-gray-100
                        dark:hover:bg-gray-800
                        px-3
                        py-2
                        rounded-lg
                    "
                >

                    <LanguageIcon
                        className="w-5 h-5"
                    />

                    <span className="text-sm">
                        {language}
                    </span>

                </button>


                {/* =================================================
                    DARK MODE
                ================================================= */}

                <button
                    onClick={toggleDarkMode}
                    className="
                        hover:bg-gray-100
                        dark:hover:bg-gray-800
                        p-2
                        rounded-lg
                    "
                >

                    {darkMode ? (

                        <SunIcon
                            className="w-6 h-6"
                        />

                    ) : (

                        <MoonIcon
                            className="w-6 h-6"
                        />

                    )}

                </button>


                {/* =================================================
                    NOTIFICATION
                ================================================= */}

                <button
                    className="
                        hover:bg-gray-100
                        dark:hover:bg-gray-800
                        p-2
                        rounded-lg
                    "
                >

                    <BellIcon
                        className="
                            w-6
                            h-6
                            text-gray-600
                            dark:text-gray-300
                        "
                    />

                </button>


                {/* =================================================
                    PROFILE DROPDOWN
                ================================================= */}

                <div className="relative">


                    {/* Profile Button */}

                    <button
                        onClick={() =>
                            setOpen(!open)
                        }
                        className="
                            flex
                            items-center
                            gap-3
                            hover:bg-gray-100
                            dark:hover:bg-gray-800
                            px-3
                            py-2
                            rounded-lg
                        "
                    >

                        <div className="text-right">

                            {/* User Name */}

                            <p
                                className="
                                    font-semibold
                                    text-gray-900
                                    dark:text-white
                                "
                            >
                                {user?.name}
                            </p>


                            {/* Active Branch */}

                            <p
                                className="
                                    text-xs
                                    text-gray-500
                                    dark:text-gray-400
                                "
                            >

                                {activeBranch?.name
                                    ? activeBranch.name
                                    : "No Branch"}

                            </p>

                        </div>


                        <ChevronDownIcon
                            className="
                                w-5
                                h-5
                                text-gray-600
                                dark:text-gray-300
                            "
                        />

                    </button>


                    {/* =================================================
                        DROPDOWN
                    ================================================= */}

                    {open && (

                        <div
                            className="
                                absolute
                                right-0
                                mt-2
                                w-64
                                bg-white
                                dark:bg-gray-800
                                rounded-xl
                                shadow-xl
                                border
                                border-gray-100
                                dark:border-gray-700
                                py-2
                                z-50
                            "
                        >


                            {/* =================================================
                                SWITCH BRANCH
                            ================================================= */}

                            <div className="px-4 py-3">


                                <p
                                    className="
                                        font-semibold
                                        text-gray-900
                                        dark:text-white
                                        mb-3
                                    "
                                >
                                    Switch Branch
                                </p>


                                {/* Branch List */}

                                <div className="space-y-1">

                                    {user?.branches?.map(
                                        (branch) => (

                                            <button
                                                key={branch.id}
                                                type="button"
                                                onClick={() =>
                                                    switchBranch(
                                                        branch.id
                                                    )
                                                }
                                                className={`
                                                    w-full
                                                    text-left
                                                    flex
                                                    items-center
                                                    gap-3
                                                    px-3
                                                    py-2.5
                                                    rounded-lg
                                                    transition

                                                    ${
                                                        activeBranch?.id ===
                                                        branch.id

                                                            ? `
                                                                bg-emerald-50
                                                                text-emerald-700
                                                                dark:bg-emerald-900/30
                                                                dark:text-emerald-400
                                                            `

                                                            : `
                                                                hover:bg-gray-100
                                                                dark:hover:bg-gray-700
                                                                text-gray-700
                                                                dark:text-gray-200
                                                            `
                                                    }
                                                `}
                                            >

                                                {/* Active Indicator */}

                                                <span
                                                    className="
                                                        w-5
                                                        text-center
                                                        font-bold
                                                    "
                                                >

                                                    {activeBranch?.id ===
                                                    branch.id

                                                        ? "✓"

                                                        : "○"}

                                                </span>


                                                {/* Branch Name */}

                                                <span
                                                    className="
                                                        truncate
                                                    "
                                                >
                                                    {branch.name}
                                                </span>

                                            </button>

                                        )
                                    )}

                                </div>


                                {/* =================================================
                                    REGISTER ANOTHER BRANCH
                                ================================================= */}

                                <button
                                    type="button"
                                    onClick={
                                        registerAnotherBranch
                                    }
                                    className="
                                        mt-3
                                        w-full
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        px-3
                                        py-2.5
                                        rounded-lg
                                        border
                                        border-emerald-200
                                        bg-emerald-50
                                        text-emerald-700
                                        hover:bg-emerald-100
                                        dark:bg-emerald-900/20
                                        dark:border-emerald-800
                                        dark:text-emerald-400
                                        dark:hover:bg-emerald-900/40
                                        transition
                                        font-medium
                                        text-sm
                                    "
                                >

                                    <PlusIcon
                                        className="w-5 h-5"
                                    />

                                    Register Another Branch

                                </button>

                            </div>


                            {/* Divider */}

                            <hr
                                className="
                                    my-1
                                    border-gray-100
                                    dark:border-gray-700
                                "
                            />


                            {/* =================================================
                                PROFILE
                            ================================================= */}

                            <a
                                href="/profile"
                                className="
                                    block
                                    px-4
                                    py-2.5
                                    hover:bg-gray-100
                                    dark:hover:bg-gray-700
                                    text-gray-700
                                    dark:text-gray-200
                                "
                            >
                                👤 View Profile
                            </a>


                            {/* =================================================
                                PASSWORD
                            ================================================= */}

                           <a
                                href="/profile#password"
                                onClick={() => setOpen(false)}
                                className="
                                    block
                                    px-4
                                    py-2.5
                                    hover:bg-gray-100
                                    dark:hover:bg-gray-700
                                    text-gray-700
                                    dark:text-gray-200
                                "
                            >
                                🔒 Change Password
                            </a>


                            {/* Divider */}

                            <hr
                                className="
                                    my-1
                                    border-gray-100
                                    dark:border-gray-700
                                "
                            />


                            {/* =================================================
                                LOGOUT
                            ================================================= */}

                            <button
                                onClick={logout}
                                className="
                                    w-full
                                    text-left
                                    px-4
                                    py-2.5
                                    text-red-600
                                    hover:bg-red-50
                                    dark:hover:bg-red-900/20
                                "
                            >
                                🚪 Logout
                            </button>


                        </div>

                    )}

                </div>

            </div>

        </header>
    );
}

