/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require("path")
const { introspectionQuery, graphql, printSchema } = require("gatsby/graphql")
const write = require("write")
const WebpackNotifierPlugin = require("webpack-notifier")

const { createFilePath } = require("gatsby-source-filesystem")

/**
 * We have to intercept each mdx node to add a `slug` field to it.
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // We only want to operate on `Mdx` nodes. If we had content from a
  // remote CMS we could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === "Mdx") {
    const filePath = createFilePath({ node, getNode })
    const routeTo = path.relative(
      path.resolve(__dirname, "content"),
      path.dirname(node.fileAbsolutePath)
    )

    createNodeField({
      // Name of the field you are adding
      name: "slug",
      // Individual MDX node
      node,
      // Generated value based on filepath with "blog" prefix
      value: `/${routeTo}${filePath}`,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
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
        `
      ).then(result => {
        // this is some boilerlate to handle errors
        if (result.errors) {
          console.error(result.errors)
          reject(result.errors)
        }

        // We'll call `createPage` for each result
        result.data.allMdx.edges.forEach(({ node }) => {
          createPage({
            // This is the slug we created before
            // (or `node.frontmatter.slug`)
            path: node.fields.slug,
            // This component will wrap our MDX content
            component: path.resolve(`./src/components/DefaultLayout.tsx`),
            // We can use the values in this context in
            // our page layout component
            context: { id: node.id },
          })
        })
      })
    )
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

/**
 * Update default Webpack configuration
 */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new WebpackNotifierPlugin({
        skipFirstNotification: true,
      }),
      // FIXME: Investigate Apollo error
      // new WebpackShellPlugin({
      //   onBuildEnd: ["yarn emit-graphql-types"],
      // }),
    ],
    resolve: {
      // Enable absolute import paths
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
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
