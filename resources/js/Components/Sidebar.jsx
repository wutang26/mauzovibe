import { useState } from "react";
// import { Link } from "@inertiajs/react";

import {
    HomeIcon,
    ShoppingCartIcon,
    CubeIcon,
    ChartBarIcon,
    UsersIcon,
    Cog6ToothIcon,
    ChevronDownIcon,
    BuildingStorefrontIcon,
    UserGroupIcon
} from "@heroicons/react/24/outline";


import { Link } from "@inertiajs/react";


export default function Sidebar({ open }) {


    const [settingsOpen, setSettingsOpen] = useState(false);


    const menu = [

        {
            name: "Dashboard",
            icon: HomeIcon,
            link: "dashboard"
        },

        {
            name: "Mauzo",
            icon: ShoppingCartIcon,
            link: "sales.index"
        },

        {
            name: "Bidhaa",
            icon: CubeIcon,
            link: "products.index"
        },

        {
            name: "Ripoti",
            icon: ChartBarIcon,
            link: "#"
        },

        {
            name: "Wateja",
            icon: UsersIcon,
            link: "#"
        },

    ];


    return (

        <div
            className={`
            fixed top-0 left-0 h-screen
            bg-slate-900 text-white
            transition-all duration-300
            ${open ? "w-64" : "w-20"}
            `}
        >


            {/* Logo */}

            <div className="p-5 text-xl font-bold">
                {
                    open ? "MauzoVibe" : "MV"
                }
            </div>



            <nav className="mt-5">


                {
                    menu.map((item, index) => {


                        const Icon = item.icon;


                        return (

                            <Link
                                key={index}
                                href={item.link}
                                className="
                                flex items-center gap-3
                                px-5 py-3
                                hover:bg-slate-800
                                transition
                                "
                            >

                                <Icon className="w-6 h-6" />


                                {
                                    open &&
                                    <span>
                                        {item.name}
                                    </span>
                                }


                            </Link>

                        )


                    })
                }



                {/* SETTINGS DROPDOWN */}

                <div>


                    <button

                        onClick={() => setSettingsOpen(!settingsOpen)}

                        className="
                    w-full flex items-center justify-between
                    px-5 py-3
                    hover:bg-slate-800
                    transition
                    "
                    >


                        <div className="flex items-center gap-3">

                            <Cog6ToothIcon
                                className="w-6 h-6"
                            />


                            {
                                open &&
                                <span>
                                    Settings
                                </span>
                            }


                        </div>



                        {
                            open &&
                            <ChevronDownIcon
                                className={`
                            w-5 h-5
                            transition
                            ${settingsOpen ? "rotate-180" : ""}
                            `}
                            />
                        }


                    </button>




                    {/* CHILD MENU */}

                    {
                        settingsOpen && open && (

                            <div className="
                            ml-10
                            border-l
                            border-slate-700
                            ">


                                <Link
                                    href={route('admin.branches.index')}
                                    className="
    flex items-center gap-2
    px-4 py-2
    text-sm
    hover:bg-slate-800
    "
                                >

                                    <BuildingStorefrontIcon
                                        className="w-5 h-5"
                                    />

                                    Branches

                                </Link>


                                <Link
                                    href={route('admin.users.index')}
                                    className="
    flex items-center gap-2
    px-4 py-2
    text-sm
    hover:bg-slate-800
    "
                                >

                                    <UserGroupIcon
                                        className="w-5 h-5"
                                    />

                                    Users

                                </Link>



                            </div>

                        )
                    }


                </div>



            </nav>



            <div className="absolute bottom-5 w-full">


                <div className="
                px-5
                text-xs
                text-gray-400
                ">
                    MauzoVibe v1.0
                </div>


            </div>



        </div>

    )

}