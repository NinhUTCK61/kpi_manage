import { getImageUrl } from '@/libs/utils/misc'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ListItemIcon,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import AvatarDefault from 'public/assets/svgs/avatar_default.svg'
import TermsOfUseIcon from 'public/assets/svgs/blog.svg'
import ChangeIcon from 'public/assets/svgs/change_pass.svg'
import LogOutIcon from 'public/assets/svgs/log_out.svg'
import PrivacyIcon from 'public/assets/svgs/privacy.svg'
import ProfileIcon from 'public/assets/svgs/profile.svg'

const Account = () => {
  const { data: sessionData } = useSession()
  const { t } = useTranslation()
  const router = useRouter()

  const menus = [
    {
      title: t('menu.edit'),
      icon: ProfileIcon,
      handle: () => router.push('/profile'),
    },
    {
      title: t('menu.change_password'),
      icon: ChangeIcon,
      handle: () => router.push('/change-password'),
    },
    {
      title: t('menu.privacy_policy'),
      icon: PrivacyIcon,
      handle: () => router.push('/change-password'),
    },
    {
      title: t('menu.terms_of_use'),
      icon: TermsOfUseIcon,
      handle: () => router.push('/change-password'),
    },
    {
      title: t('menu.log_out'),
      icon: LogOutIcon,
      handle: () => signOut({ callbackUrl: '/' }),
    },
  ]

  return (
    <AccordionStyled>
      <AccordionSummaryStyled
        aria-controls="panel1d-content"
        id="panel1d-header"
        expandIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.41083 6.91073C4.73626 6.5853 5.2639 6.5853 5.58934 6.91073L10.0001 11.3215L14.4108 6.91073C14.7363 6.5853 15.2639 6.5853 15.5893 6.91073C15.9148 7.23617 15.9148 7.76381 15.5893 8.08925L10.5893 13.0892C10.2639 13.4147 9.73626 13.4147 9.41083 13.0892L4.41083 8.08925C4.08539 7.76381 4.08539 7.23617 4.41083 6.91073Z"
              fill="#222222"
            />
          </svg>
        }
      >
        <Image
          src={sessionData?.user.image ? getImageUrl(sessionData?.user.image) : AvatarDefault}
          width={20}
          height={20}
          alt="avatar"
          style={{ borderRadius: '100%', marginRight: '4px' }}
        />

        <Typography variant="body2" color="base.black">
          {sessionData?.user?.name}
        </Typography>
      </AccordionSummaryStyled>

      <AccordionDetails>
        <Stack direction="column" spacing={1}>
          {menus.map((menu) => (
            <Stack
              key={menu.title}
              direction="row"
              alignItems="center"
              padding="8px 16px"
              onClick={menu.handle}
            >
              <ListItemIcon sx={{ minWidth: 20, mr: 0.5 }}>
                <Image src={menu.icon} width={20} height={20} alt="edit icon" />
              </ListItemIcon>

              <Typography color="base.black" variant="body2">
                {menu.title}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </AccordionDetails>
    </AccordionStyled>
  )
}

export { Account }

const AccordionSummaryStyled = styled(AccordionSummary)({
  '&.MuiAccordionSummary-root': {
    minHeight: 0,
    padding: '8px 16px',
    '&& .MuiAccordionSummary-content': {
      margin: 0,
      alignItems: 'center',
    },
    '&.Mui-expanded': {
      minHeight: 0,
    },
  },
})

const AccordionStyled = styled(Accordion)({
  '&:before': {
    display: 'none',
  },
  '&.MuiPaper-root': {
    border: 0,
    padding: '0 !important',
  },
  '&:last-child': {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  '&.Mui-expanded': {
    margin: 0,
    marginTop: 8,
  },
  borderRadius: 0,
  padding: '8px 0',
  boxShadow: 'none',
})
