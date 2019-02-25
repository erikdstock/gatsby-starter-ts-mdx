import React from "react"
import PropTypes from "prop-types"

import styles from "./index.module.scss"

// const IndexPage = ({ data: { allMarkdownRemark: { edges: posts } } }) => {
const TILPage = ({ data }) => {
  const { allMarkdownRemark } = data
  const posts = allMarkdownRemark.edges.map(e => e.node)
  const tildivs = posts.filter(p => p.frontmatter.collectionName === "til")
  return (
    <div className={styles.Container}>
      <h2>Today I Learned</h2>
      {tildivs.map(p => (
        <div key={p.id}>
          <h4>
            {p.title} ~ {p.frontmatter.date}
          </h4>
          <div dangerouslySetInnerHTML={{ __html: p.html }} />
        </div>
      ))}
    </div>
  )
}

TILPage.propTypes = {
  data: PropTypes.object.isRequired
}

export const pageQuery = graphql`
  query TilQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 200)
          id
          html
          fields {
            slug
          }
          frontmatter {
            title
            collectionName
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`

export default TILPage
