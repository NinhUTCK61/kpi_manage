import Link, { LinkProps } from 'next/link'
import { PropsWithChildren } from 'react'

type LinkCustomProps = LinkProps & { disabled?: boolean }

const CustomLink: React.FC<PropsWithChildren<LinkCustomProps>> = ({
  children,
  disabled,
  ...linkProps
}) => {
  return !disabled ? <Link {...linkProps}>{children}</Link> : <>{children}</>
}

export { CustomLink }
