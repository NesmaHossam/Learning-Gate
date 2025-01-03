const otpTemplate = (otp) => {
  return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>OTP Verification Email</title>
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
            }
            .content {
                color: #555;
            }
            .otp {
                text-align: center;
                margin: 20px 0;
            }
            .otp h2 {
                display: inline-block;
                padding: 10px 20px;
                background-color: #f0f8ff;
                border-radius: 10px;
                color: #333;
                border: 2px solid #007bff;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                font-weight: bold;
            }
            .footer {
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
                color: #777;
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
            <div class="title">OTP Verification</div>
            <div class="content">
                <p>Thank you for registering with Learning Gate. To complete your registration, please use the following OTP:</p>
                <div class="otp">
                    <h2>${otp}</h2>
                </div>
                <p>This OTP is valid for 5 minutes. If you did not request this, please disregard this email. Once verified, you will have full access to our platform.</p>
            </div>
            <div class="footer">
                <p>For assistance, contact us at <a href="mailto:learninggate.scu@gmail.com">learninggate.scu@gmail.com</a>.</p>
            </div>
        </div>
    </body>
    </html>`;
};
module.exports = otpTemplate;
