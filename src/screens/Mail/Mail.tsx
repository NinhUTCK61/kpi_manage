import { Body, Button, Img, Link, Section, Tailwind, Text } from '@react-email/components'
import { NextPage } from 'next'

interface EmailProps {
  url: string
  name: string
}

const Mail: NextPage<EmailProps> = (props) => {
  const { url, name } = props
  return (
    // <Html>
    <Tailwind>
      <Body className="w-[656px] m-auto flex flex-col justify-center height-[100vh]">
        <Section className="p-6">
          <Img src="/assets/imgs/logo_header.png" />
        </Section>
        <Section className="p-6">
          <Text>Hi [{name}]</Text>
          <Text>
            We have received a request to reset the password for your account. If you did not make
            this request, please ignore this email and your password will not be changed. To reset
            your password, please click the button below:
          </Text>
          <Button
            href={url}
            className="w-[154px] bg-[#3E19A3] text-center py-[14px] text-white rounded-[6px]"
          >
            Button
          </Button>
          <Text className="my-6">
            If you cannot click on the button, please use this link to access the password reset
            page:
            <Link href={url}>{url}</Link>
          </Text>
          <Text>Thanks, The team</Text>
        </Section>
      </Body>
    </Tailwind>
    // </Html>
  )
}

export { Mail }

const h1 = {
  color: '#333',
  fontFamily: "Noto Sans', 'sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
}
