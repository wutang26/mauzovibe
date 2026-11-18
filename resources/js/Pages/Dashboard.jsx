
import { Link } from "@inertiajs/react";

import AdminLayout from "@/Layouts/AdminLayout";
import SummaryCards from "@/Components/Dashboard/SummaryCards";

import "./Dashboard.css";

const quickActions = [
    {
        title: "FANYA MAUZO",
        description: "Anza kuuza bidhaa kwa mteja",
        icon: "🛒",
        href: "/admin/sales/quick-sale",
        color: "quick-action-green",
        featured: true,
    },
    {
        title: "UZA KWA SIMU",
        description: "Chagua bidhaa, scan barcode na uza kwa simu",
        icon: "📱",
        href: "/admin/sales/mobile-pos",
        color: "quick-action-indigo",
    },
     {
        title: "BIDHAA",
        description: "Angalia na simamia bidhaa",
        icon: "📦",
        href: "/admin/products",
        color: "quick-action-blue",
    },
    {
        title: "INGIZA STOCK",
        description: "Ongeza bidhaa zilizopokelewa",
        icon: "📥",
        href: "/admin/stockin/create",
        color: "quick-action-purple",
    },
    {
        title: "WATEJA",
        description: "Angalia na simamia wateja",
        icon: "👥",
        href: "/admin/customers",
        color: "quick-action-orange",
    },
    {
        title: "MALIPO",
        description: "Angalia historia ya malipo",
        icon: "💳",
        href: "/admin/payment-history",
        color: "quick-action-teal",
    },
    {
        title: "HISTORIA YA MAUZO",
        description: "Angalia mauzo yote yaliyofanyika",
        icon: "🧾",
        href: "/admin/sales",
        color: "quick-action-pink",
    },
    {
        title: "RIPOTI YA LEO",
        description: "Angalia ripoti ya mauzo ya leo",
        icon: "📊",
        href: "/admin/reports/daily",
        color: "quick-action-slate",
    },
];

export default function Dashboard({
    branch,
    stats = {},
}) {
    return (
        <AdminLayout>
            <div className="dashboard-container">

                {/* HEADER */}
                <header className="dashboard-header">
                    <div>
                        <h1>MauzoVibe Dashboard</h1>

                        <p className="dashboard-branch">
                            🏪{" "}
                            <span className="branch-name">
                                {branch?.name ?? "No Branch Selected"}
                            </span>

                            {branch?.location && (
                                <> — {branch.location}</>
                            )}
                        </p>

                        <p className="dashboard-welcome">
                            Karibu MauzoVibe. Simamia biashara yako kwa urahisi.
                        </p>
                    </div>
                </header>

                {/* MUHTASARI WA BIASHARA */}
                <section className="dashboard-section">
                    <h2 className="dashboard-section-title">
                        Muhtasari wa Biashara
                    </h2>

                    <SummaryCards stats={stats} />
                </section>

                {/* QUICK ACTIONS */}
                <section className="quick-actions-section">

                    <div className="dashboard-section-heading">
                        <div>
                            <h2>Huduma za Haraka</h2>
                            <p>
                                Chagua huduma unayotaka kutumia kwenye biashara yako
                            </p>
                        </div>

                        <span className="quick-actions-count">
                            {quickActions.length} Huduma
                        </span>
                    </div>

                    <div className="quick-actions-grid">
                        {quickActions.map((action) => (
                            <Link
                                key={action.href}
                                href={action.href}
                                className={`
                                    quick-action-card
                                    ${action.color}
                                    ${action.featured ? "quick-action-featured" : ""}
                                `}
                            >
                                <div className="quick-action-top">
                                    <span className="quick-action-icon">
                                        {action.icon}
                                    </span>

                                    <span className="quick-action-arrow">
                                        →
                                    </span>
                                </div>

                                <div className="quick-action-content">
                                    <h3>{action.title}</h3>
                                    <p>{action.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

               

            </div>
        </AdminLayout>
    );
}
