/* eslint-disable @typescript-eslint/camelcase */

module.exports = {
  siteMetadata: {
    title: `Gatsby 2019`,
    description: `A gatsby starter using Typescript, Netlify-CMS, MDX and Netlify
    Inspired by https://github.com/damassi/gatsby-starter-typescript-rebass-netlifycms`,
    author: `@erikdstock`,
  },
  plugins: [
    /**
     *  Sources for loading content
     */

    /*
      gatsby-source-filesystem notes:
      https://www.gatsbyjs.org/packages/gatsby-source-filesystem/?=file#how-to-query
      Most of these files get queried through other transformers,
      but the `name` property here allows filtering allFile queries:
      allFile(filter: { sourceInstanceName: { eq: "blog" } }) {
        edges {
          node { etc...
    */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `srcImages`,
        path: `${__dirname}/src/images`,
      },
    },
    // Pages like /about
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages`,
        name: "pages",
      },
    },
    // blog sources
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: "blog",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/mdx`,
        name: "blog",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/assets`,
      },
    },

    /**
     * Transformers for making content available in graphql queries
     */
    // For querying images
    `gatsby-transformer-sharp`,
    // For querying markdown
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        // commonmark: true,
        // Footnotes mode (default: true)
        // footnotes: true,
        // Pedantic mode (default: true)
        // pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        // gfm: true,
        // Plugins configs
        plugins: [
          // Convert absolute image file paths (from netlify-cms) to relative. Required for remark-images to work.
          // https://www.gatsbyjs.org/packages/gatsby-remark-relative-images/?=gatsby-remark-relative-images
          // See options ^ For how to convert images from frontmatter if needed
          {
            resolve: `gatsby-remark-relative-images`,
            options: {},
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 820,
              quality: 90,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    // For querying MDX
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: [".mdx"],
        DefaultMDXLayouts: {
          // define more Layouts here if you like,
          // matching keys to the `name` from a gatsby-source-filesystem config (eg `blog`)
          default: require.resolve("./src/layouts/DefaultMDXLayout.tsx"),
        },
        // Imports here are available globally to .mdx files, with the exception
        // of automatically created pages located in /pages. This is a bug in
        // gatsby-mdx. See https://github.com/ChristopherBiscardi/gatsby-mdx/issues/243
        //
        // Also note: For mdx to work in NetlifyCMS, global scope passed in here
        // must also be passed into `cms.js`, under the `scope` key.
        //
        globalScope: `
          import { Button, Box, Text } from 'rebass'
          export default {
            Button,
            Box,
            Text
          }
        `,
        gatsbyRemarkPlugins: [
          // Convert absolute image file paths (from netlify-cms) to relative. Required for remark-images to work.
          // https://www.gatsbyjs.org/packages/gatsby-remark-relative-images/?=gatsby-remark-relative-images
          // See options ^ For how to convert images from frontmatter if needed
          {
            resolve: `gatsby-remark-relative-images`,
            options: {},
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 820,
              quality: 90,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },

    /**
     * Plugins for general functionality
     */
    "gatsby-plugin-catch-links",
    "gatsby-plugin-react-helmet",
    `gatsby-plugin-sharp`,
    "gatsby-plugin-styled-components",
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.jsx`,
        publicPath: "/admin",
        htmlTitle: "Admin",
        // enableIdentityWidget: false,
        manualInit: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Fira Mono", "Karma:400,700", "Lato:400,700"],
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
