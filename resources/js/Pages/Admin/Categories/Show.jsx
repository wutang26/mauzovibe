import AdminLayout from "@/Layouts/AdminLayout";

import { Link } from "@inertiajs/react";

import {
    ArrowLeftIcon,
    PencilSquareIcon,
    FolderIcon,
    CubeIcon,
    TagIcon,
    CalendarDaysIcon,
    EyeIcon,
    TrashIcon,
    ClockIcon,
    ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";


export default function Show({ category }) {

    const products = category.products ?? [];

    const totalProducts = products.length;

    const totalStock = products.reduce(
        (total, product) =>
            total + Number(product.quantity || 0),
        0
    );

    const totalValue = products.reduce(
        (total, product) =>
            total +
            Number(product.selling_price || 0) *
            Number(product.quantity || 0),
        0
    );


    const money = (value) => {

        return new Intl.NumberFormat("en-TZ", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(Number(value) || 0);

    };


    const formatDate = (date) => {

        if (!date) return "-";

        return new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(new Date(date));

    };


    const formatDateTime = (date) => {

        if (!date) return "-";

        return new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(new Date(date));

    };


    return (

        <AdminLayout>

            <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

                {/* =====================================================
                    TOP HEADER
                ===================================================== */}

                <div className="
                    mb-6
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                ">

                    <div className="flex items-center gap-3">

                        <Link
                            href={route("admin.categories.index")}
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-slate-200
                                bg-white
                                text-slate-600
                                shadow-sm
                                transition
                                hover:bg-slate-100
                                hover:text-slate-900
                            "
                            title="Back to Categories"
                        >

                            <ArrowLeftIcon className="h-5 w-5" />

                        </Link>


                        <div>

                            <div className="
                                mb-1
                                flex
                                items-center
                                gap-2
                                text-sm
                                text-slate-500
                            ">

                                <span>
                                    Categories
                                </span>

                                <span>
                                    /
                                </span>

                                <span className="text-slate-700">
                                    Details
                                </span>

                            </div>


                            <h1 className="
                                text-2xl
                                font-black
                                tracking-tight
                                text-slate-900
                                sm:text-3xl
                            ">

                                Category Details

                            </h1>

                        </div>

                    </div>


                   <div className="flex gap-2">

                        {/* View */}
                        <Link
                            href={route(
                                "admin.categories.show",
                                category.id
                            )}
                            className="
                                rounded-lg
                                p-2
                                transition
                                hover:bg-slate-100
                            "
                            title="View Category"
                        >

                            <EyeIcon
                                className="
                                    h-5
                                    w-5
                                    text-slate-600
                                "
                            />

                        </Link>


                        {/* Edit */}
                        <Link
                            href={route(
                                "admin.categories.edit",
                                category.id
                            )}
                            className="
                                rounded-lg
                                p-2
                                transition
                                hover:bg-blue-100
                            "
                            title="Edit Category"
                        >

                            <PencilSquareIcon
                                className="
                                    h-5
                                    w-5
                                    text-blue-600
                                "
                            />

                        </Link>


                        {/* Delete */}
                        <button
                            onClick={() =>
                                deleteCategory(category.id)
                            }
                            className="
                                rounded-lg
                                p-2
                                transition
                                hover:bg-red-100
                            "
                            title="Delete Category"
                        >

                            <TrashIcon
                                className="
                                    h-5
                                    w-5
                                    text-red-600
                                "
                            />

                        </button>

                    </div>

                </div>


                {/* =====================================================
                    CATEGORY HERO
                ===================================================== */}

                <div className="
                    mb-6
                    overflow-hidden
                    rounded-2xl
                    bg-white
                    shadow-sm
                    ring-1
                    ring-slate-200
                ">

                    <div className="
                        bg-gradient-to-r
                        from-blue-600
                        via-blue-500
                        to-indigo-600
                        px-5
                        py-6
                        text-white
                        sm:px-8
                        sm:py-8
                    ">

                        <div className="
                            flex
                            flex-col
                            gap-5
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        ">

                            <div className="flex items-center gap-4">

                                <div className="
                                    flex
                                    h-16
                                    w-16
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-white/20
                                    ring-1
                                    ring-white/30
                                    backdrop-blur
                                    sm:h-20
                                    sm:w-20
                                ">

                                    <FolderIcon className="h-9 w-9 sm:h-11 sm:w-11" />

                                </div>


                                <div className="min-w-0">

                                    <p className="
                                        mb-1
                                        text-xs
                                        font-bold
                                        uppercase
                                        tracking-widest
                                        text-blue-100
                                    ">

                                        Product Category

                                    </p>


                                    <h2 className="
                                        break-words
                                        text-2xl
                                        font-black
                                        sm:text-3xl
                                    ">

                                        {category.name}

                                    </h2>


                                    <div className="
                                        mt-2
                                        flex
                                        items-center
                                        gap-2
                                        text-sm
                                        text-blue-100
                                    ">

                                        <span>
                                            Category #{category.id}
                                        </span>

                                        <span>
                                            •
                                        </span>

                                        <span>
                                            Active
                                        </span>

                                    </div>

                                </div>

                            </div>


                            <div className="
                                inline-flex
                                w-fit
                                items-center
                                gap-2
                                rounded-full
                                bg-emerald-500/20
                                px-4
                                py-2
                                text-sm
                                font-bold
                                ring-1
                                ring-white/20
                            ">

                                <span className="
                                    h-2
                                    w-2
                                    rounded-full
                                    bg-emerald-300
                                " />

                                Active

                            </div>

                        </div>

                    </div>


                    {/* Description */}

                    <div className="px-5 py-6 sm:px-8">

                        <p className="
                            mb-2
                            text-xs
                            font-bold
                            uppercase
                            tracking-wider
                            text-slate-400
                        ">

                            Description

                        </p>


                        <p className="
                            max-w-4xl
                            text-sm
                            leading-7
                            text-slate-600
                            sm:text-base
                        ">

                            {category.description ||
                                "No description has been added for this category."}

                        </p>

                    </div>

                </div>


                {/* =====================================================
                    SUMMARY CARDS
                ===================================================== */}

                <div className="
                    mb-6
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                    lg:grid-cols-3
                ">


                    {/* Products */}

                    <div className="
                        rounded-2xl
                        bg-white
                        p-5
                        shadow-sm
                        ring-1
                        ring-slate-200
                    ">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="
                                    text-sm
                                    font-semibold
                                    text-slate-500
                                ">

                                    Products

                                </p>


                                <p className="
                                    mt-1
                                    text-3xl
                                    font-black
                                    text-slate-900
                                ">

                                    {totalProducts}

                                </p>

                            </div>


                            <div className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-xl
                                bg-blue-100
                                text-blue-600
                            ">

                                <CubeIcon className="h-6 w-6" />

                            </div>

                        </div>

                    </div>


                    {/* Stock */}

                    <div className="
                        rounded-2xl
                        bg-white
                        p-5
                        shadow-sm
                        ring-1
                        ring-slate-200
                    ">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="
                                    text-sm
                                    font-semibold
                                    text-slate-500
                                ">

                                    Total Stock

                                </p>


                                <p className="
                                    mt-1
                                    text-3xl
                                    font-black
                                    text-slate-900
                                ">

                                    {money(totalStock)}

                                </p>

                            </div>


                            <div className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-xl
                                bg-emerald-100
                                text-emerald-600
                            ">

                                <TagIcon className="h-6 w-6" />

                            </div>

                        </div>

                    </div>


                    {/* Stock Value */}

                    <div className="
                        rounded-2xl
                        bg-white
                        p-5
                        shadow-sm
                        ring-1
                        ring-slate-200
                    ">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="
                                    text-sm
                                    font-semibold
                                    text-slate-500
                                ">

                                    Stock Value

                                </p>


                                <div className="mt-1">

                                    <span className="
                                        mr-1
                                        text-xs
                                        font-bold
                                        text-slate-400
                                    ">

                                        TZS

                                    </span>

                                    <span className="
                                        text-2xl
                                        font-black
                                        text-slate-900
                                    ">

                                        {money(totalValue)}

                                    </span>

                                </div>

                            </div>


                            <div className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-xl
                                bg-violet-100
                                text-violet-600
                            ">

                                <ArrowTrendingUpIcon className="h-6 w-6" />

                            </div>

                        </div>

                    </div>

                </div>


                {/* =====================================================
                    CATEGORY INFORMATION + PRODUCTS
                ===================================================== */}

                <div className="
                    grid
                    grid-cols-1
                    gap-6
                    lg:grid-cols-3
                ">


                    {/* Category Information */}

                    <div className="
                        rounded-2xl
                        bg-white
                        p-6
                        shadow-sm
                        ring-1
                        ring-slate-200
                    ">

                        <h3 className="
                            mb-5
                            text-lg
                            font-black
                            text-slate-900
                        ">

                            Category Information

                        </h3>


                        <div className="space-y-5">


                            <div className="flex gap-3">

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

                                    <FolderIcon className="h-5 w-5" />

                                </div>


                                <div className="min-w-0">

                                    <p className="text-xs font-semibold text-slate-400">
                                        Category Name
                                    </p>

                                    <p className="
                                        mt-1
                                        break-words
                                        font-bold
                                        text-slate-800
                                    ">

                                        {category.name}

                                    </p>

                                </div>

                            </div>


                            <div className="flex gap-3">

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

                                    <CalendarDaysIcon className="h-5 w-5" />

                                </div>


                                <div>

                                    <p className="text-xs font-semibold text-slate-400">
                                        Created
                                    </p>

                                    <p className="mt-1 font-bold text-slate-800">
                                        {formatDate(category.created_at)}
                                    </p>

                                </div>

                            </div>


                            <div className="flex gap-3">

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

                                    <ClockIcon className="h-5 w-5" />

                                </div>


                                <div>

                                    <p className="text-xs font-semibold text-slate-400">
                                        Last Updated
                                    </p>

                                    <p className="mt-1 font-bold text-slate-800">
                                        {formatDateTime(category.updated_at)}
                                    </p>

                                </div>

                            </div>


                            <div className="
                                rounded-xl
                                bg-slate-50
                                p-4
                            ">

                                <p className="
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-wide
                                    text-slate-400
                                ">

                                    Status

                                </p>


                                <div className="
                                    mt-2
                                    flex
                                    items-center
                                    gap-2
                                ">

                                    <span className="
                                        h-2.5
                                        w-2.5
                                        rounded-full
                                        bg-emerald-500
                                    " />

                                    <span className="
                                        text-sm
                                        font-bold
                                        text-emerald-700
                                    ">

                                        Active Category

                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Products */}

                    <div className="
                        overflow-hidden
                        rounded-2xl
                        bg-white
                        shadow-sm
                        ring-1
                        ring-slate-200
                        lg:col-span-2
                    ">

                        <div className="
                            flex
                            items-center
                            justify-between
                            border-b
                            border-slate-100
                            px-6
                            py-5
                        ">

                            <div>

                                <h3 className="
                                    text-lg
                                    font-black
                                    text-slate-900
                                ">

                                    Products in Category

                                </h3>

                                <p className="
                                    mt-1
                                    text-sm
                                    text-slate-500
                                ">

                                    Products assigned to {category.name}

                                </p>

                            </div>


                            <span className="
                                rounded-full
                                bg-blue-100
                                px-3
                                py-1
                                text-xs
                                font-bold
                                text-blue-700
                            ">

                                {totalProducts} Products

                            </span>

                        </div>


                        {products.length > 0 ? (

                            <div className="divide-y divide-slate-100">

                                {products.map((product) => (

                                    <div
                                        key={product.id}
                                        className="
                                            flex
                                            items-center
                                            gap-4
                                            px-6
                                            py-4
                                            transition
                                            hover:bg-slate-50
                                        "
                                    >

                                        {/* Image */}

                                        <div className="
                                            h-12
                                            w-12
                                            shrink-0
                                            overflow-hidden
                                            rounded-xl
                                            bg-slate-100
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

                                                <div className="
                                                    flex
                                                    h-full
                                                    w-full
                                                    items-center
                                                    justify-center
                                                ">

                                                    <CubeIcon className="
                                                        h-6
                                                        w-6
                                                        text-slate-400
                                                    " />

                                                </div>

                                            )}

                                        </div>


                                        {/* Product */}

                                        <div className="min-w-0 flex-1">

                                            <p className="
                                                truncate
                                                font-bold
                                                text-slate-800
                                            ">

                                                {product.name}

                                            </p>


                                            <p className="
                                                mt-1
                                                truncate
                                                text-xs
                                                text-slate-500
                                            ">

                                                SKU: {product.sku || "-"}

                                            </p>

                                        </div>


                                        {/* Stock */}

                                        <div className="
                                            hidden
                                            text-right
                                            sm:block
                                        ">

                                            <p className="
                                                text-xs
                                                font-semibold
                                                text-slate-400
                                            ">

                                                Stock

                                            </p>


                                            <p className={`
                                                mt-1
                                                text-sm
                                                font-black
                                                ${
                                                    Number(product.quantity) <= 5
                                                        ? "text-red-600"
                                                        : "text-emerald-600"
                                                }
                                            `}>

                                                {product.quantity} {product.unit || "pcs"}

                                            </p>

                                        </div>


                                        {/* Price */}

                                        <div className="
                                            text-right
                                        ">

                                            <p className="
                                                text-xs
                                                font-semibold
                                                text-slate-400
                                            ">

                                                Price

                                            </p>


                                            <p className="
                                                mt-1
                                                whitespace-nowrap
                                                text-sm
                                                font-black
                                                text-slate-900
                                            ">

                                                TZS {money(product.selling_price)}

                                            </p>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        ) : (

                            <div className="
                                px-6
                                py-16
                                text-center
                            ">

                                <div className="
                                    mx-auto
                                    mb-4
                                    flex
                                    h-16
                                    w-16
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-slate-100
                                ">

                                    <CubeIcon className="
                                        h-8
                                        w-8
                                        text-slate-400
                                    " />

                                </div>


                                <h4 className="
                                    font-bold
                                    text-slate-800
                                ">

                                    No Products Yet

                                </h4>


                                <p className="
                                    mx-auto
                                    mt-1
                                    max-w-sm
                                    text-sm
                                    text-slate-500
                                ">

                                    There are currently no products assigned
                                    to this category.

                                </p>

                            </div>

                        )}

                    </div>

                </div>


                {/* =====================================================
                    FOOTER ACTION
                ===================================================== */}

                <div className="
                    mt-6
                    flex
                    justify-start
                ">

                    <Link
                        href={route("admin.categories.index")}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            px-4
                            py-2.5
                            text-sm
                            font-bold
                            text-slate-700
                            shadow-sm
                            transition
                            hover:bg-slate-50
                        "
                    >

                        <ArrowLeftIcon className="h-5 w-5" />

                        Back to Categories

                    </Link>

                </div>

            </div>

        </AdminLayout>

    );

}