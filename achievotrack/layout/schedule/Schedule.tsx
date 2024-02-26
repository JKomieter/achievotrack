import React from 'react'
import { View, Text } from '@/components/Themed'
import { StyleSheet } from 'react-native'
import ScheduleList from './ScheduleList'
import getSchedules from '@/utils/getSchedules'

export default function Schedule() {
  const { data, isLoading } = getSchedules()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Schedule</Text>
      {isLoading ? <Text>Loading...</Text> : <ScheduleList schedules={data} />}
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