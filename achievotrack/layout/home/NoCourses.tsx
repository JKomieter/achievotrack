import { Text, View } from '@/components/Themed'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'

export default function NoCourses() {
    const router = useRouter()
    
  return (
    <View style={styles.container}>
      <View style={styles.box}>
         <Image source={require('@/assets/images/addCourse.jpg')} style={{ width: "100%", height: "100%" }} contentFit='cover' />
              <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }} />
            <View style={styles.miniBox}>
                <Text style={styles.title}>Add your courses</Text>
                <Text style={styles.desc}>
                    Add your courses to keep track of your activities
                </Text>
                <TouchableOpacity style={styles.startBtn} onPress={() => router.push('/addCourse')}>
                    <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>Add Course</Text>
                </TouchableOpacity>
            </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    box: {
        width: '100%',
        height: '100%',
        backgroundColor: "#d12323",
        borderRadius: 25,
        display: "flex",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },
    miniBox: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: 20,
        backgroundColor: 'transparent',
        height: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: '900',
        textAlign: 'left',
        color: '#fff',
    },
    desc: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'left',
        width: '80%',
        marginTop: 10,
        fontWeight: '300',
    },
    startBtn: {
        backgroundColor: '#d12323',
        padding: 15,
        borderRadius: 25,
    },

})