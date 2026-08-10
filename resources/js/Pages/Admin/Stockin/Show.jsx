import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";

import {
    ArrowLeftIcon,
    PencilIcon
} from "@heroicons/react/24/outline";


export default function Show({ stock }) {


return (

<AdminLayout>


<div className="p-6">


    {/* Header */}

    <div className="
        flex
        justify-between
        items-center
        mb-6
    ">


        <div>

            <h1 className="
                text-3xl
                font-bold
                text-gray-800
            ">
                Stock Details
            </h1>


            <p className="text-gray-500">
                View stock information
            </p>

        </div>



        <div className="
            flex
            gap-3
        ">


            <Link

                href={
                    route(
                        "admin.stockin.index"
                    )
                }

                className="
                    flex
                    items-center
                    gap-2
                    bg-gray-100
                    px-4
                    py-2
                    rounded-xl
                    hover:bg-gray-200
                "

            >

                <ArrowLeftIcon
                    className="w-5 h-5"
                />

                Back

            </Link>



            <Link

                href={
                    route(
                        "admin.stockin.edit",
                        stock.id
                    )
                }

                className="
                    flex
                    items-center
                    gap-2
                    bg-blue-600
                    text-white
                    px-4
                    py-2
                    rounded-xl
                "

            >

                <PencilIcon
                    className="w-5 h-5"
                />

                Edit

            </Link>


        </div>


    </div>





    {/* Details Card */}


    <div className="
        bg-white
        shadow
        rounded-2xl
        p-6
    ">



        <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
        ">



            {/* Product */}

            <div className="
                flex
                gap-4
                bg-gray-50
                rounded-xl
                p-4
            ">

                <span className="text-3xl">
                    📦
                </span>


                <div>

                    <p className="text-gray-500 text-sm">
                        Product
                    </p>

                    <h3 className="font-bold">
                        {
                            stock.product?.name
                        }
                    </h3>

                </div>


            </div>







            {/* Quantity */}

            <div className="
                flex
                gap-4
                bg-green-50
                rounded-xl
                p-4
            ">


                <span className="text-3xl">
                    📊
                </span>


                <div>

                    <p className="text-gray-500 text-sm">
                        Quantity
                    </p>


                    <h3 className="
                        font-bold
                        text-green-600
                    ">

                        +{stock.quantity}

                    </h3>


                </div>


            </div>








            {/* SKU */}

            <div className="
                flex
                gap-4
                bg-gray-50
                rounded-xl
                p-4
            ">


                <span className="text-3xl">
                    🔖
                </span>


                <div>

                    <p className="text-gray-500 text-sm">
                        SKU
                    </p>


                    <h3 className="font-bold">

                        {
                            stock.product?.sku ?? "-"
                        }

                    </h3>


                </div>


            </div>








            {/* Reference */}

            <div className="
                flex
                gap-4
                bg-gray-50
                rounded-xl
                p-4
            ">


                <span className="text-3xl">
                    🧾
                </span>


                <div>

                    <p className="text-gray-500 text-sm">
                        Reference
                    </p>


                    <h3 className="font-bold">

                        {
                            stock.reference ?? "-"
                        }

                    </h3>


                </div>


            </div>








            {/* Added By */}

            <div className="
                flex
                gap-4
                bg-gray-50
                rounded-xl
                p-4
            ">


                <span className="text-3xl">
                    👤
                </span>


                <div>

                    <p className="text-gray-500 text-sm">
                        Added By
                    </p>


                    <h3 className="font-bold">

                        {
                            stock.user?.name ?? "-"
                        }

                    </h3>


                </div>


            </div>








            {/* Date */}

            <div className="
                flex
                gap-4
                bg-gray-50
                rounded-xl
                p-4
            ">


                <span className="text-3xl">
                    📅
                </span>


                <div>

                    <p className="text-gray-500 text-sm">
                        Date
                    </p>


                    <h3 className="font-bold">

                        {
                            new Date(
                                stock.created_at
                            )
                            .toLocaleDateString()
                        }

                    </h3>


                </div>


            </div>







            {/* Note Full Width */}

            <div className="
                md:col-span-2
                flex
                gap-4
                bg-yellow-50
                rounded-xl
                p-4
            ">


                <span className="text-3xl">
                    📝
                </span>


                <div>

                    <p className="text-gray-500 text-sm">
                        Note
                    </p>


                    <p className="font-semibold">

                        {
                            stock.note ?? 
                            "No notes available"
                        }

                    </p>


                </div>


            </div>





        </div>



    </div>



</div>


</AdminLayout>


);

}