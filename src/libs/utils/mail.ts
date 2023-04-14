import { Mail } from '@/screens/Mail'
import { render } from '@react-email/render'
import nodemailer, { SendMailOptions, Transporter } from 'nodemailer'
import { ReactElement } from 'react'

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
    await this.transporter.sendMail(mailOptions)
  }

  async sendPasswordResetMail(email: string, token: string, name: string): Promise<void> {
    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`
    const text = render(Mail({ url: resetLink, name: name }) as ReactElement)
    const subject = 'Password Reset'

    const mailer = await this.sendMail({ to: email, subject, html: text })
    return mailer
  }
}

export default MailUtils
