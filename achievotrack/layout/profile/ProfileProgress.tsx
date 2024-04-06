import { View, Text } from '@/components/Themed'
import React from 'react'
import { StyleSheet } from 'react-native'
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons';

export default function ProfileProgress({
    completed_tasks,
    study_time,
    achievements
}: {
    completed_tasks: number,
    study_time: number,
    achievements: string[]
}) {
    const stats = [
        {
            name: 'Completed Tasks',
            num: completed_tasks || 0,
            icon: <FontAwesome name="tasks" size={22} color="#28a745" />
        },
        {
            name: 'Study Time',
            num: `${study_time || 0} hrs`,
            icon: <Ionicons name="time-sharp" size={26} color="#007bff" />
        },
        {
            name: 'Achievements',
            num: achievements?.length || 0,
            icon: <AntDesign name="star" size={24} color="#ffd700" />
        }
    ]

    return (
        <View style={styles.container}>
            {
                stats.map((stat) => (
                    <View key={stat.name} style={styles.box}>
                        <View style={styles.left}>
                            {stat.icon}
                            <Text style={styles.name}>{stat.name}</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.num}>{stat.num }</Text>
                        </View>
                    </View>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 25,
        paddingHorizontal: 25,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        marginBottom: 20
    },
    box: {
        width: '100%',
        height: 80,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    left: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10
    },
    right: {
        borderRadius: 25,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderColor: '#818181',
        borderWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    num: {
        fontSize: 20,
        fontWeight: '500'
    },
    name: {
        fontSize: 17,
        fontWeight: '300'
    }
})