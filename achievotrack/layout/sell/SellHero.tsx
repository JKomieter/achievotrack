import { Text, View } from '@/components/Themed'
import React from 'react'
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'

export default function SellHero() {
    return (
        <View style={styles.imgContainer}>
            <Image source={require('../../assets/images/sellHero.jpg')} style={{ width: "100%", height: "100%" }} contentFit='cover' />
            <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }} />
            <Text style={styles.heroTxt}>
                Make money and help others by selling your resources
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    imgContainer: {
        height: 300,
        overflow: 'hidden',
        width: '100%',
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: 20,
    },
    heroTxt: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        color: '#ffffff',
        fontSize: 30,
        fontWeight: '700',
        width: '60%'
    }
})