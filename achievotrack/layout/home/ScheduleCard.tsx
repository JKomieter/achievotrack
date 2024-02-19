import { View, Text } from '@/components/Themed'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ScheduleCard() {
    const router = useRouter()

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Study for Physics Test</Text>
                <FontAwesome5 name="brain" size={22} color="#d38989" />
            </View>
            <View style={styles.info}>
                <View style={styles.left}>
                    <Text style={styles.date}>Date: 2024-10-10</Text>
                    <Text style={styles.date}>Time: 3:00PM - 4:00PM</Text>
                    <Text style={styles.date}>Course: Physics</Text>
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => router.push("/editSchedule")}>
                        <Text style={styles.actionTxt}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Text style={styles.actionTxt}>Start</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 150,
        backgroundColor: "#f0f0f0",
        minWidth: "100%",
        borderRadius: 25,
        padding: 10,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        gap: 10
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        flexDirection: "row",
        width: "100%",
        marginBottom: 15
    },
    title: {
        fontSize: 17,
        fontWeight: "900"
    },
    date: {
        fontSize: 14,
        color: "#4d4d4d"
    },
    info: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        flexDirection: "row",
        width: "100%",
    },
    left: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 5,
        backgroundColor: "#f0f0f0",
    },
    actions: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        backgroundColor: "#f0f0f0",
        flexDirection: "column",
        gap: 6
    },
    actionBtn: {
        backgroundColor: "#ffffff",
        paddingVertical: 6,
        paddingHorizontal: 18,
        borderRadius: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: 80
    },
    actionTxt: {
        color: "#000000",
        fontSize: 14,
        fontWeight: "700"
    }
})
