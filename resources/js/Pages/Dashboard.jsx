import AdminLayout from "@/Layouts/AdminLayout";
import SummaryCards from "@/Components/Dashboard/SummaryCards";
import SalesChart from "@/Components/Dashboard/SalesChart";
import StockAlerts from "@/Components/Dashboard/StockAlerts";
import DebtorsSummary from "@/Components/Dashboard/DebtorsSummary";
import RecentSales from "@/Components/Dashboard/RecentSales";
import QuickStats from "@/Components/Dashboard/QuickStats";

export default function Dashboard({
    branch,
    stats = {},
    salesTrend = [],
    stockAlerts = [],
    recentSales = [],
    debtors = {},
    quickStats = {},
}) {
    return (
        <AdminLayout>

            <div className="mx-auto w-full max-w-[1700px]">

                {/* =====================================================
                    HEADER
                ===================================================== */}

                <div className="mb-5">

                    <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                        MauzoVibe Dashboard
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">

                        🏪{" "}

                        <span className="font-semibold text-slate-700">
                            {branch?.name ?? "No Branch Selected"}
                        </span>

                        {branch?.location && (
                            <>
                                {" "}— {branch.location}
                            </>
                        )}

                    </p>

                </div>


                {/* =====================================================
                    SUMMARY CARDS
                ===================================================== */}

                <SummaryCards stats={stats} />


                {/* =====================================================
                    SALES + STOCK ALERTS + DEBTORS
                ===================================================== */}

             
{/* =====================================================
    SALES + STOCK ALERTS + DEBTORS
===================================================== */}

<div className="mt-4 grid w-full grid-cols-1 gap-4 lg:grid-cols-12">

    {/* =================================================
        SALES TREND — 50%
    ================================================= */}

    <div className="min-w-0 lg:col-span-6">
        <SalesChart data={salesTrend} />
    </div>


    {/* =================================================
        STOCK ALERTS — 25%
    ================================================= */}

    <div className="min-w-0 lg:col-span-3">
        <StockAlerts alerts={stockAlerts} />
    </div>


    {/* =================================================
        DEBTORS SUMMARY — 25%
    ================================================= */}

    <div className="min-w-0 lg:col-span-3">
        <DebtorsSummary debtors={debtors} />
    </div>

</div>




                {/* =====================================================
                    RECENT SALES
                ===================================================== */}

                <div className="mt-4">

                    <RecentSales sales={recentSales} />

                </div>


                {/* =====================================================
                    QUICK STATS
                ===================================================== */}

                <div className="mt-4">

                    <QuickStats stats={quickStats} />

                </div>


                {/* =====================================================
                    FOOTER
                ===================================================== */}

                <div className="mt-7 border-t border-slate-200 pt-4 text-center">

                    <p className="text-xs text-slate-400">

                        <span className="font-black text-slate-600">
                            MauzoVibe
                        </span>

                        {" "}• Smart Sales Management

                    </p>

                </div>

            </div>

        </AdminLayout>
    );
}