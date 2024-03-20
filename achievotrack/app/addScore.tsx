import { View, Text } from '@/components/Themed'
import axios from 'axios';
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import { useRouter } from 'expo-router';
import useAddScoreStore from '@/store/useAddScore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const coursework = [
    { label: 'Homework', value: 'homework' },
    { label: 'Quiz', value: 'quiz' },
    { label: 'Project', value: 'project' },
    { label: 'Exam', value: 'exam' }
]

const API_URL = process.env.DEV_BACKEND_URL

export default function addScore() {
    const [score, setScore] = React.useState('')
    const [type, setType] = React.useState<{ label: string, value: string } | null>(coursework[0])
    const router = useRouter()
    const { courseId } = useAddScoreStore()

    const handleAddScore = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const res = await axios.post(`${API_URL}/addScore`, { score, type: type?.value, courseId, userId });
            if (res.status !== 200) {
                console.log('Something went wrong');
                return;
            }
            router.back();
        } catch (error) {
            console.log(error);
               
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter score in percentage"
                    keyboardType="numeric"
                    value={score}
                    onChangeText={setScore}
                />
            </View>
            <View style={styles.inputContainer}>
                <Dropdown
                    placeholder='Select coursework'
                    data={coursework}
                    value={type}
                    onChange={setType}
                    labelField={'label'}
                    valueField={'label'}
                    style={{ ...styles.input, paddingVertical: 16 }}
                />
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={{...styles.btn, backgroundColor: '#707070'}} onPress={() => router.back()}>
                    <Text style={styles.btnTxt}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={handleAddScore}>
                    <Text style={styles.btnTxt}>Add Score</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    inputContainer: {
        width: '100%',
        marginTop: 20,
    },
    input: {
        width: '100%',
        height: 60,
        borderRadius: 25,
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 20,
        fontSize: 16,
        fontWeight: '300',
        color: '#000000',
    },
    btn: {
        backgroundColor: '#d12323',
        paddingVertical: 20,
        paddingHorizontal: 35,
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    btnTxt: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600'
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 20,
        flexDirection: 'row',
        gap: 20
    }
})