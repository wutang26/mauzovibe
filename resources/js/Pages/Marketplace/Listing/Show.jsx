import { Head, Link, router } from "@inertiajs/react";
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
    // const [showPhone, setShowPhone] = useState(false);
    const [showPhone, setShowPhone] = useState(false);
    const [showOfferModal, setShowOfferModal] = useState(false);
    const [offerAmount, setOfferAmount] = useState("");

    const [showReportModal, setShowReportModal] = useState(false);
    const [reportReason, setReportReason] = useState("");
    const [reportDescription, setReportDescription] = useState("");
    const [reporting, setReporting] = useState(false);
    
    const [saved, setSaved] = useState(
    product?.is_saved ?? false
);
const [saving, setSaving] = useState(false);

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

    //Show Contact Page
    const openWhatsApp = () => {
        if (!sellerPhone) {
            alert("Seller hajaweka namba ya simu.");
            return;
        }

        let phone = sellerPhone.replace(/\D/g, "");

        // Tanzania numbers: 07XXXXXXXX / 06XXXXXXXX
        if (phone.startsWith("0")) {
            phone = "255" + phone.substring(1);
        }

        const message = encodeURIComponent(
            `Habari ${product?.seller?.name ?? ""}, nimeona bidhaa yako "${product.title}" kwenye MauzoVibe. Naomba maelezo zaidi.`
        );

        window.open(
            `https://wa.me/${phone}?text=${message}`,
            "_blank"
        );
    };
    //Mwisho wa Show contacts

    //Submit Report
    const submitReport = () => {
        if (!reportReason) {
            alert("Tafadhali chagua sababu ya kuripoti.");
            return;
        }

        setReporting(true);

        router.post(
            `/marketplace/listing/${product.id}/report`,
            {
                reason: reportReason,
                description: reportDescription,
            },
            {
                preserveScroll: true,

                onSuccess: () => {
                    setShowReportModal(false);
                    setReportReason("");
                    setReportDescription("");
                },

                onFinish: () => {
                    setReporting(false);
                },
            }
        );
    };

    //Save Listing
    // Save / Unsave Listing
