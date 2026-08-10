import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";

import {
    PlusIcon,
    EyeIcon,
    PencilSquareIcon,
    TrashIcon
} from "@heroicons/react/24/outline";


export default function Index({ stocks }) {


    return (

        <AdminLayout>


            <div className="p-6">


                {/* Header */}

                <div className="
flex
justify-between
items-center
mb-8
">


                    <div>

                        <h1 className="
text-3xl
font-bold
text-gray-800
">
                            Stock In
                        </h1>


                        <p className="text-gray-500">
                            Manage incoming stock
                        </p>


                    </div>



                    <Link

                        href={route(
                            "admin.stockin.create"
                        )}

                        className="
flex
items-center
gap-2
bg-blue-600
text-white
px-5
py-3
rounded-xl
hover:bg-blue-700
"

                    >

                        <PlusIcon className="w-5 h-5" />

                        Add Stock

                    </Link>


                </div>






                {/* Table */}


                <div className="
bg-white
rounded-2xl
shadow
overflow-hidden
">


                    <div className="overflow-x-auto">


                        <table className="w-full">


                            <thead>


                                <tr className="
bg-gray-50
border-b
">


                                    <th className="p-4 text-left">
                                        Product
                                    </th>


                                    <th className="p-4 text-left">
                                        Quantity
                                    </th>


                                    <th className="p-4 text-left">
                                        Reference
                                    </th>


                                    <th className="p-4 text-left">
                                        Added By
                                    </th>


                                    <th className="p-4 text-left">
                                        Date
                                    </th>


                                    <th className="p-4 text-center">
                                        Actions
                                    </th>


                                </tr>


                            </thead>




                            <tbody>


                                {
                                    stocks.data.length > 0 ?

                                        stocks.data.map(stock => (


                                            <tr
                                                key={stock.id}
                                                className="
border-b
hover:bg-gray-50
"
                                            >


                                                <td className="p-4 font-semibold">


                                                    {
                                                        stock.product?.name ?? "Deleted Product"
                                                    }


                                                </td>



                                                <td className="p-4">


                                                    <span className="
bg-green-100
text-green-700
px-3
py-1
rounded-full
font-semibold
">

                                                        +
                                                        {stock.quantity}

                                                    </span>


                                                </td>




                                                <td className="p-4">


                                                    {
                                                        stock.reference ?? "-"
                                                    }


                                                </td>




                                                <td className="p-4">


                                                    {
                                                        stock.user?.name ?? "-"
                                                    }


                                                </td>




                                                <td className="p-4">


                                                    {
                                                        new Date(
                                                            stock.created_at
                                                        )
                                                            .toLocaleDateString()
                                                    }


                                                </td>





                                                <td className="
p-4
">


                                                    <div className="
flex
justify-center
gap-2
">


                                                        {/* View */}


                                                        <Link

                                                            href={route(
                                                                "admin.stockin.show",
                                                                stock.id
                                                            )}

                                                            className="
p-2
rounded-lg
bg-blue-100
text-blue-600
hover:bg-blue-200
"

                                                        >

                                                            <EyeIcon className="w-5 h-5" />

                                                        </Link>






                                                        {/* Edit */}


                                                        <Link

                                                            href={route(
                                                                "admin.stockin.edit",
                                                                stock.id
                                                            )}

                                                            className="
p-2
rounded-lg
bg-yellow-100
text-yellow-600
hover:bg-yellow-200
"

                                                        >

                                                            <PencilSquareIcon className="w-5 h-5" />

                                                        </Link>






                                                        {/* Delete */}


                                                        <Link

                                                            method="delete"

                                                            href={route(
                                                                "admin.stockin.destroy",
                                                                stock.id
                                                            )}

                                                            as="button"

                                                            onClick={(e) => {

                                                                if (!confirm(
                                                                    "Delete this stock record?"
                                                                )) {
                                                                    e.preventDefault();
                                                                }

                                                            }}

                                                            className="
p-2
rounded-lg
bg-red-100
text-red-600
"

                                                        >

                                                            <TrashIcon className="w-5 h-5" />

                                                        </Link>



                                                    </div>


                                                </td>



                                            </tr>


                                        ))

                                        :

                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="
text-center
p-6
text-gray-500
"
                                            >

                                                No Stock In records found

                                            </td>


                                        </tr>


                                }



                            </tbody>



                        </table>


                    </div>



                </div>







                {/* Pagination */}


                <div className="
mt-6
flex
justify-center
gap-2
flex-wrap
">


                    {
                        stocks.links.map(
                            (link, index) => (


                                <Link

                                    key={index}

                                    href={link.url ?? "#"}

                                    className={`

px-4
py-2
rounded-xl
border

${link.active
                                            ?
                                            "bg-blue-600 text-white"
                                            :
                                            "bg-white text-gray-700"

                                        }

`}

                                >


                                    <span

                                        dangerouslySetInnerHTML={{
                                            __html: link.label
                                        }}

                                    />


                                </Link>


                            )

                        )

                    }



                </div>






            </div>


        </AdminLayout>

    );


}