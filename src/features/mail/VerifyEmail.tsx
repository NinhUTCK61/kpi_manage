import { Link, Text } from '@react-email/components'
import { FC } from 'react'
import { MailLayout, textStyle } from './Layout'

interface EmailProps {
  url: string
  name: string
  language: string
}

const VerifyEmail: FC<EmailProps> = (props) => {
  const { url, name, language } = props
  return (
    <MailLayout language={language}>
      {language === 'jp' ? (
        <>
          <Text style={textStyle}>
            こんにちは <b>{name}</b> さん
          </Text>

          <Text style={textStyle}>KPI Masterにご登録いただき、ありがとうございます。</Text>

          <Text style={textStyle}>
            アカウントの登録を完了するために、以下のリンクをクリックして、メール認証を完了させてください。
          </Text>

          <Text className="my-6" style={textStyle}>
            <Link href={url}>{url}</Link>
          </Text>
        </>
      ) : (
        <>
          <Text style={textStyle}>
            Hi <b>{name}</b>
          </Text>

          <Text style={textStyle}>
            Thank you for registering with KPI Master. To complete your account registration, please
            click on the link below to complete your email verification.
          </Text>

          <Text className="my-6" style={textStyle}>
            <Link href={url}>{url}</Link>
          </Text>
        </>
      )}
    </MailLayout>
  )
}

export { VerifyEmail }
