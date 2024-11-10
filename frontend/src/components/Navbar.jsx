	const logo = "data:image/png;base64,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"
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaUserPlus } from 'react-icons/fa';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-blue-800 via-blue-600 to-indigo-600 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                <img src={logo} alt={`Logo's profile`} className="h-10 rounded-md" />
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

            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-15 right-0 w-1/3 h-full z-50 bg-slate-500 text-cyan-300 flex flex-col  space-y-4 py-4 px-6">
                    <Link
                        to="/dashboard"
                        className="text-lg  font-medium hover:text-gray-300 transition duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/employees"
                        className="text-lg font-medium hover:text-gray-300 transition duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Employees
                    </Link>
                    <Link
                        to="/create-employee"
                        className="text-lg font-medium hover:text-gray-300 transition duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Add Employee
                    </Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
