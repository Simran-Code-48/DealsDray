import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EmployeeForm() {
    const { id } = useParams(); // Get the employeeId from the URL parameter
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: [],
        image: null,
    });

    // Fetch employee data from the API when the component mounts
    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get(`https://backend-8nriwtfsk-simran-code-48s-projects.vercel.app/dealsdray/employees/${id}`);
                const data = response.data;
                setEmployee({
                    name: data.f_Name,
                    email: data.f_Email,
                    mobile: data.f_Mobile,
                    designation: data.f_Designation,
                    gender: data.f_gender,
                    course: data.f_Course,
                    image: data.f_Image,
                });
            } catch (error) {
                console.error('Error fetching employee data:', error);
                alert('Error fetching employee data');
            }
        };

        fetchEmployeeData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleFileChange = (e) => {
        setEmployee({ ...employee, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData to send the form data along with the image
        const formData = new FormData();
        formData.append('f_Name', employee.name);
        formData.append('f_Email', employee.email);
        formData.append('f_Mobile', employee.mobile);
        formData.append('f_Designation', employee.designation);
        formData.append('f_gender', employee.gender);
        formData.append('f_Course', employee.course);
        if (employee.image) {
            formData.append('f_Image', employee.image);
        }

        try {
            const response = await axios.put(`https://backend-8nriwtfsk-simran-code-48s-projects.vercel.app/dealsdray/employees/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Employee updated:', response.data);
            alert('Employee updated successfully!');
        } catch (error) {
            console.error('Error updating employee:', error);
            alert('Error updating employee');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg space-y-6">
                <h2 className="text-3xl font-bold text-center text-blue-600">Edit Employee</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={employee.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={employee.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile No"
                        value={employee.mobile}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        name="designation"
                        value={employee.designation}
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
                                checked={employee.gender === 'Male'}
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
                                checked={employee.gender === 'Female'}
                                onChange={handleChange}
                                className="form-radio h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">Female</span>
                        </label>
                    </div>
                    {/* Checkbox for Course Selection */}
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="course"
                                value="MCA"
                                checked={employee.course.includes('MCA')}
                                onChange={handleChange}
                                className="h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">MCA</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="course"
                                value="BCA"
                                checked={employee.course.includes('BCA')}
                                onChange={handleChange}
                                className="h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">BCA</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="course"
                                value="BSC"
                                checked={employee.course.includes('BSC')}
                                onChange={handleChange}
                                className="h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">BSC</span>
                        </div>
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
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EmployeeForm;
