{/* ============================
    Assign Branch
============================ */}

<div className="bg-white rounded-xl shadow-md p-6 mt-6">

    <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Assign Branch
    </h2>

    <p className="text-gray-500 mb-6">
        Select the branch where this user will work.
    </p>

    <form
        onSubmit={(e) => {
            e.preventDefault();
            branchForm.post(route("admin.users.branch", user.id));
        }}
    >

        <div className="space-y-3">

            {branches.map((branch) => (

                <label
                    key={branch.id}
                    className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                        branchForm.data.branch_id == branch.id
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:bg-gray-50"
                    }`}
                >

                    <div className="flex items-center gap-3">

                        <input
                            type="radio"
                            name="branch_id"
                            value={branch.id}
                            checked={branchForm.data.branch_id == branch.id}
                            onChange={() =>
                                branchForm.setData("branch_id", branch.id)
                            }
                            className="w-5 h-5 text-blue-600"
                        />

                        <div>

                            <h3 className="font-semibold text-gray-800">
                                {branch.name}
                            </h3>

                            <p className="text-sm text-gray-500">
                                {branch.location || "No location"}
                            </p>

                        </div>

                    </div>

                </label>

            ))}

        </div>

        <div className="mt-6">

            <button
                type="submit"
                disabled={branchForm.processing}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition"
            >
                {branchForm.processing
                    ? "Saving..."
                    : "Save Branch"}
            </button>

        </div>

    </form>

</div>