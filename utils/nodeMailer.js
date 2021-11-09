var nodemailer = require("nodemailer");
require('dotenv').config();

class nodeMailer {
  mailer = (email, token) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sanjanaaaaa310@gmail.com",
        pass: "ItsmeSanjana",
      },
    });

    var mailOptions = {
      from: "sanjanaaaaa310@gmail.com",
      to: email,
      subject: "Sending Sample Email using Node.js",
      html: `<a href='http://localhost:3000/reset/${token}'>Hi,click on this link to reset password.</a>`,
      text: "Password reset",
    };

    return transporter
      .sendMail(mailOptions)
      .then((data) => {
        return "Email sent successfully.";
      })
      .catch((err) => {
        return err;
      });
  };
}

module.exports = new nodeMailer();