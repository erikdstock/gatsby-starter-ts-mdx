import React from "react"
import { MDXProvider } from "@mdx-js/tag"
import { Theme, LayoutComponents } from "./components/Theme"

export const Boot: React.SFC<{ element: any }> = ({ element }) => {
  return (
    <MDXProvider components={LayoutComponents}>
      <Theme>{element}</Theme>
    </MDXProvider>
  )
}
