import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Box } from "rebass"
import { maxWidth, MaxWidthProps } from "styled-system"
import Header from "../components/Header"
import styled from "styled-components"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <PageContent m="0 auto" maxWidth={["560px"]}>
          <Box p="0px 1.0875rem 1.45rem">
            <main>{children}</main>
          </Box>
        </PageContent>
        <Footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </Footer>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

const PageContent = styled(Box)<MaxWidthProps>`
  ${maxWidth};
`

const Footer = styled("footer")`
  margin-left: auto;
  margin-right: auto;
  max-width: 42rem;
  padding-top: 20px;
`

export default Layout
