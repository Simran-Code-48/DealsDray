// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import CreateEmployeeForm from './components/CreateEmployeeForm';
import EditEmployeeForm from './components/EditEmployeeForm';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/create-employee" element={<CreateEmployeeForm />} />
                <Route path="/edit-employee/:id" element={<EditEmployeeForm />} />
            </Routes>
        </Router>
    );
}

export default App;
