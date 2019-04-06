import { MDXProvider } from "@mdx-js/react"
import React from "react"
import { LayoutComponents, Theme } from "./Theme"

export const Boot: React.SFC<{ element: any }> = ({ element }) => {
  return (
    <MDXProvider components={LayoutComponents}>
      <Theme>{element}</Theme>
    </MDXProvider>
  )
}
