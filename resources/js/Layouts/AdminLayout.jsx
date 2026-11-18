
import React, { useState } from "react";

import Sidebar from "@/Components/Sidebar";
import Topbar from "@/Components/Topbar";
import Footer from "@/Components/Footer";

import "./AdminLayout.css";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div
            className={`admin-layout ${
                sidebarOpen ? "sidebar-is-open" : "sidebar-is-collapsed"
            }`}
        >
            <Sidebar
                open={sidebarOpen}
                setOpen={setSidebarOpen}
            />

            <div className="admin-main">
                <Topbar
                    toggleSidebar={() =>
                        setSidebarOpen((previous) => !previous)
                    }
                />

                <main className="admin-content">
                    {children}
                </main>

                <Footer />
            </div>
        </div>
    );
}
