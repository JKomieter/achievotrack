import React from 'react'
import { View, Text } from '@/components/Themed'
import { StyleSheet } from 'react-native'
import ScheduleList from './ScheduleList'

export default function Schedule() {
  return (
    <View style={styles.container}>
          <Text style={styles.title}>Your Schedule</Text>
          <ScheduleList />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 18,
        width: '100%',
        flex: 1,
    },
    title: {
        paddingLeft: 16,
        fontSize: 19,
        fontWeight: '500',
        paddingBottom: 10
    },
})