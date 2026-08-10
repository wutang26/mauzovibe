import { useForm } from "@inertiajs/react";

export default function ChooseBranch({ branches }) {

    const form = useForm({

        branch_id: ""

    });

    function submit(e){

        e.preventDefault();

        form.post(route("branches.select"));

    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={submit}
                className="bg-white shadow-xl rounded-xl p-8 w-96"
            >

                <h1 className="text-2xl font-bold mb-6">

                    Select Branch

                </h1>

                <select
                    className="w-full border rounded-lg p-3 mb-5"
                    value={form.data.branch_id}
                    onChange={(e)=>
                        form.setData(
                            "branch_id",
                            e.target.value
                        )
                    }
                >

                    <option value="">

                        Choose Branch

                    </option>

                    {branches.map(branch => (

                        <option
                            key={branch.id}
                            value={branch.id}
                        >

                            {branch.name}

                        </option>

                    ))}

                </select>

                <button
                    className="w-full bg-blue-600 text-white py-3 rounded-lg"
                >

                    Continue

                </button>

            </form>

        </div>

    );

}