const Reset = require('../models/Reset');
const { sendOTP } = require('./otpService');

async function initiateReset(email) {
  const otp = generateOTP();
  await Reset.initiateReset(email, otp);
  sendOTP(email, otp);
  return 'OTP sent to your email';
}

async function verifyReset(email, otp) {
  return await Reset.verifyReset(email, otp);
}

function generateOTP() {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

module.exports = { initiateReset, verifyReset };
