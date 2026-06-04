import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { supabase } from "../lib/supabase";

import Rozdzielacz from "../components/Rozdzielacz";
import ThemedButton from "../components/ThemedButton";
import ThemedText from "../components/ThemedText";
import ThemedTextPola from "../components/ThemedTextPola";
import ThemedView from "../components/ThemedView";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Błąd", "Wypełnij wszystkie pola");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    setLoading(false);

    if (error) {
      Alert.alert("Błąd rejestracji", error.message);
    } else {
      Alert.alert("Sukces", "Konto utworzone! Możesz się zalogować.");
      router.replace("/Login");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <ThemedText style={{}}>Rejestracja</ThemedText>

        <Rozdzielacz height={40} />

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

        <Rozdzielacz height={20} />

        <ThemedButton onPress={handleRegister} disabled={loading}>
          <Text style={{ color: "white" }}>
            {loading ? "Rejestracja..." : "Zarejestruj"}
          </Text>
        </ThemedButton>

        <Rozdzielacz height={90} />

        <Link href="/Login" style={styles.link}>
          Masz już konto? Zaloguj się
        </Link>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    borderBottomWidth: 1,
  },
});
