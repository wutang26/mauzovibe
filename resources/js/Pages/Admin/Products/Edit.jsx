import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";

export default function Edit({ product, categories }) {

    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({

        _method: "PUT",

        name: product.name ?? "",

        category_id: product.category_id ?? "",

        sku: product.sku ?? "",

        barcode: product.barcode ?? "",

        image: null,

        cost_price: product.cost_price ?? "",

        selling_price: product.selling_price ?? "",

        quantity: product.quantity ?? "",

        unit: product.unit ?? "pcs",

    });


    function submit(e) {

        e.preventDefault();

        console.log("Submitting:", data);


        post(
            route(
                "admin.products.update",
                product.id
            ),
            {

                forceFormData: true,

                preserveScroll: true,

                onSuccess: () => {

                    console.log(
                        "Product updated successfully"
                    );

                },

                onError: (errors) => {

                    console.log(
                        "Validation errors:",
                        errors
                    );

                },

            }
        );

    }


    return (

        <AdminLayout>

            <div className="p-6">

                <div className="max-w-4xl mx-auto">

                    <h1 className="
                        text-3xl
                        font-bold
                        mb-6
                        text-gray-800
                    ">
                        Edit Product
                    </h1>


                    <form
                        onSubmit={submit}
                        className="
                            bg-white
                            rounded-2xl
                            shadow
                            p-6
                            space-y-6
                        "
                    >

                        {/* Product Name + Category */}

                        <div className="
                            grid
                            md:grid-cols-2
                            gap-4
                        ">

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    mb-2
                                ">
                                    Product Name
                                </label>

                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    className="
                                        border
                                        rounded-xl
                                        p-3
                                        w-full
                                        focus:ring-2
                                        focus:ring-blue-500
                                        focus:border-blue-500
                                    "
                                    placeholder="Product name"
                                />

                                {errors.name && (
                                    <p className="
                                        text-red-500
                                        text-sm
                                        mt-1
                                    ">
                                        {errors.name}
                                    </p>
                                )}

                            </div>


                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    mb-2
                                ">
                                    Category
                                </label>

                                <select
                                    value={data.category_id}
                                    onChange={(e) =>
                                        setData(
                                            "category_id",
                                            e.target.value
                                        )
                                    }
                                    className="
                                        border
                                        rounded-xl
                                        p-3
                                        w-full
                                        bg-white
                                        focus:ring-2
                                        focus:ring-blue-500
                                        focus:border-blue-500
                                    "
                                >

                                    <option value="">
                                        Select Category
                                    </option>

                                    {categories.map((category) => (

                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>

                                    ))}

                                </select>

                                {errors.category_id && (
                                    <p className="
                                        text-red-500
                                        text-sm
                                        mt-1
                                    ">
                                        {errors.category_id}
                                    </p>
                                )}

                            </div>

                        </div>


                        {/* SKU + Barcode */}

                        <div className="
                            grid
                            md:grid-cols-2
                            gap-4
                        ">

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    mb-2
                                ">
                                    SKU
                                </label>

                                <input
                                    type="text"
                                    value={data.sku}
                                    onChange={(e) =>
                                        setData(
                                            "sku",
                                            e.target.value
                                        )
                                    }
                                    className="
                                        border
                                        rounded-xl
                                        p-3
                                        w-full
                                    "
                                    placeholder="SKU"
                                />

                                {errors.sku && (
                                    <p className="
                                        text-red-500
                                        text-sm
                                        mt-1
                                    ">
                                        {errors.sku}
                                    </p>
                                )}

                            </div>


                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    mb-2
                                ">
                                    Barcode
                                </label>

                                <input
                                    type="text"
                                    value={data.barcode}
                                    onChange={(e) =>
                                        setData(
                                            "barcode",
                                            e.target.value
                                        )
                                    }
                                    className="
                                        border
                                        rounded-xl
                                        p-3
                                        w-full
                                    "
                                    placeholder="Barcode"
                                />

                                {errors.barcode && (
                                    <p className="
                                        text-red-500
                                        text-sm
                                        mt-1
                                    ">
                                        {errors.barcode}
                                    </p>
                                )}

                            </div>

                        </div>


                        {/* Image */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-gray-700
                                mb-2
                            ">
                                Product Image
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setData(
                                        "image",
                                        e.target.files[0] ?? null
                                    )
                                }
                                className="
                                    border
                                    rounded-xl
                                    p-3
                                    w-full
                                "
                            />

                            {errors.image && (
                                <p className="
                                    text-red-500
                                    text-sm
                                    mt-1
                                ">
                                    {errors.image}
                                </p>
                            )}

                        </div>


                        {/* Prices */}

                        <div className="
                            grid
                            md:grid-cols-2
                            gap-4
                        ">

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    mb-2
                                ">
                                    Cost Price
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.cost_price}
                                    onChange={(e) =>
                                        setData(
                                            "cost_price",
                                            e.target.value
                                        )
                                    }
                                    className="
                                        border
                                        rounded-xl
                                        p-3
                                        w-full
                                    "
                                    placeholder="Cost Price"
                                />

                                {errors.cost_price && (
                                    <p className="
                                        text-red-500
                                        text-sm
                                        mt-1
                                    ">
                                        {errors.cost_price}
                                    </p>
                                )}

                            </div>


                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    mb-2
                                ">
                                    Selling Price
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.selling_price}
                                    onChange={(e) =>
                                        setData(
                                            "selling_price",
                                            e.target.value
                                        )
                                    }
                                    className="
                                        border
                                        rounded-xl
                                        p-3
                                        w-full
                                    "
                                    placeholder="Selling Price"
                                />

                                {errors.selling_price && (
                                    <p className="
                                        text-red-500
                                        text-sm
                                        mt-1
                                    ">
                                        {errors.selling_price}
                                    </p>
                                )}

                            </div>

                        </div>


                        {/* Stock + Unit */}

                        <div className="
                            grid
                            md:grid-cols-2
                            gap-4
                        ">

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    mb-2
                                ">
                                    Stock Quantity
                                </label>

                                <input
                                    type="number"
                                    value={data.quantity}
                                    onChange={(e) =>
                                        setData(
                                            "quantity",
                                            e.target.value
                                        )
                                    }
                                    className="
                                        border
                                        rounded-xl
                                        p-3
                                        w-full
                                    "
                                    placeholder="Stock Quantity"
                                />

                                {errors.quantity && (
                                    <p className="
                                        text-red-500
                                        text-sm
                                        mt-1
                                    ">
                                        {errors.quantity}
                                    </p>
                                )}

                            </div>


                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    mb-2
                                ">
                                    Unit
                                </label>

                                <select
                                    value={data.unit}
                                    onChange={(e) =>
                                        setData(
                                            "unit",
                                            e.target.value
                                        )
                                    }
                                    className="
                                        border
                                        rounded-xl
                                        p-3
                                        w-full
                                        bg-white
                                    "
                                >

                                    <option value="pcs">
                                        Pieces
                                    </option>

                                    <option value="kg">
                                        Kilogram
                                    </option>

                                    <option value="litre">
                                        Litre
                                    </option>

                                    <option value="box">
                                        Box
                                    </option>

                                    <option value="pack">
                                        Pack
                                    </option>

                                </select>

                                {errors.unit && (
                                    <p className="
                                        text-red-500
                                        text-sm
                                        mt-1
                                    ">
                                        {errors.unit}
                                    </p>
                                )}

                            </div>

                        </div>


                        {/* Buttons */}

                        <div className="
                            flex
                            flex-col
                            md:flex-row
                            gap-3
                            pt-4
                        ">

                            <button
                                type="submit"
                                disabled={processing}
                                className="
                                    bg-blue-600
                                    hover:bg-blue-700
                                    disabled:opacity-50
                                    text-white
                                    px-6
                                    py-3
                                    rounded-xl
                                    font-semibold
                                    w-full
                                "
                            >

                                {processing
                                    ? "Updating..."
                                    : "Update Product"
                                }

                            </button>


                            <a
                                href={route(
                                    "admin.products.index"
                                )}
                                className="
                                    bg-gray-100
                                    hover:bg-gray-200
                                    text-gray-700
                                    px-6
                                    py-3
                                    rounded-xl
                                    font-semibold
                                    text-center
                                    w-full
                                "
                            >
                                Cancel
                            </a>

                        </div>

                    </form>

                </div>

            </div>

        </AdminLayout>

    );
}