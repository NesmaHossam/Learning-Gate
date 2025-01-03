const User = require("../models/User");
const emailSender = require("../utils/emailSender");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const generateEmailTemplate = (subject, content) => {
  return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>${subject}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 10px;
                background-color: #ffffff;
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .logo {
                width: 150px;
            }
            .title {
                font-size: 24px;
                color: #333;
                margin-bottom: 20px;
                text-align: left;
            }
            .content {
                color: #555;
                text-align: left;
            }
            .content span {
                font-weight: bold;
                color: #007bff;
            }
            .footer {
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
                color: #777;
                text-align: left;
            }
            .footer a {
                color: #007bff;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <a href="#"><img src="https://www.upload.ee/image/16777979/Logo-With-Text.png" alt="Learning Gate Logo" class="logo"></a>
            </div>
            <div class="title">${subject}</div>
            <div class="content">
                ${content}
            </div>
            <div class="footer">
                <p>For assistance, contact us at <a href="mailto:learninggate.scu@gmail.com">learninggate.scu@gmail.com</a>.</p>
            </div>
        </div>
    </body>
    </html>`;
};

exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.json({
        success: false,
        message: `The email ${email} is not registered with us. Please enter a valid email.`,
      });
    }

    const token = crypto.randomBytes(20).toString("hex");

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
      { new: true }
    );

    const url = `http://localhost:3000/update-password/${token}`;

    const emailContent = `Your password reset link is <a href="${url}">${url}</a>. Please click this link to reset your password.`;

    await emailSender(
      email,
      "Password Reset",
      generateEmailTemplate("Password Reset", emailContent)
    );

    res.json({
      success: true,
      message: "Email sent successfully. Please check your email to continue.",
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: "An error occurred while sending the reset email.",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (confirmPassword !== password) {
      return res.json({
        success: false,
        message: "Password and Confirm Password do not match.",
      });
    }

    const userDetails = await User.findOne({ token: token });

    if (!userDetails) {
      return res.json({
        success: false,
        message: "Invalid token.",
      });
    }

    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: "Token has expired. Please regenerate your token.",
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword },
      { new: true }
    );

    res.json({
      success: true,
      message: "Password reset successful.",
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: "An error occurred while updating the password.",
    });
  }
};
