
import React, { useMemo, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";

import {
    PlusIcon,
    CubeIcon,
    EyeIcon,
    PencilSquareIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    Squares2X2Icon,
    ListBulletIcon,
    ShoppingCartIcon,
    FunnelIcon,
    ExclamationTriangleIcon,
    XMarkIcon,
    TagIcon,
    // BarcodeIcon,
    ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

export default function Index({ products }) {

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [stockFilter, setStockFilter] = useState("all");
    const [viewMode, setViewMode] = useState("grid");

    const productList = products?.data ?? [];

    // Currency formatter
    const formatMoney = (amount) => {
        return Number(amount || 0).toLocaleString("en-US");
    };

    // Stock status
    const getStockStatus = (quantity) => {
        const qty = Number(quantity || 0);

        if (qty <= 0) {
            return {
                label: "Out of Stock",
                className: "bg-gray-100 text-gray-600",
                dot: "bg-gray-500",
            };
        }

        if (qty <= 5) {
            return {
                label: "Low Stock",
                className: "bg-red-100 text-red-700",
                dot: "bg-red-500",
            };
        }

        return {
            label: "In Stock",
            className: "bg-green-100 text-green-700",
            dot: "bg-green-500",
        };
    };

    // Categories available on the current page
    const categories = useMemo(() => {
        return [
            ...new Map(
                productList
                    .filter((product) => product.category)
                    .map((product) => [
                        product.category.id,
                        product.category,
                    ])
            ).values(),
        ];
    }, [productList]);

    // Search and filtering
    const filteredProducts = useMemo(() => {

        return productList.filter((product) => {

            const searchTerm = search.toLowerCase().trim();

            const matchesSearch =
                !searchTerm ||
                product.name?.toLowerCase().includes(searchTerm) ||
                product.sku?.toLowerCase().includes(searchTerm) ||
                product.barcode?.toLowerCase().includes(searchTerm);

            const matchesCategory =
                selectedCategory === "all" ||
                String(product.category?.id) === selectedCategory;

            const quantity = Number(product.quantity || 0);

            let matchesStock = true;

            if (stockFilter === "in_stock") {
                matchesStock = quantity > 5;
            }

            if (stockFilter === "low_stock") {
                matchesStock = quantity > 0 && quantity <= 5;
            }

            if (stockFilter === "out_of_stock") {
                matchesStock = quantity <= 0;
            }

            return (
                matchesSearch &&
                matchesCategory &&
                matchesStock
            );

        });

    }, [productList, search, selectedCategory, stockFilter]);

    // Current page statistics
    const totalProducts = Number(products?.total ?? productList.length);

    const lowStockCount = productList.filter(
        (product) =>
            Number(product.quantity || 0) > 0 &&
            Number(product.quantity || 0) <= 5
    ).length;

    const outOfStockCount = productList.filter(
        (product) => Number(product.quantity || 0) <= 0
    ).length;

    const totalUnits = productList.reduce(
        (total, product) =>
            total + Number(product.quantity || 0),
        0
    );

    // Delete product
    const deleteProduct = (id) => {

        if (confirm("Are you sure you want to delete this product?")) {

            router.delete(
                route("admin.products.destroy", id),
                {
                    preserveScroll: true,
                }
            );

        }

    };

    // Product image
    const ProductImage = ({ product, large = false }) => {

        const [imageError, setImageError] = useState(false);

        return (
            <div
                className={`
                    relative flex items-center justify-center
                    overflow-hidden rounded-xl bg-gray-50
                    ${large ? "h-40 sm:h-44" : "h-12 w-12"}
                `}
            >

                {product.image_url && !imageError ? (

                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-contain p-2"
                        loading="lazy"
                        onError={() => setImageError(true)}
                    />

                ) : (

                    <CubeIcon
                        className={`
                            text-green-600
                            ${large ? "h-16 w-16" : "h-6 w-6"}
                        `}
                    />

                )}

            </div>
        );
    };

    // Action buttons
    const ProductActions = ({ product }) => (

        <div className="flex items-center gap-2">

            <Link
                href={route("admin.products.show", product.id)}
                title="View Product"
                className="flex flex-1 items-center justify-center gap-1.5
                    rounded-lg border border-gray-200 bg-gray-50
                    px-2 py-2 text-xs font-semibold text-gray-700
                    transition hover:bg-gray-100"
            >
                <EyeIcon className="h-4 w-4" />
                <span>View</span>
            </Link>

            <Link
                href={route("admin.products.edit", product.id)}
                title="Edit Product"
                className="flex flex-1 items-center justify-center gap-1.5
                    rounded-lg border border-blue-200 bg-blue-50
                    px-2 py-2 text-xs font-semibold text-blue-600
                    transition hover:bg-blue-100"
            >
                <PencilSquareIcon className="h-4 w-4" />
                <span>Edit</span>
            </Link>

            <button
                type="button"
                onClick={() => deleteProduct(product.id)}
                title="Delete Product"
                className="flex flex-1 items-center justify-center gap-1.5
                    rounded-lg border border-red-200 bg-red-50
                    px-2 py-2 text-xs font-semibold text-red-600
                    transition hover:bg-red-100"
            >
                <TrashIcon className="h-4 w-4" />
                <span>Delete</span>
            </button>

        </div>

    );

    return (

        <AdminLayout>

            <div className="min-h-screen bg-slate-50 p-3 sm:p-5 lg:p-7">

                {/* =========================================
                    PAGE HEADER
                ========================================= */}

                <div className="
                    mb-6 grid grid-cols-1 gap-4
                    lg:grid-cols-[1fr_minmax(250px,1.3fr)_auto]
                    lg:items-center
                ">

                    {/* Title */}

                    <div className="flex items-center gap-3">

                        <div className="
                            flex h-14 w-14 shrink-0 items-center
                            justify-center rounded-2xl bg-green-100
                        ">
                            <CubeIcon className="h-8 w-8 text-green-700" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                                Products
                            </h1>

                            <p className="text-sm text-gray-500">
                                Manage your branch inventory
                            </p>
                        </div>

                    </div>

                    {/* Center Search */}

                    <div className="relative w-full">

                        <MagnifyingGlassIcon
                            className="
                                absolute left-4 top-1/2
                                h-5 w-5 -translate-y-1/2
                                text-gray-400
                            "
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search product name, barcode or SKU..."
                            className="
                                h-12 w-full rounded-xl border
                                border-gray-200 bg-white
                                pl-12 pr-11 text-sm text-gray-800
                                shadow-sm outline-none
                                transition
                                focus:border-green-500
                                focus:ring-2 focus:ring-green-100
                            "
                        />

                        {search && (

                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="
                                    absolute right-3 top-1/2
                                    -translate-y-1/2 rounded-lg
                                    p-1 text-gray-400 hover:bg-gray-100
                                "
                            >
                                <XMarkIcon className="h-5 w-5" />
                            </button>

                        )}

                    </div>

                    {/* Header Actions */}

                    <div className="flex flex-wrap items-center gap-2">

                        <Link
                            href={route("admin.sales.create")}
                            className="
                                inline-flex h-12 flex-1 items-center
                                justify-center gap-2 rounded-xl
                                border border-green-200 bg-white
                                px-4 text-sm font-bold text-green-700
                                shadow-sm transition hover:bg-green-50
                                lg:flex-none
                            "
                        >
                            <ShoppingCartIcon className="h-5 w-5" />
                            Quick Sale
                        </Link>

                        <Link
                            href={route("admin.products.create")}
                            className="
                                inline-flex h-12 flex-1 items-center
                                justify-center gap-2 rounded-xl
                                bg-green-600 px-4 text-sm
                                font-bold text-white shadow-md
                                transition hover:bg-green-700
                                lg:flex-none
                            "
                        >
                            <PlusIcon className="h-5 w-5" />
                            Add Product
                        </Link>

                    </div>

                </div>

                {/* =========================================
                    SUMMARY CARDS
                ========================================= */}

                <div className="
                    mb-6 grid grid-cols-2 gap-3
                    xl:grid-cols-4
                ">

                    {/* Total Products */}

                    <div className="
                        flex items-center gap-3 rounded-2xl
                        border border-green-100 bg-green-50
                        p-4 shadow-sm
                    ">

                        <div className="
                            flex h-12 w-12 shrink-0 items-center
                            justify-center rounded-xl bg-green-100
                        ">
                            <CubeIcon className="h-7 w-7 text-green-700" />
                        </div>

                        <div className="min-w-0">
                            <h3 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                                {totalProducts.toLocaleString()}
                            </h3>

                            <p className="text-xs text-gray-600 sm:text-sm">
                                Total Products
                            </p>
                        </div>

                    </div>

                    {/* Total Units */}

                    <div className="
                        flex items-center gap-3 rounded-2xl
                        border border-blue-100 bg-blue-50
                        p-4 shadow-sm
                    ">

                        <div className="
                            flex h-12 w-12 shrink-0 items-center
                            justify-center rounded-xl bg-blue-100
                        ">
                            <ArchiveBoxIcon className="h-7 w-7 text-blue-700" />
                        </div>

                        <div className="min-w-0">
                            <h3 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                                {totalUnits.toLocaleString()}
                            </h3>

                            <p className="text-xs text-gray-600 sm:text-sm">
                                Stock Units
                            </p>
                        </div>

                    </div>

                    {/* Low Stock */}

                    <div className="
                        flex items-center gap-3 rounded-2xl
                        border border-orange-100 bg-orange-50
                        p-4 shadow-sm
                    ">

                        <div className="
                            flex h-12 w-12 shrink-0 items-center
                            justify-center rounded-xl bg-orange-100
                        ">
                            <ExclamationTriangleIcon className="h-7 w-7 text-orange-600" />
                        </div>

                        <div className="min-w-0">
                            <h3 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                                {lowStockCount}
                            </h3>

                            <p className="text-xs text-gray-600 sm:text-sm">
                                Low Stock
                            </p>
                        </div>

                    </div>

                    {/* Out Of Stock */}

                    <div className="
                        flex items-center gap-3 rounded-2xl
                        border border-purple-100 bg-purple-50
                        p-4 shadow-sm
                    ">

                        <div className="
                            flex h-12 w-12 shrink-0 items-center
                            justify-center rounded-xl bg-purple-100
                        ">
                            <CubeIcon className="h-7 w-7 text-purple-700" />
                        </div>

                        <div className="min-w-0">
                            <h3 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                                {outOfStockCount}
                            </h3>

                            <p className="text-xs text-gray-600 sm:text-sm">
                                Out of Stock
                            </p>
                        </div>

                    </div>

                </div>

                {/* =========================================
                    FILTERS AND VIEW SWITCHER
                ========================================= */}

                <div className="
                    mb-5 flex flex-col gap-3
                    xl:flex-row xl:items-center
                    xl:justify-between
                ">

                    {/* Filters */}

                    <div className="
                        flex flex-col gap-3
                        sm:flex-row sm:flex-wrap
                    ">

                        <div className="relative">

                            <TagIcon className="
                                pointer-events-none absolute
                                left-3 top-1/2 h-4 w-4
                                -translate-y-1/2 text-gray-400
                            " />

                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="
                                    h-11 w-full appearance-none
                                    rounded-xl border border-gray-200
                                    bg-white pl-10 pr-9 text-sm
                                    text-gray-700 outline-none
                                    focus:border-green-500
                                    sm:min-w-48
                                "
                            >
                                <option value="all">All Categories</option>

                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={String(category.id)}
                                    >
                                        {category.name}
                                    </option>
                                ))}

                            </select>

                        </div>

                        <div className="relative">

                            <FunnelIcon className="
                                pointer-events-none absolute
                                left-3 top-1/2 h-4 w-4
                                -translate-y-1/2 text-gray-400
                            " />

                            <select
                                value={stockFilter}
                                onChange={(e) => setStockFilter(e.target.value)}
                                className="
                                    h-11 w-full appearance-none
                                    rounded-xl border border-gray-200
                                    bg-white pl-10 pr-9 text-sm
                                    text-gray-700 outline-none
                                    focus:border-green-500
                                    sm:min-w-44
                                "
                            >
                                <option value="all">All Stock Status</option>
                                <option value="in_stock">In Stock</option>
                                <option value="low_stock">Low Stock</option>
                                <option value="out_of_stock">Out of Stock</option>
                            </select>

                        </div>

                    </div>

                    {/* View Toggle */}

                    <div className="
                        flex items-center justify-between
                        gap-3
                    ">

                        <p className="text-sm text-gray-500">
                            {filteredProducts.length} products found
                        </p>

                        <div className="
                            flex items-center gap-1
                            rounded-xl border border-gray-200
                            bg-white p-1 shadow-sm
                        ">

                            <button
                                type="button"
                                onClick={() => setViewMode("grid")}
                                title="Grid View"
                                className={`
                                    rounded-lg p-2 transition
                                    ${viewMode === "grid"
                                        ? "bg-green-600 text-white shadow-sm"
                                        : "text-gray-500 hover:bg-gray-100"
                                    }
                                `}
                            >
                                <Squares2X2Icon className="h-5 w-5" />
                            </button>

                            <button
                                type="button"
                                onClick={() => setViewMode("list")}
                                title="List View"
                                className={`
                                    rounded-lg p-2 transition
                                    ${viewMode === "list"
                                        ? "bg-green-600 text-white shadow-sm"
                                        : "text-gray-500 hover:bg-gray-100"
                                    }
                                `}
                            >
                                <ListBulletIcon className="h-5 w-5" />
                            </button>

                        </div>

                    </div>

                </div>

                {/* =========================================
                    GRID VIEW
                ========================================= */}

                {viewMode === "grid" && (

                    <div className="
                        grid grid-cols-1 gap-4
                        sm:grid-cols-2
                        xl:grid-cols-3
                        2xl:grid-cols-4
                    ">

                        {filteredProducts.map((product) => {

                            const stock = getStockStatus(product.quantity);

                            return (

                                <div
                                    key={product.id}
                                    className="
                                        group overflow-hidden rounded-2xl
                                        border border-gray-200 bg-white
                                        p-3 shadow-sm transition-all
                                        duration-200
                                        hover:-translate-y-1
                                        hover:shadow-lg
                                    "
                                >

                                    {/* Image and Stock */}

                                    <div className="relative">

                                        <ProductImage
                                            product={product}
                                            large
                                        />

                                        <span className={`
                                            absolute right-2 top-2
                                            inline-flex items-center gap-1.5
                                            rounded-full px-3 py-1.5
                                            text-xs font-bold shadow-sm
                                            ${stock.className}
                                        `}>

                                            <span className={`
                                                h-2 w-2 rounded-full
                                                ${stock.dot}
                                            `} />

                                            Stock: {Number(product.quantity || 0).toLocaleString()}

                                        </span>

                                    </div>

                                    {/* Product Details */}

                                    <div className="pt-3">

                                        <h3
                                            className="
                                                truncate text-base
                                                font-extrabold text-gray-900
                                            "
                                            title={product.name}
                                        >
                                            {product.name}
                                        </h3>

                                        <div className="
                                            mt-1 flex items-center
                                            gap-1.5 text-sm text-gray-500
                                        ">

                                            <TagIcon className="h-4 w-4 shrink-0" />

                                            <span className="truncate">
                                                {product.category?.name || "Uncategorized"}
                                            </span>

                                        </div>

                                        {/* SKU */}

                                        <p className="
                                            mt-1 truncate text-xs
                                            text-gray-400
                                        ">
                                            SKU: {product.sku || "-"}
                                        </p>

                                        {/* Barcode */}

                                        {product.barcode && (

                                            <div className="
                                                mt-2 flex items-center
                                                gap-2 rounded-lg
                                                bg-gray-50 px-2.5 py-2
                                            ">

                                                <TagIcon  className="
                                                    h-4 w-4 shrink-0
                                                    text-gray-500
                                                " />

                                                <span className="
                                                    truncate font-mono
                                                    text-xs text-gray-600
                                                ">
                                                    {product.barcode}
                                                </span>

                                            </div>

                                        )}

                                        {/* Price */}

                                        <div className="
                                            mt-3 border-t border-gray-100
                                            pt-2
                                        ">

                                            <p className="
                                                text-xl font-extrabold
                                                text-green-600
                                            ">
                                                TZS {formatMoney(product.selling_price)}
                                            </p>

                                        </div>

                                        {/* Actions */}

                                        <div className="
                                            mt-3 border-t border-gray-100
                                            pt-2
                                        ">

                                            <ProductActions product={product} />

                                        </div>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                )}

                {/* =========================================
                    LIST VIEW
                ========================================= */}

                {viewMode === "list" && (

                    <div className="
                        overflow-hidden rounded-2xl
                        border border-gray-200 bg-white
                        shadow-sm
                    ">

                        <div className="overflow-x-auto">

                            <table className="w-full text-sm">

                                <thead className="bg-gray-50 text-gray-600">

                                    <tr>
                                        <th className="p-4 text-left">Product</th>
                                        <th className="p-4 text-left">Barcode</th>
                                        <th className="p-4 text-left">Category</th>
                                        <th className="p-4 text-left">Price</th>
                                        <th className="p-4 text-left">Stock</th>
                                        <th className="p-4 text-left">Status</th>
                                        <th className="p-4 text-left">Actions</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredProducts.map((product) => {

                                        const stock = getStockStatus(product.quantity);

                                        return (

                                            <tr
                                                key={product.id}
                                                className="
                                                    border-t border-gray-100
                                                    transition hover:bg-gray-50
                                                "
                                            >

                                                <td className="p-3">

                                                    <div className="flex min-w-48 items-center gap-3">

                                                        <ProductImage product={product} />

                                                        <div className="min-w-0">

                                                            <p className="
                                                                truncate font-bold
                                                                text-gray-900
                                                            ">
                                                                {product.name}
                                                            </p>

                                                            <p className="text-xs text-gray-500">
                                                                SKU: {product.sku || "-"}
                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>

                                                <td className="p-4 font-mono text-xs">
                                                    {product.barcode || "-"}
                                                </td>

                                                <td className="p-4">
                                                    {product.category?.name || "-"}
                                                </td>

                                                <td className="p-4 font-bold text-green-700">
                                                    TZS {formatMoney(product.selling_price)}
                                                </td>

                                                <td className="p-4 font-semibold">
                                                    {product.quantity}
                                                </td>

                                                <td className="p-4">

                                                    <span className={`
                                                        rounded-full px-3 py-1
                                                        text-xs font-bold
                                                        ${stock.className}
                                                    `}>
                                                        {stock.label}
                                                    </span>

                                                </td>

                                                <td className="p-4">

                                                    <div className="flex items-center gap-1">

                                                        <Link
                                                            href={route("admin.products.show", product.id)}
                                                            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
                                                            title="View"
                                                        >
                                                            <EyeIcon className="h-5 w-5" />
                                                        </Link>

                                                        <Link
                                                            href={route("admin.products.edit", product.id)}
                                                            className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                                                            title="Edit"
                                                        >
                                                            <PencilSquareIcon className="h-5 w-5" />
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            onClick={() => deleteProduct(product.id)}
                                                            className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                                                            title="Delete"
                                                        >
                                                            <TrashIcon className="h-5 w-5" />
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        );

                                    })}

                                </tbody>

                            </table>

                        </div>

                    </div>

                )}

                {/* =========================================
                    EMPTY STATE
                ========================================= */}

                {filteredProducts.length === 0 && (

                    <div className="
                        rounded-2xl border border-dashed
                        border-gray-300 bg-white
                        px-5 py-16 text-center shadow-sm
                    ">

                        <div className="
                            mx-auto mb-4 flex h-16 w-16
                            items-center justify-center
                            rounded-2xl bg-green-50
                        ">
                            <CubeIcon className="h-9 w-9 text-green-600" />
                        </div>

                        <h3 className="
                            text-lg font-bold text-gray-900
                        ">
                            No Products Found
                        </h3>

                        <p className="
                            mx-auto mt-2 max-w-sm
                            text-sm text-gray-500
                        ">
                            No products match your search or selected filters.
                            Try changing your search criteria.
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                setSearch("");
                                setSelectedCategory("all");
                                setStockFilter("all");
                            }}
                            className="
                                mt-5 inline-flex items-center
                                gap-2 rounded-xl bg-green-600
                                px-5 py-2.5 text-sm font-bold
                                text-white transition hover:bg-green-700
                            "
                        >
                            <XMarkIcon className="h-4 w-4" />
                            Clear Filters
                        </button>

                    </div>

                )}

                {/* =========================================
                    FOOTER AND PAGINATION
                ========================================= */}

                <div className="
                    mt-6 flex flex-col gap-4
                    sm:flex-row sm:items-center
                    sm:justify-between
                ">

                    <p className="text-sm text-gray-500">

                        Showing{" "}
                        <span className="font-bold text-gray-800">
                            {filteredProducts.length}
                        </span>

                        {" "}of{" "}

                        <span className="font-bold text-gray-800">
                            {productList.length}
                        </span>

                        {" "}products on this page

                    </p>

                    {products?.links?.length > 3 && (

                        <div className="
                            flex flex-wrap items-center
                            justify-center gap-1
                        ">

                            {products.links.map((link, index) => (

                                <Link
                                    key={index}
                                    href={link.url || "#"}
                                    preserveScroll
                                    onClick={(e) => {
                                        if (!link.url) {
                                            e.preventDefault();
                                        }
                                    }}
                                    className={`
                                        flex h-10 min-w-10 items-center
                                        justify-center rounded-lg
                                        border px-3 text-sm font-semibold
                                        transition
                                        ${link.active
                                            ? "border-green-600 bg-green-600 text-white"
                                            : link.url
                                                ? "border-gray-200 bg-white text-gray-700 hover:bg-green-50 hover:text-green-700"
                                                : "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300"
                                        }
                                    `}
                                >

                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />

                                </Link>

                            ))}

                        </div>

                    )}

                </div>

                {/* Footer */}

                <div className="
                    mt-8 border-t border-gray-200
                    pt-5 text-center text-xs text-gray-400
                ">

                    Powered by <span className="font-bold text-green-700">NAC Technologies</span>

                </div>

            </div>

        </AdminLayout>

    );

}
