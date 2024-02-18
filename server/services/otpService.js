const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shahankhushdil@gmail.com',
    pass: 'ammq rgcz woor xwbb'
  }
});

function sendOTP(email, otp) {
  const mailOptions = {
    from: 'shahankhushdil+forgetpassword@gmail.com',
    to: email,
    subject: 'Password Reset OTP',
    text: `Your OTP for password reset is: ${otp}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = { sendOTP };
