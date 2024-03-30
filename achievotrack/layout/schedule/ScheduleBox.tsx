import { View, Text } from '../../components/Themed'
import React from 'react'
import { ColorValue, DimensionValue, StyleSheet } from 'react-native'

export default function ScheduleBox({
    width,
    title,
    num,
    color,
    backgroundColor,
}: {
    width: DimensionValue,
    title: string,
    num: number,
    color: string,
    backgroundColor: ColorValue,
}) {
  return (
    <View style={{flexBasis: width, backgroundColor, ...styles.container}}>
        <Text style={{color, ...styles.num}}>{num}</Text>
        <Text style={{color, ...styles.title}}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: 10,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    num: {
        fontSize: 35,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 17,
        fontWeight: '300'
    },
})