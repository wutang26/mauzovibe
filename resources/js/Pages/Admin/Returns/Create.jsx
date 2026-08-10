import React, { useMemo } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ sale, hasReturnableItems }) {

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


    /*
    |--------------------------------------------------------------------------
    | Form
    |--------------------------------------------------------------------------
    */

    const { data, setData, post, processing, errors } = useForm({
        refund_method: sale.payment_method || "cash",
        reason: "",
        items: sale.items.map((item) => ({
            sale_item_id: item.id,
            quantity: 0,
        })),
    });


    /*
    |--------------------------------------------------------------------------
    | Update Quantity
    |--------------------------------------------------------------------------
    */

    const updateQuantity = (index, quantity) => {

        const item = sale.items[index];

        const maxQuantity =
            Number(item.quantity_available) || 0;

        let newQuantity = Number(quantity) || 0;

        if (newQuantity < 0) {
            newQuantity = 0;
        }

        if (newQuantity > maxQuantity) {
            newQuantity = maxQuantity;
        }

        const updatedItems = [...data.items];

        updatedItems[index] = {
            ...updatedItems[index],
            quantity: newQuantity,
        };

        setData("items", updatedItems);
    };


    /*
    |--------------------------------------------------------------------------
    | Increase Quantity
    |--------------------------------------------------------------------------
    */

    const increaseQuantity = (index) => {

        const item = sale.items[index];

        const current =
            Number(data.items[index]?.quantity) || 0;

        const max =
            Number(item.quantity_available) || 0;

        if (current < max) {
            updateQuantity(index, current + 1);
        }
    };


    /*
    |--------------------------------------------------------------------------
    | Decrease Quantity
    |--------------------------------------------------------------------------
    */

    const decreaseQuantity = (index) => {

        const current =
            Number(data.items[index]?.quantity) || 0;

        if (current > 0) {
            updateQuantity(index, current - 1);
        }
    };


    /*
    |--------------------------------------------------------------------------
    | Selected Items
    |--------------------------------------------------------------------------
    */

    const selectedItems = useMemo(() => {

        return sale.items
            .map((item, index) => {

                const quantity =
                    Number(
                        data.items[index]?.quantity || 0
                    );

                return {
                    ...item,
                    selectedQuantity: quantity,
                    refund:
                        quantity *
                        Number(item.unit_price || 0),
                };
            })
            .filter(
                (item) =>
                    item.selectedQuantity > 0
            );

    }, [sale.items, data.items]);


    /*
    |--------------------------------------------------------------------------
    | Refund Total
    |--------------------------------------------------------------------------
    */

   const refundTotal = useMemo(() => {

    return selectedItems.reduce(
        (total, item) =>
            total + item.refund,
        0
    );

}, [selectedItems]);


/*
|--------------------------------------------------------------------------
| Already Returned Total
|--------------------------------------------------------------------------
*/

const alreadyReturnedTotal = useMemo(() => {

    return sale.items.reduce((total, item) => {

        const returned =
            Number(item.quantity_returned) || 0;

        const unitPrice =
            Number(item.unit_price) || 0;

        return total + (returned * unitPrice);

    }, 0);

}, [sale.items]);


/*
|--------------------------------------------------------------------------
| Remaining Refundable Total
|--------------------------------------------------------------------------
*/

const remainingRefundableTotal = useMemo(() => {

    return sale.items.reduce((total, item) => {

        const available =
            Number(item.quantity_available) || 0;

        const unitPrice =
            Number(item.unit_price) || 0;

        return total + (available * unitPrice);

    }, 0);

}, [sale.items]);

    /*
    |--------------------------------------------------------------------------
    | Total Return Quantity
    |--------------------------------------------------------------------------
    */

    const totalReturnQuantity = useMemo(() => {

        return selectedItems.reduce(
            (total, item) =>
                total + item.selectedQuantity,
            0
        );

    }, [selectedItems]);


    /*
    |--------------------------------------------------------------------------
    | Select All
    |--------------------------------------------------------------------------
    */

    const selectAll = () => {

        setData(
            "items",
            sale.items.map((item) => ({
                sale_item_id: item.id,
                quantity:
                    Number(
                        item.quantity_available
                    ) || 0,
            }))
        );
    };


    /*
    |--------------------------------------------------------------------------
    | Clear Selection
    |--------------------------------------------------------------------------
    */

    const clearSelection = () => {

        setData(
            "items",
            sale.items.map((item) => ({
                sale_item_id: item.id,
                quantity: 0,
            }))
        );
    };


    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const submitReturn = (event) => {

        event.preventDefault();

        if (totalReturnQuantity <= 0) {
            alert(
                "Please select at least one product to return."
            );

            return;
        }

        post(
            route(
                "admin.returns.store",
                sale.id
            )
        );
    };


    /*
    |--------------------------------------------------------------------------
    | Styles
    |--------------------------------------------------------------------------
    */

    const styles = {

        page: {
            minHeight: "100vh",
            background: "#f8fafc",
            padding: "28px",
            color: "#0f172a",
        },

        container: {
            maxWidth: "1400px",
            margin: "0 auto",
        },

        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "20px",
            marginBottom: "22px",
        },

        breadcrumb: {
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center",
            color: "#94a3b8",
            fontSize: "12px",
            fontWeight: "700",
            marginBottom: "8px",
        },

        title: {
            margin: 0,
            fontSize: "30px",
            fontWeight: "900",
            letterSpacing: "-.6px",
        },

        subtitle: {
            margin: "6px 0 0",
            color: "#64748b",
            fontSize: "14px",
        },

        backButton: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            minHeight: "42px",
            padding: "0 16px",
            borderRadius: "10px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            color: "#334155",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: "800",
        },

        saleSummary: {
            display: "grid",
            gridTemplateColumns:
                "repeat(4, minmax(0, 1fr))",
            gap: "12px",
            marginBottom: "18px",
        },

        summaryCard: {
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "15px 17px",
        },

        summaryLabel: {
            display: "block",
            color: "#94a3b8",
            fontSize: "10px",
            fontWeight: "900",
            letterSpacing: ".8px",
            marginBottom: "5px",
        },

        summaryValue: {
            display: "block",
            color: "#0f172a",
            fontSize: "14px",
            fontWeight: "800",
        },

        layout: {
            display: "grid",
            gridTemplateColumns:
                "minmax(0, 1.6fr) minmax(300px, .8fr)",
            gap: "18px",
            alignItems: "start",
        },

        card: {
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow:
                "0 2px 8px rgba(15, 23, 42, .04)",
        },

        cardHeader: {
            padding: "19px 20px",
            borderBottom: "1px solid #f1f5f9",
        },

        cardHeaderRow: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
        },

        eyebrow: {
            display: "block",
            color: "#94a3b8",
            fontSize: "10px",
            fontWeight: "900",
            letterSpacing: "1px",
            marginBottom: "5px",
        },

        cardTitle: {
            margin: 0,
            fontSize: "18px",
            fontWeight: "900",
        },

        helperText: {
            margin: "5px 0 0",
            color: "#64748b",
            fontSize: "12px",
        },

        headerButtons: {
            display: "flex",
            gap: "7px",
        },

        smallButton: {
            border: "1px solid #e2e8f0",
            background: "#ffffff",
            color: "#475569",
            borderRadius: "8px",
            padding: "7px 10px",
            fontSize: "11px",
            fontWeight: "800",
            cursor: "pointer",
        },

        products: {
            padding: "5px 20px 20px",
        },

        product: {
            display: "grid",
            gridTemplateColumns:
                "54px minmax(0, 1fr) auto",
            gap: "13px",
            alignItems: "center",
            padding: "15px 0",
            borderBottom:
                "1px solid #f1f5f9",
        },

        image: {
            width: "54px",
            height: "54px",
            borderRadius: "11px",
            overflow: "hidden",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
        },

        imageImg: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
        },

        productName: {
            display: "block",
            color: "#0f172a",
            fontSize: "14px",
            fontWeight: "800",
            marginBottom: "3px",
        },

        sku: {
            display: "block",
            color: "#94a3b8",
            fontSize: "11px",
            marginBottom: "5px",
        },

        productMeta: {
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            color: "#64748b",
            fontSize: "11px",
        },

        available: {
            color: "#16a34a",
            fontWeight: "800",
        },

        quantityControl: {
            display: "flex",
            alignItems: "center",
            gap: "5px",
        },

        quantityButton: {
            width: "34px",
            height: "34px",
            borderRadius: "8px",
            border: "1px solid #dbe3ed",
            background: "#ffffff",
            color: "#334155",
            fontSize: "17px",
            fontWeight: "800",
            cursor: "pointer",
        },

        quantityInput: {
            width: "58px",
            height: "34px",
            borderRadius: "8px",
            border: "1px solid #dbe3ed",
            textAlign: "center",
            fontSize: "13px",
            fontWeight: "800",
            outline: "none",
        },

        productRefund: {
            display: "block",
            textAlign: "right",
            color: "#2563eb",
            fontSize: "12px",
            fontWeight: "900",
            marginTop: "5px",
        },

        formCard: {
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow:
                "0 2px 8px rgba(15, 23, 42, .04)",
        },

        formBody: {
            padding: "20px",
        },

        field: {
            marginBottom: "19px",
        },

        label: {
            display: "block",
            color: "#334155",
            fontSize: "12px",
            fontWeight: "800",
            marginBottom: "7px",
        },

        textarea: {
            width: "100%",
            minHeight: "100px",
            resize: "vertical",
            padding: "11px 12px",
            borderRadius: "10px",
            border: "1px solid #dbe3ed",
            outline: "none",
            fontSize: "13px",
            color: "#0f172a",
            boxSizing: "border-box",
            fontFamily: "inherit",
        },

        methods: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
        },

        method: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "11px",
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
            background: "#ffffff",
            cursor: "pointer",
        },

        methodActive: {
            border: "1px solid #2563eb",
            background: "#eff6ff",
        },

        methodRadio: {
            accentColor: "#2563eb",
        },

        methodText: {
            fontSize: "12px",
            fontWeight: "800",
            color: "#334155",
        },

        summary: {
            borderTop: "1px solid #f1f5f9",
            paddingTop: "17px",
            marginTop: "5px",
        },

        summaryRow: {
            display: "flex",
            justifyContent: "space-between",
            gap: "15px",
            padding: "8px 0",
        },

        summaryRowLabel: {
            color: "#64748b",
            fontSize: "12px",
        },

        summaryRowValue: {
            color: "#0f172a",
            fontSize: "12px",
            fontWeight: "800",
        },

        refundTotal: {
            marginTop: "8px",
            padding: "15px",
            borderRadius: "12px",
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            textAlign: "center",
        },

        refundLabel: {
            display: "block",
            color: "#64748b",
            fontSize: "10px",
            fontWeight: "900",
            letterSpacing: ".8px",
            marginBottom: "4px",
        },

        refundAmount: {
            display: "block",
            color: "#2563eb",
            fontSize: "24px",
            fontWeight: "900",
        },

        submitButton: {
            width: "100%",
            minHeight: "46px",
            marginTop: "17px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: "900",
            cursor: "pointer",
        },

        disabledButton: {
            opacity: ".55",
            cursor: "not-allowed",
        },

        warning: {
            display: "flex",
            gap: "10px",
            alignItems: "flex-start",
            padding: "12px",
            borderRadius: "10px",
            background: "#fffbeb",
            border: "1px solid #fde68a",
            color: "#92400e",
            fontSize: "11px",
            lineHeight: "1.5",
        },

        error: {
            marginTop: "5px",
            color: "#dc2626",
            fontSize: "11px",
            fontWeight: "600",
        },

        footer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "25px",
            paddingTop: "20px",
            borderTop: "1px solid #e2e8f0",
            color: "#94a3b8",
            fontSize: "11px",
        },

        footerBrand: {
            color: "#64748b",
            fontWeight: "900",
        },
    };


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <AdminLayout>

            <Head title={`Return ${sale.invoice_number}`} />

            <div
                style={styles.page}
                className="sale-return-page"
            >

                <div style={styles.container}>

                    {/* =====================================================
                        HEADER
                    ===================================================== */}

                    <div style={styles.header}>

                        <div>

                            <div style={styles.breadcrumb}>
                                <span>Sales</span>
                                <span>/</span>
                                <span>Returns</span>
                                <span>/</span>
                                <span>
                                    {sale.invoice_number}
                                </span>
                            </div>

                            <h1 style={styles.title}>
                                Return Sale
                            </h1>

                            <p style={styles.subtitle}>
                                Select products and quantities
                                to return from this transaction.
                            </p>

                        </div>

                        <Link
                            href={route(
                                "admin.sales.show",
                                sale.id
                            )}
                            style={styles.backButton}
                        >
                            ← Back to Sale
                        </Link>

                    </div>


                    {/* =====================================================
                        SALE SUMMARY
                    ===================================================== */}

                   <div
    style={styles.saleSummary}
    className="sale-return-summary"
