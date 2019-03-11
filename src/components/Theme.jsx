import React from "react"
import { ThemeProvider, createGlobalStyle } from "styled-components"
import styledNormalize from "styled-normalize"
import { Text } from "rebass"

const Heading = props => <Text fontFamily="sans" {...props} />
const P = props => <Text fontFamily="mono" {...props} />
const H1 = props => <Heading as="h1" {...props} />
const H2 = props => <Heading as="h2" {...props} />
const H3 = props => <Heading as="h3" {...props} />
const H4 = props => <Heading as="h4" {...props} />

export { P, H1, H2, H3, H4 }

/**
 * Exported components for the mdx renderer to use when rendering markdown:
 * https://www.gatsbyjs.org/packages/gatsby-mdx/?=mdx#mdxprovider
 */
export const LayoutComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
}

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
      <GlobalStyle />
      {props.children}
    </>
  </ThemeProvider>
)
