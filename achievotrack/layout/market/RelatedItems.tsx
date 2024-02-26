import { View, Text } from '@/components/Themed'
import React from 'react'
import { StyleSheet } from 'react-native'
import MarketGoodCard from './MarketGoodCard'

export default function RelatedItems() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Related Items</Text>
        <MarketGoodCard />
        <MarketGoodCard />
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        width: '90%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        marginTop: 30,
    },
    title: {
        fontWeight: '500',
        fontSize: 24,
        textAlign: 'left',
        width: '100%',
    },
})