>

    {/* INVOICE */}
    <div style={styles.summaryCard}>
        <span style={styles.summaryLabel}>
            INVOICE
        </span>

        <strong style={styles.summaryValue}>
            {sale.invoice_number}
        </strong>
    </div>


    {/* DATE */}
    <div style={styles.summaryCard}>
        <span style={styles.summaryLabel}>
            DATE
        </span>

        <strong style={styles.summaryValue}>
            {formatDate(sale.created_at)}
        </strong>
    </div>


    {/* ORIGINAL TOTAL */}
    <div style={styles.summaryCard}>
        <span style={styles.summaryLabel}>
            ORIGINAL TOTAL
        </span>

        <strong style={styles.summaryValue}>
            TZS {formatMoney(sale.total)}
        </strong>
    </div>


    {/* ALREADY RETURNED */}
    <div style={styles.summaryCard}>
        <span style={styles.summaryLabel}>
            ALREADY RETURNED
        </span>

        <strong
            style={{
                ...styles.summaryValue,
                color: "#dc2626",
            }}
        >
            TZS {formatMoney(alreadyReturnedTotal)}
        </strong>
    </div>


    {/* REFUNDABLE */}
    <div style={styles.summaryCard}>
        <span style={styles.summaryLabel}>
            REFUNDABLE
        </span>

        <strong
            style={{
                ...styles.summaryValue,
                color: "#16a34a",
            }}
        >
            TZS {formatMoney(remainingRefundableTotal)}
        </strong>
    </div>


    {/* PAYMENT */}
    <div style={styles.summaryCard}>
        <span style={styles.summaryLabel}>
            PAYMENT METHOD
        </span>

        <strong style={styles.summaryValue}>
            {sale.payment_method
                ?.replace("_", " ")
                .replace(
                    /\b\w/g,
                    (char) => char.toUpperCase()
                )}
        </strong>
    </div>

