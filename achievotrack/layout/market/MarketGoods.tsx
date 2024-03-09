import { View, Text } from '@/components/Themed'
import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { MarketItem } from '@/libs/types'
import ItemList from './ItemList'

export default function MarketGoods({
    items
}: {
    items: MarketItem[]
}) {
    const router = useRouter();
    
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.top}>
                <Text style={styles.title}>Browse Resources</Text>
                <TouchableOpacity style={styles.sellBtn} onPress={() => router.push('/sell')}>
                    <Text style={styles.sellBtnText}>SELL</Text>
                </TouchableOpacity>
            </View>
            <ItemList items={items} />
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
    top: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },
    sellBtn: {
        backgroundColor: '#d12323',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        width: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sellBtnText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 16
    }
})