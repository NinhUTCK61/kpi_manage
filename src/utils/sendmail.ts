import nodemailer from 'nodemailer'

export function senMail(email: string, password: string) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    pool: true,
    port: 2525,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: 'thinh221201@gmail.com',
      pass: '8EE605E900E4886567381CC68EC0AAF9C511',
    },
  })
  const mailOptions = {
    from: 'thinh.reply.local@gmail.com',
    to: `${email}`,
    name: 'Name',
    email: 'Email',
    subject: 'Password Reset',
    html: `<h1>${password}</h1>`,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}
