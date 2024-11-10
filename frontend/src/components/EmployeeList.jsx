import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

const vercelURL = 'https://backend-8nriwtfsk-simran-code-48s-projects.vercel.app';
const localhostURL = 'http://localhost:8080'
const backendURL = vercelURL;
function EmployeeList() {
    const [employees, setEmployees] = useState([
        {
            _id: '1',
            f_Id: 'EMP001',
            f_Name: 'Alice Johnson',
            f_Email: 'alice.johnson@example.com',
            f_Mobile: '1234567890',
            f_Designation: 'Software Engineer',
            f_gender: 'Female',
            f_Course: 'B.Tech',
            f_Createdate: '2024-11-01T12:00:00Z',
            f_Image: 'path/to/image1.jpg',
            f_Active: true,
        },
        {
            _id: '2',
            f_Id: 'EMP002',
            f_Name: 'Bob Smith',
            f_Email: 'bob.smith@example.com',
            f_Mobile: '0987654321',
            f_Designation: 'Project Manager',
            f_gender: 'Male',
            f_Course: 'MBA',
            f_Createdate: '2023-10-15T08:30:00Z',
            f_Image: 'path/to/image2.jpg',
        },
        {
            _id: '3',
            f_Id: 'EMP003',
            f_Name: 'Carol Williams',
            f_Email: 'carol.williams@example.com',
            f_Mobile: '1112223333',
            f_Designation: 'Data Analyst',
            f_gender: 'Female',
            f_Course: 'B.Sc',
            f_Createdate: '2022-09-10T16:45:00Z',
            f_Image: 'path/to/image3.jpg',
            f_Active: true,
        },
        {
            _id: '4',
            f_Id: 'EMP004',
            f_Name: 'David Brown',
            f_Email: 'david.brown@example.com',
            f_Mobile: '2223334444',
            f_Designation: 'System Architect',
            f_gender: 'Male',
            f_Course: 'M.Tech',
            f_Createdate: '2023-05-05T14:15:00Z',
            f_Image: 'path/to/image4.jpg',
        },
        {
            _id: '5',
            f_Id: 'EMP005',
            f_Name: 'Eve Davis',
            f_Email: 'eve.davis@example.com',
            f_Mobile: '3334445555',
            f_Designation: 'QA Engineer',
            f_gender: 'Female',
            f_Course: 'B.Tech',
            f_Createdate: '2024-02-20T10:20:00Z',
            f_Image: 'path/to/image5.jpg',
            f_Active: true,
        },
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState(''); 
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [activeFilter, setActiveFilter] = useState('all')

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`${backendURL}/dealsdray/employees`, {
                    params: {
                        page: currentPage,
                        limit: 10,
                    },
                });

                setEmployees(response.data.employees);
                setTotalPages(response.data.totalPages); 
            } catch (error) {
                console.error('Error fetching employee data', error);
            }
        };

        fetchEmployees();
    }, [currentPage]);
    const filteredEmployees = employees.filter(employee => {
        const matchesSearch = 
            employee.f_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.f_Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.f_Mobile.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesActiveFilter =
            activeFilter === 'all' ||
            (activeFilter === 'active' && employee.f_Active) ||
            (activeFilter === 'deactive' && !employee.f_Active);

        return matchesSearch && matchesActiveFilter;}
    );
    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
        if (sortConfig.key) {
            const valueA = a[sortConfig.key];
            const valueB = b[sortConfig.key];

            if (valueA < valueB) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
        }
        return 0;
    });

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };
    const handleDelete = async (employeeId) => {
      try {

          const response = await axios.delete(`${backendURL}/dealsdray/employees/${employeeId}`);

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
                <input
                    type="text"
                    placeholder="Search by name, email, or mobile"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
                />
                <div className="mb-4">
                    <label htmlFor="statusFilter" className="mr-2 text-gray-700">Status:</label>
                    <select
                        id="statusFilter"
                        value={activeFilter}
                        onChange={(e) => setActiveFilter(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="deactive">Deactive</option>
                    </select>
                </div>
                <div className='overflow-x-auto'>
                <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-blue-600 text-white text-left">
                        <th className="p-4 cursor-pointer" onClick={() => handleSort('f_Id')}>
                                ID {sortConfig.key === 'f_Id' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                            </th>
                            <th className="p-4">Image</th>
                            <th className="p-4 cursor-pointer" onClick={() => handleSort('f_Name')}>
                                Name {sortConfig.key === 'f_Name' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                            </th>
                            <th className="p-4 cursor-pointer" onClick={() => handleSort('f_Email')}>
                                Email {sortConfig.key === 'f_Email' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                            </th>
                            <th className="p-4">Mobile</th>
                            <th className="p-4">Designation</th>
                            <th className="p-4">Gender</th>
                            <th className="p-4">Course</th>
                            <th className="p-4 cursor-pointer" onClick={() => handleSort('f_Createdate')}>
                                Create Date {sortConfig.key === 'f_Createdate' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                            </th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                            <th className="p-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedEmployees.map(employee => (
                          employee.f_Name == 'last_id' ? '' :
                            <tr key={employee._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="p-4 text-gray-700">{employee.f_Id}</td>
                                <td className="p-4">
                                    <img
                                        src={`${localhostURL}/${employee.f_Image}`}  // Assuming the backend serves the images
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
                                <td className="p-4 text-gray-700">{employee.f_Active ? 'Active' : 'Deactive'}</td>
                                <td className="p-4">
                                    <Link
                                        to={`/edit-employee/${employee.f_Id}`} 
                                        className="mr-2 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                                    >
                                        Edit
                                    </Link>
                                </td>
                                <td className="p-4">
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
                </div>
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
