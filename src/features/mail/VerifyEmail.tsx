import { Button, Link, Text } from '@react-email/components'
import { FC } from 'react'
import { MailLayout } from './Layout'

interface EmailProps {
  url: string
  name: string
}

const VerifyEmail: FC<EmailProps> = (props) => {
  const { url, name } = props
  return (
    <MailLayout>
      <Text style={textStyle}>
        Hi <b>{name}</b>
      </Text>
      <Text style={textStyle}>
        Thank you for registering with KPI Master! To complete your account registration, please
        verify your email address by clicking the link below:
      </Text>

      <Button
        href={url}
        style={{ color: 'white !important' }}
        className="w-[154px] bg-[#3E19A3] text-center py-[14px] text-white rounded-[6px] font-semibold"
      >
        Verify email
      </Button>
      <Text className="my-6" style={textStyle}>
        If the button doesn&apos;t work, please use this link to verify your email:&nbsp;
        <Link href={url}>{url}</Link>
      </Text>

      <Text className="my-6" style={textStyle}>
        Once your email address is verified, you can start enjoying all the features and benefits of
        KPI Master. If you have any questions or need assistance, please do not hesitate to contact
        us.
      </Text>
    </MailLayout>
  )
}

export { VerifyEmail }

const textStyle = {
  fontSize: '17px',
  color: '#222222',
}
