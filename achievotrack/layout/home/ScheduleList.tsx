import React from 'react'
import { View } from '@/components/Themed'
import { StyleSheet } from 'react-native'
import ScheduleCard from './ScheduleCard'

export default function ScheduleList() {
    return (
        <View style={styles.container}>
            <ScheduleCard />
            <ScheduleCard />
            <ScheduleCard />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 10,
        marginHorizontal: 16
    }
})