// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/adminRegister', authController.registerAdmin);
router.post('/admin', authController.admin);

// forget password
router.post('/initiateReset', authController.initiateReset);
router.post('/verifyReset', authController.verifyReset);
router.post('/update-password', authController.resetPassword);

router.get('/users', authController.getAllUsersData);
module.exports = router;
