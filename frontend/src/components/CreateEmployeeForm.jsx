import React, { useState } from 'react';
import axios from 'axios'; // For making API requests

function EmployeeForm() {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: [],
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleFileChange = (e) => {
        setEmployee({ ...employee, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('f_Name', employee.name);
        formData.append('f_Email', employee.email);
        formData.append('f_Mobile', employee.mobile);
        formData.append('f_Designation', employee.designation);
        formData.append('f_gender', employee.gender);
        formData.append('f_Course', JSON.stringify(employee.course));
        if (employee.image) {
            formData.append('f_Image', employee.image);
        }

        try {
            const response = await axios.post('https://backend-8nriwtfsk-simran-code-48s-projects.vercel.app/dealsdray/employees', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Employee created successfully:', response.data);
            // Handle response (e.g., success message)
        } catch (error) {
            console.error('Error creating employee:', error.response ? error.response.data : error.message);
            // Handle error (e.g., display error message)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg space-y-6">
                <h2 className="text-3xl font-bold text-center text-blue-600">Create Employee</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile No"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        name="designation"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                onChange={handleChange}
                                className="form-radio h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">Male</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                onChange={handleChange}
                                className="form-radio h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">Female</span>
                        </label>
                    </div>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg"
                        
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EmployeeForm;
