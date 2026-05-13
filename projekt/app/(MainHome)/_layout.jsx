import { Tabs } from "expo-router"
import { StatusBar, useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons"

const MainHomeLayout = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light
    return (
        <>
            <StatusBar style="auto" />
            <Tabs 
                screenOptions={{ headerShown: false, tabbarStyle: {
                    backgroundColor: theme.navBackground,
                    paddingTop: 10,
                    height: 90
                }, 
                tabBarActiveTintColor: theme.iconColorFocused,
                tabBarInactiveTintColor: theme.iconColor,
            }}
            >

            <Tabs.Screen 
            name="Profile" 
            options={{ title: 'PROFIL', tabBarIcon: ({ focused }) => (
                <MaterialDesignIcons 
                    size={24}
                    name={(focused ? "account" : "account-outline")}
                    color={(focused ? theme.iconColorFocused : theme.iconColor)}
                />
            ) }} 
            />

            <Tabs.Screen 
            name="Home" 
            options={{ title: 'MENU GŁÓWNE', tabBarIcon: ({ focused }) => (
                <MaterialDesignIcons 
                    size={24}
                    name={(focused ? "menu" : "menu-open")}
                    color={(focused ? theme.iconColorFocused : theme.iconColor)}
                />
            ) }} 
            />

            <Tabs.Screen 
            name="Settings" 
            options={{ title: 'USTAWIENIA', tabBarIcon: ({ focused }) => (
                <MaterialDesignIcons 
                    size={24}
                    name={(focused ? "cog" : "cog-outline")}
                    color={(focused ? theme.iconColorFocused : theme.iconColor)}
                />
            ) }} 
            />

            </Tabs>
        </>
    )
}


export default MainHomeLayout