exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
  return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Payment Confirmation</title>
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
            .content b {
                font-weight: bold;
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
            <div class="title">Course Payment Confirmation</div>
            <div class="content">
                <p>Dear ${name},</p>
                <p>We have received a payment of <span>EGP ${amount}</span>.</p>
                <p>Your Payment ID is <b>${paymentId}</b></p>
                <p>Your Order ID is <b>${orderId}</b></p>
            </div>
            <div class="footer">
                <p>For assistance, contact us at <a href="mailto:learninggate.scu@gmail.com">learninggate.scu@gmail.com</a>.</p>
            </div>
        </div>
    </body>
    </html>`;
};
