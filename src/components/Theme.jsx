import React from 'react'
import {ThemeProvider, createGlobalStyle} from 'styled-components'
import styledNormalize from 'styled-normalize'

const theme = {
  breakpoints: {
    s: 0, // zero represents the default (for mobile-first approach)
    m: "48em",
    l: "80em",
  },
  fonts: {
    mono: "Fira Mono",
    sans: "Lato, Helvetica, sans-serif",
    serif: "Karma, Times, serif",
  },
  colors: {
    gray: {
      "1": "hsl(0,0%,32%)",
      "2": "hsl(0,0%,47%)",
      "3": "hsl(0,0%,58%)",
      "4": "hsl(0,0%,68%)",
      "5": "hsl(0,0%,77%)",
      "6": "hsl(0,0%,85%)",
      "7": "hsl(0,0%,93%)",
    },
  },
}

const GlobalStyle = createGlobalStyle`
  ${styledNormalize};
  * {
    font-family: ${theme.fonts.serif};
  }
  h1,h2,h3 {
    font-family: ${theme.fonts.sans};
  }
`

export const Theme = props => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle/>
      {props.children}
    </>
  </ThemeProvider>
)