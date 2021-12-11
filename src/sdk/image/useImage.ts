/**
 * TODO:
 * gatsby-plugin-image currently blinks on SSR when the image is already loaded before hydration.
 * Eventually they will fix this issue in here: https://github.com/gatsbyjs/gatsby/issues/32037
 *
 * When they release this, we need to remember upgrading gatsby-plugin-image and this issue will be fixed
 */
import { useGetThumborImageData } from '@vtex/gatsby-plugin-thumbor'
import { withArtDirection } from 'gatsby-plugin-image'
import { useMemo } from 'react'
import imagesConf from 'src/images/config'

export const useImage = (src: string, variant: string) => {
  const getImage = useGetThumborImageData()

  return useMemo(
    () =>
      getImage({
        baseUrl: src,
        ...imagesConf[variant],
      }),
    [getImage, src, variant]
  )
}

export const useImageWithArtDirection = (
  { src: mobile, variant: mobileVariant }: { src: string; variant: string },
  { src: desktop, variant: desktopVariant }: { src: string; variant: string }
) => {
  const getImage = useGetThumborImageData()

  return useMemo(() => {
    const mobileImage = getImage({
      baseUrl: mobile,
      ...imagesConf[mobileVariant],
    })

    const desktopImage = getImage({
      baseUrl: desktop,
      ...imagesConf[desktopVariant],
    })

    return withArtDirection(mobileImage, [
      {
        media: '(min-width: 40em)',
        image: desktopImage,
      },
    ])
  }, [desktop, desktopVariant, getImage, mobile, mobileVariant])
}
