import { View, Text } from '@/components/Themed'
import { Schedule } from '@/libs/types'
import React from 'react'
import { StyleSheet } from 'react-native'
import ScheduleCard from '../schedule/ScheduleCard'

export default function CourseSchedule({
    schedules
}: {
    schedules: Schedule[] | undefined
}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Course Schedule</Text>
            <View style={styles.list}>
                {schedules && schedules?.map((sch) => (
                    <ScheduleCard key={sch.id} schedule={sch} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 20,
        marginBottom: 20
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10
    },
    list: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        flexDirection: 'column'
    }
})
