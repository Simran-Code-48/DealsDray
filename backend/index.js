const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const { Login, Employee } = require('./models'); // Assume models.js is defined as earlier
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000;
// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// MongoDB connection (replace 'your_database_name' with your actual database name)
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err)); 

// Configure multer for image uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  }),
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only JPG and PNG files are allowed'), false);
    }
  }
});

app.post('/dealsdray/register', async (req, res) => {
	console.log("Admin Register : ",req.body);
	const {f_userName, f_Pwd} = req.body;
  if(!f_userName || !f_Pwd) {
    return res.status(401).json({message: 'All fields are required'});
  }
	const exists = await Login.findOne({f_userName});
	if(exists) {
		return res.status(401).json({message: 'Already registered'});
	}
	metadata = await Login.findOne({f_userName:"last_sno"});
	metadata.f_sno++; 
	metadata = await Login.findOneAndUpdate({f_userName:"last_sno"},metadata ,{new:true});
	const hashedPassword = await bcrypt.hash(f_Pwd, 10);
	const newAdmin = new Login({
		f_sno:metadata.f_sno,
		f_userName,
		f_Pwd: hashedPassword
  });
  try {
    await newAdmin.save();
    res.json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error Admin registering', error });
  }
})
// Endpoint: POST /dealsdray/login --complete
app.post('/dealsdray/login', async (req, res) => {
  console.log("Admin Login : ", req.body);
  const { f_userName, f_Pwd } = req.body;
  
  if (!f_userName || !f_Pwd) {
      return res.status(401).json({ message: 'All fields are required' });
  }

  try {
      const user = await Login.findOne({ f_userName });
      
      if (user && bcrypt.compareSync(f_Pwd, user.f_Pwd)) {
          return res.json({ message: 'Success', redirect: '/dashboard' });
      } else {
          return res.status(401).json({ message: 'Invalid login credentials' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});


// Endpoint: POST /dealsdray/employees
const uploadImage = upload.single('f_Image');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/dealsdray/employees', upload.single('f_Image'), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  console.log("Create new employee : ", req.body);

  const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;

  // Validate required fields
  if (!f_Name || !f_Email || !f_Mobile || !f_Designation || !f_gender) {
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (unlinkError) => {
        if (unlinkError) {
          console.error("Failed to delete uploaded file:", unlinkError);
        }
      });
    }
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if the email already exists
  const emailExists = await Employee.findOne({ f_Email });
  if (emailExists) {
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (unlinkError) => {
        if (unlinkError) {
          console.error("Failed to delete uploaded file:", unlinkError);
        }
      });
    }
    return res.status(400).json({ message: 'Email already exists' });
  }
  metadata = await Employee.findOne({f_Name:"last_id"});

  // Create a new employee document without the image
  const newEmployee = new Employee({
    f_Id: metadata.f_Id,
    f_Name,
    f_Email,
    f_Mobile,
    f_Designation,
    f_gender,
    f_Course,
    f_Image: req.file ? req.file.path : ''  // Save file path if available
  });

  try {
    // Save the employee in MongoDB
    const savedEmployee = await newEmployee.save();
    metadata.f_Id++; 
	  metadata = await Employee.findOneAndUpdate({f_Name:"last_id"},metadata ,{new:true});
    res.json({ message: 'Employee created successfully', employee: savedEmployee });
  } catch (error) {
    // Remove the uploaded image if document save fails
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (unlinkError) => {
        if (unlinkError) {
          console.error("Failed to delete uploaded file:", unlinkError);
        }
      });
    }
    res.status(500).json({ message: 'Error creating employee', error });
  }
});




// Endpoint: GET /dealsdray/employees --complete
app.get('/dealsdray/employees', async (req, res) => {
  console.log("employees list request")
  const { page = 1, limit = 10, sortBy = 'f_Name', sortOrder = 'asc' } = req.query;
  const skip = (page - 1) * limit;
  const sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  try {
    const employees = await Employee.find()
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));
      
    // Get total employee count for pagination
    const totalEmployees = await Employee.countDocuments();

    res.json({
      employees,
      totalPages: Math.ceil(totalEmployees / limit),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee list', error });
  }
});


// // Endpoint: GET /dealsdray/employees/:id
app.get('/dealsdray/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findOne({ f_Id: req.params.id });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    // Construct image URL
    const imageUrl = employee.f_Image ? `${req.protocol}://${req.get('host')}/uploads/${path.basename(employee.f_Image)}` : null;

    res.json({ ...employee.toObject(), f_Image: imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error });
  }
});

// Endpoint: PUT /dealsdray/employees/:id 1731103497360-iphone.png
app.put('/dealsdray/employees/:id', upload.single('f_Image'), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;
  // console.log(req.file.path);
  if (!f_Name || !f_Email || !f_Mobile || !f_Designation || !f_gender) {
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (unlinkError) => {
        if (unlinkError) {
          console.error("Failed to delete uploaded file:", unlinkError);
        }
      });
    }
    return res.status(400).json({ message: 'All fields are required' });
  }

  const employee = await Employee.findOne({ f_Id:req.params.id });
  if (!employee) {
    return res.status(400).json({ message: 'Account does not exists' });
  }
  if(employee.f_Image){
    fs.unlink(`uploads/${path.basename(employee.f_Image)}`, (unlinkError) => {
      if (unlinkError) {
        console.error("Failed to delete uploaded file:", unlinkError);
      }
    });
  }

  const updatedData = {
    f_Name,
    f_Email,
    f_Mobile,
    f_Designation,
    f_gender,
    f_Course,
    f_Image: req.file ? req.file.path : employee.f_Image 
  };

  try {
    const employee = await Employee.findOneAndUpdate({f_Id: req.params.id}, updatedData, { new: true });
    res.json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error });
  }
});

// Endpoint: DELETE /dealsdray/employees/:id
app.delete('/dealsdray/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findOne({ f_Id: req.params.id});
    console.log(employee);
    if(employee.f_Image){
      fs.unlink(`uploads/${path.basename(employee.f_Image)}`, (unlinkError) => {
        if (unlinkError) {
          console.error("Failed to delete uploaded file:", unlinkError);
        }
      });
    }
    await Employee.findOneAndDelete({ f_Id: req.params.id});
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error });
  }
});

// Endpoint: PUT /dealsdray/employees/:id/status
app.put('/dealsdray/employees/:id/status', async (req, res) => {
  try {
    const employee = await Employee.findOne({f_Id:req.params.id});
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    employee.active = !employee.active; // Toggle status
    await employee.save();
    res.json({ message: `Employee ${employee.active ? 'activated' : 'deactivated'} successfully`, employee });
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee status', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
