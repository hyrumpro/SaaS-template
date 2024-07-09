import React from "react";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import Profile from "@/components/Profile";
import { Button } from "@/components/ui/button";

export default function NavBar() {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0">
                            <img
                                className="h-8 w-auto"
                                src="/logo.svg"
                                alt="Company Logo"
                            />
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-300"
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        <Profile />
                    </div>
                    <div className="flex md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}