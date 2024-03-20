import { View, Text } from '@/components/Themed'
import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import MarketGoodCard from './MarketGoodCard'
import { MarketItem } from '@/libs/types'
import RelatedItemCard from './RelatedItemCard'

export default function RelatedItems({
  relatedItems
}: {
  relatedItems: MarketItem[]
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Related Items</Text>
      <View style={styles.related}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scroll}>
          {
            relatedItems?.length > 0 && relatedItems?.map((item) => (
              <RelatedItemCard item={item} key={item.id} />
            ))
          }
        </ScrollView>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 80,
    display: 'flex',
    gap: 10,
    marginTop: 20
  },
  title: {
    fontWeight: '500',
    fontSize: 24,
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 20
  },
  scroll: {
    width: '100%',
    gap: 10,
  },
  related: {
    width: '100%',
    gap: 10,
    paddingHorizontal: 20
  }
})