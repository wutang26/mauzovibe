
import React, { useMemo, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import "./Sales.css";

export default function Create({ products = [] }) {
    const [search, setSearch] = useState("");
    const [cart, setCart] = useState([]);
   const [showProducts, setShowProducts] = useState(true);
   const [saleSuccess, setSaleSuccess] = useState(null);

   const {
    data,
    setData,
    transform,
    post,
    processing,
    errors,
    reset,
}  = useForm({
        items: [],
        discount: 0,
        payment_method: "cash",
        paid_amount: "",
        customer_id: "",
    });

    /*
    |--------------------------------------------------------------------------
    | Search Products
    |--------------------------------------------------------------------------
    */

    const filteredProducts = useMemo(() => {
        const term = search.trim().toLowerCase();

        if (!term) {
            return products;
        }

        return products.filter((product) => {
            return (
                product.name?.toLowerCase().includes(term) ||
                product.sku?.toLowerCase().includes(term) ||
                product.barcode?.toLowerCase().includes(term)
            );
        });
    }, [products, search]);

    /*
    |--------------------------------------------------------------------------
    | Cart Calculations
    |--------------------------------------------------------------------------
    */

    const subtotal = useMemo(() => {
        return cart.reduce((total, item) => {
            return total + item.quantity * Number(item.selling_price);
        }, 0);
    }, [cart]);

    const discount = Number(data.discount) || 0;

    const total = Math.max(0, subtotal - discount);

    const paidAmount = Number(data.paid_amount) || 0;

    const changeAmount = Math.max(0, paidAmount - total);

    /*
    |--------------------------------------------------------------------------
    | Add Product
    |--------------------------------------------------------------------------
    */

    const addProduct = (product) => {
        if (Number(product.quantity) <= 0) {
            alert(`${product.name} is out of stock.`);
            return;
        }

        const existing = cart.find(
            (item) => item.id === product.id
        );

        if (existing) {
            if (existing.quantity >= Number(product.quantity)) {
                alert(
                    `You cannot sell more than the available stock of ${product.name}.`
                );
                return;
            }

            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? {
                              ...item,
                              quantity: item.quantity + 1,
                          }
                        : item
                )
            );

            return;
        }

        setCart([
            ...cart,
            {
                id: product.id,
                name: product.name,
                sku: product.sku,
                barcode: product.barcode,
                selling_price: Number(product.selling_price),
                available_stock: Number(product.quantity),
                unit: product.unit,
                image: product.image,
                quantity: 1,
            },
        ]);

        setSearch("");
    };

    /*
    |--------------------------------------------------------------------------
    | Increase Quantity
    |--------------------------------------------------------------------------
    */

    const increaseQuantity = (productId) => {
        setCart(
            cart.map((item) => {
                if (item.id !== productId) {
                    return item;
                }

                if (item.quantity >= item.available_stock) {
                    alert(
                        `Only ${item.available_stock} ${item.unit || "units"} available.`
                    );

                    return item;
                }

                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            })
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Decrease Quantity
    |--------------------------------------------------------------------------
    */

    const decreaseQuantity = (productId) => {
        setCart(
            cart
                .map((item) => {
                    if (item.id !== productId) {
                        return item;
                    }

                    return {
                        ...item,
                        quantity: item.quantity - 1,
                    };
                })
                .filter((item) => item.quantity > 0)
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Remove Item
    |--------------------------------------------------------------------------
    */

    const removeItem = (productId) => {
        setCart(
            cart.filter((item) => item.id !== productId)
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Clear Cart
    |--------------------------------------------------------------------------
    */

    const clearCart = () => {
        if (cart.length === 0) {
            return;
        }

        if (
            window.confirm(
                "Are you sure you want to clear the current sale?"
            )
        ) {
            setCart([]);
            setData("paid_amount", "");
            setData("discount", 0);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Payment Method
    |--------------------------------------------------------------------------
    */

    const handlePaymentMethod = (method) => {
        setData("payment_method", method);

        if (method === "credit") {
            setData("paid_amount", 0);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Complete Sale
    |--------------------------------------------------------------------------
    */

const submitSale = (event) => {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Please add at least one product to the sale.");
        return;
    }

    if (discount > subtotal) {
        alert("Discount cannot be greater than the subtotal.");
        return;
    }

    if (
        data.payment_method !== "credit" &&
        paidAmount < total
    ) {
        alert(
            `Paid amount must be at least TZS ${formatMoney(total)}.`
        );
        return;
    }

    /*
    |--------------------------------------------------------------------------
    | Prepare Sale Items
    |--------------------------------------------------------------------------
    */

    const saleItems = cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
    }));

    /*
    |--------------------------------------------------------------------------
    | Transform Form Data Before Sending
    |--------------------------------------------------------------------------
    |
    | IMPORTANT:
    | transform() belongs to useForm.
    | It must be called BEFORE post().
    |
    */

    transform((formData) => ({
        ...formData,

        items: saleItems,

        discount: discount,

        payment_method: data.payment_method,

        paid_amount:
            data.payment_method === "credit"
                ? 0
                : paidAmount,

        customer_id: data.customer_id || null,
    }));

    /*
    |--------------------------------------------------------------------------
    | Submit Sale
    |--------------------------------------------------------------------------
    */

    post(route("admin.sales.store"), {
        preserveScroll: true,

        onSuccess: () => {
    setSaleSuccess({
        message: "Sale Completed Successfully!",
        amount: total,
    });

    setCart([]);
    setSearch("");

    reset();

    setTimeout(() => {
        setSaleSuccess(null);
    }, 4000);
},

        onError: (errors) => {
            console.log("Sale validation errors:", errors);
        },
    });
};


    /*
    |--------------------------------------------------------------------------
    | Format Currency
    |--------------------------------------------------------------------------
    */

    const formatMoney = (amount) => {
        return new Intl.NumberFormat("en-TZ", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(Number(amount) || 0);
    };

    /*
    |--------------------------------------------------------------------------
    | Product Image
    |--------------------------------------------------------------------------
    */

    const productImage = (image) => {
        if (!image) {
            return null;
        }

        return `/storage/${image}`;
    };

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <AdminLayout>
            {/* Success message */}
            {saleSuccess && (
    <div className="sale-success-overlay">
        <div className="sale-success-modal">

            <div className="success-flower">
                🌸
            </div>

            <div className="success-check">
                ✓
            </div>

            <h2>
                Sale Completed Successfully!
            </h2>

            <p className="success-congratulation">
                Hongera! 🎉
            </p>

            <p className="success-message">
                Your sale has been completed successfully.
            </p>

            <div className="success-amount">
                TZS {formatMoney(saleSuccess.amount)}
            </div>

            <p className="success-thank-you">
                Keep up the great work! 🌸
            </p>

            <button
                type="button"
                className="success-close-button"
                onClick={() => setSaleSuccess(null)}
            >
                Continue Selling
            </button>

        </div>
    </div>
)}

            <Head title="New Sale" />

            <div className="sales-page">

                {/* Header */}
                <div className="sales-header">

                    <div>
                        <h1>New Sale</h1>

                        <p>
                            Create a new customer sale
                        </p>
                    </div>

                    <div className="sales-header-actions">

                        <div className="cart-counter">
                            <span>Items</span>

                            <strong>
                                {cart.reduce(
                                    (sum, item) =>
                                        sum + item.quantity,
                                    0
                                )}
                            </strong>
                        </div>

                        <button
                            type="button"
                            className="clear-cart-button"
                            onClick={clearCart}
                            disabled={cart.length === 0}
                        >
                            Clear Sale
                        </button>

                    </div>
                </div>

                <div className="sales-layout">

                    {/* =====================================================
                        PRODUCTS SECTION
                    ====================================================== */}

                    <section className="products-panel">

                        <div className="panel-header">

                            <div>
                                <h2>Products</h2>

                                <span>
                                    {products.length} products available
                                </span>
                            </div>

                        </div>

                        {/* Search */}

                        <div className="product-search">

                            <span className="search-icon">
                                🔍
                            </span>

                            <input
                                type="text"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                onFocus={() =>
                                    setShowProducts(true)
                                }
                                placeholder="Search product, SKU or scan barcode..."
                                autoFocus
                            />

                            {search && (
                                <button
                                    type="button"
                                    className="clear-search"
                                    onClick={() => setSearch("")}
                                >
                                    ×
                                </button>
                            )}

                        </div>

                        {/* Products */}

                        {showProducts && (
                            <div className="products-grid">

                                {filteredProducts.length === 0 ? (

                                    <div className="empty-products">

                                        <div className="empty-icon">
                                            📦
                                        </div>

                                        <h3>
                                            No products found
                                        </h3>

                                        <p>
                                            Try another product name,
                                            SKU or barcode.
                                        </p>

                                    </div>

                                ) : (

                                    filteredProducts.map((product) => {

                                        const stock =
                                            Number(product.quantity) || 0;

                                        const inCart =
                                            cart.find(
                                                (item) =>
                                                    item.id === product.id
                                            );

                                        const cartQuantity =
                                            inCart?.quantity || 0;

                                        const remainingStock =
                                            stock - cartQuantity;

                                        const outOfStock =
                                            stock <= 0;

                                        return (
                                            <button
                                                type="button"
                                                key={product.id}
                                                className={`product-card ${
                                                    outOfStock
                                                        ? "out-of-stock"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    addProduct(product)
                                                }
                                                disabled={outOfStock}
                                            >

                                                <div className="product-image">

                                                    {productImage(
                                                        product.image
                                                    ) ? (

                                                        <img
                                                            src={productImage(
                                                                product.image
                                                            )}
                                                            alt={
                                                                product.name
                                                            }
                                                        />

                                                    ) : (

                                                        <span>
                                                            📦
                                                        </span>

                                                    )}

                                                </div>

                                                <div className="product-info">

                                                    <h3>
                                                        {product.name}
                                                    </h3>

                                                    {product.sku && (
                                                        <small>
                                                            SKU:{" "}
                                                            {product.sku}
                                                        </small>
                                                    )}

                                                    {product.barcode && (
                                                        <small>
                                                            Barcode:{" "}
                                                            {
                                                                product.barcode
                                                            }
                                                        </small>
                                                    )}

                                                    <div className="product-bottom">

                                                        <strong>
                                                            TZS{" "}
                                                            {formatMoney(
                                                                product.selling_price
                                                            )}
                                                        </strong>

                                                        <span
                                                            className={
                                                                remainingStock <=
                                                                0
                                                                    ? "stock-danger"
                                                                    : "stock-ok"
                                                            }
                                                        >
                                                            Stock:{" "}
                                                            {remainingStock}
                                                        </span>

                                                    </div>

                                                </div>

                                                <span className="add-product">
                                                    +
                                                </span>

                                            </button>
                                        );
                                    })
                                )}

                            </div>
                        )}

                    </section>

                    {/* =====================================================
                        CART SECTION
                    ====================================================== */}

                    <section className="cart-panel">

                        <div className="panel-header">

                            <div>
                                <h2>Current Sale</h2>

                                <span>
                                    {cart.length} product
                                    {cart.length !== 1
                                        ? "s"
                                        : ""}
                                </span>
                            </div>

                        </div>

                        {/* Cart Items */}

                        <div className="cart-items">

                            {cart.length === 0 ? (

                                <div className="empty-cart">

                                    <div className="empty-cart-icon">
                                        🛒
                                    </div>

                                    <h3>
                                        Cart is empty
                                    </h3>

                                    <p>
                                        Select products from the left
                                        to start a sale.
                                    </p>

                                </div>

                            ) : (

                                cart.map((item) => (

                                    <div
                                        className="cart-item"
                                        key={item.id}
                                    >

                                        <div className="cart-item-image">

                                            {productImage(
                                                item.image
                                            ) ? (

                                                <img
                                                    src={productImage(
                                                        item.image
                                                    )}
                                                    alt={item.name}
                                                />

                                            ) : (

                                                <span>
                                                    📦
                                                </span>

                                            )}

                                        </div>

                                        <div className="cart-item-details">

                                            <h3>
                                                {item.name}
                                            </h3>

                                            <span>
                                                TZS{" "}
                                                {formatMoney(
                                                    item.selling_price
                                                )}{" "}
                                                /{" "}
                                                {item.unit || "unit"}
                                            </span>

                                            <div className="quantity-controls">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        decreaseQuantity(
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    −
                                                </button>

                                                <strong>
                                                    {item.quantity}
                                                </strong>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        increaseQuantity(
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>

                                            </div>

                                        </div>

                                        <div className="cart-item-total">

                                            <strong>
                                                TZS{" "}
                                                {formatMoney(
                                                    item.quantity *
                                                        item.selling_price
                                                )}
                                            </strong>

                                            <button
                                                type="button"
                                                className="remove-item"
                                                onClick={() =>
                                                    removeItem(
                                                        item.id
                                                    )
                                                }
                                            >
                                                ×
                                            </button>

                                        </div>

                                    </div>

                                ))

                            )}

                        </div>

                        {/* Sale Summary */}

                        <form
                            onSubmit={submitSale}
                            className="sale-summary"
                        >

                            <div className="summary-row">
                                <span>
                                    Subtotal
                                </span>

                                <strong>
                                    TZS {formatMoney(subtotal)}
                                </strong>
                            </div>

                            <div className="discount-field">

                                <label>
                                    Discount
                                </label>

                                <div className="discount-input">

                                    <span>
                                        TZS
                                    </span>

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.discount}
                                        onChange={(event) =>
                                            setData(
                                                "discount",
                                                event.target.value
                                            )
                                        }
                                    />

                                </div>

                            </div>

                            <div className="summary-total">

                                <span>
                                    Total
                                </span>

                                <strong>
                                    TZS {formatMoney(total)}
                                </strong>

                            </div>

                            {/* Payment */}

                            <div className="payment-section">

                                <h3>
                                    Payment Method
                                </h3>

                                <div className="payment-methods">

                                    <button
                                        type="button"
                                        className={
                                            data.payment_method ===
                                            "cash"
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            handlePaymentMethod(
                                                "cash"
                                            )
                                        }
                                    >
                                        💵
                                        <span>
                                            Cash
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            data.payment_method ===
                                            "mobile_money"
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            handlePaymentMethod(
                                                "mobile_money"
                                            )
                                        }
                                    >
                                        📱
                                        <span>
                                            Mobile
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            data.payment_method ===
                                            "bank"
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            handlePaymentMethod(
                                                "bank"
                                            )
                                        }
                                    >
                                        🏦
                                        <span>
                                            Bank
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            data.payment_method ===
                                            "credit"
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            handlePaymentMethod(
                                                "credit"
                                            )
                                        }
                                    >
                                        📒
                                        <span>
                                            Credit
                                        </span>
                                    </button>

                                </div>

                            </div>

                            {/* Paid Amount */}

                            {data.payment_method !== "credit" && (
                                <div className="paid-field">

                                    <label>
                                        Amount Paid
                                    </label>

                                    <div className="paid-input">

                                        <span>
                                            TZS
                                        </span>

                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={
                                                data.paid_amount
                                            }
                                            onChange={(event) =>
                                                setData(
                                                    "paid_amount",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="0"
                                        />

                                    </div>

                                </div>
                            )}

                            {/* Change */}

                            {data.payment_method !== "credit" && (
                                <div className="change-row">

                                    <span>
                                        Change
                                    </span>

                                    <strong>
                                        TZS{" "}
                                        {formatMoney(
                                            changeAmount
                                        )}
                                    </strong>

                                </div>
                            )}

                            {/* Errors */}

                            {Object.keys(errors).length > 0 && (

                                <div className="sale-errors">

                                    {Object.values(errors).map(
                                        (error, index) => (
                                            <p key={index}>
                                                {error}
                                            </p>
                                        )
                                    )}

                                </div>

                            )}

                            {/* Complete */}

                            <button
                                type="submit"
                                className="complete-sale-button"
                                disabled={
                                    processing ||
                                    cart.length === 0
                                }
                            >

                                {processing
                                    ? "Processing Sale..."
                                    : "✓ Complete Sale"}

                            </button>

                        </form>

                    </section>

                </div>

            </div>
        </AdminLayout>
    );
}

