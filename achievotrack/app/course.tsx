import React, { useEffect, useState } from 'react'
import { View } from '@/components/Themed'
import { StyleSheet, ScrollView } from 'react-native'
import useGoToCourseStore from '@/store/useGoToCourseStore'
import getCourse from '@/utils/getCourse';
import CourseInformation from '@/layout/course/CourseInformation';
import { Course } from '@/libs/types'
import CourseStats from '@/layout/course/CourseStats';

export default function CourseDetails() {
  const { courseId } = useGoToCourseStore();
  const { data, isLoading } = getCourse(courseId)
  const [ course, setCourse ] = useState<Course | null>(null)
  const { setCourseName } = useGoToCourseStore()
  
  useEffect(() => {
    const courseName = data?.course?.name as string
    if (data) {setCourseName(courseName); setCourse(data)}
  }, [data])

  return (
    <View style={styles.container}>
      <ScrollView>
        <CourseInformation course={course} />
        <CourseStats />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})