import { Colors } from "@/constants/Colors"
import { Stack } from "expo-router"
import { StatusBar, useColorScheme } from "react-native"

const RootLayout = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <>
    <StatusBar value="auto" />
    <Stack screenOptions={{ headerStyle: { backgroundColor: theme.navBackground },
      headerTintColor: theme.text}}>

      <Stack.Screen name="(MainHome)" options={{ headerShown: false }} />
      <Stack.Screen name="Login" options={{ headerShown: false }} />
      <Stack.Screen name="Register" options={{ headerShown: false }} />

    </Stack>
    </>
  );
};

export default RootLayout
