"use client"
import React, { useState } from "react"
import Adminsidebar from "./component/adminsidebar";
import { Menu } from "lucide-react";
import ProtectedRoute from "@/protectedRoutes";


type Props = {
    children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {

    const [mobileMenu, setMobileMenu] = useState(false)

    return (
        <>
            <ProtectedRoute allowedRole="ADMIN">

                <div className="min-h-screen flex bg-gradient-to-bl from-slate-900 via-zinc-700 to-blue-950">

                    <Adminsidebar mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />

                    <div className="flex-1 flex flex-col">

                        <header className="h-16 w-full bg-zinc-600/95 backdrop shadow-2xl shadow-blue/20 flex items-center justify-between px-4">

                            <button
                                onClick={() => setMobileMenu(prev => !prev)}
                                className={`md:hidden fixed top-4 z-50 p-2 rounded-lg bg-white/10 backdrop-blur-md transition-all duration-300 ${mobileMenu ? "left-47 text-black border-2 border-black" : "left-4"}`}>
                                <Menu />
                            </button>

                            <div className="relative ml-12 md:ml-0 lg:ml-0">
                                <h2 className="text-2xl font-bold">
                                    Dashboard
                                </h2>
                            </div>
                            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        </header>

                        <main className="flex-1 p-4 text-white">
                            {children}
                        </main>

                    </div>

                </div>
            </ProtectedRoute>
        </>
    )
}

