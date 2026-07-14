"use client"
import { Calendar, ChevronFirst, ChevronLast, LayoutDashboard, Projector } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type AdminSidebarProps = {
    mobileMenu: boolean;
    setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Adminsidebar = ({ mobileMenu, setMobileMenu }: AdminSidebarProps) => {
    const [expand, setExpand] = useState(true);

    const navItem = [
        { name: "Dashboard", icon: <LayoutDashboard />, href: "/dashboard" },
        { name: "Project", icon: <Projector />, href: "/project" },
        { name: "Calendar", icon: <Calendar />, href: "/calendar" },
    ]
    const pathname = usePathname();

    return (
        <>
            {mobileMenu && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setMobileMenu(false)}
                />
            )}
            <div className={`fixed md:relative top-0 left-0 h-screen ${expand ? "w-60" : "w-20"} ${mobileMenu ? "bg-white text-black" : "bg-white/10 backdrop-blur-md"} shadow-2xl shadow-white/20 p-4 z-40 transform transition-transform duration-300 ease-in-out ${mobileMenu ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>

                <div className='flex justify-between items-center'>
                    <div className='logo'>
                        <h3 className={`text-2xl text-center font-bold ${(mobileMenu || expand) ? "block p-1" : "hidden"}`}>
                            Logo
                        </h3>
                    </div>
                    <button className={`p-1.5 rounded-lg bg-white/10 hover:cursor-pointer transition ease-in delay-150 z-20 ${expand ? "m-0" : "mr-2"} ${mobileMenu ? "hidden" : "block"}`} onClick={() => setExpand(prv => !prv)}>
                        {expand ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>
                <div className="flex flex-col mt-6">
                    {
                        navItem.map((items, idx) => {
                            const isActive = pathname === items.href
                            return (
                                <Link
                                    key={idx}
                                    href={items.href}
                                    className={`flex items-center justify-between gap-3 p-2 rounded transition ${mobileMenu ? "my-2 py-2" : "m-0"}   ${isActive
                                        ? 'bg-gradient-to-bl from-slate-900 via-zinc-700 to-blue-950 rounded'
                                        : 'text-white hover:bg-blue-950 my-1 hover:text-white'
                                        }`}>
                                    <div className={`text-[18px] ${expand ? "block" : "hidden"}`}>
                                        {items.name}
                                    </div>

                                    <span className={`font-bold`}>
                                        {items.icon}
                                    </span>

                                </Link>)
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Adminsidebar


