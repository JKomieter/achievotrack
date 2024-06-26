import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FontAwesome5, FontAwesome6, AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

import { TouchableOpacity, useColorScheme } from 'react-native';
import useCheckAuthState from '../hooks/useCheckAuthState';
import { ScheduleType, Action, User } from '../libs/types';
import useCourseEditStore from '../store/useCourseEditStore';
import useGoToCourseStore from '../store/useGoToCourseStore';
import useScheduleStore from '../store/useScheduleStore';
import { Avatar, PaperProvider } from 'react-native-paper';
import { View, Text } from '../components/Themed';
import { placeholder } from '../constants/placeholder';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import getUser from '@/utils/getUser';
import getWishlist from '../utils/getWishlist';

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
  const { expoPushToken, notification } = usePushNotifications();
  const { setDetails, action } = useScheduleStore();
  const { data } = getWishlist();
  const { courseName } = useGoToCourseStore();
  const { setCourseStore } = useCourseEditStore();
  const { } = useCheckAuthState();
  const { data: user } = getUser() as { data: User }

  const openScheduleAdd = () => {
    router.push("/editSchedule");
    setDetails("", new Date, { hours: 0, minutes: 0 }, { hours: 0, minutes: 0 }, ScheduleType.HOMEWORK, "", Action.ADD);
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PaperProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, presentation: 'fullScreenModal' }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false, presentation: 'fullScreenModal' }} />
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
          <Stack.Screen name="editSchedule" options={{
            presentation: 'modal',
            headerTitle: () => (
              <View>
                <Text style={{ fontSize: 20, fontWeight: '300' }}>
                  {action === Action.EDIT ? "Edit Schedule" : "Add Schedule"}
                </Text>
              </View>
            )
          }} />
          <Stack.Screen name="itemDetails" options={{
            presentation: 'fullScreenModal',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <FontAwesome6 name="arrow-left" size={22} color="black" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity style={{ marginRight: '1%' }} onPress={() => router.push('/wishlist')}>
                <View style={{ width: 20, height: 20, borderRadius: 50, backgroundColor: "#d12323", position: 'absolute', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', left: 11, bottom: 13 }}>
                  <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>
                    {data?.length || 0}
                  </Text>
                </View>
                <AntDesign name="star" size={24} color="black" />
              </TouchableOpacity>
            ),
            headerTitle: () => (
              <View>
                <Text style={{ fontSize: 20, fontWeight: '300' }}>Product Details</Text>
              </View>
            )
          }} />
          <Stack.Screen name="sell" options={{
            presentation: 'fullScreenModal',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <FontAwesome6 name="arrow-left" size={22} color="black" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity style={{ marginRight: '1%' }} onPress={() => router.push('/profile')}>
                <Avatar.Image size={33} source={{ uri: `data:image/jpeg;base64,${user?.profile_pic}` || placeholder }} />
              </TouchableOpacity>
            ),
            headerTitle: () => (
              <View>
                <Text style={{ fontSize: 20, fontWeight: '300' }}>Sell Resources</Text>
              </View>
            )
          }} />
          <Stack.Screen name="addCourse" options={{
            presentation: 'fullScreenModal',
            headerTitle: () => (
              <View>
                <Text style={{ fontSize: 20, fontWeight: '300' }}>Add Course</Text>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => {
                setCourseStore('', { name: '', email: '' }, { name: '', base64String: '' }, { name: '', description: '', credit: '', }, [])
                router.back()
              }}>
                <FontAwesome6 name="arrow-left" size={22} color="black" />
              </TouchableOpacity>
            ),
          }} />
          <Stack.Screen name="course" options={{
            headerTitle: () => (
              <View>
                <Text style={{ fontSize: 20, fontWeight: '300' }}>{courseName}</Text>
              </View>
            ),
            presentation: 'fullScreenModal',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <FontAwesome6 name="arrow-left" size={22} color="black" />
              </TouchableOpacity>
            ),
          }} />
          <Stack.Screen name='profile' options={{
            presentation: 'fullScreenModal',
            headerTitle: () => (
              <View>
                <Text style={{ fontSize: 20, fontWeight: '300' }}>Profile</Text>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <FontAwesome6 name="arrow-left" size={22} color="black" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity style={{ marginRight: '0.5%' }} onPress={() => router.push('/settings')}>
                <FontAwesome5 name="cog" size={22} color="black" />
              </TouchableOpacity>
            )
          }}
          />
          <Stack.Screen name='settings' options={{
            presentation: 'fullScreenModal',
            headerTitle: () => (
              <View>
                <Text style={{ fontSize: 20, fontWeight: '300' }}>Settings</Text>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <FontAwesome6 name="arrow-left" size={22} color="black" />
              </TouchableOpacity>
            ),
          }}
          />
          <Stack.Screen name='addScore' options={{
            presentation: 'modal',
            headerTitle: () => (
              <View>
                <Text style={{ fontSize: 20, fontWeight: '300' }}>Add Score</Text>
              </View>
            ),
          }}
          />
          <Stack.Screen name='addReview' options={{
            presentation: 'fullScreenModal',
            headerTitle: () => (
              <View>
                <Text style={{ fontSize: 20, fontWeight: '300' }}>Add Review</Text>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <FontAwesome6 name="arrow-left" size={22} color="black" />
              </TouchableOpacity>
            ),
          }}
          />
          <Stack.Screen name='comments' options={{
            presentation: 'modal',
            headerTitle: () => (
              <View>
                <Text style={{ fontSize: 20, fontWeight: '300' }}>Comments</Text>
              </View>
            ),
          }}
          />
          <Stack.Screen name='feedback' options={{
            presentation: 'fullScreenModal',
            headerTitle: () => (
              <View>
                <Text style={{ fontSize: 20, fontWeight: '300' }}>Feedback</Text>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <FontAwesome6 name="arrow-left" size={22} color="black" />
              </TouchableOpacity>
            ),
          }}
          />
          <Stack.Screen name='wishlist' options={{
            presentation:'fullScreenModal',
            headerTitle: () => (
              <View>
                <Text style={{ fontSize: 20, fontWeight: '300' }}>Wishlist</Text>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <FontAwesome6 name="arrow-left" size={22} color="black" />
              </TouchableOpacity>
            ),
          }}
          />
        </Stack>
      </PaperProvider>
    </ThemeProvider>
  );
}
