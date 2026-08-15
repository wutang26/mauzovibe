import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";

import {
    ArrowLeftIcon,
    PencilSquareIcon,
    TrashIcon,
    CubeIcon,
    TagIcon,
    ArchiveBoxIcon,
    CurrencyDollarIcon,
    QrCodeIcon,
    BuildingStorefrontIcon,
    ChartBarIcon,
} from "@heroicons/react/24/outline";

export default function Show({ product }) {
    const money = (value) =>
        new Intl.NumberFormat("en-TZ", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(Number(value) || 0);

    const sellingPrice = Number(product.selling_price) || 0;
    const costPrice = Number(product.cost_price) || 0;
    const quantity = Number(product.quantity) || 0;

    const profitPerUnit = sellingPrice - costPrice;
    const totalProfitPotential = profitPerUnit * quantity;
    const stockValue = costPrice * quantity;
    const salesValue = sellingPrice * quantity;

    const isLowStock = quantity <= 5;
    const isOutOfStock = quantity <= 0;

    const deleteProduct = () => {
        if (
            confirm(
                `Are you sure you want to delete "${product.name}"? This action cannot be undone.`
            )
        ) {
            router.delete(
                route("admin.products.destroy", product.id)
            );
        }
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

                {/* =====================================================
                    TOP BAR
                ====================================================== */}

                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-3">

                        <Link
                            href={route("admin.products.index")}
                            className="
                                inline-flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-slate-200
                                bg-white
                                text-slate-600
                                shadow-sm
                                transition
                                hover:bg-slate-50
                                hover:text-blue-600
                            "
                        >
                            <ArrowLeftIcon className="h-5 w-5" />
                        </Link>

                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Products
                            </p>

                            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                                Product Details
                            </h1>
                        </div>

                    </div>


                    {/* ACTIONS */}

                    <div className="flex items-center gap-2">

                        <Link
                            href={route(
                                "admin.products.edit",
                                product.id
                            )}
                            className="
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-blue-600
                                px-4
                                py-2.5
                                text-sm
                                font-semibold
                                text-white
                                shadow-sm
                                transition
                                hover:bg-blue-700
                            "
                        >
                            <PencilSquareIcon className="h-5 w-5" />

                            <span>Edit Product</span>
                        </Link>

                        <button
                            type="button"
                            onClick={deleteProduct}
                            className="
                                inline-flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-red-200
                                bg-white
                                text-red-600
                                transition
                                hover:bg-red-50
                            "
                            title="Delete Product"
                        >
                            <TrashIcon className="h-5 w-5" />
                        </button>

                    </div>

                </div>


                {/* =====================================================
                    MAIN PRODUCT CARD
                ====================================================== */}

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                    <div className="grid lg:grid-cols-5">

                        {/* =================================================
                            PRODUCT IMAGE
                        ================================================== */}

                        <div className="relative bg-gradient-to-br from-blue-50 via-white to-slate-100 p-6 sm:p-8 lg:col-span-2 lg:p-10">

                            <div className="flex h-full min-h-[300px] items-center justify-center">

                                <div className="
                                    relative
                                    flex
                                    aspect-square
                                    w-full
                                    max-w-[380px]
                                    items-center
                                    justify-center
                                    overflow-hidden
                                    rounded-3xl
                                    border
                                    border-slate-200
                                    bg-white
                                    shadow-lg
                                ">

                                    {product.image ? (
                                        <img
                                            src={`/storage/${product.image}`}
                                            alt={product.name}
                                            className="
                                                h-full
                                                w-full
                                                object-cover
                                            "
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-slate-300">

                                            <CubeIcon className="h-24 w-24" />

                                            <span className="mt-3 text-sm font-medium text-slate-400">
                                                No product image
                                            </span>

                                        </div>
                                    )}

                                </div>

                            </div>


                            {/* STOCK BADGE */}

                            <div className="absolute left-6 top-6 sm:left-8 sm:top-8">

                                {isOutOfStock ? (
                                    <span className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        bg-red-100
                                        px-3
                                        py-1.5
                                        text-xs
                                        font-bold
                                        text-red-700
                                    ">
                                        <span className="h-2 w-2 rounded-full bg-red-500" />
                                        Out of Stock
                                    </span>
                                ) : isLowStock ? (
                                    <span className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        bg-amber-100
                                        px-3
                                        py-1.5
                                        text-xs
                                        font-bold
                                        text-amber-700
                                    ">
                                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                                        Low Stock
                                    </span>
                                ) : (
                                    <span className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        bg-emerald-100
                                        px-3
                                        py-1.5
                                        text-xs
                                        font-bold
                                        text-emerald-700
                                    ">
                                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                        In Stock
                                    </span>
                                )}

                            </div>

                        </div>


                        {/* =================================================
                            PRODUCT INFORMATION
                        ================================================== */}

                        <div className="p-6 sm:p-8 lg:col-span-3 lg:p-10">

                            {/* CATEGORY */}

                            <div className="mb-3 flex items-center gap-2">

                                <span className="
                                    rounded-lg
                                    bg-blue-50
                                    px-3
                                    py-1
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-wide
                                    text-blue-600
                                ">
                                    {product.category?.name || "Uncategorized"}
                                </span>

                            </div>


                            {/* NAME */}

                            <h2 className="
                                max-w-2xl
                                text-3xl
                                font-black
                                tracking-tight
                                text-slate-900
                                sm:text-4xl
                            ">
                                {product.name}
                            </h2>


                            {/* DESCRIPTION */}

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                                Product information, pricing and current inventory
                                status for this branch.
                            </p>


                            {/* =================================================
                                PRICE
                            ================================================== */}

                            <div className="mt-8 grid gap-4 sm:grid-cols-2">

                                {/* SELLING PRICE */}

                                <div className="
                                    rounded-2xl
                                    border
                                    border-blue-100
                                    bg-blue-50
                                    p-5
                                ">

                                    <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">

                                        <CurrencyDollarIcon className="h-5 w-5" />

                                        Selling Price

                                    </div>

                                    <div className="mt-2">

                                        <span className="block text-xs font-semibold uppercase tracking-wider text-blue-500/70">
                                            TZS
                                        </span>

                                        <span className="
                                            block
                                            text-2xl
                                            font-black
                                            tracking-tight
                                            text-blue-700
                                            sm:text-3xl
                                        ">
                                            {money(sellingPrice)}
                                        </span>

                                    </div>

                                    <p className="mt-1 text-xs text-blue-500">
                                        Per {product.unit || "unit"}
                                    </p>

                                </div>


                                {/* COST PRICE */}

                                <div className="
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    p-5
                                ">

                                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">

                                        <TagIcon className="h-5 w-5" />

                                        Cost Price

                                    </div>

                                    <div className="mt-2">

                                        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            TZS
                                        </span>

                                        <span className="
                                            block
                                            text-2xl
                                            font-black
                                            tracking-tight
                                            text-slate-800
                                            sm:text-3xl
                                        ">
                                            {money(costPrice)}
                                        </span>

                                    </div>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Per {product.unit || "unit"}
                                    </p>

                                </div>

                            </div>


                            {/* =================================================
                                PROFIT
                            ================================================== */}

                            <div className={`
                                mt-4
                                rounded-2xl
                                border
                                p-5
                                ${
                                    profitPerUnit >= 0
                                        ? "border-emerald-100 bg-emerald-50"
                                        : "border-red-100 bg-red-50"
                                }
                            `}>

                                <div className="flex items-center justify-between gap-4">

                                    <div>

                                        <div className={`
                                            flex
                                            items-center
                                            gap-2
                                            text-sm
                                            font-semibold
                                            ${
                                                profitPerUnit >= 0
                                                    ? "text-emerald-700"
                                                    : "text-red-700"
                                            }
                                        `}>

                                            <ChartBarIcon className="h-5 w-5" />

                                            Expected Profit / Unit

                                        </div>

                                        <div className="mt-2 flex items-baseline gap-1">

                                            <span className="text-xs font-semibold uppercase tracking-wider opacity-60">
                                                TZS
                                            </span>

                                            <span className="
                                                text-2xl
                                                font-black
                                                tracking-tight
                                            ">
                                                {money(profitPerUnit)}
                                            </span>

                                        </div>

                                    </div>


                                    <div className={`
                                        rounded-xl
                                        px-3
                                        py-2
                                        text-xs
                                        font-bold
                                        ${
                                            profitPerUnit >= 0
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-red-100 text-red-700"
                                        }
                                    `}>

                                        {sellingPrice > 0
                                            ? `${(
                                                  (profitPerUnit /
                                                      sellingPrice) *
                                                  100
                                              ).toFixed(1)}% margin`
                                            : "0% margin"}

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =====================================================
                    INVENTORY & IDENTIFICATION
                ====================================================== */}

                <div className="mt-6 grid gap-6 lg:grid-cols-3">

                    {/* =================================================
                        INVENTORY
                    ================================================== */}

                    <div className="
                        rounded-3xl
                        border
                        border-slate-200
                        bg-white
                        p-6
                        shadow-sm
                        lg:col-span-2
                    ">

                        <div className="mb-6 flex items-center justify-between">

                            <div>

                                <h3 className="text-lg font-bold text-slate-900">
                                    Inventory Overview
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Current stock and inventory valuation
                                </p>

                            </div>

                            <div className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-xl
                                bg-blue-50
                                text-blue-600
                            ">
                                <ArchiveBoxIcon className="h-6 w-6" />
                            </div>

                        </div>


                        <div className="grid gap-4 sm:grid-cols-3">

                            {/* STOCK */}

                            <div className="rounded-2xl bg-slate-50 p-5">

                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Current Stock
                                </p>

                                <div className="mt-2 flex items-baseline gap-2">

                                    <span className="text-3xl font-black text-slate-900">
                                        {quantity}
                                    </span>

                                    <span className="text-sm font-medium text-slate-500">
                                        {product.unit || "pcs"}
                                    </span>

                                </div>

                            </div>


                            {/* STOCK VALUE */}

                            <div className="rounded-2xl bg-slate-50 p-5">

                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Stock Value
                                </p>

                                <p className="mt-2 text-xl font-black text-slate-900">
                                    <span className="mr-1 text-xs font-semibold text-slate-400">
                                        TZS
                                    </span>
                                    {money(stockValue)}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    At cost price
                                </p>

                            </div>


                            {/* SALES VALUE */}

                            <div className="rounded-2xl bg-slate-50 p-5">

                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Sales Value
                                </p>

                                <p className="mt-2 text-xl font-black text-blue-600">
                                    <span className="mr-1 text-xs font-semibold text-blue-400">
                                        TZS
                                    </span>
                                    {money(salesValue)}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    If all stock is sold
                                </p>

                            </div>

                        </div>


                        {/* POTENTIAL PROFIT */}

                        <div className="mt-4 flex flex-col justify-between gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-5 sm:flex-row sm:items-center">

                            <div>

                                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                                    Potential Profit
                                </p>

                                <p className="mt-1 text-sm text-emerald-700">
                                    Estimated profit if all current stock is sold
                                </p>

                            </div>

                            <div className="whitespace-nowrap">

                                <span className="mr-1 text-xs font-semibold text-emerald-600">
                                    TZS
                                </span>

                                <span className="text-2xl font-black text-emerald-700">
                                    {money(totalProfitPotential)}
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        PRODUCT IDENTIFICATION
                    ================================================== */}

                    <div className="
                        rounded-3xl
                        border
                        border-slate-200
                        bg-white
                        p-6
                        shadow-sm
                    ">

                        <div className="mb-6">

                            <h3 className="text-lg font-bold text-slate-900">
                                Product Information
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Identification details
                            </p>

                        </div>


                        <div className="space-y-5">

                            {/* SKU */}

                            <div className="flex items-start gap-3">

                                <div className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-slate-100
                                    text-slate-600
                                ">
                                    <TagIcon className="h-5 w-5" />
                                </div>

                                <div className="min-w-0">

                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        SKU
                                    </p>

                                    <p className="mt-1 break-all font-mono text-sm font-semibold text-slate-800">
                                        {product.sku || "Not assigned"}
                                    </p>

                                </div>

                            </div>


                            {/* BARCODE */}

                            <div className="flex items-start gap-3">

                                <div className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-slate-100
                                    text-slate-600
                                ">
                                    <QrCodeIcon className="h-5 w-5" />
                                </div>

                                <div className="min-w-0">

                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Barcode
                                    </p>

                                    <p className="mt-1 break-all font-mono text-sm font-semibold text-slate-800">
                                        {product.barcode || "Not assigned"}
                                    </p>

                                </div>

                            </div>


                            {/* CATEGORY */}

                            <div className="flex items-start gap-3">

                                <div className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-slate-100
                                    text-slate-600
                                ">
                                    <BuildingStorefrontIcon className="h-5 w-5" />
                                </div>

                                <div>

                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Category
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-800">
                                        {product.category?.name || "Uncategorized"}
                                    </p>

                                </div>

                            </div>


                            {/* UNIT */}

                            <div className="flex items-start gap-3">

                                <div className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-slate-100
                                    text-slate-600
                                ">
                                    <CubeIcon className="h-5 w-5" />
                                </div>

                                <div>

                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Unit
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-800">
                                        {product.unit || "pcs"}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =====================================================
                    FOOTER ACTION
                ====================================================== */}

                <div className="mt-6 flex justify-center">

                    <Link
                        href={route("admin.products.index")}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            font-semibold
                            text-slate-500
                            transition
                            hover:text-blue-600
                        "
                    >
                        <ArrowLeftIcon className="h-4 w-4" />

                        Back to Products
                    </Link>

                </div>

            </div>
        </AdminLayout>
    );
}