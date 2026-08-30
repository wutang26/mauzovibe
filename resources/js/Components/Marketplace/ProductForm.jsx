/*
|--------------------------------------------------------------------------
| TANZANIA REGIONS
|--------------------------------------------------------------------------
*/

const regions = [
    "Arusha",
    "Dar es Salaam",
    "Dodoma",
    "Geita",
    "Iringa",
    "Kagera",
    "Katavi",
    "Kigoma",
    "Kilimanjaro",
    "Lindi",
    "Manyara",
    "Mara",
    "Mbeya",
    "Morogoro",
    "Mtwara",
    "Mwanza",
    "Njombe",
    "Pwani",
    "Rukwa",
    "Ruvuma",
    "Shinyanga",
    "Simiyu",
    "Singida",
    "Songwe",
    "Tabora",
    "Tanga",

    // Zanzibar
    "Kaskazini Pemba",
    "Kusini Pemba",
    "Kaskazini Unguja",
    "Kusini Unguja",
    "Mjini Magharibi",
];

export default function ProductForm({
    data = {},
    setData,
    categories = [],
    errors = {},
    processing = false,
    progress = null,
    previewImages = [],
    onImageChange,
    onRemoveImage,
    onSubmit,
}) {
    /*
    |--------------------------------------------------------------------------
    | SAFE VALUES
    |--------------------------------------------------------------------------
    */

    const title = data?.title ?? "";
    const description = data?.description ?? "";
    const condition = data?.condition ?? "new";
    const conditionNotes = data?.condition_notes ?? "";
    const usageCondition = data?.usage_condition ?? "";
    const categoryId = data?.category_id ?? "";
    const price = data?.price ?? "";

    const region = data?.region ?? "";
    const city = data?.city ?? "";
    const location = data?.location ?? "";

    const year = data?.year ?? "";

    const safePreviewImages = Array.isArray(previewImages)
        ? previewImages
        : [];

    const safeCategories = Array.isArray(categories)
        ? categories
        : [];

    const safeErrors = errors ?? {};

    /*
    |--------------------------------------------------------------------------
    | IMAGE HANDLER
    |--------------------------------------------------------------------------
    */

    const handleImages = (e) => {
        const files = Array.from(e.target.files || []).slice(0, 8);

        if (files.length && typeof onImageChange === "function") {
            onImageChange(files);
        }

        e.target.value = "";
    };

    /*
    |--------------------------------------------------------------------------
    | UPDATE FORM DATA
    |--------------------------------------------------------------------------
    */

    const updateData = (field, value) => {
        if (typeof setData === "function") {
            setData(field, value);
        }
    };

    return (
        <form
            onSubmit={onSubmit}
            className="space-y-5"
        >

            {/* =========================================================
                1. PRODUCT IMAGES
            ========================================================== */}

            <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

                <div className="px-5 py-4 border-b border-slate-100">

                    <h2 className="font-bold text-slate-900">
                        1. Picha za Bidhaa
                    </h2>

                    <p className="text-xs text-slate-500 mt-1">
                        Pakia hadi picha 8. Chagua picha zinazoonyesha bidhaa yako vizuri.
                    </p>

                </div>

                <div className="p-5">

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">

                        {/* UPLOAD */}

                        {safePreviewImages.length < 8 && (
                            <label
                                className="
                                    col-span-2
                                    min-h-[120px]
                                    border-2 border-dashed
                                    border-slate-300
                                    rounded-xl
                                    flex flex-col
                                    items-center
                                    justify-center
                                    cursor-pointer
                                    hover:border-green-500
                                    hover:bg-green-50
                                    transition
                                "
                            >

                                <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center mb-2">
                                    <span className="text-xl text-green-600">
                                        ↑
                                    </span>
                                </div>

                                <span className="text-sm font-semibold text-green-700">
                                    Pakia Picha
                                </span>

                                <span className="text-[11px] text-slate-400 mt-1">
                                    JPG, PNG · Max 5MB
                                </span>

                                {/* <input
                                    type="file"
                                    multiple
                                    accept="image/png,image/jpeg,image/jpg"
                                    onChange={handleImages}
                                    className="hidden"
                                /> */}

                               <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImages}
                                    className="hidden"
                                />

                            </label>
                        )}

                        {/* IMAGE PREVIEWS */}

                        {safePreviewImages.map((src, index) => (
                            <div
                                key={index}
                                className="
                                    relative
                                    h-[120px]
                                    rounded-xl
                                    overflow-hidden
                                    border border-slate-200
                                    bg-slate-50
                                "
                            >

                                <img
                                    src={src}
                                    alt={`Product ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />

                                <button
                                    type="button"
                                    onClick={() => {
                                        if (
                                            typeof onRemoveImage === "function"
                                        ) {
                                            onRemoveImage(index);
                                        }
                                    }}
                                    className="
                                        absolute top-1.5 right-1.5
                                        w-6 h-6
                                        rounded-full
                                        bg-white
                                        shadow
                                        text-slate-600
                                        hover:text-red-600
                                        transition
                                    "
                                >
                                    ×
                                </button>

                                {index === 0 && (
                                    <span
                                        className="
                                            absolute
                                            bottom-0
                                            left-0
                                            right-0
                                            bg-green-600/90
                                            text-white
                                            text-[10px]
                                            text-center
                                            py-1
                                        "
                                    >
                                        Picha kuu
                                    </span>
                                )}

                            </div>
                        ))}

                        {/* EMPTY SLOTS */}

                        {Array.from({
                            length: Math.max(
                                0,
                                4 - safePreviewImages.length
                            ),
                        }).map((_, index) => (
                            <div
                                key={`empty-${index}`}
                                className="
                                    h-[120px]
                                    border border-dashed
                                    border-slate-300
                                    rounded-xl
                                    bg-slate-50
                                    flex items-center justify-center
                                "
                            >
                                <span className="text-slate-300 text-xl">
                                    ▧
                                </span>
                            </div>
                        ))}

                    </div>

                    <p className="text-xs text-slate-500 mt-3">
                        Au chagua faili (Max 8 picha, JPG/PNG, max 5MB kila picha)
                    </p>

                    {safeErrors.images && (
                        <p className="text-red-500 text-xs mt-2">
                            {safeErrors.images}
                        </p>
                    )}

                    {progress && (
                        <div className="mt-4">

                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

                                <div
                                    className="h-full bg-green-600 transition-all"
                                    style={{
                                        width: `${progress.percentage ?? 0}%`,
                                    }}
                                />

                            </div>

                            <p className="text-xs text-slate-500 mt-1">
                                {progress.percentage ?? 0}% uploaded
                            </p>

                        </div>
                    )}

                </div>

            </section>


            {/* =========================================================
                2. PRODUCT DETAILS
            ========================================================== */}

            <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

                <div className="px-5 py-4 border-b border-slate-100">

                    <h2 className="font-bold text-slate-900">
                        2. Maelezo ya Bidhaa
                    </h2>

                </div>

                <div className="p-5 space-y-5">

                    {/* TITLE */}

                    <div>

                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Jina la Bidhaa *
                        </label>

                        <div className="relative">

                            <input
                                type="text"
                                value={title}
                                maxLength={100}
                                onChange={(e) =>
                                    updateData(
                                        "title",
                                        e.target.value
                                    )
                                }
                                placeholder="mf. Samsung Galaxy A15 4G"
                                className="
                                    w-full
                                    border border-slate-300
                                    rounded-lg
                                    px-4 py-2.5
                                    pr-16
                                    text-sm
                                    focus:ring-2
                                    focus:ring-green-500
                                    focus:border-green-500
                                    outline-none
                                "
                            />

                            <span
                                className="
                                    absolute
                                    right-3
                                    top-3
                                    text-[11px]
                                    text-slate-400
                                "
                            >
                                {title.length}/100
                            </span>

                        </div>

                        {safeErrors.title && (
                            <p className="text-red-500 text-xs mt-1">
                                {safeErrors.title}
                            </p>
                        )}

                    </div>


                    {/* CATEGORY */}

                    <div>

                        <div className="flex items-center justify-between mb-1">

                            <label className="block text-sm font-medium text-slate-700">
                                Aina ya Bidhaa *
                            </label>

                            <button
                                type="button"
                                className="
                                    text-xs
                                    text-green-600
                                    font-semibold
                                    hover:underline
                                "
                            >
                                + Ongeza kategoria
                            </button>

                        </div>

                        <select
                            value={categoryId}
                            onChange={(e) =>
                                updateData(
                                    "category_id",
                                    e.target.value
                                )
                            }
                            className="
                                w-full
                                border border-slate-300
                                rounded-lg
                                px-4 py-2.5
                                text-sm
                                bg-white
                                focus:ring-2
                                focus:ring-green-500
                                focus:border-green-500
                                outline-none
                            "
                        >

                            <option value="">
                                Chagua aina ya bidhaa
                            </option>

                            {safeCategories.length > 0 ? (
                                safeCategories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>
                                    Hakuna categories zilizopatikana
                                </option>
                            )}

                        </select>

                        {safeErrors.category_id && (
                            <p className="text-red-500 text-xs mt-1">
                                {safeErrors.category_id}
                            </p>
                        )}

                    </div>


                    {/* CONDITION + PRICE */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* CONDITION */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Hali ya Bidhaa *
                            </label>

                            <div className="flex gap-2">

                                <button
                                    type="button"
                                    onClick={() =>
                                        updateData(
                                            "condition",
                                            "new"
                                        )
                                    }
                                    className={`
                                        flex-1
                                        py-2.5
                                        rounded-lg
                                        border
                                        text-sm
                                        font-medium
                                        transition
                                        ${
                                            condition === "new"
                                                ? "bg-green-600 text-white border-green-600"
                                                : "bg-white text-slate-600 border-slate-300"
                                        }
                                    `}
                                >
                                    Mpya
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        updateData(
                                            "condition",
                                            "used"
                                        )
                                    }
                                    className={`
                                        flex-1
                                        py-2.5
                                        rounded-lg
                                        border
                                        text-sm
                                        font-medium
                                        transition
                                        ${
                                            condition === "used"
                                                ? "bg-green-600 text-white border-green-600"
                                                : "bg-white text-slate-600 border-slate-300"
                                        }
                                    `}
                                >
                                    Iliyotumika
                                </button>

                            </div>

                            {safeErrors.condition && (
                                <p className="text-red-500 text-xs mt-1">
                                    {safeErrors.condition}
                                </p>
                            )}

                        </div>


                        {/* PRICE */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Bei (TZS) *
                            </label>

                            <div className="relative">

                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) =>
                                        updateData(
                                            "price",
                                            e.target.value
                                        )
                                    }
                                    placeholder="1200000"
                                    min="0"
                                    className="
                                        w-full
                                        border border-slate-300
                                        rounded-lg
                                        px-4 py-2.5
                                        pr-14
                                        text-sm
                                        outline-none
                                        focus:ring-2
                                        focus:ring-green-500
                                        focus:border-green-500
                                    "
                                />

                                <span
                                    className="
                                        absolute
                                        right-3
                                        top-3
                                        text-xs
                                        font-semibold
                                        text-slate-400
                                    "
                                >
                                    TZS
                                </span>

                            </div>

                            {safeErrors.price && (
                                <p className="text-red-500 text-xs mt-1">
                                    {safeErrors.price}
                                </p>
                            )}

                        </div>

                    </div>


                    {/* =====================================================
                        LOCATION
                    ====================================================== */}

                    <div>

                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Mahali pa Bidhaa
                        </label>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            {/* REGION */}

                            <div>

                                <label className="block text-xs font-medium text-slate-500 mb-1">
                                    Mkoa *
                                </label>

                                <select
                                    value={region}
                                    onChange={(e) =>
                                        updateData(
                                            "region",
                                            e.target.value
                                        )
                                    }
                                    className="
                                        w-full
                                        border border-slate-300
                                        rounded-lg
                                        px-4 py-2.5
                                        text-sm
                                        bg-white
                                        outline-none
                                        focus:ring-2
                                        focus:ring-green-500
                                        focus:border-green-500
                                    "
                                >

                                    <option value="">
                                        Chagua mkoa
                                    </option>

                                    {regions.map((regionName) => (
                                        <option
                                            key={regionName}
                                            value={regionName}
                                        >
                                            {regionName}
                                        </option>
                                    ))}

                                </select>

                                {safeErrors.region && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {safeErrors.region}
                                    </p>
                                )}

                            </div>


                            {/* CITY */}

                            <div>

                                <label className="block text-xs font-medium text-slate-500 mb-1">
                                    Mji / Wilaya
                                </label>

                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) =>
                                        updateData(
                                            "city",
                                            e.target.value
                                        )
                                    }
                                    placeholder="mf. Ilala"
                                    maxLength={100}
                                    className="
                                        w-full
                                        border border-slate-300
                                        rounded-lg
                                        px-4 py-2.5
                                        text-sm
                                        outline-none
                                        focus:ring-2
                                        focus:ring-green-500
                                        focus:border-green-500
                                    "
                                />

                                {safeErrors.city && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {safeErrors.city}
                                    </p>
                                )}

                            </div>


                            {/* AREA */}

                            <div>

                                <label className="block text-xs font-medium text-slate-500 mb-1">
                                    Eneo / Mtaa
                                </label>

                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) =>
                                        updateData(
                                            "location",
                                            e.target.value
                                        )
                                    }
                                    placeholder="mf. Kariakoo"
                                    maxLength={100}
                                    className="
                                        w-full
                                        border border-slate-300
                                        rounded-lg
                                        px-4 py-2.5
                                        text-sm
                                        outline-none
                                        focus:ring-2
                                        focus:ring-green-500
                                        focus:border-green-500
                                    "
                                />

                                {safeErrors.location && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {safeErrors.location}
                                    </p>
                                )}

                            </div>

                        </div>

                        <p className="text-[11px] text-slate-400 mt-2">
                            Mfano: Dar es Salaam → Ilala → Kariakoo
                        </p>

                    </div>


                    {/* DESCRIPTION */}

                    <div>

                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Maelezo
                        </label>

                        <textarea
                            rows={5}
                            maxLength={1000}
                            value={description}
                            onChange={(e) =>
                                updateData(
                                    "description",
                                    e.target.value
                                )
                            }
                            placeholder="Eleza bidhaa yako kwa undani..."
                            className="
                                w-full
                                border border-slate-300
                                rounded-lg
                                px-4 py-3
                                text-sm
                                resize-none
                                outline-none
                                focus:ring-2
                                focus:ring-green-500
                                focus:border-green-500
                            "
                        />

                        <div className="flex justify-between mt-1">

                            <span className="text-xs text-slate-400">
                                Eleza bidhaa yako kwa undani.
                            </span>

                            <span className="text-xs text-slate-400">
                                {description.length}/1000
                            </span>

                        </div>

                        {safeErrors.description && (
                            <p className="text-red-500 text-xs mt-1">
                                {safeErrors.description}
                            </p>
                        )}

                    </div>

                </div>

            </section>


            {/* =========================================================
                3. USED PRODUCT DETAILS
            ========================================================== */}

            {condition === "used" && (

                <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

                    <div className="px-5 py-4 border-b border-slate-100">

                        <h2 className="font-bold text-slate-900">
                            3. Maelezo ya Ziada (Kwa Bidhaa Iliyotumika)
                        </h2>

                    </div>

                    <div className="p-5 space-y-5">

                        {/* USAGE CONDITION */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Hali ya matumizi
                            </label>

                            <div className="grid grid-cols-3 gap-3">

                                {[
                                    ["excellent", "Excellent"],
                                    ["good", "Good"],
                                    ["fair", "Fair"],
                                ].map(([value, label]) => (

                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() =>
                                            updateData(
                                                "usage_condition",
                                                value
                                            )
                                        }
                                        className={`
                                            border
                                            rounded-lg
                                            py-2.5
                                            text-sm
                                            font-medium
                                            transition
                                            ${
                                                usageCondition === value
                                                    ? "border-green-600 bg-green-50 text-green-700"
                                                    : "border-slate-300 text-slate-600 bg-white"
                                            }
                                        `}
                                    >
                                        {label}
                                    </button>

                                ))}

                            </div>

                            {safeErrors.usage_condition && (
                                <p className="text-red-500 text-xs mt-1">
                                    {safeErrors.usage_condition}
                                </p>
                            )}

                        </div>


                        {/* YEAR */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Mwaka / Mileage
                            </label>

                            <input
                                type="text"
                                value={year}
                                onChange={(e) =>
                                    updateData(
                                        "year",
                                        e.target.value
                                    )
                                }
                                placeholder="mf. 2021 au 45,000 km"
                                className="
                                    w-full
                                    border border-slate-300
                                    rounded-lg
                                    px-4 py-2.5
                                    text-sm
                                    outline-none
                                    focus:ring-2
                                    focus:ring-green-500
                                    focus:border-green-500
                                "
                            />

                            {safeErrors.year && (
                                <p className="text-red-500 text-xs mt-1">
                                    {safeErrors.year}
                                </p>
                            )}

                        </div>


                        {/* NOTES */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Battery health / Condition notes
                            </label>

                            <textarea
                                rows={3}
                                maxLength={300}
                                value={conditionNotes}
                                onChange={(e) =>
                                    updateData(
                                        "condition_notes",
                                        e.target.value
                                    )
                                }
                                placeholder="Eleza hali ya betri na maelezo mengine muhimu..."
                                className="
                                    w-full
                                    border border-slate-300
                                    rounded-lg
                                    px-4 py-3
                                    text-sm
                                    resize-none
                                    outline-none
                                    focus:ring-2
                                    focus:ring-green-500
                                    focus:border-green-500
                                "
                            />

                            <div className="text-right text-xs text-slate-400 mt-1">
                                {conditionNotes.length}/300
                            </div>

                            {safeErrors.condition_notes && (
                                <p className="text-red-500 text-xs mt-1">
                                    {safeErrors.condition_notes}
                                </p>
                            )}

                        </div>

                    </div>

                </section>

            )}


            {/* =========================================================
                ACTIONS
            ========================================================== */}

            <div className="flex flex-col sm:flex-row justify-end gap-3">

                <button
                    type="button"
                    className="
                        px-6 py-3
                        rounded-xl
                        border border-slate-300
                        bg-white
                        text-slate-700
                        font-semibold
                        hover:bg-slate-50
                        transition
                    "
                >
                    Hifadhi Draft
                </button>

                <button
                    type="submit"
                    disabled={processing}
                    className="
                        px-7 py-3
                        rounded-xl
                        bg-green-600
                        text-white
                        font-semibold
                        hover:bg-green-700
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                        transition
                    "
                >
                    {processing
                        ? "Inatuma..."
                        : "Weka Bidhaa Sokoni"}
                </button>

            </div>

        </form>
    );
}

