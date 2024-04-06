import { View, Text } from '@/components/Themed'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

export default function WriteReview() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={() => router.push('/addReview')} >
        <Text style={styles.btnTxt}>
            Write a Review
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: "absolute",
        bottom: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20
    },
    btn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d12323",
        borderRadius: 30,
        width: "100%",
        padding: 15
    },
    btnTxt: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 17
    }
})