
import React, { useEffect, useMemo, useRef, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";

import {
    MagnifyingGlassIcon,
    ShoppingCartIcon,
    PlusIcon,
    MinusIcon,
    TrashIcon,
    BoltIcon,
    CubeIcon,
    CreditCardIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    UserIcon,
    BanknotesIcon,
    DevicePhoneMobileIcon,
    BuildingLibraryIcon,
    CheckCircleIcon,
    XMarkIcon,
    // BarcodeIcon,
    QrCodeIcon,
    TagIcon,
} from "@heroicons/react/24/outline";

export default function QuickSale({
    products = [],
    categories = [],
    customers = [],
}) {
    const [step, setStep] = useState("order");

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const [cart, setCart] = useState([]);

    const [customerSearch, setCustomerSearch] = useState("");
    const [showCustomers, setShowCustomers] = useState(false);

    const [keypadValue, setKeypadValue] = useState("");

    const searchRef = useRef(null);

    const form = useForm({
        items: [],
        discount: 0,
        payment_method: "cash",
        paid_amount: 0,
        customer_id: "",
        return_to: "quick-sale",
    });

    /*
    |--------------------------------------------------------------------------
    | HELPERS
    |--------------------------------------------------------------------------
    */

    const money = (amount) =>
        Number(amount || 0).toLocaleString("en-TZ", {
            maximumFractionDigits: 2,
        });

    const formatPrice = (amount) => `TZS ${money(amount)}`;

    /*
    |--------------------------------------------------------------------------
    | FILTER PRODUCTS
    |--------------------------------------------------------------------------
    */

    const filteredProducts = useMemo(() => {
        const term = search.trim().toLowerCase();

        return products.filter((product) => {
            const matchesSearch =
                !term ||
                product.name?.toLowerCase().includes(term) ||
                product.sku?.toLowerCase().includes(term) ||
                product.barcode?.toLowerCase().includes(term);

            const matchesCategory =
                selectedCategory === "all" ||
                String(product.category_id) === String(selectedCategory);

            return matchesSearch && matchesCategory;
        });
    }, [products, search, selectedCategory]);

    /*
    |--------------------------------------------------------------------------
    | FILTER CUSTOMERS
    |--------------------------------------------------------------------------
    */

    const filteredCustomers = useMemo(() => {
        const term = customerSearch.trim().toLowerCase();

        return customers.filter((customer) => {
            return (
                customer.name?.toLowerCase().includes(term) ||
                customer.phone?.toLowerCase().includes(term) ||
                customer.email?.toLowerCase().includes(term)
            );
        });
    }, [customers, customerSearch]);

    const selectedCustomer = customers.find(
        (customer) =>
            String(customer.id) === String(form.data.customer_id)
    );

    /*
    |--------------------------------------------------------------------------
    | CART FUNCTIONS
    |--------------------------------------------------------------------------
    */

    const addToCart = (product) => {
        if (Number(product.quantity) <= 0) return;

        setCart((previous) => {
            const existing = previous.find(
                (item) => item.product.id === product.id
            );

            if (existing) {
                if (
                    existing.quantity >= Number(product.quantity)
                ) {
                    return previous;
                }

                return previous.map((item) =>
                    item.product.id === product.id
                        ? {
                              ...item,
                              quantity: item.quantity + 1,
                          }
                        : item
                );
            }

            return [
                ...previous,
                {
                    product,
                    quantity: 1,
                },
            ];
        });

        setSearch("");
        searchRef.current?.focus();
    };

    const updateQuantity = (productId, amount) => {
        setCart((previous) =>
            previous
                .map((item) => {
                    if (item.product.id !== productId) {
                        return item;
                    }

                    const newQuantity = item.quantity + amount;

                    if (newQuantity <= 0) {
                        return null;
                    }

                    if (
                        newQuantity >
                        Number(item.product.quantity)
                    ) {
                        return item;
                    }

                    return {
                        ...item,
                        quantity: newQuantity,
                    };
                })
                .filter(Boolean)
        );
    };

    const removeFromCart = (productId) => {
        setCart((previous) =>
            previous.filter(
                (item) => item.product.id !== productId
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
    };

    /*
    |--------------------------------------------------------------------------
    | BARCODE SCANNER
    |--------------------------------------------------------------------------
    */

    const handleBarcode = (event) => {
        if (event.key !== "Enter") return;

        event.preventDefault();

        const code = search.trim().toLowerCase();

        if (!code) return;

        const product = products.find(
            (item) =>
                item.barcode?.toLowerCase() === code ||
                item.sku?.toLowerCase() === code
        );

        if (product) {
            addToCart(product);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | TOTALS
    |--------------------------------------------------------------------------
    */

    const subtotal = cart.reduce(
        (sum, item) =>
            sum +
            Number(item.product.selling_price) * item.quantity,
        0
    );

    const discount = Math.max(
        0,
        Number(form.data.discount || 0)
    );

    const total = Math.max(0, subtotal - discount);

    const paidAmount = Number(form.data.paid_amount || 0);

    const change = Math.max(0, paidAmount - total);

    const balance = Math.max(0, total - paidAmount);

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    /*
    |--------------------------------------------------------------------------
    | PAYMENT METHODS
    |--------------------------------------------------------------------------
    */

    const paymentMethods = [
        {
            value: "cash",
            label: "Cash",
            description: "Cash payment",
            icon: BanknotesIcon,
        },
        {
            value: "mobile_money",
            label: "Mobile Money",
            description: "M-Pesa, Tigo Pesa, Airtel Money",
            icon: DevicePhoneMobileIcon,
        },
        {
            value: "bank",
            label: "Bank",
            description: "Bank transfer or POS",
            icon: BuildingLibraryIcon,
        },
        {
            value: "credit",
            label: "Credit",
            description: "Customer credit sale",
            icon: UserIcon,
        },
    ];

    const isCredit = form.data.payment_method === "credit";

    /*
    |--------------------------------------------------------------------------
    | PAYMENT AMOUNT
    |--------------------------------------------------------------------------
    */

    const setPaymentAmount = (value) => {
        const numericValue = Number(value);

        if (!Number.isFinite(numericValue) || numericValue < 0) {
            return;
        }

        form.setData("paid_amount", numericValue);
        setKeypadValue(String(numericValue));
    };

    const handleKeypad = (value) => {
        let nextValue = keypadValue;

        if (value === "clear") {
            nextValue = "";
        } else if (value === "backspace") {
            nextValue = nextValue.slice(0, -1);
        } else if (value === ".") {
            if (nextValue.includes(".")) return;
            nextValue = nextValue === "" ? "0." : `${nextValue}.`;
        } else {
            nextValue += value;
        }

        setKeypadValue(nextValue);

        form.setData(
            "paid_amount",
            nextValue === "" ? 0 : Number(nextValue)
        );
    };

    const quickAmounts = [
        total,
        Math.ceil(total / 1000) * 1000,
        Math.ceil(total / 5000) * 5000,
        Math.ceil(total / 10000) * 10000,
    ];

    /*
    |--------------------------------------------------------------------------
    | STEP NAVIGATION
    |--------------------------------------------------------------------------
    */

    const goToPayment = () => {
        if (cart.length === 0) return;

        if (discount > subtotal) {
            return;
        }

        form.clearErrors();

        setKeypadValue(String(total));
        form.setData("paid_amount", total);

        setStep("payment");
    };

    const backToOrder = () => {
        setStep("order");
        form.clearErrors();
        searchRef.current?.focus();
    };

    /*
    |--------------------------------------------------------------------------
    | COMPLETE SALE
    |--------------------------------------------------------------------------
    */

    const completeSale = (event) => {
        event.preventDefault();

        if (cart.length === 0) return;

        if (discount > subtotal) {
            return;
        }

        if (isCredit && !form.data.customer_id) {
            form.setError(
                "customer_id",
                "Please select a customer for credit sales."
            );
            return;
        }

        if (!isCredit && paidAmount < total) {
            form.setError(
                "paid_amount",
                "Amount paid must cover the total amount."
            );
            return;
        }

        form.clearErrors();

        form.transform((data) => ({
            ...data,
            items: cart.map((item) => ({
                product_id: item.product.id,
                quantity: item.quantity,
            })),
            discount: discount,
            paid_amount: paidAmount,
            customer_id: data.customer_id || null,
            return_to: "quick-sale",
        }));

        form.post(route("admin.sales.store"), {
            preserveScroll: true,

            onSuccess: () => {
                setCart([]);
                setSearch("");
                setSelectedCategory("all");
                setCustomerSearch("");
                setShowCustomers(false);
                setKeypadValue("");
                setStep("order");

                form.reset();
                form.setData({
                    items: [],
                    discount: 0,
                    payment_method: "cash",
                    paid_amount: 0,
                    customer_id: "",
                    return_to: "quick-sale",
                });

                searchRef.current?.focus();
            },
        });
    };

    /*
    |--------------------------------------------------------------------------
    | FOCUS SEARCH
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (step === "order") {
            searchRef.current?.focus();
        }
    }, [step]);

    /*
    |--------------------------------------------------------------------------
    | RENDER
    |--------------------------------------------------------------------------
    */

    return (
        <AdminLayout>
            <Head title="Quick POS - MauzoVibe" />

            <div className="space-y-5">

                {/* HEADER */}

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>
                        <div className="flex items-center gap-3">
                            <div className="bg-emerald-100 p-3 rounded-2xl">
                                <BoltIcon className="w-8 h-8 text-emerald-700" />
                            </div>

                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                                    MauzoVibe POS
                                </h1>

                                <p className="text-sm text-gray-500">
                                    Fast checkout and sales management
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">

                        <div className="bg-white border rounded-xl px-4 py-3">
                            <p className="text-xs text-gray-500">
                                Items
                            </p>

                            <p className="font-bold text-gray-800">
                                {totalItems}
                            </p>
                        </div>

                        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                            <p className="text-xs text-emerald-700">
                                Order Total
                            </p>

                            <p className="font-bold text-emerald-800">
                                {formatPrice(total)}
                            </p>
                        </div>

                    </div>

                </div>

                {/* STEP INDICATOR */}

                <div className="bg-white border rounded-2xl p-4">

                    <div className="flex items-center max-w-2xl mx-auto">

                        <div className="flex items-center gap-2">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${
                                step === "order"
                                    ? "bg-emerald-700 text-white"
                                    : "bg-emerald-100 text-emerald-700"
                            }`}>
                                1
                            </div>

                            <span className="font-semibold text-gray-700">
                                Order
                            </span>
                        </div>

                        <div className="flex-1 h-1 bg-gray-200 mx-4 rounded-full">
                            <div className={`h-full rounded-full transition-all ${
                                step === "payment"
                                    ? "bg-emerald-600 w-full"
                                    : "bg-gray-200 w-0"
                            }`} />
                        </div>

                        <div className="flex items-center gap-2">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${
                                step === "payment"
                                    ? "bg-emerald-700 text-white"
                                    : "bg-gray-100 text-gray-500"
                            }`}>
                                2
                            </div>

                            <span className="font-semibold text-gray-700">
                                Payment
                            </span>
                        </div>

                    </div>

                </div>

                {/* =====================================================
                    ORDER SCREEN
                ====================================================== */}

                {step === "order" && (

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

                        {/* PRODUCT CATALOG */}

                        <div className="xl:col-span-2 space-y-5">

                            {/* SEARCH */}

                            <div className="bg-white border rounded-2xl p-4">

                                <div className="relative">

                                    <MagnifyingGlassIcon className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        ref={searchRef}
                                        type="text"
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(event.target.value)
                                        }
                                        onKeyDown={handleBarcode}
                                        placeholder="Search product, SKU or scan barcode..."
                                        autoFocus
                                        className="w-full border border-gray-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                    />

                                </div>

                                <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                                    <QrCodeIcon className="w-4 h-4" />
                                    Scan barcode and press Enter to add product.
                                </div>

                            </div>

                            {/* CATEGORIES */}

                            <div className="flex gap-2 overflow-x-auto pb-2">

                                <button
                                    type="button"
                                    onClick={() => setSelectedCategory("all")}
                                    className={`px-5 py-2.5 rounded-xl whitespace-nowrap text-sm font-semibold transition ${
                                        selectedCategory === "all"
                                            ? "bg-emerald-700 text-white"
                                            : "bg-white border text-gray-600 hover:border-emerald-400"
                                    }`}
                                >
                                    All Products
                                </button>

                                {categories.map((category) => (
                                    <button
                                        type="button"
                                        key={category.id}
                                        onClick={() =>
                                            setSelectedCategory(String(category.id))
                                        }
                                        className={`px-5 py-2.5 rounded-xl whitespace-nowrap text-sm font-semibold transition ${
                                            selectedCategory === String(category.id)
                                                ? "bg-emerald-700 text-white"
                                                : "bg-white border text-gray-600 hover:border-emerald-400"
                                        }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}

                            </div>

                            {/* PRODUCT GRID */}

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

                                {filteredProducts.map((product) => {

                                    const cartItem = cart.find(
                                        (item) =>
                                            item.product.id === product.id
                                    );

                                    const outOfStock =
                                        Number(product.quantity) <= 0;

                                    return (
                                        <button
                                            type="button"
                                            key={product.id}
                                            onClick={() => addToCart(product)}
                                            disabled={outOfStock}
                                            className={`bg-white border rounded-2xl p-3 text-left shadow-sm transition ${
                                                outOfStock
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : "hover:shadow-lg hover:border-emerald-400"
                                            }`}
                                        >

                                            <div className="h-28 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center relative">

                                                {product.image_url ? (
                                                    <img
                                                        src={product.image_url}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(event) => {
                                                            event.currentTarget.style.display = "none";
                                                        }}
                                                    />
                                                ) : (
                                                    <CubeIcon className="w-12 h-12 text-gray-300" />
                                                )}

                                                {cartItem && (
                                                    <span className="absolute top-2 right-2 bg-emerald-700 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center">
                                                        {cartItem.quantity}
                                                    </span>
                                                )}

                                            </div>

                                            <h3 className="font-semibold text-gray-800 mt-3 line-clamp-2 min-h-10">
                                                {product.name}
                                            </h3>

                                            <p className="text-emerald-700 font-bold mt-1">
                                                {formatPrice(product.selling_price)}
                                            </p>

                                            <p className="text-xs text-gray-500 mt-1">
                                                Stock: {product.quantity} {product.unit || ""}
                                            </p>

                                            <div className="mt-3 bg-emerald-50 text-emerald-700 rounded-lg py-2 text-center text-sm font-semibold">
                                                <PlusIcon className="w-4 h-4 inline mr-1" />
                                                Add to Order
                                            </div>

                                        </button>
                                    );
                                })}

                            </div>

                            {filteredProducts.length === 0 && (
                                <div className="bg-white rounded-2xl p-12 text-center border">

                                    <CubeIcon className="w-14 h-14 text-gray-300 mx-auto mb-3" />

                                    <h3 className="font-semibold text-gray-700">
                                        No products found
                                    </h3>

                                    <p className="text-gray-500 text-sm mt-1">
                                        Try another search or category.
                                    </p>

                                </div>
                            )}

                        </div>

                        {/* ORDER PANEL */}

                        <div className="xl:col-span-1">

                            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden xl:sticky xl:top-20">

                                {/* ORDER HEADER */}

                                <div className="bg-emerald-900 text-white p-5">

                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-3">
                                            <ShoppingCartIcon className="w-7 h-7" />

                                            <div>
                                                <h2 className="text-xl font-bold">
                                                    Current Order
                                                </h2>

                                                <p className="text-emerald-200 text-sm">
                                                    {totalItems} items
                                                </p>
                                            </div>
                                        </div>

                                        {cart.length > 0 && (
                                            <button
                                                type="button"
                                                onClick={clearCart}
                                                className="text-emerald-100 hover:text-white text-xs font-semibold"
                                            >
                                                Clear
                                            </button>
                                        )}

                                    </div>

                                </div>

                                {/* CUSTOMER SELECTOR */}

                                <div className="p-4 border-b">

                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                                        <UserIcon className="w-4 h-4" />
                                        Customer
                                    </label>

                                    <div className="relative">

                                        <input
                                            type="text"
                                            value={
                                                showCustomers
                                                    ? customerSearch
                                                    : selectedCustomer?.name || ""
                                            }
                                            onFocus={() => {
                                                setShowCustomers(true);
                                                setCustomerSearch("");
                                            }}
                                            onChange={(event) => {
                                                setCustomerSearch(event.target.value);
                                                setShowCustomers(true);
                                            }}
                                            placeholder="Walk-in Customer / Search customer"
                                            className="w-full border rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                                        />

                                        {showCustomers && (
                                            <div className="absolute z-30 top-full left-0 right-0 mt-1 bg-white border rounded-xl shadow-xl max-h-56 overflow-y-auto">

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        form.setData("customer_id", "");
                                                        setCustomerSearch("");
                                                        setShowCustomers(false);
                                                    }}
                                                    className="w-full text-left p-3 text-sm hover:bg-emerald-50 border-b"
                                                >
                                                    <strong>Walk-in Customer</strong>
                                                    <p className="text-xs text-gray-400">
                                                        No customer selected
                                                    </p>
                                                </button>

                                                {filteredCustomers.map((customer) => (
                                                    <button
                                                        type="button"
                                                        key={customer.id}
                                                        onClick={() => {
                                                            form.setData("customer_id", customer.id);
                                                            setCustomerSearch("");
                                                            setShowCustomers(false);
                                                        }}
                                                        className="w-full text-left p-3 text-sm hover:bg-emerald-50 border-b last:border-0"
                                                    >
                                                        <strong className="text-gray-800">
                                                            {customer.name}
                                                        </strong>

                                                        <p className="text-xs text-gray-500">
                                                            {customer.phone || customer.email || ""}
                                                        </p>
                                                    </button>
                                                ))}

                                                {filteredCustomers.length === 0 && (
                                                    <p className="p-3 text-sm text-gray-500">
                                                        No customers found.
                                                    </p>
                                                )}

                                            </div>
                                        )}

                                    </div>

                                    {form.errors.customer_id && (
                                        <p className="text-red-600 text-xs mt-2">
                                            {form.errors.customer_id}
                                        </p>
                                    )}

                                </div>

                                {/* CART ITEMS */}

                                <div className="p-4 space-y-4 max-h-[350px] overflow-y-auto">

                                    {cart.map((item) => (
                                        <div
                                            key={item.product.id}
                                            className="border-b pb-4 last:border-0"
                                        >

                                            <div className="flex justify-between gap-2">

                                                <div className="min-w-0">
                                                    <h3 className="font-semibold text-gray-800 text-sm">
                                                        {item.product.name}
                                                    </h3>

                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {formatPrice(item.product.selling_price)}
                                                    </p>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeFromCart(item.product.id)
                                                    }
                                                    className="text-red-500 hover:bg-red-50 rounded-lg p-2 h-fit"
                                                    title="Remove item"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>

                                            </div>

                                            <div className="flex justify-between items-center mt-3">

                                                <div className="flex items-center gap-3">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            updateQuantity(item.product.id, -1)
                                                        }
                                                        className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                                                    >
                                                        <MinusIcon className="w-4 h-4" />
                                                    </button>

                                                    <span className="font-bold text-sm">
                                                        {item.quantity}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            updateQuantity(item.product.id, 1)
                                                        }
                                                        disabled={
                                                            item.quantity >=
                                                            Number(item.product.quantity)
                                                        }
                                                        className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center disabled:opacity-40"
                                                    >
                                                        <PlusIcon className="w-4 h-4" />
                                                    </button>

                                                </div>

                                                <strong className="text-gray-800 text-sm">
                                                    {formatPrice(
                                                        Number(item.product.selling_price) *
                                                        item.quantity
                                                    )}
                                                </strong>

                                            </div>

                                        </div>
                                    ))}

                                    {cart.length === 0 && (
                                        <div className="text-center py-10">

                                            <ShoppingCartIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />

                                            <p className="font-semibold text-gray-600">
                                                Cart is empty
                                            </p>

                                            <p className="text-sm text-gray-400 mt-1">
                                                Select products to start selling.
                                            </p>

                                        </div>
                                    )}

                                </div>

                                {/* ORDER TOTALS */}

                                <div className="border-t p-4 space-y-4">

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">
                                            Subtotal
                                        </span>

                                        <strong>
                                            {formatPrice(subtotal)}
                                        </strong>
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                                            <TagIcon className="w-4 h-4" />
                                            Discount (TZS)
                                        </label>

                                        <input
                                            type="number"
                                            min="0"
                                            max={subtotal}
                                            step="0.01"
                                            value={form.data.discount}
                                            onChange={(event) =>
                                                form.setData("discount", event.target.value)
                                            }
                                            className="w-full border rounded-xl p-3 mt-2 outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>

                                    <div className="flex justify-between items-center bg-emerald-50 rounded-xl p-4">
                                        <span className="font-bold text-gray-700">
                                            TOTAL
                                        </span>

                                        <span className="text-xl font-bold text-emerald-700">
                                            {formatPrice(total)}
                                        </span>
                                    </div>

                                    {Number(form.data.discount) > subtotal && (
                                        <p className="text-red-600 text-xs">
                                            Discount cannot exceed subtotal.
                                        </p>
                                    )}

                                    <button
                                        type="button"
                                        onClick={goToPayment}
                                        disabled={
                                            cart.length === 0 ||
                                            discount > subtotal
                                        }
                                        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Proceed to Payment
                                        <ArrowRightIcon className="w-5 h-5" />
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                )}

                {/* =====================================================
                    PAYMENT SCREEN
                ====================================================== */}

                {step === "payment" && (

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                        {/* PAYMENT METHODS */}

                        <div className="lg:col-span-2 space-y-5">

                            <div className="bg-white border rounded-2xl p-5">

                                <div className="flex items-center justify-between mb-5">

                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">
                                            Select Payment Method
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Choose how the customer will pay.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={backToOrder}
                                        className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-emerald-700"
                                    >
                                        <ArrowLeftIcon className="w-4 h-4" />
                                        Back to Order
                                    </button>

                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                                    {paymentMethods.map((method) => {
                                        const Icon = method.icon;

                                        const active =
                                            form.data.payment_method === method.value;

                                        return (
                                            <button
                                                type="button"
                                                key={method.value}
                                                onClick={() => {
                                                    form.setData("payment_method", method.value);

                                                    if (method.value === "credit") {
                                                        setPaymentAmount(0);
                                                    } else if (
                                                        Number(form.data.paid_amount) < total
                                                    ) {
                                                        setPaymentAmount(total);
                                                    }
                                                }}
                                                className={`border rounded-2xl p-4 text-left transition ${
                                                    active
                                                        ? "border-emerald-600 bg-emerald-50 ring-2 ring-emerald-100"
                                                        : "border-gray-200 hover:border-emerald-400"
                                                }`}
                                            >

                                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${
                                                    active
                                                        ? "bg-emerald-700 text-white"
                                                        : "bg-gray-100 text-gray-600"
                                                }`}>
                                                    <Icon className="w-6 h-6" />
                                                </div>

                                                <p className="font-bold text-gray-800">
                                                    {method.label}
                                                </p>

                                                <p className="text-xs text-gray-500 mt-1">
                                                    {method.description}
                                                </p>

                                            </button>
                                        );
                                    })}

                                </div>

                            </div>

                            {/* CUSTOMER FOR CREDIT */}

                            {isCredit && (
                                <div className="bg-white border rounded-2xl p-5">

                                    <h3 className="font-bold text-gray-800 mb-3">
                                        Credit Customer
                                    </h3>

                                    <select
                                        value={form.data.customer_id}
                                        onChange={(event) =>
                                            form.setData("customer_id", event.target.value)
                                        }
                                        className="w-full border rounded-xl p-3 bg-white outline-none focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <option value="">
                                            Select customer
                                        </option>

                                        {customers.map((customer) => (
                                            <option
                                                key={customer.id}
                                                value={customer.id}
                                            >
                                                {customer.name} {customer.phone ? `- ${customer.phone}` : ""}
                                            </option>
                                        ))}
                                    </select>

                                    {form.errors.customer_id && (
                                        <p className="text-red-600 text-sm mt-2">
                                            {form.errors.customer_id}
                                        </p>
                                    )}

                                    <p className="text-xs text-gray-500 mt-2">
                                        A customer must be selected for credit sales.
                                    </p>

                                </div>
                            )}

                            {/* AMOUNT PAID */}

                            <div className="bg-white border rounded-2xl p-5">

                                <h3 className="font-bold text-gray-800 mb-4">
                                    Amount Received
                                </h3>

                                <div className="bg-gray-50 border rounded-xl p-4 mb-4">

                                    <p className="text-xs text-gray-500">
                                        Amount Paid (TZS)
                                    </p>

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={form.data.paid_amount}
                                        onChange={(event) => {
                                            const value = event.target.value;

                                            form.setData(
                                                "paid_amount",
                                                value === "" ? 0 : value
                                            );

                                            setKeypadValue(value);
                                        }}
                                        className="w-full bg-transparent text-3xl md:text-4xl font-bold text-gray-800 outline-none mt-2"
                                    />

                                </div>

                                {/* QUICK AMOUNTS */}

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">

                                    {quickAmounts.map((amount, index) => (
                                        <button
                                            type="button"
                                            key={`${amount}-${index}`}
                                            onClick={() => setPaymentAmount(amount)}
                                            className="border rounded-xl py-3 px-2 text-sm font-semibold text-gray-700 hover:border-emerald-500 hover:bg-emerald-50"
                                        >
                                            {formatPrice(amount)}
                                        </button>
                                    ))}

                                </div>

                                {/* NUMPAD */}

                                <div className="grid grid-cols-3 gap-2 max-w-md">

                                    {[
                                        "1", "2", "3",
                                        "4", "5", "6",
                                        "7", "8", "9",
                                        ".", "0", "backspace",
                                    ].map((key) => (
                                        <button
                                            type="button"
                                            key={key}
                                            onClick={() => handleKeypad(key)}
                                            className="h-14 rounded-xl bg-gray-100 hover:bg-gray-200 text-xl font-bold text-gray-800"
                                        >
                                            {key === "backspace" ? "⌫" : key}
                                        </button>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={() => handleKeypad("clear")}
                                        className="col-span-3 h-12 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold"
                                    >
                                        Clear Amount
                                    </button>

                                </div>

                                {form.errors.paid_amount && (
                                    <p className="text-red-600 text-sm mt-3">
                                        {form.errors.paid_amount}
                                    </p>
                                )}

                            </div>

                        </div>

                        {/* PAYMENT SUMMARY */}

                        <div className="lg:col-span-1">

                            <div className="bg-white border rounded-2xl overflow-hidden lg:sticky lg:top-20">

                                <div className="bg-emerald-900 text-white p-5">

                                    <h2 className="text-xl font-bold">
                                        Order Summary
                                    </h2>

                                    <p className="text-sm text-emerald-200 mt-1">
                                        Review before confirming payment.
                                    </p>

                                </div>

                                <div className="p-5 space-y-4">

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">
                                            Items
                                        </span>

                                        <strong>
                                            {totalItems}
                                        </strong>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">
                                            Subtotal
                                        </span>

                                        <strong>
                                            {formatPrice(subtotal)}
                                        </strong>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">
                                            Discount
                                        </span>

                                        <strong className="text-red-600">
                                            - {formatPrice(discount)}
                                        </strong>
                                    </div>

                                    <div className="border-t pt-4 flex justify-between items-center">
                                        <span className="font-bold text-gray-700">
                                            TOTAL
                                        </span>

                                        <span className="text-2xl font-bold text-emerald-700">
                                            {formatPrice(total)}
                                        </span>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">

                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">
                                                Amount Paid
                                            </span>

                                            <strong>
                                                {formatPrice(paidAmount)}
                                            </strong>
                                        </div>

                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">
                                                Change
                                            </span>

                                            <strong className="text-emerald-700">
                                                {formatPrice(change)}
                                            </strong>
                                        </div>

                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">
                                                Balance
                                            </span>

                                            <strong className="text-red-600">
                                                {formatPrice(balance)}
                                            </strong>
                                        </div>

                                    </div>

                                    {isCredit && (
                                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                                            <p className="text-sm font-semibold text-amber-800">
                                                Credit Sale
                                            </p>

                                            <p className="text-xs text-amber-700 mt-1">
                                                The outstanding balance will remain payable by the selected customer.
                                            </p>
                                        </div>
                                    )}

                                    {!isCredit && paidAmount < total && (
                                        <p className="text-xs text-red-600">
                                            Amount received is less than the total.
                                        </p>
                                    )}

                                    {form.errors.items && (
                                        <p className="text-sm text-red-600">
                                            {form.errors.items}
                                        </p>
                                    )}

                                    {form.errors.discount && (
                                        <p className="text-sm text-red-600">
                                            {form.errors.discount}
                                        </p>
                                    )}

                                    <button
                                        type="button"
                                        onClick={completeSale}
                                        disabled={
                                            cart.length === 0 ||
                                            form.processing ||
                                            discount > subtotal ||
                                            (!isCredit && paidAmount < total) ||
                                            (isCredit && !form.data.customer_id)
                                        }
                                        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <CheckCircleIcon className="w-5 h-5" />

                                        {form.processing
                                            ? "Processing..."
                                            : "Validate Payment"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={backToOrder}
                                        disabled={form.processing}
                                        className="w-full border rounded-xl py-3 text-gray-600 font-semibold hover:bg-gray-50 flex items-center justify-center gap-2"
                                    >
                                        <ArrowLeftIcon className="w-4 h-4" />
                                        Back to Order
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                )}

            </div>
        </AdminLayout>
    );
}
