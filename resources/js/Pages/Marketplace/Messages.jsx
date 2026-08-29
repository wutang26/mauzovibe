import { Head, Link } from "@inertiajs/react";
import MarketplaceLayout from "@/Layouts/MarketplaceLayout";

import {
    ChatBubbleLeftRightIcon,
    ArrowLeftIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function Messages({ conversations = [] }) {

    return (
        <MarketplaceLayout>
            <Head title="Ujumbe" />

            <div className="min-h-screen bg-slate-50 p-4 md:p-6">

                {/* HEADER */}
                <div className="mb-6 flex items-center gap-3">

                    <Link
                        href={route("marketplace.dashboard")}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-emerald-600"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                    </Link>

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                        <ChatBubbleLeftRightIcon className="h-6 w-6 text-emerald-600" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Ujumbe
                        </h1>

                        <p className="text-sm text-slate-500">
                            Wasiliana na wanunuzi wako.
                        </p>
                    </div>

                </div>

                {/* SEARCH */}
                <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                    <div className="relative">

                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                        <input
                            type="text"
                            placeholder="Tafuta mazungumzo..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                        />

                    </div>

                </div>

                {/* MESSAGES */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    {conversations.length > 0 ? (

                        <div className="divide-y divide-slate-100">

                            {conversations.map((conversation) => (

                                <Link
                                    key={conversation.id}
                                    href="#"
                                    className="flex items-center gap-4 p-5 transition hover:bg-slate-50"
                                >

                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                                        {conversation.user?.name
                                            ?.charAt(0)
                                            ?.toUpperCase() ?? "U"}
                                    </div>

                                    <div className="min-w-0 flex-1">

                                        <div className="flex items-center justify-between gap-3">

                                            <h3 className="truncate font-semibold text-slate-900">
                                                {conversation.user?.name ??
                                                    "Mnunuzi"}
                                            </h3>

                                            <span className="text-xs text-slate-400">
                                                {conversation.updated_at
                                                    ? new Date(
                                                          conversation.updated_at
                                                      ).toLocaleDateString(
                                                          "en-GB"
                                                      )
                                                    : ""}
                                            </span>

                                        </div>

                                        <p className="mt-1 truncate text-sm text-slate-500">
                                            {conversation.last_message ??
                                                "Hakuna ujumbe bado."}
                                        </p>

                                    </div>

                                    {conversation.unread_count > 0 && (
                                        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-emerald-600 px-2 text-xs font-bold text-white">
                                            {conversation.unread_count}
                                        </span>
                                    )}

                                </Link>

                            ))}

                        </div>

                    ) : (

                        <div className="flex flex-col items-center justify-center px-6 py-20 text-center">

                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                                <ChatBubbleLeftRightIcon className="h-8 w-8 text-slate-400" />
                            </div>

                            <h3 className="mt-4 text-lg font-bold text-slate-900">
                                Hakuna ujumbe
                            </h3>

                            <p className="mt-1 max-w-md text-sm text-slate-500">
                                Ujumbe kutoka kwa wanunuzi utaonekana hapa.
                            </p>

                        </div>

                    )}

                </div>

            </div>
        </MarketplaceLayout>
    );
}

