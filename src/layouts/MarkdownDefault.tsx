import React from "react"
import { graphql } from "gatsby"
import Layout from "./SiteLayout"
import SEO from "../components/SEO"

const MarkdownLayout = ({ data }) => {
  const { markdownRemark: post } = data // data.markdownRemark holds our post data
  return (
    <Layout>
      <SEO title={post.frontmatter.title} keywords={post.frontmatter.tags} />
      <div className="blog-post">
        <h1>{post.frontmatter.title}</h1>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </Layout>
  )
}

export default MarkdownLayout

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(fields: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
      }
    }
  }
`
