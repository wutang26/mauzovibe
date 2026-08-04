import { useForm } from "@inertiajs/react";
import {
    ShieldCheckIcon,
    KeyIcon,
    UserCircleIcon
} from "@heroicons/react/24/outline";


export default function Manage({
    user,
    roles,
    permissions
}) {


    const roleForm = useForm({

        role: user.roles.length
            ? user.roles[0].name
            : ""

    });



    const permissionForm = useForm({

        permissions: user.permissions.map(
            permission => permission.name
        )

    });



    function submitRole(e) {

        e.preventDefault();

        roleForm.post(
            `/admin/users/${user.id}/role`
        );

    }



    function submitPermissions(e) {

        e.preventDefault();

        permissionForm.post(
            `/admin/users/${user.id}/permissions`
        );

    }



    return (

        <div className="p-6 bg-gray-50 min-h-screen">


            {/* Header */}

            <div className="
                bg-white 
                rounded-2xl 
                shadow-sm 
                border
                p-6 
                mb-6
                flex
                items-center
                justify-between
            ">


                <div className="flex items-center gap-4">


                    <div className="
                        w-16 h-16
                        rounded-full
                        bg-green-100
                        flex
                        items-center
                        justify-center
                    ">

                        <UserCircleIcon
                            className="w-10 h-10 text-green-600"
                        />

                    </div>



                    <div>

                        <h1 className="
                            text-2xl 
                            font-bold 
                            text-gray-800
                        ">
                            {user.name}
                        </h1>


                        <p className="text-gray-500">
                            Manage user access and permissions
                        </p>


                    </div>


                </div>




                <div>

                    <span className="
                        bg-green-100
                        text-green-700
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-semibold
                    ">

                        {user.roles.length
                            ? user.roles[0].name
                            : "No Role"
                        }

                    </span>

                </div>



            </div>





            <div className="
                grid
                md:grid-cols-2
                gap-6
            ">



                {/* Role Card */}


                <div className="
                    bg-white
                    rounded-2xl
                    shadow-sm
                    border
                    p-6
                ">


                    <div className="
                        flex
                        items-center
                        gap-3
                        mb-5
                    ">


                        <ShieldCheckIcon
                            className="
                            w-7 h-7
                            text-green-600
                            "
                        />


                        <h2 className="
                            text-xl
                            font-bold
                        ">
                            Assign Role
                        </h2>


                    </div>




                    <form onSubmit={submitRole}>


                        <div className="space-y-3">


                            {
                                roles.map(role => (

                                    <label
                                        key={role.id}
                                        className="
                                    flex
                                    items-center
                                    gap-3
                                    p-3
                                    rounded-lg
                                    border
                                    cursor-pointer
                                    hover:bg-gray-50
                                    "
                                    >


                                        <input

                                            type="radio"

                                            name="role"

                                            value={role.name}

                                            checked={
                                                roleForm.data.role === role.name
                                            }

                                            onChange={
                                                e =>
                                                    roleForm.setData(
                                                        "role",
                                                        e.target.value
                                                    )
                                            }

                                            className="
                                        w-5
                                        h-5
                                        text-green-600
                                        "
                                        />



                                        <span className="font-medium">

                                            {role.name}

                                        </span>


                                    </label>

                                ))
                            }


                        </div>



                        <button

                            className="
                            mt-6
                            w-full
                            bg-green-600
                            hover:bg-green-700
                            text-white
                            py-3
                            rounded-xl
                            font-semibold
                            transition
                            "

                        >

                            Save Role

                        </button>



                    </form>



                </div>







                {/* Permissions Card */}



                <div className="
                    bg-white
                    rounded-2xl
                    shadow-sm
                    border
                    p-6
                ">



                    <div className="
                        flex
                        items-center
                        gap-3
                        mb-5
                    ">


                        <KeyIcon
                            className="
                            w-7 h-7
                            text-blue-600
                            "
                        />


                        <h2 className="
                            text-xl
                            font-bold
                        ">
                            Permissions
                        </h2>


                    </div>





                    <form onSubmit={submitPermissions}>


                        <div className="
                            space-y-3
                            max-h-80
                            overflow-y-auto
                            pr-2
                        ">


                            {
                                permissions.map(permission => (

                                    <label
                                        key={permission.id}
                                        className="
                                    flex
                                    items-center
                                    justify-between
                                    p-3
                                    border
                                    rounded-lg
                                    hover:bg-gray-50
                                    cursor-pointer
                                    "
                                    >


                                        <span className="font-medium">

                                            {permission.name}

                                        </span>



                                        <input

                                            type="checkbox"


                                            checked={
                                                permissionForm.data.permissions.includes(
                                                    permission.name
                                                )
                                            }


                                            onChange={(e) => {


                                                let values = [
                                                    ...permissionForm.data.permissions
                                                ];


                                                if (e.target.checked) {

                                                    values.push(
                                                        permission.name
                                                    );

                                                } else {

                                                    values =
                                                        values.filter(
                                                            item =>
                                                                item !== permission.name
                                                        );

                                                }


                                                permissionForm.setData(
                                                    "permissions",
                                                    values
                                                );


                                            }}


                                            className="
                                        w-5
                                        h-5
                                        text-blue-600
                                        rounded
                                        "

                                        />



                                    </label>


                                ))
                            }


                        </div>




                        <button

                            className="
                            mt-6
                            w-full
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            py-3
                            rounded-xl
                            font-semibold
                            transition
                            "

                        >

                            Update Permissions

                        </button>




                    </form>


                </div>



            </div>



        </div>

    );

}