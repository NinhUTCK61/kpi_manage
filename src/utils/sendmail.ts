import nodemailer from 'nodemailer'

export function sendMail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.NEXTAUTH_HOST,
    pool: true,
    port: Number(process.env.NEXTAUTH_PORT),
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
    html: `<a href="${process.env.NEXTAUTH_URL}'/'${token}">Link password</a>`,
  }

  const send = transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return error
    } else {
      console.log('Email sent: ' + info.response)
    }
  })

  return send
}
