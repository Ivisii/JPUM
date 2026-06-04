import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Rozdzielacz from "../components/Rozdzielacz";
import ThemedButton from "../components/ThemedButton";
import ThemedText from "../components/ThemedText";
import ThemedTextPola from "../components/ThemedTextPola";
import ThemedView from "../components/ThemedView";
import { supabase } from "../lib/supabase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Błąd", "Wypełnij wszystkie pola");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        Alert.alert(
          "Błąd logowania",
          error.message,
          "Sprawdź połączenie i spróbuj ponownie.",
        );
      }
    } catch (error) {
      Alert.alert(
        "Wystąpił problem z siecią. Sprawdź połączenie internetowe i spróbuj ponownie.",
        error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={styles.container}>
          <ThemedText>Logowanie</ThemedText>
        </ThemedView>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={[styles.container, { flex: 2, width: "100%" }]}>
          <View style={{ width: "80%", marginBottom: 10 }}>
            <ThemedTextPola
              style={{ width: "100%" }}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>

          <View style={{ width: "80%", marginBottom: 15 }}>
            <ThemedTextPola
              style={{ width: "100%" }}
              placeholder="Hasło"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />
          </View>
        </ThemedView>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={[styles.container, { flex: 2 }]}>
          <ThemedButton onPress={handleLogin} disabled={loading}>
            <Text style={{ color: "white", alignContent: "center" }}>
              {loading ? " Logowanie... " : " Zaloguj "}
            </Text>
          </ThemedButton>
        </ThemedView>
      </TouchableWithoutFeedback>

      <ThemedView style={[styles.container, { flex: 3 }]}>
        <Rozdzielacz height={60} />
        <Link href="/Register" style={styles.link}>
          <ThemedText
            style={{ borderBottomWidth: 1, borderBottomColor: "white" }}
          >
            Nie masz konta? Zarejestruj się
          </ThemedText>
        </Link>

        <Rozdzielacz height={100} />
      </ThemedView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  link: {
    borderBottomWidth: 1,
  },
});
