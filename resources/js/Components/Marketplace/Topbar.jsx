import { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";

export default function Topbar({
    seller = null,
    onMenuClick,
}) {
    const [profileOpen, setProfileOpen] = useState(false);

    const profileRef = useRef(null);
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (!value) {
        router.visit(route("marketplace.index"));
        return;
    }

    router.get(
        route("marketplace.search"),
        {
            q: value,
        },
        {
            preserveState: true,
            preserveScroll: true,
        }
    );
};

    /*
    |--------------------------------------------------------------------------
    | AUTH USER
    |--------------------------------------------------------------------------
    | Tunapata user kutoka Inertia auth props.
    | Kama seller ametumwa moja kwa moja, tutatumia seller.
    */

    const { auth } = usePage().props;

    const user = seller || auth?.user || null;

    const isAuthenticated = !!user;

    /*
    |--------------------------------------------------------------------------
    | CLOSE DROPDOWN WHEN CLICKING OUTSIDE
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    /*
    |--------------------------------------------------------------------------
    | LOGOUT
    |--------------------------------------------------------------------------
    */

    const handleLogout = () => {
        setProfileOpen(false);

        router.post("/logout");
    };

    /*
    |--------------------------------------------------------------------------
    | LOGIN
    |--------------------------------------------------------------------------
    */

    const handleLogin = () => {
        setProfileOpen(false);

        router.visit("/login");
    };

    /*
    |--------------------------------------------------------------------------
    | REGISTER
    |--------------------------------------------------------------------------
    */

    const handleRegister = () => {
        setProfileOpen(false);

        router.visit("/register");
    };

    /*
    |--------------------------------------------------------------------------
    | USER DISPLAY DATA
    |--------------------------------------------------------------------------
    */

    const userName =
        user?.name ||
        user?.full_name ||
        "Mtumiaji";

    const userAvatar =
        user?.avatar ||
        user?.profile_photo_url ||
        null;

    const userInitial =
        userName?.charAt(0)?.toUpperCase() || "U";

    return (
        <header
            className="
                h-16
                sm:h-[72px]
                bg-white
                border-b
                border-slate-200
                flex
                items-center
                justify-between
                px-3
                sm:px-6
                sticky
                top-0
                z-50
            "
        >

            {/* =====================================================
                LEFT SIDE
            ====================================================== */}

            <div
                className="
                    flex
                    items-center
                    gap-3
                    min-w-0
                "
            >

                {/* MOBILE MENU */}

                <button
                    type="button"
                    onClick={onMenuClick}
                    className="
                        lg:hidden
                        w-10
                        h-10
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        flex
                        items-center
                        justify-center
                        text-xl
                        text-slate-700
                        hover:bg-slate-50
                        transition
                    "
                    aria-label="Open menu"
                >
                    ☰
                </button>


                {/* SEARCH */}

                {/* <div
                    className="
                        relative
                        w-[180px]
                        sm:w-[260px]
                        lg:w-[320px]
                    "
                >

                    <input
                        type="text"
                        placeholder="Tafuta bidhaa au huduma..."
                        className="
                            w-full
                            h-10
                            sm:h-11
                            pl-4
                            pr-10
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            text-sm
                            outline-none
                            focus:border-emerald-500
                            focus:ring-2
                            focus:ring-emerald-100
                        "
                    />

                    <span
                        className="
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2
                            text-lg
                            text-slate-500
                        "
                    >
                        ⌕
                    </span>

                </div> */}
            <form
    onSubmit={handleSearch}
    className="
        relative
        w-[180px]
        sm:w-[260px]
        lg:w-[320px]
    "
>
    <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Tafuta bidhaa au huduma..."
        className="
            w-full
            h-10
            sm:h-11
            pl-4
            pr-12
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            text-sm
            outline-none
            focus:border-emerald-500
            focus:ring-2
            focus:ring-emerald-100
        "
    />

    <button
        type="submit"
        className="
            absolute
            right-2
            top-1/2
            -translate-y-1/2
            w-8
            h-8
            rounded-lg
            flex
            items-center
            justify-center
            text-slate-500
            hover:text-emerald-600
            hover:bg-emerald-50
            transition
        "
        aria-label="Search"
    >
        ⌕
    </button>
</form>
            </div>


            {/* =====================================================
                RIGHT SIDE
            ====================================================== */}

            <div
                className="
                    flex
                    items-center
                    gap-2
                    sm:gap-5
                "
            >

                {/* =================================================
                    NOTIFICATION
                ================================================== */}

                {isAuthenticated && (
                    <button
                        type="button"
                        className="
                            relative
                            w-10
                            h-10
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            text-slate-600
                            text-xl
                            hover:bg-slate-50
                            transition
                        "
                        aria-label="Notifications"
                    >

                        ♧

                        <span
                            className="
                                absolute
                                top-0
                                right-0
                                w-5
                                h-5
                                rounded-full
                                bg-emerald-600
                                text-white
                                text-[10px]
                                font-bold
                                flex
                                items-center
                                justify-center
                            "
                        >
                            3
                        </span>

                    </button>
                )}


                {/* =================================================
                    PROFILE / AUTH
                ================================================== */}

                <div
                    ref={profileRef}
                    className="relative"
                >

                    {/* =================================================
                        LOGGED IN USER
                    ================================================== */}

                    {isAuthenticated ? (

                        <>
                            {/* PROFILE BUTTON */}

                            <button
                                type="button"
                                onClick={() =>
                                    setProfileOpen(
                                        !profileOpen
                                    )
                                }
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    sm:gap-3
                                    rounded-xl
                                    px-2
                                    py-1.5
                                    hover:bg-slate-50
                                    transition
                                    outline-none
                                "
                            >

                                {/* AVATAR */}

                                <div
                                    className="
                                        w-9
                                        h-9
                                        sm:w-10
                                        sm:h-10
                                        rounded-full
                                        bg-emerald-100
                                        flex
                                        items-center
                                        justify-center
                                        overflow-hidden
                                        flex-shrink-0
                                    "
                                >

                                    {userAvatar ? (

                                        <img
                                            src={userAvatar}
                                            alt={userName}
                                            className="
                                                w-full
                                                h-full
                                                object-cover
                                            "
                                        />

                                    ) : (

                                        <span
                                            className="
                                                text-sm
                                                sm:text-base
                                                font-bold
                                                text-emerald-700
                                            "
                                        >
                                            {userInitial}
                                        </span>

                                    )}

                                </div>


                                {/* NAME */}

                                <div
                                    className="
                                        hidden
                                        sm:block
                                        text-left
                                    "
                                >

                                    <p
                                        className="
                                            text-sm
                                            font-semibold
                                            text-slate-800
                                            max-w-[130px]
                                            truncate
                                        "
                                    >
                                        {userName}
                                    </p>

                                    <p
                                        className="
                                            text-xs
                                            text-slate-500
                                        "
                                    >
                                        Muuzaji
                                    </p>

                                </div>


                                {/* ARROW */}

                                <span
                                    className={`
                                        hidden
                                        sm:block
                                        text-slate-500
                                        text-sm
                                        transition-transform
                                        duration-200
                                        ${
                                            profileOpen
                                                ? "rotate-180"
                                                : ""
                                        }
                                    `}
                                >
                                    ▾
                                </span>

                            </button>


                            {/* =================================================
                                DROPDOWN
                            ================================================== */}

                            {profileOpen && (

                                <div
                                    className="
                                        absolute
                                        right-0
                                        top-[calc(100%+10px)]
                                        w-64
                                        bg-white
                                        border
                                        border-slate-200
                                        rounded-2xl
                                        shadow-xl
                                        overflow-hidden
                                        z-[100]
                                    "
                                >

                                    {/* USER INFO */}

                                    <div
                                        className="
                                            px-4
                                            py-4
                                            border-b
                                            border-slate-100
                                            bg-slate-50
                                        "
                                    >

                                        <p
                                            className="
                                                text-sm
                                                font-bold
                                                text-slate-900
                                                truncate
                                            "
                                        >
                                            {userName}
                                        </p>

                                        {user?.email && (
                                            <p
                                                className="
                                                    text-xs
                                                    text-slate-500
                                                    mt-0.5
                                                    truncate
                                                "
                                            >
                                                {user.email}
                                            </p>
                                        )}

                                    </div>


                                    {/* MENU */}

                                    <div className="p-2">

                                        {/* PROFILE */}

                                        <button
                                        type="button"
                                        onClick={() => {
                                            setProfileOpen(false);
                                            router.visit(
                                                route("marketplace.settings.profile")
                                            );
                                        }}
                                        className="
                                            w-full
                                            flex
                                            items-center
                                            gap-3
                                            px-3
                                            py-2.5
                                            rounded-xl
                                            text-sm
                                            text-slate-700
                                            hover:bg-slate-50
                                            transition
                                            text-left
                                        "
                                    >
                                        <span className="text-lg">
                                            👤
                                        </span>

                                        <span>
                                            Wasifu Wangu
                                        </span>
                                    </button>

                                        {/* SETTINGS */}

                                       <button
                                    type="button"
                                    onClick={() => {
                                        setProfileOpen(false);
                                        router.visit(
                                            route("marketplace.settings.profile.edit")
                                        );
                                    }}
                                    className="
                                        w-full
                                        flex
                                        items-center
                                        gap-3
                                        px-3
                                        py-2.5
                                        rounded-xl
                                        text-sm
                                        text-slate-700
                                        hover:bg-slate-50
                                        transition
                                        text-left
                                    "
                                >
                                    <span className="text-lg">
                                        ⚙️
                                    </span>

                                    <span>
                                        Mipangilio
                                    </span>
                                </button>


                                        {/* MARKETPLACE */}

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setProfileOpen(
                                                    false
                                                );

                                                router.visit(
                                                    "/marketplace"
                                                );
                                            }}
                                            className="
                                                w-full
                                                flex
                                                items-center
                                                gap-3
                                                px-3
                                                py-2.5
                                                rounded-xl
                                                text-sm
                                                text-slate-700
                                                hover:bg-slate-50
                                                transition
                                                text-left
                                            "
                                        >

                                            <span className="text-lg">
                                                🛍️
                                            </span>

                                            <span>
                                                Marketplace
                                            </span>

                                        </button>

                                    </div>


                                    {/* LOGOUT */}

                                    <div
                                        className="
                                            border-t
                                            border-slate-100
                                            p-2
                                        "
                                    >

                                        <button
                                            type="button"
                                            onClick={
                                                handleLogout
                                            }
                                            className="
                                                w-full
                                                flex
                                                items-center
                                                gap-3
                                                px-3
                                                py-2.5
                                                rounded-xl
                                                text-sm
                                                font-semibold
                                                text-red-600
                                                hover:bg-red-50
                                                transition
                                                text-left
                                            "
                                        >

                                            <span className="text-lg">
                                                🚪
                                            </span>

                                            <span>
                                                Toka (Logout)
                                            </span>

                                        </button>

                                    </div>

                                </div>

                            )}

                        </>

                    ) : (

                        /* =================================================
                           GUEST USER
                        ================================================== */

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                            "
                        >

                            {/* LOGIN */}

                            <button
                                type="button"
                                onClick={handleLogin}
                                className="
                                    px-3
                                    sm:px-4
                                    py-2
                                    rounded-xl
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    border
                                    border-slate-200
                                    hover:bg-slate-50
                                    transition
                                "
                            >
                                Ingia
                            </button>


                            {/* REGISTER */}

                            <button
                                type="button"
                                onClick={handleRegister}
                                className="
                                    px-3
                                    sm:px-4
                                    py-2
                                    rounded-xl
                                    text-sm
                                    font-semibold
                                    bg-emerald-600
                                    text-white
                                    hover:bg-emerald-700
                                    transition
                                "
                            >
                                Jisajili
                            </button>

                        </div>

                    )}

                </div>

            </div>

        </header>
    );
}