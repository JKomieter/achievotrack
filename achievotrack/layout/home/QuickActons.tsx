import { View, Text } from '@/components/Themed'
import React from 'react'
import { StyleSheet } from 'react-native'
import ActionsSlide from './ActionsSlide'

export default function QuickActons() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Quick Actions</Text>
          <View style={styles.slide}>
            <ActionsSlide />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 18,
        width: '100%',
        flex: 1,
        maxHeight: 135
    },
    title: {
        paddingLeft: 16,
        fontSize: 19,
        fontWeight: '500',
        paddingBottom: 6
    },
    slide: {
        height: 240,
        display: "flex",
        alignContent: "center",
        justifyContent: "center"
    }
})
