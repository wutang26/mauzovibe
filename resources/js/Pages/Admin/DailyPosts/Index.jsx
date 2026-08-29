import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    PowerIcon,
} from "@heroicons/react/24/outline";

export default function Index({ posts }) {

    const deletePost = (post) => {
        if (
            confirm(
                `Una uhakika unataka kufuta "${post.title}"?`
            )
        ) {
            router.delete(
                route("admin.daily-posts.destroy", post.id)
            );
        }
    };

    const togglePost = (post) => {
        router.patch(
            route("admin.daily-posts.toggle", post.id)
        );
    };

    return (
        <AdminLayout>

            <Head title="Daily Posts" />

            <div className="p-4 sm:p-6 lg:p-8">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                            Daily Posts
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage posts zinazoonekana kwenye Daily Welcome Page.
                        </p>
                    </div>

                    <Link
                        href={route("admin.daily-posts.create")}
                        className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            px-5
                            py-3
                            rounded-xl
                            bg-emerald-600
                            hover:bg-emerald-700
                            text-white
                            font-bold
                            shadow-lg
                            shadow-emerald-600/20
                            transition
                        "
                    >
                        <PlusIcon className="w-5 h-5" />

                        Add Daily Post
                    </Link>

                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-slate-50 border-b border-slate-200">

                                <tr>

                                    <th className="px-5 py-4 text-left text-xs font-bold text-slate-500 uppercase">
                                        Post
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-bold text-slate-500 uppercase">
                                        Type
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-bold text-slate-500 uppercase">
                                        Button
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-bold text-slate-500 uppercase">
                                        Status
                                    </th>

                                    <th className="px-5 py-4 text-center text-xs font-bold text-slate-500 uppercase">
                                        Order
                                    </th>

                                    <th className="px-5 py-4 text-right text-xs font-bold text-slate-500 uppercase">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-slate-100">

                                {posts.data?.length > 0 ? (

                                    posts.data.map((post) => (

                                        <tr
                                            key={post.id}
                                            className="hover:bg-slate-50 transition"
                                        >

                                            {/* Post */}
                                            <td className="px-5 py-4">

                                                <div className="flex items-center gap-3">

                                                    {post.image ? (
                                                        <img
                                                            src={post.image}
                                                            alt={post.title}
                                                            className="
                                                                w-14
                                                                h-14
                                                                rounded-xl
                                                                object-cover
                                                                border
                                                                border-slate-200
                                                            "
                                                        />
                                                    ) : (
                                                        <div
                                                            className="
                                                                w-14
                                                                h-14
                                                                rounded-xl
                                                                bg-emerald-50
                                                                text-emerald-600
                                                                flex
                                                                items-center
                                                                justify-center
                                                                font-bold
                                                            "
                                                        >
                                                            DP
                                                        </div>
                                                    )}

                                                    <div className="min-w-0">

                                                        <h3 className="font-bold text-slate-900 truncate max-w-xs">
                                                            {post.title}
                                                        </h3>

                                                        {post.description && (
                                                            <p className="text-sm text-slate-500 truncate max-w-xs">
                                                                {post.description}
                                                            </p>
                                                        )}

                                                    </div>

                                                </div>

                                            </td>

                                            {/* Type */}
                                            <td className="px-5 py-4">

                                                <span className="
                                                    inline-flex
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    bg-slate-100
                                                    text-slate-700
                                                    text-xs
                                                    font-bold
                                                    capitalize
                                                ">
                                                    {post.type}
                                                </span>

                                            </td>

                                            {/* Button */}
                                            <td className="px-5 py-4">

                                                {post.button_text ? (
                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-900">
                                                            {post.button_text}
                                                        </p>

                                                        {post.button_url && (
                                                            <p className="text-xs text-slate-400 truncate max-w-[180px]">
                                                                {post.button_url}
                                                            </p>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-slate-400">
                                                        No button
                                                    </span>
                                                )}

                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-4">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        togglePost(post)
                                                    }
                                                    className={`
                                                        inline-flex
                                                        items-center
                                                        gap-2
                                                        px-3
                                                        py-1.5
                                                        rounded-full
                                                        text-xs
                                                        font-bold
                                                        transition
                                                        ${
                                                            post.is_active
                                                                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                                                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                                        }
                                                    `}
                                                >

                                                    <span
                                                        className={`
                                                            w-2
                                                            h-2
                                                            rounded-full
                                                            ${
                                                                post.is_active
                                                                    ? "bg-emerald-500"
                                                                    : "bg-slate-400"
                                                            }
                                                        `}
                                                    />

                                                    {post.is_active
                                                        ? "Active"
                                                        : "Inactive"}

                                                </button>

                                            </td>

                                            {/* Order */}
                                            <td className="px-5 py-4 text-center">

                                                <span className="font-bold text-slate-700">
                                                    {post.sort_order ?? 0}
                                                </span>

                                            </td>

                                            {/* Actions */}
                                            <td className="px-5 py-4">

                                                <div className="flex items-center justify-end gap-2">

                                                    <Link
                                                    href={route("admin.daily-posts.edit", {
                                                        dailyPost: post.id,
                                                    })}
                                                    className="
                                                        inline-flex
                                                        items-center
                                                        justify-center
                                                        p-2
                                                        rounded-lg
                                                        text-slate-500
                                                        hover:bg-emerald-50
                                                        hover:text-emerald-600
                                                        transition
                                                    "
                                                    title="Edit Daily Post"
                                                >
                                                    <PencilSquareIcon className="w-5 h-5" />
                                                </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            togglePost(post)
                                                        }
                                                        className="
                                                            p-2
                                                            rounded-lg
                                                            text-slate-500
                                                            hover:bg-amber-50
                                                            hover:text-amber-600
                                                            transition
                                                        "
                                                        title={
                                                            post.is_active
                                                                ? "Deactivate"
                                                                : "Activate"
                                                        }
                                                    >
                                                        <PowerIcon className="w-5 h-5" />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deletePost(post)
                                                        }
                                                        className="
                                                            p-2
                                                            rounded-lg
                                                            text-slate-500
                                                            hover:bg-red-50
                                                            hover:text-red-600
                                                            transition
                                                        "
                                                        title="Delete"
                                                    >
                                                        <TrashIcon className="w-5 h-5" />
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="px-6 py-16 text-center"
                                        >

                                            <div className="flex flex-col items-center">

                                                <div className="
                                                    w-16
                                                    h-16
                                                    rounded-2xl
                                                    bg-emerald-50
                                                    text-emerald-600
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-xl
                                                    font-bold
                                                ">
                                                    DP
                                                </div>

                                                <h3 className="mt-4 text-lg font-bold text-slate-900">
                                                    No Daily Posts Yet
                                                </h3>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    Anza kwa kuongeza post yako ya kwanza.
                                                </p>

                                                <Link
                                                    href={route(
                                                        "admin.daily-posts.create"
                                                    )}
                                                    className="
                                                        mt-5
                                                        inline-flex
                                                        items-center
                                                        gap-2
                                                        px-5
                                                        py-3
                                                        rounded-xl
                                                        bg-emerald-600
                                                        text-white
                                                        font-bold
                                                        hover:bg-emerald-700
                                                    "
                                                >
                                                    <PlusIcon className="w-5 h-5" />
                                                    Add Daily Post
                                                </Link>

                                            </div>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* Pagination */}
                    {posts.links && posts.links.length > 3 && (
                        <div className="
                            px-5
                            py-4
                            border-t
                            border-slate-200
                            flex
                            flex-wrap
                            gap-2
                        ">

                            {posts.links.map((link, index) => (

                                <button
                                    key={index}
                                    disabled={!link.url}
                                    onClick={() =>
                                        link.url &&
                                        router.get(link.url)
                                    }
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    className={`
                                        px-3
                                        py-2
                                        rounded-lg
                                        text-sm
                                        font-semibold
                                        ${
                                            link.active
                                                ? "bg-emerald-600 text-white"
                                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                        }
                                        ${
                                            !link.url
                                                ? "opacity-40 cursor-not-allowed"
                                                : ""
                                        }
                                    `}
                                />

                            ))}

                        </div>
                    )}

                </div>

            </div>

        </AdminLayout>
    );
}