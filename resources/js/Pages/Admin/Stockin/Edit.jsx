import AdminLayout from "@/Layouts/AdminLayout";

import {
    useForm,
    Link
} from "@inertiajs/react";


import {
    ArrowLeftIcon
} from "@heroicons/react/24/outline";



export default function Edit({stock, products}) {


const {
    data,
    setData,
    put,
    processing,
    errors

}=useForm({

    product_id: stock.product_id,

    quantity: stock.quantity,

    reference: stock.reference ?? "",

    note: stock.note ?? ""

});





const submit=(e)=>{

    e.preventDefault();


    put(
        route(
            "admin.stockin.update",
            stock.id
        )
    );


};




return (

<AdminLayout>


<div className="p-6">


<div className="
bg-white
rounded-2xl
shadow
p-6
">


{/* Header */}

<div className="
flex
justify-between
items-center
mb-6
">


<h1 className="
text-2xl
font-bold
">

Edit Stock In

</h1>



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
"

>


<ArrowLeftIcon
className="w-5 h-5"
/>

Back


</Link>


</div>





<form
    onSubmit={submit}
    className="space-y-6"
>


<div className="
grid
grid-cols-1
md:grid-cols-2
gap-6
">


{/* LEFT COLUMN */}

<div className="space-y-6">


{/* Product */}

<div>

<label className="
block
mb-2
font-semibold
text-gray-700
">

Product

</label>


<select

value={data.product_id}

onChange={
e =>
setData(
"product_id",
e.target.value
)
}


className="
w-full
border
rounded-xl
p-3
"

>


<option value="">
Select Product
</option>



{

products.data.map(product=>(

<option

key={product.id}

value={product.id}

>

{product.name}

</option>

))

}


</select>



{
errors.product_id &&

<p className="
text-red-600
text-sm
mt-1
">

{errors.product_id}

</p>

}


</div>





{/* Reference */}

<div>


<label className="
block
mb-2
font-semibold
text-gray-700
">

Reference

</label>



<input

type="text"

value={data.reference}

onChange={
e =>
setData(
"reference",
e.target.value
)
}


className="
w-full
border
rounded-xl
p-3
"


placeholder="Invoice number / Supplier"

/>



</div>



</div>







{/* RIGHT COLUMN */}


<div className="space-y-6">





{/* Quantity */}

<div>


<label className="
block
mb-2
font-semibold
text-gray-700
">

Quantity

</label>



<input

type="number"

min="1"

value={data.quantity}

onChange={
e =>
setData(
"quantity",
e.target.value
)
}


className="
w-full
border
rounded-xl
p-3
"

placeholder="Enter quantity"

/>



{
errors.quantity &&

<p className="
text-red-600
text-sm
mt-1
">

{errors.quantity}

</p>

}


</div>






{/* Note */}

<div>


<label className="
block
mb-2
font-semibold
text-gray-700
">

Note

</label>



<textarea

rows="5"

value={data.note}

onChange={
e =>
setData(
"note",
e.target.value
)
}


className="
w-full
border
rounded-xl
p-3
"

placeholder="Additional notes"

/>



</div>



</div>


</div>







{/* BUTTONS */}

<div className="
flex
gap-3
pt-4
">


<button

disabled={processing}

className="
bg-blue-600
hover:bg-blue-700
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
"Update Stock"
}


</button>





<Link

href={
route(
"admin.stockin.index"
)
}


className="
bg-gray-200
hover:bg-gray-300
px-6
py-3
rounded-xl
"

>

Cancel

</Link>



</div>



</form>


</div>


</div>


</AdminLayout>

);


}