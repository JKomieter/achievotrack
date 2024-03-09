import { Text, View } from '@/components/Themed'
import { Course } from '@/libs/types'
import React from 'react'
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function CourseInformation({
    course
}: {
    course: Course | null
}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Course Information</Text>
            <View style={styles.box}>
                <View style={styles.top}>
                    <Text style={styles.name}>{course?.course?.name}</Text>
                    <TouchableOpacity>
                        <Feather name='edit' size={24} color='black' />
                    </TouchableOpacity>
                </View>
                <View style={styles.inst}>
                    <Text style={styles.instructor}>Instructor: {course?.instructor?.name}, </Text>
                    <Pressable>
                        <Text style={styles.email}>{course?.instructor?.email}</Text>
                    </Pressable>
                </View>
                <Text style={styles.instructor}>Description: {course?.course?.description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 20,
        marginBottom: 20
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10
    },
    box: {
        height: 180,
        width: '100%',
        borderRadius: 25,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        padding: 20,
        display: 'flex',
        gap: 15
    },
    top: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 15
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        alignItems: 'flex-end'
    },
    inst: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    instructor: {
        fontSize: 16,
        fontWeight: '300'
    },
    email: {
        textDecorationLine: 'underline',
        color: '#417aff'
    }
})