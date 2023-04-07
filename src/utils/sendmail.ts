import nodemailer from 'nodemailer'

export async function sendMail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    pool: true,
    port: process.env.EMAIL_SERVER_PORT ? parseInt(process.env.EMAIL_SERVER_PORT) : 2525,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: `${email}`,
    name: 'Name',
    email: 'Email',
    subject: 'Password Reset',
    html: `<h1><a href="${process.env.NEXTAUTH_URL}/change-password/${token}">${token}</a></h1>`,
  }

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}
