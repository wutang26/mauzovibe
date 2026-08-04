import { 
    Bars3Icon,
    BellIcon,
    ChevronDownIcon
} from "@heroicons/react/24/outline";

import { useState } from "react";


export default function Topbar({ toggleSidebar }) {

    const [open, setOpen] = useState(false);


    return (

        <header
            className="
            h-16 bg-white shadow
            flex items-center justify-between
            px-6
            "
        >

            {/* Sidebar Toggle */}
            <button onClick={toggleSidebar}>
                <Bars3Icon className="w-7 h-7" />
            </button>



            {/* Right Section */}
            <div className="flex items-center gap-5">


                {/* Notification */}
                <button>
                    <BellIcon className="w-6 h-6 text-gray-600" />
                </button>



                {/* Profile Dropdown */}
                <div className="relative">


                    <button
                        onClick={() => setOpen(!open)}
                        className="
                        flex items-center gap-3
                        hover:bg-gray-100
                        px-3 py-2 rounded-lg
                        "
                    >

                        <div className="text-right">

                            <p className="font-semibold">
                                Admin
                            </p>

                            <p className="text-xs text-gray-500">
                                Main Branch
                            </p>

                        </div>


                        <ChevronDownIcon 
                            className="w-5 h-5 text-gray-500"
                        />


                    </button>



                    {open && (

                        <div
                            className="
                            absolute right-0 mt-2
                            w-52
                            bg-white
                            rounded-lg
                            shadow-lg
                            border
                            py-2
                            z-50
                            "
                        >


                            <a
                                href="/profile"
                                className="
                                block px-4 py-2
                                text-gray-700
                                hover:bg-gray-100
                                "
                            >
                                👤 View Profile
                            </a>



                            <a
                                href="/password"
                                className="
                                block px-4 py-2
                                text-gray-700
                                hover:bg-gray-100
                                "
                            >
                                🔒 Change Password
                            </a>



                            <hr className="my-2"/>



                            <button
                                className="
                                w-full text-left
                                px-4 py-2
                                text-red-600
                                hover:bg-red-50
                                "
                            >
                                🚪 Logout
                            </button>


                        </div>

                    )}


                </div>


            </div>


        </header>

    )

}