import { View, Text, TextInput, Pressable, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useContext, useEffect } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ThemeContext } from "@/context/ThemeContext";
import { useSession } from "@/context/SessionContext";
import { Inter_500Medium, Inter_700Bold, useFonts } from "@expo-google-fonts/inter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function MainScreenGoals() {


    const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);

    const router = useRouter();

    const { userData, setUserData, customizationPost } = useSession();

    const [text, setText] = useState('');
    const [textSkills, setTextSkills] = useState('');
    const [textTraumas, setTextTraumas] = useState('');
    const [textPersonality, setTextPersonality] = useState('');
    const [textLifestory, setTextLifestory] = useState('');

    var customization = userData.customization;

    const [fontsLoaded, error] = useFonts({
        Inter_500Medium,
        Inter_700Bold
    });


    if (!fontsLoaded && !error) {
        return null;
    }

    // storage-changing functions

    const styles = createStyleSheet(theme, colorScheme);

    // simple functions

    function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    return arr;
    }

    const renderItemTraumas = ({ item, index }) => (
        <View style={[styles.row, styles.node]}>
            <Text style={{
                fontSize: 15,
                fontWeight: 700,
                marginLeft: 10
            }}>
                {item}
            </Text>
                <Pressable onPress={() => {
                    var customizationsNew = [...customization["traumas"].filter((item, inde) => inde !== index)];
                    const newUserData = {
                        ...userData,
                        "customization": {
                            ...customization,
                            "traumas":  customizationsNew
                        }
                    }
                    setUserData(newUserData)
                    customizationPost()
                }} style={{
                    marginRight: 7,
                    marginLeft: 'auto'
                }}>
                    <Entypo name="circle-with-cross" size={24} color="red" />
                </Pressable>
            </View>
    );

    const renderItemPersonality = ({ item, index }) => (
        <View style={[styles.row, styles.node]}>
            <Text style={{
                fontSize: 15,
                fontWeight: 700,
                marginLeft: 10
            }}>
                {item}
            </Text>
                <Pressable onPress={() => {
                    var customizationsNew = [...customization["personality"].filter((item, inde) => inde !== index)];
                    const newUserData = {
                        ...userData,
                        "customization": {
                            ...customization,
                            "personality":  customizationsNew
                        }
                    }
                    setUserData(newUserData)
                    customizationPost()
                }} style={{
                    marginRight: 7,
                    marginLeft: 'auto'
                }}>
                    <Entypo name="circle-with-cross" size={24} color="red" />
                </Pressable>
            </View>
    );

    const renderItemSkills = ({ item, index }) => (
        <View style={[styles.row, styles.node]}>
            <Text style={{
                fontSize: 15,
                fontWeight: 700,
                marginLeft: 10
            }}>
                {item}
            </Text>
                <Pressable onPress={() => {
                    var customizationsNew = [...customization["skills"].filter((item, inde) => inde !== index)];
                    const newUserData = {
                        ...userData,
                        "customization": {
                            ...customization,
                            "skills":  customizationsNew
                        }
                    }
                    setUserData(newUserData)
                    customizationPost()
                }} style={{
                    marginRight: 7,
                    marginLeft: 'auto'
                }}>
                    <Entypo name="circle-with-cross" size={24} color="red" />
                </Pressable>
            </View>
    );

    const renderItemGoals = ({ item, index }) => (
        <View style={[styles.row, styles.node]}>
            <Text style={{
                fontSize: 15,
                fontWeight: 700,
                marginLeft: 10
            }}>
                {item}
            </Text>
                <Pressable onPress={() => {
                    var customizationsNew = [...customization["goals"].filter((item, inde) => inde !== index)];
                    const newUserData = {
                        ...userData,
                        "customization": {
                            ...customization,
                            "goals":  customizationsNew
                        }
                    }
                    setUserData(newUserData)
                    customizationPost()
                }} style={{
                    marginRight: 7,
                    marginLeft: 'auto'
                }}>
                    <Entypo name="circle-with-cross" size={24} color="red" />
                </Pressable>
            </View>
    );

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
        <View style={styles.mainView}>
            <View>
                <Text style={styles.textCustomization}>
                    Goals
                </Text>
                <View style={styles.wrapper}>
                    <FlatList
                data={customization.goals}
                renderItem={renderItemGoals}
                    keyExtractor={(n, index) => index.toString()}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardDismissMode="on-drag"
                />
                </View>
                <View style={styles.row}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='You goal goes here'
                        placeholderTextColor='gray'
                        value={text}
                        onChangeText={setText}
                    >

                    </TextInput>
                    <Pressable onPress={() => {
                        setText('');
                        var customizationsNew = [...customization["goals"], text];
                    const newUserData = {
                        ...userData,
                        "customization": {
                            ...customization,
                            "goals":  customizationsNew
                        }
                    };
                    setUserData(newUserData);
                    customizationPost();
                    }}>
                        <Entypo name="arrow-with-circle-up" size={36} color={colorScheme !== 'dark' ? "black" : "white"} style={styles.buttonSend} />
                    </Pressable>
                </View>
            </View>
            <View>
                <Text style={styles.textCustomization}>
                    Skills
                </Text>
                <View style={styles.wrapper}>
                    <FlatList
                data={customization.skills}
                renderItem={renderItemSkills}
                    keyExtractor={(n, index) => index.toString()}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardDismissMode="on-drag"
                />
                </View>
                <View style={styles.row}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='You skill goes here'
                        placeholderTextColor='gray'
                        value={textSkills}
                        onChangeText={setTextSkills}
                    >

                    </TextInput>
                    <Pressable onPress={() => {
                        setTextSkills('');
                        var customizationsNew = [...customization["skills"], textSkills];
                    const newUserData = {
                        ...userData,
                        "customization": {
                            ...customization,
                            "skills":  customizationsNew
                        }
                    };
                    setUserData(newUserData);
                    customizationPost();
                    }}>
                        <Entypo name="arrow-with-circle-up" size={36} color={colorScheme !== 'dark' ? "black" : "white"} style={styles.buttonSend} />
                    </Pressable>
                </View>
            </View>
            <View>
                <Text style={styles.textCustomization}>
                    Personality traits
                </Text>
                <View style={styles.wrapper}>
                    <FlatList
                data={customization.personality}
                renderItem={renderItemPersonality}
                    keyExtractor={(n, index) => index.toString()}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardDismissMode="on-drag"
                />
                </View>
                <View style={styles.row}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='You personality traits goes here'
                        placeholderTextColor='gray'
                        value={textPersonality}
                        onChangeText={setTextPersonality}
                    >

                    </TextInput>
                    <Pressable onPress={() => {
                        setTextPersonality('');
                        var customizationsNew = [...customization["personality"], textPersonality];
                    const newUserData = {
                        ...userData,
                        "customization": {
                            ...customization,
                            "personality":  customizationsNew
                        }
                    };
                    setUserData(newUserData);
                    customizationPost();
                    }}>
                        <Entypo name="arrow-with-circle-up" size={36} color={colorScheme !== 'dark' ? "black" : "white"} style={styles.buttonSend} />
                    </Pressable>
                </View>
            </View>
            <View>
                <Text style={styles.textCustomization}>
                    Traumas
                </Text>
                <View style={styles.wrapper}>
                    <FlatList
                data={customization.traumas}
                renderItem={renderItemTraumas}
                    keyExtractor={(n, index) => index.toString()}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardDismissMode="on-drag"
                />
                </View>
                <View style={styles.row}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='You traumas goes here'
                        placeholderTextColor='gray'
                        value={textTraumas}
                        onChangeText={setTextTraumas}
                    >

                    </TextInput>
                    <Pressable onPress={() => {
                        setTextTraumas('');
                        var customizationsNew = [...customization["traumas"], textTraumas];
                    const newUserData = {
                        ...userData,
                        "customization": {
                            ...customization,
                            "traumas":  customizationsNew
                        }
                    };
                    setUserData(newUserData);
                    customizationPost();
                    }}>
                        <Entypo name="arrow-with-circle-up" size={36} color={colorScheme !== 'dark' ? "black" : "white"} style={styles.buttonSend} />
                    </Pressable>
                </View>
            </View>
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
        row: {
            flexDirection: 'row',
            marginTop: 10
        },
        buttonSend: {
            marginTop: 10,
            marginLeft: 15
        },
        lifeStoryContainer: {
            backgroundColor: theme.text,
            borderRadius: 20,
            paddingLeft: 10,
            marginTop: 10,
            marginRight: 0,
            color: theme.text,
            height: '40%',

        },
        textInput: {
            backgroundColor: theme.text,
            borderRadius: 20,
            paddingLeft: 10,
            marginTop: 10,
            marginRight: 0,
            width: '77%',
            color: theme.background
        },
        node: {
            backgroundColor: '#b3b3b3',
            borderRadius: 30,
            padding: 10,
            marginRight: 30,
            
        },
        wrapper: {
            borderColor: theme.text
        },
        background: {
            backgroundColor: theme.background,
            flex: 1
        },
        textCustomization: {
            marginTop: 20,
            fontWeight: 'bold',
            fontSize: 25,
            color: theme.text
        },
        mainView: {
            marginLeft: 20,
        },
        desc: {
            marginTop: 10,
            color: theme.text
        }
    });
}
