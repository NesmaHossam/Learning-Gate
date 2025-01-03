const nodemailer = require("nodemailer");

const sendEmail = async (recipientEmail, subject, htmlBody) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
      },
    });

    let info = await transporter.sendMail({
      from: "learninggate.scu@gmail.com",
      to: recipientEmail,
      subject: subject,
      html: htmlBody,
    });

    console.log("Email sent:", info);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
