import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';


export default function Register() {


    const { 
        data, 
        setData, 
        post, 
        processing, 
        errors, 
        reset 
    } = useForm({

        name: '',

        email: '',

        business_name: '',

        location: '',

        password: '',

        password_confirmation: '',

    });



    const submit = (e) => {

        e.preventDefault();


        post(route('register'), {

            onFinish: () => reset(
                'password',
                'password_confirmation'
            ),

        });


    };




return (

<GuestLayout>


<Head title="Create MauzoVibe Account" />


<div className="mb-6">


<h1 className="
text-3xl
font-bold
text-gray-800
">

Create Your Business

</h1>


<p className="
text-sm
text-gray-500
mt-2
">

Start managing your sales, stock and customers with MauzoVibe

</p>


</div>




<form onSubmit={submit}>


{/* User Name */}

<div>


<InputLabel 
htmlFor="name"
value="Your Name"
/>


<TextInput

id="name"

name="name"

value={data.name}

className="mt-1 block w-full"

autoComplete="name"

isFocused={true}

onChange={
(e)=>setData(
'name',
e.target.value
)
}

required

/>


<InputError 
message={errors.name}
/>


</div>





{/* Email */}

<div className="mt-4">


<InputLabel
htmlFor="email"
value="Email"
/>



<TextInput

id="email"

type="email"

name="email"

value={data.email}

className="mt-1 block w-full"

autoComplete="username"

onChange={
(e)=>setData(
'email',
e.target.value
)
}

required

/>


<InputError
message={errors.email}
/>


</div>





{/* Business Name */}

<div className="mt-4">


<InputLabel

htmlFor="business_name"

value="Business Name"

/>



<TextInput

id="business_name"

name="business_name"

value={data.business_name}

className="mt-1 block w-full"

placeholder="Example: MauzoVibe Shop"

onChange={
(e)=>setData(
'business_name',
e.target.value
)
}

required

/>



<InputError
message={errors.business_name}
/>


</div>





{/* Location */}

<div className="mt-4">


<InputLabel

htmlFor="location"

value="Business Location"

/>



<TextInput

id="location"

name="location"

value={data.location}

className="mt-1 block w-full"

placeholder="Example: Dar es Salaam"

onChange={
(e)=>setData(
'location',
e.target.value
)
}

/>


<InputError
message={errors.location}
/>


</div>






{/* Password */}

<div className="mt-4">


<InputLabel

htmlFor="password"

value="Password"

/>



<TextInput

id="password"

type="password"

name="password"

value={data.password}

className="mt-1 block w-full"

autoComplete="new-password"

onChange={
(e)=>setData(
'password',
e.target.value
)
}

required

/>



<InputError
message={errors.password}
/>


</div>





{/* Confirm Password */}

<div className="mt-4">


<InputLabel

htmlFor="password_confirmation"

value="Confirm Password"

/>



<TextInput

id="password_confirmation"

type="password"

name="password_confirmation"

value={
data.password_confirmation
}

className="mt-1 block w-full"

autoComplete="new-password"

onChange={
(e)=>setData(
'password_confirmation',
e.target.value
)
}

required

/>



<InputError

message={
errors.password_confirmation
}

/>


</div>







<div className="
mt-6
flex
items-center
justify-between
">


<Link

href={route('login')}

className="
text-sm
text-blue-600
hover:text-blue-800
"

>

Already registered?

</Link>



<PrimaryButton

disabled={processing}

>

{
processing
?
"Creating..."
:
"Create Account"
}


</PrimaryButton>



</div>




</form>



</GuestLayout>


);


}