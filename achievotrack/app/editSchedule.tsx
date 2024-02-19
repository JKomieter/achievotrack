import { View, Text } from '@/components/Themed'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function EditSchedule() {
  return (
    <View style={styles.container}>
        <Text>Edit Schedule</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})