const saveListing = () => {
    if (saving) return;

    setSaving(true);

    router.post(
        `/marketplace/listing/${product.id}/save`,
        {},
        {
            preserveScroll: true,

            onSuccess: () => {
                setSaved((current) => !current);
            },

            onFinish: () => {
                setSaving(false);
            },
        }
    );
};

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
                                                        className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 ${activeImage === index
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
                                        onClick={saveListing}
                                        disabled={saving}
                                        className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                                            saved
                                                ? "border-green-200 bg-green-50 text-green-700"
                                                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                        } disabled:cursor-not-allowed disabled:opacity-60`}
                                    >
                                        <Heart
                                            size={17}
                                            className={saved ? "fill-current" : ""}
                                        />

                                        {saving
                                            ? "Saving..."
                                            : saved
                                                ? "Saved"
                                                : "Save"}
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

                                        <div className="space-y-2">
                                            <button
                                                type="button"
                                                onClick={() => setShowPhone(true)}
                                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3.5 font-bold text-white transition hover:bg-green-700"
                                            >
                                                <Phone size={19} />

                                                {showPhone && sellerPhone
                                                    ? sellerPhone
                                                    : "Show Contact"}
                                            </button>

                                            {showPhone && sellerPhone && (
                                                <a
                                                    href={`tel:${sellerPhone}`}
                                                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 px-5 py-3 text-sm font-semibold text-green-700 hover:bg-green-100"
                                                >
                                                    <Phone size={17} />
                                                    Piga simu kwa Seller
                                                </a>
                                            )}

                                            {showPhone && !sellerPhone && (
                                                <div className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
                                                    Seller hajaweka namba ya simu.
                                                </div>
                                            )}
                                        </div>


                                        <button
                                            type="button"
                                            onClick={openWhatsApp}
                                            disabled={!sellerPhone}
                                            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-green-600 px-5 py-3.5 font-bold text-green-700 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <MessageCircle size={19} />

                                            {sellerPhone
                                                ? "Chat with Seller"
                                                : "Seller hana WhatsApp"}
                                        </button>


                                        <button
                                            type="button"
                                            onClick={() => setShowOfferModal(true)}
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
                                        onClick={() => setShowReportModal(true)}
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
                {showOfferModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-slate-900">
                                    Make an Offer
                                </h2>

                                <button
                                    type="button"
                                    onClick={() => setShowOfferModal(false)}
                                    className="text-slate-400 hover:text-slate-700"
                                >
                                    ✕
                                </button>
                            </div>

                            <p className="mt-2 text-sm text-slate-500">
                                Weka bei unayopendekeza kwa bidhaa hii.
                            </p>

                            <div className="mt-5">
                                <label className="text-sm font-semibold text-slate-700">
                                    Bei yako
                                </label>

                                <div className="mt-2 flex items-center overflow-hidden rounded-xl border border-slate-300 focus-within:border-green-600">
                                    <span className="bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-500">
                                        TZS
                                    </span>

                                    <input
                                        type="number"
                                        min="0"
                                        value={offerAmount}
                                        onChange={(e) =>
                                            setOfferAmount(e.target.value)
                                        }
                                        placeholder="Mfano 150000"
                                        className="w-full border-0 px-3 py-3 outline-none focus:ring-0"
                                    />
                                </div>
                            </div>

                            <div className="mt-5 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowOfferModal(false)}
                                    className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-600 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    disabled={!offerAmount}
                                    onClick={() => {
                                        alert(
                                            `Offer yako ya TZS ${Number(
                                                offerAmount
                                            ).toLocaleString()} imeandaliwa.`
                                        );

                                        setShowOfferModal(false);
                                    }}
                                    className="flex-1 rounded-xl bg-green-600 px-4 py-3 font-bold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Send Offer
                                </button>
                            </div>

                        </div>
                    </div>
                )}

                {showReportModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

                            {/* HEADER */}
                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-2">
                                    <Flag
                                        size={20}
                                        className="text-red-600"
                                    />

                                    <h2 className="text-xl font-bold text-slate-900">
                                        Report this listing
                                    </h2>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setShowReportModal(false)}
                                    className="text-slate-400 hover:text-slate-700"
                                >
                                    ✕
                                </button>

                            </div>


                            {/* DESCRIPTION */}
                            <p className="mt-2 text-sm text-slate-500">
                                Tusaidie kuelewa tatizo kwenye bidhaa hii.
                            </p>


                            {/* REASON */}
                            <div className="mt-5">

                                <label className="text-sm font-semibold text-slate-700">
                                    Sababu ya kuripoti
                                </label>

                                <select
                                    value={reportReason}
                                    onChange={(e) =>
                                        setReportReason(e.target.value)
                                    }
                                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                                >

                                    <option value="">
                                        Chagua sababu
                                    </option>

                                    <option value="scam">
                                        Scam / Utapeli
                                    </option>

                                    <option value="fake_product">
                                        Bidhaa bandia
                                    </option>

                                    <option value="wrong_information">
                                        Taarifa za bidhaa si sahihi
                                    </option>

                                    <option value="inappropriate">
                                        Maudhui yasiyofaa
                                    </option>

                                    <option value="prohibited_item">
                                        Bidhaa hairuhusiwi
                                    </option>

                                    <option value="seller_behavior">
                                        Tabia mbaya ya seller
                                    </option>

                                    <option value="other">
                                        Nyingine
                                    </option>

                                </select>

                            </div>


                            {/* DESCRIPTION */}
                            <div className="mt-4">

                                <label className="text-sm font-semibold text-slate-700">
                                    Maelezo zaidi
                                    <span className="ml-1 font-normal text-slate-400">
                                        (optional)
                                    </span>
                                </label>

                                <textarea
                                    value={reportDescription}
                                    onChange={(e) =>
                                        setReportDescription(e.target.value)
                                    }
                                    rows={4}
                                    maxLength={1000}
                                    placeholder="Eleza tatizo kwa ufupi..."
                                    className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                                />

                                <div className="mt-1 text-right text-xs text-slate-400">
                                    {reportDescription.length}/1000
                                </div>

                            </div>


                            {/* WARNING */}
                            <div className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
                                Ripoti yako itakaguliwa na timu ya MauzoVibe.
                                Tafadhali toa taarifa sahihi.
                            </div>


                            {/* ACTIONS */}
                            <div className="mt-5 flex gap-3">

                                <button
                                    type="button"
                                    onClick={() => setShowReportModal(false)}
                                    disabled={reporting}
                                    className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={submitReport}
                                    disabled={!reportReason || reporting}
                                    className="flex-1 rounded-xl bg-red-600 px-4 py-3 font-bold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {reporting
                                        ? "Inatuma..."
                                        : "Send Report"}
                                </button>

                            </div>

                        </div>
                    </div>
                )}
            </MarketplaceLayout>
        </>
    );
}