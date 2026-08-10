import AdminLayout from "@/Layouts/AdminLayout";

import {
useForm,
Link
} from "@inertiajs/react";


import {
ArrowLeftIcon,
CubeIcon
} from "@heroicons/react/24/outline";



export default function Create({products}) {


const {
data,
setData,
post,
processing,
errors

}=useForm({

    product_id:"",
    quantity:"",
    reference:"",
    note:""

});



const submit=(e)=>{

    e.preventDefault();


    post(
        route(
            "admin.stockout.store"
        )
    );

};



return (


<AdminLayout>


<div className="p-6">


{/* Header */}

<div className="mb-8">


<h1 className="
text-3xl
font-bold
text-gray-800
">

Remove Stock

</h1>


<p className="text-gray-500">

Remove products from inventory

</p>


</div>





<div className="
bg-white
rounded-2xl
shadow
p-6
">



{/* Card Header */}


<div className="
flex
justify-between
items-center
mb-6
">


<h2 className="
text-xl
font-bold
">

Stock Out Information

</h2>




<Link

href={
route(
"admin.stockout.index"
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

Back Home


</Link>



</div>





<div className="
grid
grid-cols-1
lg:grid-cols-3
gap-6
">





{/* LEFT FORM */}


<div className="
lg:col-span-2
">


<form

onSubmit={submit}

className="space-y-6"

>




{/* Product */}


<div>


<label className="
block
mb-2
font-semibold
">

Product

</label>



<select


value={
data.product_id
}


onChange={
e=>
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

(Stock: {product.quantity})

</option>


))

}



</select>



{
errors.product_id &&

<p className="text-red-600 text-sm">

{errors.product_id}

</p>

}


</div>







{/* Quantity */}



<div>


<label className="
block
mb-2
font-semibold
">

Quantity

</label>



<input


type="number"

min="1"


value={
data.quantity
}


onChange={
e=>
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

placeholder="Enter quantity to remove"

/>



{
errors.quantity &&

<p className="
text-red-600
text-sm
">

{errors.quantity}

</p>

}


</div>







{/* Reference */}



<div>


<label className="
block
mb-2
font-semibold
">

Reference

</label>



<input


type="text"


value={
data.reference
}


onChange={
e=>
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


placeholder="Reason / Invoice / Damage"

/>


</div>









{/* Note */}



<div>


<label className="
block
mb-2
font-semibold
">

Note

</label>



<textarea


rows="4"


value={
data.note
}


onChange={
e=>
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







{/* Buttons */}



<div className="
flex
gap-3
">


<button


disabled={
processing
}


className="
bg-red-600
text-white
px-6
py-3
rounded-xl
"


>


{

processing

?

"Removing..."

:

"Remove Stock"

}


</button>





<Link


href={
route(
"admin.stockout.index"
)
}


className="
bg-gray-200
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









{/* RIGHT CURRENT STOCK */}



<div className="
border
rounded-2xl
p-5
bg-gray-50
">


<h2 className="
font-bold
text-lg
mb-4
">

Current Stock

</h2>





<div className="space-y-3">



{

products.data.map(product=>(


<div

key={product.id}

className="
bg-white
rounded-xl
p-4
shadow-sm
"


>



<div className="
flex
justify-between
items-center
">


<div className="
flex
gap-3
items-center
">


<CubeIcon

className="
w-8
h-8
text-red-600
"

/>


<div>


<h3 className="
font-semibold
">

{product.name}

</h3>



<p className="
text-sm
text-gray-500
">

SKU:
{product.sku ?? "-"}

</p>



</div>


</div>




<span className="
bg-green-100
text-green-700
px-3
py-1
rounded-full
font-bold
">


{product.quantity}


</span>



</div>



</div>



))


}



</div>







{/* Pagination */}

<div className="
mt-5
flex
justify-center
gap-2
flex-wrap
">


{

products.links.map(
(link,index)=>(


<Link

key={index}

href={link.url ?? "#"}


className={`

px-3
py-2
rounded-lg
border
text-sm


${
link.active
?
"bg-red-600 text-white"
:
"bg-white"
}

`}


>


<span

dangerouslySetInnerHTML={{
__html:link.label
}}

/>


</Link>


))

}



</div>





</div>






</div>



</div>


</div>


</AdminLayout>


);


}