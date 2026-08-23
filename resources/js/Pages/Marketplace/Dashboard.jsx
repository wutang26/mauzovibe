import { useRef } from "react";
import { useForm } from "@inertiajs/react";

import MarketplaceLayout from "@/Layouts/MarketplaceLayout";
import ProductForm from "@/Components/Marketplace/ProductForm";
import ProductPreview from "@/Components/Marketplace/ProductPreview";

export default function Dashboard({
    categories = [],
}) {
    const productFormRef = useRef(null);

    /*
    |--------------------------------------------------------------------------
    | PRODUCT FORM
    |--------------------------------------------------------------------------
    */

    const {
        data,
        setData,
        post,
        processing,
        errors,
        progress,
        reset,
    } = useForm({
        title: "",
        description: "",
        price: "",
        condition: "new",
        category_id: "",
        location: "",
        city: "",
        images: [],
        condition_notes: "",
        usage_condition: "",
        year: "",
    });

    /*
    |--------------------------------------------------------------------------
    | IMAGE PREVIEW
    |--------------------------------------------------------------------------
    */

    const previewImages = Array.isArray(data.images)
        ? data.images.map((file) => URL.createObjectURL(file))
        : [];

    /*
    |--------------------------------------------------------------------------
    | ADD PRODUCT BUTTON
    |--------------------------------------------------------------------------
    */

    const handleAddProduct = () => {
        productFormRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    /*
    |--------------------------------------------------------------------------
    | IMAGE CHANGE
    |--------------------------------------------------------------------------
    */

    const handleImageChange = (files) => {
        if (!Array.isArray(files)) {
            return;
        }

        setData("images", files.slice(0, 8));
    };

    /*
    |--------------------------------------------------------------------------
    | REMOVE IMAGE
    |--------------------------------------------------------------------------
    */

    const handleRemoveImage = (index) => {
        const currentImages = Array.isArray(data.images)
            ? [...data.images]
            : [];

        currentImages.splice(index, 1);

        setData("images", currentImages);
    };

    /*
    |--------------------------------------------------------------------------
    | SUBMIT PRODUCT
    |--------------------------------------------------------------------------
    */

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("marketplace.store"), {
            forceFormData: true,

            preserveScroll: true,

            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <MarketplaceLayout>

            {/* =====================================================
                MARKETPLACE DASHBOARD CONTENT
            ====================================================== */}

            <div className="min-h-screen bg-slate-50">

                {/* =================================================
                    STICKY MOBILE TOP BAR
                ================================================== */}

                <div
                    className="
                        lg:hidden
                        sticky
                        top-0
                        z-40
                        bg-white
                        border-b
                        border-slate-200
                        shadow-sm
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            px-4
                            py-3
                        "
                    >

                        {/* LEFT */}

                        <div className="flex items-center gap-3">

                            <div
                                className="
                                    w-9
                                    h-9
                                    rounded-xl
                                    bg-green-600
                                    flex
                                    items-center
                                    justify-center
                                    text-white
                                    font-bold
                                "
                            >
                                M
                            </div>

                            <div>

                                <h1
                                    className="
                                        text-sm
                                        font-bold
                                        text-slate-900
                                    "
                                >
                                    Marketplace
                                </h1>

                                <p
                                    className="
                                        text-[11px]
                                        text-slate-500
                                    "
                                >
                                    Dashboard
                                </p>

                            </div>

                        </div>


                        {/* MOBILE MENU BUTTON */}

                        <button
                            type="button"
                            className="
                                w-10
                                h-10
                                rounded-xl
                                border
                                border-slate-200
                                bg-white
                                flex
                                items-center
                                justify-center
                                text-slate-700
                                hover:bg-slate-50
                            "
                            aria-label="Open marketplace menu"
                        >
                            ☰
                        </button>

                    </div>

                </div>


                {/* =================================================
                    PAGE CONTAINER
                ================================================== */}

                <div
                    className="
                        w-full
                        max-w-[1600px]
                        mx-auto
                        px-3
                        sm:px-4
                        md:px-6
                        lg:px-8
                        py-4
                        sm:py-6
                    "
                >

                    {/* =================================================
                        PAGE HEADER
                    ================================================== */}

                    <div
                        className="
                            flex
                            flex-col
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                            gap-4
                            mb-6
                        "
                    >

                        <div>

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-xs
                                    text-slate-500
                                    mb-1
                                "
                            >

                                <span>
                                    Marketplace
                                </span>

                                <span>
                                    /
                                </span>

                                <span className="text-green-600">
                                    Dashboard
                                </span>

                            </div>

                            <h1
                                className="
                                    text-xl
                                    sm:text-2xl
                                    lg:text-3xl
                                    font-bold
                                    text-slate-900
                                "
                            >
                                Marketplace Dashboard
                            </h1>

                            <p
                                className="
                                    text-sm
                                    text-slate-500
                                    mt-1
                                "
                            >
                                Simamia bidhaa zako na matangazo yako kwenye Marketplace.
                            </p>

                        </div>


                        {/* =================================================
                            ADD PRODUCT BUTTON
                        ================================================== */}

                        <button
                            type="button"
                            onClick={handleAddProduct}
                            className="
                                w-full
                                sm:w-auto
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                px-5
                                py-2.5
                                rounded-xl
                                bg-green-600
                                text-white
                                text-sm
                                font-semibold
                                shadow-sm
                                hover:bg-green-700
                                active:bg-green-800
                                transition
                            "
                        >

                            <i className="fa-solid fa-plus"></i>

                            Ongeza Bidhaa

                        </button>

                    </div>


                    {/* =================================================
                        MAIN CONTENT
                    ================================================== */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            xl:grid-cols-12
                            gap-5
                            items-start
                        "
                    >

                        {/* =================================================
                            LEFT - PRODUCT FORM
                        ================================================== */}

                        <main
                            ref={productFormRef}
                            id="product-form"
                            className="
                                xl:col-span-8
                                min-w-0
                                scroll-mt-28
                            "
                        >

                            <ProductForm
                                data={data}
                                setData={setData}
                                categories={categories}
                                errors={errors}
                                processing={processing}
                                progress={progress}
                                previewImages={previewImages}
                                onImageChange={handleImageChange}
                                onRemoveImage={handleRemoveImage}
                                onSubmit={handleSubmit}
                            />

                        </main>


                        {/* =================================================
                            RIGHT - PRODUCT PREVIEW
                        ================================================== */}

                        <aside
                            className="
                                xl:col-span-4
                                min-w-0
                                xl:sticky
                                xl:top-24
                            "
                        >

                            <ProductPreview
                                data={data}
                                previewImages={previewImages}
                                categories={categories}
                            />

                        </aside>

                    </div>

                </div>

            </div>

        </MarketplaceLayout>
    );
}