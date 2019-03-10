import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import Layout from "./SiteLayout"

const MarkdownLayout = ({ data }) => {
  const { markdownRemark: post } = data // data.markdownRemark holds our post data
  return (
    <Layout>
      <Helmet title={`${post.frontmatter.title}`} />
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
      }
    }
  }
`
