/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const { introspectionQuery, graphql, printSchema } = require("gatsby/graphql")
const { createFilePath } = require("gatsby-source-filesystem")
const write = require("write")
const path = require("path")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  // Add path to markdown nodes
  if (node.internal.type === "MarkdownRemark") {
    // console.log(node)
    // console.log(node.frontmatter.collectionName)
    // markdown from 'pages' collection goes to root.
    const collectionName = node.frontmatter.collectionName
    const pageLocation = collectionName === "pages" ? "/" : `/${collectionName}`
    const nodePath = path.join(
      pageLocation,
      createFilePath({
        node,
        getNode,
        basePath: "content/blog", // for now all content is coming from here
        trailingSlash: false,
      })
    )
    // console.log("\ncreating slug field", nodePath)
    createNodeField({
      name: `path`,
      node,
      value: nodePath,
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const markdownDefaultTemplate = path.resolve(
    `src/layouts/MarkdownDefault.tsx`
  )
  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            excerpt
            frontmatter {
              collectionName
            }
            fields {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      // console.log(`creating node at ${node.fields.slug} - ${node.id}`)
      createPage({
        path: node.fields.path,
        component: markdownDefaultTemplate,
        context: {}, // additional data can be passed via context
      })
    })
  })
}

/**
 * Add the file-system as an api proxy:
 * https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
 */
exports.onCreateDevServer = ({ app }) => {
  const fsMiddlewareAPI = require("netlify-cms-backend-fs/dist/fs")
  fsMiddlewareAPI(app)
}

/**
 * Generate GraphQL schema.json file to be read by tslint
 * Thanks: https://gist.github.com/kkemple/6169e8dc16369b7c01ad7408fc7917a9
 */
exports.onPostBootstrap = async ({ store }) => {
  try {
    const { schema } = store.getState()
    const jsonSchema = await graphql(schema, introspectionQuery)
    const sdlSchema = printSchema(schema)

    write.sync("schema.json", JSON.stringify(jsonSchema.data), {})
    write.sync("schema.graphql", sdlSchema, {})

    console.log("\n\n[gatsby-plugin-extract-schema] Wrote schema\n") // eslint-disable-line
  } catch (error) {
    console.error(
      "\n\n[gatsby-plugin-extract-schema] Failed to write schema: ",
      error,
      "\n"
    )
  }
}
