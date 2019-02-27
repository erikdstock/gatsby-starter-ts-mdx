/**
 * Since this file is shared with NetlifyCMS it must be .jsx
 */
import React from "react"

import { ThemeProvider, createGlobalStyle } from "styled-components"

import { Text } from "rebass"

const Heading = props => <Text fontFamily="sans" {...props} />
const P = props => <Text fontFamily="serif" as="p" {...props} />
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
  // inlineCode:
}

const theme = {
  fonts: {
    mono: "Fira Mono",
    sans: "Lato, Helvetica, sans-serif",
    serif: "Karma, Times, serif",
  },
}

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Fira+Mono|Karma:400,700|Lato:400,700');
  /* html, body {
    font-family: Arial, Helvetica, sans-serif;
  }

  h3 {
    font-family: Arial, Helvetica, sans-serif
  }  */
`

export const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        {children}
      </>
    </ThemeProvider>
  )
}
