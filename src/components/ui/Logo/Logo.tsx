import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

function Logo() {
  const homeLogo = useStaticQuery(graphql`
    query homeLogo {
      contentfulAsset(contentful_id: { eq: "3IreNeSQrsdrwqCroeewIx" }) {
        title
        file {
          url
        }
      }
    }
  `)

  return (
    <span>
      <img
        className="w-20"
        alt={homeLogo.contentfulAsset.title}
        src={homeLogo.contentfulAsset.file.url}
      />
    </span>
  )
}

export default Logo
