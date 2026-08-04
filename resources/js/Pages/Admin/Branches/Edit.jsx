import { useForm, Link } from "@inertiajs/react";

import {
    BuildingStorefrontIcon,
    ArrowLeftIcon
} from "@heroicons/react/24/outline";


export default function Edit({ branch }) {


    const form = useForm({

        name: branch.name || "",
        location: branch.location || "",
        description: branch.description || ""

    });



    function submit(e) {

        e.preventDefault();

        form.put(
            route(
                "admin.branches.update",
                branch.id
            )
        );

    }




    return (

        <div className="
            p-6
            bg-gray-50
            min-h-screen
        ">


            {/* Page Header */}

            <div className="
                max-w-3xl
                mx-auto
                mb-6
                flex
                justify-between
                items-center
            ">


                <div className="
                    flex
                    items-center
                    gap-4
                ">


                    <div className="
                        w-14
                        h-14
                        rounded-2xl
                        bg-blue-100
                        flex
                        items-center
                        justify-center
                    ">

                        <BuildingStorefrontIcon
                            className="
                            w-8
                            h-8
                            text-blue-600
                            "
                        />

                    </div>



                    <div>

                        <h1 className="
                            text-3xl
                            font-bold
                            text-gray-800
                        ">
                            Manage Branch
                        </h1>


                        <p className="
                            text-gray-500
                        ">
                            Update branch information
                        </p>


                    </div>


                </div>





                <Link

                    href={route("admin.branches.index")}

                    className="
                    flex
                    items-center
                    gap-2
                    bg-white
                    border
                    px-4
                    py-2
                    rounded-xl
                    hover:bg-gray-100
                    "

                >

                    <ArrowLeftIcon
                        className="
                        w-5
                        h-5
                        "
                    />

                    Back

                </Link>



            </div>







            {/* Form */}


            <div className="
                flex
                justify-center
            ">



                <div className="
                    bg-white
                    rounded-2xl
                    shadow-sm
                    border
                    p-8
                    w-full
                    max-w-3xl
                ">



                    <form

                        onSubmit={submit}

                        className="
                        space-y-6
                        "

                    >





                        {/* Name + Location */}


                        <div className="
                            grid
                            md:grid-cols-2
                            gap-6
                        ">



                            {/* Branch Name */}


                            <div>


                                <label className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                    mb-2
                                ">

                                    Branch Name

                                </label>



                                <input

                                    type="text"

                                    className="
                                    w-full
                                    border
                                    rounded-xl
                                    p-3
                                    focus:ring-2
                                    focus:ring-blue-500
                                    focus:outline-none
                                    "

                                    placeholder="Enter branch name"

                                    value={form.data.name}

                                    onChange={(e)=>
                                        form.setData(
                                            "name",
                                            e.target.value
                                        )
                                    }

                                />



                                {
                                    form.errors.name &&

                                    <p className="
                                        text-red-500
                                        text-sm
                                        mt-1
                                    ">

                                        {form.errors.name}

                                    </p>

                                }


                            </div>









                            {/* Location */}


                            <div>


                                <label className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                    mb-2
                                ">

                                    Location

                                </label>



                                <input

                                    type="text"

                                    className="
                                    w-full
                                    border
                                    rounded-xl
                                    p-3
                                    focus:ring-2
                                    focus:ring-blue-500
                                    focus:outline-none
                                    "

                                    placeholder="Example: Tabora Town"

                                    value={form.data.location}

                                    onChange={(e)=>
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
                                block
                                text-sm
                                font-semibold
                                text-gray-700
                                mb-2
                            ">

                                Description

                            </label>



                            <textarea

                                rows="5"

                                className="
                                w-full
                                border
                                rounded-xl
                                p-3
                                focus:ring-2
                                focus:ring-blue-500
                                focus:outline-none
                                "

                                placeholder="Describe this branch..."

                                value={form.data.description}

                                onChange={(e)=>
                                    form.setData(
                                        "description",
                                        e.target.value
                                    )
                                }

                            />


                        </div>









                        {/* Buttons */}



                        <div className="
                            flex
                            justify-center
                            gap-4
                            pt-4
                        ">



                            <button

                                type="submit"

                                disabled={form.processing}

                                className="
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                px-8
                                py-3
                                rounded-xl
                                font-semibold
                                shadow
                                transition
                                "

                            >

                                {
                                    form.processing
                                    ?
                                    "Updating..."
                                    :
                                    "Update Branch"
                                }


                            </button>







                            <Link

                                href={route("admin.branches.index")}

                                className="
                                bg-gray-600
                                hover:bg-gray-700
                                text-white
                                px-8
                                py-3
                                rounded-xl
                                font-semibold
                                transition
                                "

                            >

                                Cancel

                            </Link>




                        </div>





                    </form>



                </div>



            </div>



        </div>


    );


}