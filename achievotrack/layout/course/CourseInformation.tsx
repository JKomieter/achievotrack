import { Text, View } from '../../components/Themed'
import { Course } from '../../libs/types'
import React from 'react'
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import useCourseEditStore from '../../store/useCourseEditStore'
import { useRouter } from 'expo-router'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const API_URL = process.env.EXPO_PUBLIC_DEV_BACKEND_URL;

const MenuComponent = ({
    visible,
    showMenu,
    hideMenu,
    openEditCourse,
    deleteCourse
}: {
    visible: boolean,
    showMenu: () => void,
    hideMenu: () => void,
    openEditCourse: () => void,
    deleteCourse: () => void
}) => {

    return (
        visible && 
        <View style={styles.menu}>
            
        </View>
    );
}

export default function CourseInformation({
    course,
    mutate
}: {
    course: Course | null,
    mutate: () => Promise<any>
}) {
    const { setCourseStore } = useCourseEditStore();
    const router = useRouter()
    const [visible, setVisible] = React.useState(false);

    const showMenu = () => setVisible(true);
    const hideMenu = () => setVisible(false);

    const openEditCourse = () => {
        setCourseStore(
            course?.id as string,
            course?.instructor || { name: '', email: '' },
            course?.syllabus || {
                name: '',
                base64String: ''
            },
            course?.course || {
                name: '',
                description: '',
                credit: '',
            },
            course?.meetingTimes || [],
        )
        router.push('/addCourse');
    }

    const deleteCourse = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const res = await axios.post(`${API_URL}/deleteCourse`, {
                id: course?.id as string,
                userId
            })
            if (res.status === 200) {
                mutate()
                router.push('/(tabs)')
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Course Information</Text>
            <View style={styles.box}>
                <View style={styles.top}>
                    <Text style={styles.name}>{course?.course?.name}</Text>
                    <TouchableOpacity onPress={showMenu}>
                        <Entypo name="dots-three-vertical" size={24} color="black" />
                    </TouchableOpacity>
                    <MenuComponent visible={visible} showMenu={showMenu} hideMenu={hideMenu} openEditCourse={openEditCourse} deleteCourse={deleteCourse} />
                </View>
                <View style={styles.inst}>
                    <Text style={styles.instructor}>Instructor: {course?.instructor?.name}, </Text>
                    <Pressable>
                        <Text style={styles.email}>{course?.instructor?.email}</Text>
                    </Pressable>
                </View>
                <Text style={styles.instructor}>Description: {course?.course?.description}</Text>
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
        height: 180,
        width: '100%',
        borderRadius: 25,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        padding: 20,
        display: 'flex',
        gap: 15
    },
    top: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 15
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        alignItems: 'flex-end'
    },
    inst: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    instructor: {
        fontSize: 16,
        fontWeight: '300'
    },
    email: {
        textDecorationLine: 'underline',
        color: '#417aff'
    },
    menu: {
        position: 'absolute',
        right: 10,
        top: 40,
        width: 70,
        height: 60,
        borderRadius: 25,
        borderColor: '#fff',
        borderWidth: 0.2,
        zIndex: 1000
    }
})