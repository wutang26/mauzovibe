import { Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

import {
    UserIcon,
    ShieldCheckIcon,
    PencilSquareIcon
} from "@heroicons/react/24/outline";


function Index({ users }) {


    return (

        <div className="p-6 bg-gray-50 min-h-screen">


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
                        User Management
                    </h1>


                    <p className="
                        text-gray-500
                        mt-1
                    ">
                        Manage system users, roles and permissions
                    </p>


                </div>



                <button
                    className="
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    px-5
                    py-3
                    rounded-xl
                    font-semibold
                    shadow
                    "
                >

                    + Add User

                </button>



            </div>





            {/* Users Table */}


            <div className="
                bg-white
                rounded-2xl
                shadow-sm
                border
                overflow-hidden
            ">



                <table className="
                    w-full
                ">


                    <thead>


                        <tr className="
                            bg-gray-100
                            text-gray-600
                            text-sm
                        ">


                            <th className="
                                p-4
                                text-left
                            ">
                                User
                            </th>



                            <th className="
                                p-4
                                text-left
                            ">
                                Email
                            </th>



                            <th className="
                                p-4
                                text-left
                            ">
                                Role
                            </th>



                            <th className="
                                p-4
                                text-center
                            ">
                                Action
                            </th>


                        </tr>


                    </thead>





                    <tbody>



                        {
                            users.map((user) => (


                                <tr

                                    key={user.id}

                                    className="
                                border-t
                                hover:bg-gray-50
                                transition
                                "

                                >



                                    {/* User */}


                                    <td className="
                                    p-4
                                ">


                                        <div className="
                                        flex
                                        items-center
                                        gap-3
                                    ">


                                            <div className="
                                            w-11
                                            h-11
                                            rounded-full
                                            bg-green-100
                                            flex
                                            items-center
                                            justify-center
                                        ">


                                                <UserIcon
                                                    className="
                                                w-6
                                                h-6
                                                text-green-600
                                                "
                                                />


                                            </div>



                                            <div>


                                                <p className="
                                                font-semibold
                                                text-gray-800
                                            ">

                                                    {user.name}

                                                </p>


                                                <p className="
                                                text-xs
                                                text-gray-500
                                            ">

                                                    ID #{user.id}

                                                </p>


                                            </div>



                                        </div>



                                    </td>







                                    {/* Email */}



                                    <td className="
                                    p-4
                                    text-gray-600
                                ">

                                        {user.email}

                                    </td>







                                    {/* Role */}



                                    <td className="p-4">


                                        {

                                            user.roles.length > 0

                                                ?

                                                (

                                                    <span className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        bg-green-100
                                        text-green-700
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                        font-semibold
                                    ">


                                                        <ShieldCheckIcon
                                                            className="
                                            w-4
                                            h-4
                                            "
                                                        />


                                                        {user.roles[0].name}


                                                    </span>

                                                )


                                                :

                                                (

                                                    <span className="
                                        bg-gray-100
                                        text-gray-500
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                    ">

                                                        No Role

                                                    </span>

                                                )


                                        }



                                    </td>







                                    {/* Action */}



                                    <td className="
                                    p-4
                                    text-center
                                ">


                                        <Link

                                            href={`/admin/users/${user.id}/manage`}

                                            className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        bg-blue-600
                                        hover:bg-blue-700
                                        text-white
                                        px-4
                                        py-2
                                        rounded-xl
                                        font-medium
                                        transition
                                        "

                                        >


                                            <PencilSquareIcon
                                                className="
                                            w-5
                                            h-5
                                            "
                                            />


                                            Manage


                                        </Link>



                                    </td>



                                </tr>


                            ))

                        }



                    </tbody>


                </table>



            </div>

        </div>

    );

}

// Extend a dashboard Page
Index.layout = page => (
    <AdminLayout>
        {page}
    </AdminLayout>
);


export default Index;