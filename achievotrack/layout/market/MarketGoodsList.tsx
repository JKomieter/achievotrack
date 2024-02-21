import { View, Text } from '@/components/Themed'
import React from 'react'
import { StyleSheet } from 'react-native'
import MarketGoodCard from './MarketGoodCard'

export default function MarketGoodsList() {
  return (
    <View style={styles.container}>
        <MarketGoodCard />
          <MarketGoodCard />
          <MarketGoodCard />
          <MarketGoodCard />
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