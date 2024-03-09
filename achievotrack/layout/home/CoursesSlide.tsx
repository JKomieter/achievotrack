import React from 'react'
import { View } from '@/components/Themed'
import { ScrollView } from 'react-native'
import CourseCard from './CourseCard'
import { Course } from '@/libs/types'

export default function CoursesSlide({
    data
}: {
    data: Course[]
}) {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
            {
                data && data?.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))
            }
        </ScrollView>
    )
}
