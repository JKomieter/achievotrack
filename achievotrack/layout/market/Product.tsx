import DetailsImage from '@/layout/market/DetailsImage'
import ProductInfo from '@/layout/market/ProductInfo'
import { MarketItem } from '@/libs/types'
import { ViewStore } from '@/store/viewDetailsStore'
import React from 'react'

export default function Product({
    item,
    addItemToWishlist,
    showInterest,
    addLoading,
    interestLoading
}: {
    item: ViewStore,
    addItemToWishlist: (item: MarketItem) => Promise<void>,
    showInterest: (item: MarketItem) => Promise<void>,
    addLoading: boolean,
    interestLoading: boolean
}) {
    return (
        <>
            <DetailsImage images={item.images} />
            <ProductInfo item={item} addItemToWishlist={addItemToWishlist} addLoading={addLoading} interestLoading={interestLoading} showInterest={showInterest} />
        </>
    )
}
