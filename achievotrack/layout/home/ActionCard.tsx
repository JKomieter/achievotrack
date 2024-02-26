import React from 'react'
import { View, Text } from '@/components/Themed'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'


export default function ActionCard({
    title,
    iconName,
    index,
    link
}: {
    title: string,
    iconName: any,
    index: number,
    link: `${string}:${string}`
}) {
    const bg = index % 2 === 0 ? "#fff" : "#848383"
    const shadowOpacity = index % 2 === 0 ? 0.3 : 0.0
    const router = useRouter()

    return (
        <TouchableOpacity onPress={() => router.push(link)}>
                <View style={{ ...styles.container, backgroundColor: bg, shadowOpacity }}>
                    {iconName}
                <Text style={{ ...styles.title, color: index % 2 ? '#ffff' : '#6c6b6b'}}>
                        {title}
                    </Text>
                </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
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
    }
})