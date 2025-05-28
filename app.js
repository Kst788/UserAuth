const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();
const { createUserTable } = require('./models/userModel');
const { createFoodTable } = require('./models/foodModel');

// 🟢 FIX: Import routes before using them
const authRoutes = require('./routes/authRoutes'); 
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());  
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'secretkey',
  resave: false,
  saveUninitialized: true,
}));

// 🟢 Now use the routes (after importing them)
app.use('/', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Schema creation
createUserTable();
createFoodTable();

// Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
