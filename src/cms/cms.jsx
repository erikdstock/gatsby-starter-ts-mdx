import React, { Component } from "react"
import { Button, Box, Text } from "rebass"
import { StyleSheetManager, createGlobalStyle } from "styled-components"
import { MdxControl, MdxPreview } from "netlify-cms-widget-mdx"
import { Theme, LayoutComponents, GlobalStyle } from "../Theme"
import { FileSystemBackend } from "netlify-cms-backend-fs"
import CMS, { init } from "netlify-cms"

// Make these react components available within mdx templates
const AvailableUIComponents = {
  Button,
  Box,
  Text,
}

const isDevelopment = process.env.NODE_ENV === "development"

// Handled by gatsby-config plugin config
// const isClient = typeof window !== "undefined"
// if (isClient) {
//   window.CMS_MANUAL_INIT = true
// }

if (isDevelopment) {
  // Allows for local development overrides in cms.yaml
  window.CMS_ENV = "localhost_development"

  // Attach to the file system
  CMS.registerBackend("file-system", FileSystemBackend)
}

// Custom components need refs for validation and thus must be a class.
// Additionally, after <Theme>, only one child is allowed.
// See https://github.com/netlify/netlify-cms/issues/1346
class MDXWidget extends Component {
  render() {
    return (
      <Theme>
        <MdxControl {...this.props} />
      </Theme>
    )
  }
}

// The preview window which renders MDX content.
// Docs: https://www.netlifycms.org/docs/customization/
const ThemedPreview = props => (
  <Theme>
    <MdxPreview
      mdx={{
        components: LayoutComponents,
        scope: AvailableUIComponents,
        mdPlugins: [],
      }}
      {...props}
    />
  </Theme>
)

const ImportFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Fira+Mono|Karma:400,700|Lato:400,700');
`

// Must inject styles into iframe:
// https://github.com/netlify/netlify-cms/issues/793#issuecomment-425055513
const PreviewWindow = props => {
  const iframe = document.getElementsByTagName("iframe")[0]
  const iframeHeadElem = iframe.contentDocument.head

  return (
    <StyleSheetManager target={iframeHeadElem}>
      <>
        <ImportFonts />
        <GlobalStyle />
        <ThemedPreview {...props} />
      </>
    </StyleSheetManager>
  )
}

CMS.registerWidget("mdx", MDXWidget, PreviewWindow)

// Start the CMS
init()
