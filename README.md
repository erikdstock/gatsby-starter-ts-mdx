[![Netlify Status](https://api.netlify.com/api/v1/badges/09b68422-f4b0-4a28-8fe7-c6fdf05fae79/deploy-status)](https://app.netlify.com/sites/festive-villani-316b3c/deploys)

<h1 align="center">
  Erik's Gatsby 2019 setup
</h1>

_Heavily inspired by
https://github.com/damassi/gatsby-starter-typescript-rebass-netlifycms_

I've done my best to keep commits for this setup step-by-step in hope others
might understand the process better and avoid some of the endless faffing I went
through.

By default this starter has both mdx and markdown/remark extensions. MDX seems a
better fit for styled-components, so check the `disable-remark` branch for a
rough diff on how to accomplish that.

### TODOs:

- [ ] Netlify CMS is broken - see gatsbyjs/gatsby#12776 . I'll update when there
      is a more durable fix but for now pinning to netlify-cms 2.6 (2.6.0 works
      for me) should fix it.
- [ ] Relative imports for MDX Global Scoped components not working from
      gatsby-config
