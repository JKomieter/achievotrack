import { View, Text } from '@/components/Themed'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { Avatar } from 'react-native-paper'
import CourseUpdates from './CourseUpdates'
import { Course, Schedule } from '@/libs/types'
import { useRouter } from 'expo-router'
import useGoToCourseStore from '@/store/useGoToCourseStore'
import { formatDate } from '@/utils/formatDate'

const Status = () => {
    return (
        <View style={styles.statusContainer}>
            <View style={styles.status}></View>
        </View>
    )
}

const CourseTitle = ({
    name
}: {
    name: string
}) => {
    return (
        <View style={styles.titleContainer}>
            <View>
                <Avatar.Image size={30} source={require('@/assets/images/placeholder.jpg')} />
            </View>
            <Text style={styles.coursename}>{name.slice(0, 13)}</Text>
        </View>
    )
}

export default function CourseCard({
    course
}:{
    course: Course
}) {
    const router = useRouter();
    const { setCourseId } = useGoToCourseStore()

    const goToCourse = () => {
        setCourseId(course.id)
        router.push('/course');
    }

    function getClosestSchedule(schedules: Schedule[]): string | undefined {
        if (schedules.length === 0) {
            return '2024-10-10';
        }

        schedules.sort((a, b) => {
            const aDate = new Date(a.date).getTime();
            const bDate = new Date(b.date).getTime();
            return aDate - bDate; // sort in ascending order
        });
        
        let deadline = formatDate(new Date(schedules[0].date));
        
        console.log('deadline', deadline);
        return deadline || '2024-10-10';
    }
    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => goToCourse()}>
                <View style={styles.imgContainer}>
                    <Image source={require('../../assets/images/placeholder.jpg')} style={{ width: "100%", height: "100%" }} contentFit='cover' />
                    <Status />
                </View>
                <CourseTitle name={course.course.name} />
                <CourseUpdates due={course.schedules.length} currentGrade={course?.stats?.currentGrade} deadline={getClosestSchedule(course?.schedules)} />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: 250,
        marginLeft: 16,
        marginTop: 4,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
        maxHeight: 210,
        display: "flex",
        flexDirection: "column",
        padding: 10,
    },
    imgContainer: {
        width: "100%",
        borderRadius: 25,
        overflow: "hidden",
        flexBasis: "50%",
    },
    statusContainer: {
        position: "absolute",
        top: 10,
        right: 10,
        padding: 4,
        backgroundColor: "white",
        borderRadius: 25
    },
    status: {
        width: 15,
        height: 15,
        backgroundColor: "green",
        borderRadius: 25
    },
    titleContainer: {
        borderRadius: 25,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        width: '75%',
        height: 40,
        paddingLeft: 10,
        transform: [{ translateY: -14 }, { translateX: 20 }],
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    coursename: {
        fontSize: 16,
        fontWeight: "500",
        color: "black"
    }
})