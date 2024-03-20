import { View, Text } from '@/components/Themed'
import { MarketItem } from '@/libs/types'
import { ViewStore } from '@/store/viewDetailsStore'
import React from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'


export default function ProductInfo({
    item,
    addItemToCart,
    isLoading
}: {
    item: ViewStore,
    addItemToCart: (item: MarketItem) => Promise<void>,
    isLoading: boolean
}) {
    const i = {
        id: item.id,
        title: item.title,
        description: item.description,
        images: item.images,
        sellerId: item.sellerId,
        sellerName: item.sellerName,
        sellerEmail: item.sellerEmail,
        sellerPhone: +item.sellerPhone,
        price: item.price,
        category: item.category,
        createdAt: item.createdAt
    } as MarketItem;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.description}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <Text style={styles.seller}>Sold by: <Text style={{ fontWeight: '500' }}>{item.sellerName}</Text></Text>
            <Text style={styles.seller}>Email: <Text style={{ fontWeight: '500' }}>{item.sellerEmail}</Text></Text>
            <Text style={styles.seller}>Phone: <Text style={{ fontWeight: '500' }}>{item.sellerPhone}</Text></Text>
            <View style={styles.actions}>
                <TouchableOpacity style={styles.action} onPress={() => addItemToCart(i)}>
                    {isLoading ? <ActivityIndicator color='#fff' size={24} /> :
                        <Text style={styles.actionTxt}>Add to Cart</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.action, backgroundColor: '#d12323' }}>
                    <Text style={styles.actionTxt}>Show Interest</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        paddingHorizontal: 20,
    },
    title: {
        fontWeight: '500',
        fontSize: 24
    },
    desc: {
        fontWeight: '300',
        fontSize: 16,
    },
    price: {
        fontWeight: '800',
        fontSize: 20,
        marginBottom: 15,
    },
    seller: {
        fontWeight: '300',
        fontSize: 16
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginTop: 15,
    },
    action: {
        padding: 20,
        borderRadius: 30,
        backgroundColor: '#848383',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    actionTxt: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 17
    }
})