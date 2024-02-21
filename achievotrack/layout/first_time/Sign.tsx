import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import axios from 'axios';
import SignUp from './SignUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userDetailsStore from '@/store/userDetailsStore';


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
    const apiUrl = process.env.DEV_BACKEND_URL as string;

    const handleSignUp = async () => {
        if (!email || !username || !password || !confirmPassword) return setErr('All fields are required');
        setIsLoading(true);
        if (password !== confirmPassword) {
            setIsLoading(false);
            return setErr('Passwords do not match');
        } 
        const res = await axios.post(`${apiUrl}/signup`, {
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

    useEffect(() => {
        if (err) {
            setTimeout(() => {
                setErr('');
            }, 3000);
        }
    }, [err]);

    return (
        <>
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
                setErr={setErr}
            />
            {/* ToDo: SignIn be implemented */}
        </>
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
    imgContainer: {
        padding: 7,
        width: '100%',
        height: 200,
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 25,
        shadowColor: '#171717',
        shadowOffset: { width: 0.5, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
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
    error: {
        color: 'red',
        fontSize: 13,
        fontWeight: 'bold',
    }
});
