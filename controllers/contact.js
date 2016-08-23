const nodemailer = require('nodemailer')

let sendEmail = function (req, res) {
  var mailOptions = {
    from: process.env.USERMAIL,
    to: process.env.MYMAIL,
    subject: 'Profile Contact Form',
    html:
    `<h3>From: ${req.body.name}</h3>
    <h3>Contact: ${req.body.email}</h3>
    <h3>Regarding: ${req.body.content}</h3>
    `
  }

  let smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.USERMAIL,
      pass: process.env.USERPASS
    }
  }
  let transporter = nodemailer.createTransport(smtpConfig)

  if (mailOptions) {
    transporter.sendMail(mailOptions, function (err, result) {
      if (err) res.status(401).json({error: err})
      else res.status(201).json(result)
    })
  }
}

module.exports = {
  sendEmail: sendEmail
}
