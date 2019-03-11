import React, { Component } from "react"
import { StyleSheetManager } from "styled-components"
import { MdxControl, MdxPreview } from "netlify-cms-widget-mdx"
import { Theme, LayoutComponents } from "../components/Theme"
import { FileSystemBackend } from "netlify-cms-backend-fs"
import CMS, { init } from "netlify-cms"

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
        scope: {},
        mdPlugins: [],
      }}
      {...props}
    />
  </Theme>
)

// Must inject styles into iframe:
// https://github.com/netlify/netlify-cms/issues/793#issuecomment-425055513
const PreviewWindow = props => {
  const iframe = document.getElementsByTagName("iframe")[0]
  const iframeHeadElem = iframe.contentDocument.head

  return (
    <StyleSheetManager target={iframeHeadElem}>
      <ThemedPreview {...props} />
    </StyleSheetManager>
  )
}

CMS.registerWidget("mdx", MDXWidget, PreviewWindow)

// Start the CMS
init()
