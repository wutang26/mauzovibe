import { useEffect, useMemo, useState } from "react";
import { Link, usePage } from "@inertiajs/react";

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
    NewspaperIcon,
    BoltIcon,
    EllipsisHorizontalCircleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

import "./Sidebar.css";

export default function Sidebar({ open = true, setOpen = () => {} }) {
    const [isMobile, setIsMobile] = useState(false);
    const [openMenus, setOpenMenus] = useState({});

    const { url, props } = usePage();

    const user = props.auth?.user;
    const currentUrl = url || "/";

    /*
    |--------------------------------------------------------------------------
    | Screen detection
    |--------------------------------------------------------------------------
    | Mobile: chini ya 768px
    | Tablet/Desktop: 768px na kuendelea
    */
    useEffect(() => {
        const updateScreen = () => {
            const mobile = window.innerWidth < 768;

            setIsMobile(mobile);

            // Tunapoingia mobile, sidebar inaanza ikiwa imefungwa.
            if (mobile) {
                setOpen(false);
            }
        };

        updateScreen();

        window.addEventListener("resize", updateScreen);

        return () => {
            window.removeEventListener("resize", updateScreen);
        };
    }, [setOpen]);

    /*
    |--------------------------------------------------------------------------
    | Close mobile sidebar after navigation
    |--------------------------------------------------------------------------
    */
    useEffect(() => {
        if (isMobile) {
            setOpen(false);
        }
    }, [currentUrl, isMobile, setOpen]);

    /*
    |--------------------------------------------------------------------------
    | Close sidebar using Escape key
    |--------------------------------------------------------------------------
    */
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape" && isMobile && open) {
                setOpen(false);
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isMobile, open, setOpen]);

    /*
    |--------------------------------------------------------------------------
    | User roles
    |--------------------------------------------------------------------------
    */
    const userRoles = Array.isArray(user?.roles)
        ? user.roles.map((role) =>
              typeof role === "string" ? role : role?.name
          )
        : [];

    const isAdmin = userRoles.some((role) =>
        ["Admin", "Super Admin"].includes(role)
    );

    /*
    |--------------------------------------------------------------------------
    | Menu configuration
    |--------------------------------------------------------------------------
    */
    const menu = useMemo(
        () => [
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
                        name: "Quick Sale",
                        icon: BoltIcon,
                        link: route("admin.sales.quick-sale"),
                    },
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
                        name: "Categories",
                        icon: ArchiveBoxIcon,
                        link: route("admin.categories.index"),
                    },
                    {
                        name: "Products",
                        icon: CubeIcon,
                        link: route("admin.products.index"),
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
                        link: route("admin.reports.daily"),
                    },
                    {
                        name: "Weekly Report",
                        icon: DocumentChartBarIcon,
                        link: route("admin.reports.weekly"),
                    },
                    {
                        name: "Monthly Report",
                        icon: DocumentChartBarIcon,
                        link: route("admin.reports.monthly"),
                    },
                    {
                        name: "Yearly Report",
                        icon: DocumentChartBarIcon,
                        link: route("admin.reports.yearly"),
                    },
                    {
                        name: "Profit Report",
                        icon: ChartBarIcon,
                        link: route("admin.reports.profit"),
                    },
                    {
                        name: "Stock Report",
                        icon: CubeIcon,
                        link: route("admin.reports.stock"),
                    },
                ],
            },

            ...(isAdmin
                ? [
                      {
                          name: "Daily Posts",
                          icon: NewspaperIcon,
                          children: [
                              {
                                  name: "All Daily Posts",
                                  icon: NewspaperIcon,
                                  link: route("admin.daily-posts.index"),
                              },
                              {
                                  name: "Add Daily Post",
                                  icon: ClipboardDocumentListIcon,
                                  link: route("admin.daily-posts.create"),
                              },
                          ],
                      },
                  ]
                : []),

            {
                name: "Settings",
                icon: Cog6ToothIcon,
                children: [
                    {
                        name: "Branches",
                        icon: BuildingStorefrontIcon,
                        link: route("admin.branches.index"),
                    },

                    ...(isAdmin
                        ? [
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
                          ]
                        : []),
                ],
            },
        ],
        [isAdmin]
    );

    /*
    |--------------------------------------------------------------------------
    | Active route detection
    |--------------------------------------------------------------------------
    */
    const isActive = (link) => {
        if (!link) return false;

        try {
            const targetPath =
                new URL(link, window.location.origin).pathname.replace(
                    /\/+$/,
                    ""
                ) || "/";

            const activePath =
                currentUrl.split("?")[0].replace(/\/+$/, "") || "/";

            return (
                activePath === targetPath ||
                activePath.startsWith(targetPath + "/")
            );
        } catch {
            return false;
        }
    };

    const isChildActive = (item) =>
        item.children?.some((child) => isActive(child.link)) ?? false;

    /*
    |--------------------------------------------------------------------------
    | Automatically expand active menu group
    |--------------------------------------------------------------------------
    */
    useEffect(() => {
        const activeGroups = {};

        menu.forEach((item) => {
            if (item.children && isChildActive(item)) {
                activeGroups[item.name] = true;
            }
        });

        setOpenMenus((previous) => ({
            ...previous,
            ...activeGroups,
        }));
    }, [currentUrl, menu]);

    const toggleMenu = (name) => {
        setOpenMenus((previous) => ({
            ...previous,
            [name]: !previous[name],
        }));
    };

    /*
    |--------------------------------------------------------------------------
    | Sidebar controls
    |--------------------------------------------------------------------------
    */
    const closeMobileMenu = () => {
        if (isMobile) {
            setOpen(false);
        }
    };

    const toggleMobileMenu = () => {
        setOpen(!open);
    };

    // Desktop: open controls expanded/collapsed.
    // Mobile: open controls visible/hidden.
    const showLabels = isMobile ? true : open;

    const sidebarClass = [
        "mauzo-sidebar",
        !isMobile && (open ? "sidebar-expanded" : "sidebar-collapsed"),
        isMobile && "sidebar-mobile",
        isMobile && open && "sidebar-mobile-open",
    ]
        .filter(Boolean)
        .join(" ");

    /*
    |--------------------------------------------------------------------------
    | Render menu
    |--------------------------------------------------------------------------
    */
    const renderMenu = () =>
        menu.map((item) => {
            const Icon = item.icon || HomeIcon;

            const active = item.children
                ? isChildActive(item)
                : isActive(item.link);

            // Menu item without submenu
            if (!item.children) {
                return (
                    <Link
                        key={item.name}
                        href={item.link}
                        onClick={closeMobileMenu}
                        title={!showLabels ? item.name : undefined}
                        className={`sidebar-link ${
                            active ? "active" : ""
                        }`}
                    >
                        <Icon className="sidebar-icon" />

                        {showLabels && (
                            <span className="sidebar-link-text">
                                {item.name}
                            </span>
                        )}
                    </Link>
                );
            }

            // Menu group
            const expanded = Boolean(openMenus[item.name] || active);

            return (
                <div
                    key={item.name}
                    className={`sidebar-group ${
                        expanded ? "group-expanded" : ""
                    }`}
                >
                    <button
                        type="button"
                        onClick={() => toggleMenu(item.name)}
                        title={!showLabels ? item.name : undefined}
                        aria-expanded={expanded}
                        className={`sidebar-link sidebar-group-button ${
                            active ? "active" : ""
                        }`}
                    >
                        <Icon className="sidebar-icon" />

                        {showLabels && (
                            <>
                                <span className="sidebar-link-text">
                                    {item.name}
                                </span>

                                <ChevronDownIcon
                                    className={`sidebar-chevron ${
                                        expanded ? "rotated" : ""
                                    }`}
                                />
                            </>
                        )}
                    </button>

                    {expanded && (
                        <div className="sidebar-submenu">
                            {item.children.map((child) => {
                                const ChildIcon = child.icon || HomeIcon;
                                const childActive = isActive(child.link);

                                return (
                                    <Link
                                        key={child.name}
                                        href={child.link}
                                        onClick={closeMobileMenu}
                                        className={`sidebar-sublink ${
                                            childActive ? "active" : ""
                                        }`}
                                    >
                                        <ChildIcon className="sidebar-subicon" />
                                        <span>{child.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            );
        });

    /*
    |--------------------------------------------------------------------------
    | Quick mobile navigation links
    |--------------------------------------------------------------------------
    */
    const dashboardLink = route("dashboard");
    const quickSaleLink = route("admin.sales.quick-sale");
    const productsLink = route("admin.products.index");
    const customersLink = route("admin.customers.index");

    return (
        <>
            {/* Mobile overlay */}
            {isMobile && open && (
                <button
                    type="button"
                    className="sidebar-mobile-overlay"
                    onClick={closeMobileMenu}
                    aria-label="Close navigation menu"
                />
            )}

            {/* Main sidebar */}
            <aside className={sidebarClass}>
                <div className="sidebar-brand">
                    <h1>
                        {showLabels ? (
                            <>
                                Mauzo<span>Vibe</span>
                            </>
                        ) : (
                            <span>MV</span>
                        )}
                    </h1>

                    {isMobile && open && (
                        <button
                            type="button"
                            className="sidebar-close"
                            onClick={closeMobileMenu}
                            aria-label="Close navigation"
                        >
                            <XMarkIcon />
                        </button>
                    )}
                </div>

                <nav className="sidebar-navigation">
                    {renderMenu()}
                </nav>

                <div className="sidebar-footer">
                    {showLabels && <span>MauzoVibe v1.0</span>}
                </div>
            </aside>

            {/* Mobile bottom navigation */}
            {isMobile && (
                <nav className="mobile-bottom-nav">
                    <Link
                        href={dashboardLink}
                        onClick={closeMobileMenu}
                        className={`mobile-nav-item ${
                            isActive(dashboardLink) ? "active" : ""
                        }`}
                    >
                        <HomeIcon />
                        <span>Home</span>
                    </Link>

                    <Link
                        href={quickSaleLink}
                        onClick={closeMobileMenu}
                        className={`mobile-nav-item ${
                            isActive(quickSaleLink) ? "active" : ""
                        }`}
                    >
                        <BoltIcon />
                        <span>Sale</span>
                    </Link>

                    <Link
                        href={productsLink}
                        onClick={closeMobileMenu}
                        className={`mobile-nav-item ${
                            isActive(productsLink) ? "active" : ""
                        }`}
                    >
                        <CubeIcon />
                        <span>Products</span>
                    </Link>

                    <Link
                        href={customersLink}
                        onClick={closeMobileMenu}
                        className={`mobile-nav-item ${
                            isActive(customersLink) ? "active" : ""
                        }`}
                    >
                        <UsersIcon />
                        <span>Customers</span>
                    </Link>

                    <button
                        type="button"
                        onClick={toggleMobileMenu}
                        className={`mobile-nav-item ${
                            open ? "active" : ""
                        }`}
                        aria-expanded={open}
                        aria-label={
                            open ? "Close more menu" : "Open more menu"
                        }
                    >
                        {open ? (
                            <XMarkIcon />
                        ) : (
                            <EllipsisHorizontalCircleIcon />
                        )}

                        <span>{open ? "Funga" : "Zaidi"}</span>
                    </button>
                </nav>
            )}
        </>
    );
}