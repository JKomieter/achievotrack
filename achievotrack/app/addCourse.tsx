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
import useCourseEditStore from '@/store/useCourseEditStore'
import { CourseScheduleProps } from '@/libs/types'

const API_URL = process.env.EXPO_PUBLIC_DEV_BACKEND_URL;

const SubmitButton = ({
  onPress,
  color,
  isLoading,
  txt
}: {
  onPress: () => void,
  color: string,
  isLoading: boolean,
  txt: string
}) => (
  <TouchableOpacity style={{ ...styles.submitBtn, backgroundColor: color }} onPress={onPress}>
    {isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.submitBtnText}>{txt}</Text>}
  </TouchableOpacity>
);

export default function AddCourse() {
  const { mutate } = getCourses();
  const {
    id,
    syllabus: syllabus_,
    meetingTimes: meetingTimes_,
    instructor: instructor_,
    course: course_,
    setCourseStore,
  } = useCourseEditStore()
  const [syllabus, setSyllabus] = useState<{ name: string, base64String: string } | null>(syllabus_);
  const [meetingTimes, setMeetingTimes] = React.useState<CourseScheduleProps[]>(meetingTimes_);
  const [instructor, setInstructor] = useState<{ name: string, email: string } | null>(instructor_);
  const [course, setCourse] = useState<{ name: string, description: string, credit: string } | null>(course_);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAddCourse = async () => {
    if (!course?.name || !course?.description || !course?.credit || !instructor?.name || !instructor?.email || !meetingTimes.length) {
      return setError('All fields are required');
    }
    try {
      setIsLoading(true);
      const userId = await AsyncStorage.getItem('userId');
      const data = {
        course,
        instructor,
        syllabus,
        meetingTimes,
        userId
      }
      const res = await axios.post(`${API_URL}/addCourse`, data);
      if (res.status !== 200) {
        setError('Something went wrong');
        setIsLoading(false);
        return;
      }
      mutate();
      setIsLoading(false);
      router.back()
    } catch (error) {
      console.log(error);
      setError('Something went wrong');
    } finally {
      setIsLoading(false)
    }
  };

  const handleEditCourse = useCallback(async () => {
    if (!(id.length > 0)) return setError('Something went wrong. Please try again.');
    setIsLoading(true);
    const userId = await AsyncStorage.getItem('userId');
    const data = {
      id,
      meetingTimes,
      syllabus,
      instructor,
      course,
      userId
    }
    try {
      const res = await axios.post(`${API_URL}/editCourse`, data);
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
    } catch (error) {
      console.log(error);
      setError('Something went wrong');
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 3000)
    }
  }, [error])

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '100%', paddingHorizontal: 15, }} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Course Details</Text>
        <CourseDescription syllabus={syllabus} setSyllabus={setSyllabus} course={course} setCourse={setCourse} />
        <Text style={styles.title}>Instructor Details</Text>
        <InstructorDetails instructor={instructor} setInstructor={setInstructor} />
        <Text style={styles.title}>Course Schedule</Text>
        <CourseSchedule meetingTimes={meetingTimes} setMeetingTimes={setMeetingTimes} />
        <Text style={{ color: 'red', textAlign: 'center', marginBottom: 15 }}>{error}</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={{ ...styles.submitBtn, backgroundColor: '#848383' }} onPress={() => {
            setCourseStore('', { name: '', email: '' }, { name: '', base64String: '' }, { name: '', description: '', credit: '', }, [])
            router.back()
          }}>
            <Text style={styles.submitBtnText}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitBtn} onPress={() => id.length > 0 ? handleEditCourse() : handleAddCourse()}>
            {
              isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.submitBtnText}>
                {id ? 'Edit Course' : 'Add Course'}
              </Text>
            }
          </TouchableOpacity>
        </View>
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
    minWidth: 120,
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600'
  },
  btnContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    flexDirection: 'row',
    marginBottom: 50,
    paddingHorizontal: 10
  }
})