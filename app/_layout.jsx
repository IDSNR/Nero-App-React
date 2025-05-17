import { View, Text, Pressable } from 'react-native'; 
import { ThemeProvider } from "../context/ThemeContext"
import { SessionProvider, useSession } from '../context/SessionContext';
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios'

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootContent() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/Akira Expanded Demo.otf'),
  });

  const { setUserData } = useSession();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const fetchAllData = async () => {
  
    const id = await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('token');
    const hasAuth = !!token && !!id;

    console.log(id);
    console.log(hasAuth)
    console.log(token);

    try {
      
      if (hasAuth) {
        try {

          const response = await axios.post('https://neroapi.ignorelist.com/allDataWithAccount', { auth: { id, token } });
          await AsyncStorage.setItem('token', `${response.data.auth.token}`);

          setUserData(response.data);
          await AsyncStorage.setItem('userData', JSON.stringify(response.data));

        } catch(e) {
          console.log('Error auth')
          console.log(e)
        }
        
        
      } else {
        try {

          
        const response = await axios.get('https://neroapi.ignorelist.com/allDataNoAccount')

        await AsyncStorage.setItem('id', response.data.auth.id.toString())
        await AsyncStorage.setItem('token', response.data.auth.token)

        setUserData(response.data)
        await AsyncStorage.setItem('userData', JSON.parse(response.data))

        } catch(e) {
          console.log('Error no auth')
          console.log(e)
        }
        
      }


    } catch (error) {
      console.error('Error fetching data:', error);
      console.log('Converting to async data');
      setUserData(AsyncStorage.getItem('userData'));
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="account" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SessionProvider>
      <ThemeProvider>
        <RootContent />
      </ThemeProvider>
    </SessionProvider>
  );
}
