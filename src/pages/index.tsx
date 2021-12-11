import { useSession } from '@faststore/sdk'
import { graphql } from 'gatsby'
import { GatsbySeo, JsonLd } from 'gatsby-plugin-next-seo'
import React from 'react'
import type { PageProps } from 'gatsby'
import type { HomePageQueryQuery } from '@generated/graphql'
import Carousel from 'src/components/sections/Carousel'
import Shelf from 'src/components/sections/Shelf'

export type Props = PageProps<HomePageQueryQuery>

const Sections = {
  Carousel,
  Shelf,
} as const

const isSection = (name: string): name is keyof typeof Sections =>
  Boolean((Sections as any)[name])

function Page(props: Props) {
  const {
    data: { site, cmsHome },
    location: { pathname, host },
  } = props

  const { locale } = useSession()

  const title = site?.siteMetadata?.title ?? ''
  const siteUrl = `https://${host}${pathname}`

  return (
    <>
      {/* SEO */}
      <GatsbySeo
        title={title}
        description={site?.siteMetadata?.description ?? ''}
        titleTemplate={site?.siteMetadata?.titleTemplate ?? ''}
        language={locale}
        canonical={siteUrl}
        openGraph={{
          type: 'website',
          url: siteUrl,
          title: title ?? '',
          description: site?.siteMetadata?.description ?? '',
        }}
      />
      <JsonLd
        json={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          url: siteUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${siteUrl}/s/?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        }}
      />

      {/*
        Sections: Components imported from '../components/sections' only.
        Do not import or render components from any other folder in here.
      */}
      {cmsHome?.sections.map(({ data, name }, index) => {
        if (!isSection(name)) {
          throw new Error(
            `Section ${name} was not found. Please add the code for this section component`
          )
        }

        const Component = Sections[name]

        return <Component key={`section-${index}`} {...data} />
      })}

      {/* <Carousel
        allItems={[
          {
            desktop:
              'https://storeframework.vtexassets.com/assets/vtex.file-manager-graphql/images/a7327682-c190-4751-a60e-ab884283e208___123c61cb1fda1f8d08b96524e85d9b33.jpg',
            mobile:
              'https://storeframework.vtexassets.com/assets/vtex.file-manager-graphql/images/568b1fca-54ad-4bd9-a4e5-a436d8593aa4___5ebd8a481eaaa2e08b4a321082454f57.png',
            alt: 'Banner image',
            href: '/apparel',
          },
          {
            desktop:
              'https://storeframework.vtexassets.com/assets/vtex.file-manager-graphql/images/fc761dcf-4d20-4c85-bd66-75a60c1b6ba2___089be619cc38afa7855f0e9ce1448d03.jpg',
            mobile:
              'https://storeframework.vtexassets.com/assets/vtex.file-manager-graphql/images/d2360f50-510a-46b8-a23a-7afa985d5bfd___28f09a258f871b5a0784a5118f60bf8c.jpg',
            alt: 'Fashion now',
            href: '/apparel',
          },
          {
            mobile:
              'https://storeframework.vtexassets.com/assets/vtex.file-manager-graphql/images/b598909e-3ed3-409a-acb2-85b173991acf___7977303925075a42404b38f91b350822.jpg',
            desktop:
              'https://storeframework.vtexassets.com/assets/vtex.file-manager-graphql/images/f26aecf2-3b02-47a6-9de7-78628accae97___c551a8ee6b99f96c39dc80cea1b592c9.jpg',
            alt: 'Apparel',
            href: '/apparel',
          },
        ]}
      /> */}

      <h1>{title}</h1>
    </>
  )
}

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        title
        description
        titleTemplate
      }
    }
    cmsHome {
      sections {
        name
        data
      }
    }
  }
`

export default Page
