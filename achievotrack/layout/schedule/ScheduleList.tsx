import React from 'react'
import { View } from '@/components/Themed'
import { StyleSheet } from 'react-native'
import ScheduleCard from './ScheduleCard'
import { Schedule } from '@/libs/types'

export default function ScheduleList({
    schedules
}: {
    schedules: Schedule[]
}) {
    if (!schedules) return

    return (
        <View style={styles.container}>
            {schedules?.length > 0 && schedules?.map((sch) => (
                <ScheduleCard key={sch.title} schedule={sch} />
            ))}
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