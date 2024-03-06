import { View, Text } from '@/components/Themed'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import useScheduleStore from '@/store/useScheduleStore';
import { Action, Schedule, ScheduleType } from '@/libs/types';
import { formatDate, convertTo12HourFormat } from '@/utils/formatDate';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getSchedules from '@/utils/getSchedules';

export default function ScheduleCard({
    schedule
}: {
    schedule: Schedule
}) {
    const router = useRouter()
    const { setDetails, setId } = useScheduleStore();
    const { mutate } = getSchedules()

    const openEdit = () => {
        let scheduleType: ScheduleType = ScheduleType.HOMEWORK; 
        switch (schedule.scheduleType.toLowerCase()) {
            case 'homework':
                scheduleType = ScheduleType.HOMEWORK
                break;
            case 'exam':
                scheduleType = ScheduleType.EXAM
                break;
            case 'quiz':
                scheduleType = ScheduleType.QUIZ
                break;
            case 'project':
                scheduleType = ScheduleType.QUIZ
                break;
            default:
                scheduleType = ScheduleType.HOMEWORK; 
                break;
        }

        setDetails(
            schedule.title,
            schedule.date,
            { hours: schedule.start_time.hours, minutes: schedule.start_time.minutes },
            { hours: schedule.stop_time.hours, minutes: schedule.stop_time.hours },
            scheduleType,
            Action.EDIT
        );
        setId(schedule.id)
        router.push("/editSchedule")
    }

    const deleteSchedule = async () => {
        try {
            const apiUrl = process.env.DEV_BACKEND_URL;
            const userId = await AsyncStorage.getItem('userId');
            await axios.post(`${apiUrl}/deleteSchedule`, { scheduleId: schedule.id, userId });
            mutate()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{schedule.title}</Text>
                <FontAwesome5 name="brain" size={22} color="#d38989" />
            </View>
            <View style={styles.info}>
                <View style={styles.left}>
                    <Text style={styles.date}>Date: {formatDate(schedule.date)}</Text>
                    <Text style={styles.date}>Time: {convertTo12HourFormat(schedule.start_time)} - {convertTo12HourFormat(schedule.stop_time)}</Text>
                    <TouchableOpacity style={styles.startBtn}>
                        <Text style={{...styles.actionTxt, color: '#fff'}}>Start</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => openEdit()}>
                        <Text style={styles.actionTxt}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => deleteSchedule()}>
                        <Text style={styles.actionTxt}>Delete</Text>
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
    },
    startBtn: {
        backgroundColor: "#d12323",
        paddingVertical: 6,
        paddingHorizontal: 18,
        borderRadius: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: 80,
    }
})