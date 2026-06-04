import { Colors } from "@/constants/Colors";
import { Stack, useRouter, useSegments } from "expo-router";
import React, { useContext, useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { AuthContext, AuthProvider } from "../context/AuthContext";

function InitialLayout() {
  const { user, loading } = useContext(AuthContext);
  const segments = useSegments();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  useEffect(() => {
    if (loading) return;

    const isAuthScreen =
      segments.includes("Login") || segments.includes("Register");

    if (!user && !isAuthScreen) {
      router.replace("/Login");
    } else if (user && isAuthScreen) {
      router.replace("/(MainHome)/Home");
    }
  }, [user, loading, segments, router]);

  return (
    <>
      <StatusBar barStyle="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.navBackground },
          headerTintColor: theme.text,
        }}
      >
        <Stack.Screen name="(MainHome)" options={{ headerShown: false }} />
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="Register" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
