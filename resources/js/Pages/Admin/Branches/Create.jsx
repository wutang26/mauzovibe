import { useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

import {
    BuildingStorefrontIcon,
    MapPinIcon,
    DocumentTextIcon
} from "@heroicons/react/24/outline";


 function Create() {


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

        <div className="min-h-screen bg-gray-50 p-6">


            <div className="
                max-w-3xl
                mx-auto
            ">


                {/* Header */}

                <div className="mb-8">

                    <h1 className="
                        text-3xl
                        font-bold
                        text-gray-800
                    ">
                        Create New Branch
                    </h1>


                    <p className="
                        text-gray-500
                        mt-2
                    ">
                        Add a new store location to your MauzoVibe business.
                    </p>


                </div>




                {/* Card */}

                <div className="
                    bg-white
                    rounded-2xl
                    shadow-lg
                    border
                    border-gray-100
                    p-8
                ">



                    <form
                        onSubmit={submit}
                        className="space-y-6"
                    >


                        {/* Branch Name + Location */}

                        <div className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-6
                        ">


                            {/* Branch Name */}

                            <div>

                                <label className="
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                    mb-2
                                    block
                                ">
                                    Branch Name
                                </label>


                                <input

                                    className="
                                        w-full
                                        border
                                        rounded-xl
                                        p-3
                                        bg-gray-50
                                        outline-none
                                        focus:ring-2
                                        focus:ring-blue-500
                                        "

                                    placeholder="Example: Tabora Main"

                                    value={form.data.name}

                                    onChange={
                                        e =>
                                            form.setData(
                                                "name",
                                                e.target.value
                                            )
                                    }

                                />

                            </div>




                            {/* Location */}

                            <div>

                                <label className="
                                text-sm
                                font-semibold
                                text-gray-700
                                mb-2
                                block
                            ">
                                    Location
                                </label>


                                <input

                                    className="
                                    w-full
                                    border
                                    rounded-xl
                                    p-3
                                    bg-gray-50
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                    "

                                    placeholder="Example: Kariakoo Dar es Salaam"

                                    value={form.data.location}

                                    onChange={
                                        e =>
                                            form.setData(
                                                "location",
                                                e.target.value
                                            )
                                    }

                                />

                            </div>


                        </div>





                        {/* Description */}


                        <div>


                            <label className="
                            text-sm
                            font-semibold
                            text-gray-700
                            mb-2
                            block
                        ">
                                Description
                            </label>


                            <textarea

                                rows="4"

                                className="
                                w-full
                                border
                                rounded-xl
                                p-3
                                bg-gray-50
                                outline-none
                                focus:ring-2
                                focus:ring-blue-500
                                resize-none
                                "

                                placeholder="Describe this branch..."

                                value={form.data.description}

                                onChange={
                                    e =>
                                        form.setData(
                                            "description",
                                            e.target.value
                                        )
                                }

                            />


                        </div>





                        {/* Save Button */}


                        <button

                            disabled={form.processing}

                            className="
                            w-full
                            bg-gradient-to-r
                            from-blue-600
                            to-indigo-600
                            text-white
                            py-3
                            rounded-xl
                            font-semibold
                            shadow-md
                            hover:shadow-lg
                            transition
                            "

                        >

                            {
                                form.processing
                                    ? "Saving..."
                                    : "Save Branch"
                            }


                        </button>


                    </form>



                </div>


            </div>


        </div>

    );

}

// Extend a dashboard Page
Create.layout = page => (
    <AdminLayout>
        {page}
    </AdminLayout>
);


export default Create;