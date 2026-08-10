import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";

import {
    PlusIcon,
    EyeIcon,
    TrashIcon
} from "@heroicons/react/24/outline";


export default function Index({ stocks }) {


    const deleteStock = (id) => {

        if (confirm("Are you sure you want to delete this stock out?")) {

            router.delete(
                route(
                    "admin.stockout.destroy",
                    id
                )
            );

        }

    };



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
                            Stock Out
                        </h1>


                        <p className="text-gray-500">
                            Manage outgoing stock
                        </p>


                    </div>


                    <Link
                        href={route("admin.stockout.create")}
                        className="
relative
z-50
flex
items-center
gap-2
bg-red-600
text-white
px-5
py-3
rounded-xl
"
                    >
                        <PlusIcon className="w-5 h-5" />

                        Remove Stock

                    </Link>


                </div>





                <div className="
bg-white
rounded-2xl
shadow
overflow-hidden
">


                    <table className="w-full">


                        <thead>

                            <tr className="
bg-gray-50
text-gray-600
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
                                    User
                                </th>


                                <th className="p-4 text-left">
                                    Date
                                </th>


                                <th className="p-4 text-left">
                                    Action
                                </th>


                            </tr>

                        </thead>




                        <tbody>


                            {
                                stocks.data.map(stock => (


                                    <tr
                                        key={stock.id}
                                        className="border-t"
                                    >


                                        <td className="p-4 font-semibold">

                                            {
                                                stock.product?.name
                                            }

                                        </td>




                                        <td className="p-4">

                                            <span className="
bg-red-100
text-red-700
px-3
py-1
rounded-full
font-bold
">

                                                -{stock.quantity}

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
flex
gap-2
">


                                            <Link

                                                href={
                                                    route(
                                                        "admin.stockout.show",
                                                        stock.id
                                                    )
                                                }

                                                className="
bg-blue-100
text-blue-700
p-2
rounded-lg
"

                                            >

                                                <EyeIcon className="w-5 h-5" />

                                            </Link>




                                            <button

                                                onClick={() =>
                                                    deleteStock(stock.id)
                                                }

                                                className="
bg-red-100
text-red-700
p-2
rounded-lg
"

                                            >

                                                <TrashIcon className="w-5 h-5" />


                                            </button>


                                        </td>


                                    </tr>


                                ))

                            }



                        </tbody>


                    </table>



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

px-3
py-2
border
rounded-lg

${link.active
                                            ?
                                            "bg-red-600 text-white"
                                            :
                                            "bg-white"
                                        }

`}

                                >

                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: link.label
                                        }}
                                    />


                                </Link>


                            ))
                    }



                </div>



            </div>


        </AdminLayout>

    );


}