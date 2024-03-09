import { View, Text } from '@/components/Themed'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function GradeBreakDown({
    avgHomeworkGrade,
    avgExamsGrade,
    avgQuizGrade,
    avgProjectGrade,
}: {
    avgHomeworkGrade: number | undefined,
    avgExamsGrade: number | undefined
    avgQuizGrade: number | undefined,
    avgProjectGrade: number | undefined
}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Grade Breakdown</Text>
            <View style={styles.box}>
                <View style={styles.info}>
                    <Text style={styles.name}>Homework:</Text>
                    <Text style={styles.value}>{avgHomeworkGrade}%</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.name}>Exams:</Text>
                    <Text style={styles.value}>{avgExamsGrade}%</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.name}>Quiz:</Text>
                    <Text style={styles.value}>{avgQuizGrade}%</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.name}>Project:</Text>
                    <Text style={styles.value}>{avgProjectGrade}%</Text>
                </View>
            </View>
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
    box: {
        height: 160,
        width: '100%',
        borderRadius: 25,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 15
    },
    info: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    name: {
        fontSize: 16,
        fontWeight: '300'
    },
    value: {
        fontSize: 16,
        fontWeight: '500'
    }
})