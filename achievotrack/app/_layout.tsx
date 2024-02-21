import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';

import { useColorScheme } from '@/components/useColorScheme';
import { TouchableOpacity } from 'react-native';
import { View, Text } from '@/components/Themed';
import useScheduleStore from '@/store/useScheduleStore';
import { Action, ScheduleType } from '@/libs/types';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { setDetails, action } = useScheduleStore();

  const openScheduleAdd = () => {
    router.push("/editSchedule");
    setDetails("", new Date, { hours: 0, minutes: 0 }, { hours: 0, minutes: 0 }, ScheduleType.HOMEWORK, Action.ADD);
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PaperProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          <Stack.Screen name="schedule" options={{ 
            presentation: 'fullScreenModal', 
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <FontAwesome6 name="arrow-left" size={22} color="black" />
              </TouchableOpacity>
            ),
              headerRight: () => (
                <TouchableOpacity onPress={() => openScheduleAdd()}>
                  <Ionicons name="add-circle-sharp" size={26} color="black" />
                </TouchableOpacity>
              ),
              headerTitle: () => (
                <View>
                  <Text style={{ fontSize: 20, fontWeight: '300' }}>
                    Your schedule
                  </Text> 
                </View>
                )
             }} />
          <Stack.Screen name="editSchedule" options={{ presentation: 'modal', title: action === Action.EDIT ? "Edit Schedule" : "Add Schedule" }} />
        </Stack>
      </PaperProvider>
    </ThemeProvider>
  );
}
