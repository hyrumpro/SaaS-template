"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import Profile from "@/components/Profile";
import { Button } from "@/components/ui/button";

export default function NavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-white shadow-md fixed w-full z-50">
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

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {/* Search Bar */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-300"
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        {/* Profile */}
                        <Profile />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMobileMenu}
                            aria-label="Toggle Menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <div className="px-4 pt-2 pb-4 space-y-3">
                        {/* Search Bar */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-300"
                            />
                            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                            <Profile />
                        </div>

                    </div>
                </div>
            )}
        </nav>
    );
}
