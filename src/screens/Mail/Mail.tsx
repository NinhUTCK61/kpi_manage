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
    <Body>
      <Tailwind>
        <Section>
          <Img src="/assets/imgs/logo_header.png" />
        </Section>
        <Section>
          <Text>Hi [{name}]</Text>
          <Text>
            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to
            demonstrate the visual form of a document or a typeface without relying on meaningful
            content. Lorem ipsum may be used as a placeholder before final
          </Text>
          <Button href={url}>Button</Button>
          <Text>
            If you cannot click on the button, please use this link to access the password reset
            page:
            <Link href="https://kpi-master.com/reset-password/abcxyz">
              https://kpi-master.com/reset-password/abcxyz
            </Link>
          </Text>
          <Text>Thanks</Text>
          <Text>The team</Text>
        </Section>
      </Tailwind>
    </Body>
    // </Html>
  )
}

export { Mail }
