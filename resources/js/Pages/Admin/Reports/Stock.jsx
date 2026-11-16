
import React from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

import {
    ArchiveBoxIcon,
    CubeIcon,
    CurrencyDollarIcon,
    ArrowTrendingUpIcon,
    ExclamationTriangleIcon,
    XCircleIcon,
    ArrowDownTrayIcon,
    ArrowUpTrayIcon,
    PrinterIcon,
} from "@heroicons/react/24/outline";

import "./Stock.css";

export default function Stock({
    summary = {},
    products = [],
    lowStockProducts = [],
    outOfStockProducts = [],
    movements = [],
}) {
    const safeSummary = summary || {};
    const safeProducts = Array.isArray(products) ? products : [];
    const safeLowStock = Array.isArray(lowStockProducts)
        ? lowStockProducts
        : [];
    const safeOutOfStock = Array.isArray(outOfStockProducts)
        ? outOfStockProducts
        : [];
    const safeMovements = Array.isArray(movements) ? movements : [];

    const money = (value) =>
        new Intl.NumberFormat("en-TZ", {
            style: "currency",
            currency: "TZS",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(Number(value || 0));

    const number = (value) =>
        new Intl.NumberFormat("en-TZ", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(Number(value || 0));

    const printReport = () => {
        window.print();
    };

    const totalQuantity = safeProducts.reduce(
        (total, product) => total + Number(product.quantity || 0),
        0
    );

    const totalCostValue = safeProducts.reduce(
        (total, product) => total + Number(product.costValue || 0),
        0
    );

    const totalSellingValue = safeProducts.reduce(
        (total, product) =>
            total +
            Number(product.quantity || 0) *
                Number(product.sellingPrice || 0),
        0
    );

    const totalExpectedProfit = safeProducts.reduce(
        (total, product) => total + Number(product.expectedProfit || 0),
        0
    );

    const totalStockIn = Number(safeSummary.stockIn || 0);
    const totalStockOut = Number(safeSummary.stockOut || 0);

    const generatedAt = new Date().toLocaleString("en-GB");

    const statusLabel = (status) => {
        if (status === "out_of_stock") return "Out of Stock";
        if (status === "low_stock") return "Low Stock";
        return "In Stock";
    };

    const isStockIn = (type) => {
        const normalized = String(type || "").toLowerCase();

        return (
            normalized === "in" ||
            normalized.includes("stock_in") ||
            normalized.includes("stock in") ||
            normalized.includes("purchase") ||
            normalized.includes("received")
        );
    };

    const statusBadge = (status) => {
        if (status === "out_of_stock") {
            return (
                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
                    Out of Stock
                </span>
            );
        }

        if (status === "low_stock") {
            return (
                <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
                    Low Stock
                </span>
            );
        }

        return (
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                In Stock
            </span>
        );
    };

    const movementBadge = (type) => {
        if (isStockIn(type)) {
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                    <ArrowDownTrayIcon className="h-3.5 w-3.5" />
                    Stock In
                </span>
            );
        }

        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
                <ArrowUpTrayIcon className="h-3.5 w-3.5" />
                Stock Out
            </span>
        );
    };

    const PrintStat = ({ label, value, tone = "" }) => (
        <div className="stock-print-stat">
            <div className="stock-print-stat-label">{label}</div>
            <div className={`stock-print-stat-value ${tone}`}>
                {value}
            </div>
        </div>
    );

    return (
        <AdminLayout>
            <Head title="Stock Report" />

            {/* =====================================================
                PRINT-ONLY A4 INVENTORY REPORT
            ====================================================== */}

            <div className="stock-print-area">
                {/* REPORT HEADER */}
                <header className="stock-print-header">
                    <div className="stock-print-header-top">
                        <div>
                            <h1 className="stock-print-brand">
                                MauzoVibe
                            </h1>

                            <p className="stock-print-subtitle">
                                Inventory Management & Business Reporting
                            </p>

                            <p className="stock-print-subtitle">
                                Stock Position, Valuation and Movement Statement
                            </p>
                        </div>

                        <div className="stock-print-heading-right">
                            <h2 className="stock-print-title">
                                STOCK REPORT
                            </h2>

                            <p>Official Inventory Statement</p>
                        </div>
                    </div>

                    <div className="stock-print-meta">
                        <span>
                            <strong>Report:</strong> Current Inventory
                        </span>

                        <span>
                            <strong>Products:</strong>{" "}
                            {number(safeSummary.totalProducts ?? safeProducts.length)}
                        </span>

                        <span>
                            <strong>Movements:</strong>{" "}
                            {safeMovements.length}
                        </span>

                        <span>
                            <strong>Generated:</strong> {generatedAt}
                        </span>

                        <span>
                            <strong>Currency:</strong> TZS
                        </span>
                    </div>
                </header>

                {/* INVENTORY SUMMARY */}
                <section className="stock-print-section">
                    <h2>Inventory Summary</h2>

                    <div className="stock-print-summary">
                        <PrintStat
                            label="Total Products"
                            value={number(
                                safeSummary.totalProducts ?? safeProducts.length
                            )}
                        />

                        <PrintStat
                            label="Total Stock Quantity"
                            value={number(
                                safeSummary.totalQuantity ?? totalQuantity
                            )}
                        />

                        <PrintStat
                            label="Stock Cost Value"
                            value={money(
                                safeSummary.totalCostValue ?? totalCostValue
                            )}
                        />

                        <PrintStat
                            label="Stock Selling Value"
                            value={money(
                                safeSummary.totalSellingValue ?? totalSellingValue
                            )}
                        />

                        <PrintStat
                            label="Expected Profit"
                            value={money(
                                safeSummary.expectedProfit ?? totalExpectedProfit
                            )}
                            tone="green"
                        />

                        <PrintStat
                            label="Expected Margin"
                            value={`${number(safeSummary.profitMargin)}%`}
                        />

                        <PrintStat
                            label="Low Stock Products"
                            value={number(
                                safeSummary.lowStock ?? safeLowStock.length
                            )}
                            tone="warning"
                        />

                        <PrintStat
                            label="Out of Stock Products"
                            value={number(
                                safeSummary.outOfStock ?? safeOutOfStock.length
                            )}
                            tone="red"
                        />
                    </div>
                </section>

                {/* STOCK MOVEMENT SUMMARY */}
                <section className="stock-print-section">
                    <h2>Stock Movement Summary</h2>

                    <div className="stock-print-summary stock-print-summary-four">
                        <PrintStat
                            label="Total Stock In"
                            value={`+${number(totalStockIn)}`}
                            tone="green"
                        />

                        <PrintStat
                            label="Total Stock Out"
                            value={`-${number(totalStockOut)}`}
                            tone="red"
                        />

                        <PrintStat
                            label="Low Stock Alerts"
                            value={safeLowStock.length}
                            tone="warning"
                        />

                        <PrintStat
                            label="Out of Stock Alerts"
                            value={safeOutOfStock.length}
                            tone="red"
                        />
                    </div>
                </section>

                {/* LOW STOCK */}
                <section className="stock-print-section">
                    <h2>Low Stock Alert</h2>

                    <table className="stock-print-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>SKU</th>
                                <th>Category</th>
                                <th className="numeric">Current Qty</th>
                                <th className="numeric">Stock Limit</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {safeLowStock.length > 0 ? (
                                safeLowStock.map((product, index) => (
                                    <tr key={product.id}>
                                        <td>{index + 1}</td>
                                        <td>{product.name || "-"}</td>
                                        <td>{product.sku || "-"}</td>
                                        <td>{product.category || "-"}</td>
                                        <td className="numeric">
                                            {number(product.quantity)}
                                        </td>
                                        <td className="numeric">
                                            {number(product.lowStockLimit)}
                                        </td>
                                        <td className="stock-print-warning">
                                            Low Stock
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="stock-print-empty">
                                        No low-stock products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>

                {/* OUT OF STOCK */}
                <section className="stock-print-section">
                    <h2>Out of Stock Products</h2>

                    <table className="stock-print-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>SKU</th>
                                <th>Category</th>
                                <th className="numeric">Cost Price</th>
                                <th className="numeric">Selling Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {safeOutOfStock.length > 0 ? (
                                safeOutOfStock.map((product, index) => (
                                    <tr key={product.id}>
                                        <td>{index + 1}</td>
                                        <td>{product.name || "-"}</td>
                                        <td>{product.sku || "-"}</td>
                                        <td>{product.category || "-"}</td>
                                        <td className="numeric">
                                            {money(product.costPrice)}
                                        </td>
                                        <td className="numeric">
                                            {money(product.sellingPrice)}
                                        </td>
                                        <td className="stock-print-danger">
                                            Out of Stock
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="stock-print-empty">
                                        No out-of-stock products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>

                {/* CURRENT INVENTORY */}
                <section className="stock-print-section">
                    <h2>Current Inventory Valuation</h2>

                    <table className="stock-print-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>SKU</th>
                                <th>Category</th>
                                <th className="numeric">Qty</th>
                                <th className="numeric">Cost Price</th>
                                <th className="numeric">Selling Price</th>
                                <th className="numeric">Cost Value</th>
                                <th className="numeric">Expected Profit</th>
                                <th className="numeric">Margin</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {safeProducts.length > 0 ? (
                                safeProducts.map((product, index) => (
                                    <tr key={product.id}>
                                        <td>{index + 1}</td>
                                        <td>{product.name || "-"}</td>
                                        <td>{product.sku || "-"}</td>
                                        <td>{product.category || "-"}</td>
                                        <td className="numeric">
                                            {number(product.quantity)}
                                        </td>
                                        <td className="numeric">
                                            {money(product.costPrice)}
                                        </td>
                                        <td className="numeric">
                                            {money(product.sellingPrice)}
                                        </td>
                                        <td className="numeric">
                                            {money(product.costValue)}
                                        </td>
                                        <td
                                            className={`numeric ${
                                                Number(product.expectedProfit) >= 0
                                                    ? "positive"
                                                    : "negative"
                                            }`}
                                        >
                                            {money(product.expectedProfit)}
                                        </td>
                                        <td
                                            className={`numeric ${
                                                Number(product.margin) >= 0
                                                    ? "positive"
                                                    : "negative"
                                            }`}
                                        >
                                            {number(product.margin)}%
                                        </td>
                                        <td>{statusLabel(product.status)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="11" className="stock-print-empty">
                                        No products found for this branch.
                                    </td>
                                </tr>
                            )}
                        </tbody>

                        {safeProducts.length > 0 && (
                            <tfoot>
                                <tr>
                                    <td colSpan="4">TOTAL</td>

                                    <td className="numeric">
                                        {number(totalQuantity)}
                                    </td>

                                    <td colSpan="2"></td>

                                    <td className="numeric">
                                        {money(totalCostValue)}
                                    </td>

                                    <td className="numeric">
                                        {money(totalExpectedProfit)}
                                    </td>

                                    <td colSpan="2"></td>
                                </tr>
                            </tfoot>
                        )}
                    </table>
                </section>

                {/* STOCK MOVEMENTS */}
                <section className="stock-print-section">
                    <h2>Recent Stock Movements</h2>

                    <table className="stock-print-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date & Time</th>
                                <th>Product</th>
                                <th>SKU</th>
                                <th>Movement Type</th>
                                <th className="numeric">Quantity</th>
                                <th>Reference</th>
                                <th>User</th>
                            </tr>
                        </thead>

                        <tbody>
                            {safeMovements.length > 0 ? (
                                safeMovements.map((movement, index) => (
                                    <tr key={movement.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {movement.date || "-"}
                                            {movement.time
                                                ? ` ${movement.time}`
                                                : ""}
                                        </td>
                                        <td>{movement.product || "-"}</td>
                                        <td>{movement.sku || "-"}</td>
                                        <td
                                            className={
                                                isStockIn(movement.type)
                                                    ? "positive"
                                                    : "negative"
                                            }
                                        >
                                            {isStockIn(movement.type)
                                                ? "Stock In"
                                                : "Stock Out"}
                                        </td>
                                        <td className="numeric">
                                            {number(movement.quantity)}
                                        </td>
                                        <td>{movement.reference || "-"}</td>
                                        <td>{movement.user || "-"}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="stock-print-empty">
                                        No stock movements found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>

                {/* REPORT FOOTER */}
                <footer className="stock-print-footer">
                    <span>
                        MauzoVibe — Inventory Management & Reporting
                    </span>

                    <strong>Powered by NAC Technologies</strong>

                    <span>Computer-generated report</span>
                </footer>
            </div>

            {/* =====================================================
                ORIGINAL SCREEN DASHBOARD
            ====================================================== */}

            <div className="min-h-screen bg-gray-50 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">

                {/* HEADER */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                            Stock Report
                        </h1>

                        <p className="mt-1 max-w-2xl text-xs text-gray-500 sm:text-sm">
                            Analyse your inventory, stock value and stock
                            movements.
                        </p>
                    </div>

                    <button
                        onClick={printReport}
                        type="button"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 sm:w-auto"
                    >
                        <PrinterIcon className="h-5 w-5" />
                        Print Report
                    </button>
                </div>

                {/* SUMMARY CARDS */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                                <p className="text-xs font-medium text-gray-500 sm:text-sm">
                                    Total Products
                                </p>

                                <p className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                                    {number(safeSummary.totalProducts)}
                                </p>

                                <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
                                    Products in this branch
                                </p>
                            </div>

                            <div className="shrink-0 rounded-lg bg-green-100 p-2.5 sm:p-3">
                                <CubeIcon className="h-5 w-5 text-green-600 sm:h-6 sm:w-6" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                                <p className="text-xs font-medium text-gray-500 sm:text-sm">
                                    Stock Quantity
                                </p>

                                <p className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                                    {number(safeSummary.totalQuantity)}
                                </p>

                                <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
                                    Total units available
                                </p>
                            </div>

                            <div className="shrink-0 rounded-lg bg-blue-100 p-2.5 sm:p-3">
                                <ArchiveBoxIcon className="h-5 w-5 text-blue-600 sm:h-6 sm:w-6" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                                <p className="text-xs font-medium text-gray-500 sm:text-sm">
                                    Stock Cost Value
                                </p>

                                <p className="mt-1 break-words text-lg font-bold text-gray-900 sm:text-xl">
                                    {money(safeSummary.totalCostValue)}
                                </p>

                                <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
                                    Current inventory cost
                                </p>
                            </div>

                            <div className="shrink-0 rounded-lg bg-orange-100 p-2.5 sm:p-3">
                                <CurrencyDollarIcon className="h-5 w-5 text-orange-600 sm:h-6 sm:w-6" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                                <p className="text-xs font-medium text-gray-500 sm:text-sm">
                                    Stock Selling Value
                                </p>

                                <p className="mt-1 break-words text-lg font-bold text-gray-900 sm:text-xl">
                                    {money(safeSummary.totalSellingValue)}
                                </p>

                                <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
                                    Potential sales value
                                </p>
                            </div>

                            <div className="shrink-0 rounded-lg bg-purple-100 p-2.5 sm:p-3">
                                <ArrowTrendingUpIcon className="h-5 w-5 text-purple-600 sm:h-6 sm:w-6" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* PROFIT + ALERTS */}
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

                    <div className="rounded-xl border border-green-200 bg-green-50 p-4 sm:p-5">
                        <p className="text-xs font-medium text-green-700 sm:text-sm">
                            Expected Profit
                        </p>

                        <p className="mt-1 break-words text-xl font-bold text-green-800 sm:text-2xl">
                            {money(safeSummary.expectedProfit)}
                        </p>

                        <p className="mt-1 text-[11px] text-green-700 sm:text-xs">
                            If current stock sells at selling price
                        </p>
                    </div>

                    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 sm:p-5">
                        <p className="text-xs font-medium text-blue-700 sm:text-sm">
                            Expected Margin
                        </p>

                        <p className="mt-1 text-xl font-bold text-blue-800 sm:text-2xl">
                            {number(safeSummary.profitMargin)}%
                        </p>

                        <p className="mt-1 text-[11px] text-blue-700 sm:text-xs">
                            Expected gross margin
                        </p>
                    </div>

                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
                        <div className="flex items-center gap-3">
                            <ExclamationTriangleIcon className="h-6 w-6 shrink-0 text-amber-600" />

                            <div>
                                <p className="text-xs font-medium text-amber-700 sm:text-sm">
                                    Low Stock
                                </p>

                                <p className="text-xl font-bold text-amber-800 sm:text-2xl">
                                    {number(safeSummary.lowStock)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 sm:p-5">
                        <div className="flex items-center gap-3">
                            <XCircleIcon className="h-6 w-6 shrink-0 text-red-600" />

                            <div>
                                <p className="text-xs font-medium text-red-700 sm:text-sm">
                                    Out of Stock
                                </p>

                                <p className="text-xl font-bold text-red-800 sm:text-2xl">
                                    {number(safeSummary.outOfStock)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* STOCK MOVEMENT SUMMARY */}
                <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                                Stock Movement
                            </h2>

                            <p className="text-xs text-gray-500 sm:text-sm">
                                Recent stock movement summary.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
                            <div className="rounded-lg bg-green-50 px-3 py-2.5 sm:px-4 sm:py-3">
                                <p className="text-[11px] text-green-600 sm:text-xs">
                                    Stock In
                                </p>

                                <p className="text-sm font-bold text-green-700 sm:text-base">
                                    +{number(safeSummary.stockIn)}
                                </p>
                            </div>

                            <div className="rounded-lg bg-red-50 px-3 py-2.5 sm:px-4 sm:py-3">
                                <p className="text-[11px] text-red-600 sm:text-xs">
                                    Stock Out
                                </p>

                                <p className="text-sm font-bold text-red-700 sm:text-base">
                                    -{number(safeSummary.stockOut)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* LOW STOCK */}
                {safeLowStock.length > 0 && (
                    <section className="mt-5 overflow-hidden rounded-xl border border-amber-200 bg-white shadow-sm">
                        <div className="border-b border-amber-100 bg-amber-50 px-4 py-4 sm:px-5">
                            <div className="flex items-start gap-3">
                                <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 sm:h-6 sm:w-6" />

                                <div>
                                    <h2 className="text-sm font-bold text-gray-900 sm:text-base">
                                        Low Stock Alert
                                    </h2>

                                    <p className="mt-0.5 text-xs text-gray-600 sm:text-sm">
                                        {safeLowStock.length} products are
                                        approaching their stock limit.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="hidden overflow-x-auto md:block">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-500">Product</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-500">SKU</th>
                                        <th className="px-5 py-3 text-right text-xs font-semibold uppercase text-gray-500">Current Qty</th>
                                        <th className="px-5 py-3 text-right text-xs font-semibold uppercase text-gray-500">Limit</th>
                                        <th className="px-5 py-3 text-right text-xs font-semibold uppercase text-gray-500">Status</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {safeLowStock.map((product) => (
                                        <tr key={product.id}>
                                            <td className="px-5 py-4">
                                                <p className="font-semibold text-gray-900">{product.name}</p>
                                                <p className="text-xs text-gray-500">{product.category || "-"}</p>
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">{product.sku || "-"}</td>

                                            <td className="px-5 py-4 text-right font-semibold text-amber-700">
                                                {number(product.quantity)}
                                            </td>

                                            <td className="px-5 py-4 text-right text-sm text-gray-600">
                                                {number(product.lowStockLimit)}
                                            </td>

                                            <td className="px-5 py-4 text-right">
                                                {statusBadge(product.status)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="divide-y divide-gray-100 md:hidden">
                            {safeLowStock.map((product) => (
                                <div key={product.id} className="p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="truncate font-semibold text-gray-900">{product.name}</p>
                                            <p className="mt-0.5 text-xs text-gray-500">{product.category || "-"}</p>
                                            <p className="mt-1 text-xs text-gray-500">SKU: {product.sku || "-"}</p>
                                        </div>

                                        {statusBadge(product.status)}
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        <div className="rounded-lg bg-amber-50 p-3">
                                            <p className="text-[11px] text-gray-500">Current Quantity</p>
                                            <p className="mt-1 font-bold text-amber-700">{number(product.quantity)}</p>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-[11px] text-gray-500">Stock Limit</p>
                                            <p className="mt-1 font-bold text-gray-900">{number(product.lowStockLimit)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* OUT OF STOCK */}
                {safeOutOfStock.length > 0 && (
                    <section className="mt-5 overflow-hidden rounded-xl border border-red-200 bg-white shadow-sm">
                        <div className="border-b border-red-100 bg-red-50 px-4 py-4 sm:px-5">
                            <div className="flex items-start gap-3">
                                <XCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-red-600 sm:h-6 sm:w-6" />

                                <div>
                                    <h2 className="text-sm font-bold text-gray-900 sm:text-base">
                                        Out of Stock
                                    </h2>

                                    <p className="mt-0.5 text-xs text-gray-600 sm:text-sm">
                                        These products currently have no available stock.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="hidden overflow-x-auto md:block">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-500">Product</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-500">SKU</th>
                                        <th className="px-5 py-3 text-right text-xs font-semibold uppercase text-gray-500">Cost Price</th>
                                        <th className="px-5 py-3 text-right text-xs font-semibold uppercase text-gray-500">Selling Price</th>
                                        <th className="px-5 py-3 text-right text-xs font-semibold uppercase text-gray-500">Status</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {safeOutOfStock.map((product) => (
                                        <tr key={product.id}>
                                            <td className="px-5 py-4">
                                                <p className="font-semibold text-gray-900">{product.name}</p>
                                                <p className="text-xs text-gray-500">{product.category || "-"}</p>
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">{product.sku || "-"}</td>

                                            <td className="px-5 py-4 text-right text-sm text-gray-600">{money(product.costPrice)}</td>

                                            <td className="px-5 py-4 text-right text-sm text-gray-600">{money(product.sellingPrice)}</td>

                                            <td className="px-5 py-4 text-right">{statusBadge(product.status)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="divide-y divide-gray-100 md:hidden">
                            {safeOutOfStock.map((product) => (
                                <div key={product.id} className="p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="truncate font-semibold text-gray-900">{product.name}</p>
                                            <p className="mt-0.5 text-xs text-gray-500">{product.category || "-"}</p>
                                            <p className="mt-1 text-xs text-gray-500">SKU: {product.sku || "-"}</p>
                                        </div>

                                        {statusBadge(product.status)}
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-[11px] text-gray-500">Cost Price</p>
                                            <p className="mt-1 text-sm font-semibold text-gray-900">{money(product.costPrice)}</p>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-[11px] text-gray-500">Selling Price</p>
                                            <p className="mt-1 text-sm font-semibold text-gray-900">{money(product.sellingPrice)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* CURRENT INVENTORY */}
                <section className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-4 py-4 sm:px-5 sm:py-5">
                        <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                            Current Inventory
                        </h2>

                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                            Current stock position and estimated inventory value.
                        </p>
                    </div>

                    <div className="hidden overflow-x-auto lg:block">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-500">Product</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-500">Category</th>
                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase text-gray-500">Qty</th>
                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase text-gray-500">Cost</th>
                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase text-gray-500">Selling</th>
                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase text-gray-500">Cost Value</th>
                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase text-gray-500">Expected Profit</th>
                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase text-gray-500">Margin</th>
                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase text-gray-500">Status</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {safeProducts.length > 0 ? (
                                    safeProducts.map((product) => (
                                        <tr key={product.id} className="transition hover:bg-gray-50">
                                            <td className="px-5 py-4">
                                                <p className="font-semibold text-gray-900">{product.name}</p>
                                                <p className="text-xs text-gray-500">SKU: {product.sku || "-"}</p>
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">{product.category || "-"}</td>

                                            <td className="px-5 py-4 text-right font-semibold text-gray-900">{number(product.quantity)}</td>

                                            <td className="px-5 py-4 text-right text-sm text-gray-600">{money(product.costPrice)}</td>

                                            <td className="px-5 py-4 text-right text-sm text-gray-600">{money(product.sellingPrice)}</td>

                                            <td className="px-5 py-4 text-right font-semibold text-gray-900">{money(product.costValue)}</td>

                                            <td className={`px-5 py-4 text-right font-semibold ${
                                                Number(product.expectedProfit) >= 0
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}>
                                                {money(product.expectedProfit)}
                                            </td>

                                            <td className={`px-5 py-4 text-right font-semibold ${
                                                Number(product.margin) >= 0
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}>
                                                {number(product.margin)}%
                                            </td>

                                            <td className="px-5 py-4 text-right">
                                                {statusBadge(product.status)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="px-5 py-10 text-center text-sm text-gray-500">
                                            No products found for this branch.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="divide-y divide-gray-100 lg:hidden">
                        {safeProducts.length > 0 ? (
                            safeProducts.map((product) => (
                                <div key={product.id} className="p-4 sm:p-5">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="truncate font-semibold text-gray-900">{product.name}</p>
                                            <p className="mt-0.5 text-xs text-gray-500">SKU: {product.sku || "-"}</p>
                                            <p className="mt-0.5 text-xs text-gray-500">{product.category || "-"}</p>
                                        </div>

                                        <div className="shrink-0">
                                            {statusBadge(product.status)}
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-[11px] text-gray-500">Quantity</p>
                                            <p className="mt-1 font-bold text-gray-900">{number(product.quantity)}</p>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-[11px] text-gray-500">Cost</p>
                                            <p className="mt-1 text-sm font-semibold text-gray-900">{money(product.costPrice)}</p>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-[11px] text-gray-500">Selling</p>
                                            <p className="mt-1 text-sm font-semibold text-gray-900">{money(product.sellingPrice)}</p>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-[11px] text-gray-500">Cost Value</p>
                                            <p className="mt-1 text-sm font-semibold text-gray-900">{money(product.costValue)}</p>
                                        </div>
                                    </div>

                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                        <div className={`rounded-lg p-3 ${
                                            Number(product.expectedProfit) >= 0
                                                ? "bg-green-50"
                                                : "bg-red-50"
                                        }`}>
                                            <p className="text-[11px] text-gray-500">Expected Profit</p>
                                            <p className={`mt-1 text-sm font-bold ${
                                                Number(product.expectedProfit) >= 0
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}>
                                                {money(product.expectedProfit)}
                                            </p>
                                        </div>

                                        <div className={`rounded-lg p-3 ${
                                            Number(product.margin) >= 0
                                                ? "bg-green-50"
                                                : "bg-red-50"
                                        }`}>
                                            <p className="text-[11px] text-gray-500">Margin</p>
                                            <p className={`mt-1 text-sm font-bold ${
                                                Number(product.margin) >= 0
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}>
                                                {number(product.margin)}%
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-5 py-10 text-center text-sm text-gray-500">
                                No products found for this branch.
                            </div>
                        )}
                    </div>
                </section>

                {/* STOCK MOVEMENTS */}
                <section className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-4 py-4 sm:px-5 sm:py-5">
                        <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                            Recent Stock Movements
                        </h2>

                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                            Latest stock-in and stock-out activities.
                        </p>
                    </div>

                    <div className="hidden overflow-x-auto md:block">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-500">Date</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-500">Product</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-500">Type</th>
                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase text-gray-500">Quantity</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-500">Reference</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-500">User</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {safeMovements.length > 0 ? (
                                    safeMovements.map((movement) => (
                                        <tr key={movement.id} className="hover:bg-gray-50">
                                            <td className="px-5 py-4">
                                                <p className="text-sm font-medium text-gray-900">{movement.date}</p>
                                                <p className="text-xs text-gray-500">{movement.time}</p>
                                            </td>

                                            <td className="px-5 py-4">
                                                <p className="font-semibold text-gray-900">{movement.product}</p>
                                                <p className="text-xs text-gray-500">{movement.sku || "-"}</p>
                                            </td>

                                            <td className="px-5 py-4">{movementBadge(movement.type)}</td>

                                            <td className="px-5 py-4 text-right font-semibold text-gray-900">{number(movement.quantity)}</td>

                                            <td className="px-5 py-4 text-sm text-gray-600">{movement.reference || "-"}</td>

                                            <td className="px-5 py-4 text-sm text-gray-600">{movement.user || "-"}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-5 py-10 text-center text-sm text-gray-500">
                                            No stock movements found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="divide-y divide-gray-100 md:hidden">
                        {safeMovements.length > 0 ? (
                            safeMovements.map((movement) => (
                                <div key={movement.id} className="p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="truncate font-semibold text-gray-900">{movement.product}</p>
                                            <p className="mt-0.5 text-xs text-gray-500">{movement.sku || "-"}</p>
                                        </div>

                                        {movementBadge(movement.type)}
                                    </div>

                                    <div className="mt-3 grid grid-cols-2 gap-2">
                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-[11px] text-gray-500">Date</p>
                                            <p className="mt-1 text-sm font-semibold text-gray-900">{movement.date}</p>
                                            <p className="text-xs text-gray-500">{movement.time}</p>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-[11px] text-gray-500">Quantity</p>
                                            <p className="mt-1 font-bold text-gray-900">{number(movement.quantity)}</p>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-[11px] text-gray-500">Reference</p>
                                            <p className="mt-1 truncate text-sm font-medium text-gray-900">{movement.reference || "-"}</p>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-[11px] text-gray-500">User</p>
                                            <p className="mt-1 truncate text-sm font-medium text-gray-900">{movement.user || "-"}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-5 py-10 text-center text-sm text-gray-500">
                                No stock movements found.
                            </div>
                        )}
                    </div>
                </section>

                {/* SCREEN FOOTER */}
                <div className="mt-8 border-t border-gray-200 pt-5 pb-4 text-center text-[11px] text-gray-500 sm:text-xs">
                    © {new Date().getFullYear()} MauzoVibe. All rights reserved.
                </div>
            </div>
        </AdminLayout>
    );
}
