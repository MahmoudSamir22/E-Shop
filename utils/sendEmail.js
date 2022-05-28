const nodemailer = require("nodemailer");
const sendEmail = async (options) => {
  // 1) Create transporter (service that will send email like "Gmail", "MialTrap")
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT, // if secure false port = 587 , if true port = 465
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 2) Define Email options (like from, to, subject)
  const mailOptions = {
    from: "E-Shop Udemy Course",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  // 3) Send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
