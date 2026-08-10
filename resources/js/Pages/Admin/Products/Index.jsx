import AdminLayout from "@/Layouts/AdminLayout";
import { Link ,router} from "@inertiajs/react";

import {
    PlusIcon,
    CubeIcon,
    PencilSquareIcon,
    TrashIcon
} from "@heroicons/react/24/outline";


export default function Index({ products }) {

     const deleteProduct = (id) => {

        if(confirm("Are you sure you want to delete this product?")) {

            router.delete(
                route("admin.products.destroy", id),
                {
                    preserveScroll: true,
                }
            );

        }

    };

    return (

        <AdminLayout>


            <div className="p-6">



                {/* Header */}

                <div className="
                flex
                flex-col
                md:flex-row
                md:justify-between
                gap-4
                mb-8
                ">


                    <div>

                        <h1 className="
                        text-3xl
                        font-bold
                        text-gray-800
                        ">

                            Products

                        </h1>


                        <p className="
                        text-gray-500
                        ">

                            Manage your branch inventory

                        </p>


                    </div>




                    <Link

                        href={route(
                            "admin.products.create"
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
                        shadow
                        "

                    >


                        <PlusIcon className="w-5 h-5" />

                        Add Product


                    </Link>


                </div>

                {/* Product Table */}
                <div className="
                bg-white
                rounded-2xl
                shadow
                overflow-hidden
                ">


                    {/* Desktop */}
                    <div className="
                        hidden
                        md:block
                        overflow-x-auto
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
                                        Barcode
                                    </th>

                                    <th className="p-4 text-left">
                                        Category
                                    </th>


                                    <th className="p-4 text-left">
                                        Price
                                    </th>


                                    <th className="p-4 text-left">
                                        Stock
                                    </th>



                                    <th className="p-4 text-left">
                                        Action
                                    </th>

                                </tr>
                            </thead>

                            <tbody>


                                {
                                    products.data.map(product => (


                                        <tr
                                            key={product.id}
                                            className="
                                            border-t
                                            hover:bg-gray-50
                                            ">


                                            <td className="p-4">


                                                <div className="
                                                flex
                                                items-center
                                                gap-3
                                                ">


                                                    <div className="
                                                    w-12
                                                    h-12
                                                    rounded-xl
                                                    overflow-hidden
                                                    bg-blue-100
                                                    flex
                                                    items-center
                                                    justify-center
                                                    ">


                                                        {
                                                            product.image ?

                                                                <img

                                                                    src={`/storage/${product.image}`}

                                                                    alt={product.name}

                                                                    className="
                                                                    w-full
                                                                    h-full
                                                                    object-cover
                                                                    "

                                                                />


                                                                :

                                                                <CubeIcon

                                                                    className="
                                                                w-6
                                                                h-6
                                                                text-blue-600
                                                                "

                                                                />

                                                        }


                                                    </div>



                                                    <div>


                                                        <h3 className="font-semibold">

                                                            {product.name}

                                                        </h3>


                                                        <p className="
                                                        text-xs
                                                        text-gray-500
                                                        ">

                                                            SKU:
                                                            {product.sku ?? "-"}

                                                        </p>


                                                    </div>


                                                </div>


                                            </td>

                                        <td className="p-4">
                                        <span className="
                                            font-mono
                                            text-sm
                                            text-gray-700
                                            bg-gray-100
                                            px-3
                                            py-1
                                            rounded-lg
                                        ">
                                            {product.barcode ?? "-"}
                                        </span>
                                    </td>

                                            <td className="p-4">

                                                {product.category?.name}


                                            </td>






                                            <td className="p-4 font-semibold">

                                                TZS {Number(product.selling_price)
                                                    .toLocaleString()}

                                            </td>






                                            <td className="p-4">


                                                <span className={`
px-3
py-1
rounded-full
text-sm
font-semibold

${product.quantity <= 5

                                                        ?

                                                        "bg-red-100 text-red-700"

                                                        :

                                                        "bg-green-100 text-green-700"

                                                    }

`}>

                                                    {product.quantity}

                                                </span>


                                            </td>







                                            <td className="p-4">

                                                <div className="flex gap-2">


                                                    <Link

                                                        href={route(
                                                            "admin.products.edit",
                                                            product.id
                                                        )}

                                                        className="
    p-2
    hover:bg-blue-100
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

                                                onClick={() => deleteProduct(product.id)}

                                                className="
                                                p-2
                                                hover:bg-red-100
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


                                            </td>




                                        </tr>


                                    ))


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
                            products.data.map(product => (


                                <div

                                    key={product.id}

                                    className="
border
rounded-2xl
p-4
"


                                >


                                    <div className="
                                    flex
                                    justify-between
                                    ">


                                        <div>

                                            <h3 className="
                                            font-bold
                                            ">

                                                {product.name}

                                            </h3>


                                            <p className="
text-sm
text-gray-500
">

                                                {product.category?.name}

                                            </p>


                                        </div>



                                        <span className="
bg-green-100
text-green-700
px-3
py-1
rounded-full
text-xs
">

                                            {product.quantity}

                                        </span>


                                    </div>




                                    <div className="
mt-4
font-semibold
">

                                        TZS {Number(product.selling_price)
                                            .toLocaleString()}

                                    </div>


                                </div>


                            ))


                        }



                    </div>






                </div>







                {/* Pagination */}

                <div className="
mt-6
flex
justify-center
gap-2
">


                    {
                        products.links.map((link, index) => (

                            <Link

                                key={index}

                                href={link.url ?? "#"}

                                className={`
px-4
py-2
border
rounded-lg

${link.active
                                        ?
                                        "bg-blue-600 text-white"
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

    )


}