import { View, Text } from '@/components/Themed'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function CourseUpdates({
    due,
    currentGrade,
    deadline
}: {
    due: number,
    currentGrade: string | undefined,
    deadline: string | undefined
}) {

    return (
        <View style={styles.container}>
            <View style={styles.topInfo}>
                <Text style={styles.assg}>Tasks due: {due}</Text>
                <View style={styles.deadline}>
                    <Ionicons name="timer-sharp" size={20} color="#d12323" />
                    <Text style={styles.assg}>{deadline}</Text>
                </View>
            </View>
            <View style={styles.bottomInfo}>
                <View style={styles.grade}>
                    <FontAwesome6 name="medal" size={24} color="green" />
                    <Text style={styles.assg}>{currentGrade}</Text>
                </View>
                <View style={styles.rem}>
                    <FontAwesome name="bell" size={24} color="#fff" />
                    <Text style={styles.remNum}>{2}</Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        alignContent: "center",
        gap: 10,
        flexDirection: "column",
        justifyContent: "space-around",
    },
    topInfo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    assg: {
        fontSize: 15,
        fontWeight: "500",
        color: "#666565"
    },
    deadline: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 1
    },
    bottomInfo: {
        display: "flex",
        flexDirection: "row",
        // justifyContent: "space-between",
        alignItems: "center",
        gap: 20
    },
    grade: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 1
    },
    rem: {
        borderRadius: 25,
        paddingVertical: 3,
        paddingHorizontal: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
        backgroundColor: "#848383"
    },
    remNum: {
        fontSize: 13,
        fontWeight: "500",
        color: "#fff"
    }
})