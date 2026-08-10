import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ sale }) {
    /* =========================================================
       HELPERS
    ========================================================= */

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

    const paymentMethods = {
        cash: {
            icon: "💵",
            label: "Cash",
        },
        mobile_money: {
            icon: "📱",
            label: "Mobile Money",
        },
        bank: {
            icon: "🏦",
            label: "Bank",
        },
        credit: {
            icon: "📒",
            label: "Credit",
        },
    };

    const payment =
        paymentMethods[sale.payment_method] || {
            icon: "💳",
            label: sale.payment_method || "Unknown",
        };

    /* =========================================================
       SALE DATA
    ========================================================= */

    const items = sale.items || [];

    const itemCount = items.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
    );

    const productCount = items.length;

    const isPaid = sale.payment_status === "paid";
    const isCompleted = sale.status === "completed";

    const calculatedSubtotal = items.reduce((total, item) => {
        const quantity = Number(item.quantity || 0);
        const price = Number(item.unit_price || 0);

        return total + quantity * price;
    }, 0);

    const subtotal =
        sale.subtotal !== null &&
        sale.subtotal !== undefined
            ? Number(sale.subtotal)
            : calculatedSubtotal;

    const discount = Number(sale.discount || 0);

    const total =
        sale.total !== null && sale.total !== undefined
            ? Number(sale.total)
            : Math.max(subtotal - discount, 0);

    const paidAmount = Number(sale.paid_amount || 0);

    const changeAmount =
        sale.change_amount !== null &&
        sale.change_amount !== undefined
            ? Number(sale.change_amount)
            : Math.max(paidAmount - total, 0);

    /* =========================================================
       INTERNAL STYLES
    ========================================================= */

    const styles = {
        page: {
            minHeight: "100vh",
            background: "#f8fafc",
            padding: "28px",
            color: "#0f172a",
            boxSizing: "border-box",
            overflowX: "hidden",
        },

        container: {
            width: "100%",
            maxWidth: "1450px",
            margin: "0 auto",
            boxSizing: "border-box",
        },

        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "20px",
            marginBottom: "24px",
        },

        breadcrumb: {
            display: "flex",
            gap: "8px",
            alignItems: "center",
            color: "#94a3b8",
            fontSize: "13px",
            fontWeight: "600",
            marginBottom: "8px",
            flexWrap: "wrap",
        },

        title: {
            margin: 0,
            fontSize: "30px",
            fontWeight: "800",
            letterSpacing: "-0.5px",
        },

        subtitle: {
            margin: "6px 0 0",
            color: "#64748b",
            fontSize: "14px",
        },

        headerActions: {
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
        },

        button: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            minHeight: "42px",
            padding: "0 16px",
            borderRadius: "10px",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "700",
            border: "1px solid transparent",
            cursor: "pointer",
            transition: "all .2s ease",
            boxSizing: "border-box",
        },

        secondaryButton: {
            background: "#ffffff",
            color: "#334155",
            borderColor: "#e2e8f0",
        },

        primaryButton: {
            background: "#2563eb",
            color: "#ffffff",
        },

        successBanner: {
            display: "flex",
            alignItems: "center",
            gap: "14px",
            padding: "17px 20px",
            marginBottom: "24px",
            border: "1px solid #bbf7d0",
            borderRadius: "14px",
            background: "#f0fdf4",
            boxSizing: "border-box",
        },

        successIcon: {
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            background: "#22c55e",
            color: "#ffffff",
            fontSize: "22px",
            fontWeight: "800",
        },

        successTitle: {
            display: "block",
            fontSize: "15px",
            fontWeight: "800",
            color: "#166534",
            marginBottom: "3px",
        },

        successText: {
            color: "#4d7c5b",
            fontSize: "13px",
            lineHeight: "1.5",
        },

        invoiceBadge: {
            fontWeight: "800",
            color: "#166534",
            wordBreak: "break-word",
        },

        grid: {
            display: "grid",
            gridTemplateColumns:
                "minmax(260px, 0.9fr) minmax(360px, 1.25fr) minmax(300px, 1fr)",
            gap: "18px",
            alignItems: "stretch",
        },

        card: {
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
            minWidth: 0,
            boxSizing: "border-box",
        },

        cardHeader: {
            padding: "20px 20px 16px",
            borderBottom: "1px solid #f1f5f9",
        },

        eyebrow: {
            display: "block",
            color: "#94a3b8",
            fontSize: "11px",
            fontWeight: "800",
            letterSpacing: "1px",
            marginBottom: "5px",
        },

        cardTitle: {
            margin: 0,
            fontSize: "18px",
            fontWeight: "800",
            color: "#0f172a",
        },

        cardBody: {
            padding: "18px 20px 20px",
        },

        statusBadge: {
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "7px 11px",
            borderRadius: "999px",
            background: "#ecfdf5",
            color: "#15803d",
            fontSize: "12px",
            fontWeight: "800",
            textTransform: "capitalize",
            marginBottom: "18px",
        },

        detailList: {
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
        },

        detailRow: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "15px",
            padding: "13px 0",
            borderBottom: "1px solid #f1f5f9",
            minWidth: 0,
        },

        detailLabel: {
            color: "#64748b",
            fontSize: "13px",
            flexShrink: 0,
        },

        detailValue: {
            color: "#0f172a",
            fontSize: "13px",
            fontWeight: "700",
            textAlign: "right",
            maxWidth: "65%",
            wordBreak: "break-word",
            overflowWrap: "anywhere",
        },

        invoice: {
            color: "#2563eb",
            fontWeight: "800",
        },

        paid: {
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            color: "#16a34a",
        },

        productsHeader: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "15px",
            minWidth: 0,
        },

        productCount: {
            padding: "6px 9px",
            borderRadius: "8px",
            background: "#f1f5f9",
            color: "#475569",
            fontSize: "11px",
            fontWeight: "800",
            whiteSpace: "nowrap",
            flexShrink: 0,
        },

        productsList: {
            padding: "8px 20px 20px",
            minWidth: 0,
        },

        product: {
            display: "grid",
            gridTemplateColumns: "52px minmax(0, 1fr) auto",
            gap: "12px",
            alignItems: "center",
            padding: "13px 0",
            borderBottom: "1px solid #f1f5f9",
            minWidth: 0,
        },

        productImage: {
            width: "52px",
            height: "52px",
            borderRadius: "10px",
            overflow: "hidden",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
            flexShrink: 0,
        },

        productImageImg: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
        },

        productName: {
            display: "block",
            fontSize: "14px",
            fontWeight: "800",
            color: "#0f172a",
            marginBottom: "3px",
            overflowWrap: "anywhere",
        },

        productSku: {
            display: "block",
            color: "#94a3b8",
            fontSize: "11px",
            marginBottom: "5px",
            overflowWrap: "anywhere",
        },

        productQuantity: {
            color: "#64748b",
            fontSize: "12px",
        },

        productTotal: {
            textAlign: "right",
            flexShrink: 0,
        },

        productTotalLabel: {
            display: "block",
            color: "#94a3b8",
            fontSize: "9px",
            fontWeight: "800",
            letterSpacing: ".6px",
            marginBottom: "3px",
        },

        productTotalValue: {
            display: "block",
            color: "#0f172a",
            fontSize: "13px",
            fontWeight: "800",
            whiteSpace: "nowrap",
        },

        paymentMethod: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "14px",
            marginBottom: "18px",
            borderRadius: "12px",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            minWidth: 0,
        },

        paymentIcon: {
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            fontSize: "20px",
            flexShrink: 0,
        },

        paymentLabel: {
            display: "block",
            color: "#94a3b8",
            fontSize: "11px",
            marginBottom: "3px",
        },

        paymentName: {
            display: "block",
            color: "#0f172a",
            fontSize: "14px",
            fontWeight: "800",
        },

        paymentLines: {
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
        },

        paymentRow: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            padding: "10px 0",
            minWidth: 0,
        },

        paymentLabelText: {
            color: "#64748b",
            fontSize: "13px",
        },

        paymentValue: {
            color: "#0f172a",
            fontSize: "13px",
            fontWeight: "700",
            textAlign: "right",
            whiteSpace: "nowrap",
        },

        discount: {
            color: "#dc2626",
        },

        divider: {
            height: "1px",
            background: "#e2e8f0",
            margin: "5px 0",
        },

        totalRow: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            padding: "14px 0",
        },

        totalLabel: {
            color: "#0f172a",
            fontSize: "14px",
            fontWeight: "800",
        },

        totalValue: {
            color: "#2563eb",
            fontSize: "20px",
            fontWeight: "900",
            whiteSpace: "nowrap",
        },

        changeValue: {
            color: "#16a34a",
            fontWeight: "800",
        },

        paymentSuccess: {
            display: "flex",
            alignItems: "center",
            gap: "11px",
            padding: "13px",
            marginTop: "14px",
            borderRadius: "11px",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            minWidth: 0,
        },

        paymentSuccessIcon: {
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#22c55e",
            color: "#fff",
            fontWeight: "900",
            flexShrink: 0,
        },

        paymentSuccessTitle: {
            display: "block",
            color: "#166534",
            fontSize: "11px",
            fontWeight: "900",
            letterSpacing: ".4px",
        },

        paymentSuccessText: {
            display: "block",
            color: "#4d7c5b",
            fontSize: "10px",
            marginTop: "2px",
        },

        grandTotal: {
            marginTop: "20px",
            padding: "28px 20px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
            boxSizing: "border-box",
        },

        grandTotalLabel: {
            display: "block",
            color: "#94a3b8",
            fontSize: "11px",
            fontWeight: "900",
            letterSpacing: "1.5px",
            marginBottom: "7px",
        },

        grandTotalAmount: {
            display: "block",
            color: "#0f172a",
            fontSize: "30px",
            fontWeight: "900",
            letterSpacing: "-.5px",
        },

        grandSuccess: {
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            marginTop: "10px",
            color: "#16a34a",
            fontSize: "12px",
            fontWeight: "800",
        },

        actions: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "18px",
        },

        printButton: {
            minHeight: "44px",
            padding: "0 18px",
            borderRadius: "10px",
            border: "1px solid #2563eb",
            background: "#2563eb",
            color: "#ffffff",
            fontWeight: "800",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            boxSizing: "border-box",
        },

        historyButton: {
            minHeight: "44px",
            padding: "0 18px",
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
            background: "#ffffff",
            color: "#334155",
            textDecoration: "none",
            fontWeight: "800",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            boxSizing: "border-box",
        },

        newSaleButton: {
            minHeight: "44px",
            padding: "0 18px",
            borderRadius: "10px",
            border: "1px solid #16a34a",
            background: "#16a34a",
            color: "#ffffff",
            textDecoration: "none",
            fontWeight: "800",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            boxSizing: "border-box",
        },

        footer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
            marginTop: "28px",
            paddingTop: "20px",
            borderTop: "1px solid #e2e8f0",
            color: "#94a3b8",
            fontSize: "11px",
            textAlign: "center",
        },

        footerBrand: {
            color: "#64748b",
            fontWeight: "800",
        },
    };

    return (
        <AdminLayout>
            <Head title={`Sale ${sale.invoice_number}`} />

            <div
                style={styles.page}
                className="sale-details-page"
            >
                <div style={styles.container}>

                    {/* =====================================================
                        HEADER
                    ===================================================== */}

                    <div
                        style={styles.header}
                        className="sale-details-header"
                    >
                        <div className="sale-details-header-info">
                            <div style={styles.breadcrumb}>
                                <span>Sales</span>
                                <span>/</span>
                                <span>Transactions</span>
                                <span>/</span>
                                <span>
                                    {sale.invoice_number}
                                </span>
                            </div>

                            <h1 style={styles.title}>
                                Sale Details
                            </h1>

                            <p style={styles.subtitle}>
                                Review transaction information
                            </p>
                        </div>

                        <div
                            style={styles.headerActions}
                            className="sale-details-header-actions"
                        >

                            {/* Kama Mteja amerudisha bidhaa  */}
                            <Link
                             style={{
                                    ...styles.button,
                                    ...styles.secondaryButton,
                                }}
                                href={route("admin.sales.return.create", sale.id)}
                            >
                                ↩ Process Return
                            </Link>

                            <Link
                                href={route("admin.sales.index")}
                                style={{
                                    ...styles.button,
                                    ...styles.secondaryButton,
                                }}
                            >
                                ← History
                            </Link>

                            <Link
                                href={route("admin.sales.create")}
                                style={{
                                    ...styles.button,
                                    ...styles.primaryButton,
                                }}
                            >
                                + New Sale
                            </Link>
                        </div>
                    </div>


                    {/* =====================================================
                        SUCCESS BANNER
                    ===================================================== */}

                    {isCompleted && (
                        <div style={styles.successBanner}>
                            <div style={styles.successIcon}>
                                ✓
                            </div>

                            <div style={{ minWidth: 0 }}>
                                <span style={styles.successTitle}>
                                    Sale completed successfully
                                </span>

                                <span style={styles.successText}>
                                    Transaction{" "}
                                    <span style={styles.invoiceBadge}>
                                        {sale.invoice_number}
                                    </span>{" "}
                                    was recorded successfully.
                                </span>
                            </div>
                        </div>
                    )}


                    {/* =====================================================
                        MAIN CONTENT
                    ===================================================== */}

                    <div
                        style={styles.grid}
                        className="sale-details-responsive-grid"
                    >

                        {/* =================================================
                            TRANSACTION
                        ================================================= */}

                        <div style={styles.card}>
                            <div style={styles.cardHeader}>
                                <span style={styles.eyebrow}>
                                    TRANSACTION
                                </span>

                                <h2 style={styles.cardTitle}>
                                    Sale Information
                                </h2>
                            </div>

                            <div style={styles.cardBody}>

                                <div style={styles.statusBadge}>
                                    <span>✓</span>
                                    {sale.status || "Completed"}
                                </div>

                                <div style={styles.detailList}>

                                    <div style={styles.detailRow}>
                                        <span style={styles.detailLabel}>
                                            Invoice
                                        </span>

                                        <strong
                                            style={{
                                                ...styles.detailValue,
                                                ...styles.invoice,
                                            }}
                                        >
                                            {sale.invoice_number}
                                        </strong>
                                    </div>

                                    <div style={styles.detailRow}>
                                        <span style={styles.detailLabel}>
                                            Date & Time
                                        </span>

                                        <strong
                                            style={styles.detailValue}
                                        >
                                            {formatDate(
                                                sale.created_at
                                            )}
                                        </strong>
                                    </div>

                                    <div style={styles.detailRow}>
                                        <span style={styles.detailLabel}>
                                            Cashier
                                        </span>

                                        <strong
                                            style={styles.detailValue}
                                        >
                                            👤{" "}
                                            {sale.user?.name || "-"}
                                        </strong>
                                    </div>

                                    <div style={styles.detailRow}>
                                        <span style={styles.detailLabel}>
                                            Payment
                                        </span>

                                        <strong
                                            style={styles.detailValue}
                                        >
                                            {payment.icon}{" "}
                                            {payment.label}
                                        </strong>
                                    </div>

                                    <div style={styles.detailRow}>
                                        <span style={styles.detailLabel}>
                                            Status
                                        </span>

                                        <strong
                                            style={{
                                                ...styles.detailValue,
                                                ...styles.paid,
                                            }}
                                        >
                                            ●{" "}
                                            {isPaid
                                                ? "Paid"
                                                : sale.payment_status ||
                                                  "Unpaid"}
                                        </strong>
                                    </div>

                                    <div
                                        style={{
                                            ...styles.detailRow,
                                            borderBottom: "none",
                                        }}
                                    >
                                        <span style={styles.detailLabel}>
                                            Items
                                        </span>

                                        <strong
                                            style={styles.detailValue}
                                        >
                                            📦 {itemCount}{" "}
                                            {itemCount === 1
                                                ? "item"
                                                : "items"}
                                        </strong>
                                    </div>

                                </div>
                            </div>
                        </div>


                        {/* =================================================
                            PRODUCTS
                        ================================================= */}

                        <div style={styles.card}>
                            <div style={styles.cardHeader}>
                                <div style={styles.productsHeader}>
                                    <div style={{ minWidth: 0 }}>
                                        <span style={styles.eyebrow}>
                                            PRODUCTS
                                        </span>

                                        <h2 style={styles.cardTitle}>
                                            Products Sold
                                        </h2>
                                    </div>

                                    <span style={styles.productCount}>
                                        {productCount}{" "}
                                        {productCount === 1
                                            ? "product"
                                            : "products"}
                                    </span>
                                </div>
                            </div>

                            <div style={styles.productsList}>

                                {items.length > 0 ? (
                                    items.map((item) => {
                                        const quantity =
                                            Number(
                                                item.quantity
                                            ) || 0;

                                        const unitPrice =
                                            Number(
                                                item.unit_price
                                            ) || 0;

                                        const itemTotal =
                                            item.total !== null &&
                                            item.total !== undefined
                                                ? Number(item.total)
                                                : quantity * unitPrice;

                                        return (
                                            <div
                                                key={item.id}
                                                style={styles.product}
                                                className="sale-product-row"
                                            >

                                                <div
                                                    style={
                                                        styles.productImage
                                                    }
                                                >
                                                    {item.product?.image ? (
                                                        <img
                                                            src={`/storage/${item.product.image}`}
                                                            alt={
                                                                item.product
                                                                    ?.name ||
                                                                "Product"
                                                            }
                                                            style={
                                                                styles.productImageImg
                                                            }
                                                        />
                                                    ) : (
                                                        <span>
                                                            📦
                                                        </span>
                                                    )}
                                                </div>

                                                <div
                                                    style={{
                                                        minWidth: 0,
                                                    }}
                                                >
                                                    <strong
                                                        style={
                                                            styles.productName
                                                        }
                                                    >
                                                        {item.product
                                                            ?.name ||
                                                            "Unknown Product"}
                                                    </strong>

                                                    <span
                                                        style={
                                                            styles.productSku
                                                        }
                                                    >
                                                        SKU:{" "}
                                                        {item.product
                                                            ?.sku ||
                                                            "-"}
                                                    </span>

                                                    <span
                                                        style={
                                                            styles.productQuantity
                                                        }
                                                    >
                                                        {quantity}{" "}
                                                        {item.product
                                                            ?.unit ||
                                                            "pcs"}{" "}
                                                        × TZS{" "}
                                                        {formatMoney(
                                                            unitPrice
                                                        )}
                                                    </span>
                                                </div>

                                                <div
                                                    style={
                                                        styles.productTotal
                                                    }
                                                >
                                                    <span
                                                        style={
                                                            styles.productTotalLabel
                                                        }
                                                    >
                                                        TOTAL
                                                    </span>

                                                    <strong
                                                        style={
                                                            styles.productTotalValue
                                                        }
                                                    >
                                                        TZS{" "}
                                                        {formatMoney(
                                                            itemTotal
                                                        )}
                                                    </strong>
                                                </div>

                                            </div>
                                        );
                                    })
                                ) : (
                                    <div
                                        style={{
                                            padding: "30px 0",
                                            textAlign: "center",
                                            color: "#94a3b8",
                                            fontSize: "13px",
                                        }}
                                    >
                                        No products found for this sale.
                                    </div>
                                )}

                            </div>
                        </div>


                        {/* =================================================
                            PAYMENT
                        ================================================= */}

                        <div style={styles.card}>
                            <div style={styles.cardHeader}>
                                <span style={styles.eyebrow}>
                                    PAYMENT
                                </span>

                                <h2 style={styles.cardTitle}>
                                    Payment Summary
                                </h2>
                            </div>

                            <div style={styles.cardBody}>

                                <div style={styles.paymentMethod}>
                                    <div style={styles.paymentIcon}>
                                        {payment.icon}
                                    </div>

                                    <div style={{ minWidth: 0 }}>
                                        <span
                                            style={
                                                styles.paymentLabel
                                            }
                                        >
                                            Payment Method
                                        </span>

                                        <strong
                                            style={
                                                styles.paymentName
                                            }
                                        >
                                            {payment.label}
                                        </strong>
                                    </div>
                                </div>

                                <div style={styles.paymentLines}>

                                    <div style={styles.paymentRow}>
                                        <span
                                            style={
                                                styles.paymentLabelText
                                            }
                                        >
                                            Subtotal
                                        </span>

                                        <strong
                                            style={
                                                styles.paymentValue
                                            }
                                        >
                                            TZS{" "}
                                            {formatMoney(
                                                subtotal
                                            )}
                                        </strong>
                                    </div>

                                    <div style={styles.paymentRow}>
                                        <span
                                            style={
                                                styles.paymentLabelText
                                            }
                                        >
                                            Discount
                                        </span>

                                        <strong
                                            style={{
                                                ...styles.paymentValue,
                                                ...styles.discount,
                                            }}
                                        >
                                            − TZS{" "}
                                            {formatMoney(
                                                discount
                                            )}
                                        </strong>
                                    </div>

                                    <div style={styles.divider} />

                                    <div style={styles.totalRow}>
                                        <span
                                            style={
                                                styles.totalLabel
                                            }
                                        >
                                            TOTAL
                                        </span>

                                        <strong
                                            style={
                                                styles.totalValue
                                            }
                                        >
                                            TZS{" "}
                                            {formatMoney(total)}
                                        </strong>
                                    </div>

                                    <div style={styles.paymentRow}>
                                        <span
                                            style={
                                                styles.paymentLabelText
                                            }
                                        >
                                            Amount Paid
                                        </span>

                                        <strong
                                            style={
                                                styles.paymentValue
                                            }
                                        >
                                            TZS{" "}
                                            {formatMoney(
                                                paidAmount
                                            )}
                                        </strong>
                                    </div>

                                    <div
                                        style={{
                                            ...styles.paymentRow,
                                            paddingBottom: "0",
                                        }}
                                    >
                                        <span
                                            style={
                                                styles.paymentLabelText
                                            }
                                        >
                                            Change
                                        </span>

                                        <strong
                                            style={{
                                                ...styles.paymentValue,
                                                ...styles.changeValue,
                                            }}
                                        >
                                            TZS{" "}
                                            {formatMoney(
                                                changeAmount
                                            )}
                                        </strong>
                                    </div>

                                </div>

                                <div style={styles.paymentSuccess}>
                                    <div
                                        style={
                                            styles.paymentSuccessIcon
                                        }
                                    >
                                        ✓
                                    </div>

                                    <div style={{ minWidth: 0 }}>
                                        <strong
                                            style={
                                                styles.paymentSuccessTitle
                                            }
                                        >
                                            PAYMENT SUCCESSFUL
                                        </strong>

                                        <span
                                            style={
                                                styles.paymentSuccessText
                                            }
                                        >
                                            Transaction completed
                                            successfully.
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>


                    {/* =====================================================
                        GRAND TOTAL
                    ===================================================== */}

                    <div style={styles.grandTotal}>

                        <span style={styles.grandTotalLabel}>
                            TOTAL SALE
                        </span>

                        <strong style={styles.grandTotalAmount}>
                            TZS {formatMoney(total)}
                        </strong>

                        <div style={styles.grandSuccess}>
                            <span>✓</span>
                            <span>PAYMENT SUCCESSFUL</span>
                        </div>

                    </div>


                    {/* =====================================================
                        ACTIONS
                    ===================================================== */}

                    <div
                        style={styles.actions}
                        className="sale-details-actions"
                    >

                        <button
                            type="button"
                            style={styles.printButton}
                            onClick={() => window.print()}
                        >
                            🖨 Print Receipt
                        </button>

                        <Link
                            href={route("admin.sales.index")}
                            style={styles.historyButton}
                        >
                            ← Sales History
                        </Link>

                        <Link
                            href={route("admin.sales.create")}
                            style={styles.newSaleButton}
                        >
                            + Make Another Sale
                        </Link>

                    </div>


                    {/* =====================================================
                        FOOTER
                    ===================================================== */}

                    <div style={styles.footer}>
                        <strong style={styles.footerBrand}>
                            MauzoVibe
                        </strong>

                        <span>
                            Smart Sales Management
                        </span>

                        <span>•</span>

                        <span>
                            Transaction #{sale.id}
                        </span>
                    </div>

                </div>


                {/* =========================================================
                    RESPONSIVE INTERNAL CSS
                ========================================================= */}

                <style>{`

                    * {
                        box-sizing: border-box;
                    }

                    /* =====================================================
                       LARGE TABLET
                    ===================================================== */

                    @media (max-width: 1150px) {

                        .sale-details-responsive-grid {
                            grid-template-columns: 1fr 1fr !important;
                        }

                        .sale-details-responsive-grid > :last-child {
                            grid-column: 1 / -1;
                        }

                    }


                    /* =====================================================
                       TABLET
                    ===================================================== */

                    @media (max-width: 850px) {

                        .sale-details-page {
                            padding: 20px !important;
                        }

                        .sale-details-header {
                            align-items: flex-start !important;
                        }

                        .sale-details-responsive-grid {
                            grid-template-columns: 1fr !important;
                        }

                        .sale-details-responsive-grid > :last-child {
                            grid-column: auto;
                        }

                    }


                    /* =====================================================
                       MOBILE
                    ===================================================== */

                    @media (max-width: 640px) {

                        .sale-details-page {
                            padding: 12px !important;
                        }

                        .sale-details-header {
                            display: flex !important;
                            flex-direction: column !important;
                            align-items: stretch !important;
                            gap: 16px !important;
                            margin-bottom: 18px !important;
                        }

                        .sale-details-header-info {
                            width: 100% !important;
                        }

                        .sale-details-header-info h1 {
                            font-size: 24px !important;
                            line-height: 1.2 !important;
                        }

                        .sale-details-header-info p {
                            font-size: 13px !important;
                        }

                        .sale-details-header-actions {
                            width: 100% !important;
                            display: grid !important;
                            grid-template-columns: 1fr 1fr !important;
                            gap: 8px !important;
                        }

                        .sale-details-header-actions a {
                            width: 100% !important;
                            min-width: 0 !important;
                            padding-left: 10px !important;
                            padding-right: 10px !important;
                            font-size: 13px !important;
                        }

                        .sale-details-page .sale-details-responsive-grid {
                            gap: 12px !important;
                        }

                        .sale-details-page [style*="padding: 20px 20px 16px"] {
                            padding: 16px !important;
                        }

                        .sale-details-page [style*="padding: 18px 20px 20px"] {
                            padding: 16px !important;
                        }

                        .sale-details-page [style*="padding: 8px 20px 20px"] {
                            padding: 8px 16px 16px !important;
                        }

                        .sale-details-page [style*="padding: 17px 20px"] {
                            padding: 14px !important;
                        }

                        .sale-details-page [style*="font-size: 18px"] {
                            font-size: 16px !important;
                        }

                        .sale-details-page [style*="font-size: 30px"] {
                            font-size: 25px !important;
                        }

                        .sale-details-page [style*="font-size: 20px"] {
                            font-size: 18px !important;
                        }

                        .sale-product-row {
                            grid-template-columns: 46px minmax(0, 1fr) !important;
                            gap: 10px !important;
                            padding: 12px 0 !important;
                        }

                        .sale-product-row > div:first-child {
                            width: 46px !important;
                            height: 46px !important;
                        }

                        .sale-product-row > div:last-child {
                            grid-column: 2 !important;
                            text-align: left !important;
                            margin-top: 3px !important;
                        }

                        .sale-product-row > div:last-child span:first-child {
                            display: inline-block !important;
                            margin-right: 5px !important;
                        }

                        .sale-details-actions {
                            display: grid !important;
                            grid-template-columns: 1fr !important;
                            gap: 8px !important;
                            width: 100% !important;
                        }

                        .sale-details-actions button,
                        .sale-details-actions a {
                            width: 100% !important;
                            min-height: 46px !important;
                        }

                        .sale-details-page [style*="padding: 28px 20px"] {
                            padding: 22px 15px !important;
                        }

                        .sale-details-page [style*="font-size: 30px"] {
                            font-size: 26px !important;
                        }

                    }


                    /* =====================================================
                       SMALL PHONES
                    ===================================================== */

                    @media (max-width: 390px) {

                        .sale-details-page {
                            padding: 8px !important;
                        }

                        .sale-details-header-actions {
                            grid-template-columns: 1fr !important;
                        }

                        .sale-details-page [style*="padding: 14px"] {
                            padding: 12px !important;
                        }

                        .sale-details-page [style*="padding: 16px"] {
                            padding: 13px !important;
                        }

                        .sale-details-page [style*="font-size: 13px"] {
                            font-size: 12px !important;
                        }

                        .sale-details-page [style*="font-size: 12px"] {
                            font-size: 11px !important;
                        }

                        .sale-details-page .sale-product-row {
                            grid-template-columns: 42px minmax(0, 1fr) !important;
                        }

                        .sale-details-page .sale-product-row > div:first-child {
                            width: 42px !important;
                            height: 42px !important;
                        }

                        .sale-details-page .sale-product-row strong {
                            font-size: 13px !important;
                        }

                        .sale-details-page .sale-product-row span {
                            font-size: 10px !important;
                        }

                        .sale-details-page [style*="max-width: 65%"] {
                            max-width: 58% !important;
                        }

                    }


                    /* =====================================================
                       PREVENT HORIZONTAL OVERFLOW
                    ===================================================== */

                    @media (max-width: 640px) {

                        .sale-details-page,
                        .sale-details-page > div,
                        .sale-details-responsive-grid,
                        .sale-details-responsive-grid > div {
                            max-width: 100% !important;
                        }

                        .sale-details-page img {
                            max-width: 100%;
                        }

                        .sale-details-page strong,
                        .sale-details-page span {
                            overflow-wrap: anywhere;
                        }

                    }


                    /* =====================================================
                       PRINT
                    ===================================================== */

                    @media print {

                        body {
                            background: #ffffff !important;
                        }

                        header,
                        nav,
                        aside {
                            display: none !important;
                        }

                        .sale-details-page {
                            padding: 0 !important;
                            margin: 0 !important;
                            background: #ffffff !important;
                        }

                        .sale-details-header,
                        .sale-details-header-actions,
                        .sale-details-actions,
                        .sale-details-page button {
                            display: none !important;
                        }

                        .sale-details-responsive-grid {
                            display: grid !important;
                            grid-template-columns: 1fr 1fr 1fr !important;
                            gap: 10px !important;
                        }

                        .sale-details-responsive-grid > :last-child {
                            grid-column: auto !important;
                        }

                        .sale-details-page * {
                            box-shadow: none !important;
                        }

                        .sale-details-page > div {
                            max-width: none !important;
                        }

                    }

                `}</style>

            </div>
        </AdminLayout>
    );
}