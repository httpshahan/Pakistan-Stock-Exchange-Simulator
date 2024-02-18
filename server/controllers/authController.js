const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail, createAdmin, getAdminByEmail, getAllUsers } = require('../models/User');
const pool = require('../db/pool');

const resetService = require('../services/resetService');

// User registration
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    console.log("Register Api Called");
    // Check if the email is already registered
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = await createUser(username, email, hashedPassword);

    
    // Create JWT token
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: newUser.id });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// user Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'Invalid email or password' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Password Does Not Match' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, userId: user.id , username: user.username, balance: user.balance, email: user.email});
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// admin Registration

const registerAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  try {

    console.log("Register Api Called");
    // Check if the email is already registered
    const existingAdmin = await getAdminByEmail(email);
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin Email is already registered' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newAdmin = await createAdmin(username, email, hashedPassword);

    
    // Create JWT token
    const token = jwt.sign({ adminId: newAdmin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, adminId: newAdmin.id });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//admin Login
const admin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const admin = await getAdminByEmail(email);
    if (!admin) {
      return res.status(404).json({ error: 'Invalid email' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("Login SuccesFull");
    res.json({ token, adminId: admin.id });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// get all users
const getAllUsersData = async (req, res) => {
  try {
    const users = await getAllUsers();
    //response should onle user name and balance
    const usersData = users.map(user => {
      return { username: user.username, balance: user.balance, email: user.email, id: user.id};
    });
    res.json(usersData);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const initiateReset = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Email", email);
    const result = await resetService.initiateReset(email);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyReset = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log("Email", email);
    console.log("OTP", otp);
    const result = await resetService.verifyReset(email, otp);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await resetService.resetPassword(email, hashedPassword);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { register, login, registerAdmin, admin, getAllUsersData, initiateReset, verifyReset, resetPassword};
