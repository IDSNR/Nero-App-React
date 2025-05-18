import { Tabs } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React from 'react';
import { Platform, View, Text } from 'react-native';
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";
import Entypo from '@expo/vector-icons/Entypo';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { Inter_500Medium, Inter_700Bold, useFonts } from "@expo-google-fonts/inter";

export default function TabLayout() {

  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);

  const [fontsLoaded, error] = useFonts({
    Inter_500Medium,
    Inter_700Bold
  });

  if (!fontsLoaded && !error) {
    return <View><Text>Loading...</Text></View>; // or use SplashScreen
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: theme.navigation
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={focused ? 34 : 26} name="house.fill" color={theme.text} />,
        }}
        
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => <View style={{marginTop: -5, marginRight: -5, marginBottom: -5}}><FontAwesome5 name="robot" size={focused ? 28 : 20} color={theme.text} /></View>,
        }}
        
      />

      <Tabs.Screen
        name="customization"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => <View style={{marginTop: -5, marginRight: -5, marginBottom: -5}}><Entypo name="tools" size={focused ? 34 : 26} color={theme.text} /></View>,
        }}
        
      />

      <Tabs.Screen
        name="scoreboard"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => <View style={{marginTop: -5, marginRight: -5, marginBottom: -5}}><FontAwesome5 name="trophy" size={focused ? 32 : 24} color={theme.text} /></View>,
        }}
        
      />
      
    </Tabs>
  );
}
