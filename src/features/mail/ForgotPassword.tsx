import { Button, Link, Text } from '@react-email/components'
import { FC } from 'react'
import { MailLayout } from './Layout'

interface EmailProps {
  url: string
  name: string
}

const ForgotPasswordMail: FC<EmailProps> = (props) => {
  const { url, name } = props
  return (
    <MailLayout>
      <Text style={textStyle}>
        Hi <b>{name}</b>
      </Text>
      <Text style={textStyle}>
        We have received a request to reset the password for your account. If you did not make this
        request, please ignore this email and your password will not be changed. To reset your
        password, please click the button below:
      </Text>
      <Button
        href={url}
        style={{ color: 'white !important' }}
        className="w-[154px] bg-[#3E19A3] text-center py-[14px] text-white rounded-[6px] font-semibold"
      >
        Reset password
      </Button>
      <Text className="my-6" style={textStyle}>
        If the button doesn&apos;t work, please use this link to access the password reset
        page:&nbsp;
        <Link href={url}>{url}</Link>
      </Text>
      <Text style={textStyle} className="m-0">
        Thanks,
        <br />
        KPI Master Team.
      </Text>
    </MailLayout>
  )
}

export { ForgotPasswordMail }

const textStyle = {
  fontSize: '17px',
  color: '#222222',
}
