import { Head, Link, useForm } from "@inertiajs/react";

export default function Welcome({ canLogin, canRegister }) {

    const form = useForm({
        email: "",
        password: "",
        remember: false,
    });

    function submit(e) {

        e.preventDefault();

        form.post(route("login"));

    }



    return (

        <>

            <Head title="MauzoVibe - Smart Business Management" />


            <div className="min-h-screen bg-white pb-24">


                {/* Top Contact Bar */}

                <div className="
                    hidden
                    md:flex
                    h-10
                    border-b
                    justify-between
                    items-center
                    px-4
                    lg:px-12
                    text-xs
                    text-gray-500
                    ">

                    <div>
                        ✉ mauzovibe@outlook.com
                        &nbsp;&nbsp;
                        ☎ +255 0748565656
                    </div>


                    <div className="space-x-4">

                        <span>𝕏</span>
                        <span>f</span>
                        <span>◎</span>
                        <span>in</span>

                    </div>


                </div>

                {/* Navbar */}


                <nav className="
                flex
                justify-between
                items-center
                px-4
                sm:px-6
                lg:px-12
                py-5
            ">

                    <h1 className="
                    text-3xl
                    font-bold
                    text-gray-800
                ">

                        Mauzo<span className="text-blue-600">
                            Vibe
                        </span>

                    </h1>



                    <div className="
                    flex
                    gap-8
                    text-gray-600
                ">


                        <a>Home</a>
                        <a>About</a>
                        <a>Services</a>
                        <a>Contact</a>

                    </div>
                </nav>


                {/* Hero Section */}

                <div className="
                grid
                grid-cols-1
                lg:grid-cols-3
                gap-10
                items-center
                px-4
                sm:px-6
                lg:px-12
                py-8
            ">



                    {/* Left Content */}


                    <div>

                        <h1
                            className="
                            font-bold
                            leading-tight
                            text-gray-800
                            text-3xl
                            sm:text-4xl
                            lg:text-6xl
                            "
                        >

                            Acha Kupoteza
                            <br />

                            <span className="text-blue-600">
                                Mauzo.
                            </span>

                            <br />

                            Anza Kukuza
                            <br />

                            Biashara Yako.

                        </h1>


                        <p
                            className="
                            mt-6
                            text-gray-600
                            text-base
                            sm:text-lg
                            leading-7
                            leading-8
                            "
                        >

                            MauzoVibe inakusaidia kusimamia
                            <span className="font-semibold text-gray-800"> mauzo</span>,
                            <span className="font-semibold text-gray-800"> stock</span>,
                            <span className="font-semibold text-gray-800"> wateja</span> na
                            <span className="font-semibold text-gray-800"> faida</span> yako
                            kwa urahisi.

                            <br /><br />

                            Jua kinachoendelea kwenye biashara yako
                            <span className="font-semibold text-blue-600">
                                {" "}wakati wowote, popote ulipo.
                            </span>

                        </p>


                        <div
                            className="
                            flex
                            flex-wrap
                            gap-3
                            mt-6
                            text-sm
                            font-medium
                            text-blue-600
                            ">
                        </div>



                        <div
                            className="
                            flex
                            flex-col
                            sm:flex-row
                            gap-4
                            mt-10
                            "
                        >

                            <Link
                                href="/register"
                                className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-7
            py-3
            rounded-xl
            shadow-lg
            transition
            "
                            >

                                🚀 Free Trial

                            </Link>



                            <button
                                className="
            border-2
            border-blue-600
            text-blue-600
            hover:bg-blue-600
            hover:text-white
            px-7
            py-3
            rounded-xl
            transition
            "
                            >

                                ▶ Whatch Demo

                            </button>

                        </div>

                    </div>


                    {/* Image */}



                    <div>


                        <img

                            src="/images/shop.jpg"

                            className="
                        rounded-2xl
                        shadow-lg
                        h-60
                        sm:h-80
                        lg:h-[430px]
                        w-full
                        object-cover
                        "

                        />


                    </div>

                    {/* Login Card */}

                    <div className="
                    bg-white
                    rounded-2xl
                    shadow-xl
                    p-6
                    w-full
                    max-w-md
                    mx-auto
                     ">

                        <h2 className="
                        text-4xl
                        font-bold
                        text-gray-700
                        mb-5
                    ">

                            Login

                        </h2>

                        <form onSubmit={submit}>


                            {/* <select

                                className="
                            w-full
                            border
                            rounded-lg
                            p-3
                            mb-3
                            "

                            >

                                <option>
                                    Finance Manager
                                </option>

                                <option>
                                    Admin
                                </option>

                                <option>
                                    Cashier
                                </option>
                                 <option>
                                    Shop Manager
                                </option>


                            </select> */}

                            <input

                                type="email"

                                placeholder="Email"

                                className="
                            w-full
                            bg-blue-50
                            border
                            rounded-lg
                            p-3
                            mb-3
                            "

                                value={form.data.email}

                                onChange={(e) =>
                                    form.setData(
                                        "email",
                                        e.target.value
                                    )
                                }

                            />


                            <input

                                type="password"

                                placeholder="Password"

                                className="
                            w-full
                            bg-blue-50
                            border
                            rounded-lg
                            p-3
                            mb-4
                            "

                                value={form.data.password}

                                onChange={(e) =>
                                    form.setData(
                                        "password",
                                        e.target.value
                                    )
                                }

                            />

                            <div className="flex items-center mb-4">

                            <input
                                type="checkbox"
                                checked={form.data.remember}
                                onChange={(e)=>
                                    form.setData(
                                        "remember",
                                        e.target.checked
                                    )
                                }
                            />

                            <span className="ml-2 text-sm text-gray-600">
                                Remember me
                            </span>

                            </div>

                            <button
    disabled={form.processing}
    className="
        bg-blue-600
        hover:bg-blue-700
        disabled:opacity-50
        text-white
        w-full
        py-3
        rounded-lg
    "
>

{
form.processing
?
"Logging in..."
:
"Login"
}

</button>
                        </form>

                        <p className="
                        text-sm
                        text-gray-500
                        mt-5
                    ">

                            Don't have an account?

                            <Link
                                href="/register"
                                className="
                            text-blue-600
                            ml-1
                            "
                            >

                                Sign Up

                            </Link>

                        </p>

                    </div>

                </div>


            </div>

            {/* Footer Section */}

            {/* Modern Fixed Footer */}

            <footer
                className="
                fixed
                bottom-0
                left-0
                w-full
                bg-white/90
                backdrop-blur-lg
                border-t
                shadow-lg
                z-50
                "
                        >


                <div
                    className="
    max-w-7xl
    mx-auto
    px-8
    py-4
    flex
    flex-col
    md:flex-row
    justify-between
    items-center
    gap-3
    "
                >


                    {/* Logo */}

                    <div
                        className="
        text-xl
        font-bold
        text-gray-800
        "
                    >

                        Mauzo
                        <span className="text-blue-600">
                            Vibe
                        </span>

                        <p
                            className="
        text-xs
        text-gray-500
        font-normal
        "
                        >
                            Smart Business Management System
                        </p>

                    </div>





                    {/* Links */}

                    <div
                        className="
        flex
        gap-5
        text-sm
        text-gray-500
        "
                    >

                        <a
                            className="hover:text-blue-600 cursor-pointer"
                        >
                            Privacy
                        </a>


                        <a
                            className="hover:text-blue-600 cursor-pointer"
                        >
                            Terms
                        </a>


                        <a
                            className="hover:text-blue-600 cursor-pointer"
                        >
                            Support
                        </a>


                    </div>






                    {/* Social + Copyright */}

                    <div
                        className="
        text-sm
        text-gray-500
        text-center
        "
                    >

                        <div
                            className="
        flex
        justify-center
        gap-4
        mb-1
        "
                        >

                            <span className="
            w-8
            h-8
            flex
            items-center
            justify-center
            rounded-full
            bg-blue-50
            text-blue-600
            hover:bg-blue-600
            hover:text-white
            cursor-pointer
            ">
                                f
                            </span>


                            <span className="
            w-8
            h-8
            flex
            items-center
            justify-center
            rounded-full
            bg-blue-50
            text-blue-600
            hover:bg-blue-600
            hover:text-white
            cursor-pointer
            ">
                                𝕏
                            </span>


                            <span className="
            w-8
            h-8
            flex
            items-center
            justify-center
            rounded-full
            bg-blue-50
            text-blue-600
            hover:bg-blue-600
            hover:text-white
            cursor-pointer
            ">
                                in
                            </span>


                        </div>


                        © {new Date().getFullYear()} MauzoVibe.
                        All rights reserved.


                    </div>



                </div>


            </footer>

        </>

    );


}