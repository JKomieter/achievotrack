import { View, Text } from '@/components/Themed'
import React, { Dispatch, SetStateAction } from 'react'
import { TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Checkbox } from 'react-native-paper';

export default function Signin({
    styles,
    handleSignIn,
    isLoading,
    err,
    checked,
    setChecked,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    setOpt
}: {
    styles: any,
    handleSignIn: () => void,
    isLoading: boolean
    err: string,
    checked: boolean,
    setChecked: (checked: boolean) => void,
    email: string,
    setEmail: (email: string) => void,
    password: string,
    setPassword: (password: string) => void,
    confirmPassword: string,
    setConfirmPassword: (confirmPassword: string) => void,
    setOpt: Dispatch<SetStateAction<"signin" | "signup">>
}) {
  return (
      <View style={styles.container}>
          <Text style={styles.title}>Welcome to AchievoTrack!</Text>
          <View style={styles.form}>
              <TextInput placeholder="Email" style={styles.input} keyboardType='email-address' value={email} onChangeText={setEmail} />
              <TextInput placeholder="Password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
          </View>
          <TouchableOpacity style={styles.button} onPress={() => handleSignIn()}>
              {
                  isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.btnText}>Sign in</Text>
              }
          </TouchableOpacity>
          {err?.length > 0 && <Text style={styles.error}>{err}</Text>}
          <View style={styles.checkbox}>
              <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => {
                  setChecked(!checked);
              }} />
              <Text style={styles.remember}>Remember me</Text>
          </View>
          <View style={{ marginBottom: 20 }}>
              <Text>Don't have an account? <Text style={{ textDecorationLine: 'underline', color: '#d12323' }} onPress={() => setOpt('signup')}>Sign up</Text></Text>
          </View>
      </View>
  )
}
