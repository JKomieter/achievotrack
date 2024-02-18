import React, { useEffect, useState } from 'react'
import { View, Text } from '@/components/Themed'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { Majors, Minors, Year } from '@/constants/courses';
import axios from 'axios';


export default function ProfileInfo({
    setStage
}: {
    setStage: React.Dispatch<React.SetStateAction<number>>
}) {
    const [username, setUsername] = useState('');
    const [openMajor, setOpenMajor] = useState(false);
    const [openMinor, setOpenMinor] = useState(false);
    const [openYear, setOpenYear] = useState(false);
    const [_, setMajors] = useState(Majors);
    const [__, setMinors] = useState(Minors);
    const [___, setYears] = useState(Year);
    const [major, setMajor] = useState(null);
    const [minor, setMinor] = useState('');
    const [year, setYear] = useState('');
    const [err, setErr] = useState("");
    const apiUrl = process.env.DEV_BACKEND_URL as string;

    useEffect(() => {
        const getUsername = async () => {
            const username = await AsyncStorage.getItem('username');
            if (username) setUsername(username);
        }
        getUsername();
    }, []);

    const handleContinue = async () => {
        if (!major || !minor || !year) return;
        const userId = await AsyncStorage.getItem('userId');
        const res = await axios.post(`${apiUrl}/addAcademicDetails`, {
            major,
            minor,
            year,
            userId
        })
        console.log(res.data);
        if (res.data.message) return "setStage(2)";
        setErr("Something went wrong. Please try again.")
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fill out your profile</Text>
            <TouchableOpacity>
                <Avatar.Image size={90} source={require('@/assets/images/placeholder.jpg')} />
                <View style={styles.addIcon}>
                    <FontAwesome6 name="add" size={14} color="white" />
                </View>
            </TouchableOpacity>
            <View style={styles.choose}>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.username}>Choose your major and minor</Text>
            </View>
            <View style={styles.form}>
                <DropDownPicker
                    open={openMajor}
                    value={major}
                    items={Majors}
                    setOpen={setOpenMajor}
                    setValue={setMajor}
                    setItems={setMajors}
                    style={styles.input}
                    placeholder="Select your Major"
                />
                <DropDownPicker
                    open={openMinor}
                    value={minor}
                    items={Minors}
                    setOpen={setOpenMinor}
                    setValue={setMinor}
                    setItems={setMinors}
                    style={styles.input}
                    placeholder="Select your Minor"
                />
                <DropDownPicker
                    open={openYear}
                    value={year}
                    items={Year}
                    setOpen={setOpenYear}
                    setValue={setYear}
                    setItems={setYears}
                    style={styles.input}
                    placeholder="Select your Year"
                />
            </View>
            {err.length > 0 && <Text style={styles.error}>{err}</Text>}
            <TouchableOpacity style={styles.button} onPress={() => handleContinue()}>
                <Text style={styles.btnText}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        flexDirection: 'column',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    addIcon: {
        width: 20,
        height: 20,
        borderRadius: 100,
        backgroundColor: '#d12323',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ translateY: -20 }, { translateX: 60 }]
    },
    choose: {
        marginTop: -10,
        textAlign: 'center',
    },
    username: {
        fontSize: 12,
        fontWeight: '300',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '85%',
        gap: 15,
        flexDirection: 'column',
        marginTop: 30,
        zIndex: 1000,
    },
    input: {
        width: '100%',
        padding: 10,
        borderRadius: 20,
        borderColor: 'white',
        backgroundColor: 'white',
        fontSize: 16,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    dropdown: {
        zIndex: 1000,
    },
    button: {
        backgroundColor: '#D12323',
        padding: 13,
        borderRadius: 20,
        width: '85%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
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
    error: {
        color: 'red',
        fontSize: 13,
        fontWeight: 'bold',
    }
})