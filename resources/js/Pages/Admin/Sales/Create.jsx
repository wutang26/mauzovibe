
import React, { useEffect, useMemo, useRef, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Html5Qrcode } from "html5-qrcode";
import "./Sales.css";

export default function Create({ products = [] }) {
    const [search, setSearch] = useState("");
    const [cart, setCart] = useState([]);
    const [showProducts, setShowProducts] = useState(true);
    const [saleSuccess, setSaleSuccess] = useState(null);
    const [scannerFeedback, setScannerFeedback] = useState(null);

    // Barcode scanner states
    const [cameraOpen, setCameraOpen] = useState(false);
    const [cameraError, setCameraError] = useState("");
    const [cameraStarting, setCameraStarting] = useState(false);

    const searchInputRef = useRef(null);
    const scannerRef = useRef(null);
    const cameraScanHandledRef = useRef(false);

    const {
        data,
        setData,
        transform,
        post,
        processing,
        errors,
        reset,
    } = useForm({
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

        if (!term) return products;

        return products.filter((product) => (
            product.name?.toLowerCase().includes(term) ||
            product.sku?.toLowerCase().includes(term) ||
            product.barcode?.toLowerCase().includes(term)
        ));
    }, [products, search]);

    /*
    |--------------------------------------------------------------------------
    | Cart Calculations
    |--------------------------------------------------------------------------
    */

    const subtotal = useMemo(() => {
        return cart.reduce(
            (total, item) =>
                total + item.quantity * Number(item.selling_price),
            0
        );
    }, [cart]);

    const discount = Number(data.discount) || 0;
    const total = Math.max(0, subtotal - discount);
    const paidAmount = Number(data.paid_amount) || 0;
    const changeAmount = Math.max(0, paidAmount - total);

    /*
    |--------------------------------------------------------------------------
    | Barcode Lookup
    |--------------------------------------------------------------------------
    */

    const handleBarcode = (barcode) => {
        const scannedBarcode = String(barcode || "").trim();

        if (!scannedBarcode) return;

        const product = products.find(
            (item) =>
                String(item.barcode || "").trim().toLowerCase() ===
                scannedBarcode.toLowerCase()
        );

        if (!product) {
            setScannerFeedback({
                type: "error",
                message: `Product not found: ${scannedBarcode}`,
            });
            return;
        }

        addProduct(product);
    };

    /*
    |--------------------------------------------------------------------------
    | Add Product
    |--------------------------------------------------------------------------
    */

    const addProduct = (product) => {
        const availableStock = Number(product.quantity) || 0;

        if (availableStock <= 0) {
            setScannerFeedback({
                type: "error",
                message: `${product.name} is out of stock.`,
            });
            return false;
        }

        const existing = cart.find((item) => item.id === product.id);

        if (existing) {
            if (existing.quantity >= availableStock) {
                setScannerFeedback({
                    type: "error",
                    message: `Stock limit reached for ${product.name}.`,
                });
                return false;
            }

            setCart((previousCart) =>
                previousCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );

            setScannerFeedback({
                type: "success",
                message: `${product.name} quantity increased.`,
            });

            return true;
        }

        setCart((previousCart) => [
            ...previousCart,
            {
                id: product.id,
                name: product.name,
                sku: product.sku,
                barcode: product.barcode,
                selling_price: Number(product.selling_price),
                available_stock: availableStock,
                unit: product.unit,
                image: product.image,
                quantity: 1,
            },
        ]);

        setSearch("");

        setScannerFeedback({
            type: "success",
            message: `${product.name} added to cart.`,
        });

        return true;
    };

    /*
    |--------------------------------------------------------------------------
    | USB Barcode Scanner
    |--------------------------------------------------------------------------
    */

    const focusUsbScanner = () => {
        searchInputRef.current?.focus();
        setScannerFeedback({
            type: "success",
            message: "USB scanner is ready. Scan a product barcode.",
        });
    };

    const handleScannerKeyDown = (event) => {
        if (event.key !== "Enter") return;

        event.preventDefault();

        const scannedBarcode = search.trim();

        if (!scannedBarcode) return;

        handleBarcode(scannedBarcode);
    };

    /*
    |--------------------------------------------------------------------------
    | Mobile Camera Barcode Scanner
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!cameraOpen) return;

        let cancelled = false;

        const startCamera = async () => {
            setCameraStarting(true);
            setCameraError("");
            cameraScanHandledRef.current = false;

            if (!window.isSecureContext) {
                setCameraError(
                    "Camera requires HTTPS. Open MauzoVibe using a secure HTTPS address."
                );
                setCameraStarting(false);
                return;
            }

            try {
                const scanner = new Html5Qrcode("barcode-camera-reader");
                scannerRef.current = scanner;

                await scanner.start(
                    { facingMode: "environment" },
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 180 },
                        aspectRatio: 1.5,
                    },
                    (decodedText) => {
                        if (cancelled || cameraScanHandledRef.current) {
                            return;
                        }

                        cameraScanHandledRef.current = true;
                        setCameraOpen(false);
                        handleBarcode(decodedText);
                    },
                    () => {
                        // Normal scanning frame; no action is needed.
                    }
                );

                if (cancelled) {
                    if (scanner.isScanning) {
                        await scanner.stop();
                    }
                    scanner.clear();
                    return;
                }

                setCameraStarting(false);
            } catch (error) {
                if (!cancelled) {
                    setCameraStarting(false);
                    setCameraError(
                        error?.message ||
                        "Unable to start camera. Check camera permission and try again."
                    );
                }
            }
        };

        startCamera();

        return () => {
            cancelled = true;

            const scanner = scannerRef.current;
            scannerRef.current = null;

            if (scanner) {
                if (scanner.isScanning) {
                    scanner.stop()
                        .then(() => scanner.clear())
                        .catch(() => {});
                } else {
                    try {
                        scanner.clear();
                    } catch {
                        // Scanner may already have been cleared.
                    }
                }
            }
        };
    }, [cameraOpen]);

    const openCameraScanner = () => {
        setCameraError("");
        setCameraOpen(true);
    };

    const closeCameraScanner = () => {
        setCameraOpen(false);
        setCameraStarting(false);
    };

    /*
    |--------------------------------------------------------------------------
    | Increase Quantity
    |--------------------------------------------------------------------------
    */

    const increaseQuantity = (productId) => {
        const item = cart.find((product) => product.id === productId);

        if (!item) return;

        if (item.quantity >= item.available_stock) {
            setScannerFeedback({
                type: "error",
                message: `Only ${item.available_stock} ${item.unit || "units"} available.`,
            });
            return;
        }

        setCart((previousCart) =>
            previousCart.map((product) =>
                product.id === productId
                    ? { ...product, quantity: product.quantity + 1 }
                    : product
            )
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Decrease Quantity
    |--------------------------------------------------------------------------
    */

    const decreaseQuantity = (productId) => {
        setCart((previousCart) =>
            previousCart
                .map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Remove Item
    |--------------------------------------------------------------------------
    */

    const removeItem = (productId) => {
        setCart((previousCart) =>
            previousCart.filter((item) => item.id !== productId)
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Clear Cart
    |--------------------------------------------------------------------------
    */

    const clearCart = () => {
        if (cart.length === 0) return;

        if (window.confirm("Are you sure you want to clear the current sale?")) {
            setCart([]);
            setSearch("");
            setScannerFeedback(null);
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
        if (!image) return null;
        return `/storage/${image}`;
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

        if (data.payment_method !== "credit" && paidAmount < total) {
            alert(
                `Paid amount must be at least TZS ${formatMoney(total)}.`
            );
            return;
        }

        const saleItems = cart.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
        }));

        transform((formData) => ({
            ...formData,
            items: saleItems,
            discount,
            payment_method: data.payment_method,
            paid_amount: data.payment_method === "credit" ? 0 : paidAmount,
            customer_id: data.customer_id || null,
        }));

        post(route("admin.sales.store"), {
            preserveScroll: true,

            onSuccess: () => {
                setSaleSuccess({
                    message: "Sale Completed Successfully!",
                    amount: total,
                });

                setCart([]);
                setSearch("");
                setScannerFeedback(null);

                reset();

                setTimeout(() => setSaleSuccess(null), 4000);
            },

            onError: (saleErrors) => {
                console.log("Sale validation errors:", saleErrors);
            },
        });
    };

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <AdminLayout>
            {saleSuccess && (
                <div className="sale-success-overlay">
                    <div className="sale-success-modal">
                        <div className="success-flower">🌸</div>
                        <div className="success-check">✓</div>

                        <h2>Sale Completed Successfully!</h2>

                        <p className="success-congratulation">Hongera! 🎉</p>

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

            {/* Camera Scanner Modal */}
            {cameraOpen && (
                <div className="barcode-camera-overlay">
                    <div className="barcode-camera-modal">
                        <div className="barcode-camera-header">
                            <div>
                                <h2>Scan Product Barcode</h2>
                                <p>Point your camera at the product barcode.</p>
                            </div>

                            <button
                                type="button"
                                onClick={closeCameraScanner}
                                aria-label="Close camera"
                            >
                                ×
                            </button>
                        </div>

                        <div
                            id="barcode-camera-reader"
                            className="barcode-camera-reader"
                        />

                        {cameraStarting && (
                            <p className="camera-status">
                                Starting camera...
                            </p>
                        )}

                        {cameraError && (
                            <div className="camera-error">
                                {cameraError}
                            </div>
                        )}

                        <p className="camera-help">
                            Keep the barcode inside the camera scanning area.
                            The product will be added automatically when detected.
                        </p>

                        <button
                            type="button"
                            className="camera-close-button"
                            onClick={closeCameraScanner}
                        >
                            Close Camera
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
                        <p>Create a new customer sale</p>
                    </div>

                    <div className="sales-header-actions">
                        <div className="cart-counter">
                            <span>Items</span>
                            <strong>
                                {cart.reduce(
                                    (sum, item) => sum + item.quantity,
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
                    {/* PRODUCTS SECTION */}
                    <section className="products-panel">
                        <div className="panel-header">
                            <div>
                                <h2>Products</h2>
                                <span>
                                    {products.length} products available
                                </span>
                            </div>
                        </div>

                        {/* Scanner Options */}
                        <div className="barcode-scanner-options">
                            <div className="barcode-scanner-title">
                                <span className="barcode-scanner-icon">▥</span>
                                <div>
                                    <strong>Barcode Scanner</strong>
                                    <small>Choose how to scan products</small>
                                </div>
                            </div>

                            <div className="barcode-scanner-buttons">
                                <button
                                    type="button"
                                    className="usb-scanner-button"
                                    onClick={focusUsbScanner}
                                >
                                    <span>⌨</span>
                                    USB Scanner
                                </button>

                                <button
                                    type="button"
                                    className="camera-scanner-button"
                                    onClick={openCameraScanner}
                                >
                                    <span>▣</span>
                                    Scan with Camera
                                </button>
                            </div>
                        </div>

                        {/* Search and USB Barcode Input */}
                        <div className="product-search">
                            <span className="search-icon">🔍</span>

                            <input
                                ref={searchInputRef}
                                type="text"
                                value={search}
                                onChange={(event) => {
                                    setSearch(event.target.value);
                                    setScannerFeedback(null);
                                    setShowProducts(true);
                                }}
                                onKeyDown={handleScannerKeyDown}
                                onFocus={() => setShowProducts(true)}
                                placeholder="Search product, SKU or scan barcode..."
                                autoFocus
                            />

                            {search && (
                                <button
                                    type="button"
                                    className="clear-search"
                                    onClick={() => {
                                        setSearch("");
                                        setScannerFeedback(null);
                                        searchInputRef.current?.focus();
                                    }}
                                >
                                    ×
                                </button>
                            )}
                        </div>

                        {scannerFeedback && (
                            <div
                                className={`scanner-feedback ${scannerFeedback.type}`}
                                role="status"
                            >
                                {scannerFeedback.type === "success" ? "✓ " : "⚠ "}
                                {scannerFeedback.message}
                            </div>
                        )}

                        {/* Products */}
                        {showProducts && (
                            <div className="products-grid">
                                {filteredProducts.length === 0 ? (
                                    <div className="empty-products">
                                        <div className="empty-icon">📦</div>
                                        <h3>No products found</h3>
                                        <p>
                                            Try another product name, SKU or barcode.
                                        </p>
                                    </div>
                                ) : (
                                    filteredProducts.map((product) => {
                                        const stock = Number(product.quantity) || 0;
                                        const inCart = cart.find(
                                            (item) => item.id === product.id
                                        );
                                        const cartQuantity = inCart?.quantity || 0;
                                        const remainingStock = stock - cartQuantity;
                                        const outOfStock = stock <= 0;

                                        return (
                                            <button
                                                type="button"
                                                key={product.id}
                                                className={`product-card ${
                                                    outOfStock ? "out-of-stock" : ""
                                                }`}
                                                onClick={() => addProduct(product)}
                                                disabled={outOfStock}
                                            >
                                                <div className="product-image">
                                                    {productImage(product.image) ? (
                                                        <img
                                                            src={productImage(product.image)}
                                                            alt={product.name}
                                                        />
                                                    ) : (
                                                        <span>📦</span>
                                                    )}
                                                </div>

                                                <div className="product-info">
                                                    <h3>{product.name}</h3>

                                                    {product.sku && (
                                                        <small>SKU: {product.sku}</small>
                                                    )}

                                                    {product.barcode && (
                                                        <small>
                                                            Barcode: {product.barcode}
                                                        </small>
                                                    )}

                                                    <div className="product-bottom">
                                                        <strong>
                                                            TZS {formatMoney(product.selling_price)}
                                                        </strong>

                                                        <span
                                                            className={
                                                                remainingStock <= 0
                                                                    ? "stock-danger"
                                                                    : "stock-ok"
                                                            }
                                                        >
                                                            Stock: {remainingStock}
                                                        </span>
                                                    </div>
                                                </div>

                                                <span className="add-product">+</span>
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                        )}
                    </section>

                    {/* CART SECTION */}
                    <section className="cart-panel">
                        <div className="panel-header">
                            <div>
                                <h2>Current Sale</h2>
                                <span>
                                    {cart.length} product{cart.length !== 1 ? "s" : ""}
                                </span>
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className="cart-items">
                            {cart.length === 0 ? (
                                <div className="empty-cart">
                                    <div className="empty-cart-icon">🛒</div>
                                    <h3>Cart is empty</h3>
                                    <p>
                                        Scan a barcode or select products to start a sale.
                                    </p>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div className="cart-item" key={item.id}>
                                        <div className="cart-item-image">
                                            {productImage(item.image) ? (
                                                <img
                                                    src={productImage(item.image)}
                                                    alt={item.name}
                                                />
                                            ) : (
                                                <span>📦</span>
                                            )}
                                        </div>

                                        <div className="cart-item-details">
                                            <h3>{item.name}</h3>

                                            <span>
                                                TZS {formatMoney(item.selling_price)} /{" "}
                                                {item.unit || "unit"}
                                            </span>

                                            <div className="quantity-controls">
                                                <button
                                                    type="button"
                                                    onClick={() => decreaseQuantity(item.id)}
                                                >
                                                    −
                                                </button>

                                                <strong>{item.quantity}</strong>

                                                <button
                                                    type="button"
                                                    onClick={() => increaseQuantity(item.id)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="cart-item-total">
                                            <strong>
                                                TZS{" "}
                                                {formatMoney(
                                                    item.quantity * item.selling_price
                                                )}
                                            </strong>

                                            <button
                                                type="button"
                                                className="remove-item"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Sale Summary */}
                        <form onSubmit={submitSale} className="sale-summary">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <strong>TZS {formatMoney(subtotal)}</strong>
                            </div>

                            <div className="discount-field">
                                <label>Discount</label>

                                <div className="discount-input">
                                    <span>TZS</span>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.discount}
                                        onChange={(event) =>
                                            setData("discount", event.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="summary-total">
                                <span>Total</span>
                                <strong>TZS {formatMoney(total)}</strong>
                            </div>

                            {/* Payment */}
                            <div className="payment-section">
                                <h3>Payment Method</h3>

                                <div className="payment-methods">
                                    <button
                                        type="button"
                                        className={
                                            data.payment_method === "cash" ? "active" : ""
                                        }
                                        onClick={() => handlePaymentMethod("cash")}
                                    >
                                        💵 <span>Cash</span>
                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            data.payment_method === "mobile_money"
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            handlePaymentMethod("mobile_money")
                                        }
                                    >
                                        📱 <span>Mobile</span>
                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            data.payment_method === "bank" ? "active" : ""
                                        }
                                        onClick={() => handlePaymentMethod("bank")}
                                    >
                                        🏦 <span>Bank</span>
                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            data.payment_method === "credit" ? "active" : ""
                                        }
                                        onClick={() => handlePaymentMethod("credit")}
                                    >
                                        📒 <span>Credit</span>
                                    </button>
                                </div>
                            </div>

                            {/* Paid Amount */}
                            {data.payment_method !== "credit" && (
                                <div className="paid-field">
                                    <label>Amount Paid</label>

                                    <div className="paid-input">
                                        <span>TZS</span>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={data.paid_amount}
                                            onChange={(event) =>
                                                setData("paid_amount", event.target.value)
                                            }
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Change */}
                            {data.payment_method !== "credit" && (
                                <div className="change-row">
                                    <span>Change</span>
                                    <strong>TZS {formatMoney(changeAmount)}</strong>
                                </div>
                            )}

                            {/* Errors */}
                            {Object.keys(errors).length > 0 && (
                                <div className="sale-errors">
                                    {Object.values(errors).map((error, index) => (
                                        <p key={index}>{error}</p>
                                    ))}
                                </div>
                            )}

                            {/* Complete Sale */}
                            <button
                                type="submit"
                                className="complete-sale-button"
                                disabled={processing || cart.length === 0}
                            >
                                {processing ? "Processing Sale..." : "✓ Complete Sale"}
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        </AdminLayout>
    );
}
