import { Skeleton } from '@faststore/ui'
import React from 'react'
import ProductSummary from 'src/components/product/ProductSummary'
import { useProductsQuery } from 'src/sdk/product/useProductsQuery'

interface Props {
  items: number
  collection: string
  title: string
}

function Shelf({ items, collection, title }: Props) {
  const data = useProductsQuery({
    first: items,
    after: '0',
    sort: 'score_desc',
    term: '',
    selectedFacets: [{ key: 'productClusterIds', value: collection }],
  })

  return (
    <div className="my-10 min-h-[458px] sm:min-h-[568px]">
      <h2 className="text-center text-5xl pb-10">{title}</h2>
      <div className="flex w-full overflow-x-auto snap-x scroll-smooth">
        {data?.edges.map(({ node: product }, index) => (
          <ProductSummary
            className="block min-w-[250px] sm:min-w-[360px] snap-center px-10"
            key={`${product.id}-${index}`}
            product={product}
            index={index}
          />
        ))}
        {!data &&
          new Array(items)
            .fill(null)
            .map((_, index) => (
              <Skeleton
                key={`${Skeleton}-${index}`}
                className="block min-w-[250px] sm:min-w-[360px] snap-center mx-10 aspect-square"
              />
            ))}
      </div>
    </div>
  )
}

export default Shelf
