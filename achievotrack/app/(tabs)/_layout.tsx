import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome, Foundation, FontAwesome6, Entypo } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRouter } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import getCart from '@/utils/getCart';
import { placeholder } from '@/constants/placeholder';

import Colors from '@/constants/Colors';

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string; }) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  
  const { data } = getCart();
  const router = useRouter();

  useEffect(() => {
    const checkFirstTime = async () => {
      const user_name = await AsyncStorage.getItem('userName');
      if (user_name !== null) {
        setUsername(user_name);
      } 
      setLoading(false);
    };
    checkFirstTime();
  }, []);

  if (loading) return null;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: () => <Foundation name="home" size={30} color="black" />,
          headerTitle: () => (
            <View>
              <Text style={{ fontSize: 20, fontWeight: '300' }}>Welcome back, {username || 'Alicia'}!</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: '22%' }} onPress={() => router.push('/profile')}>
              <FontAwesome name="user" size={33} color="black" />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View>
              <FontAwesome name="trophy" size={25} color="#d43c3c" style={{ marginLeft: 15 }} />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <FontAwesome name="shopping-bag" size={24} color={color} />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: '10%' }}>
              <FontAwesome6 name="arrow-left" size={22} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: '10%' }}>
              <View style={{ width: 20, height: 20, borderRadius: 50, backgroundColor: "#d12323", position: 'absolute', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', left: 11, bottom: 13 }}>
                <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>
                  {data?.length || 0}
                </Text>
              </View>
              <Entypo name="shopping-cart" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View>
              <Text style={{ fontSize: 20, fontWeight: '300' }}>AcheivoMart</Text>
            </View>
          )
        }}
      />
    </Tabs>
  );
}
