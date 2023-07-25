import { ForgotPasswordMail, VerifyEmail } from '@/features/mail'
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

  async sendMail(options: MailOptions) {
    const mailOptions: SendMailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
    }
    await this.transporter.sendMail(mailOptions)
  }

  async sendPasswordResetMail(email: string, token: string, name: string, language: string) {
    const url = `${process.env.NEXTAUTH_URL}/${language}/reset-password?token=${token}`
    const html = render(ForgotPasswordMail({ url, name, language }) as ReactElement)
    const subject =
      language === 'jp' ? 'パスワードのリセット - KPI Master' : 'Password Reset - KPI Master'

    const mailer = await this.sendMail({ to: email, subject, html })
    return mailer
  }

  async sendVerifyMail(email: string, token: string, name: string, language: string) {
    const url = `${process.env.NEXTAUTH_URL}/${language}/verify?token=${token}`
    const html = render(VerifyEmail({ url, name, language }) as ReactElement)
    const subject =
      language === 'jp' ? 'メール認証 - KPI Master' : 'Email Verification - KPI Master'

    const mailer = await this.sendMail({ to: email, subject, html })
    return mailer
  }
}

export default MailUtils
