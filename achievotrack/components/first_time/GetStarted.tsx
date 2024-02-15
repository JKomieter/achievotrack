import React from 'react'
import { View, Text } from '@/components/Themed'
import { Stage1Svg } from '@/assets/svgs'
import { SvgXml } from 'react-native-svg'
import { StyleSheet, TouchableOpacity } from 'react-native'

export default function GetStarted({
    setStage,
}: {
    setStage: React.Dispatch<React.SetStateAction<number>>;
}) {
    return (
        <View style={styles.container}>
            <SvgXml xml={Stage1Svg} style={styles.svg} />
            <Text style={styles.title}>
                Welcome to AchievoTrack!
            </Text>
            <Text style={styles.description}>
                AchievoTrack is the ultimate tool to help you as a student, keep track of your academic achievements and goals.
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => setStage(2)}>
                <Text style={styles.btnText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'column',
        gap: 10,
    },
    svg: {
        width: 300,
        height: 300,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 12,
        textAlign: 'center',
        width: '85%',
        opacity: 0.7,
    },
    button: {
        backgroundColor: '#D12323',
        padding: 10,
        borderRadius: 20,
        width: '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    }
})
