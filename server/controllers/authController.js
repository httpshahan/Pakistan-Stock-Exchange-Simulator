const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail, createAdmin, getAdminByEmail } = require('../models/User');
const pool = require('../db/pool');

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

    res.json({ token, userId: user.id , username: user.username});
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
      return res.status(401).json({ error: 'Invalid email or password' });
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

module.exports = { register, login, registerAdmin, admin };
