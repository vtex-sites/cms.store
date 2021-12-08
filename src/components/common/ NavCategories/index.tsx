import { useStaticQuery, graphql, Link } from 'gatsby'
import React from 'react'
import type { NavlinksQueryQuery } from '@generated/graphql'

function NavCategories() {
  const links = useStaticQuery<NavlinksQueryQuery>(graphql`
    query NavlinksQuery {
      allStoreCollection(limit: 2, filter: { type: { eq: Department } }) {
        nodes {
          slug
          seo {
            title
          }
        }
      }
    }
  `)

  return (
    <header className="flex flex-col sm:flex-row items-center bg-white">
      <nav className="flex flex-row items-end ml-10">
        {links.allStoreCollection.nodes.map((x) => (
          <Link
            className="m-1 text-black font-bold mr-10 font-normal text-xl"
            key={x.slug}
            to={`/${x.slug}`}
          >
            {x.seo.title}
          </Link>
        ))}
      </nav>
    </header>
  )
}


export default NavCategories
