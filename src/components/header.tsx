import { Link } from "gatsby"
import React from "react"
import { Box, Text } from "rebass"

const Header: React.FunctionComponent<{ siteTitle: string }> = ({
  siteTitle,
}) => (
  <Box bg="rebeccapurple" mb="1.45rem">
    <Box my={0} mx="auto" p="1.45rem 1.0875rem">
      <Link
        to="/"
        style={{
          color: `white`,
          textDecoration: `none`,
        }}
      >
        <Text as="h1" fontFamily="sans" style={{ margin: 0 }}>
          {siteTitle}
        </Text>
      </Link>
    </Box>
  </Box>
)

export default Header
