import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios

function EmployeeList() {
    const [employees, setEmployees] = useState([]);  // Initialize as an empty array
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('https://backend-8nriwtfsk-simran-code-48s-projects.vercel.app/dealsdray/employees', {
                    params: {
                        page: currentPage,
                        limit: 10, // Adjust limit as necessary
                    },
                });

                // Access the 'employees' and 'totalPages' from the response
                setEmployees(response.data.employees);
                setTotalPages(response.data.totalPages); // Use the totalPages from the backend
            } catch (error) {
                console.error('Error fetching employee data', error);
            }
        };

        fetchEmployees();
    }, [currentPage]);
    // Handle delete request
    const handleDelete = async (employeeId) => {
      try {

          const response = await axios.delete(`https://backend-8nriwtfsk-simran-code-48s-projects.vercel.app/dealsdray/employees/${employeeId}`);

          console.log('Employee deleted:', response.data);
          alert('Employee deleted successfully!');
      } catch (error) {
          console.error('Error deleting employee:', error);
          alert('Error deleting employee');
      }
  };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="container mx-auto bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Employee List</h2>
                <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-blue-600 text-white text-left">
                            <th className="p-4">ID</th>
                            <th className="p-4">Image</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Mobile</th>
                            <th className="p-4">Designation</th>
                            <th className="p-4">Gender</th>
                            <th className="p-4">Course</th>
                            <th className="p-4">Create Date</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                          employee.f_Name == 'last_id' ? '' :
                            <tr key={employee._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="p-4 text-gray-700">{employee.f_Id}</td>
                                <td className="p-4">
                                    <img
                                        src={`http://localhost:4000/${employee.f_Image}`}  // Assuming the backend serves the images
                                        alt={`${employee.f_Name}'s profile`}
                                        className="w-12 h-12 rounded-full"
                                    />
                                </td>
                                <td className="p-4 text-gray-700">{employee.f_Name}</td>
                                <td className="p-4 text-gray-700">{employee.f_Email}</td>
                                <td className="p-4 text-gray-700">{employee.f_Mobile}</td>
                                <td className="p-4 text-gray-700">{employee.f_Designation}</td>
                                <td className="p-4 text-gray-700">{employee.f_gender}</td>
                                <td className="p-4 text-gray-700">{employee.f_Course}</td>
                                <td className="p-4 text-gray-700">{new Date(employee.f_Createdate).toLocaleDateString()}</td>
                                <td className="p-4">
                                    <Link
                                        to={`/edit-employee/${employee.f_Id}`} 
                                        className="mr-2 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                                    >
                                        Edit
                                    </Link>
                                    <button 
                                     onClick={() => handleDelete(employee.f_Id)}
                                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Pagination Controls */}
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg disabled:opacity-50"
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg disabled:opacity-50"
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EmployeeList;
