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
  // Add slug path to mdx nodes
  if (node.internal.type === "Mdx") {
    // relativePath (relative to the `/content` dir) is used to resolve basePath down below.
    // By convention it also matches collectionName, but could be different.
    const relativePath = path.relative(
      path.resolve(__dirname, "content"),
      path.dirname(node.fileAbsolutePath)
    )

    const collectionName = node.frontmatter.collectionName
    // The `pages` collection are top-level pages. Other collections will
    // be routed by their `collectionName`
    const pageLocation = collectionName === "pages" ? "/" : `/${collectionName}`

    // `nodePath` will be the route to the page on the website
    const nodePath = path.join(
      pageLocation,
      createFilePath({
        node,
        getNode,
        basePath: `content/${relativePath}`, // for now all content is coming from here
        trailingSlash: false,
      })
    )
    createNodeField({
      name: `slug`,
      node,
      value: nodePath,
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    result.data.allMdx.edges.forEach(({ node }) => {
      // console.log(`creating node at ${node.fields.path} - ${node.id}`)
      createPage({
        // This is the slug we created before
        // (or `node.frontmatter.slug`)
        path: node.fields.slug,
        // This component will wrap our MDX content
        component: path.resolve(`./src/layouts/DefaultMDXLayout.tsx`),
        // We can use the values in this context in
        // our page layout component
        context: { id: node.id },
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
