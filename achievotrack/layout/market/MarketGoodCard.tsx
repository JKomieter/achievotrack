import { View, Text } from '@/components/Themed'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { MarketItem } from '@/libs/types'
import viewDetailsStore from '@/store/viewDetailsStore'

export default function MarketGoodCard({
    item
}: {
    item: MarketItem
}) {
    if (!item || !item.images) {
        return null; 
    }

    const router = useRouter();
    const { setViewDetails } = viewDetailsStore()

    const openDetails = () => {
        setViewDetails(
            item.id,
            item.title,
            item.description,
            item.images,
            item.sellerId,
            item.sellerName,
            item.sellerEmail,
            item.sellerPhone.toString(),
            item.price,
            item.category,
            item.createdAt
        )
        router.push('/itemDetails');
    }

    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                {item?.images?.length > 0 &&
                    <Image source={{ uri: item?.images[0] || '' }} style={{ width: "100%", height: "100%" }} contentFit='cover' placeholder='' />
                }
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>T{item.description.slice(0, 40)}...</Text>
                <Text style={styles.price}>${item.price}</Text>
                <TouchableOpacity style={styles.btn} onPress={() => openDetails()}>
                    <Text style={styles.btnText}>View Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: 280,
        width: '98%',
        borderRadius: 25,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        padding: 10,
        gap: 10,
    },
    imgContainer: {
        height: '50%',
        overflow: 'hidden',
        borderRadius: 25
    },
    info: {
        display: 'flex',
        gap: 8,
        alignContent: 'flex-start',
        height: '40%'
    },
    title: {
        fontWeight: '500',
        fontSize: 18
    },
    desc: {
        fontWeight: '200'
    },
    price: {
        fontSize: 15,
        fontWeight: '500'
    },
    btn: {
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 25,
        backgroundColor: '#848383',
        width: '100%'
    },
    btnText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center'
    }
})
