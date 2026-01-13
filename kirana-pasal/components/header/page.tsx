"use client"

import Link from "next/link"
import Router from "next/router"

export default function Header() {
    return (
        <div className="relative ">
            <header
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between
                   px-6 py-3 m-2 rounded-xl shadow-md
                   bg-gradient-to-r from-amber-200 via-red-200 to-pink-200 h-20">

                {/* Left: Logo */}
                <strong className="text-lg uppercase">
                    
                    <button 
                    type="button"
                    onClick={()=>Router.push('/')}
                    >
                    kirana pasal</button>
                </strong>

                {/* Center: Navigation */}
                <nav className="flex gap-6 font-medium">
                    <Link href="/">Home</Link>
                    <Link href="/products">Products</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>        
                </nav>

                {/* Right: Settings + Cart */}
                <div className="flex items-center gap-6">

                    {/* Settings Dropdown */}
                    <div className="relative group">
                        <button className="font-medium flex items-center gap-1">
                            Settings
                            <span className="text-sm">▾</span>
                        </button>

                        {/* Dropdown Menu */}
                        <div
                            className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg
               opacity-0 invisible group-hover:opacity-100 group-hover:visible
               transition-all duration-200"
                        >
                            <ul className="py-2 text-sm">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    Profile
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    Account
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </div>


                    {/* Cart */}
                    <div className="relative cursor-pointer">
                        <Link href="/cart" className="font-medium">
                            Cart🛒
                        </Link>

                        {/* Cart Count */}
                        <span
                            className="absolute -top-2 -right-2 bg-red-600 text-white text-xs
                         px-2 py-0.5 rounded-full">
                            0
                        </span>
                    </div>

                </div>
            </header>

            {/* Spacer for fixed header */}
            <div className="h-20"></div>
        </div>
    )
}
