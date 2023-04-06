import type { Theme } from '@mui/material'
import { createTheme } from '@mui/material'

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

declare module '@mui/material' {
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
}

const defaultTheme: Theme = createTheme({
  palette: {
    common: {
      white: base.white,
    },
    primary: {
      main: blue[600],
      light: green[300],
      contrastText: base.contrastText,
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
      default: base.contrastText,
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
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: base.white,
          fontWeight: 600,
          fontSize: 15,
          lineHeight: '22px',
          backgroundColor: customPrimary[700],
          ':hover': {
            backgroundColor: customPrimary[800],
          },
          ':focus': {
            backgroundColor: customPrimary[900],
          },
          ':disabled': {
            backgroundColor: customPrimary[0],
            color: base.white,
          },
        },

        outlined: {
          color: customPrimary[700],
          border: `1px solid ${customPrimary[700]}`,
          fontWeight: 600,
          fontSize: 15,
          lineHeight: '22px',
          backgroundColor: base.white,
          ':hover': {
            color: customPrimary[800],
            border: `1px solid ${customPrimary[800]}`,
          },
          ':focus': {
            color: customPrimary[900],
            border: `1px solid ${customPrimary[900]}`,
          },
          ':disabled': {
            color: customPrimary[0],
            border: `1px solid ${customPrimary[0]}`,
          },
        },
      },
    },
  },
})

export { defaultTheme }
