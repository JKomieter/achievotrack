import { View } from '@/components/Themed'
import ScheduleGroup from '@/layout/schedule/ScheduleGroup'
import ScheduleList from '@/layout/schedule/ScheduleList'
import getSchedules from '@/utils/getSchedules'
import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'

export default function Schedule() {
  const { scheduleStats, data } = getSchedules()

  return (
    <View style={styles.container}>
      <ScrollView style={{width: '100%'}}>
        <ScheduleGroup stats={scheduleStats} />
        <ScheduleList schedules={data} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 20,
  }
})