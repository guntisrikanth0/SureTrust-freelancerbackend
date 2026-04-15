import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // Create a transporter using the 'gmail' service shortcut
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS, // This must be the 16-digit App Password (no spaces)
    },
    // Adding a timeout and TLS bypass for better stability on Render
    connectionTimeout: 10000, 
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    // Adding quotes around the name "Sure Trust" is better for email delivery
    from: `"Sure Trust" <${process.env.SMTP_USER}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${options.to}`);
  } catch (error) {
    // This will print the exact reason to your Render logs if it fails again
    console.error("❌ Nodemailer Error:", error.message);
    throw error; 
  }
};

export default sendEmail;