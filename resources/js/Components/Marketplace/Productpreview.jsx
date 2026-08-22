export default function ProductPreview({
    data = {},
    previewImages = [],
    user = null,
}) {
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

    const sellerName = user?.name || "Jina la Muuzaji";

    const sellerInitial = sellerName
        .charAt(0)
        .toUpperCase();

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
                ================================================== */}

                <div className="p-5">

                    {/* =================================================
                        TITLE
                    ================================================== */}

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
                    ================================================== */}

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
                    ================================================== */}

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
                    ================================================== */}

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
                                    bg-slate-200
                                    overflow-hidden
                                    flex
                                    items-center
                                    justify-center
                                    flex-shrink-0
                                "
                            >

                                {user?.avatar ? (

                                    <img
                                        src={user.avatar}
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
                                            text-slate-500
                                        "
                                    >
                                        {sellerInitial}
                                    </span>

                                )}

                            </div>


                            {/* SELLER DETAILS */}

                            <div className="min-w-0">

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

                            </div>

                        </div>


                        {/* =================================================
                            CONTACT SELLER
                        ================================================== */}

                        <button
                            type="button"
                            className="
                                w-full
                                mt-4
                                py-2.5
                                border
                                border-slate-300
                                rounded-xl
                                text-sm
                                font-semibold
                                text-slate-700
                                hover:bg-slate-50
                                hover:border-slate-400
                                transition
                            "
                        >
                            <i className="fa-regular fa-comment-dots mr-2"></i>
                            Wasiliana na Muuzaji
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}