import { View, Text } from '@/components/Themed'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { useRouter } from 'expo-router';

export default function LoadingScreen() {
  const router = useRouter();

  useEffect(() => {
    const loadingScreen = async () => {
      await AsyncStorage.setItem('firstTime', 'false');
      console.log('firstTime set to false');
      router.push('/');
    }

    setTimeout(async () => {
      await loadingScreen();
    }, 4000);
  }, [AsyncStorage]);

  return (
    <View style={styles.container}>
      <View style={styles.loader}>
        <ActivityIndicator size={90} color='#d12323' />
        <Text style={styles.smallText}>Loading your data...</Text>
        <View style={styles.bottom}>
          <Text style={styles.bigText}>
            Stay organized and achieve your goals!
          </Text>
          <Text style={styles.smallText}>
            Manage your time, track your progress and achieve your goals with <Text style={styles.brand}>AchievoTrack</Text>!
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '90%',
    height: '100%',
    gap: 20
  },
  bottom: {
    width: '90%',
    gap: 20
  },
  bigText: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  smallText: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: '200'
  },
  brand: {
    color: '#d12323',
    fontWeight: 'bold'
  }
})