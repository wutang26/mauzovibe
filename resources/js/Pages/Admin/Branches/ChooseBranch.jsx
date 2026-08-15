import { Head, router } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

export default function ChooseBranch({ branches }) {

    const selectBranch = (id) => {
        router.post("/choose-branch", {
            branch_id: id,
        });
    };


    return (
        <>
            <Head title="Chagua Tawi | MauzoVibe" />

            <AuthLayout
                
            >
                {/* title="Chagua Tawi 🏪"
                subtitle="Chagua tawi unalotaka kutumia kuendelea na MauzoVibe." */}

                <div className="w-full max-w-3xl mx-auto">

                    {/* =====================================================
                        MAIN CARD
                    ====================================================== */}
                    <div className="bg-white rounded-3xl shadow-2xl shadow-slate-900/10 border border-slate-100 p-6 sm:p-8">

                        {/* HEADER */}
                        <div className="text-center mb-8">

                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 shadow-sm mb-5">

                                <svg
                                    className="w-8 h-8 text-emerald-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M12 9h.01M15 9h.01"
                                    />
                                </svg>

                            </div>


                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                                Chagua Tawi
                            </h2>


                            <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
                                Una akaunti yenye matawi zaidi ya moja.
                                Chagua tawi unalotaka kulisimamia sasa.
                            </p>

                        </div>


                        {/* =====================================================
                            BRANCHES
                        ====================================================== */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {branches.map((branch) => (

                                <button
                                    key={branch.id}
                                    type="button"
                                    onClick={() =>
                                        selectBranch(branch.id)
                                    }
                                    className="
                                        group
                                        text-left
                                        w-full
                                        p-5
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        bg-slate-50
                                        hover:bg-emerald-50
                                        hover:border-emerald-300
                                        hover:shadow-lg
                                        hover:shadow-emerald-600/10
                                        transition-all
                                        duration-200
                                        focus:outline-none
                                        focus:ring-4
                                        focus:ring-emerald-500/10
                                    "
                                >

                                    <div className="flex items-start justify-between gap-4">

                                        {/* ICON */}
                                        <div
                                            className="
                                                flex
                                                items-center
                                                justify-center
                                                w-12
                                                h-12
                                                rounded-xl
                                                bg-white
                                                border
                                                border-slate-200
                                                text-emerald-600
                                                shadow-sm
                                                group-hover:bg-emerald-600
                                                group-hover:text-white
                                                group-hover:border-emerald-600
                                                transition-all
                                            "
                                        >

                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M12 9h.01M15 9h.01"
                                                />
                                            </svg>

                                        </div>


                                        {/* ARROW */}
                                        <div
                                            className="
                                                flex
                                                items-center
                                                justify-center
                                                w-8
                                                h-8
                                                rounded-full
                                                bg-white
                                                border
                                                border-slate-200
                                                text-slate-400
                                                group-hover:text-emerald-600
                                                group-hover:border-emerald-200
                                                transition-all
                                            "
                                        >

                                            <svg
                                                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>

                                        </div>

                                    </div>


                                    {/* BRANCH INFO */}
                                    <div className="mt-5">

                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition">
                                            {branch.name}
                                        </h3>


                                        {branch.location && (
                                            <div className="flex items-center gap-2 mt-2">

                                                <svg
                                                    className="w-4 h-4 text-slate-400 group-hover:text-emerald-500"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"
                                                    />

                                                    <circle
                                                        cx="12"
                                                        cy="9"
                                                        r="2.5"
                                                    />
                                                </svg>


                                                <span className="text-sm text-slate-500">
                                                    {branch.location}
                                                </span>

                                            </div>
                                        )}

                                    </div>


                                    {/* OPEN BRANCH */}
                                    <div className="mt-5 pt-4 border-t border-slate-200 group-hover:border-emerald-100">

                                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 group-hover:text-emerald-700">

                                            Fungua Tawi

                                            <svg
                                                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 12h14M13 6l6 6-6 6"
                                                />
                                            </svg>

                                        </span>

                                    </div>

                                </button>

                            ))}

                        </div>


                        {/* EMPTY STATE */}
                        {branches.length === 0 && (

                            <div className="text-center py-10">

                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 mb-4">

                                    <svg
                                        className="w-7 h-7"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 21h18M5 21V7l7-4 7 4v14"
                                        />
                                    </svg>

                                </div>


                                <h3 className="text-lg font-bold text-slate-800">
                                    Hakuna matawi yaliyopatikana
                                </h3>


                                <p className="mt-1 text-sm text-slate-500">
                                    Wasiliana na administrator ili kuongeza
                                    tawi kwenye biashara yako.
                                </p>

                            </div>

                        )}

                    </div>

                </div>

            </AuthLayout>
        </>
    );
}