import React from 'react'
import { View, Text } from '@/components/Themed'
import { StyleSheet, TouchableOpacity } from 'react-native'

export default function ActionCard({
    title,
    iconName,
    index
}: {
    title: string,
    iconName: any,
    index: number
}) {
    const bg = index % 2 === 0 ? "#fff" : "#f2d9d9"
    const shadowOpacity = index % 2 === 0 ? 0.3 : 0.0

    // Todo: Add onPress event

    return (
        <TouchableOpacity>
            <View style={{ ...styles.container, backgroundColor: bg, shadowOpacity}}>
                {iconName}
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        gap: 3,
        flexDirection: "column",
        marginLeft: 16,
        marginTop: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    },
    title: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: "500",
        color: "#6c6b6b"
    }
})