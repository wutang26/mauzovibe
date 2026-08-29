import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";

import {
    ArrowLeftIcon,
    CloudArrowUpIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Edit({ post }) {
    /*
    |--------------------------------------------------------------------------
    | Format existing datetime for datetime-local
    |--------------------------------------------------------------------------
    */

    const formatDateTimeLocal = (value) => {
        if (!value) {
            return "";
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return "";
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    /*
    |--------------------------------------------------------------------------
    | Form
    |--------------------------------------------------------------------------
    */

    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        _method: "put",

        title: post?.title ?? "",
        description: post?.description ?? "",
        image: null,
        button_text: post?.button_text ?? "",
        button_url: post?.button_url ?? "",
        type: post?.type ?? "welcome",
        starts_at: formatDateTimeLocal(post?.starts_at),
        ends_at: formatDateTimeLocal(post?.ends_at),
        is_active: Boolean(post?.is_active),
        sort_order: post?.sort_order ?? 0,
    });

    /*
    |--------------------------------------------------------------------------
    | Existing image
    |--------------------------------------------------------------------------
    */

    const [existingImage, setExistingImage] = useState(
        post?.image ?? null
    );

    /*
    |--------------------------------------------------------------------------
    | New image preview
    |--------------------------------------------------------------------------
    */

    const [imagePreview, setImagePreview] = useState(null);

    /*
    |--------------------------------------------------------------------------
    | Create preview when new image selected
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!data.image) {
            setImagePreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(data.image);

        setImagePreview(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [data.image]);

    /*
    |--------------------------------------------------------------------------
    | Select image
    |--------------------------------------------------------------------------
    */

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        setData("image", file);
    };

    /*
    |--------------------------------------------------------------------------
    | Remove selected/new image
    |--------------------------------------------------------------------------
    */

    const removeNewImage = () => {
        setData("image", null);
        setImagePreview(null);
    };

    /*
    |--------------------------------------------------------------------------
    | Hide existing image from preview
    |--------------------------------------------------------------------------
    |
    | IMPORTANT:
    | This only removes it from the frontend preview.
    | It does NOT delete it from database/storage.
    |
    */

    const removeExistingImage = () => {
        setExistingImage(null);
    };

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const submit = (e) => {
        e.preventDefault();

        post(route("admin.daily-posts.update", post.id), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    /*
    |--------------------------------------------------------------------------
    | File size
    |--------------------------------------------------------------------------
    */

    const formatFileSize = (bytes) => {
        if (!bytes) {
            return "0 KB";
        }

        const kb = bytes / 1024;

        if (kb < 1024) {
            return `${kb.toFixed(1)} KB`;
        }

        return `${(kb / 1024).toFixed(1)} MB`;
    };

    /*
    |--------------------------------------------------------------------------
    | Image to display
    |--------------------------------------------------------------------------
    */

    const hasNewImage = Boolean(imagePreview);
    const hasExistingImage = Boolean(existingImage);

    return (
        <AdminLayout>
            <Head title={`Edit Daily Post - ${post?.title ?? ""}`} />

            <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">

                {/* =========================================================
                    HEADER
                ========================================================== */}

                <div className="flex items-center gap-4 mb-6">

                    <Link
                        href={route("admin.daily-posts.index")}
                        className="
                            flex
                            items-center
                            justify-center
                            w-11
                            h-11
                            rounded-xl
                            bg-white
                            border
                            border-slate-200
                            text-slate-700
                            hover:bg-slate-50
                            hover:border-emerald-300
                            transition-all
                        "
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                    </Link>

                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                            Edit Daily Post
                        </h1>

                        <p className="text-sm text-slate-500 mt-1">
                            Update your Daily Welcome Page content.
                        </p>
                    </div>

                </div>

                {/* =========================================================
                    VALIDATION ERRORS
                ========================================================== */}

                {Object.keys(errors).length > 0 && (
                    <div
                        className="
                            mb-6
                            rounded-2xl
                            border
                            border-red-200
                            bg-red-50
                            p-4
                            sm:p-5
                        "
                    >
                        <p className="font-bold text-red-700 mb-2">
                            Please fix the following errors:
                        </p>

                        <ul className="list-disc list-inside space-y-1 text-sm text-red-600">
                            {Object.entries(errors).map(
                                ([field, message]) => (
                                    <li key={field}>
                                        {message}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                )}

                {/* =========================================================
                    FORM
                ========================================================== */}

                <form
                    onSubmit={submit}
                    encType="multipart/form-data"
                    className="
                        bg-white
                        border
                        border-slate-200
                        rounded-2xl
                        shadow-sm
                        p-5
                        sm:p-7
                    "
                >

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* =================================================
                            TITLE
                        ================================================== */}

                        <div className="lg:col-span-2">

                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Title
                            </label>

                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData(
                                        "title",
                                        e.target.value
                                    )
                                }
                                placeholder="Welcome to MauzoVibe"
                                className="
                                    w-full
                                    rounded-xl
                                    border-slate-300
                                    focus:border-emerald-500
                                    focus:ring-emerald-500
                                "
                            />

                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.title}
                                </p>
                            )}

                        </div>

                        {/* =================================================
                            DESCRIPTION
                        ================================================== */}

                        <div className="lg:col-span-2">

                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Description
                            </label>

                            <textarea
                                rows={5}
                                value={data.description}
                                onChange={(e) =>
                                    setData(
                                        "description",
                                        e.target.value
                                    )
                                }
                                placeholder="Write your daily welcome message..."
                                className="
                                    w-full
                                    rounded-xl
                                    border-slate-300
                                    focus:border-emerald-500
                                    focus:ring-emerald-500
                                    resize-none
                                "
                            />

                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.description}
                                </p>
                            )}

                        </div>

                        {/* =================================================
                            IMAGE
                        ================================================== */}

                        <div className="lg:col-span-2">

                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Post Image
                            </label>

                            {/* =================================================
                                NEW IMAGE PREVIEW
                            ================================================== */}

                            {hasNewImage ? (

                                <div
                                    className="
                                        relative
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        bg-slate-100
                                    "
                                >

                                    <img
                                        src={imagePreview}
                                        alt="New daily post preview"
                                        className="
                                            w-full
                                            h-[320px]
                                            sm:h-[400px]
                                            object-cover
                                        "
                                    />

                                    <div
                                        className="
                                            absolute
                                            inset-x-0
                                            bottom-0
                                            bg-gradient-to-t
                                            from-black/80
                                            via-black/40
                                            to-transparent
                                            p-4
                                            pt-16
                                        "
                                    >

                                        <div className="flex items-center justify-between gap-3">

                                            <div className="min-w-0">

                                                <p className="text-white font-semibold truncate">
                                                    {data.image?.name}
                                                </p>

                                                <p className="text-white/70 text-xs">
                                                    {formatFileSize(
                                                        data.image?.size
                                                    )}
                                                </p>

                                            </div>

                                            <div className="flex items-center gap-2 shrink-0">

                                                {/* CHANGE */}

                                                <label
                                                    className="
                                                        px-4
                                                        py-2
                                                        rounded-lg
                                                        bg-white/90
                                                        hover:bg-white
                                                        text-slate-900
                                                        text-sm
                                                        font-bold
                                                        cursor-pointer
                                                        transition
                                                    "
                                                >
                                                    Change

                                                    <input
                                                        type="file"
                                                        accept="image/jpeg,image/png,image/webp,image/jpg,image/gif"
                                                        className="hidden"
                                                        onChange={
                                                            handleImageChange
                                                        }
                                                    />
                                                </label>

                                                {/* REMOVE */}

                                                <button
                                                    type="button"
                                                    onClick={
                                                        removeNewImage
                                                    }
                                                    className="
                                                        flex
                                                        items-center
                                                        justify-center
                                                        w-9
                                                        h-9
                                                        rounded-lg
                                                        bg-red-500
                                                        hover:bg-red-600
                                                        text-white
                                                        transition
                                                    "
                                                    title="Remove selected image"
                                                >
                                                    <XMarkIcon className="w-5 h-5" />
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ) : hasExistingImage ? (

                                /* =================================================
                                    EXISTING IMAGE
                                ================================================== */

                                <div
                                    className="
                                        relative
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        bg-slate-100
                                    "
                                >

                                    <img
                                        src={existingImage}
                                        alt={post?.title ?? "Daily post"}
                                        className="
                                            w-full
                                            h-[320px]
                                            sm:h-[400px]
                                            object-cover
                                        "
                                    />

                                    <div
                                        className="
                                            absolute
                                            inset-x-0
                                            bottom-0
                                            bg-gradient-to-t
                                            from-black/80
                                            via-black/40
                                            to-transparent
                                            p-4
                                            pt-16
                                        "
                                    >

                                        <div className="flex items-center justify-between gap-3">

                                            <div>

                                                <p className="text-white font-semibold">
                                                    Current Image
                                                </p>

                                                <p className="text-white/70 text-xs">
                                                    Upload a new image to replace it.
                                                </p>

                                            </div>

                                            <div className="flex items-center gap-2">

                                                {/* CHANGE */}

                                                <label
                                                    className="
                                                        px-4
                                                        py-2
                                                        rounded-lg
                                                        bg-white/90
                                                        hover:bg-white
                                                        text-slate-900
                                                        text-sm
                                                        font-bold
                                                        cursor-pointer
                                                        transition
                                                    "
                                                >
                                                    Change

                                                    <input
                                                        type="file"
                                                        accept="image/jpeg,image/png,image/webp,image/jpg,image/gif"
                                                        className="hidden"
                                                        onChange={
                                                            handleImageChange
                                                        }
                                                    />
                                                </label>

                                                {/* HIDE */}

                                                <button
                                                    type="button"
                                                    onClick={
                                                        removeExistingImage
                                                    }
                                                    className="
                                                        flex
                                                        items-center
                                                        justify-center
                                                        w-9
                                                        h-9
                                                        rounded-lg
                                                        bg-red-500
                                                        hover:bg-red-600
                                                        text-white
                                                        transition
                                                    "
                                                    title="Remove image preview"
                                                >
                                                    <XMarkIcon className="w-5 h-5" />
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ) : (

                                /* =================================================
                                    UPLOAD NEW IMAGE
                                ================================================== */

                                <label
                                    className="
                                        relative
                                        flex
                                        flex-col
                                        items-center
                                        justify-center
                                        w-full
                                        min-h-[260px]
                                        rounded-2xl
                                        border-2
                                        border-dashed
                                        border-slate-300
                                        bg-slate-50
                                        hover:bg-emerald-50
                                        hover:border-emerald-500
                                        cursor-pointer
                                        transition-all
                                        duration-200
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            w-16
                                            h-16
                                            rounded-2xl
                                            bg-emerald-100
                                            text-emerald-600
                                            mb-4
                                        "
                                    >
                                        <CloudArrowUpIcon className="w-9 h-9" />
                                    </div>

                                    <span className="text-base font-bold text-slate-700">
                                        Click to upload image
                                    </span>

                                    <span className="mt-1 text-sm text-slate-500">
                                        PNG, JPG, JPEG, WEBP or GIF
                                    </span>

                                    <span className="mt-1 text-xs text-slate-400">
                                        Maximum size: 5MB
                                    </span>

                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp,image/jpg,image/gif"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />

                                </label>

                            )}

                            {errors.image && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.image}
                                </p>
                            )}

                        </div>

                        {/* =================================================
                            TYPE
                        ================================================== */}

                        <div>

                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Post Type
                            </label>

                            <select
                                value={data.type}
                                onChange={(e) =>
                                    setData(
                                        "type",
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border-slate-300
                                    focus:border-emerald-500
                                    focus:ring-emerald-500
                                "
                            >
                                <option value="welcome">
                                    Welcome
                                </option>

                                <option value="promotion">
                                    Promotion
                                </option>

                                <option value="announcement">
                                    Announcement
                                </option>

                                <option value="update">
                                    Update
                                </option>
                            </select>

                            {errors.type && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.type}
                                </p>
                            )}

                        </div>

                        {/* =================================================
                            BUTTON TEXT
                        ================================================== */}

                        <div>

                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Button Text
                            </label>

                            <input
                                type="text"
                                value={data.button_text}
                                onChange={(e) =>
                                    setData(
                                        "button_text",
                                        e.target.value
                                    )
                                }
                                placeholder="Learn More"
                                className="
                                    w-full
                                    rounded-xl
                                    border-slate-300
                                    focus:border-emerald-500
                                    focus:ring-emerald-500
                                "
                            />

                            {errors.button_text && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.button_text}
                                </p>
                            )}

                        </div>

                        {/* =================================================
                            BUTTON URL
                        ================================================== */}

                        <div>

                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Button URL
                            </label>

                            <input
                                type="text"
                                value={data.button_url}
                                onChange={(e) =>
                                    setData(
                                        "button_url",
                                        e.target.value
                                    )
                                }
                                placeholder="/marketplace"
                                className="
                                    w-full
                                    rounded-xl
                                    border-slate-300
                                    focus:border-emerald-500
                                    focus:ring-emerald-500
                                "
                            />

                            <p className="mt-1 text-xs text-slate-400">
                                Example: /marketplace
                            </p>

                            {errors.button_url && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.button_url}
                                </p>
                            )}

                        </div>

                        {/* =================================================
                            STARTS AT
                        ================================================== */}

                        <div>

                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Starts At
                            </label>

                            <input
                                type="datetime-local"
                                value={data.starts_at}
                                onChange={(e) =>
                                    setData(
                                        "starts_at",
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border-slate-300
                                    focus:border-emerald-500
                                    focus:ring-emerald-500
                                "
                            />

                            {errors.starts_at && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.starts_at}
                                </p>
                            )}

                        </div>

                        {/* =================================================
                            ENDS AT
                        ================================================== */}

                        <div>

                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Ends At
                            </label>

                            <input
                                type="datetime-local"
                                value={data.ends_at}
                                onChange={(e) =>
                                    setData(
                                        "ends_at",
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border-slate-300
                                    focus:border-emerald-500
                                    focus:ring-emerald-500
                                "
                            />

                            {errors.ends_at && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.ends_at}
                                </p>
                            )}

                        </div>

                        {/* =================================================
                            SORT ORDER
                        ================================================== */}

                        <div>

                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Sort Order
                            </label>

                            <input
                                type="number"
                                min="0"
                                value={data.sort_order}
                                onChange={(e) =>
                                    setData(
                                        "sort_order",
                                        Number(e.target.value)
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border-slate-300
                                    focus:border-emerald-500
                                    focus:ring-emerald-500
                                "
                            />

                            <p className="mt-1 text-xs text-slate-400">
                                Lower numbers appear first.
                            </p>

                            {errors.sort_order && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.sort_order}
                                </p>
                            )}

                        </div>

                        {/* =================================================
                            ACTIVE
                        ================================================== */}

                        <div className="flex items-center">

                            <label
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    cursor-pointer
                                "
                            >

                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) =>
                                        setData(
                                            "is_active",
                                            e.target.checked
                                        )
                                    }
                                    className="
                                        w-5
                                        h-5
                                        rounded
                                        border-slate-300
                                        text-emerald-600
                                        focus:ring-emerald-500
                                    "
                                />

                                <div>

                                    <span className="block text-sm font-bold text-slate-700">
                                        Publish this post
                                    </span>

                                    <span className="block text-xs text-slate-400">
                                        Show this post on the Daily Welcome Page.
                                    </span>

                                </div>

                            </label>

                        </div>

                    </div>

                    {/* =====================================================
                        ACTIONS
                    ====================================================== */}

                    <div
                        className="
                            mt-8
                            pt-6
                            border-t
                            border-slate-200
                            flex
                            flex-col-reverse
                            sm:flex-row
                            sm:justify-end
                            gap-3
                        "
                    >

                        <Link
                            href={route("admin.daily-posts.index")}
                            className="
                                px-5
                                py-3
                                rounded-xl
                                border
                                border-slate-300
                                text-slate-700
                                font-semibold
                                text-center
                                hover:bg-slate-50
                                transition
                            "
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="
                                px-6
                                py-3
                                rounded-xl
                                bg-emerald-600
                                hover:bg-emerald-700
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                                text-white
                                font-bold
                                shadow-lg
                                shadow-emerald-600/20
                                transition-all
                            "
                        >
                            {processing
                                ? "Updating..."
                                : "Update Daily Post"}
                        </button>

                    </div>

                </form>

            </div>
        </AdminLayout>
    );
}

