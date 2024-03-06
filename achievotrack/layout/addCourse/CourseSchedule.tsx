import { View, Text } from '@/components/Themed'
import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import { TimePickerModal } from 'react-native-paper-dates';
import { MaterialIcons } from '@expo/vector-icons';
import { CourseScheduleProps, time } from '@/app/addCourse';


const days = [
    { label: 'Monday', value: 'Monday' },
    { label: 'Tuesday', value: 'Tuesday' },
    { label: 'Wednesday', value: 'Wednesday' },
    { label: 'Thursday', value: 'Thursday' },
    { label: 'Friday', value: 'Friday' },
    { label: 'Saturday', value: 'Saturday' },
    { label: 'Sunday', value: 'Sunday' },
]

export default function CourseSchedule({
    schedules,
    setSchedules
}: {
    schedules: CourseScheduleProps[],
    setSchedules: React.Dispatch<React.SetStateAction<CourseScheduleProps[]>>
}) {
    
    const [day, setDay] = React.useState<string>('');
    const [visibleStartTime, setVisibleStartTime] = useState(false)
    const [visibleStopTime, setVisibleStopTime] = useState(false)
    const [start_time, setStartTime] = useState<time>({
        hours: 0,
        minutes: 0
    });
    const [stop_time, setStopTime] = useState<time>({
        hours: 0,
        minutes: 0
    });
    const onDismissStartTime = React.useCallback(() => {
        setVisibleStartTime(false)
    }, [setVisibleStartTime])

    const onConfirmStartTime = React.useCallback(
        ({ hours, minutes }: { hours: number, minutes: number }) => {
            setVisibleStartTime(false);
            setStartTime({ hours, minutes })
        },
        [setVisibleStartTime]
    );

    const onDismissStopTime = React.useCallback(() => {
        setVisibleStopTime(false)
    }, [setVisibleStopTime])

    const onConfirmStopTime = React.useCallback(
        ({ hours, minutes }: { hours: number, minutes: number }) => {
            setVisibleStopTime(false);
            setStopTime({ hours, minutes })
        },
        [setVisibleStopTime]
    );

    const addSchedule = () => {
        if (day && start_time && stop_time) {
            const hasDay = schedules.find((schedule) => schedule.day === day)
            if (hasDay) {
                const newSchedules = schedules.map((schedule) => {
                    if (schedule.day === day) {
                        return {
                            day,
                            start_time,
                            stop_time
                        }
                    }
                    return schedule
                })
                setSchedules(newSchedules)
            } else {
                setSchedules([...schedules, { day, start_time, stop_time }])
            }
        }
    }

    return (
        <View style={styles.container}>
            <Dropdown
                placeholder='Select Day'
                data={days}
                labelField={'label'}
                valueField={'label'}
                style={styles.input}
                value={day}
                onChange={(item) => setDay(item.label)}
            />

            <View style={styles.times}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} onPressIn={() => setVisibleStartTime(true)} value={`${start_time?.hours || 'Start'}${start_time?.hours ? ':' : ' '}${start_time?.minutes || 'Time'}`} placeholder='Start Time' />
                    <TimePickerModal visible={visibleStartTime} hours={start_time?.hours} minutes={start_time?.minutes} onDismiss={onDismissStartTime}
                        onConfirm={onConfirmStartTime} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} onPressIn={() => setVisibleStopTime(true)} value={`${stop_time?.hours || 'Stop'}${stop_time?.hours ? ':' : ' '}${stop_time?.minutes || 'Time'}`} placeholder='Stop Time' />
                    <TimePickerModal visible={visibleStopTime} hours={stop_time?.hours} minutes={stop_time?.minutes} onDismiss={onDismissStopTime}
                        onConfirm={onConfirmStopTime} />
                </View>
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => addSchedule()}
                >
                    <Text style={styles.btnTxt}>
                        Add
                    </Text>
                </TouchableOpacity>
            </View>
            {schedules.length > 0 && <View style={styles.scheduleContainer}>
                {
                    schedules.map((schedule) => (
                        <View style={styles.schedule} key={schedule.day}>
                            <Text style={styles.scheduleTxt}>{schedule.day}</Text>
                            <Text style={styles.scheduleTxt}>{schedule.start_time.hours}:{schedule.start_time.minutes} - {schedule.stop_time.hours}:{schedule.stop_time.minutes}</Text>
                            <MaterialIcons name="cancel" size={20} color="black" />
                        </View>
                    ))
                }
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 25,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10,
        padding: 10,
        marginBottom: 15,
    },
    inputContainer: {
        flexBasis: '45%',
    },
    input: {
        width: '100%',
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 20,
        fontSize: 16,
        fontWeight: '300',
        color: '#000000',
    },
    times: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        gap: 10
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '100%',
    },
    addBtn: {
        backgroundColor: '#848383',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 30,
        width: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTxt: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: '600'
    },
    scheduleContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        width: '100%',
        gap: 10,
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 25
    },
    schedule: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        gap: 10,
        backgroundColor: '#f2f2f2',
    },
    scheduleTxt: {
        color: '#000',
        fontSize: 16,
        fontWeight: '300'
    }
});