import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import "./returns.css";

export default function Show({ saleReturn }) {

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
        const labels = {
            cash: "Cash",
            mobile_money: "Mobile Money",
            bank: "Bank",
            credit: "Credit",
        };

        return (
            labels[method] ||
            method
                ?.replace(/_/g, " ")
                .replace(/\b\w/g, (char) =>
                    char.toUpperCase()
                ) ||
            "-"
        );
    };

    const formatStatus = (status) => {
        if (!status) return "-";

        return status
            .replace(/_/g, " ")
            .replace(/\b\w/g, (char) =>
                char.toUpperCase()
            );
    };

    const sale = saleReturn.sale;

    return (
        <AdminLayout>

            <Head
                title={`Return ${saleReturn.return_number}`}
            />

            <div className="returns-page">

                <div className="returns-container">

                    {/* HEADER */}
                    <div className="returns-header">

                        <div>

                            <div className="returns-breadcrumb">
                                <span>Sales</span>
                                <span>/</span>
                                <span>Returns</span>
                                <span>/</span>
                                <span>
                                    {saleReturn.return_number}
                                </span>
                            </div>

                            <h1 className="returns-title">
                                Return Details
                            </h1>

                            <p className="returns-subtitle">
                                View details of this completed
                                sales return.
                            </p>

                        </div>

                        <div
                            style={{
                                display: "flex",
                                gap: "8px",
                                flexWrap: "wrap",
                            }}
                        >

                            <Link
                                href={route(
                                    "admin.returns.index"
                                )}
                                className="returns-action-button"
                            >
                                ← Returns
                            </Link>

                            {sale && (
                                <Link
                                    href={route(
                                        "admin.sales.show",
                                        sale.id
                                    )}
                                    className="returns-sale-button"
                                >
                                    View Sale
                                </Link>
                            )}

                        </div>

                    </div>


                    {/* RETURN SUMMARY */}
                    <div className="returns-summary">

                        <div className="returns-summary-card">

                            <div className="returns-summary-top">

                                <span className="returns-summary-label">
                                    RETURN NUMBER
                                </span>

                                <span className="returns-summary-icon">
                                    ↩
                                </span>

                            </div>

                            <strong
                                className="returns-summary-value"
                                style={{
                                    fontSize: "16px",
                                }}
                            >
                                {saleReturn.return_number}
                            </strong>

                            <span className="returns-summary-hint">
                                Return reference
                            </span>

                        </div>


                        <div className="returns-summary-card">

                            <div className="returns-summary-top">

                                <span className="returns-summary-label">
                                    REFUND
                                </span>

                                <span className="returns-summary-icon">
                                    💰
                                </span>

                            </div>

                            <strong className="returns-summary-value">
                                TZS{" "}
                                {formatMoney(
                                    saleReturn.refund_amount
                                )}
                            </strong>

                            <span className="returns-summary-hint">
                                Amount refunded
                            </span>

                        </div>


                        <div className="returns-summary-card">

                            <div className="returns-summary-top">

                                <span className="returns-summary-label">
                                    METHOD
                                </span>

                                <span className="returns-summary-icon">
                                    💳
                                </span>

                            </div>

                            <strong className="returns-summary-value">
                                {formatMethod(
                                    saleReturn.refund_method
                                )}
                            </strong>

                            <span className="returns-summary-hint">
                                Refund method
                            </span>

                        </div>


                        <div className="returns-summary-card">

                            <div className="returns-summary-top">

                                <span className="returns-summary-label">
                                    STATUS
                                </span>

                                <span className="returns-summary-icon">
                                    ✓
                                </span>

                            </div>

                            <strong className="returns-summary-value">
                                {formatStatus(
                                    saleReturn.status
                                )}
                            </strong>

                            <span className="returns-summary-hint">
                                Return status
                            </span>

                        </div>

                    </div>


                    {/* MAIN */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "minmax(0, 1.5fr) minmax(300px, .7fr)",
                            gap: "18px",
                        }}
                        className="return-details-layout"
                    >

                        {/* ITEMS */}
                        <div className="returns-card">

                            <div
                                style={{
                                    padding: "20px",
                                    borderBottom:
                                        "1px solid #f1f5f9",
                                }}
                            >

                                <span className="returns-summary-label">
                                    RETURNED PRODUCTS
                                </span>

                                <h2
                                    style={{
                                        margin:
                                            "5px 0 0",
                                        fontSize: "20px",
                                        fontWeight: "900",
                                    }}
                                >
                                    Items
                                </h2>

                            </div>


                            <div
                                style={{
                                    padding:
                                        "5px 20px 20px",
                                }}
                            >

                                {saleReturn.items?.length > 0 ? (

                                    saleReturn.items.map(
                                        (item) => (

                                            <div
                                                key={item.id}
                                                style={{
                                                    display:
                                                        "grid",
                                                    gridTemplateColumns:
                                                        "54px minmax(0,1fr) auto",
                                                    gap: "13px",
                                                    alignItems:
                                                        "center",
                                                    padding:
                                                        "16px 0",
                                                    borderBottom:
                                                        "1px solid #f1f5f9",
                                                }}
                                            >

                                                {/* IMAGE */}
                                                <div
                                                    style={{
                                                        width: "54px",
                                                        height: "54px",
                                                        borderRadius:
                                                            "11px",
                                                        background:
                                                            "#f8fafc",
                                                        border:
                                                            "1px solid #e2e8f0",
                                                        display:
                                                            "flex",
                                                        alignItems:
                                                            "center",
                                                        justifyContent:
                                                            "center",
                                                        overflow:
                                                            "hidden",
                                                        fontSize:
                                                            "22px",
                                                    }}
                                                >

                                                    {item.product
                                                        ?.image ? (

                                                        <img
                                                            src={`/storage/${item.product.image}`}
                                                            alt={
                                                                item
                                                                    .product
                                                                    ?.name ||
                                                                "Product"
                                                            }
                                                            style={{
                                                                width:
                                                                    "100%",
                                                                height:
                                                                    "100%",
                                                                objectFit:
                                                                    "cover",
                                                            }}
                                                        />

                                                    ) : (
                                                        <span>
                                                            📦
                                                        </span>
                                                    )}

                                                </div>


                                                {/* PRODUCT */}
                                                <div>

                                                    <strong
                                                        style={{
                                                            display:
                                                                "block",
                                                            color:
                                                                "#0f172a",
                                                            fontSize:
                                                                "14px",
                                                            fontWeight:
                                                                "800",
                                                            marginBottom:
                                                                "4px",
                                                        }}
                                                    >
                                                        {
                                                            item
                                                                .product
                                                                ?.name
                                                        }
                                                    </strong>

                                                    <span
                                                        style={{
                                                            display:
                                                                "block",
                                                            color:
                                                                "#94a3b8",
                                                            fontSize:
                                                                "11px",
                                                            marginBottom:
                                                                "5px",
                                                        }}
                                                    >
                                                        SKU:{" "}
                                                        {item
                                                            .product
                                                            ?.sku ||
                                                            "-"}
                                                    </span>

                                                    <div
                                                        style={{
                                                            display:
                                                                "flex",
                                                            gap: "10px",
                                                            flexWrap:
                                                                "wrap",
                                                            color:
                                                                "#64748b",
                                                            fontSize:
                                                                "11px",
                                                        }}
                                                    >

                                                        <span>
                                                            Qty:{" "}
                                                            <strong>
                                                                {
                                                                    item.quantity
                                                                }
                                                            </strong>
                                                        </span>

                                                        <span>
                                                            Unit: TZS{" "}
                                                            {formatMoney(
                                                                item.unit_price
                                                            )}
                                                        </span>

                                                    </div>

                                                </div>


                                                {/* TOTAL */}
                                                <div
                                                    style={{
                                                        textAlign:
                                                            "right",
                                                    }}
                                                >

                                                    <span
                                                        style={{
                                                            display:
                                                                "block",
                                                            color:
                                                                "#94a3b8",
                                                            fontSize:
                                                                "10px",
                                                            fontWeight:
                                                                "800",
                                                            marginBottom:
                                                                "4px",
                                                        }}
                                                    >
                                                        REFUND
                                                    </span>

                                                    <strong
                                                        style={{
                                                            color:
                                                                "#2563eb",
                                                            fontSize:
                                                                "14px",
                                                            fontWeight:
                                                                "900",
                                                        }}
                                                    >
                                                        TZS{" "}
                                                        {formatMoney(
                                                            item.total
                                                        )}
                                                    </strong>

                                                </div>

                                            </div>

                                        )
                                    )

                                ) : (

                                    <div
                                        style={{
                                            padding:
                                                "35px 10px",
                                            textAlign:
                                                "center",
                                            color:
                                                "#64748b",
                                            fontSize:
                                                "13px",
                                        }}
                                    >
                                        No returned items found.
                                    </div>

                                )}

                            </div>

                        </div>


                        {/* INFORMATION */}
                        <div className="returns-card">

                            <div
                                style={{
                                    padding: "20px",
                                    borderBottom:
                                        "1px solid #f1f5f9",
                                }}
                            >

                                <span className="returns-summary-label">
                                    RETURN INFORMATION
                                </span>

                                <h2
                                    style={{
                                        margin:
                                            "5px 0 0",
                                        fontSize: "20px",
                                        fontWeight: "900",
                                    }}
                                >
                                    Details
                                </h2>

                            </div>


                            <div
                                style={{
                                    padding: "20px",
                                }}
                            >

                                <div
                                    style={{
                                        display:
                                            "flex",
                                        justifyContent:
                                            "space-between",
                                        gap: "15px",
                                        padding:
                                            "10px 0",
                                        borderBottom:
                                            "1px solid #f1f5f9",
                                    }}
                                >

                                    <span
                                        style={{
                                            color:
                                                "#64748b",
                                            fontSize:
                                                "12px",
                                        }}
                                    >
                                        Return Date
                                    </span>

                                    <strong
                                        style={{
                                            color:
                                                "#0f172a",
                                            fontSize:
                                                "12px",
                                        }}
                                    >
                                        {formatDate(
                                            saleReturn.created_at
                                        )}
                                    </strong>

                                </div>


                                <div
                                    style={{
                                        display:
                                            "flex",
                                        justifyContent:
                                            "space-between",
                                        gap: "15px",
                                        padding:
                                            "10px 0",
                                        borderBottom:
                                            "1px solid #f1f5f9",
                                    }}
                                >

                                    <span
                                        style={{
                                            color:
                                                "#64748b",
                                            fontSize:
                                                "12px",
                                        }}
                                    >
                                        Refund Method
                                    </span>

                                    <strong
                                        style={{
                                            color:
                                                "#0f172a",
                                            fontSize:
                                                "12px",
                                        }}
                                    >
                                        {formatMethod(
                                            saleReturn.refund_method
                                        )}
                                    </strong>

                                </div>


                                {sale && (

                                    <div
                                        style={{
                                            display:
                                                "flex",
                                            justifyContent:
                                                "space-between",
                                            gap: "15px",
                                            padding:
                                                "10px 0",
                                            borderBottom:
                                                "1px solid #f1f5f9",
                                        }}
                                    >

                                        <span
                                            style={{
                                                color:
                                                    "#64748b",
                                                fontSize:
                                                    "12px",
                                            }}
                                        >
                                            Original Invoice
                                        </span>

                                        <Link
                                            href={route(
                                                "admin.sales.show",
                                                sale.id
                                            )}
                                            style={{
                                                color:
                                                    "#2563eb",
                                                fontSize:
                                                    "12px",
                                                fontWeight:
                                                    "800",
                                                textDecoration:
                                                    "none",
                                            }}
                                        >
                                            {sale.invoice_number}
                                        </Link>

                                    </div>

                                )}


                                <div
                                    style={{
                                        marginTop:
                                            "20px",
                                        padding:
                                            "15px",
                                        borderRadius:
                                            "12px",
                                        background:
                                            "#eff6ff",
                                        border:
                                            "1px solid #bfdbfe",
                                        textAlign:
                                            "center",
                                    }}
                                >

                                    <span
                                        style={{
                                            display:
                                                "block",
                                            color:
                                                "#64748b",
                                            fontSize:
                                                "10px",
                                            fontWeight:
                                                "900",
                                            marginBottom:
                                                "5px",
                                        }}
                                    >
                                        TOTAL REFUND
                                    </span>

                                    <strong
                                        style={{
                                            display:
                                                "block",
                                            color:
                                                "#2563eb",
                                            fontSize:
                                                "26px",
                                            fontWeight:
                                                "900",
                                        }}
                                    >
                                        TZS{" "}
                                        {formatMoney(
                                            saleReturn.refund_amount
                                        )}
                                    </strong>

                                </div>


                                {saleReturn.reason && (

                                    <div
                                        style={{
                                            marginTop:
                                                "18px",
                                        }}
                                    >

                                        <span
                                            style={{
                                                display:
                                                    "block",
                                                color:
                                                    "#94a3b8",
                                                fontSize:
                                                    "10px",
                                                fontWeight:
                                                    "900",
                                                marginBottom:
                                                    "6px",
                                            }}
                                        >
                                            REASON
                                        </span>

                                        <div
                                            style={{
                                                padding:
                                                    "12px",
                                                borderRadius:
                                                    "10px",
                                                background:
                                                    "#f8fafc",
                                                border:
                                                    "1px solid #e2e8f0",
                                                color:
                                                    "#475569",
                                                fontSize:
                                                    "12px",
                                                lineHeight:
                                                    "1.6",
                                            }}
                                        >
                                            {
                                                saleReturn.reason
                                            }
                                        </div>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>


                    {/* FOOTER */}
                    <div className="returns-footer">

                        <strong>
                            MauzoVibe
                        </strong>

                        <span>
                            Smart Sales Management
                        </span>

                        <span>•</span>

                        <span>
                            Return Details
                        </span>

                    </div>

                </div>

            </div>


            <style>{`

                @media (max-width: 900px) {

                    .return-details-layout {
                        grid-template-columns: 1fr !important;
                    }

                }

                @media (max-width: 560px) {

                    .return-details-layout {
                        gap: 14px !important;
                    }

                }

            `}</style>

        </AdminLayout>
    );
}