import { View, Text, TextInput, Pressable, StyleSheet, Switch, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useContext, useEffect } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { ThemeContext } from "@/context/ThemeContext";
import axios from 'axios';
import { BackHandler, Platform } from 'react-native';
import { useSession } from "@/context/SessionContext";
import { Inter_500Medium, Inter_700Bold, useFonts } from "@expo-google-fonts/inter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Settings() {


    const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
    const [isEnabled, setIsEnabled] = useState(colorScheme === 'dark');
    const router = useRouter();

    const { setUserData, accountDeletion } = useSession();


    const [fontsLoaded, error] = useFonts({
        Inter_500Medium,
        Inter_700Bold
    });


    if (!fontsLoaded && !error) {
        return null;
    }

    var mode = colorScheme != 'dark' ? 'Light' : 'Dark';
    var modeBool = colorScheme != 'dark';

    // storage-changing functions

    const styles = createStyleSheet(theme, colorScheme);

    // simple functions


    return (
        <SafeAreaView style={styles.background}>
        <View style={styles.container}>
            {/* Profile Picture */}
            <Pressable onPress={() => {
                router.push('/');
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
            <Text style={styles.text}>
                {mode} mode
            </Text>
            <Switch
                style={{size: 40}}
                trackColor={{ false: '#ffeece', true: '#81b0ff' }}
                thumbColor={isEnabled ? 'white' : 'black'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
                    setIsEnabled(!isEnabled);
                }}
                value={isEnabled}
            >

            </Switch>
        </View>
        <View style={styles.secContainer}>
            <Pressable style={styles.button} onPress={async () => {
                accountDeletion();
                setUserData(null);
                AsyncStorage.removeItem('userData');
                AsyncStorage.removeItem('token');
                AsyncStorage.removeItem('id');
            }}>
                <Text style={[styles.text, {color: 'black', fontSize: 20}]}>Delete your account</Text>
            </Pressable>
        </View>
    </SafeAreaView>
    );


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
        text: {
            fontFamily: 'Inter_500Medium',
            color: theme.text,
            fontWeight: 'bold',
            fontSize: 30
        },
        secContainer: {
            padding: 20,
            flexDirection: 'column', // stack items vertically
            alignItems: 'flex-start', // align items to the left
            justifyContent: 'center', // optional: vertical centering if needed
        },
        button: {
            backgroundColor: '#D22B2B',
            padding: 10,
            borderRadius: 80,
            paddingHorizontal: 20
        },
    });
}
