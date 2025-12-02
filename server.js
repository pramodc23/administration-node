require('dotenv').config();
const cors = require("cors"); // Import CORS middleware
const errorHandler = require('./middlewares/errorHandler');
const config = require('./config/config');

require('./test');

const authRoutes = require('./routes/authRoutes');  
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const departmentRoute = require('./routes/departmentRoute');
const enrollmentRoute = require('./routes/enrollmentRoute');
const coursesRoute = require('./routes/coursesRoute');

const express = require('express');
const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
// Set template engine
app.set('view engine', 'ejs');
app.use(cors()); // Enable CORS for all routes
// Middleware
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/departments', departmentRoute);
app.use('/api/enrollments', enrollmentRoute);
app.use('/api/courses', coursesRoute);
app.get("/home", (req, res) => {
    res.render("home", { baseURL: process.env.BASEURL, myconstent:config.myconstent }); // Render the home.ejs template
});

app.get("/teachers",  (req, res) => {
    res.render("teachers", { baseURL: process.env.BASEURL, myconstent:config.myconstent }); 
});
app.get("/students",  (req, res) => {
    res.render("students", { baseURL: process.env.BASEURL, myconstent:config.myconstent }); 
});



app.get('/', (req,res)=>{
    res.render('login');
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

