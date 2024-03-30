import React, { useCallback, useEffect, useState } from 'react'
import { View, Text } from '../../components/Themed'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { ActivityIndicator, Avatar } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import { Majors, Minors, Year } from '../../constants/courses';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { placeholder } from '../../constants/placeholder';

export default function ProfileInfo({
    setStage
}: {
    setStage: React.Dispatch<React.SetStateAction<number>>
}) {
    const [username, setUsername] = useState('');
    const [major, setMajor] = useState<string | null>(null);
    const [minor, setMinor] = useState<string | null>(null);
    const [year, setYear] = useState<string | null>(null);
    const [err, setErr] = useState("");
    const [profile_pic, setProfilePic] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const apiUrl = process.env.EXPO_PUBLIC_DEV_BACKEND_URL as string;

    useEffect(() => {
        const getUsername = async () => {
            const username = await AsyncStorage.getItem('username');
            if (username) setUsername(username);
        }
        getUsername();
    }, []);

    const handleContinue = useCallback(async () => {
        setIsLoading(true);
        console.log(major, minor, year);
        if (!major || !minor || !year) return console.log("All fields are required");
        const userId = await AsyncStorage.getItem('userId');
        const res = await axios.post(`${apiUrl}/addAcademicDetails`, {
            major,
            minor,
            year,
            userId,
            profile_pic,
        })
        console.log(res.data);
        setIsLoading(false);
        if (res.status === 200) return setStage(2);
        setErr("Something went wrong. Please try again.")
    }, [major, minor, year]);

    const handleProfilePic = useCallback(async () => {
        try {
            const response = await DocumentPicker.getDocumentAsync({ type: 'image/*' });
            if (response.canceled) return;
            const fileUri = response.assets[0].uri;
            const base64String = await FileSystem.readAsStringAsync(fileUri, { encoding: 'base64' });
            setProfilePic(base64String)
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fill out your profile</Text>
            <TouchableOpacity onPress={() => handleProfilePic()}>
                <Avatar.Image size={90} source={{ uri: profile_pic ? profile_pic : placeholder }} />
                <View style={styles.addIcon}>
                    <FontAwesome6 name="add" size={14} color="white" />
                </View>
            </TouchableOpacity>
            <View style={styles.choose}>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.username}>Choose your major and minor</Text>
            </View>
            <View style={styles.form}>
                <Dropdown
                    value={major}
                    data={Majors}
                    onChange={(item) => setMajor(item.value)}
                    style={styles.input}
                    placeholder="Select your Major" 
                    labelField={'label'} 
                    valueField={'label'}                
                    />
                <Dropdown
                    value={minor}
                    data={Minors}
                    onChange={(item) => setMinor(item.value)}
                    style={styles.input}
                    placeholder="Select your Minor"
                    labelField={'label'}
                    valueField={'label'} 
                />
                <Dropdown
                    value={year}
                    data={Year}
                    onChange={(item) => setYear(item.value)}
                    style={styles.input}
                    placeholder="Select your Year"
                    labelField={'label'}
                    valueField={'label'} 
                />
            </View>
            {err.length > 0 && <Text style={styles.error}>{err}</Text>}
            <TouchableOpacity style={styles.button} onPress={() => handleContinue()}>
                { isLoading ? <ActivityIndicator animating={true} color="white" /> : 
                <Text style={styles.btnText}>Continue</Text>}
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
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 20,
        fontSize: 16,
        fontWeight: '300',
        color: '#000000',
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