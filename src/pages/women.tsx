import React from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'

function Page() {
  return (
    <>
      <GatsbySeo noindex nofollow />

      <div>Women page</div>
    </>
  )
}

export default Page
