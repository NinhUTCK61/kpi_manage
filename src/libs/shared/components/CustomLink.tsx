import Link from 'next/link'
import { PropsWithChildren } from 'react'

const CustomLink: React.FC<
  PropsWithChildren<{
    disabled: boolean
    href: string
  }>
> = ({ children, disabled, href }) => {
  return !disabled ? <Link href={href}>{children}</Link> : <>{children}</>
}

export { CustomLink }
