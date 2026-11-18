
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

import {
    Search,
    ScanLine,
    Camera,
    CameraOff,
    ShoppingCart,
    Plus,
    Minus,
    Trash2,
    X,
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Package,
    Banknote,
    Smartphone,
    Building2,
    User,
    Tag,
    LoaderCircle,
    ScanBarcode,
} from "lucide-react";

import "./MobileSale.css";

export default function MobileSale({
    products = [],
    categories = [],
    customers = [],
}) {
    const [step, setStep] = useState("order");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [cart, setCart] = useState([]);
    const [scanning, setScanning] = useState(false);
    const [scanError, setScanError] = useState("");
    const [scanMessage, setScanMessage] = useState("");
    const [showCart, setShowCart] = useState(false);
    const [customerSearch, setCustomerSearch] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const scannerRef = useRef(null);
    const scanLockRef = useRef(false);
    const productsRef = useRef(products);
    const addToCartRef = useRef(null);

    const form = useForm({
        items: [],
        discount: 0,
        payment_method: "cash",
        paid_amount: 0,
        customer_id: "",
        return_to: "mobile-pos",
    });

    const money = (amount) =>
        Number(amount || 0).toLocaleString("en-TZ", {
            maximumFractionDigits: 2,
        });

    const formatPrice = (amount) => `TZS ${money(amount)}`;

    const filteredProducts = useMemo(() => {
        const term = search.trim().toLowerCase();

        return products.filter((product) => {
            const matchesSearch =
                !term ||
                product.name?.toLowerCase().includes(term) ||
                product.sku?.toLowerCase().includes(term) ||
                product.barcode?.toLowerCase().includes(term);

            const matchesCategory =
                category === "all" ||
                String(product.category_id) === String(category);

            return matchesSearch && matchesCategory;
        });
    }, [products, search, category]);

    const filteredCustomers = useMemo(() => {
        const term = customerSearch.trim().toLowerCase();

        return customers.filter((customer) =>
            customer.name?.toLowerCase().includes(term) ||
            customer.phone?.toLowerCase().includes(term)
        );
    }, [customers, customerSearch]);

    const selectedCustomer = customers.find(
        (customer) =>
            String(customer.id) === String(form.data.customer_id)
    );

    const addToCart = (product) => {
        if (Number(product.quantity) <= 0) {
            setScanMessage("Bidhaa hii haina stock.");
            return;
        }

        setCart((previous) => {
            const existing = previous.find(
                (item) => String(item.product.id) === String(product.id)
            );

            if (existing) {
                if (existing.quantity >= Number(product.quantity)) {
                    setScanMessage("Umefikia kiwango cha stock kilichopo.");
                    return previous;
                }

                return previous.map((item) =>
                    String(item.product.id) === String(product.id)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...previous, { product, quantity: 1 }];
        });

        setScanMessage(`${product.name} imeongezwa kwenye cart.`);
        setSearch("");
    };

    addToCartRef.current = addToCart;
    productsRef.current = products;

    const updateQuantity = (productId, amount) => {
        setCart((previous) =>
            previous
                .map((item) => {
                    if (String(item.product.id) !== String(productId)) {
                        return item;
                    }

                    const quantity = item.quantity + amount;

                    if (quantity <= 0) return null;

                    if (quantity > Number(item.product.quantity)) {
                        return item;
                    }

                    return { ...item, quantity };
                })
                .filter(Boolean)
        );
    };

    const removeFromCart = (productId) => {
        setCart((previous) =>
            previous.filter(
                (item) => String(item.product.id) !== String(productId)
            )
        );
    };

    const clearCart = () => {
        setCart([]);
        form.setData({
            ...form.data,
            discount: 0,
            paid_amount: 0,
            customer_id: "",
            payment_method: "cash",
        });
        setShowCart(false);
    };

    const subtotal = cart.reduce(
        (sum, item) =>
            sum + Number(item.product.selling_price) * item.quantity,
        0
    );

    const discount = Math.max(0, Number(form.data.discount || 0));
    const total = Math.max(0, subtotal - discount);
    const paidAmount = Number(form.data.paid_amount || 0);
    const change = Math.max(0, paidAmount - total);
    const balance = Math.max(0, total - paidAmount);

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const isCredit = form.data.payment_method === "credit";

    /*
    |--------------------------------------------------------------------------
    | CAMERA BARCODE SCANNER
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!scanning) return;

        let cancelled = false;
        let scanner = null;

        const startScanner = async () => {
            try {
                scanLockRef.current = false;
                setScanError("");

                scanner = new Html5Qrcode("mobile-barcode-reader", {
                    formatsToSupport: [
                        Html5QrcodeSupportedFormats.EAN_13,
                        Html5QrcodeSupportedFormats.EAN_8,
                        Html5QrcodeSupportedFormats.UPC_A,
                        Html5QrcodeSupportedFormats.UPC_E,
                        Html5QrcodeSupportedFormats.CODE_128,
                        Html5QrcodeSupportedFormats.CODE_39,
                        Html5QrcodeSupportedFormats.ITF,
                        Html5QrcodeSupportedFormats.QR_CODE,
                    ],
                    verbose: false,
                });

                scannerRef.current = scanner;

                await scanner.start(
                    { facingMode: "environment" },
                    {
                        fps: 10,
                        qrbox: { width: 260, height: 150 },
                        aspectRatio: 1.5,
                    },
                    (decodedText) => {
                        if (scanLockRef.current) return;

                        scanLockRef.current = true;

                        const code = decodedText.trim().toLowerCase();

                        const product = productsRef.current.find(
                            (item) =>
                                item.barcode?.trim().toLowerCase() === code ||
                                item.sku?.trim().toLowerCase() === code
                        );

                        if (product) {
                            addToCartRef.current?.(product);
                            setScanning(false);
                        } else {
                            setScanMessage(`Barcode "${decodedText}" haijatambulika.`);
                            scanLockRef.current = false;
                        }
                    },
                    () => {}
                );

                if (cancelled && scanner.isScanning) {
                    await scanner.stop();
                    await scanner.clear();
                }
            } catch (error) {
                if (!cancelled) {
                    setScanError(
                        "Imeshindikana kufungua kamera. Ruhusu camera permission na hakikisha unatumia HTTPS au localhost."
                    );
                }
            }
        };

        startScanner();

        return () => {
            cancelled = true;

            if (scanner) {
                const stopScanner = async () => {
                    try {
                        if (scanner.isScanning) {
                            await scanner.stop();
                        }

                        await scanner.clear();
                    } catch (error) {
                        // Scanner may already have stopped.
                    }
                };

                stopScanner();
            }

            scannerRef.current = null;
        };
    }, [scanning]);

    const openScanner = () => {
        setScanMessage("");
        setScanError("");
        setScanning(true);
    };

    const closeScanner = () => {
        setScanning(false);
    };

    /*
    |--------------------------------------------------------------------------
    | PAYMENT
    |--------------------------------------------------------------------------
    */

    const goToPayment = () => {
        if (!cart.length || discount > subtotal) return;

        form.clearErrors();
        form.setData("paid_amount", isCredit ? 0 : total);
        setStep("payment");
        setShowCart(false);
    };

    const backToOrder = () => {
        setStep("order");
        form.clearErrors();
    };

    const completeSale = (event) => {
        event.preventDefault();

        if (!cart.length || form.processing) return;

        if (discount > subtotal) {
            form.setError("discount", "Punguzo haliwezi kuzidi jumla ya bidhaa.");
            return;
        }

        if (isCredit && !form.data.customer_id) {
            form.setError("customer_id", "Chagua mteja kwa mauzo ya mkopo.");
            return;
        }

        if (!isCredit && paidAmount < total) {
            form.setError("paid_amount", "Kiasi kilicholipwa hakitoshi.");
            return;
        }

        form.clearErrors();

        form.transform((data) => ({
            ...data,
            items: cart.map((item) => ({
                product_id: item.product.id,
                quantity: item.quantity,
            })),
            discount,
            paid_amount: paidAmount,
            customer_id: data.customer_id || null,
            return_to: "mobile-pos",
        }));

        form.post(route("admin.sales.store"), {
            preserveScroll: true,

            onSuccess: (page) => {
            const message =
                page?.props?.flash?.success ||
                "Mauzo yamehifadhiwa na malipo yamekamilika kikamilifu.";

            setSuccessMessage(message);

            setCart([]);
            setSearch("");
            setCategory("all");
            setCustomerSearch("");
            setStep("order");
            setShowCart(false);
            setScanMessage("");

            form.reset();

            form.setData({
                items: [],
                discount: 0,
                payment_method: "cash",
                paid_amount: 0,
                customer_id: "",
                return_to: "mobile-pos",
            });

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },
        });
    };

    const paymentMethods = [
        { value: "cash", label: "Cash", icon: Banknote },
        { value: "mobile_money", label: "Mobile Money", icon: Smartphone },
        { value: "bank", label: "Bank", icon: Building2 },
        { value: "credit", label: "Credit", icon: User },
    ];

    return (
        <AdminLayout>
            <Head title="Mobile POS - MauzoVibe" />

            <div className="mobile-pos-page">
                <header className="mobile-pos-header">
                    <div className="mobile-pos-brand">
                        <div className="mobile-pos-brand-icon">
                            <ShoppingCart size={24} />
                        </div>

                        <div>
                            <h1>Mobile POS</h1>
                            <p>Uza bidhaa kwa kutumia simu yako</p>
                        </div>
                    </div>

                    <div className="mobile-pos-header-total">
                        <span>JUMLA YA MAUZO</span>
                        <strong>{formatPrice(total)}</strong>
                    </div>
                </header>

                <div className="mobile-pos-steps">
                    <div className={step === "order" ? "active" : "completed"}>
                        <span>1</span>
                        <strong>Bidhaa</strong>
                    </div>

                    <div className="mobile-pos-step-line" />

                    <div className={step === "payment" ? "active" : ""}>
                        <span>2</span>
                        <strong>Malipo</strong>
                    </div>
                </div>

                {step === "order" && (
                    <>
                        <section className="mobile-pos-scan-section">
                            {!scanning ? (
                                <button
                                    type="button"
                                    className="mobile-pos-scan-button"
                                    onClick={openScanner}
                                >
                                    <ScanLine size={27} />
                                    <span>
                                        <strong>SCAN BIDHAA</strong>
                                        <small>Fungua kamera na scan barcode</small>
                                    </span>
                                    <ArrowRight size={22} />
                                </button>
                            ) : (
                                <div className="mobile-pos-scanner-panel">
                                    <div className="mobile-pos-scanner-heading">
                                        <div>
                                            <strong>
                                                <Camera size={18} /> Barcode Scanner
                                            </strong>
                                            <small>Elekeza kamera kwenye barcode ya bidhaa</small>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={closeScanner}
                                            aria-label="Funga scanner"
                                        >
                                            <X size={22} />
                                        </button>
                                    </div>

                                    <div
                                        id="mobile-barcode-reader"
                                        className="mobile-pos-camera"
                                    />

                                    <p className="mobile-pos-camera-hint">
                                        <ScanBarcode size={17} />
                                        Weka barcode ndani ya eneo la scan
                                    </p>
                                </div>
                            )}

                            {scanError && (
                                <div className="mobile-pos-error">
                                    <CameraOff size={17} />
                                    {scanError}
                                </div>
                            )}

                            {scanMessage && !scanning && (
                                <div className="mobile-pos-scan-message">
                                    {scanMessage}
                                </div>
                            )}
                        </section>

                        <section className="mobile-pos-search">
                            <Search size={20} />

                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Tafuta bidhaa, SKU au barcode..."
                            />

                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </section>

                        <div className="mobile-pos-categories">
                            <button
                                type="button"
                                className={category === "all" ? "active" : ""}
                                onClick={() => setCategory("all")}
                            >
                                Zote
                            </button>

                            {categories.map((item) => (
                                <button
                                    type="button"
                                    key={item.id}
                                    className={
                                        category === String(item.id) ? "active" : ""
                                    }
                                    onClick={() => setCategory(String(item.id))}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>

                        <section className="mobile-pos-products-heading">
                            <div>
                                <h2>Chagua Bidhaa</h2>
                                <p>{filteredProducts.length} bidhaa zinapatikana</p>
                            </div>

                            <span>
                                <Package size={17} />
                                {totalItems} kwenye cart
                            </span>
                        </section>

                        <section className="mobile-pos-product-grid">
                            {filteredProducts.map((product) => {
                                const cartItem = cart.find(
                                    (item) =>
                                        String(item.product.id) === String(product.id)
                                );

                                return (
                                    <button
                                        type="button"
                                        key={product.id}
                                        className="mobile-pos-product-card"
                                        onClick={() => addToCart(product)}
                                        disabled={Number(product.quantity) <= 0}
                                    >
                                        <div className="mobile-pos-product-image">
                                            {product.image_url ? (
                                                <img
                                                    src={product.image_url}
                                                    alt={product.name}
                                                />
                                            ) : (
                                                <Package size={35} />
                                            )}

                                            {cartItem && (
                                                <span>{cartItem.quantity}</span>
                                            )}
                                        </div>

                                        <div className="mobile-pos-product-info">
                                            <strong>{product.name}</strong>
                                            <b>{formatPrice(product.selling_price)}</b>
                                            <small>
                                                Stock: {product.quantity} {product.unit || ""}
                                            </small>
                                        </div>

                                        <div className="mobile-pos-add-product">
                                            <Plus size={17} />
                                            Ongeza
                                        </div>
                                    </button>
                                );
                            })}
                        </section>

                        {filteredProducts.length === 0 && (
                            <div className="mobile-pos-empty">
                                <Package size={40} />
                                <strong>Hakuna bidhaa iliyopatikana</strong>
                                <p>Jaribu jina jingine au scan barcode.</p>
                            </div>
                        )}

                        <div className="mobile-pos-bottom-bar">
                            <button
                                type="button"
                                className="mobile-pos-cart-button"
                                onClick={() => setShowCart(true)}
                                disabled={!cart.length}
                            >
                                <span className="mobile-pos-cart-count">
                                    <ShoppingCart size={21} />
                                    {totalItems}
                                </span>

                                <span>
                                    <small>Angalia Cart</small>
                                    <strong>{formatPrice(total)}</strong>
                                </span>

                                <ArrowRight size={22} />
                            </button>

                            <button
                                type="button"
                                className="mobile-pos-proceed-button"
                                onClick={goToPayment}
                                disabled={!cart.length || discount > subtotal}
                            >
                                LIPA
                                <ArrowRight size={19} />
                            </button>
                        </div>

                        {showCart && (
                            <div
                                className="mobile-pos-overlay"
                                onClick={() => setShowCart(false)}
                            >
                                <div
                                    className="mobile-pos-cart-drawer"
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    <div className="mobile-pos-drawer-heading">
                                        <div>
                                            <h2>Cart Yako</h2>
                                            <p>{totalItems} bidhaa zimechaguliwa</p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setShowCart(false)}
                                        >
                                            <X size={22} />
                                        </button>
                                    </div>

                                    <div className="mobile-pos-cart-items">
                                        {cart.map((item) => (
                                            <div
                                                className="mobile-pos-cart-item"
                                                key={item.product.id}
                                            >
                                                <div className="mobile-pos-cart-item-info">
                                                    <strong>{item.product.name}</strong>
                                                    <small>
                                                        {formatPrice(item.product.selling_price)}
                                                    </small>
                                                    <b>
                                                        {formatPrice(
                                                            Number(item.product.selling_price) *
                                                            item.quantity
                                                        )}
                                                    </b>
                                                </div>

                                                <div className="mobile-pos-quantity">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            updateQuantity(item.product.id, -1)
                                                        }
                                                    >
                                                        <Minus size={16} />
                                                    </button>

                                                    <strong>{item.quantity}</strong>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            updateQuantity(item.product.id, 1)
                                                        }
                                                        disabled={
                                                            item.quantity >=
                                                            Number(item.product.quantity)
                                                        }
                                                    >
                                                        <Plus size={16} />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="delete"
                                                        onClick={() =>
                                                            removeFromCart(item.product.id)
                                                        }
                                                    >
                                                        <Trash2 size={17} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        {cart.length === 0 && (
                                            <p className="mobile-pos-empty-cart">
                                                Cart haina bidhaa.
                                            </p>
                                        )}
                                    </div>

                                    <div className="mobile-pos-cart-footer">
                                        <button
                                            type="button"
                                            className="mobile-pos-clear-cart"
                                            onClick={clearCart}
                                        >
                                            <Trash2 size={17} /> Futa Cart
                                        </button>

                                        <div className="mobile-pos-cart-total">
                                            <span>Jumla</span>
                                            <strong>{formatPrice(total)}</strong>
                                        </div>

                                        <button
                                            type="button"
                                            className="mobile-pos-proceed-button full"
                                            disabled={!cart.length}
                                            onClick={goToPayment}
                                        >
                                            Endelea na Malipo
                                            <ArrowRight size={19} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {step === "payment" && (
                    <section className="mobile-pos-payment">
                        <button
                            type="button"
                            className="mobile-pos-back-button"
                            onClick={backToOrder}
                        >
                            <ArrowLeft size={18} />
                            Rudi kwenye bidhaa
                        </button>

                        <div className="mobile-pos-payment-total">
                            <span>JUMLA YA KULIPA</span>
                            <strong>{formatPrice(total)}</strong>
                            <small>{totalItems} bidhaa</small>
                        </div>

                        <div className="mobile-pos-payment-card">
                            <h2>Chagua Njia ya Malipo</h2>

                            <div className="mobile-pos-payment-methods">
                                {paymentMethods.map((method) => {
                                    const Icon = method.icon;
                                    const active =
                                        form.data.payment_method === method.value;

                                    return (
                                        <button
                                            type="button"
                                            key={method.value}
                                            className={active ? "active" : ""}
                                            onClick={() => {
                                                form.setData(
                                                    "payment_method",
                                                    method.value
                                                );

                                                if (method.value === "credit") {
                                                    form.setData("paid_amount", 0);
                                                } else if (
                                                    Number(form.data.paid_amount) < total
                                                ) {
                                                    form.setData("paid_amount", total);
                                                }
                                            }}
                                        >
                                            <Icon size={23} />
                                            <span>{method.label}</span>
                                            {active && <CheckCircle2 size={18} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {isCredit && (
                            <div className="mobile-pos-payment-card">
                                <h2>Chagua Mteja wa Mkopo</h2>

                                <input
                                    className="mobile-pos-input"
                                    type="search"
                                    placeholder="Tafuta mteja kwa jina au simu..."
                                    value={customerSearch}
                                    onChange={(event) =>
                                        setCustomerSearch(event.target.value)
                                    }
                                />

                                <select
                                    className="mobile-pos-input"
                                    value={form.data.customer_id}
                                    onChange={(event) =>
                                        form.setData("customer_id", event.target.value)
                                    }
                                >
                                    <option value="">Chagua mteja</option>

                                    {filteredCustomers.map((customer) => (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.name} {customer.phone ? `- ${customer.phone}` : ""}
                                        </option>
                                    ))}
                                </select>

                                {form.errors.customer_id && (
                                    <p className="mobile-pos-field-error">
                                        {form.errors.customer_id}
                                    </p>
                                )}

                                {selectedCustomer && (
                                    <p className="mobile-pos-selected-customer">
                                        Mteja: {selectedCustomer.name}
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="mobile-pos-payment-card">
                            <h2>Kiasi Kilichopokelewa</h2>

                            <label className="mobile-pos-amount-label">
                                Malipo (TZS)
                            </label>

                            <input
                                className="mobile-pos-amount-input"
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.data.paid_amount}
                                onChange={(event) =>
                                    form.setData(
                                        "paid_amount",
                                        event.target.value === ""
                                            ? 0
                                            : event.target.value
                                    )
                                }
                            />

                            {!isCredit && (
                                <div className="mobile-pos-quick-amounts">
                                    {[total, Math.ceil(total / 1000) * 1000,
                                        Math.ceil(total / 5000) * 5000].filter(
                                        (amount, index, array) =>
                                            array.indexOf(amount) === index
                                    ).map((amount, index) => (
                                        <button
                                            type="button"
                                            key={`${amount}-${index}`}
                                            onClick={() =>
                                                form.setData("paid_amount", amount)
                                            }
                                        >
                                            {formatPrice(amount)}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {form.errors.paid_amount && (
                                <p className="mobile-pos-field-error">
                                    {form.errors.paid_amount}
                                </p>
                            )}
                        </div>

                        <div className="mobile-pos-payment-card">
                            <h2>Muhtasari wa Malipo</h2>

                            <div className="mobile-pos-summary-row">
                                <span>Subtotal</span>
                                <strong>{formatPrice(subtotal)}</strong>
                            </div>

                            <div className="mobile-pos-discount">
                                <label>
                                    <Tag size={17} />
                                    Punguzo (TZS)
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    max={subtotal}
                                    value={form.data.discount}
                                    onChange={(event) =>
                                        form.setData("discount", event.target.value)
                                    }
                                />
                            </div>

                            {form.errors.discount && (
                                <p className="mobile-pos-field-error">
                                    {form.errors.discount}
                                </p>
                            )}

                            <div className="mobile-pos-summary-row total">
                                <span>Jumla</span>
                                <strong>{formatPrice(total)}</strong>
                            </div>

                            <div className="mobile-pos-summary-row">
                                <span>Kiasi kilicholipwa</span>
                                <strong>{formatPrice(paidAmount)}</strong>
                            </div>

                            <div className="mobile-pos-summary-row">
                                <span>Chenji</span>
                                <strong className="positive">{formatPrice(change)}</strong>
                            </div>

                            <div className="mobile-pos-summary-row">
                                <span>Deni / Salio</span>
                                <strong className="negative">
                                    {formatPrice(balance)}
                                </strong>
                            </div>

                            {isCredit && (
                                <p className="mobile-pos-credit-note">
                                    Mauzo haya yatawekwa kwenye deni la mteja.
                                </p>
                            )}

                            {form.errors.items && (
                                <p className="mobile-pos-field-error">
                                    {form.errors.items}
                                </p>
                            )}
                        </div>

                        <div className="mobile-pos-payment-actions">
                            <button
                                type="button"
                                className="mobile-pos-back-button"
                                onClick={backToOrder}
                                disabled={form.processing}
                            >
                                <ArrowLeft size={18} />
                                Rudi
                            </button>

                            <button
                                type="button"
                                className="mobile-pos-confirm-button"
                                onClick={completeSale}
                                disabled={
                                    form.processing ||
                                    !cart.length ||
                                    discount > subtotal ||
                                    (!isCredit && paidAmount < total) ||
                                    (isCredit && !form.data.customer_id)
                                }
                            >
                                {form.processing ? (
                                    <>
                                        <LoaderCircle className="spin" size={20} />
                                        Inachakata...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 size={20} />
                                        Thibitisha Mauzo
                                    </>
                                )}
                            </button>
                        </div>
                    </section>
                )}
                {successMessage && (
    <div className="mobile-pos-success-overlay">
        <div
            className="mobile-pos-success-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-pos-success-title"
        >
            <div className="mobile-pos-success-icon">
                <CheckCircle2 size={48} />
            </div>

            <span className="mobile-pos-success-label">
                MALIPO YAMEPOKELEWA
            </span>

            <h2 id="mobile-pos-success-title">
                Mauzo Yamekamilika!
            </h2>

            <p>{successMessage}</p>

            <div className="mobile-pos-success-status">
                <CheckCircle2 size={17} />
                TRANSACTION SUCCESSFUL
            </div>

            <button
                type="button"
                className="mobile-pos-success-again"
                onClick={() => {
                    setSuccessMessage("");
                    setStep("order");
                    setCart([]);
                }}
            >
                <ShoppingCart size={19} />
                UZA TENA
            </button>

            <button
                type="button"
                className="mobile-pos-success-close"
                onClick={() => setSuccessMessage("")}
            >
                Funga
            </button>
        </div>
    </div>
)}
            </div>
        </AdminLayout>
    );
}
