import Link, { LinkProps } from 'next/link'
import { PropsWithChildren } from 'react'

type LinkCustomProps = LinkProps & { disabled?: boolean; handleOpenModal?: () => void }

const CustomLink: React.FC<PropsWithChildren<LinkCustomProps>> = ({
  children,
  disabled,
  handleOpenModal,
  ...linkProps
}) => {
  return !disabled ? (
    <Link {...linkProps}>{children}</Link>
  ) : (
    <span onClick={handleOpenModal}>{children}</span>
  )
}

export { CustomLink }
