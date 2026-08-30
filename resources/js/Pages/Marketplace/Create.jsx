import { Head, useForm } from "@inertiajs/react";
import Sidebar from "@/Components/Marketplace/Sidebar";
import Topbar from "@/Components/Marketplace/Topbar";
import ProductForm from "@/Components/Marketplace/ProductForm";
import ProductPreview from "@/Components/Marketplace/ProductPreview";
import { useState } from "react";

//Image preview state 
const [previewImages, setPreviewImages] = useState([]);

const handleImageChange = (files) => {
    setData("images", files);

    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
};

const handleRemoveImage = (index) => {
    const newFiles = [...data.images];
    newFiles.splice(index, 1);
    setData("images", newFiles);

    const newPreviews = [...previewImages];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
};

// Cleanup object URLs on component unmount
export default function Create({ categories = [], seller = null }) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        images: [],
        // name: "",
        title: "",
        category_id: "",
        condition: "new",
        price: "",
        location: "",
        description: "",
        status: "draft",
        condition_status: "excellent",
        mileage: "",
        battery_health: "",
    });

    // const submit = (status = "published") => {
    //     setData("status", status);

    //     post(route("marketplace.store"), {
    //         forceFormData: true,
    //     });
    // };

    post(route("marketplace.store"), {
    forceFormData: true,
    data: {
        ...data,
        status,
    },
});
    return (
        <>
            <Head title="Ongeza Bidhaa Mpya - MauzoVibe" />

            <div className="min-h-screen bg-slate-50">

                <Sidebar />

                <div className="ml-[200px] min-h-screen">

                    <Topbar seller={seller} />

                    <main className="px-6 py-5 pb-24">

                        <div className="mb-5">
                            <h1 className="text-2xl font-bold text-slate-900">
                                Ongeza Bidhaa Mpya
                            </h1>

                            <p className="text-sm text-slate-500 mt-1">
                                Ongeza bidhaa mpya na uifikishe kwa wateja wengi zaidi.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_350px] gap-5">

                            {/* <ProductForm
                                data={data}
                                setData={setData}
                                errors={errors}
                                categories={categories}
                            /> */}
                            <ProductForm
                                data={data}
                                setData={setData}
                                errors={errors}
                                categories={categories}
                                processing={processing}
                                previewImages={previewImages}
                                onImageChange={handleImageChange}
                                onRemoveImage={handleRemoveImage}
                            />

                            <ProductPreview
                                data={data}
                                seller={seller}
                            />

                        </div>

                    </main>

                    <div className="fixed bottom-0 right-0 left-[200px] bg-white border-t border-slate-200 px-6 py-3 flex justify-end gap-3 z-30">

                        <button
                            type="button"
                            onClick={() => submit("draft")}
                            disabled={processing}
                            className="px-6 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-50"
                        >
                            💾 Hifadhi Rasimu
                        </button>

                        <button
                            type="button"
                            onClick={() => submit("published")}
                            disabled={processing}
                            className="px-7 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm"
                        >
                            ➤ Chapisha Bidhaa
                        </button>

                    </div>

                </div>
            </div>
        </>
    );
}