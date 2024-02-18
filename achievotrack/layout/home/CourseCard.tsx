import { View, Text } from '@/components/Themed'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { Avatar } from 'react-native-paper'
import CourseUpdates from './CourseUpdates'

const Status = () => {
    return (
        <View style={styles.statusContainer}>
            <View style={styles.status}></View>
        </View>
    )
}

const CourseTitle = () => {
    return (
        <View style={styles.titleContainer}>
            <View>
                <Avatar.Image size={30} source={require('@/assets/images/placeholder.jpg')} />
            </View>
            <Text style={styles.coursename}>Philosophy</Text>
        </View>
    )
}

export default function CourseCard() {
    const goToCourse = () => {
        console.log("Going to course")
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => goToCourse()}>
                <View style={styles.imgContainer}>
                    <Image source={require('../../assets/images/placeholder.jpg')} style={{ width: "100%", height: "100%" }} contentFit='cover' />
                    <Status />
                </View>
                <CourseTitle />
                <CourseUpdates />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: 250,
        marginLeft: 16,
        marginTop: 4,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
        maxHeight: 210,
        display: "flex",
        flexDirection: "column",
        padding: 10,
    },
    imgContainer: {
        width: "100%",
        borderRadius: 25,
        overflow: "hidden",
        flexBasis: "50%",
    },
    statusContainer: {
        position: "absolute",
        top: 10,
        right: 10,
        padding: 4,
        backgroundColor: "white",
        borderRadius: 25
    },
    status: {
        width: 15,
        height: 15,
        backgroundColor: "green",
        borderRadius: 25
    },
    titleContainer: {
        borderRadius: 25,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        width: '75%',
        height: 40,
        paddingLeft: 10,
        transform: [{ translateY: -14 }, { translateX: 20 }],
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    coursename: {
        fontSize: 16,
        fontWeight: "500",
        color: "black"
    }
})