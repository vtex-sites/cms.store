import { Carousel } from '@faststore/ui'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { useImageWithArtDirection } from 'src/sdk/image/useImage'

interface Item {
  desktop: string
  mobile: string
  alt: string
  href: string
}

interface Props {
  allItems: Item[]
}

function CarouselItem({ desktop, mobile, alt, href }: Item) {
  const image = useImageWithArtDirection(
    { src: mobile, variant: 'carousel.mobile' },
    { src: desktop, variant: 'carousel.desktop' }
  )

  return (
    <Link to={href} className="w-full block">
      <GatsbyImage
        image={image}
        alt={alt}
        className="w-full aspect-[360/416] sm:aspect-[3330/1850]"
      />
    </Link>
  )
}

function CarouselSection({ allItems }: Props) {
  return (
    <Carousel>
      {allItems.map((item) => (
        <CarouselItem key={item.href} {...item} />
      ))}
    </Carousel>
  )
}

export default CarouselSection
