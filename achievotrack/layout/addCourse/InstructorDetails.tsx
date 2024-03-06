import { View, Text } from '@/components/Themed'
import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

export default function InstructorDetails({
    instructor,
    setInstructor
}: {
    instructor: { name: string, email: string } | null,
    setInstructor: React.Dispatch<React.SetStateAction<{ name: string, email: string } | null>>
}) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Instructor Name"
                value={instructor?.name}
                onChangeText={(e) => setInstructor({ ...instructor, name: e, email: instructor?.email || '' })}
            />
            <TextInput
                style={styles.input}
                placeholder="Instructor Email"
                value={instructor?.email}
                onChangeText={(e) => setInstructor({ ...instructor, email: e, name: instructor?.name || '' })}
            />
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
})