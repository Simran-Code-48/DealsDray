// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaUserPlus } from 'react-icons/fa';

function Dashboard() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-3xl p-8 space-y-8 bg-white rounded-xl shadow-xl">
                <h2 className="text-3xl font-bold text-center text-gray-800">Welcome to the Admin Panel</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Link
                        to="/employees"
                        className="flex items-center p-6 space-x-4 bg-blue-100 text-blue-800 rounded-lg shadow-md hover:bg-blue-200 transition"
                    >
                        <FaUsers className="text-4xl" />
                        <span className="text-xl font-semibold">View Employee List</span>
                    </Link>
                    <Link
                        to="/create-employee"
                        className="flex items-center p-6 space-x-4 bg-green-100 text-green-800 rounded-lg shadow-md hover:bg-green-200 transition"
                    >
                        <FaUserPlus className="text-4xl" />
                        <span className="text-xl font-semibold">Create New Employee</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
