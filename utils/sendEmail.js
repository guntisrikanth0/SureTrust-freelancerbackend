import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    // Using host and port exactly like your original code
    host: 'smtp.gmail.com',
    port: 465,            // Changed to 465
    secure: true,         // Changed to true (required for 465)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS, // 16-digit App Password, no spaces
    },
    // Add these two lines to help Render stay connected
    connectionTimeout: 10000, 
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: `"Sure Trust" <${process.env.SMTP_USER}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;