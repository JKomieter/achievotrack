import { View, Text } from '@/components/Themed'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

export default function NoSchedule() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.box} >
                <Image source={require('@/assets/images/NoSchedule.jpg')} style={{ width: "100%", height: "100%" }} contentFit='cover' />
                <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }} />
                <View style={styles.miniBox}>
                    <Text style={styles.title}>Manage your schedules</Text>
                    <Text style={styles.desc}>
                        Add your schedules to keep track of your activities
                    </Text>
                    <TouchableOpacity style={styles.startBtn} onPress={() => router.push('/schedule')}>
                        <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>Add Schedule</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 20
    },
    box: {
        width: '100%',
        minHeight: 250,
        borderRadius: 30,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        flexDirection: 'column',
        overflow: 'hidden',
    },
    title: {
        fontSize: 20,
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: 150
    },
    imgContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 25,
        overflow: 'hidden',
    }, 
    miniBox: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        bottom: 50,
        padding: 20,
        backgroundColor: 'transparent',
    }
})