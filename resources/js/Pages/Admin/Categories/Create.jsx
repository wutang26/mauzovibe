import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";
import {
    ArrowLeftIcon,
    FolderPlusIcon
} from "@heroicons/react/24/outline";


export default function Create() {


    const {
        data,
        setData,
        post,
        processing,
        errors

    } = useForm({

        name: "",
        description: ""

    });





    function submit(e) {

        e.preventDefault();


        post(
            route("admin.categories.store")
        );

    }





    return (

        <AdminLayout>


            <div className="p-6">



                {/* Header */}

                <div className="
        flex
        items-center
        justify-between
        mb-8
    ">


                    <div>


                        <h1 className="
                text-3xl
                font-bold
                text-gray-800
            ">

                            Create Category

                        </h1>


                        <p className="
                text-gray-500
                mt-1
            ">

                            Add a new inventory category

                        </p>


                    </div>




                    <Link

                        href={route("admin.categories.index")}

                        className="
                flex
                items-center
                gap-2
                px-4
                py-2
                border
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







                {/* Form Card */}


                <div className="
        bg-white
        rounded-2xl
        shadow-sm
        p-8
        max-w-2xl
    ">


                    <div className="
            flex
            items-center
            gap-3
            mb-6
        ">


                        <div className="
                bg-blue-100
                p-3
                rounded-xl
            ">


                            <FolderPlusIcon

                                className="
                    w-7
                    h-7
                    text-blue-600
                    "

                            />


                        </div>


                        <h2 className="
                text-xl
                font-bold
            ">

                            Category Information

                        </h2>


                    </div>






                    <form
                        onSubmit={submit}
                        className="
            space-y-6
            "
                    >





                        {/* Name */}


                        <div>


                            <label className="
                    block
                    font-semibold
                    mb-2
                ">

                                Category Name

                            </label>



                            <input

                                type="text"

                                value={data.name}

                                onChange={
                                    e =>
                                        setData(
                                            "name",
                                            e.target.value
                                        )
                                }


                                placeholder="Example: Drinks"

                                className="
                    w-full
                    rounded-xl
                    border
                    p-3
                    focus:ring-2
                    focus:ring-blue-500
                    "

                            />



                            {
                                errors.name &&

                                <p className="
                        text-red-600
                        text-sm
                        mt-2
                    ">

                                    {errors.name}

                                </p>

                            }


                        </div>








                        {/* Description */}



                        <div>


                            <label className="
                    block
                    font-semibold
                    mb-2
                ">

                                Description

                            </label>




                            <textarea


                                value={data.description}


                                onChange={
                                    e =>
                                        setData(
                                            "description",
                                            e.target.value
                                        )
                                }


                                placeholder="Describe this category"


                                rows="4"


                                className="
                    w-full
                    rounded-xl
                    border
                    p-3
                    focus:ring-2
                    focus:ring-blue-500
                    "

                            />



                            {
                                errors.description &&

                                <p className="
                    text-red-600
                    text-sm
                    mt-2
                    ">

                                    {errors.description}

                                </p>

                            }


                        </div>








                        {/* Submit */}



                        <button


                            disabled={processing}


                            className="
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-semibold
                    shadow
                    transition
                "


                        >

                            {
                                processing
                                    ?
                                    "Saving..."
                                    :
                                    "Save Category"
                            }


                        </button>




                    </form>



                </div>





            </div>


        </AdminLayout>

    );


}