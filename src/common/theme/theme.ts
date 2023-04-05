import type { Theme } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'

import {
  base,
  blue,
  blueGrey,
  coolGrey,
  customPrimary,
  emerald,
  green,
  grey,
  greyScale,
  red,
  trueGrey,
  yellow,
} from './colors'

declare module '@mui/material/styles' {
  //add color
  interface Palette {
    blueGrey: typeof blueGrey
    coolGrey: typeof coolGrey
    trueGrey: typeof trueGrey
    emerald: typeof emerald
    yellow: typeof yellow
    red: typeof red
    base: typeof base
    greyScale: typeof greyScale
    customPrimary: typeof customPrimary
    blue: typeof blue
  }

  interface PaletteOptions {
    blueGrey: typeof blueGrey
    coolGrey: typeof coolGrey
    trueGrey: typeof trueGrey
    emerald: typeof emerald
    yellow: typeof yellow
    red: typeof red
    base: typeof base
    greyScale: typeof greyScale
    customPrimary: typeof customPrimary
    blue: typeof blue
  }

  interface TypographyVariants {
    h21: React.CSSProperties
    h43: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    h21?: React.CSSProperties
    h43?: React.CSSProperties
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h21: true
    h43: true
  }
}

const defaultTheme: Theme = createTheme({
  palette: {
    common: {
      white: '#fff',
    },
    primary: {
      main: blue[600],
      light: green[300],
      contrastText: '#222222',
    },
    grey: {
      900: grey[900],
      600: grey[600],
      500: grey[500],
      300: grey[300],
      200: grey[200],
      100: grey[100],
      50: grey[50],
    },
    success: {
      main: green[300],
    },
    info: {
      main: blue[600],
      dark: blue[700],
    },
    background: {
      default: '#fff',
    },
    text: {
      primary: blue[600],
      secondary: grey[600],
    },
    base: base,
    blueGrey: blueGrey,
    coolGrey: coolGrey,
    trueGrey: trueGrey,
    emerald: emerald,
    yellow: yellow,
    red: red,
    greyScale: greyScale,
    customPrimary: customPrimary,
    blue: blue,
  },
  typography: {
    h1: {
      fontSize: 33,
      lineHeight: '48px',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: 29,
      lineHeight: '42px',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: 25,
      lineHeight: '36px',
      fontWeight: 'bold',
    },
    h4: {
      fontSize: 23,
      lineHeight: '30px',
      fontWeight: 'bold',
    },
    body1: {
      fontSize: 17,
      lineHeight: '24px',
      fontWeight: 400,
    },
    body2: {
      fontSize: 15,
      lineHeight: '22px',
    },
    subtitle1: {
      fontSize: 16,
      lineHeight: '22px',
      fontWeight: 400,
    },
    caption: {
      fontSize: 13,
      lineHeight: '18px',
      fontWeight: 400,
    },
    button: {
      fontFamily: ['Inter', 'sans-serif'].join(', '),
    },
    fontFamily: ['Inter', 'sans-serif'].join(', '),
  },
  components: {},
})

export { defaultTheme }
