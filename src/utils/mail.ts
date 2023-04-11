import { TRPCError } from '@trpc/server'
import nodemailer, { SendMailOptions, Transporter } from 'nodemailer'

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
    try {
      const mailOptions: SendMailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.html,
      }
      await this.transporter.sendMail(mailOptions)
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Send mail failed!',
      })
    }
  }

  async sendPasswordResetMail(email: string, token: string): Promise<void> {
    try {
      const resetLink = `${process.env.NEXTAUTH_URL}/change-password/${token}`
      const subject = 'Password Reset'
      const html = `<h1><a href="${resetLink}">${token}</a></h1>`

      const mailer = await this.sendMail({ to: email, subject, html })
      return mailer
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Send mail failed!',
      })
    }
  }
}

export default MailUtils
