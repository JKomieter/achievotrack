import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import axios from 'axios';
import SignUp from './SignUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userDetailsStore from '../../store/userDetailsStore';
import Signin from './Signin';
import { View } from '../../components/Themed';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

const API_URL = process.env.EXPO_PUBLIC_DEV_BACKEND_URL;

export default function Sign({
    setStage
}: {
    setStage: React.Dispatch<React.SetStateAction<number>>
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = useState(true);
    const [err, setErr] = useState('');
    const { setUserDetails } = userDetailsStore();
    const [opt, setOpt] = useState<'signin' | 'signup'>('signin');
    const router = useRouter()

    const handleSignUp = async () => {
        if (!email || !username || !password || !confirmPassword) return setErr('All fields are required');
        setIsLoading(true);
        if (password !== confirmPassword) {
            setIsLoading(false);
            return setErr('Passwords do not match');
        }
        const res = await axios.post(`${API_URL}/signup`, {
            email: email.toLocaleLowerCase(),
            username,
            password,
        })
        setIsLoading(false);
        if (!res.data.user) {
            return setErr(res.data.message);
        };
        setUserDetails(res.data.username, res.data.email, res.data.user.userId)
        await AsyncStorage.setItem('userEmail', res.data.user.email);
        await AsyncStorage.setItem('userName', res.data.username);
        await AsyncStorage.setItem('userId', res.data.userId);
        setStage(3);
    };

    const handleSignIn = async () => {
        if (!email || !password) {
            setErr('All fields are required');
            return;
        }
        setIsLoading(true);
        try {
            const res = await axios.post(`${API_URL}/login`, {
                email: email.toLowerCase(),
                password,
            }, {
                validateStatus: function (status) {
                    return status < 500; 
                }
            });
    
            if (res.status >= 400) {
                if (res.status === 401) {
                    setErr('Invalid credentials');
                } else {
                    setErr(res.data.error || res.data.message || 'An error occurred');
                }
                return;
            }

            setUserDetails(res.data.username, res.data.email, res.data.userId);
            await AsyncStorage.setItem('userEmail', res.data.email);
            await AsyncStorage.setItem('userName', res.data.username);
            await AsyncStorage.setItem('userId', res.data.userId);
            router.push('/(tabs)')
        } catch (error) {
            console.error(error);
            setErr('An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const opts = {
        'signup': (
            <SignUp
                isLoading={isLoading}
                handleSignUp={handleSignUp}
                styles={styles}
                email={email}
                setEmail={setEmail}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                checked={checked}
                setChecked={setChecked}
                err={err}
                setOpt={setOpt}
            />
        ),
        'signin': (
            <Signin
                styles={styles}
                handleSignIn={handleSignIn}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                checked={checked}
                setChecked={setChecked}
                err={err}
                isLoading={isLoading}
                setOpt={setOpt}
            />
        )
    } as Record<string, JSX.Element>

    useEffect(() => {
        if (err) {
            setTimeout(() => {
                setErr('');
            }, 3000);
        }
    }, [err]);

    return (
        <ScrollView style={{ flex: 1, width: '100%' }}>
            <View style={styles.imgContainer}>
                <Image
                    source={{ uri: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
                    contentFit="cover"
                    placeholder={"Students"}
                    style={styles.img}
                />
            </View>
            {opts[opt]}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'flex-start',
        gap: 10,
        flex: 1
    },
    imgContainer: {
        padding: 0,
        width: '100%',
        height: 300,
    },
    img: {
        width: '100%',
        height: '100%',
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
        width: '90%',
        gap: 10,
        flexDirection: 'column',
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
    checkbox: {
        width: '90%',
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
        padding: 20,
        borderRadius: 30,
        width: '90%',
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
    error: {
        color: 'red',
        fontSize: 13,
        fontWeight: 'bold',
    }
});
