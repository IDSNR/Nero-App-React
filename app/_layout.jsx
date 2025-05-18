import { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SessionProvider } from '../context/SessionContext';
import { ThemeProvider } from "../context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

function AppInitializer({ children }) {
  const [userData, setUserData] = useState(null);
  const [appReady, setAppReady] = useState(false);

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/Akira Expanded Demo.otf'),
  });

  useEffect(() => {
    const fetchAllData = async () => {

      try {
        const id = await AsyncStorage.getItem('id');
        const token = await AsyncStorage.getItem('token');
        const hasAuth = !!token && !!id;

        let response;

        if (hasAuth) {
          response = await axios.post('https://neroapi.ignorelist.com/allDataWithAccount', {
            auth: { id, token }
          });

          await AsyncStorage.setItem('token', `${response.data.auth.token}`);
        } else {
          response = await axios.get('https://neroapi.ignorelist.com/allDataNoAccount');
          await AsyncStorage.setItem('id', response.data.auth.id.toString());
          await AsyncStorage.setItem('token', response.data.auth.token);
        }

        setUserData(response.data);
        await AsyncStorage.setItem('userData', JSON.stringify(response.data));
      } catch (e) {
        console.error('Failed to fetch user data:', e);
        const stored = await AsyncStorage.getItem('userData');
        if (stored) setUserData(JSON.parse(stored));
      } finally {
        setAppReady(true);
        if (fontsLoaded) {
          SplashScreen.hideAsync();
        }
      }
    };

    fetchAllData();
  }, [fontsLoaded]);

  if (!appReady || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SessionProvider initialData={userData}>
      {children}
    </SessionProvider>
  );
}

export default function RootLayout() {
  return (
    <AppInitializer>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="settings" options={{ headerShown: false }} />
          <Stack.Screen name="account" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </AppInitializer>
  );
}
