import { Link, usePage } from "@inertiajs/react";

export default function Sidebar() {

    const { url } = usePage();

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
            href: "#",
            icon: "♙",
        },
        {
            label: "Ujumbe",
            href: "#",
            icon: "⌖",
        },
        {
            label: "Hesabu",
            href: "#",
            icon: "▢",
        },
        {
            label: "Mipangilio",
            href: "#",
            icon: "⊞",
        },
    ];

    return (
        <aside className="fixed inset-y-0 left-0 w-[200px] bg-[#063f2d] text-white z-40 flex flex-col">

            {/* BRAND */}
            <div className="px-5 py-5 border-b border-white/10">

                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#087a4d] text-xl">
                        🛍
                    </div>

                    <div>
                        <div className="font-bold text-lg leading-none">
                            MauzoVibe
                        </div>

                        <div className="text-xs text-white/70 mt-1">
                            Ecommerce
                        </div>
                    </div>

                </div>

            </div>


            {/* NAVIGATION */}
            <nav className="flex-1 px-2 py-4 space-y-1">

                {items.map((item) => {

                    const active =
                        url.includes(item.href.replace(window.location.origin, ""));

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition
                                ${
                                    active
                                        ? "bg-emerald-500 text-white"
                                        : "text-white/80 hover:bg-white/10 hover:text-white"
                                }
                            `}
                        >
                            <span className="w-6 text-center text-lg">
                                {item.icon}
                            </span>

                            {item.label}
                        </Link>
                    );
                })}

            </nav>


            {/* SELLER */}
            <div className="p-3">

                <div className="rounded-xl border border-white/20 bg-white/5 p-3">

                    <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-slate-700">
                            👤
                        </div>

                        <div className="min-w-0">

                            <p className="text-sm font-semibold truncate">
                                Juma Ally
                            </p>

                            <p className="text-xs text-white/60">
                                Muuzaji 🇹🇿
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </aside>
    );
}