import { View, Text } from '@/components/Themed'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'

export default function MarketGoodCard() {
  return (
    <View style={styles.container}>
        <View style={styles.imgContainer}>
              <Image source={require('../../assets/images/placeholder.jpg')} style={{ width: "100%", height: "100%" }} contentFit='cover' />
        </View>
        <View style={styles.info}>
            <Text style={styles.title}>Mathematics textbook</Text>
            <Text style={styles.desc}>This is a mathematics text book for sophomores</Text>
            <Text style={styles.price}>$15.00</Text>
            <TouchableOpacity style={styles.btn}>
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
        backgroundColor: '#d12323',
        width: '100%'
    },
    btnText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center'
    }
})
