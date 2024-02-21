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
import { FontAwesome6 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [username, setUsername] = useState<string | null>(null);
  const [firstTime, setFirstTime] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkFirstTime = async () => {
      const first_time = await AsyncStorage.getItem('firstTime');
      const user_name = await AsyncStorage.getItem('userName');
      console.log(first_time, 'firstTime')
      if (first_time) {
        setFirstTime(false);
        setUsername(user_name);
      }
    };

    checkFirstTime();
  }, [AsyncStorage]);

  if (firstTime) return <FirstTime />;

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
          title: '',
          tabBarIcon: ({ color }) => <FontAwesome name="shopping-bag" size={24} color='black' />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{marginLeft: '10%'}}>
              <FontAwesome6 name="arrow-left" size={22} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: '10%' }}>
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

