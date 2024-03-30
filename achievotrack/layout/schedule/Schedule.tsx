import React from 'react'
import { View, Text } from '../../components/Themed'
import { StyleSheet } from 'react-native'
import ScheduleList from './ScheduleList'
import getSchedules from '../../utils/getSchedules'
import NoSchedule from './NoSchedule'

export default function Schedule() {
  const { data, isLoading } = getSchedules()
  const hasSchedule =( data !== undefined && data.length > 0) || isLoading;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Schedule</Text>
      {hasSchedule ? <ScheduleList schedules={data} /> : <NoSchedule />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    width: '100%',
    flex: 1,
    paddingBottom: 20
  },
  title: {
    paddingLeft: 16,
    fontSize: 19,
    fontWeight: '500',
    paddingBottom: 10
  },
})