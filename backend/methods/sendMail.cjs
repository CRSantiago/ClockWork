const nodemailer = require('nodemailer');
require('dotenv').config();

//user and pass of email should be behind env file
const sendMail = (email, uniqueString) => {
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
  // let sender = "Clockwork Support" <clockworksupport@clockwork.fyi>;

  //html should be changed during live testing www.clockwork.fyi/api/v1/clockwork/verify/${uniqueString}
  mailOptions = {
    from: '"Clockwork Support" <clockworksupport@clockwork.fyi>',
    to: email,
    subject: 'Email Verification',
    html: `Click <a href="http://localhost:5000/api/v1/clockwork/verify/${uniqueString}">here</a> to verify your email. Thanks`,
  };

  Transport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log('Message sent');
    }
  });
};

module.exports = sendMail;
