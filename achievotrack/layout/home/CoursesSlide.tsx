import React from 'react'
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import CourseCard from './CourseCard'
import { Course } from '@/libs/types'
import { Entypo } from '@expo/vector-icons'
import { router } from 'expo-router'
import { View } from '@/components/Themed'

export default function CoursesSlide({
    data
}: {
    data: Course[]
}) {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
            {
                data && data?.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))
            }
            <View style={styles.add}>
                <TouchableOpacity style={styles.btn} onPress={() => router.push('/addCourse')}>
                    <Entypo name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 240,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: '#848383',
        padding: 10,
        borderRadius: 50,
        marginLeft: 20,
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    add: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
    }
})