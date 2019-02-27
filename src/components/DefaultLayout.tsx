import React from "react"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer"
import { H1, H2 } from "./Theme"
import SEO from "components/seo"

/**
 * An MDX Layout (requires a default export)
 */
export default ({ data: { mdx } }) => (
  <>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <H1>DEFAULT LAYOUT</H1>
    <H2>{mdx.frontmatter.title}</H2>
    <MDXRenderer>{mdx.code.body}</MDXRenderer>
  </>
)

/**
 * Query for data for the page. Note that $id is injected in via context from
 * actions.createPage. See gatsby-node.js for more info.
 */
export const pageQuery = graphql`
  query DefaultPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
      }
      code {
        body
      }
    }
  }
`
