import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

import Sidebar from '@/Components/Marketplace/Sidebar';
import Topbar from '@/Components/Marketplace/Topbar';
import ProductForm from '@/Components/Marketplace/ProductForm';
import ProductPreview from '@/Components/Marketplace/Productpreview';

export default function Create({ categories = [], user = null }) {

    const { data, setData, post, processing, errors, progress } = useForm({
        title: '',
        description: '',
        price: '',
        condition: 'used',
        category_id: '',
        location: '',
        city: '',
        images: [],

        // Used product details
        usage_condition: 'excellent',
        year: '',
        condition_notes: '',
    });

    const [previewImages, setPreviewImages] = useState([]);

    const handleImageChange = (files) => {
        setData('images', files);

        const previews = files.map(file =>
            URL.createObjectURL(file)
        );

        setPreviewImages(previews);
    };

    const removeImage = (index) => {
        const newFiles = data.images.filter((_, i) => i !== index);
        const newPreviews = previewImages.filter((_, i) => i !== index);

        setData('images', newFiles);
        setPreviewImages(newPreviews);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('marketplace.store'), {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Uza Bidhaa - MauzoVibe" />

            <div className="min-h-screen bg-slate-50 flex">

                {/* SIDEBAR */}
                <Sidebar />

                <div className="flex-1 min-w-0 flex flex-col">

                    {/* TOPBAR */}
                    <Topbar />

                    {/* MAIN */}
                    <main className="flex-1 p-4 md:p-6">

                        <div className="max-w-[1500px] mx-auto">

                            {/* PAGE HEADER */}
                            <div className="mb-6">
                                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                                    Uza Bidhaa
                                </h1>

                                <p className="text-sm text-slate-500 mt-1">
                                    Weka bidhaa yako sokoni na uwafikie wanunuzi wengi zaidi.
                                </p>
                            </div>

                            {/* CONTENT */}
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                                {/* FORM */}
                                <div className="xl:col-span-2">

                                    <ProductForm
                                        data={data}
                                        setData={setData}
                                        categories={categories}
                                        errors={errors}
                                        processing={processing}
                                        progress={progress}
                                        previewImages={previewImages}
                                        onImageChange={handleImageChange}
                                        onRemoveImage={removeImage}
                                        onSubmit={submit}
                                    />

                                </div>

                                {/* LIVE PREVIEW */}
                                <div className="xl:col-span-1">

                                    <div className="xl:sticky xl:top-24">
                                        <ProductPreview
                                            data={data}
                                            previewImages={previewImages}
                                            user={user}
                                        />
                                    </div>

                                </div>

                            </div>

                        </div>

                    </main>

                </div>

            </div>
        </>
    );
}