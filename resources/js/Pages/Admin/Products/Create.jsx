import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, Link } from "@inertiajs/react";


export default function Create({ categories }) {


    const { data, setData, post, processing, errors } = useForm({

        name: "",
        category_id: "",
        sku: "",
        barcode: "",
        image: null,
        cost_price: "",
        selling_price: "",
        quantity: "",
        unit: "pcs"

    });



    function submit(e) {

        e.preventDefault();


        post(
            route("admin.products.store"),
            {
                forceFormData: true
            }
        );

    }



    return (

        <AdminLayout>


            <div className="p-6">


                <h1 className="
text-3xl
font-bold
mb-6
">

                    Create Product

                </h1>



                <form

                    onSubmit={submit}

                    className="
bg-white
rounded-2xl
shadow
p-6
space-y-5
"


                >


                    <input

                        className="
border
rounded-xl
p-3
w-full
"

                        placeholder="Product name"

                        value={data.name}

                        onChange={
                            e => setData(
                                "name",
                                e.target.value
                            )
                        }

                    />





                    <select

                        className="
border
rounded-xl
p-3
w-full
"


                        value={data.category_id}

                        onChange={
                            e => setData(
                                "category_id",
                                e.target.value
                            )
                        }

                    >


                        <option value="">

                            Select Category

                        </option>


                        {
                            categories.map(category => (

                                <option

                                    key={category.id}

                                    value={category.id}

                                >

                                    {category.name}

                                </option>


                            ))

                        }


                    </select>






                    <div className="
    grid
    md:grid-cols-2
    gap-4
">

                        {/* SKU */}

                        <input

                            type="text"

                            className="
            border
            rounded-xl
            p-3
            w-full
        "

                            placeholder="SKU"

                            value={data.sku}

                            onChange={
                                e =>
                                    setData(
                                        "sku",
                                        e.target.value
                                    )
                            }

                        />


                        {/* Barcode */}

                        <input

                            type="text"

                            className="
            border
            rounded-xl
            p-3
            w-full
        "

                            placeholder="Barcode"

                            value={data.barcode}

                            onChange={
                                e =>
                                    setData(
                                        "barcode",
                                        e.target.value
                                    )
                            }

                        />

                    </div>







                    <input

                        type="file"

                        className="
border
rounded-xl
p-3
w-full
"


                        onChange={
                            e => setData(
                                "image",
                                e.target.files[0]
                            )
                        }

                    />






                    <div className="
grid
md:grid-cols-2
gap-4
">


                        <input

                            type="number"

                            className="
border
rounded-xl
p-3
"

                            placeholder="Cost Price"

                            value={data.cost_price}

                            onChange={
                                e => setData(
                                    "cost_price",
                                    e.target.value
                                )
                            }

                        />




                        <input

                            type="number"

                            className="
border
rounded-xl
p-3
"

                            placeholder="Selling Price"

                            value={data.selling_price}

                            onChange={
                                e => setData(
                                    "selling_price",
                                    e.target.value
                                )
                            }

                        />



                    </div>





                    <input

                        type="number"

                        className="
border
rounded-xl
p-3
w-full
"

                        placeholder="Opening Stock"

                        value={data.quantity}

                        onChange={
                            e => setData(
                                "quantity",
                                e.target.value
                            )
                        }

                    />





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
                                "Saving..."
                                :
                                "Create Product"
                        }


                    </button>



                </form>


            </div>


        </AdminLayout>


    )

}