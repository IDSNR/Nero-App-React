import { View, Text, TextInput, Pressable, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState, useContext, useEffect } from "react"
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeContext } from "@/context/ThemeContext"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Inter_500Medium, Inter_700Bold, useFonts } from "@expo-google-fonts/inter"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"
import { useSession } from "@/context/SessionContext"

export default function MainScreenGoals() {

    const renderItem = (item) => {
        console.log(item);
        return <View style={styles.singleItem}>
            <Text style={styles.defaultText}>
                {item.item["date"]}
            </Text>
            <Text style={styles.defaultText}>
                {item.item["goals"]} goals completed
            </Text>
        </View>
    }


    const { colorScheme, setColorScheme, theme } = useContext(ThemeContext)

    const router = useRouter()

    const { userData } = useSession()
    
    const scoreboardData = userData.scoreboard

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
        <View style={styles.mainView}>
            <View style={styles.row}>
                <FontAwesome name="trophy" size={75} color="yellow" />
                <View style={styles.secondaryView}>
                    <Text style={[styles.defaultNiceDaysText, {fontSize: 30}]}>
                        {scoreboardData.gold.date}
                    </Text>
                    <Text style={[styles.defaultNiceDaysText, {fontSize: 30, fontWeight: '400'}]}>
                        {scoreboardData.gold.goals} goals completed
                    </Text>
                </View>
            </View>
            <View style={styles.row}>
                <FontAwesome name="trophy" size={60} color="#D1D0D1" />
                <View style={styles.secondaryView}>
                    <Text style={[styles.defaultNiceDaysText, {fontSize: 24}]}>
                        {scoreboardData.silver.date}
                    </Text>
                    <Text style={[styles.defaultNiceDaysText, {fontSize: 24, fontWeight: '400'}]}>
                        {scoreboardData.silver.goals} goals completed
                    </Text>
                </View>
            </View>
            <View style={styles.row}>
                <FontAwesome name="trophy" size={45} color="#915136" />
                <View style={styles.secondaryView}>
                    <Text style={[styles.defaultNiceDaysText, {fontSize: 18}]}>
                        {scoreboardData.bronze.date}
                    </Text>
                    <Text style={[styles.defaultNiceDaysText, {fontSize: 18, fontWeight: '400'}]}>
                        {scoreboardData.bronze.goals} goals completed
                    </Text>
                </View>
            </View>
            <View style={{
                borderBottomWidth: 1,
                borderColor: theme.text,
            }}>
            <FlatList 
                data={scoreboardData.days.reverse()}
                keyExtractor={(n, index) => index.toString()}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardDismissMode="on-drag"
                renderItem={renderItem}
            />
            </View>

        </View>
    </SafeAreaView>
    )


} 

function createStyleSheet(theme, colorScheme) {
    return StyleSheet.create({
        mainView: {
            margin: 30
        },
        secondaryView: {
            marginLeft: 20,
            borderLeftWidth: 1,
            borderColor: theme.text,
            padding: 10,
            margin: 10
        },
        defaultNiceDaysText: {
            color: theme.text,
            fontWeight: 'bold'
        },
        defaultText: {
            fontSize: 16,
            color: theme.text,
        },
        singleItem: {
            marginTop: 5,
            marginBottom: 10,
            paddingTop: 5,
            borderTopWidth: 1,
            borderColor: theme.text
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
        row: {
            flexDirection: 'row',
        },
    });
}
