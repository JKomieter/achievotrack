import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
const API_URL = process.env.DEV_BACKEND_URL;

export default function Settings() {
  const router = useRouter()

  const handleLogout = useCallback(async () => {
    try {
      const response = await axios.post(`${API_URL}/logout`);
      if (response.status === 200) {
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('userName');
        await AsyncStorage.removeItem('userEmail');
        console.log('Logged out');
        router.push('/(auth)')
      } else {
        Alert.alert('Logout Failed', 'Unable to logout at the moment. Please try again later.');
      }
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  }, []);

  const actions = [
    { name: 'Help', icon: <Feather name="help-circle" size={24} color="black" />, action: () => console.log('Help') },
    { name: 'Merchandise', icon: <Feather name="shopping-bag" size={24} color="black" />, action: () => console.log('Merchandise') },
    { name: 'About', icon: <Feather name="info" size={24} color="black" />, action: () => console.log('About') },
    { name: 'Log Out', icon: <MaterialIcons name="exit-to-app" size={24} color="black" />, action: handleLogout }
  ];

  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <TouchableOpacity onPress={action.action} key={action.name} style={styles.action}>
          <View style={styles.actionContent}>
            {action.icon}
            <Text style={styles.actionText}>{action.name}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4',
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 18,
    fontWeight: '300',
    marginLeft: 10,
  },
});
