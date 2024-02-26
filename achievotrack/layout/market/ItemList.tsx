import { View, Text } from '@/components/Themed'
import React from 'react'
import { StyleSheet } from 'react-native'
import MarketGoodCard from './MarketGoodCard'
import { MarketItem } from '@/libs/types'

export default function ItemList({
  items
}: {
  items: MarketItem[]
}) {
  return (
    <View style={styles.container}>
      {
        items?.length > 0 && items?.map((item) => (
          <MarketGoodCard item={item} key={item.description} />
        ))
      }
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  }
})