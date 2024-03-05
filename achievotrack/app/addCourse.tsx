import { Text, View } from '@/components/Themed'
import CourseDescription from '@/layout/addCourse/CourseDescription'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function AddCourse() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Course Details</Text>
      <CourseDescription />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'left',
        marginTop: 20,
        marginVertical: 20
    }
})