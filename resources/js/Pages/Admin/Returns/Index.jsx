import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import "./returns.css";

export default function Index({
    returns,
    summary,
    filters = {},
}) {
    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    */

    const formatMoney = (amount) => {
        return new Intl.NumberFormat("en-TZ", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(Number(amount) || 0);
    };

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatMethod = (method) => {
        if (!method) return "-";

        const labels = {
            cash: "Cash",
            mobile_money: "Mobile Money",
            bank: "Bank",
            credit: "Credit",
        };

        return (
            labels[method] ||
            method
                .replace(/_/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())
        );
    };

    const formatStatus = (status) => {
        if (!status) return "-";

        return status
            .replace(/_/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */

    const [search, setSearch] = useState(filters.search || "");
    const [refundMethod, setRefundMethod] = useState(
        filters.refund_method || ""
    );
    const [status, setStatus] = useState(filters.status || "");
    const [dateFrom, setDateFrom] = useState(filters.date_from || "");
    const [dateTo, setDateTo] = useState(filters.date_to || "");

    const returnData = returns?.data || [];

    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */

    const applyFilters = () => {
        router.get(
            route("admin.returns.index"),
            {
                search: search || undefined,
                refund_method: refundMethod || undefined,
                status: status || undefined,
                date_from: dateFrom || undefined,
                date_to: dateTo || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const clearFilters = () => {
        setSearch("");
        setRefundMethod("");
        setStatus("");
        setDateFrom("");
        setDateTo("");

        router.get(
            route("admin.returns.index"),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handleSearchKeyDown = (event) => {
        if (event.key === "Enter") {
            applyFilters();
        }
    };

    const hasFilters =
        search ||
        refundMethod ||
        status ||
        dateFrom ||
        dateTo;

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <AdminLayout>
            <Head title="Sales Returns" />

            <div className="returns-page">
                <div className="returns-container">

                    {/* =====================================================
                        HEADER
                    ===================================================== */}

                    <div className="returns-header">

                        <div>
                            <div className="returns-breadcrumb">
                                <span>Sales</span>
                                <span>/</span>
                                <span>Returns</span>
                            </div>

                            <h1 className="returns-title">
                                Returns
                            </h1>

                            <p className="returns-subtitle">
                                View and manage completed product returns.
                            </p>
                        </div>

                        {/* IMPORTANT:
                            Do NOT use admin.returns.create here.
                            That route requires a sale ID.
                        */}

                        <Link
                            href={route("admin.sales.index")}
                            className="returns-process-button"
                        >
                            <span>↩</span>
                            Process Return
                        </Link>
                    </div>

                    {/* =====================================================
                        SUMMARY
                    ===================================================== */}

                    <div className="returns-summary">

                        <div className="returns-summary-card">
                            <div className="returns-summary-top">
                                <span className="returns-summary-label">
                                    TOTAL RETURNS
                                </span>

                                <span className="returns-summary-icon">
                                    ↩
                                </span>
                            </div>

                            <strong className="returns-summary-value">
                                {summary?.total_returns || 0}
                            </strong>

                            <span className="returns-summary-hint">
                                All processed returns
                            </span>
                        </div>

                        <div className="returns-summary-card">
                            <div className="returns-summary-top">
                                <span className="returns-summary-label">
                                    TODAY
                                </span>

                                <span className="returns-summary-icon">
                                    📅
                                </span>
                            </div>

                            <strong className="returns-summary-value">
                                {summary?.today_returns || 0}
                            </strong>

                            <span className="returns-summary-hint">
                                Returns processed today
                            </span>
                        </div>

                        <div className="returns-summary-card">
                            <div className="returns-summary-top">
                                <span className="returns-summary-label">
                                    TOTAL REFUNDED
                                </span>

                                <span className="returns-summary-icon">
                                    💰
                                </span>
                            </div>

                            <strong className="returns-summary-value">
                                TZS{" "}
                                {formatMoney(
                                    summary?.total_refunded
                                )}
                            </strong>

                            <span className="returns-summary-hint">
                                Completed refunds
                            </span>
                        </div>

                        <div className="returns-summary-card">
                            <div className="returns-summary-top">
                                <span className="returns-summary-label">
                                    ITEMS RETURNED
                                </span>

                                <span className="returns-summary-icon">
                                    📦
                                </span>
                            </div>

                            <strong className="returns-summary-value">
                                {formatMoney(
                                    summary?.items_returned
                                )}
                            </strong>

                            <span className="returns-summary-hint">
                                Total units returned
                            </span>
                        </div>
                    </div>

                    {/* =====================================================
                        MAIN CARD
                    ===================================================== */}

                    <div className="returns-card">

                        {/* =================================================
                            FILTERS
                        ================================================= */}

                        <div className="returns-filter-header">

                            <div className="returns-filters">

                                {/* Search */}

                                <div className="returns-search-wrapper">
                                    <span className="returns-search-icon">
                                        🔍
                                    </span>

                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(event.target.value)
                                        }
                                        onKeyDown={handleSearchKeyDown}
                                        placeholder="Search returns..."
                                        className="returns-input returns-search-input"
                                    />
                                </div>

                                {/* Method */}

                                <select
                                    value={refundMethod}
                                    onChange={(event) =>
                                        setRefundMethod(
                                            event.target.value
                                        )
                                    }
                                    className="returns-select"
                                >
                                    <option value="">
                                        All Methods
                                    </option>

                                    <option value="cash">
                                        Cash
                                    </option>

                                    <option value="mobile_money">
                                        Mobile Money
                                    </option>

                                    <option value="bank">
                                        Bank
                                    </option>

                                    <option value="credit">
                                        Credit
                                    </option>
                                </select>

                                {/* Status */}

                                <select
                                    value={status}
                                    onChange={(event) =>
                                        setStatus(event.target.value)
                                    }
                                    className="returns-select"
                                >
                                    <option value="">
                                        All Status
                                    </option>

                                    <option value="completed">
                                        Completed
                                    </option>

                                    <option value="pending">
                                        Pending
                                    </option>

                                    <option value="cancelled">
                                        Cancelled
                                    </option>
                                </select>

                                {/* From */}

                                <input
                                    type="date"
                                    value={dateFrom}
                                    onChange={(event) =>
                                        setDateFrom(event.target.value)
                                    }
                                    className="returns-input"
                                    title="From date"
                                />

                                {/* To */}

                                <input
                                    type="date"
                                    value={dateTo}
                                    onChange={(event) =>
                                        setDateTo(event.target.value)
                                    }
                                    className="returns-input"
                                    title="To date"
                                />

                                {/* Filter */}

                                <button
                                    type="button"
                                    onClick={applyFilters}
                                    className="returns-filter-button"
                                >
                                    Filter
                                </button>

                                {/* Clear */}

                                {hasFilters && (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="returns-clear-button"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* =================================================
                            DESKTOP TABLE
                        ================================================= */}

                        {returnData.length > 0 ? (
                            <>
                                <div className="returns-table-wrapper">

                                    <table className="returns-table">

                                        <thead>
                                            <tr>
                                                <th>Return #</th>
                                                <th>Invoice</th>
                                                <th>Date</th>
                                                <th>Items</th>
                                                <th>Refund</th>
                                                <th>Method</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {returnData.map((item) => (
                                                <tr key={item.id}>

                                                    {/* Return Number */}

                                                    <td>
                                                        <span className="returns-number">
                                                            {item.return_number}
                                                        </span>
                                                    </td>

                                                    {/* Invoice */}

                                                    <td>
                                                        <Link
                                                            href={route(
                                                                "admin.sales.show",
                                                                item.sale_id
                                                            )}
                                                            className="returns-invoice"
                                                        >
                                                            {item.invoice_number ||
                                                                "-"}
                                                        </Link>
                                                    </td>

                                                    {/* Date */}

                                                    <td>
                                                        <span className="returns-date">
                                                            {formatDate(
                                                                item.created_at
                                                            )}
                                                        </span>
                                                    </td>

                                                    {/* Items */}

                                                    <td>
                                                        <span className="returns-item-count">
                                                            {item.quantity || 0} units
                                                        </span>

                                                        <div className="returns-item-products">
                                                            {item.items_count || 0}{" "}
                                                            product
                                                            {Number(
                                                                item.items_count
                                                            ) === 1
                                                                ? ""
                                                                : "s"}
                                                        </div>
                                                    </td>

                                                    {/* Refund */}

                                                    <td>
                                                        <strong className="returns-refund">
                                                            TZS{" "}
                                                            {formatMoney(
                                                                item.refund_amount
                                                            )}
                                                        </strong>
                                                    </td>

                                                    {/* Method */}

                                                    <td>
                                                        <span className="returns-method-badge">
                                                            {formatMethod(
                                                                item.refund_method
                                                            )}
                                                        </span>
                                                    </td>

                                                    {/* Status */}

                                                    <td>
                                                        <span className="returns-status-badge">
                                                            <span className="returns-status-dot" />
                                                            {formatStatus(
                                                                item.status
                                                            )}
                                                        </span>
                                                    </td>

                                                    {/* Action */}

                                                    <td>
                                                        <div className="returns-actions">

                                                            <Link
                                                                href={route(
                                                                    "admin.returns.show",
                                                                    item.id
                                                                )}
                                                                className="returns-action-button"
                                                            >
                                                                View Return
                                                            </Link>

                                                            <Link
                                                                href={route(
                                                                    "admin.sales.show",
                                                                    item.sale_id
                                                                )}
                                                                className="returns-sale-button"
                                                            >
                                                                Sale
                                                            </Link>

                                                        </div>
                                                    </td>

                                                </tr>
                                            ))}

                                        </tbody>

                                    </table>
                                </div>

                                {/* =================================================
                                    MOBILE LIST
                                ================================================= */}

                                <div className="returns-mobile-list">

                                    {returnData.map((item) => (
                                        <div
                                            key={item.id}
                                            className="returns-mobile-item"
                                        >

                                            <div className="returns-mobile-top">

                                                <div>
                                                    <div className="returns-mobile-number">
                                                        {item.return_number}
                                                    </div>

                                                    <div className="returns-mobile-invoice">
                                                        {item.invoice_number ||
                                                            "-"}
                                                    </div>
                                                </div>

                                                <div className="returns-mobile-amount">
                                                    TZS{" "}
                                                    {formatMoney(
                                                        item.refund_amount
                                                    )}
                                                </div>

                                            </div>

                                            <div className="returns-mobile-grid">

                                                <div>
                                                    <span className="returns-mobile-label">
                                                        DATE
                                                    </span>

                                                    <span className="returns-mobile-value">
                                                        {formatDate(
                                                            item.created_at
                                                        )}
                                                    </span>
                                                </div>

                                                <div>
                                                    <span className="returns-mobile-label">
                                                        ITEMS
                                                    </span>

                                                    <span className="returns-mobile-value">
                                                        {item.quantity || 0} units
                                                    </span>
                                                </div>

                                                <div>
                                                    <span className="returns-mobile-label">
                                                        METHOD
                                                    </span>

                                                    <span className="returns-mobile-value">
                                                        {formatMethod(
                                                            item.refund_method
                                                        )}
                                                    </span>
                                                </div>

                                                <div>
                                                    <span className="returns-mobile-label">
                                                        STATUS
                                                    </span>

                                                    <span className="returns-status-badge">
                                                        <span className="returns-status-dot" />
                                                        {formatStatus(
                                                            item.status
                                                        )}
                                                    </span>
                                                </div>

                                            </div>

                                            <div className="returns-mobile-actions">

                                                <Link
                                                    href={route(
                                                        "admin.returns.show",
                                                        item.id
                                                    )}
                                                    className="returns-action-button"
                                                >
                                                    View Return
                                                </Link>

                                                <Link
                                                    href={route(
                                                        "admin.sales.show",
                                                        item.sale_id
                                                    )}
                                                    className="returns-sale-button"
                                                >
                                                    View Sale
                                                </Link>

                                            </div>

                                        </div>
                                    ))}

                                </div>
                            </>
                        ) : (

                            /* =================================================
                               EMPTY STATE
                            ================================================= */

                            <div className="returns-empty">

                                <div className="returns-empty-icon">
                                    ↩
                                </div>

                                <h2 className="returns-empty-title">
                                    No Returns Found
                                </h2>

                                <p className="returns-empty-text">
                                    There are no sale returns matching
                                    your current search or filters.
                                </p>

                                {hasFilters ? (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="returns-clear-button"
                                    >
                                        Clear Filters
                                    </button>
                                ) : (
                                    <Link
                                        href={route("admin.sales.index")}
                                        className="returns-process-button"
                                    >
                                        View Sales
                                    </Link>
                                )}

                            </div>
                        )}

                        {/* =================================================
                            PAGINATION
                        ================================================= */}

                        {returns?.links &&
                            returns.links.length > 3 && (
                                <div className="returns-pagination">

                                    <div className="returns-pagination-info">
                                        Showing{" "}
                                        <strong>
                                            {returns.from || 0}
                                        </strong>{" "}
                                        to{" "}
                                        <strong>
                                            {returns.to || 0}
                                        </strong>{" "}
                                        of{" "}
                                        <strong>
                                            {returns.total || 0}
                                        </strong>{" "}
                                        returns
                                    </div>

                                    <div className="returns-pagination-buttons">

                                        {returns.links.map(
                                            (link, index) => {

                                                if (!link.url) {
                                                    return (
                                                        <span
                                                            key={index}
                                                            className="returns-pagination-button returns-pagination-disabled"
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    link.label,
                                                            }}
                                                        />
                                                    );
                                                }

                                                return (
                                                    <Link
                                                        key={index}
                                                        href={link.url}
                                                        preserveScroll
                                                        className={`returns-pagination-button ${
                                                            link.active
                                                                ? "returns-pagination-active"
                                                                : ""
                                                        }`}
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                link.label,
                                                        }}
                                                    />
                                                );
                                            }
                                        )}

                                    </div>
                                </div>
                            )}
                    </div>

                    {/* =====================================================
                        FOOTER
                    ===================================================== */}

                    <div className="returns-footer">
                        <strong>MauzoVibe</strong>
                        <span>Smart Sales Management</span>
                        <span>•</span>
                        <span>Sales Returns</span>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}