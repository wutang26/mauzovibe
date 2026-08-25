import { useState } from "react";
import Sidebar from "@/Components/Marketplace/Sidebar";
import Topbar from "@/Components/Marketplace/Topbar";

export default function MarketplaceLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50">

            {/* =====================================================
                MOBILE OVERLAY
            ====================================================== */}

            {sidebarOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={() => setSidebarOpen(false)}
                    className="
                        fixed
                        inset-0
                        z-40
                        bg-black/40
                        lg:hidden
                        cursor-default
                    "
                />
            )}


            {/* =====================================================
                SIDEBAR
            ====================================================== */}

            <aside
                className={`
                    fixed
                    top-0
                    left-0
                    bottom-0
                    z-50
                    w-64
                    bg-white
                    border-r
                    border-slate-200
                    shadow-xl
                    transform
                    transition-transform
                    duration-300
                    ease-in-out

                    lg:translate-x-0

                    ${
                        sidebarOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }
                `}
            >
                <Sidebar
                    onClose={() => setSidebarOpen(false)}
                />
            </aside>


            {/* =====================================================
                MAIN APPLICATION AREA
            ====================================================== */}

            <div className="
                min-h-screen
                lg:pl-64
            ">

                {/* =================================================
                    STICKY TOPBAR
                ================================================== */}

                <header className="
                    sticky
                    top-0
                    z-30
                    h-16
                    bg-white
                    border-b
                    border-slate-200
                    shadow-sm
                ">

                    <Topbar
                        onMenuClick={() => setSidebarOpen(true)}
                    />

                </header>


                {/* =================================================
                    MAIN CONTENT
                ================================================== */}

                <main className="
                    w-full
                    min-h-[calc(100vh-4rem)]
                    overflow-x-hidden
                ">

                    <div className="
                        w-full
                        max-w-[1600px]
                        mx-auto
                        px-3
                        sm:px-4
                        md:px-6
                        lg:px-8
                        py-4
                        sm:py-6
                    ">

                        {children}

                    </div>

                </main>

            </div>

        </div>
    );
}
