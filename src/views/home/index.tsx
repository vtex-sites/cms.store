import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import type { Props as PageProps } from 'src/pages/index'
import { Box, Flex, Grid, Image } from 'theme-ui'

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
                image
                banners {
                  package {
                    src
                  }
                  isRow
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

      <Flex>
        <Flex sx={{ width: '60%' }}>Side Bar</Flex>
        <Grid gap={2} columns={[2, '1fr 1fr']}>
          {query.allRestApiVCmsApiFaststoreHome.edges[0].node.sections.map(
            (section: any) => {
              return section.name === 'FirstBanner' ? (
                section.data.banners.map((banner: any, key: any) => {
                  return (
                    <Flex
                      key={key}
                      sx={
                        banner.isRow
                          ? { flexDirection: 'column' }
                          : { flexDirection: 'row' }
                      }
                    >
                      <Image
                        src={banner.package[0].src}
                        key={banner.package[0].src}
                      />
                      <Image
                        src={banner.package[1].src}
                        key={banner.package[1].src}
                        sx={
                          banner.isRow
                            ? { marginTop: '20px' }
                            : { marginLeft: '10px' }
                        }
                      />
                    </Flex>
                  )
                })
              ) : (
                <> </>
              )
            }
          )}
        </Grid>
      </Flex>

      {/* Visual Sections */}
      <h1 className="absolute top-[-100px]">{title}</h1>
      <h3 className="font-bold mt-14"> ALL CATEGORIES</h3>
    </>
  )
}

export default View
