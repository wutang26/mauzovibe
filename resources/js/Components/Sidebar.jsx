
import { useState } from "react";

import { Link } from "@inertiajs/react";

import {
    HomeIcon,
    ShoppingCartIcon,
    CubeIcon,
    ChartBarIcon,
    UsersIcon,
    Cog6ToothIcon,
    ChevronDownIcon,
    BuildingStorefrontIcon,
    UserGroupIcon,
    DocumentChartBarIcon,
    ArchiveBoxIcon,
    ClipboardDocumentListIcon,
    ArrowPathRoundedSquareIcon,
    DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar({ open }) {
    const [openMenus, setOpenMenus] = useState({});

    const toggleMenu = (menu) => {
        setOpenMenus((prev) => ({
            ...prev,
            [menu]: !prev[menu],
        }));
    };

    const menu = [
        {
            name: "Dashboard",
            icon: HomeIcon,
            link: route("dashboard"),
        },

        {
            name: "Mauzo (POS)",
            icon: ShoppingCartIcon,
            children: [
                {
                    name: "New Sale",
                    icon: ShoppingCartIcon,
                    link: route("admin.sales.create"),
                },
                {
                    name: "Sales History",
                    icon: ClipboardDocumentListIcon,
                    link: route("admin.sales.index"),
                },
                {
                    name: "Returns",
                    icon: ArrowPathRoundedSquareIcon,
                    link: route("admin.returns.index"),
                },
            ],
        },

        {
            name: "Inventory",
            icon: CubeIcon,
            children: [
                {
                    name: "Products",
                    icon: CubeIcon,
                    link: route("admin.products.index"),
                },
                {
                    name: "Categories",
                    icon: ArchiveBoxIcon,
                    link: route("admin.categories.index"),
                },
                {
                    name: "Stock In",
                    icon: BuildingStorefrontIcon,
                    link: route("admin.stockin.index"),
                },
                {
                    name: "Stock Out",
                    icon: BuildingStorefrontIcon,
                    link: route("admin.stockout.index"),
                },
                {
                    name: "Low Stock",
                    icon: CubeIcon,
                    link: route("admin.lowstock.index"),
                },
            ],
        },

        {
            name: "Customers",
            icon: UsersIcon,
            children: [
                {
                    name: "Customer List",
                    icon: UsersIcon,
                    link: route("admin.customers.index"),
                },
                {
                    name: "Credit Sales",
                    icon: ShoppingCartIcon,
                    link: route("admin.credit-sales.index"),
                },
                {
                    name: "Debtors",
                    icon: UsersIcon,
                    link: route("admin.debtors.index"),
                },
                {
                    name: "Payment History",
                    icon: ClipboardDocumentListIcon,
                    link: route("admin.payment-history.index"),
                },
            ],
        },

        {
            name: "Reports",
            icon: ChartBarIcon,
            children: [
                {
                    name: "Daily Report",
                    icon: DocumentChartBarIcon,
                    link: route("admin.reports.daily")
                },
                {
                    name: "Weekly Report",
                    icon: DocumentChartBarIcon,
                    link: route("admin.reports.weekly")
                },
                {
                    name: "Monthly Report",
                    icon: DocumentChartBarIcon,
                    link: route("admin.reports.monthly")
                },
                {
                    name: "Yearly Report",
                    icon: DocumentChartBarIcon,
                    link: route("admin.reports.yearly")
                },
                {
                    name: "Profit Report",
                    icon: ChartBarIcon,
                    link: route("admin.reports.profit")
                },
                {
                    name: "Stock Report",
                    icon: CubeIcon,
                    link: route("admin.reports.stock")
                },
            ],
        },

        {
            name: "Settings",
            icon: Cog6ToothIcon,
            children: [
                {
                    name: "Branches",
                    icon: BuildingStorefrontIcon,
                    link: route("admin.branches.index"),
                },
                {
                    name: "Users",
                    icon: UserGroupIcon,
                    link: route("admin.users.index"),
                },
                 {
                    name: "System Audit",
                    icon: DocumentMagnifyingGlassIcon,
                    link: route("admin.audit.index"),
                },
                 {
                    name: "Subscriptions",
                    icon: DocumentMagnifyingGlassIcon,
                    link: route("subscription.index"),
                },
            ],
        },
    ];

    return (
        <aside
            className={`
                fixed
                left-0
                top-0
                h-screen
                bg-emerald-950
                text-white
                shadow-xl
                transition-all
                duration-300
                z-50
                ${
                    open
                        ? "w-64"
                        : "w-20"
                }
            `}
        >
            {/* Logo */}

            <div
                className="
                    h-16
                    flex
                    items-center
                    justify-center
                    border-b
                    border-emerald-800
                    bg-emerald-900
                "
            >
                <h1
                    className="
                        text-xl
                        font-bold
                        tracking-wide
                        text-white
                    "
                >
                    {open ? (
                        <>
                            Mauzo
                            <span className="text-emerald-300">
                                Vibe
                            </span>
                        </>
                    ) : (
                        <span className="text-emerald-300">
                            MV
                        </span>
                    )}
                </h1>
            </div>

            {/* Navigation */}

            <nav
                className="
                    mt-4
                    overflow-y-auto
                    h-[calc(100vh-100px)]
                    px-2
                "
            >
                {menu.map((item) => {
                    const Icon = item.icon;

                    /* NORMAL LINK */

                    if (!item.children) {
                        return (
                            <Link
                                key={item.name}
                                href={item.link}
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    rounded-lg
                                    px-4
                                    py-3
                                    mb-1
                                    text-emerald-50
                                    hover:bg-emerald-700
                                    hover:text-white
                                    transition-all
                                    duration-200
                                    group
                                "
                            >
                                <Icon
                                    className="
                                        h-5
                                        w-5
                                        text-emerald-300
                                        group-hover:text-white
                                    "
                                />

                                {open && (
                                    <span>
                                        {item.name}
                                    </span>
                                )}
                            </Link>
                        );
                    }

                    /* DROPDOWN */

                    return (
                        <div
                            key={item.name}
                            className="mb-1"
                        >
                            <button
                                onClick={() =>
                                    toggleMenu(item.name)
                                }
                                className="
                                    w-full
                                    flex
                                    items-center
                                    justify-between
                                    rounded-lg
                                    px-4
                                    py-3
                                    text-emerald-50
                                    hover:bg-emerald-700
                                    hover:text-white
                                    transition-all
                                    duration-200
                                    group
                                "
                            >
                                <div className="flex items-center gap-3">
                                    <Icon
                                        className="
                                            h-5
                                            w-5
                                            text-emerald-300
                                            group-hover:text-white
                                        "
                                    />

                                    {open && (
                                        <span>
                                            {item.name}
                                        </span>
                                    )}
                                </div>

                                {open && (
                                    <ChevronDownIcon
                                        className={`
                                            h-4
                                            w-4
                                            text-emerald-300
                                            transition-transform
                                            duration-300
                                            ${
                                                openMenus[item.name]
                                                    ? "rotate-180"
                                                    : ""
                                            }
                                        `}
                                    />
                                )}
                            </button>

                            {open &&
                                openMenus[item.name] && (
                                    <div
                                        className="
                                            ml-6
                                            mt-1
                                            border-l
                                            border-emerald-700
                                            pl-1
                                        "
                                    >
                                        {item.children.map(
                                            (child) => {
                                                const ChildIcon =
                                                    child.icon;

                                                return (
                                                    <Link
                                                        key={
                                                            child.name
                                                        }
                                                        href={
                                                            child.link ||
                                                            "#"
                                                        }
                                                        className="
                                                            flex
                                                            items-center
                                                            gap-3
                                                            py-2.5
                                                            px-4
                                                            text-sm
                                                            text-emerald-200
                                                            rounded-r-lg
                                                            hover:bg-emerald-800
                                                            hover:text-white
                                                            transition-all
                                                            duration-200
                                                            group
                                                        "
                                                    >
                                                        <ChildIcon
                                                            className="
                                                                h-4
                                                                w-4
                                                                text-emerald-400
                                                                group-hover:text-white
                                                            "
                                                        />

                                                        {child.name}
                                                    </Link>
                                                );
                                            }
                                        )}
                                    </div>
                                )}
                        </div>
                    );
                })}
            </nav>

            {/* Footer */}

            <div
                className="
                    absolute
                    bottom-0
                    left-0
                    w-full
                    border-t
                    border-emerald-800
                    bg-emerald-950
                    p-4
                    text-center
                    text-xs
                    text-emerald-400
                "
            >
                {open && "MauzoVibe v1.0"}
            </div>
        </aside>
    );
}

