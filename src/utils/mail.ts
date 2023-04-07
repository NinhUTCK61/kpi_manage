import nodemailer, { SendMailOptions, SentMessageInfo, Transporter } from 'nodemailer'

interface MailOptions {
  to: string
  subject: string
  html: string
}

class MailUtils {
  private static instance: MailUtils
  private transporter: Transporter

  private constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      pool: true,
      port: process.env.EMAIL_SERVER_PORT ? parseInt(process.env.EMAIL_SERVER_PORT) : 2525,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    })
  }

  public static getInstance(): MailUtils {
    if (!MailUtils.instance) {
      MailUtils.instance = new MailUtils()
    }
    return MailUtils.instance
  }

  async sendMail(options: MailOptions): Promise<void> {
    const mailOptions: SendMailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
    }

    await this.transporter.sendMail(mailOptions, (error: Error | null, info: SentMessageInfo) => {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  }

  async sendPasswordResetMail(email: string, token: string): Promise<void> {
    const resetLink = `${process.env.NEXTAUTH_URL}/change-password/${token}`
    const subject = 'Password Reset'
    const html = `<h1><a href="${resetLink}">${token}</a></h1>`
    await this.sendMail({ to: email, subject, html })
  }
}

export default MailUtils
