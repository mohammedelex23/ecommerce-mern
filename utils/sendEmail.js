const nodemailer = require("nodemailer");

module.exports = function sendEmail({ email, token, name, userId, cb }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Account Verification",
    html: `<html>
        <p>Hello ${name},</p>
        <h1>Signup Seccessfull</h1>
        <p>Before you can begin using your account, you need to activate it using the below link:</p>
        <a style="color:blue;font-size:18px;font-weight:bold" href="${process.env.BASE_URL}/verify_account?token=${token}&id=${userId}">Verify account</a>
        </html>`,
  };
  transporter.sendMail(mailOptions, cb);
};
