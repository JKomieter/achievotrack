import { View, Text } from '@/components/Themed'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function ProfileStats({
    classes,
    tasks,
    grade
}: {
    classes: number,
    tasks: number,
    grade: string
}) {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.info}>
                    <Text style={styles.num}>{classes || 0}</Text>
                    <Text style={styles.name}>Classes</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.num}>{tasks || 0}</Text>
                    <Text style={styles.name}>Tasks</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.num}>{grade || 'A'}</Text>
                    <Text style={styles.name}>Grade</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 20
    },
    box: {
        width: '100%',
        height: 100,
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
    info: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 3
    },
    num: {
        fontSize: 24,
        fontWeight: '600'
    },
    name: {
        fontSize: 16,
        fontWeight: '300'
    }
})