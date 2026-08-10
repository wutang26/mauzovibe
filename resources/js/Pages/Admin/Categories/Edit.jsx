import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";
import {
    ArrowLeftIcon
} from "@heroicons/react/24/outline";


export default function Edit({ category }) {


    const {
        data,
        setData,
        put,
        processing,
        errors

    } = useForm({

        name: category.name,

        description: category.description ?? ""

    });



    function submit(e) {

        e.preventDefault();


        put(
            route(
                "admin.categories.update",
                category.id
            )
        );


    }




    return (

        <AdminLayout>


            <div className="p-6">


                <div className="flex justify-between mb-8">


                    <h1 className="
text-3xl
font-bold
">

                        Edit Category

                    </h1>


                    <Link

                        href={route("admin.categories.index")}

                        className="
flex
items-center
gap-2
border
px-4
py-2
rounded-xl
"

                    >

                        <ArrowLeftIcon className="w-5 h-5" />

                        Back

                    </Link>


                </div>





                <div className="
bg-white
rounded-2xl
shadow
p-8
max-w-xl
">


                    <form
                        onSubmit={submit}
                        className="space-y-5"
                    >



                        <div>

                            <label className="font-semibold">

                                Category Name

                            </label>


                            <input

                                className="
w-full
border
rounded-xl
p-3
mt-2
"

                                value={data.name}

                                onChange={
                                    e => setData(
                                        "name",
                                        e.target.value
                                    )
                                }

                            />


                            {
                                errors.name &&
                                <p className="text-red-500 text-sm">
                                    {errors.name}
                                </p>
                            }


                        </div>





                        <div>


                            <label className="font-semibold">

                                Description

                            </label>


                            <textarea

                                rows="4"

                                className="
w-full
border
rounded-xl
p-3
mt-2
"


                                value={data.description}

                                onChange={
                                    e => setData(
                                        "description",
                                        e.target.value
                                    )
                                }


                            />



                        </div>






                        <button

                            disabled={processing}

                            className="
bg-blue-600
text-white
px-6
py-3
rounded-xl
"

                        >

                            {
                                processing
                                    ?
                                    "Updating..."
                                    :
                                    "Update Category"
                            }


                        </button>


                    </form>



                </div>


            </div>


        </AdminLayout>


    )

}