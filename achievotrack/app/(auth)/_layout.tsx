// import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Tabs } from 'expo-router';
// import Colors from '@/constants/Colors';
// import { useColorScheme } from '@/components/useColorScheme';
import { View, Text } from '../../components/Themed';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useClientOnlyValue } from '../../components/useClientOnlyValue';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const userId = await AsyncStorage.getItem('userId');
            console.log(userId);
            if (userId || userId !== null) {
                router.push('/(tabs)');
            }
        })()

        setIsLoading(false);
    }, []);

    if (isLoading) return <></>;

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: useClientOnlyValue(false, true),
            }}>
                <Tabs.Screen 
                    name='index'
                    options={{
                        title: '',
                        tabBarIcon: () => (<></>),
                        headerTitle: () => (
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: '300' }}>AchievoTrack</Text>
                            </View>
                        )
                    }}
                />
        </Tabs>
    )
}