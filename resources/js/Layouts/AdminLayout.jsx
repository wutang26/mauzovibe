import React, { useState } from "react";
import Sidebar from "@/Components/Sidebar";
import Topbar from "@/Components/Topbar";
import Footer from "@/Components/Footer";


export default function AdminLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(true);


    return (

        <div className="min-h-screen bg-gray-100 flex">

            {/* Sidebar */}

            <Sidebar 
                open={sidebarOpen}
                setOpen={setSidebarOpen}
            />


            {/* Main Area */}

            <div 
                className={`flex-1 flex flex-col transition-all duration-300 
                ${sidebarOpen ? "ml-64" : "ml-20"}`}
            >


                <Topbar 
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                />


                <main className="flex-1 p-6">

                    {children}

                </main>


                <Footer />

            </div>


        </div>

    );
}