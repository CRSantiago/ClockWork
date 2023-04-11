const nodemailer = require('nodemailer');
require('dotenv').config();

//user and pass of email should be behind env file
const sendMailPR = (email, token) => {
  const Transport = nodemailer.createTransport({
    service:'Zoho',
        host: 'smtp.zoho.com',
        port: 465,
        secure: true, // use SSL
        auth: {
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`
        }
});

  var mailOptions;

  //html should be changed during live testing www.clockwork.fyi/api/v1/clockwork/resetPassword/${token}
  mailOptions = {
    from: '"Clockwork Support" <clockworksupport@clockwork.fyi>',
    to: email,
    subject: 'Password Reset',
    html: `Click <a href="http://localhost:5000/api/v1/clockwork/resetPassword/${token}">here</a> to reset your password. Thanks`,
  };

  Transport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log('Message sent');
    }
  });
};

module.exports = sendMailPR;
