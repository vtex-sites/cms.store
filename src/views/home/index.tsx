import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import type { Props as PageProps } from 'src/pages/index'
import { Flex, Grid, Image } from 'theme-ui'

import Seo from './Seo'

export type Props = PageProps

function View(props: Props) {
  // Send event to analytics
  // usePixelSendEvent(() => {
  //   const event: PageViewData = {
  //     pageType: 'home',
  //     pageUrl: window.location.href,
  //     pageTitle: document.title,
  //     referrer: '',
  //     accountName: process.env.GATSBY_STORE_ID!,
  //   }

  //   return { type: 'vtex:pageView', data: event }
  // })

  const query = useStaticQuery(graphql`
    query FastStoreHome {
      allRestApiVCmsApiFaststoreHome(
        filter: { versionStatus: { eq: "mockData" } }
      ) {
        edges {
          node {
            versionStatus
            sections {
              name
              data {
                banners {
                  src
                }
              }
            }
          }
        }
      }
    }
  `)

  const title = props.data.site?.siteMetadata?.title ?? ''

  return (
    <>
      {/* Seo Components */}
      <Seo {...props} title={title} />

      <Grid gap={2} columns={[3, '2fr 1fr 1fr']} sx={{ margin: '20px' }}>
        <Flex sx={{ flexDirection: 'column', height: '100%' }}>
          <Image
            src={
              query.allRestApiVCmsApiFaststoreHome.edges[0].node.sections[0]
                .data.banners[0].src
            }
          />{' '}
          <Image
            src={
              query.allRestApiVCmsApiFaststoreHome.edges[0].node.sections[0]
                .data.banners[1].src
            }
            sx={{ marginTop: '2.8%' }}
          />{' '}
        </Flex>
        <Image
          src={
            query.allRestApiVCmsApiFaststoreHome.edges[0].node.sections[0].data
              .banners[2].src
          }
          sx={{ width: '100%', paddingLeft: '5%' }}
        />{' '}
        <Image
          src={
            query.allRestApiVCmsApiFaststoreHome.edges[0].node.sections[0].data
              .banners[3].src
          }
          sx={{ width: '100%', paddingLeft: '5%' }}
        />
      </Grid>

      {/* Visual Sections */}
      <h1 className="absolute top-[-100px]">{title}</h1>
      <h3 className="font-bold mt-14"> ALL CATEGORIES</h3>
    </>
  )
}

export default View
