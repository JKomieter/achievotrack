import { Text, View } from '@/components/Themed'
import CourseDescription from '@/layout/addCourse/CourseDescription'
import CourseSchedule from '@/layout/addCourse/CourseSchedule'
import InstructorDetails from '@/layout/addCourse/InstructorDetails'
import getCourses from '@/utils/getCourses'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type CourseScheduleProps = {
  day: string,
  start_time: time,
  stop_time: time,
}

export type time = {
  hours: number,
  minutes: number
}

export default function AddCourse() {
  const { mutate } = getCourses()
  const [syllabus, setSyllabus] = useState<{ name: string, base64String: string } | null>(null);
  const [schedules, setSchedules] = React.useState<CourseScheduleProps[]>([]);
  const [instructor, setInstructor] = useState<{ name: string, email: string } | null>(null);
  const [course, setCourse] = useState<{ name: string, description: string, credit: string } | null>({
    name: '',
    description: '',
    credit: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAddCourse = useCallback(async () => {
    console.log(course, instructor, syllabus, schedules);
    
    if (!course?.name || !course?.description || !course?.credit || !instructor?.name || !instructor?.email || !syllabus || !schedules.length) {
      return setError('All fields are required');
    }
    setIsLoading(true);
    const apiUrl = process.env.DEV_BACKEND_URL;
    const userId = await AsyncStorage.getItem('userId');
    const data = {
      course,
      instructor,
      syllabus,
      schedules,
      userId
    }
    const res = await axios.post(`${apiUrl}/addCourse`, data);
    if (res.status !== 200) {
      setError('Something went wrong');
      setIsLoading(false);
      return;
    }
    mutate();
    setTimeout(() => {
      setIsLoading(false);
      router.back()
    }, 2000)
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 3000)
    }
  }
    , [error])

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '100%', paddingHorizontal: 15, }} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Course Details</Text>
        <CourseDescription syllabus={syllabus} setSyllabus={setSyllabus} course={course} setCourse={setCourse} />
        <Text style={styles.title}>Instructor Details</Text>
        <InstructorDetails instructor={instructor} setInstructor={setInstructor} />
        <Text style={styles.title}>Course Schedule</Text>
        <CourseSchedule schedules={schedules} setSchedules={setSchedules} />
        <Text style={{ color: 'red', textAlign: 'center', marginBottom: 15 }}>{error}</Text>
        <TouchableOpacity style={styles.submitBtn} onPress={() => handleAddCourse()}>
          {
            isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.submitBtnText}>Add Course</Text>
          }
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 10,
  },
  submitBtn: {
    backgroundColor: '#d12323',
    paddingVertical: 15,
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600'
  }
})