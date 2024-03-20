import React, { Dispatch, SetStateAction } from 'react'
import { View, Text } from '@/components/Themed'
import { ActivityIndicator, Pressable, TextInput, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image';
import { Checkbox } from 'react-native-paper';
import { ScrollView } from 'native-base';


export default function SignUp({
    isLoading,
    handleSignUp,
    styles,
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    checked,
    setChecked,
    err,
    setOpt
}: {
    isLoading: boolean;
    handleSignUp: () => void;
    styles: any;
    email: string;
    setEmail: (email: string) => void;
    username: string;
    setUsername: (username: string) => void;
    password: string;
    setPassword: (password: string) => void;
    confirmPassword: string;
    setConfirmPassword: (confirmPassword: string) => void;
    checked: boolean;
    setChecked: (checked: boolean) => void;
    err: string;
    setOpt: Dispatch<SetStateAction<"signin" | "signup">>
}) {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to AchievoTrack!</Text>
            <View style={styles.form}>
                <TextInput placeholder="Email" style={styles.input} keyboardType='email-address' value={email} onChangeText={setEmail} />
                <TextInput placeholder="Username" style={styles.input} value={username} onChangeText={setUsername} />
                <TextInput placeholder="Password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
                <TextInput placeholder="Confirm Password" style={styles.input} secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => handleSignUp()}>
                {
                    isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.btnText}>Sign up</Text>
                }
            </TouchableOpacity>
            {err.length > 0 && <Text style={styles.error}>{err}</Text>}
            <View style={styles.checkbox}>
                <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => {
                    setChecked(!checked);
                }} />
                <Text style={styles.remember}>Remember me</Text>
            </View>
            <View style={{marginBottom: 20}}>
                <Text>Already a member? <Text style={{textDecorationLine: 'underline', color: '#d12323'}} onPress={() => setOpt('signin')}>Sign in</Text></Text>
            </View>
        </View>
    )
}


