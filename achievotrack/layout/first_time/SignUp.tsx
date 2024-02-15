import React from 'react'
import { View, Text } from '@/components/Themed'
import { ActivityIndicator, TextInput, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image';


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
    setConfirmPassword
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
}) {

  return (
      <View style={styles.container}>
          <View style={styles.img}>
              <Image
                  source={{ uri: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
                  contentFit="cover"
                  placeholder={"Students"}
                  style={styles.img}
              />
          </View>
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
          <View style={styles.checkbox}>
              <Text style={styles.remember}>Remember me</Text>
          </View>
          {/* ToDo: When sign in is pressed changed to sign in */}
          <View>
              <Text>Already a member? <Text>Sign in</Text></Text>
          </View>
      </View>
  )
}


