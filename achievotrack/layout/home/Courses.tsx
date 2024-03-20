import React from 'react'
import { View, Text } from '@/components/Themed'
import { StyleSheet } from 'react-native'
import CoursesSlide from './CoursesSlide'
import getCourses from '@/utils/getCourses';
import NoCourses from './NoCourses';

export default function Courses() {
    const { data, isLoading } = getCourses();
    const hasCourses = data?.length > 0
    
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.title}>Your Courses</Text>
            </View>
            <View style={styles.slide}>
                {
                    hasCourses ? <CoursesSlide data={data} /> : <NoCourses />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 18,
        width: '100%',
        flex: 1,
    },
    title: {
        fontSize: 19,
        fontWeight: '500',
    },
    slide: {
        height: 240,
        display: "flex",
        alignContent: "center",
        justifyContent: "center"
    },
    top: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10
    },
    btn: {
        backgroundColor: '#848383',
        padding: 10,
        borderRadius: 50,
    },
})
