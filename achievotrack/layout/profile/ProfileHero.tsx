import { View, Text } from '@/components/Themed'
import { placeholder } from '@/constants/placeholder'
import React from 'react'
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper';

export default function ProfileHero({
    profile_pic,
    username,
    email,
    handleDocumentSelection,
}: {
    profile_pic: string,
    username: string,
    email: string,
    handleDocumentSelection: () => Promise<void>
}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.avatar} onPress={() => handleDocumentSelection()}>
                <Avatar.Image size={120} source={{ uri: profile_pic?.length > 0 ? `data:image/jpeg;base64,${profile_pic}` : placeholder }} />
            </TouchableOpacity>
            <View style={styles.bottom}>
                <Text style={styles.name}>{username}</Text>
                <Pressable>
                    <Text style={styles.email}>{email}</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 20,
        width: '100%',
        gap: 10
    },
    avatar: {
        marginBottom: 5,
    },
    bottom: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 5
    },
    name: {
        fontSize: 24,
        fontWeight: '300'
    },
    email: {
        fontSize: 16,
        fontWeight: '300',
        textDecorationLine: 'underline',
    }
})