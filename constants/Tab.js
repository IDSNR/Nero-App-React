import { View, Pressable, Text } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons'
import { ThemeContext } from "@/context/ThemeContext"
import { useContext } from "react"
import { useRouter } from "expo-router"


const { colorScheme, setColorScheme, theme } = useContext(ThemeContext)
const router = useRouter()


export default <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white', // you can change this
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  }}>
    {/* Profile Picture */}
    <Pressable onPress={() => {
        router.push('/account')
    }}>
        <Ionicons name="person-circle" size={24} color="black" />
    </Pressable>

    {/* NERO Title */}
    <Text style={{
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
    }}>
      NERO
    </Text>

    <Pressable onPress={() => {
        router.push('/settings')
    }}>
      <Ionicons name="settings-outline" size={28} color="#000" />
    </Pressable>
  </View>



