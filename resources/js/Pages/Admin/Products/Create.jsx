
import React, { useEffect, useRef, useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

import {
    KeyboardIcon,
    ScanBarcodeIcon,
    ArrowLeftIcon,
    PackageIcon,
    CheckCircleIcon,
} from "lucide-react";

export default function Create({ categories = [] }) {
    const [registrationMode, setRegistrationMode] = useState("manual");
    const [scannerReady, setScannerReady] = useState(false);

    const barcodeInputRef = useRef(null);

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        category_id: "",
        sku: "",
        barcode: "",
        image: null,
        cost_price: "",
        selling_price: "",
        quantity: "",
        unit: "pcs",
    });

    // Focus barcode field when USB scanner mode is selected
    useEffect(() => {
        if (registrationMode === "scanner") {
            setScannerReady(false);

            const timeout = setTimeout(() => {
                barcodeInputRef.current?.focus();
                setScannerReady(true);
            }, 200);

            return () => clearTimeout(timeout);
        }

        setScannerReady(false);
    }, [registrationMode]);

    function selectMode(mode) {
        setRegistrationMode(mode);
    }

    function handleBarcodeKeyDown(e) {
        // Most USB barcode scanners send Enter after scanning.
        if (e.key === "Enter") {
            e.preventDefault();
            setScannerReady(false);
        }
    }

    function submit(e) {
        e.preventDefault();

        post(route("admin.products.store"), {
            forceFormData: true,
        });
    }

    return (
        <AdminLayout>
            <div className="p-6 max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Create Product
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Register a new product in your inventory.
                        </p>
                    </div>

                    <Link
                        href={route("admin.products.index")}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                        <ArrowLeftIcon size={18} />
                        Back to Products
                    </Link>
                </div>

                {/* Registration Method */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-1">
                        Choose Registration Method
                    </h2>

                    <p className="text-sm text-gray-500 mb-5">
                        Select how you want to register this product.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Manual Option */}
                        <button
                            type="button"
                            onClick={() => selectMode("manual")}
                            className={`text-left border-2 rounded-xl p-5 transition ${
                                registrationMode === "manual"
                                    ? "border-green-600 bg-green-50"
                                    : "border-gray-200 hover:border-green-300"
                            }`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="bg-green-100 text-green-700 p-3 rounded-xl">
                                    <KeyboardIcon size={25} />
                                </div>

                                {registrationMode === "manual" && (
                                    <CheckCircleIcon
                                        className="text-green-600"
                                        size={23}
                                    />
                                )}
                            </div>

                            <h3 className="font-bold text-gray-800 text-lg">
                                Manual Entry
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                Enter product information manually using
                                your keyboard.
                            </p>
                        </button>

                        {/* USB Scanner Option */}
                        <button
                            type="button"
                            onClick={() => selectMode("scanner")}
                            className={`text-left border-2 rounded-xl p-5 transition ${
                                registrationMode === "scanner"
                                    ? "border-green-600 bg-green-50"
                                    : "border-gray-200 hover:border-green-300"
                            }`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="bg-green-100 text-green-700 p-3 rounded-xl">
                                    <ScanBarcodeIcon size={25} />
                                </div>

                                {registrationMode === "scanner" && (
                                    <CheckCircleIcon
                                        className="text-green-600"
                                        size={23}
                                    />
                                )}
                            </div>

                            <h3 className="font-bold text-gray-800 text-lg">
                                USB Barcode Scanner
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                Scan the product barcode using a USB or
                                Bluetooth barcode scanner.
                            </p>
                        </button>
                    </div>
                </div>

                {/* Scanner Instructions */}
                {registrationMode === "scanner" && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                        <div className="flex items-start gap-3">
                            <ScanBarcodeIcon
                                className="text-green-700 mt-1"
                                size={24}
                            />

                            <div>
                                <h3 className="font-semibold text-green-800">
                                    USB Scanner Mode
                                </h3>

                                <p className="text-sm text-green-700 mt-1">
                                    Connect your USB barcode scanner and scan
                                    the product barcode into the field below.
                                </p>

                                <p className="text-sm mt-2 font-medium text-green-800">
                                    {scannerReady
                                        ? "Ready to scan. Scan your product now."
                                        : "Preparing barcode field..."}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Product Form */}
                <form
                    onSubmit={submit}
                    encType="multipart/form-data"
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6"
                >
                    {/* Product Information */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <PackageIcon
                                className="text-green-600"
                                size={21}
                            />

                            <h2 className="font-semibold text-lg text-gray-800">
                                Product Information
                            </h2>
                        </div>

                        <div className="space-y-4">

                            {/* Product Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Name
                                </label>

                                <input
                                    type="text"
                                    required
                                    className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
                                    placeholder="Enter product name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />

                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>

                                <select
                                    required
                                    className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
                                    value={data.category_id}
                                    onChange={(e) =>
                                        setData("category_id", e.target.value)
                                    }
                                >
                                    <option value="">Select Category</option>

                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>

                                {errors.category_id && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.category_id}
                                    </p>
                                )}
                            </div>

                            {/* SKU and Barcode */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* SKU */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product SKU
                                    </label>

                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
                                        placeholder="Enter product SKU"
                                        value={data.sku}
                                        onChange={(e) =>
                                            setData("sku", e.target.value)
                                        }
                                    />

                                    {errors.sku && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.sku}
                                        </p>
                                    )}
                                </div>

                                {/* Barcode */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Barcode
                                    </label>

                                    <div className="flex gap-2">
                                        <input
                                            ref={barcodeInputRef}
                                            type="text"
                                            required
                                            autoComplete="off"
                                            className="border border-gray-300 rounded-xl p-3 w-full min-w-0 focus:ring-2 focus:ring-green-500 outline-none"
                                            placeholder={
                                                registrationMode === "scanner"
                                                    ? "Scan barcode here..."
                                                    : "Enter barcode manually"
                                            }
                                            value={data.barcode}
                                            onChange={(e) =>
                                                setData(
                                                    "barcode",
                                                    e.target.value
                                                )
                                            }
                                            onKeyDown={handleBarcodeKeyDown}
                                        />

                                        {registrationMode === "scanner" && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    barcodeInputRef.current?.focus();
                                                    setScannerReady(true);
                                                }}
                                                className="shrink-0 bg-green-600 text-white px-4 rounded-xl hover:bg-green-700"
                                                title="Focus barcode field"
                                            >
                                                <ScanBarcodeIcon size={21} />
                                            </button>
                                        )}
                                    </div>

                                    {registrationMode === "scanner" && (
                                        <p className="text-xs text-green-700 mt-2">
                                            USB scanner input is active.
                                            Barcode: {data.barcode || "Waiting for scan..."}
                                        </p>
                                    )}

                                    {errors.barcode && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.barcode}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Image */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Image
                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="border border-gray-300 rounded-xl p-3 w-full"
                                    onChange={(e) =>
                                        setData(
                                            "image",
                                            e.target.files[0] || null
                                        )
                                    }
                                />

                                {errors.image && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.image}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Pricing */}
                    <div>
                        <h2 className="font-semibold text-lg text-gray-800 mb-4">
                            Pricing Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cost Price (TZS)
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    required
                                    className="border border-gray-300 rounded-xl p-3 w-full"
                                    placeholder="Enter cost price"
                                    value={data.cost_price}
                                    onChange={(e) =>
                                        setData("cost_price", e.target.value)
                                    }
                                />

                                {errors.cost_price && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.cost_price}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Selling Price (TZS)
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    required
                                    className="border border-gray-300 rounded-xl p-3 w-full"
                                    placeholder="Enter selling price"
                                    value={data.selling_price}
                                    onChange={(e) =>
                                        setData("selling_price", e.target.value)
                                    }
                                />

                                {errors.selling_price && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.selling_price}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Inventory */}
                    <div>
                        <h2 className="font-semibold text-lg text-gray-800 mb-4">
                            Inventory Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Opening Stock
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="any"
                                    required
                                    className="border border-gray-300 rounded-xl p-3 w-full"
                                    placeholder="Enter opening quantity"
                                    value={data.quantity}
                                    onChange={(e) =>
                                        setData("quantity", e.target.value)
                                    }
                                />

                                {errors.quantity && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.quantity}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Unit
                                </label>

                                <select
                                    className="border border-gray-300 rounded-xl p-3 w-full"
                                    value={data.unit}
                                    onChange={(e) =>
                                        setData("unit", e.target.value)
                                    }
                                >
                                    <option value="pcs">Pieces (pcs)</option>
                                    <option value="kg">Kilogram (kg)</option>
                                    <option value="g">Gram (g)</option>
                                    <option value="ltr">Litre (ltr)</option>
                                    <option value="ml">Millilitre (ml)</option>
                                    <option value="box">Box</option>
                                    <option value="pack">Pack</option>
                                    <option value="dozen">Dozen</option>
                                    <option value="pair">Pair</option>
                                    <option value="meter">Meter</option>
                                </select>

                                {errors.unit && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.unit}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-5 border-t border-gray-100">

                        <Link
                            href={route("admin.products.index")}
                            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-center hover:bg-gray-50"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="px-7 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50"
                        >
                            {processing ? "Saving Product..." : "Create Product"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
