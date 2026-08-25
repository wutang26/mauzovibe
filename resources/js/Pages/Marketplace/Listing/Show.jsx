import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import MarketplaceLayout from "@/Layouts/MarketplaceLayout";

import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Clock,
    ShieldCheck,
    Phone,
    MessageCircle,
    Share2,
    Tag,
    User,
    Heart,
    Flag,
    AlertTriangle,
} from "lucide-react";

export default function Show({
    product,
    relatedProducts = [],
}) {
    const images =
        Array.isArray(product?.images) && product.images.length
            ? product.images
            : [];

    const [activeImage, setActiveImage] = useState(0);
    const [showPhone, setShowPhone] = useState(false);

    const currentImage =
        images[activeImage] ?? null;

    const nextImage = () => {
        if (!images.length) return;

        setActiveImage(
            (activeImage + 1) % images.length
        );
    };

    const previousImage = () => {
        if (!images.length) return;

        setActiveImage(
            (activeImage - 1 + images.length) %
                images.length
        );
    };

    const shareProduct = async () => {
        const url = window.location.href;

        if (navigator.share) {
            await navigator.share({
                title: product.title,
                text: product.title,
                url,
            });
        } else {
            await navigator.clipboard.writeText(url);
            alert("Link ya bidhaa imenakiliwa.");
        }
    };

    const sellerPhone =
        product?.seller?.phone ?? null;

    return (
        <>
            <Head title={product.title} />

            <MarketplaceLayout>
                <div className="min-h-screen bg-slate-50">

                    {/* =====================================================
                        CONTENT
                    ====================================================== */}

                    <div className="mx-auto max-w-7xl px-4 py-6">

                        {/* BACK */}
                        <Link
                            href={
                                product?.category?.slug
                                    ? `/marketplace/category/${product.category.slug}`
                                    : "/marketplace"
                            }
                            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-green-600"
                        >
                            <ArrowLeft size={18} />

                            Rudi kwenye bidhaa
                        </Link>


                        {/* =================================================
                            MAIN PRODUCT
                        ================================================== */}

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

                            {/* =================================================
                                IMAGE GALLERY
                            ================================================== */}

                            <div className="lg:col-span-7">

                                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

                                    {/* IMAGE */}
                                    <div className="relative flex aspect-[4/3] items-center justify-center bg-slate-100">

                                        {currentImage ? (
                                            <img
                                                src={currentImage}
                                                alt={product.title}
                                                className="h-full w-full object-contain"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center text-slate-400">
                                                <Tag size={48} />
                                                <span className="mt-2">
                                                    Picha haipo
                                                </span>
                                            </div>
                                        )}

                                        {/* IMAGE COUNTER */}
                                        {images.length > 0 && (
                                            <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1.5 text-sm font-medium text-white">
                                                {activeImage + 1}/{images.length}
                                            </div>
                                        )}

                                        {/* PREVIOUS */}
                                        {images.length > 1 && (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={previousImage}
                                                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white"
                                                >
                                                    <ChevronLeft size={22} />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={nextImage}
                                                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white"
                                                >
                                                    <ChevronRight size={22} />
                                                </button>
                                            </>
                                        )}
                                    </div>


                                    {/* THUMBNAILS */}
                                    {images.length > 1 && (
                                        <div className="flex gap-3 overflow-x-auto border-t border-slate-200 p-3">

                                            {images.map(
                                                (image, index) => (
                                                    <button
                                                        key={`${image}-${index}`}
                                                        type="button"
                                                        onClick={() =>
                                                            setActiveImage(
                                                                index
                                                            )
                                                        }
                                                        className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 ${
                                                            activeImage === index
                                                                ? "border-green-600"
                                                                : "border-transparent"
                                                        }`}
                                                    >
                                                        <img
                                                            src={image}
                                                            alt=""
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </button>
                                                )
                                            )}

                                        </div>
                                    )}

                                </div>


                                {/* SHARE / SAVE */}
                                <div className="mt-3 flex gap-3">

                                    <button
                                        type="button"
                                        onClick={shareProduct}
                                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                    >
                                        <Share2 size={17} />
                                        Share
                                    </button>

                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                    >
                                        <Heart size={17} />
                                        Save
                                    </button>

                                </div>

                            </div>


                            {/* =================================================
                                PRODUCT INFORMATION
                            ================================================== */}

                            <div className="lg:col-span-5">

                                <div className="rounded-2xl border border-slate-200 bg-white p-5">

                                    {/* CATEGORY */}
                                    {product.category?.name && (
                                        <Link
                                            href={`/marketplace/category/${product.category.slug}`}
                                            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:underline"
                                        >
                                            <Tag size={15} />

                                            {product.category.name}
                                        </Link>
                                    )}


                                    {/* TITLE */}
                                    <h1 className="text-2xl font-bold leading-tight text-slate-900">
                                        {product.title}
                                    </h1>


                                    {/* PRICE */}
                                    <div className="mt-4 text-3xl font-extrabold text-green-600">
                                        {product.formatted_price}
                                    </div>


                                    {/* META */}
                                    <div className="mt-4 space-y-2 text-sm text-slate-500">

                                        <div className="flex items-center gap-2">
                                            <MapPin size={17} />
                                            {product.location}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Clock size={17} />
                                            {product.created_at ?? "Recently"}
                                        </div>

                                    </div>


                                    {/* CONDITION */}
                                    <div className="mt-5">

                                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                            Hali ya bidhaa
                                        </div>

                                        <div className="mt-2 inline-flex rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold capitalize text-green-700">
                                            {product.condition}
                                        </div>

                                    </div>


                                    {/* ACTIONS */}
                                    <div className="mt-6 space-y-3">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPhone(
                                                    true
                                                )
                                            }
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3.5 font-bold text-white transition hover:bg-green-700"
                                        >
                                            <Phone size={19} />

                                            {showPhone &&
                                            sellerPhone
                                                ? sellerPhone
                                                : "Show Contact"}
                                        </button>


                                        <button
                                            type="button"
                                            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-green-600 px-5 py-3.5 font-bold text-green-700 transition hover:bg-green-50"
                                        >
                                            <MessageCircle
                                                size={19}
                                            />

                                            Chat with Seller
                                        </button>


                                        <button
                                            type="button"
                                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3.5 font-bold text-slate-700 transition hover:bg-slate-50"
                                        >
                                            Make an Offer
                                        </button>

                                    </div>

                                </div>


                                {/* SELLER */}
                                <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
                                            <User size={23} />
                                        </div>

                                        <div>
                                            <div className="text-xs text-slate-400">
                                                Seller
                                            </div>

                                            <div className="font-bold text-slate-900">
                                                {product.seller?.name ??
                                                    "MauzoVibe Seller"}
                                            </div>
                                        </div>

                                    </div>

                                    <div className="mt-4 flex items-center gap-2 text-sm text-green-700">
                                        <ShieldCheck size={17} />

                                        MauzoVibe Seller
                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            DESCRIPTION
                        ================================================== */}

                        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">

                            <div className="lg:col-span-8">

                                <div className="rounded-2xl border border-slate-200 bg-white p-6">

                                    <h2 className="text-xl font-bold text-slate-900">
                                        Maelezo ya bidhaa
                                    </h2>

                                    <div className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                                        {product.description ||
                                            "Hakuna maelezo yaliyowekwa na seller."}
                                    </div>

                                </div>


                                {/* SAFETY */}
                                <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-6">

                                    <div className="flex items-center gap-2 font-bold text-amber-900">
                                        <AlertTriangle
                                            size={19}
                                        />

                                        Safety Tips
                                    </div>

                                    <ul className="mt-4 space-y-2 text-sm text-amber-900">

                                        <li>
                                            • Usilipe pesa kabla ya
                                            kukagua bidhaa.
                                        </li>

                                        <li>
                                            • Kutana na seller sehemu
                                            salama.
                                        </li>

                                        <li>
                                            • Kagua bidhaa kabla ya
                                            kufanya malipo.
                                        </li>

                                        <li>
                                            • Usishirikishe password au
                                            taarifa nyeti.
                                        </li>

                                    </ul>

                                </div>

                            </div>


                            {/* REPORT */}
                            <div className="lg:col-span-4">

                                <div className="rounded-2xl border border-slate-200 bg-white p-5">

                                    <button
                                        type="button"
                                        className="flex w-full items-center justify-center gap-2 text-sm font-medium text-slate-500 hover:text-red-600"
                                    >
                                        <Flag size={17} />

                                        Report this listing
                                    </button>

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            RELATED PRODUCTS
                        ================================================== */}

                        {relatedProducts.length > 0 && (
                            <section className="mt-10">

                                <div className="mb-5 flex items-center justify-between">

                                    <h2 className="text-xl font-bold text-slate-900">
                                        Bidhaa zinazofanana
                                    </h2>

                                    <Link
                                        href={`/marketplace/category/${product.category?.slug}`}
                                        className="text-sm font-semibold text-green-600 hover:underline"
                                    >
                                        Tazama zote →
                                    </Link>

                                </div>


                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

                                    {relatedProducts.map(
                                        (item) => (
                                            <Link
                                                key={item.id}
                                                href={`/marketplace/listing/${item.slug}`}
                                                className="overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                                            >

                                                <div className="aspect-square bg-slate-100">

                                                    {item.image ? (
                                                        <img
                                                            src={
                                                                item.image
                                                            }
                                                            alt={
                                                                item.title
                                                            }
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center text-slate-400">
                                                            <Tag
                                                                size={
                                                                    35
                                                                }
                                                            />
                                                        </div>
                                                    )}

                                                </div>

                                                <div className="p-3">

                                                    <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
                                                        {item.title}
                                                    </h3>

                                                    <div className="mt-2 font-bold text-green-600">
                                                        {
                                                            item.formatted_price
                                                        }
                                                    </div>

                                                    <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                                                        <MapPin
                                                            size={13}
                                                        />

                                                        {
                                                            item.location
                                                        }
                                                    </div>

                                                </div>

                                            </Link>
                                        )
                                    )}

                                </div>

                            </section>
                        )}

                    </div>

                </div>
            </MarketplaceLayout>
        </>
    );
}