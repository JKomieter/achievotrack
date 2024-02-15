import React, { useState } from 'react'
import { View, Text } from '@/components/Themed'
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image';


export default function Sign() {
    return (
        <View style={styles.container}>
            <View style={styles.img}>
                <Image
                    source={{ uri: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
                    contentFit="cover"
                    placeholder={"Students"}
                    style={styles.img}
                />
            </View>
            <Text style={styles.title}>Welcome to AchievoTrack!</Text>
            <View style={styles.form}>
                <TextInput placeholder="Email" style={styles.input} keyboardType='email-address' />
                <TextInput placeholder="Username" style={styles.input} />
                <TextInput placeholder="Password" style={styles.input} />
                <TextInput placeholder="Confirm Password" style={styles.input} />
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.btnText}>Sign up</Text>
            </TouchableOpacity>
            <View style={styles.checkbox}>
                <Text style={styles.remember}>Remember me</Text>
            </View>
            {/* ToDo: When sign in is pressed changed to sign in */}
            <View>
                <Text>Already a member? <Text>Sign in</Text></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        gap: 10,
    },
    img: {
        width: '100%',
        height: 200,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '85%',
        gap: 10,
        flexDirection: 'column',
    },
    input: {
        width: '100%',
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        fontSize: 16,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    checkbox: {
        width: '85%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        gap: 4
    },
    remember: {
        fontSize: 16,
        opacity: 0.7,
        fontWeight: "200"
    },
    button: {
        backgroundColor: '#D12323',
        padding: 13,
        borderRadius: 20,
        width: '85%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
});
