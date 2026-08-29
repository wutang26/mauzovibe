import { usePage } from "@inertiajs/react";

export default function ProductPreview({
    data = {},
    previewImages = [],
    user = null,
}) {
    // =========================================================
    // AUTH USER
    // =========================================================

    const { auth } = usePage().props;

    // Priority:
    // 1. user passed as prop
    // 2. authenticated user from Inertia
    const seller = user || auth?.user || null;

    // =========================================================
    // SAFE DATA
    // =========================================================

    const safeData = data || {};

    const safePreviewImages = Array.isArray(previewImages)
        ? previewImages
        : [];

    const mainImage = safePreviewImages[0] || null;

    // =========================================================
    // PRODUCT DATA
    // =========================================================

    const title = safeData.title || "";
    const price = safeData.price || "";
    const location = safeData.location || "";
    const city = safeData.city || "";
    const condition = safeData.condition || "";
    const year = safeData.year || "";
    const description = safeData.description || "";

    // =========================================================
    // FORMAT PRICE
    // =========================================================

    const formatPrice = (value) => {
        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return "0";
        }

        const numericValue = Number(value);

        if (Number.isNaN(numericValue)) {
            return "0";
        }

        return numericValue.toLocaleString("en-TZ");
    };

    // =========================================================
    // CONDITION LABEL
    // =========================================================

    const conditionLabels = {
        new: "Mpya",
        used: "Iliyotumika",
        excellent: "Excellent",
        good: "Good",
        fair: "Fair",
    };

    const displayedCondition =
        conditionLabels[condition] || condition;

    // =========================================================
    // SELLER INFORMATION
    // =========================================================

    const sellerName =
        seller?.name ||
        seller?.full_name ||
        "Jina la Muuzaji";

    const sellerAvatar =
        seller?.avatar ||
        seller?.profile_photo_url ||
        null;

    const sellerInitial =
        sellerName?.charAt(0)?.toUpperCase() || "M";

    const sellerEmail =
        seller?.email || "";

    const sellerPhone =
        seller?.phone || "";

    // =========================================================
    // WHATSAPP PHONE NUMBER
    // =========================================================

    const normalizeTanzaniaPhone = (phone) => {
        if (!phone) {
            return "";
        }

        // Remove spaces, +, -, brackets, etc.
        let normalized = String(phone).replace(/\D/g, "");

        // 0746856656 -> 255746856656
        if (normalized.startsWith("0")) {
            normalized = `255${normalized.substring(1)}`;
        }

        // 746856656 -> 255746856656
        if (
            normalized.length === 9 &&
            normalized.startsWith("7")
        ) {
            normalized = `255${normalized}`;
        }

        // Already 255746856656
        return normalized;
    };

    const whatsappPhone =
        normalizeTanzaniaPhone(sellerPhone);

    // =========================================================
    // WHATSAPP CONTACT
    // =========================================================

    const handleContactSeller = () => {
        // Seller hana namba
        if (!whatsappPhone) {
            alert(
                "Muuzaji hajaweka namba ya simu kwa sasa."
            );

            return;
        }

        const formattedPrice =
            price !== ""
                ? `TZS ${formatPrice(price)}`
                : "Bei haijawekwa";

        const productName =
            title || "bidhaa hii";

        const message =
            `Habari ${sellerName}, nimevutiwa na bidhaa yako "${productName}". ` +
            `Bei ni ${formattedPrice}. ` +
            `Naomba kupata maelezo zaidi.`;

        const whatsappUrl =
            `https://wa.me/${whatsappPhone}` +
            `?text=${encodeURIComponent(message)}`;

        window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer"
        );
    };

    // =========================================================
    // LOCATION
    // =========================================================

    const displayedLocation = [
        location,
        city,
    ]
        .filter(Boolean)
        .join(", ");

    return (
        <div className="w-full">

            {/* =====================================================
                HEADER
            ====================================================== */}

            <div className="mb-3">

                <h2 className="font-bold text-slate-900">
                    Kagua Bidhaa (Live Preview)
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                    Hivi ndivyo bidhaa yako itakavyoonekana kwa wanunuzi.
                </p>

            </div>


            {/* =====================================================
                PRODUCT CARD
            ====================================================== */}

            <div
                className="
                    bg-white
                    border
                    border-slate-200
                    rounded-2xl
                    shadow-sm
                    overflow-hidden
                "
            >

                {/* =================================================
                    PRODUCT IMAGE
                ================================================== */}

                <div
                    className="
                        relative
                        w-full
                        aspect-[4/3]
                        bg-slate-100
                    "
                >

                    {mainImage ? (

                        <img
                            src={mainImage}
                            alt={title || "Product preview"}
                            className="
                                w-full
                                h-full
                                object-cover
                            "
                        />

                    ) : (

                        <div
                            className="
                                w-full
                                h-full
                                min-h-[250px]
                                flex
                                flex-col
                                items-center
                                justify-center
                                text-slate-400
                            "
                        >

                            <div className="text-5xl mb-2">
                                📦
                            </div>

                            <p className="text-sm font-medium">
                                Picha ya bidhaa
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                                Picha yako itaonekana hapa
                            </p>

                        </div>

                    )}


                    {/* =================================================
                        CONDITION BADGE
                    ================================================== */}

                    {condition && (

                        <span
                            className="
                                absolute
                                top-3
                                left-3
                                bg-green-600
                                text-white
                                text-xs
                                font-bold
                                px-3
                                py-1.5
                                rounded-lg
                                shadow-sm
                            "
                        >
                            {displayedCondition}
                        </span>

                    )}


                    {/* =================================================
                        FAVORITE BUTTON
                    ================================================== */}

                    <button
                        type="button"
                        aria-label="Add to favorites"
                        className="
                            absolute
                            top-3
                            right-3
                            w-9
                            h-9
                            rounded-full
                            bg-white
                            shadow
                            flex
                            items-center
                            justify-center
                            text-xl
                            text-slate-600
                            hover:text-red-500
                            transition
                        "
                    >
                        ♡
                    </button>

                </div>


                {/* =================================================
                    PRODUCT CONTENT
                ================================================= */}

                <div className="p-5">

                    {/* =================================================
                        TITLE
                    ================================================= */}

                    <h3
                        className="
                            text-lg
                            font-bold
                            text-slate-900
                            break-words
                        "
                    >
                        {title || "Jina la Bidhaa"}
                    </h3>


                    {/* =================================================
                        PRICE
                    ================================================= */}

                    <div className="mt-1">

                        <span
                            className="
                                text-xl
                                font-bold
                                text-green-600
                            "
                        >
                            TZS {formatPrice(price)}
                        </span>

                    </div>


                    {/* =================================================
                        LOCATION
                    ================================================= */}

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-slate-500
                            mt-3
                        "
                    >

                        <i className="fa-solid fa-location-dot text-green-600"></i>

                        <span>
                            {displayedLocation ||
                                "Mahali pa bidhaa"}
                        </span>

                    </div>


                    {/* =================================================
                        PRODUCT META
                    ================================================= */}

                    {(condition || year) && (

                        <div
                            className="
                                flex
                                flex-wrap
                                gap-2
                                mt-3
                            "
                        >

                            {condition && (

                                <span
                                    className="
                                        px-2.5
                                        py-1
                                        rounded-md
                                        bg-slate-100
                                        text-xs
                                        text-slate-600
                                    "
                                >
                                    {displayedCondition}
                                </span>

                            )}

                            {year && (

                                <span
                                    className="
                                        px-2.5
                                        py-1
                                        rounded-md
                                        bg-slate-100
                                        text-xs
                                        text-slate-600
                                    "
                                >
                                    {year}
                                </span>

                            )}

                        </div>

                    )}


                    {/* =================================================
                        DESCRIPTION
                    ================================================== */}

                    <p
                        className="
                            text-sm
                            text-slate-600
                            leading-6
                            mt-4
                            break-words
                        "
                    >
                        {description ||
                            "Maelezo ya bidhaa yataonekana hapa baada ya kuyaandika."}
                    </p>


                    {/* =================================================
                        SELLER
                    ================================================== */}

                    <div
                        className="
                            mt-5
                            pt-4
                            border-t
                            border-slate-100
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                            "
                        >

                            {/* SELLER AVATAR */}

                            <div
                                className="
                                    w-10
                                    h-10
                                    rounded-full
                                    bg-emerald-100
                                    overflow-hidden
                                    flex
                                    items-center
                                    justify-center
                                    flex-shrink-0
                                "
                            >

                                {sellerAvatar ? (

                                    <img
                                        src={sellerAvatar}
                                        alt={sellerName}
                                        className="
                                            w-full
                                            h-full
                                            object-cover
                                        "
                                    />

                                ) : (

                                    <span
                                        className="
                                            font-bold
                                            text-emerald-700
                                        "
                                    >
                                        {sellerInitial}
                                    </span>

                                )}

                            </div>


                            {/* SELLER DETAILS */}

                            <div className="min-w-0 flex-1">

                                <p
                                    className="
                                        text-sm
                                        font-semibold
                                        text-slate-900
                                        truncate
                                    "
                                >
                                    {sellerName}
                                </p>

                                <p
                                    className="
                                        text-xs
                                        text-green-600
                                    "
                                >
                                    <i className="fa-solid fa-circle-check mr-1"></i>
                                    Muuzaji Aliyethibitishwa
                                </p>

                                {sellerEmail && (
                                    <p
                                        className="
                                            text-[11px]
                                            text-slate-400
                                            truncate
                                            mt-0.5
                                        "
                                    >
                                        {sellerEmail}
                                    </p>
                                )}

                            </div>

                        </div>


                        {/* =================================================
                            CONTACT SELLER
                        ================================================== */}

                        <button
                            type="button"
                            onClick={handleContactSeller}
                            disabled={!whatsappPhone}
                            className={`
                                w-full
                                mt-4
                                py-2.5
                                rounded-xl
                                text-sm
                                font-semibold
                                transition
                                flex
                                items-center
                                justify-center
                                gap-2
                                ${
                                    whatsappPhone
                                        ? `
                                            border
                                            border-green-500
                                            text-green-700
                                            hover:bg-green-50
                                            hover:border-green-600
                                        `
                                        : `
                                            border
                                            border-slate-200
                                            text-slate-400
                                            bg-slate-50
                                            cursor-not-allowed
                                        `
                                }
                            `}
                        >
                            <i className="fa-brands fa-whatsapp text-lg"></i>

                            {whatsappPhone
                                ? "Wasiliana na Muuzaji"
                                : "Namba ya Muuzaji Haijawekwa"}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

