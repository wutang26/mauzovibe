import { Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

import {
    BuildingStorefrontIcon,
    MapPinIcon,
    UsersIcon,
    PencilSquareIcon,
    UserPlusIcon,
    EyeIcon
} from "@heroicons/react/24/outline";


function Index({ branches }) {


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

                        Branch Management

                    </h1>


                    <p className="
                        text-gray-500
                        mt-1
                    ">

                        Manage your shops, locations and branch users

                    </p>


                </div>



                <Link

                    href="/admin/branches/create"

                    className="
                    flex
                    items-center
                    gap-2
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-5
                    py-3
                    rounded-xl
                    font-semibold
                    shadow
                    transition
                    "

                >

                    + Add Branch

                </Link>


            </div>






            {/* Table */}


            <div className="
                bg-white
                rounded-2xl
                shadow-sm
                border
                overflow-hidden
            ">


                <table className="w-full">


                    <thead>


                        <tr className="
                            bg-gray-100
                            text-gray-600
                            text-sm
                        ">


                            <th className="p-4 text-left">
                                Branch
                            </th>


                            <th className="p-4 text-left">
                                Location
                            </th>


                            <th className="p-4 text-center">
                                Users
                            </th>


                            <th className="p-4 text-center">
                                Assign User
                            </th>


                            <th className="p-4 text-center">
                                Action
                            </th>


                        </tr>


                    </thead>





                    <tbody>


                        {


                            branches.map(branch => (


                                <tr

                                    key={branch.id}

                                    className="
                        border-t
                        hover:bg-gray-50
                        transition
                        "

                                >



                                    {/* Branch */}


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
                                        bg-blue-100
                                        flex
                                        items-center
                                        justify-center
                                    ">


                                                <BuildingStorefrontIcon

                                                    className="
                                        w-7
                                        h-7
                                        text-blue-600
                                        "

                                                />


                                            </div>



                                            <div>


                                                <p className="
                                            font-semibold
                                            text-gray-800
                                        ">

                                                    {branch.name}

                                                </p>


                                                <p className="
                                            text-xs
                                            text-gray-500
                                        ">

                                                    Branch ID #{branch.id}

                                                </p>


                                            </div>


                                        </div>


                                    </td>







                                    {/* Location */}


                                    <td className="p-4">


                                        <div className="
                                    flex
                                    items-center
                                    gap-2
                                    text-gray-600
                                ">


                                            <MapPinIcon

                                                className="
                                    w-5
                                    h-5
                                    text-red-500
                                    "

                                            />


                                            {branch.location ?? "No Location"}


                                        </div>


                                    </td>







                                    {/* Users */}


                                    <td className="
                                p-4
                                text-center
                            ">


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


                                            <UsersIcon

                                                className="
                                    w-4
                                    h-4
                                    "

                                            />


                                            {branch.users_count} Users


                                        </span>


                                    </td>







                                    {/* Assign User */}


                                    <td className="
                                p-4
                                text-center
                            ">


                                        <Link

                                            href={`/admin/branches/${branch.id}/assign-user`}


                                            className="
                                inline-flex
                                items-center
                                gap-2
                                bg-purple-600
                                hover:bg-purple-700
                                text-white
                                px-4
                                py-2
                                rounded-xl
                                font-medium
                                transition
                                "


                                        >


                                            <UserPlusIcon

                                                className="
                                    w-5
                                    h-5
                                    "

                                            />


                                            Assign User


                                        </Link>


                                    </td>








                                    {/* Action */}


                                    {/* Action */}

                                    <td className="
    p-4
    text-center
">


                                        <div className="
flex
justify-center
gap-2
">


                                            {/* View Branch */}

                                            <Link

                                                href={route('branches.show', branch.id)}

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


                                                <EyeIcon

                                                    className="
w-5
h-5
"

                                                />


                                                View


                                            </Link>





                                            {/* Manage Branch */}

                                            <Link

                                                href={`/admin/branches/${branch.id}/edit`}


                                                className="
inline-flex
items-center
gap-2
bg-green-600
hover:bg-green-700
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


                                        </div>


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





Index.layout = page => (

    <AdminLayout>

        {page}

    </AdminLayout>

);


export default Index;