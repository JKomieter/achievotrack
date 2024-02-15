import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import axios from 'axios';
import SignUp from './SignUp';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    const apiUrl = process.env.DEV_BACKEND_URL as string;

    const handleSignUp = async () => {
        console.log("apiUrl", apiUrl);
        setIsLoading(true);
        try {
            if (!email || !username || !password || !confirmPassword) return
            if (password !== confirmPassword) return
            const res = await axios.post(`${apiUrl}/signup`, {
                email: email.toLocaleLowerCase(),
                username,
                password,
            })
            setIsLoading(false);
            if (!res.data.user) return
            await AsyncStorage.setItem('user_email', res.data.user.email);
            await AsyncStorage.setItem('username', res.data.username);
            setStage(3);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

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
