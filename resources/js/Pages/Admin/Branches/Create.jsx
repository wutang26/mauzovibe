import { useForm } from "@inertiajs/react";


export default function Create() {


    const form = useForm({

        name: "",
        location: "",
        description: ""

    });



    function submit(e) {

        e.preventDefault();

        form.post("/admin/branches");

    }



    return (

        <div className="p-6">


            <h1 className="text-3xl font-bold mb-6">
                Create Branch
            </h1>



            <form onSubmit={submit}
                className="space-y-4"
            >


                <input

                    className="border p-3 w-full"

                    placeholder="Branch Name"

                    value={form.data.name}

                    onChange={e => form.setData(
                        "name",
                        e.target.value
                    )}

                />



                <input

                    className="border p-3 w-full"

                    placeholder="Location"

                    value={form.data.location}

                    onChange={e => form.setData(
                        "location",
                        e.target.value
                    )}

                />



                <textarea

                    className="border p-3 w-full"

                    placeholder="Description"

                    value={form.data.description}

                    onChange={e => form.setData(
                        "description",
                        e.target.value
                    )}

                />



                <button

                    className="bg-blue-600 text-white px-5 py-2 rounded"

                >

                    Save Branch

                </button>



            </form>



        </div>

    );

}