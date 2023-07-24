import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Img,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import { FC, PropsWithChildren } from 'react'
import { Header } from './Header'

const isDevelopment = process.env.NODE_ENV
const baseUrl = process.env.NEXTAUTH_URL

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

const MailLayout: FC<PropsWithChildren<{ language: string }>> = ({ children, language }) => {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Body>
          <Container className="m-auto flex flex-col p-4 sm:p-10" style={main}>
            <Header />
            <Section className="px-6 py-1 sm:py-6">
              {children}
              {language === 'jp' ? (
                <>
                  <Text className="my-6" style={textStyle}>
                    KPI Masterが、貴社ビジネスの課題解決の助けとなることを願っています。
                  </Text>

                  <Text className="my-6" style={textStyle}>
                    よろしくお願い致します。
                  </Text>

                  <Text className="my-6" style={textStyle}>
                    KPI Master運営チーム
                  </Text>
                </>
              ) : (
                <>
                  <Text className="my-6" style={textStyle}>
                    We hope KPI Master can help you solve your business challenges.
                  </Text>

                  <Text className="my-6" style={textStyle}>
                    Best regards.
                  </Text>

                  <Text className="my-6" style={textStyle}>
                    KPI Master Management Team
                  </Text>
                </>
              )}
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

export { MailLayout }

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '"Noto Sans",sans-serif',
  maxWidth: '656px',
}

export const textStyle = {
  fontSize: '17px',
  color: '#222222',
}
