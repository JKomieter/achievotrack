import { View, Text } from '@/components/Themed'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import MarketGoodsList from './MarketGoodsList'

export default function MarketGoods() {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Browse Resources</Text>
            <MarketGoodsList />
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginTop: 10
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        paddingBottom: 6,
        marginTop: 20,
        marginBottom: 15
    },
})