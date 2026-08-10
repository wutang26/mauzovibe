
import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";

export default function RegisterBranch() {

    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        name: "",
        location: "",
    });


    const submit = (e) => {

        e.preventDefault();

        post(
            route("branches.register.store")
        );
    };


    return (
        <>
            <Head title="Register Another Branch" />

            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">

                <div className="w-full max-w-lg">

                    {/* Header */}

                    <div className="text-center mb-8">

                        <div className="
                            inline-flex
                            items-center
                            justify-center
                            w-16
                            h-16
                            rounded-2xl
                            bg-emerald-600
                            shadow-lg
                            shadow-emerald-600/20
                            mb-4
                        ">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M12 9h.01M15 9h.01"
                                />
                            </svg>

                        </div>


                        <h1 className="
                            text-3xl
                            font-bold
                            tracking-tight
                            text-slate-900
                        ">
                            Ongeza Branch
                        </h1>


                        <p className="
                            mt-2
                            text-sm
                            text-slate-500
                        ">
                            Sajili branch nyingine ya biashara yako
                        </p>

                    </div>


                    {/* Card */}

                    <div className="
                        bg-white
                        rounded-3xl
                        shadow-xl
                        shadow-slate-200/70
                        border
                        border-slate-100
                        p-6
                        sm:p-8
                    ">


                        {/* Information */}

                        <div className="
                            mb-6
                            rounded-xl
                            bg-emerald-50
                            border
                            border-emerald-100
                            p-4
                        ">

                            <div className="flex gap-3">

                                <div className="
                                    text-emerald-600
                                    text-xl
                                ">
                                    ℹ️
                                </div>

                                <div>

                                    <p className="
                                        font-semibold
                                        text-emerald-800
                                    ">
                                        Ongeza Branch Mpya
                                    </p>

                                    <p className="
                                        mt-1
                                        text-sm
                                        text-emerald-700
                                    ">
                                        Branch hii itaunganishwa
                                        moja kwa moja na akaunti yako.
                                    </p>

                                </div>

                            </div>

                        </div>


                        <form
                            onSubmit={submit}
                            className="space-y-5"
                        >


                            {/* Branch Name */}

                            <div>

                                <label
                                    htmlFor="name"
                                    className="
                                        block
                                        text-sm
                                        font-semibold
                                        text-slate-700
                                        mb-2
                                    "
                                >
                                    Jina la Branch
                                </label>


                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    placeholder="Mfano: Kariakoo Branch"
                                    onChange={(e) =>
                                        setData(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    required
                                    autoFocus
                                    className={`
                                        w-full
                                        h-12
                                        px-4
                                        rounded-xl
                                        border
                                        ${
                                            errors.name
                                                ? "border-red-400 focus:border-red-500"
                                                : "border-slate-200 focus:border-emerald-500"
                                        }
                                        bg-slate-50
                                        text-slate-900
                                        placeholder-slate-400
                                        outline-none
                                        focus:ring-4
                                        focus:ring-emerald-500/10
                                        transition-all
                                    `}
                                />


                                {errors.name && (

                                    <p className="
                                        mt-2
                                        text-sm
                                        text-red-600
                                    ">
                                        {errors.name}
                                    </p>

                                )}

                            </div>


                            {/* Location */}

                            <div>

                                <label
                                    htmlFor="location"
                                    className="
                                        block
                                        text-sm
                                        font-semibold
                                        text-slate-700
                                        mb-2
                                    "
                                >
                                    Mahali pa Branch

                                    <span className="
                                        ml-1
                                        text-slate-400
                                        font-normal
                                    ">
                                        (Hiari)
                                    </span>

                                </label>


                                <input
                                    id="location"
                                    type="text"
                                    value={data.location}
                                    placeholder="Mfano: Kariakoo, Dar es Salaam"
                                    onChange={(e) =>
                                        setData(
                                            "location",
                                            e.target.value
                                        )
                                    }
                                    className={`
                                        w-full
                                        h-12
                                        px-4
                                        rounded-xl
                                        border
                                        ${
                                            errors.location
                                                ? "border-red-400 focus:border-red-500"
                                                : "border-slate-200 focus:border-emerald-500"
                                        }
                                        bg-slate-50
                                        text-slate-900
                                        placeholder-slate-400
                                        outline-none
                                        focus:ring-4
                                        focus:ring-emerald-500/10
                                        transition-all
                                    `}
                                />


                                {errors.location && (

                                    <p className="
                                        mt-2
                                        text-sm
                                        text-red-600
                                    ">
                                        {errors.location}
                                    </p>

                                )}

                            </div>


                            {/* Buttons */}

                            <div className="
                                flex
                                flex-col-reverse
                                sm:flex-row
                                gap-3
                                pt-2
                            ">


                                <Link
                                    href={route("dashboard")}
                                    className="
                                        w-full
                                        h-12
                                        rounded-xl
                                        border
                                        border-slate-200
                                        bg-white
                                        hover:bg-slate-50
                                        text-slate-700
                                        font-semibold
                                        flex
                                        items-center
                                        justify-center
                                        transition
                                    "
                                >
                                    Cancel
                                </Link>


                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="
                                        w-full
                                        h-12
                                        rounded-xl
                                        bg-emerald-600
                                        hover:bg-emerald-700
                                        active:bg-emerald-800
                                        text-white
                                        font-semibold
                                        shadow-lg
                                        shadow-emerald-600/20
                                        transition-all
                                        duration-200
                                        disabled:opacity-60
                                        disabled:cursor-not-allowed
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                    "
                                >

                                    {processing ? (

                                        <>
                                            <svg
                                                className="animate-spin h-5 w-5"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />

                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                />

                                            </svg>

                                            Inahifadhi...

                                        </>

                                    ) : (

                                        <>
                                            Ongeza Branch

                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 4v16m8-8H4"
                                                />
                                            </svg>

                                        </>

                                    )}

                                </button>

                            </div>

                        </form>

                    </div>


                    {/* Footer */}

                    <div className="
                        text-center
                        mt-6
                    ">

                        <p className="
                            text-xs
                            text-slate-400
                        ">
                            MauzoVibe — Smart business management made simple.
                        </p>

                    </div>

                </div>

            </div>
        </>
    );
}

