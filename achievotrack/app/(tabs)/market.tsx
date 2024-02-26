import { View, Text } from '@/components/Themed'
import MarketGoods from '@/layout/market/MarketGoods'
import SearchSection from '@/layout/market/SearchSection'
import getItems from '@/utils/getItems'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function market() {
  const { data, isLoading } = getItems();

  return (
    <View style={styles.container}>
        <SearchSection />
        <MarketGoods items={data} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})
