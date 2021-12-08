import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import View from 'src/views/home'
import type { PageProps } from 'gatsby'
import type { HomePageQueryQuery } from '@generated/graphql'

export type Props = PageProps<HomePageQueryQuery>

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        title
        description
        titleTemplate
      }
    }
  }
`

function Page(props: Props) {
  return (
    <>
      <View {...props} />
    </>
  )
}


export default Page
