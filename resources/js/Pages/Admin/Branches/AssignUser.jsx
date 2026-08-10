import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";


export default function AssignUser({ branch, users, roles }) {


    const form = useForm({

        user_id: ""

    });

    function submit(e) {

        e.preventDefault();


        form.post(
            `/admin/branches/${branch.id}/assign-user`
        );

    }



    return (

        <div className="p-6">


            <h1 className="
text-3xl
font-bold
text-gray-800
mb-6
">

                Assign User To {branch.name}

            </h1>



            <form
                onSubmit={submit}
                className="
bg-white
rounded-2xl
shadow
p-6
max-w-xl
"
            >


                <label className="font-semibold">

                    Select User

                </label>



                <select

                    className="
w-full
mt-3
border
rounded-xl
p-3
"

                    value={form.user_id}

                    onChange={
                        e => form.setData(
                            'user_id',
                            e.target.value
                        )
                    }

                >


                    <option value="">

                        Choose User

                    </option>


                    {
                        users.map(user => (

                            <option

                                key={user.id}

                                value={user.id}

                            >

                                {user.name}

                            </option>


                        ))

                    }


                </select>

                <label className="
font-semibold
mt-5
block
">

                    Select Role

                </label>


                <select

                    className="
w-full
mt-3
border
rounded-xl
p-3
"


                    value={form.role}


                    onChange={
                        e => form.setData(
                            'role',
                            e.target.value
                        )
                    }

                >


                    <option value="">

                        Choose Role

                    </option>


                    {
                        roles.map(role => (

                            <option

                                key={role.id}

                                value={role.name}

                            >

                                {role.name}

                            </option>

                        ))

                    }


                </select>


                <button

                    className="
mt-6
bg-blue-600
text-white
px-6
py-3
rounded-xl
"

                >

                    Assign Branch

                </button>



            </form>


        </div>


    );


}



AssignUser.layout = page => (

    <AdminLayout>

        {page}

    </AdminLayout>

);