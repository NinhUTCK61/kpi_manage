import { Button, Link, Text } from '@react-email/components'
import { FC } from 'react'
import { MailLayout } from './Layout'

interface EmailProps {
  url: string
  name: string
  language: string
}

const ForgotPasswordMail: FC<EmailProps> = (props) => {
  const { url, name, language } = props
  return (
    <MailLayout language={language}>
      {language === 'jp' ? (
        <>
          <Text style={textStyle}>
            こんにちは <b>{name}</b> さん
          </Text>

          <Text style={textStyle}>
            ご登録のアカウントからパスワード再設定のリクエストを受け取りました。もし、パスワード再設定のリクエストに身に覚えがなければ、このメールを無視・消去いただいても構いません。
          </Text>

          <Text style={textStyle}>
            現段階ではあなたのパスワードは変更されておりせんが、パスワードをリセットするには以下のボタンをクリックしてください：
          </Text>
          <Button
            href={url}
            style={{ color: 'white !important' }}
            className="w-[154px] bg-[#3E19A3] text-center py-[14px] text-white rounded-[6px] font-semibold"
          >
            パスワード再設定
          </Button>

          <Text className="my-6" style={textStyle}>
            ボタンを押せない場合は、お手数ですがパスワード再設定ページへの移動をお願い致します。下記リンクより:&nbsp;
            <Link href={url}>{url}</Link>
          </Text>
        </>
      ) : (
        <>
          <Text style={textStyle}>
            Hi <b>{name}</b>
          </Text>

          <Text style={textStyle}>
            We have received a request to reset the password for your account. If you did not make
            this request, please ignore this email and your password will not be changed. To reset
            your password, please click the button below:
          </Text>

          <Button
            href={url}
            style={{ color: 'white !important' }}
            className="w-[154px] bg-[#3E19A3] text-center py-[14px] text-white rounded-[6px] font-semibold"
          >
            Reset password
          </Button>

          <Text className="my-6" style={textStyle}>
            If the button doesn&apos;t work, please use this link to access the password reset page:
          </Text>

          <Text className="my-6" style={textStyle}>
            <Link href={url}>{url}</Link>
          </Text>
        </>
      )}
    </MailLayout>
  )
}

export { ForgotPasswordMail }

const textStyle = {
  fontSize: '17px',
  color: '#222222',
}
