import React from 'react'
import { View } from '@/components/Themed'
import { ScrollView } from 'react-native'
import CourseCard from './CourseCard'

export default function CoursesSlide() {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
        </ScrollView>
    )
}
