import React from 'react'
import { View, Text } from '@/components/Themed'
import { StyleSheet } from 'react-native'
import CoursesSlide from './CoursesSlide'

export default function Courses() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Your Courses</Text>
        <View style={styles.slide}>
            <CoursesSlide /> 
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 18,
        width: '100%',
        flex: 1,
    },
    title: {
        paddingLeft: 16,
        fontSize: 19,
        fontWeight: '500',
        paddingBottom: 6
    },
    slide: {
        height: 240,
        display: "flex",
        alignContent: "center",
        justifyContent: "center"
    }
})