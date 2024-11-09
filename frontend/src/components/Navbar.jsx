// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaUserPlus } from 'react-icons/fa';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
	const logo = "../connecteam.jpg"
    return (
        <nav className=" bg-gradient-to-r from-blue-800 via-blue-600 to-indigo-600 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
			<img src={logo} alt={`Logo's profile`} className="w-100 h-10 rounded-md" />
                <div className="hidden md:flex space-x-8">
                    <Link
                        to="/dashboard"
                        className="text-lg font-medium hover:text-gray-300 transition duration-300 transform hover:scale-105"
                    >
                        <FaTachometerAlt className="inline mr-2" />
                        Dashboard
                    </Link>
                    <Link
                        to="/employees"
                        className="text-lg font-medium hover:text-gray-300 transition duration-300 transform hover:scale-105"
                    >
                        <FaUsers className="inline mr-2" />
                        Employees
                    </Link>
                    <Link
                        to="/create-employee"
                        className="text-lg font-medium hover:text-gray-300 transition duration-300 transform hover:scale-105"
                    >
                        <FaUserPlus className="inline mr-2" />
                        Add Employee
                    </Link>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-white focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-gradient-to-r from-blue-800 via-blue-600 to-indigo-600 text-white space-y-4 py-4 px-6">
                    <Link
                        to="/dashboard"
                        className="text-lg font-medium hover:text-gray-300 transition duration-300"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/employees"
                        className="text-lg font-medium hover:text-gray-300 transition duration-300"
                    >
                        Employees
                    </Link>
                    <Link
                        to="/create-employee"
                        className="text-lg font-medium hover:text-gray-300 transition duration-300"
                    >
                        Add Employee
                    </Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
