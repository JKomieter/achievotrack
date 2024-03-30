import { View } from '../../components/Themed'
import React from 'react'
import { StyleSheet } from 'react-native'
import ScheduleBox from './ScheduleBox';

export default function ScheduleGroup({
  stats
}: {
  stats: {
    numExams: number;
    numHomeworks: number;
    numProjects: number;
    numQuizzes: number;
  } | null
}) {
  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <ScheduleBox width='40%' title='Exams' num={stats?.numExams || 0} color='#ffff' backgroundColor="#848383" />
        <ScheduleBox width='60%' title='Homeworks' num={stats?.numHomeworks || 0} color='#fff' backgroundColor="#848383" />
      </View>
      <View style={styles.group}>
        <ScheduleBox width='60%' title='Quizzes' num={stats?.numQuizzes || 0} color='#ffffff' backgroundColor="#d12323" />
        <ScheduleBox width='40%' title='Projects' num={stats?.numProjects || 0} color='#fff' backgroundColor="#848383" />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
    gap: 10,
    paddingVertical: 10,
  },
  group: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '90%',
  }
});