</div>

                    {!hasReturnableItems ? (

                        <div
                            style={{
                                ...styles.card,
                                padding: "40px 25px",
                                textAlign: "center",
                            }}
                        >

                            <div
                                style={{
                                    fontSize: "40px",
                                    marginBottom: "12px",
                                }}
                            >
                                ✓
                            </div>

                            <h2
                                style={{
                                    margin: 0,
                                    fontSize: "20px",
                                    fontWeight: "900",
                                }}
                            >
                                All Items Already Returned
                            </h2>

                            <p
                                style={{
                                    color: "#64748b",
                                    fontSize: "13px",
                                    margin:
                                        "8px 0 20px",
                                }}
                            >
                                There are no remaining
                                quantities available for
                                this sale.
                            </p>

                            <Link
                                href={route(
                                    "admin.sales.show",
                                    sale.id
                                )}
                                style={styles.backButton}
                            >
                                ← Back to Sale
                            </Link>

                        </div>

                    ) : (

                        <form
                            onSubmit={submitReturn}
                        >

                            <div
                                style={styles.layout}
                                className="sale-return-layout"
                            >

                                {/* =================================================
                                    PRODUCTS
                                ================================================= */}

                                <div style={styles.card}>

                                    <div
                                        style={
                                            styles.cardHeader
                                        }
                                    >

                                        <div
                                            style={
                                                styles.cardHeaderRow
                                            }
                                        >

                                            <div>

                                                <span
                                                    style={
                                                        styles.eyebrow
                                                    }
                                                >
                                                    PRODUCTS
                                                </span>

                                                <h2
                                                    style={
                                                        styles.cardTitle
                                                    }
                                                >
                                                    Select Items
                                                </h2>

                                                <p
                                                    style={
                                                        styles.helperText
                                                    }
                                                >
                                                    Choose how many
                                                    units the customer
                                                    is returning.
                                                </p>

                                            </div>

                                            <div
                                                style={
                                                    styles.headerButtons
                                                }
                                            >

                                                <button
                                                    type="button"
                                                    style={
                                                        styles.smallButton
                                                    }
                                                    onClick={
                                                        selectAll
                                                    }
                                                >
                                                    Select All
                                                </button>

                                                <button
                                                    type="button"
                                                    style={
                                                        styles.smallButton
                                                    }
                                                    onClick={
                                                        clearSelection
                                                    }
                                                >
                                                    Clear
                                                </button>

                                            </div>

                                        </div>

                                    </div>


                                    <div
                                        style={
                                            styles.products
                                        }
                                    >

                                        {sale.items.map(
                                            (
                                                item,
                                                index
                                            ) => {

                                                const quantity =
                                                    Number(
                                                        data
                                                            .items[
                                                            index
                                                        ]
                                                            ?.quantity ||
                                                        0
                                                    );

                                                const available =
                                                    Number(
                                                        item.quantity_available ||
                                                        0
                                                    );

                                                const refund =
                                                    quantity *
                                                    Number(
                                                        item.unit_price ||
                                                        0
                                                    );

                                                return (

                                                    <div
                                                        key={
                                                            item.id
                                                        }
                                                        style={
                                                            {
                                                                ...styles.product,
                                                                borderBottom:
                                                                    index ===
                                                                    sale
                                                                        .items
                                                                        .length -
                                                                        1
                                                                        ? "none"
                                                                        : "1px solid #f1f5f9",
                                                            }
                                                        }
                                                    >

                                                        {/* IMAGE */}

                                                        <div
                                                            style={
                                                                styles.image
                                                            }
                                                        >

                                                            {item
                                                                .product
                                                                ?.image ? (

                                                                <img
                                                                    src={`/storage/${item.product.image}`}
                                                                    alt={
                                                                        item
                                                                            .product
                                                                            ?.name ||
                                                                        "Product"
                                                                    }
                                                                    style={
                                                                        styles.imageImg
                                                                    }
                                                                />

                                                            ) : (

                                                                <span>
                                                                    📦
                                                                </span>

                                                            )}

                                                        </div>


                                                        {/* INFO */}

                                                        <div>

                                                            <strong
                                                                style={
                                                                    styles.productName
                                                                }
                                                            >
                                                                {
                                                                    item
                                                                        .product
                                                                        ?.name
                                                                }
                                                            </strong>

                                                            <span
                                                                style={
                                                                    styles.sku
                                                                }
                                                            >
                                                                SKU:{" "}
                                                                {
                                                                    item
                                                                        .product
                                                                        ?.sku ||
                                                                    "-"
                                                                }
                                                            </span>

                                                            <div
                                                                style={
                                                                    styles.productMeta
                                                                }
                                                            >

                                                                <span>
                                                                    Sold:{" "}
                                                                    <strong>
                                                                        {
                                                                            item.quantity_sold
                                                                        }
                                                                    </strong>
                                                                </span>

                                                                <span>
                                                                    Returned:{" "}
                                                                    <strong>
                                                                        {
                                                                            item.quantity_returned
                                                                        }
                                                                    </strong>
                                                                </span>

                                                                <span
                                                                    style={
                                                                        styles.available
                                                                    }
                                                                >
                                                                    Available:{" "}
                                                                    {
                                                                        available
                                                                    }
                                                                </span>

                                                            </div>

                                                        </div>


                                                        {/* QUANTITY */}

                                                        <div>

                                                            <div
                                                                style={
                                                                    styles.quantityControl
                                                                }
                                                            >

                                                                <button
                                                                    type="button"
                                                                    style={
                                                                        styles.quantityButton
                                                                    }
                                                                    onClick={() =>
                                                                        decreaseQuantity(
                                                                            index
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        quantity <=
                                                                        0
                                                                    }
                                                                >
                                                                    −
                                                                </button>

                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    max={
                                                                        available
                                                                    }
                                                                    step="1"
                                                                    value={
                                                                        quantity
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        updateQuantity(
                                                                            index,
                                                                            event
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    style={
                                                                        styles.quantityInput
                                                                    }
                                                                />

                                                                <button
                                                                    type="button"
                                                                    style={
                                                                        styles.quantityButton
                                                                    }
                                                                    onClick={() =>
                                                                        increaseQuantity(
                                                                            index
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        quantity >=
                                                                        available
                                                                    }
                                                                >
                                                                    +
                                                                </button>

                                                            </div>

                                                            {quantity >
                                                                0 && (

                                                                <span
                                                                    style={
                                                                        styles.productRefund
                                                                    }
                                                                >
                                                                    TZS{" "}
                                                                    {formatMoney(
                                                                        refund
                                                                    )}
                                                                </span>

                                                            )}

                                                        </div>

                                                    </div>
                                                );
                                            }
                                        )}

                                    </div>

                                </div>


                                {/* =================================================
                                    RETURN SUMMARY
                                ================================================= */}

                                <div
                                    style={
                                        styles.formCard
                                    }
                                >

                                    <div
                                        style={
                                            styles.cardHeader
                                        }
                                    >

                                        <span
                                            style={
                                                styles.eyebrow
                                            }
                                        >
                                            RETURN
                                        </span>

                                        <h2
                                            style={
                                                styles.cardTitle
                                            }
                                        >
                                            Return Summary
                                        </h2>

                                    </div>


                                    <div
                                        style={
                                            styles.formBody
                                        }
                                    >

                                        {/* Refund Method */}

                                        <div
                                            style={
                                                styles.field
                                            }
                                        >

                                            <label
                                                style={
                                                    styles.label
                                                }
                                            >
                                                Refund Method
                                            </label>

                                            <div
                                                style={
                                                    styles.methods
                                                }
                                            >

                                                {[
                                                    [
                                                        "cash",
                                                        "💵 Cash",
                                                    ],
                                                    [
                                                        "mobile_money",
                                                        "📱 Mobile Money",
                                                    ],
                                                    [
                                                        "bank",
                                                        "🏦 Bank",
                                                    ],
                                                    [
                                                        "credit",
                                                        "📒 Credit",
                                                    ],
                                                ].map(
                                                    (method) => (

                                                        <label
                                                            key={
                                                                method[0]
                                                            }
                                                            style={{
                                                                ...styles.method,
                                                                ...(data.refund_method ===
                                                                method[0]
                                                                    ? styles.methodActive
                                                                    : {}),
                                                            }}
                                                        >

                                                            <input
                                                                type="radio"
                                                                name="refund_method"
                                                                value={
                                                                    method[0]
                                                                }
                                                                checked={
                                                                    data.refund_method ===
                                                                    method[0]
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    setData(
                                                                        "refund_method",
                                                                        event
                                                                            .target
                                                                            .value
                                                                    )
                                                                }
                                                                style={
                                                                    styles.methodRadio
                                                                }
                                                            />

                                                            <span
                                                                style={
                                                                    styles.methodText
                                                                }
                                                            >
                                                                {
                                                                    method[1]
                                                                }
                                                            </span>

                                                        </label>

                                                    )
                                                )}

                                            </div>

                                            {errors.refund_method && (
                                                <div
                                                    style={
                                                        styles.error
                                                    }
                                                >
                                                    {
                                                        errors.refund_method
                                                    }
                                                </div>
                                            )}

                                        </div>


                                        {/* Reason */}

                                        <div
                                            style={
                                                styles.field
                                            }
                                        >

                                            <label
                                                style={
                                                    styles.label
                                                }
                                            >
                                                Reason
                                                <span
                                                    style={{
                                                        color:
                                                            "#94a3b8",
                                                        fontWeight:
                                                            "500",
                                                        marginLeft:
                                                            "5px",
                                                    }}
                                                >
                                                    Optional
                                                </span>
                                            </label>

                                            <textarea
                                                value={
                                                    data.reason
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    setData(
                                                        "reason",
                                                        event
                                                            .target
                                                            .value
                                                    )
                                                }
                                                placeholder="e.g. Damaged product, wrong item, customer changed mind..."
                                                style={
                                                    styles.textarea
                                                }
                                            />

                                            {errors.reason && (
                                                <div
                                                    style={
                                                        styles.error
                                                    }
                                                >
                                                    {
                                                        errors.reason
                                                    }
                                                </div>
                                            )}

                                        </div>


                                        {/* Warning */}

                                        <div
                                            style={
                                                styles.warning
                                            }
                                        >

                                            <span>
                                                ⚠️
                                            </span>

                                            <span>
                                                Returned quantities
                                                will be added back
                                                to the product stock
                                                after this return is
                                                completed.
                                            </span>

                                        </div>


                                        {/* Summary */}

                                        <div
                                            style={
                                                styles.summary
                                            }
                                        >

                                            <div
                                                style={
                                                    styles.summaryRow
                                                }
                                            >

                                                <span
                                                    style={
                                                        styles.summaryRowLabel
                                                    }
                                                >
                                                    Products
                                                </span>

                                                <strong
                                                    style={
                                                        styles.summaryRowValue
                                                    }
                                                >
                                                    {
                                                        selectedItems.length
                                                    }
                                                </strong>

                                            </div>

                                            <div
                                                style={
                                                    styles.summaryRow
                                                }
                                            >

                                                <span
                                                    style={
                                                        styles.summaryRowLabel
                                                    }
                                                >
                                                    Quantity
                                                </span>

                                                <strong
                                                    style={
                                                        styles.summaryRowValue
                                                    }
                                                >
                                                    {
                                                        totalReturnQuantity
                                                    }
                                                </strong>

                                            </div>

                                        </div>


                                        {/* Refund */}

                                        <div
                                            style={
                                                styles.refundTotal
                                            }
                                        >

                                            <span
                                                style={
                                                    styles.refundLabel
                                                }
                                            >
                                                TOTAL REFUND
                                            </span>

                                            <strong
                                                style={
                                                    styles.refundAmount
                                                }
                                            >
                                                TZS{" "}
                                                {formatMoney(
                                                    refundTotal
                                                )}
                                            </strong>

                                        </div>


                                        {/* Submit */}

                                        <button
                                            type="submit"
                                            disabled={
                                                processing ||
                                                totalReturnQuantity <=
                                                    0
                                            }
                                            style={{
                                                ...styles.submitButton,
                                                ...(processing ||
                                                totalReturnQuantity <=
                                                    0
                                                    ? styles.disabledButton
                                                    : {}),
                                            }}
                                        >
                                            {processing
                                                ? "Processing Return..."
                                                : "↩ Process Return"}
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </form>

                    )}


                    {/* =====================================================
                        FOOTER
                    ===================================================== */}

                    <div style={styles.footer}>

                        <strong
                            style={
                                styles.footerBrand
                            }
                        >
                            MauzoVibe
                        </strong>

                        <span>
                            Smart Sales Management
                        </span>

                        <span>•</span>

                        <span>
                            Return for #
                            {sale.id}
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

                    @media (max-width: 1050px) {

                        .sale-return-layout {
                            grid-template-columns: 1fr !important;
                        }

                    }


                    @media (max-width: 800px) {

                        .sale-return-summary {
                            grid-template-columns:
                                1fr 1fr !important;
                        }

                    }


                    @media (max-width: 640px) {

                        .sale-return-page {
                            padding: 14px !important;
                        }

                        .sale-return-page h1 {
                            font-size: 24px !important;
                        }

                        .sale-return-page
                        .sale-return-summary {
                            grid-template-columns:
                                1fr !important;
                        }

                        .sale-return-page
                        .sale-return-layout {
                            gap: 14px !important;
                        }

                        .sale-return-page
                        .card-header {
                            padding: 16px !important;
                        }

                    }


                    @media (max-width: 560px) {

                        .sale-return-page
                        .product {
                            grid-template-columns:
                                48px minmax(0, 1fr) !important;
                            gap: 10px !important;
                        }

                        .sale-return-page
                        .product
                        > div:last-child {
                            grid-column: 1 / -1;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding-top: 5px;
                        }

                        .sale-return-page
                        .product
                        > div:last-child
                        > span {
                            margin-top: 0 !important;
                        }

                        .sale-return-page
                        .quantity-control {
                            display: flex;
                        }

                    }


                    @media (max-width: 420px) {

                        .sale-return-page {
                            padding: 10px !important;
                        }

                        .sale-return-page
                        .header-buttons {
                            width: 100%;
                        }

                        .sale-return-page
                        .product {
                            padding: 13px 0 !important;
                        }

                    }


                    @media print {

                        body {
                            background: #ffffff !important;
                        }

                        nav,
                        aside,
                        header,
                        button,
                        a {
                            display: none !important;
                        }

                        .sale-return-page {
                            padding: 0 !important;
                            background: #ffffff !important;
                        }

                    }

                `}</style>

            </div>

        </AdminLayout>
    );
}