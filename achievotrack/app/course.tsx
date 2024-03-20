import React, { useEffect, useState } from 'react'
import { View } from '@/components/Themed'
import { StyleSheet, ScrollView } from 'react-native'
import useGoToCourseStore from '@/store/useGoToCourseStore'
import getCourse from '@/utils/getCourse';
import CourseInformation from '@/layout/course/CourseInformation';
import { Course } from '@/libs/types'
import CourseStats from '@/layout/course/CourseStats';
import OverAll from '@/layout/course/OverAll';
import GradeBreakDown from '@/layout/course/GradeBreakDown';
import CourseSchedule from '@/layout/course/CourseSchedule';
import { PaperProvider } from 'react-native-paper';


export default function CourseDetails() {
  const { courseId } = useGoToCourseStore();
  const { data, isLoading, mutate } = getCourse(courseId)
  const [course, setCourse] = useState<Course | null>(null)
  const { setCourseName } = useGoToCourseStore()

  useEffect(() => {
    const courseName = data?.course?.name as string
    if (data) { setCourseName(courseName); setCourse(data) }
  }, [data])

  return (
    <PaperProvider>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CourseInformation course={course} mutate={mutate} />
          <CourseStats
            scores={course?.stats?.scores as number[]}
            courseId={course?.id}
          />
          <OverAll
            currentGrade={course?.stats?.currentGrade}
            avgScore={course?.stats?.averageScore}
            highestScore={course?.stats?.highestScore}
            lowestScore={course?.stats?.lowestScore}
          />
          <GradeBreakDown
            avgHomeworkGrade={course?.stats?.avgHomeworkGrade}
            avgExamsGrade={course?.stats?.avgExamsGrade}
            avgQuizGrade={course?.stats?.avgQuizGrade}
            avgProjectGrade={course?.stats?.avgProjectGrade}
          />
          <CourseSchedule schedules={course?.schedules} />
        </ScrollView>
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})