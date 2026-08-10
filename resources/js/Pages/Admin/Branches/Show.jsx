import { Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {ArrowLeftIcon} from "@heroicons/react/24/outline";


export default function Show({ branch }) {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            <div className="bg-white rounded-2xl shadow p-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            🏪 {branch.name}
                        </h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">

                        <div className="text-gray-500 font-medium">
                            📍 {branch.location ?? "No Location"}
                        </div>

                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl font-semibold">
                            👥 {branch.users_count} Users
                        </div>

                        <Link

                    href={route("admin.branches.index")}

                    className="
                    flex
                    items-center
                    gap-2
                    bg-white
                    border
                    px-4
                    py-2
                    rounded-xl
                    hover:bg-gray-100
                    "

                >

                    <ArrowLeftIcon
                        className="
                        w-5
                        h-5
                        "
                    />

                    Back

                </Link>


                    </div>

                </div>

                {/* Users */}
                <div className="mt-8">

                    <h2 className="text-xl font-bold mb-4">
                        Assigned Users
                    </h2>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="bg-gray-100">

                                    <th className="p-3 text-left font-semibold">
                                        User
                                    </th>

                                    <th className="p-3 text-left font-semibold">
                                        Role
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {branch.users.map((user) => (

                                    <tr
                                        key={user.id}
                                        className="border-t hover:bg-gray-50"
                                    >

                                        <td className="p-3 font-medium">
                                            {user.name}
                                        </td>

                                        <td className="p-3">

                                            {user.roles.length > 0 ? (

                                                <div className="flex flex-wrap gap-2">

                                                    {user.roles.map((role) => (

                                                        <span
                                                            key={role.id}
                                                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                                                        >
                                                            {role.name}
                                                        </span>

                                                    ))}

                                                </div>

                                            ) : (

                                                <span className="text-gray-500">
                                                    No Role
                                                </span>

                                            )}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}

Show.layout = (page) => (
    <AdminLayout>
        {page}
    </AdminLayout>
);