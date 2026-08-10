import AdminLayout from "@/Layouts/AdminLayout";

import {
    ExclamationTriangleIcon,
    CubeIcon
} from "@heroicons/react/24/outline";

import {
    Link
} from "@inertiajs/react";



export default function Index({products}) {


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

Low Stock Alert

</h1>


<p className="
text-gray-500
">

Products running out soon

</p>


</div>


</div>





{/* Table Card */}

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
SKU
</th>


<th className="p-4 text-left">
Current Stock
</th>


<th className="p-4 text-left">
Alert Level
</th>


<th className="p-4 text-left">
Status
</th>


</tr>


</thead>





<tbody>


{
products.data.length > 0 ?

products.data.map(product=>(


<tr

key={product.id}

className="
border-t
hover:bg-gray-50
transition
"


>


<td className="
p-4
flex
items-center
gap-3
">


<div className="
bg-red-100
p-2
rounded-full
">


<ExclamationTriangleIcon

className="
w-6
h-6
text-red-600
"

/>


</div>



<div>


<h3 className="
font-semibold
text-gray-800
">

{product.name}

</h3>



<p className="
text-sm
text-gray-500
">

{product.category?.name ?? "No Category"}

</p>


</div>



</td>





<td className="p-4">

{product.sku ?? "-"}

</td>





<td className="p-4">


<span className="
bg-orange-100
text-orange-700
px-3
py-1
rounded-full
font-semibold
">


{product.quantity}


</span>


</td>





<td className="p-4">


{product.low_stock_limit}


</td>





<td className="p-4">


<span className="
bg-red-100
text-red-700
px-3
py-1
rounded-full
text-sm
font-semibold
">


Need Restock


</span>


</td>



</tr>


))


:


<tr>

<td
colSpan="5"
className="
text-center
p-6
text-gray-500
"
>

No low stock products 🎉

</td>


</tr>


}



</tbody>



</table>




{/* Pagination */}


<div className="
p-5
flex
justify-center
gap-2
flex-wrap
">


{
products.links.map((link,index)=>(


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
"bg-white hover:bg-gray-100"
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


</AdminLayout>


)


}