// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/adminRegister', authController.registerAdmin);
router.post('/admin', authController.admin);


module.exports = router;
