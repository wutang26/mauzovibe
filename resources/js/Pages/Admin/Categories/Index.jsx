import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";

import {
    PlusIcon,
    MagnifyingGlassIcon,
    FolderIcon,
    PencilSquareIcon,
    TrashIcon
} from "@heroicons/react/24/outline";



export default function Index({ categories }) {



    function deleteCategory(id) {

        if (confirm("Are you sure you want to delete this category?")) {

            router.delete(
                route(
                    "admin.categories.destroy",
                    id
                )
            );

        }

    }





    return (


        <AdminLayout>


            <div className="p-6">



                {/* Header */}
                <div className="
                    flex
                    flex-col
                    md:flex-row
                    md:justify-between
                    md:items-center
                    gap-4
                    mb-8
                    ">

                    <div>

                        <h1 className="
text-3xl
font-bold
text-gray-800
">

                            Product Categories

                        </h1>


                        <p className="
text-gray-500
mt-1
">

                            Manage your inventory categories

                        </p>


                    </div>





                    <Link

                        href={route("admin.categories.create")}

                        className="
flex
items-center
gap-2
bg-blue-600
hover:bg-blue-700
text-white
px-5
py-3
rounded-xl
shadow
transition
"

                    >

                        <PlusIcon className="w-5 h-5" />

                        Add Category


                    </Link>



                </div>







                {/* Summary */}


                <div className="
                grid
                grid-cols-1
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-6
                mb-8
                ">


                    <div className="
                    bg-white
                    rounded-2xl
                    shadow-sm
                    p-6
                    flex
                    items-center
                    gap-4
                    ">


                        <div className="
                        bg-blue-100
                        p-3
                        rounded-xl
                        ">

                            <FolderIcon
                                className="
                                w-8
                                h-8
                                text-blue-600
                                "
                            />


                        </div>



                        <div>

                            <p className="
                                text-gray-500
                                text-sm
                                ">

                                Total Categories

                            </p>


                            <h2 className="
                                text-2xl
                                font-bold
                                ">

                                {categories.total}

                            </h2>


                        </div>



                    </div>


                </div>


                {/* Table */}

                {/* Categories List */}

                <div className="
                bg-white
                rounded-2xl
                shadow-sm
                overflow-hidden
                ">


                    {/* Desktop Table */}

                    <div className="hidden md:block overflow-x-auto">


                        <table className="w-full">


                            <thead>

                                <tr className="
                                bg-gray-50
                                text-gray-600
                                text-sm
                                ">

                                    <th className="p-4 text-left">
                                        Category
                                    </th>


                                    <th className="p-4 text-left">
                                        Description
                                    </th>


                                    <th className="p-4 text-left">
                                        Status
                                    </th>


                                    <th className="p-4 text-left">
                                        Action
                                    </th>


                                </tr>

                            </thead>



                            <tbody>


                                {
                                    categories.data.length > 0 ?

                                        categories.data.map(category => (

                                            <tr
                                                key={category.id}
                                                className="
                                                border-t
                                                hover:bg-gray-50
                                                transition
                                                ">


                                                <td className="p-4">


                                                    <div className="
                                                        flex
                                                        items-center
                                                        gap-3
                                                        ">


                                                        <div className="
                                                                bg-blue-100
                                                                p-2
                                                                rounded-lg
                                                                ">

                                                            <FolderIcon
                                                                className="
                                                                w-5
                                                                h-5
                                                                text-blue-600
                                                                "
                                                            />

                                                        </div>


                                                        <span className="
                                                                font-semibold
                                                                ">

                                                            {category.name}

                                                        </span>


                                                    </div>


                                                </td>




                                                <td className="
                                                p-4
                                                text-gray-600
                                                ">

                                                    {category.description ?? "No description"}

                                                </td>





                                                <td className="p-4">

                                                    <span className="
                                                    bg-green-100
                                                    text-green-700
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    text-sm
                                                    font-semibold
                                                    ">

                                                        Active

                                                    </span>

                                                </td>





                                                <td className="p-4">


                                                    <div className="flex gap-2">


                                                        <Link

                                                            href={route(
                                                                "admin.categories.edit",
                                                                category.id
                                                            )}

                                                            className="
                                                            p-2
                                                            rounded-lg
                                                            hover:bg-blue-100
                                                            "
                                                        >


                                                            <PencilSquareIcon
                                                                className="
                                                                w-5
                                                                h-5
                                                                text-blue-600
                                                                "
                                                            />


                                                        </Link>




                                                        <button

                                                            onClick={() =>
                                                                deleteCategory(category.id)
                                                            }

                                                            className="
                                                        p-2
                                                        rounded-lg
                                                        hover:bg-red-100
                                                        "

                                                        >


                                                            <TrashIcon

                                                                className="
w-5
h-5
text-red-600
"

                                                            />


                                                        </button>


                                                    </div>


                                                </td>


                                            </tr>


                                        ))


                                        :


                                        <tr>

                                            <td
                                                colSpan="4"
                                                className="
text-center
p-10
text-gray-500
">

                                                No categories found

                                            </td>


                                        </tr>


                                }


                            </tbody>


                        </table>


                    </div>







                    {/* Mobile Cards */}

                    <div className="
md:hidden
p-4
space-y-4
">


                        {

                            categories.data.length > 0 ?

                                categories.data.map(category => (


                                    <div

                                        key={category.id}

                                        className="
border
rounded-2xl
p-4
shadow-sm
"


                                    >


                                        <div className="
flex
items-center
justify-between
mb-3
">


                                            <div className="
flex
items-center
gap-3
">


                                                <div className="
bg-blue-100
p-2
rounded-lg
">


                                                    <FolderIcon

                                                        className="
w-5
h-5
text-blue-600
"

                                                    />


                                                </div>


                                                <div>


                                                    <h3 className="
font-bold
text-gray-800
">

                                                        {category.name}

                                                    </h3>


                                                    <p className="
text-sm
text-gray-500
">

                                                        Category

                                                    </p>


                                                </div>


                                            </div>




                                            <span className="
bg-green-100
text-green-700
px-3
py-1
rounded-full
text-xs
font-semibold
">

                                                Active

                                            </span>


                                        </div>





                                        <p className="
text-gray-600
text-sm
mb-4
">

                                            {category.description ?? "No description"}

                                        </p>





                                        <div className="
flex
justify-end
gap-3
">


                                            <Link

                                                href={route(
                                                    "admin.categories.edit",
                                                    category.id
                                                )}

                                                className="
bg-blue-50
p-2
rounded-lg
"

                                            >


                                                <PencilSquareIcon

                                                    className="
w-5
h-5
text-blue-600
"

                                                />


                                            </Link>





                                            <button

                                                onClick={() =>
                                                    deleteCategory(category.id)
                                                }

                                                className="
bg-red-50
p-2
rounded-lg
"

                                            >


                                                <TrashIcon

                                                    className="
w-5
h-5
text-red-600
"

                                                />


                                            </button>



                                        </div>



                                    </div>


                                ))


                                :

                                <div className="
text-center
p-10
text-gray-500
">

                                    No categories found

                                </div>


                        }


                    </div>



                </div>


            </div>


        </AdminLayout>


    );


}