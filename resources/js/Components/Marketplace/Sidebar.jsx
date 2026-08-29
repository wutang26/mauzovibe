import { Link, usePage } from "@inertiajs/react";

export default function Sidebar() {

    const { url, props } = usePage();

    // =========================================================
    // CURRENT LOGGED-IN USER
    // =========================================================
    const user = props?.auth?.user;


    // =========================================================
    // NAVIGATION ITEMS
    // =========================================================
    const items = [
        {
            label: "Dashboard",
            href: route("marketplace.dashboard"),
            icon: "⌂",
        },
        {
            label: "Bidhaa Zangu",
            href: route("marketplace.index"),
            icon: "⌕",
        },
        {
            label: "Ongeza Bidhaa",
            href: route("marketplace.create"),
            icon: "+",
        },
         {
        label: "Mauzo",
        href: route("marketplace.sales"),
        icon: "♙",
    },
    {
        label: "Ujumbe",
        href: route("marketplace.messages"),
        icon: "⌖",
    },
    {
        label: "Hesabu",
        href: route("marketplace.earnings"),
        icon: "▢",
    },
        {
        label: "Mipangilio",
        href: route("marketplace.settings.profile"),
        icon: "⊞",
    },
    ];


    // =========================================================
    // CURRENT PATH
    // =========================================================
    const currentPath = url.split("?")[0];


    // =========================================================
    // CHECK ACTIVE MENU
    // =========================================================
    const isActive = (href) => {

        if (!href || href === "#") {
            return false;
        }

        try {

            const targetPath = new URL(
                href,
                window.location.origin
            ).pathname;

            return currentPath === targetPath;

        } catch (error) {

            return false;

        }
    };


    return (

        <aside
            className="
                fixed
                inset-y-0
                left-0
                w-[200px]
                bg-[#063f2d]
                text-white
                z-40
                flex
                flex-col
            "
        >

            {/* =====================================================
                BRAND
            ====================================================== */}
            <div className="px-5 py-5 border-b border-white/10">

                <div className="flex items-center gap-3">

                    <div
                        className="
                            w-10
                            h-10
                            rounded-xl
                            bg-white
                            flex
                            items-center
                            justify-center
                            text-[#087a4d]
                            text-xl
                            shrink-0
                        "
                    >
                        🛍
                    </div>


                    <div className="min-w-0">

                        <div className="font-bold text-lg leading-none">
                            MauzoVibe
                        </div>

                        <div className="text-xs text-white/70 mt-1">
                            Ecommerce
                        </div>

                    </div>

                </div>

            </div>


            {/* =====================================================
                NAVIGATION
            ====================================================== */}
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">

                {items.map((item) => {

                    const active = isActive(item.href);

                    /*
                     * Items ambazo bado hazina route
                     * zitaonekana disabled badala ya
                     * kumpeleka user kwenye "#".
                     */
                    const disabled = item.href === "#";


                    if (disabled) {

                        return (
                            <div
                                key={item.label}
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    px-3
                                    py-3
                                    rounded-lg
                                    text-sm
                                    font-medium
                                    text-white/40
                                    cursor-not-allowed
                                "
                                title={`${item.label} — Inakuja hivi karibuni`}
                            >

                                <span className="w-6 text-center text-lg">
                                    {item.icon}
                                </span>

                                <span>
                                    {item.label}
                                </span>

                            </div>
                        );

                    }


                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`
                                flex
                                items-center
                                gap-3
                                px-3
                                py-3
                                rounded-lg
                                text-sm
                                font-medium
                                transition
                                ${
                                    active
                                        ? "bg-emerald-500 text-white shadow-sm"
                                        : "text-white/80 hover:bg-white/10 hover:text-white"
                                }
                            `}
                        >

                            <span className="w-6 text-center text-lg">
                                {item.icon}
                            </span>

                            <span>
                                {item.label}
                            </span>

                        </Link>
                    );

                })}

            </nav>


            {/* =====================================================
                CURRENT SELLER
            ====================================================== */}
            <div className="p-3 border-t border-white/10">

                <div
                    className="
                        rounded-xl
                        border
                        border-white/20
                        bg-white/5
                        p-3
                    "
                >

                    <div className="flex items-center gap-3">

                        {/* =================================================
                            USER AVATAR
                        ================================================== */}
                        <div
                            className="
                                w-10
                                h-10
                                rounded-full
                                bg-slate-300
                                flex
                                items-center
                                justify-center
                                text-slate-700
                                overflow-hidden
                                shrink-0
                            "
                        >

                            {user?.avatar ? (

                                <img
                                    src={user.avatar}
                                    alt={user?.name || "User"}
                                    className="
                                        w-full
                                        h-full
                                        object-cover
                                    "
                                />

                            ) : (

                                <i className="fa-solid fa-user text-slate-600"></i>

                            )}

                        </div>


                        {/* =================================================
                            USER INFORMATION
                        ================================================== */}
                        <div className="min-w-0 flex-1">

                            <p
                                className="
                                    text-sm
                                    font-semibold
                                    truncate
                                    text-white
                                "
                                title={user?.name || "Guest User"}
                            >
                                {user?.name || "Guest User"}
                            </p>


                            <p className="text-xs text-white/60 truncate">
                                Muuzaji 🇹🇿
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </aside>
    );
}