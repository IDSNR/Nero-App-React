import { View, Text, TextInput, Pressable, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useContext, useEffect } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeContext } from "@/context/ThemeContext";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSession } from "@/context/SessionContext";
import Animated, { LinearTransition } from "react-native-reanimated";
import { Inter_500Medium, Inter_700Bold, useFonts } from "@expo-google-fonts/inter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function MainScreenGoals() {


    const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
    const { userData, setUserData, chatbotChatting } = useSession();

    const router = useRouter();

    const [text, setText] = useState('');
    const conversation = userData?.conversation?.data || [];


    const [fontsLoaded, error] = useFonts({
        Inter_500Medium,
        Inter_700Bold
    });


    if (!fontsLoaded && !error) {
        return null;
    }

    // storage-changing functions
    

    const styles = createStyleSheet(theme, colorScheme);

    const renderItem = ({ item, index }) => (
        <View>
            <Text style={{
                backgroundColor: index % 2 == 0 ? '#888488' : '#C4C3C6',
                marginLeft: index % 2 == 0 ? 'auto' : 10,
                marginRight: index % 2 !== 0 ? 'auto' : 10,
                marginTop: 20,
                borderRadius: 10,
                padding: 9,
                maxWidth: '70%'
            }}>{item}</Text>
        </View>
    );

    // simple functions

    return (
        <SafeAreaView style={styles.background}>
        <View style={styles.container}>
            {/* Profile Picture */}
            <Pressable onPress={() => {
                router.push('/account');
            }}>
                <Ionicons name="person-circle" size={24} color={theme.background} />
            </Pressable>

            {/* NERO Title */}
            <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.background,
            }}>
            NERO
            </Text>

            <Pressable onPress={() => {
                router.push('/settings');
            }}>
            <Ionicons name="settings-outline" size={28} color={theme.background} />
            </Pressable>
        </View>
        <View>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/images/robot.png')} style={styles.image}/>
            </View>
            <View style={styles.listView}>
                <FlatList 
                    data={conversation}
                    renderItem={renderItem}
                    keyExtractor={(n, index) => index.toString()}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardDismissMode="on-drag"
                />
            </View>
            <View style={styles.row}>
                <TextInput 
                    style={styles.textInput}
                    placeholder='Ask anything'
                    placeholderTextColor='gray'
                    value={text}
                    onChangeText={setText}
                />
                <Pressable style={styles.buttonSend} onPress={async () => {
                    var updatedConversation = [... conversation, text];
                    setText('');
                    setUserData({
                        ...userData,
                        "conversation": {
                            "data": [... updatedConversation]
                        }
                    });
                    const response = await chatbotChatting({"conversation": updatedConversation});
                    setUserData({
                        ...userData,
                        "conversation": {
                            "data": [... updatedConversation, response]
                        }
                    });
                }}>
                    <AntDesign name="upcircleo" size={24} color={colorScheme !== 'dark' ? 'black' : 'white'} />
                </Pressable>
            </View>
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
        buttonSend: {
            marginTop: 20,
            marginLeft: 'auto',
            marginRight: 40
        },
        row: {
            flexDirection: 'row',
            marginTop: 10
        },
        textInput: {
            backgroundColor: theme.text,
            borderRadius: 10,
            marginLeft: 40,
            marginTop: 10,
            marginRight: 0,
            width: '67%',
            color: theme.background,
            paddingLeft: 10,
        },
        background: {
            backgroundColor: theme.background,
            flex: 1
        },
        imageContainer: {
            alignItems: 'center',
            marginTop: '15%',
        },
        image: {
            width: 100,
            height: 100,
            borderRadius: 50,

        },
        listView: {
            marginTop: 20,
            marginRight: 40,
            marginLeft: 40,
            height: '60%',
            borderColor: theme.text,
            borderRadius: 20,
            borderWidth: 1
        }
    });
}
