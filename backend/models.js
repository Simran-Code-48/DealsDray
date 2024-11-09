const mongoose = require('mongoose');

// Connect to MongoDB (replace 'your_database_name' with the actual database name)
// mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

// Schema and model for t_login collection
const loginSchema = new mongoose.Schema({
  f_sno: { type: Number, required: true },
  f_userName: { type: String, required: true },
  f_Pwd: { type: String, required: true }
});

const Login = mongoose.model('t_login', loginSchema);

// Schema and model for t_Employee collection
const employeeSchema = new mongoose.Schema({
  f_Id: { type: Number, required: true },
  f_Image: { type: String },
  f_Name: { type: String, required: true },
  f_Email: { type: String, required: true },
  f_Mobile: { type: String, required: true },
  f_Designation: { type: String, required: true },
  f_gender: { type: String, required: true },
  f_Course: { type: String },
  f_Createdate: { type: Date, default: Date.now }
});

const Employee = mongoose.model('t_Employee', employeeSchema);

module.exports = { Login, Employee };
