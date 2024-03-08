import { View, Text } from '@/components/Themed'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function CourseStats() {
  return (
    <View style={styles.container}>
          <Text style={styles.title}>Stats Chart</Text>
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
})