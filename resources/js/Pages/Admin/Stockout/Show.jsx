import AdminLayout from "@/Layouts/AdminLayout";

import {
Link
} from "@inertiajs/react";


import {
ArrowLeftIcon,
CubeIcon,
UserIcon,
CalendarIcon,
DocumentTextIcon
} from "@heroicons/react/24/outline";



export default function Show({stock}) {


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

Stock Out Details

</h1>


<p className="
text-gray-500
">

View removed stock information

</p>


</div>





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
hover:bg-gray-200
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








<div className="
bg-white
rounded-2xl
shadow
p-6
">



<div className="
grid
grid-cols-1
md:grid-cols-2
gap-6
">





{/* LEFT COLUMN */}


<div className="
space-y-5
">


<h2 className="
text-xl
font-bold
border-b
pb-3
">

Product Information

</h2>






<div className="
flex
items-center
gap-4
bg-gray-50
p-4
rounded-xl
">


<CubeIcon

className="
w-10
h-10
text-red-600
"

/>



<div>


<p className="
text-gray-500
text-sm
">

Product

</p>


<h3 className="
font-bold
text-lg
">

{
stock.product?.name
}

</h3>


</div>



</div>








<div className="
bg-gray-50
p-4
rounded-xl
">


<p className="
text-gray-500
text-sm
">

Quantity Removed

</p>



<span className="
inline-block
mt-2
bg-red-100
text-red-700
px-4
py-2
rounded-full
font-bold
">

-{stock.quantity}

</span>


</div>






<div className="
bg-gray-50
p-4
rounded-xl
">


<p className="
text-gray-500
text-sm
">

Reference

</p>


<p className="
font-semibold
">

{
stock.reference ?? "-"
}

</p>


</div>




</div>









{/* RIGHT COLUMN */}



<div className="
space-y-5
">



<h2 className="
text-xl
font-bold
border-b
pb-3
">

Movement Information

</h2>






<div className="
flex
gap-3
items-center
bg-gray-50
p-4
rounded-xl
">


<UserIcon

className="
w-7
h-7
text-blue-600
"

/>



<div>

<p className="
text-gray-500
text-sm
">

Created By

</p>


<p className="
font-semibold
">

{
stock.user?.name ?? "-"
}

</p>


</div>



</div>







<div className="
flex
gap-3
items-center
bg-gray-50
p-4
rounded-xl
">


<CalendarIcon

className="
w-7
h-7
text-green-600
"

/>



<div>


<p className="
text-gray-500
text-sm
">

Date

</p>



<p className="
font-semibold
">

{

new Date(
stock.created_at
)
.toLocaleString()

}


</p>


</div>



</div>









<div className="
flex
gap-3
items-center
bg-gray-50
p-4
rounded-xl
">


<DocumentTextIcon

className="
w-7
h-7
text-purple-600
"

/>


<div>


<p className="
text-gray-500
text-sm
">

Note

</p>



<p className="
font-semibold
">

{
stock.note ?? "-"
}

</p>


</div>



</div>





</div>





</div>





{/* Footer */}


<div className="
mt-8
flex
justify-end
">


<Link

href={
route(
"admin.stockout.index"
)
}

className="
bg-red-600
text-white
px-6
py-3
rounded-xl
"

>

Back To Stock Out

</Link>



</div>





</div>




</div>


</AdminLayout>


);


}