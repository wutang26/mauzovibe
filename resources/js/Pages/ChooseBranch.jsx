import React from "react";
import { Head, router } from "@inertiajs/react";

export default function ChooseBranch({ branches = [] }) {

    const selectBranch = (branchId) => {
        router.post(
            route("choose.branch.store"),
            {
                branch_id: branchId,
            },
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <>
            <Head title="Choose Branch" />

            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">

                    <h1 className="text-2xl font-bold text-gray-900">
                        Choose Branch
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Select the branch you want to work with.
                    </p>

                    <div className="mt-6 space-y-3">
                        {branches.map((branch) => (
                            <button
                                key={branch.id}
                                type="button"
                                onClick={() => selectBranch(branch.id)}
                                className="w-full rounded-xl border border-gray-200 p-4 text-left transition hover:bg-green-50 hover:border-green-400"
                            >
                                <div className="font-semibold text-gray-900">
                                    {branch.name}
                                </div>

                                {branch.location && (
                                    <div className="mt-1 text-sm text-gray-500">
                                        {branch.location}
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    {branches.length === 0 && (
                        <div className="mt-6 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-700">
                            No branches available.
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}