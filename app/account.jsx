import { View, Text, TextInput, Pressable, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState, useContext, useEffect } from "react"
import { ThemeContext } from "@/context/ThemeContext"
import AntDesign from '@expo/vector-icons/AntDesign';
import { Inter_500Medium, Inter_700Bold, useFonts } from "@expo-google-fonts/inter"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"

export default function MainScreenGoals() {


    const { colorScheme, setColorScheme, theme } = useContext(ThemeContext)

    const router = useRouter()


    const [fontsLoaded, error] = useFonts({
        Inter_500Medium,
        Inter_700Bold
    }) 


    if (!fontsLoaded && !error) {
        return null
    }

    // storage-changing functions

    const styles = createStyleSheet(theme, colorScheme)

    // simple functions

    return (
        <SafeAreaView style={styles.background}>
        <View style={styles.container}>
            {/* Profile Picture */}
            <Pressable onPress={() => {
                router.push('/')
            }}>
                <AntDesign name="arrowleft" size={24} color={theme.background} />
            </Pressable>

            {/* NERO Title */}
            <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.background,
            }}>
            NERO
            </Text>

            <Text></Text>
        </View>
        <View style={styles.secContainer}>
            <Text style={styles.mainText}>No profile yet</Text>
        </View>
    </SafeAreaView>
    )


} 

function createStyleSheet(theme, colorScheme) {
    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: theme.tab, // you can change this
            borderBottomWidth: 1,
            borderBottomColor: '#e0e0e0',
        },
        background: {
            backgroundColor: theme.background,
            flex: 1
        },
        mainText: {
            color: theme.text,
            fontWeight: 'bold',
            fontSize: 25
        },
        secContainer: {
            padding: 20,
            marginTop: 30
        }
    });
}
