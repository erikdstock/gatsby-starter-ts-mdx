// import { MdxControl, MdxPreview } from "netlify-cms-widget-mdx"
// import React, { Component } from "react"
// import { StyleSheetManager } from "styled-components"
// import { Theme, LayoutComponents, UIComponents } from "../Theme"
import { FileSystemBackend } from "netlify-cms-backend-fs"
import CMS, { init } from "netlify-cms"

const isClient = typeof window !== "undefined"
const isDevelopment = process.env.NODE_ENV === "development"

if (isClient) {
  window.CMS_MANUAL_INIT = true
}

if (isDevelopment) {
  // Allows for local development overrides in cms.yaml
  window.CMS_ENV = "localhost_development"

  // Attach to the file system
  CMS.registerBackend("file-system", FileSystemBackend)
}

// Start the CMS
init()