import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,            
      secure: true,         
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // Ensure this is a 16-digit App Password
      },
      connectionTimeout: 10000, // 10 seconds timeout
      tls: {
        rejectUnauthorized: false // Helps with production handshakes
      }
    });

    const mailOptions = {
      from: `"Sure Trust" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent: " + info.response);
    return info;
  } catch (error) {
    // This will show exactly why the OTP isn't arriving in your logs
    console.error("❌ NODEMAILER ERROR:", error.message);
    throw error; 
  }
};

export default sendEmail;