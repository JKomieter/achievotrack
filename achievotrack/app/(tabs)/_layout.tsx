import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirstTime from '@/layout/first_time/FirstTime';
import { View, Text } from '@/components/Themed';
import { Avatar } from 'react-native-paper';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [username, setUsername] = useState('');
  const [firstTime, setFirstTime] = useState(false);

  useEffect(() => {
    const checkFirstTime = async () => {
      const firstTime = await AsyncStorage.getItem('first_time');
      const username = await AsyncStorage.getItem('username');
      if (firstTime === null) {
        setFirstTime(true);
      }
    };

    checkFirstTime();
  }, []);

  // if (firstTime) return <FirstTime />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? 'light'].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // )
          headerTitle: () => (
            <View>
              <Text style={{ fontSize: 20, fontWeight: '300' }}>Welcome back, {username || 'Alicia'}!</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={{marginRight: '24%'}}>
              <Avatar.Image size={33} source={require('@/assets/images/placeholder.jpg')} />
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
          title: 'Market',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="focus"
        options={{
          title: 'Focus',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: 'News',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}

