import { View, Text, TextInput, Pressable, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState, useContext, useEffect } from "react"
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ThemeContext } from "@/context/ThemeContext"
import { useSession } from "@/context/SessionContext"
import { StatusBar } from 'expo-status-bar';

import { Inter_500Medium, Inter_700Bold, useFonts } from "@expo-google-fonts/inter"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"

export default function MainScreenGoals() {

    const { colorScheme, setColorScheme, theme } = useContext(ThemeContext)
    const { userData, setUserData, goalCompleted, goalTookIn } = useSession();

    const router = useRouter()


    const [indexNow, setIndexNow] = useState(0);
    const [hasGoal, setHasGoal] = useState(userData["goals"]["alreadyHasGoal"])
    const mainGoal = userData["goals"]["goals"][indexNow];
    var changeableUserData = userData;
    var showArrow = false;

    var lightOrDark = !(colorScheme === 'dark');


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
                router.push('/account')
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
                router.push('/settings')
            }}>
            <Ionicons name="settings-outline" size={28} color={theme.background} />
            </Pressable>
        </View>
        { indexNow != 0 && (
          <Pressable onPress={() => {
            setIndexNow(prev => prev - 1)
          }} style={{marginTop: 20, marginLeft: 20}}>
            <AntDesign name="arrowleft" size={30} color={theme.text} />
          </Pressable>
        )
        }
        <View style={styles.mainView}>
          <View>
            <Text style={[styles.title, {color: theme.text}]}>
              {userData["goals"]["title"]}
            </Text>
          </View>
          <View style={{marginTop: 80, alignContent: 'center'}}>
            <Text style={[styles.goalText, {color: theme.text, fontSize: 30}]}>
              {mainGoal["goal"]}
            </Text>
            <Text style={{color: theme.text, marginTop: 30, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>
              {mainGoal["desc"]}
            </Text>
            {!hasGoal ? (<View style={{
            marginRight: 'auto',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginLeft: 'auto',
            marginTop: 50
            }}>
              <Pressable onPress={() => {
                setHasGoal(true)
                const newUserData = {
                  ...userData,
                  "goals": {
                    ...userData.goals,
                    "alreadyHasGoal": true
                  }
                }
                setUserData(newUserData);
                goalTookIn(mainGoal);
              }}>
                <AntDesign name="checkcircle" size={38} color="green" />
              </Pressable>
              <Text style={{marginLeft: 40, marginRight: 40}} />
              <Pressable onPress={() => {
                if (indexNow < userData["goals"]["goals"].length - 1){ 
                  setIndexNow(prev => prev + 1)
                }
              }}>
                <Entypo name="circle-with-cross" size={38} color="red" />
              </Pressable>
            </View>) : 
            <View style={{alignItems: 'center', marginTop: 30}}>  
                <Pressable style={{backgroundColor: theme.text, width: '20%', alignItems: 'center', padding: 10, borderRadius: 15}} onPress={() => {
                  goalCompleted(mainGoal)
                  setHasGoal(false)
                  const newGoals = userData["goals"]["goals"].filter((_, i) => i !== indexNow);
                  const newUserData = {
                    ...userData,
                    alreadyHasGoal: false,
                    goals: {
                      ...userData.goals,
                      goals: newGoals,
                    }
                  };
                  setUserData(newUserData)
                }}>
                  <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Done!</Text>
                </Pressable>
            </View>}
            <View style={{marginTop: 90, marginRight: 50, marginLeft: 30}}>
              <Text style={{fontStyle: 'italic', fontSize: 20, color: theme.text}}>
                {userData["goals"]["quote"]}
              </Text>
              <Text style={{textAlign: 'right', color: theme.text, fontSize: 15, marginTop: 25}}>
                - {userData["goals"]["author"]}
              </Text>
            </View>
          </View>
        </View>

        
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaView>
    
    )


} 

function createStyleSheet(theme, colorScheme) {
    return StyleSheet.create({
        colorReal: {
          color: theme.color
        },
        goalText: {
          fontSize: 25,
          fontWeight: 'bold',
        },
        mainView: {
          marginTop: 40,
        },
        title: {
          fontSize: 16,
          fontWeight: 600,
        },
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
        column: {
            flexDirection: 'column',
            alignItems: 'center',
          },
          topBox: {
            width: 400,
            padding: 50,
          },
          title: {
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 25,
          },
          innerColumn: {
            alignItems: 'center',
          },
          goalBox: {
            paddingHorizontal: 30,
            paddingBottom: 20,
          },
          goalText: {
            fontWeight: 'bold',
            fontSize: 30,
            textAlign: 'center',
          },
          goalDescBox: {
            paddingHorizontal: 30,
            paddingVertical: 20,
          },
          descText: {
            fontWeight: 'normal',
            fontSize: 10,
            textAlign: 'center',
          },
          row: {
            flexDirection: 'row',
            alignItems: 'center',
          },
          doneButton: {
            paddingHorizontal: 30,
            paddingVertical: 15,
            borderRadius: 10,
            marginTop: 10,
          },
          doneText: {
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
          },
          quoteContainer: {
            paddingHorizontal: 30,
            paddingTop: 30,
          },
          quoteText: {
            fontStyle: 'italic',
            fontSize: 25,
            textAlign: 'center',
          },
          authorText: {
            textAlign: 'right',
            marginTop: 5,
          },
    });
}



