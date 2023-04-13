import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Html,
  Img,
  Link,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import { FC } from 'react'

interface EmailProps {
  url: string
  name: string
}

const isDevelopment = process.env.NODE_ENV
const baseUrl = process.env.NEXTAUTH_URL

const logo =
  isDevelopment === 'development'
    ? 'https://i.imgur.com/l9pWgUw.png'
    : `${baseUrl}/assets/imgs/logo_header.png`

const hand1 =
  isDevelopment === 'development'
    ? 'https://i.imgur.com/MLrZJpv.png'
    : `${baseUrl}/assets/imgs/hand1.png`

const hand2 =
  isDevelopment === 'development'
    ? 'https://i.imgur.com/PKULtCn.png'
    : `${baseUrl}/assets/imgs/hand2.png`

const hand3 =
  isDevelopment === 'development'
    ? 'https://i.imgur.com/IRSDJnn.png'
    : `${baseUrl}/assets/imgs/hand3.png`

const Mail: FC<EmailProps> = (props) => {
  const { url, name } = props
  return (
    <Tailwind>
      <Html>
        <Head />
        <Body>
          <Container className="m-auto flex flex-col p-4 sm:p-10" style={main}>
            <Section className="px-6 py-1 sm:py-6 flex justify-start">
              <Img src={logo} className="w-[92px]" />
            </Section>
            <Section className="px-6 py-1 sm:py-6">
              <Text style={textStyle}>
                Hi <b>{name}</b>
              </Text>
              <Text style={textStyle}>
                We have received a request to reset the password for your account. If you did not
                make this request, please ignore this email and your password will not be changed.
                To reset your password, please click the button below:
              </Text>
              <Button
                href={url}
                style={{ color: 'white !important' }}
                className="w-[154px] bg-[#3E19A3] text-center py-[14px] text-white rounded-[6px] font-semibold"
              >
                Reset password
              </Button>
              <Text className="my-6" style={textStyle}>
                If you cannot click on the button, please use this link to access the password reset
                page:
                <Link href={url}>{url}</Link>
              </Text>
              <Text style={textStyle} className="m-0">
                Thanks,
                <br />
                The team
              </Text>
            </Section>
            <Row>
              <Column align="right">
                <Img src={hand1} className="w-[100px] md:w-[140px]" />
              </Column>
              <Column align="center">
                <Img src={hand2} className="mx-2 sm:mx-4 md:mx-6 w-[100px] md:w-[140px]" />
              </Column>
              <Column align="left">
                <Img src={hand3} className="w-[100px] md:w-[140px]" />
              </Column>
            </Row>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}

export { Mail }

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '"Noto Sans",sans-serif',
  maxWidth: '656px ',
}

const textStyle = {
  fontSize: '17px',
  color: '#222222',
}
