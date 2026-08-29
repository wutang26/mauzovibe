import { Head, Link } from "@inertiajs/react";
import MarketplaceBrowseLayout from "@/Layouts/MarketplaceBrowseLayout";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Cart({ cartItems = [] }) {
    const total = cartItems.reduce(
        (sum, item) =>
            sum +
            Number(item.price || 0) *
                Number(item.quantity || 1),
        0
    );

    return (
        <MarketplaceBrowseLayout>
            <Head title="Cart - MauzoVibe Marketplace" />

            <div className="w-full">

                {/* =====================================================
                    PAGE HEADER
                ====================================================== */}
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                        <div>
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                    <i className="fa-solid fa-cart-shopping text-emerald-600"></i>
                                </div>

                                <div>
                                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                                        Cart
                                    </h1>

                                    <p className="text-sm text-slate-500">
                                        Bidhaa ulizoweka kwenye cart
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Link
                            href={route("marketplace.index")}
                            className="
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                text-sm
                                font-medium
                                text-slate-600
                                hover:text-emerald-600
                                transition
                            "
                        >
                            <i className="fa-solid fa-arrow-left"></i>
                            Endelea Kununua
                        </Link>

                    </div>
                </div>


                {/* =====================================================
                    CART
                ====================================================== */}
                {cartItems.length > 0 ? (

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">

                        {/* =================================================
                            CART ITEMS
                        ================================================== */}
                        <div className="lg:col-span-2">

                            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">

                                {/* CARD HEADER */}
                                <div className="px-4 sm:px-5 py-4 border-b border-slate-200 flex items-center justify-between">

                                    <div>
                                        <h2 className="font-bold text-slate-900">
                                            Shopping Cart
                                        </h2>

                                        <p className="text-xs text-slate-500 mt-0.5">
                                            {cartItems.length}{" "}
                                            {cartItems.length === 1
                                                ? "item"
                                                : "items"}
                                        </p>
                                    </div>

                                    <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                                        <i className="fa-solid fa-bag-shopping text-emerald-600 text-sm"></i>
                                    </div>

                                </div>


                                {/* ITEMS */}
                                <div>

                                    {cartItems.map((item) => (

                                        <div
                                            key={item.id}
                                            className="
                                                flex
                                                gap-3
                                                sm:gap-4
                                                p-3
                                                sm:p-4
                                                border-b
                                                border-slate-100
                                                last:border-b-0
                                                hover:bg-slate-50/70
                                                transition
                                            "
                                        >

                                            {/* IMAGE */}
                                            <Link
                                                href={`/marketplace/listing/${item.slug}`}
                                                className="
                                                    w-20
                                                    h-20
                                                    sm:w-28
                                                    sm:h-24
                                                    bg-slate-100
                                                    rounded-xl
                                                    overflow-hidden
                                                    shrink-0
                                                "
                                            >
                                                <img
                                                    src={
                                                        item.image ||
                                                        "https://via.placeholder.com/300x220?text=No+Image"
                                                    }
                                                    alt={item.title}
                                                    className="
                                                        w-full
                                                        h-full
                                                        object-cover
                                                        hover:scale-105
                                                        transition
                                                        duration-300
                                                    "
                                                />
                                            </Link>


                                            {/* DETAILS */}
                                            <div className="flex-1 min-w-0">

                                                <Link
                                                    href={`/marketplace/listing/${item.slug}`}
                                                    className="
                                                        font-semibold
                                                        text-sm
                                                        sm:text-base
                                                        text-slate-900
                                                        hover:text-emerald-600
                                                        transition
                                                        line-clamp-2
                                                    "
                                                >
                                                    {item.title}
                                                </Link>


                                                <div className="text-emerald-600 font-bold mt-1 text-sm sm:text-base">
                                                    {item.formatted_price ||
                                                        `TZS ${Number(
                                                            item.price || 0
                                                        ).toLocaleString()}`}
                                                </div>


                                                <div className="flex items-center gap-3 mt-2">

                                                    <div className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                                                        <i className="fa-solid fa-layer-group text-[10px]"></i>

                                                        <span>
                                                            Quantity:
                                                        </span>

                                                        <span className="font-semibold text-slate-700">
                                                            {item.quantity || 1}
                                                        </span>
                                                    </div>

                                                </div>

                                            </div>


                                            {/* DELETE */}
                                            <button
                                                type="button"
                                                className="
                                                    self-start
                                                    w-9
                                                    h-9
                                                    rounded-lg
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-slate-400
                                                    hover:text-red-500
                                                    hover:bg-red-50
                                                    transition
                                                "
                                                title="Remove from cart"
                                            >
                                                <i className="fa-solid fa-trash text-sm"></i>
                                            </button>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            ORDER SUMMARY
                        ================================================== */}
                        <div className="lg:col-span-1">

                            <div className="
                                bg-white
                                border
                                border-slate-200
                                rounded-2xl
                                p-4
                                sm:p-5
                                shadow-sm
                                lg:sticky
                                lg:top-20
                            ">

                                <div className="flex items-center gap-3 mb-5">

                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                        <i className="fa-solid fa-receipt text-emerald-600"></i>
                                    </div>

                                    <div>
                                        <h2 className="font-bold text-lg text-slate-900">
                                            Order Summary
                                        </h2>

                                        <p className="text-xs text-slate-500">
                                            Muhtasari wa oda yako
                                        </p>
                                    </div>

                                </div>


                                {/* ITEMS */}
                                <div className="flex justify-between text-sm text-slate-600 mb-3">

                                    <span>
                                        Items
                                    </span>

                                    <span className="font-medium text-slate-900">
                                        {cartItems.length}
                                    </span>

                                </div>


                                {/* SUBTOTAL */}
                                <div className="flex justify-between text-sm text-slate-600 mb-4">

                                    <span>
                                        Subtotal
                                    </span>

                                    <span className="font-medium text-slate-900">
                                        TZS {total.toLocaleString()}
                                    </span>

                                </div>


                                {/* TOTAL */}
                                <div className="border-t border-slate-200 pt-4">

                                    <div className="flex items-center justify-between gap-4">

                                        <span className="font-bold text-slate-900">
                                            Total
                                        </span>

                                        <span className="font-extrabold text-emerald-600 text-lg text-right">
                                            TZS {total.toLocaleString()}
                                        </span>

                                    </div>

                                </div>


                                {/* CHECKOUT */}
                                <button
                                    type="button"
                                    className="
                                        w-full
                                        mt-5
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        bg-emerald-600
                                        hover:bg-emerald-700
                                        text-white
                                        py-3
                                        rounded-xl
                                        font-semibold
                                        transition
                                        shadow-sm
                                        hover:shadow-md
                                    "
                                >
                                    <i className="fa-solid fa-lock text-sm"></i>
                                    Continue to Checkout
                                </button>


                                {/* CONTINUE SHOPPING */}
                                <Link
                                    href={route("marketplace.index")}
                                    className="
                                        w-full
                                        mt-3
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        border
                                        border-slate-200
                                        hover:border-emerald-300
                                        hover:bg-emerald-50
                                        text-slate-700
                                        hover:text-emerald-700
                                        py-3
                                        rounded-xl
                                        font-medium
                                        text-sm
                                        transition
                                    "
                                >
                                    <i className="fa-solid fa-arrow-left"></i>
                                    Endelea Kununua
                                </Link>


                                {/* SECURE CHECKOUT */}
                                <div className="
                                    mt-5
                                    pt-4
                                    border-t
                                    border-slate-100
                                    flex
                                    items-center
                                    gap-2
                                    text-xs
                                    text-slate-500
                                ">
                                    <i className="fa-solid fa-shield-halved text-emerald-600"></i>

                                    <span>
                                        Secure and safe shopping
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>

                ) : (

                    /* =====================================================
                       EMPTY CART
                    ====================================================== */
                    <div className="
                        bg-white
                        border
                        border-slate-200
                        rounded-2xl
                        p-8
                        sm:p-16
                        text-center
                        shadow-sm
                    ">

                        <div className="
                            w-16
                            h-16
                            sm:w-20
                            sm:h-20
                            mx-auto
                            bg-emerald-50
                            rounded-full
                            flex
                            items-center
                            justify-center
                            mb-5
                        ">
                            <i className="fa-solid fa-cart-shopping text-3xl text-emerald-600"></i>
                        </div>


                        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                            Cart yako iko tupu
                        </h2>


                        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
                            Bidhaa utakazoongeza kwenye cart zitaonekana hapa.
                        </p>


                        <Link
                            href={route("marketplace.index")}
                            className="
                                inline-flex
                                items-center
                                gap-2
                                mt-6
                                bg-emerald-600
                                hover:bg-emerald-700
                                text-white
                                px-5
                                sm:px-6
                                py-2.5
                                sm:py-3
                                rounded-xl
                                font-medium
                                transition
                                text-sm
                            "
                        >
                            <i className="fa-solid fa-bag-shopping"></i>
                            Endelea Kununua
                        </Link>

                    </div>

                )}

            </div>

        </MarketplaceBrowseLayout>
    );
}