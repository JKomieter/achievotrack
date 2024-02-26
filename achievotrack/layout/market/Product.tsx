import DetailsImage from '@/layout/market/DetailsImage'
import ProductInfo from '@/layout/market/ProductInfo'
import { MarketItem } from '@/libs/types'
import { ViewStore } from '@/store/viewDetailsStore'
import React from 'react'

export default function Product({
    item,
    addItemToCart,
    isLoading
}: {
    item: ViewStore,
    addItemToCart: (item: MarketItem) => Promise<void>,
    isLoading: boolean
}) {
    return (
        <>
            <DetailsImage images={item.images} />
            <ProductInfo item={item} addItemToCart={addItemToCart} isLoading={isLoading} />
        </>
    )
}
