import { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../constants/Colors';

// Create the ThemeContext
export const ThemeContext = createContext({});

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
    const [colorScheme, setColorScheme] = useState('light'); // Default theme is 'light'

    // Load the theme from AsyncStorage or default to system theme
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem('theme');
                if (storedTheme) {
                    setColorScheme(storedTheme);
                } else {
                    setColorScheme(Appearance.getColorScheme()); // Default to system preference
                }
            } catch (error) {
                console.error('Failed to load theme from AsyncStorage:', error);
            }
        };

        loadTheme();
    }, []); // Run once when the component mounts

    // Update AsyncStorage when theme changes
    const setTheme = async (newTheme) => {
        try {
            await AsyncStorage.setItem('theme', newTheme);
            setColorScheme(newTheme);
        } catch (error) {
            console.error('Failed to save theme to AsyncStorage:', error);
        }
    };

    // Set the theme based on the color scheme
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

    return (
        <ThemeContext.Provider value={{ colorScheme, setColorScheme: setTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};
