import { Link } from "expo-router"
import { StyleSheet, Text } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import ThemedView from "../components/ThemedView"
import ThemedText from "../components/ThemedText"
import ThemedButton from "../components/ThemedButton"
import ThemedLogo from "../components/ThemedLogo"
import Rozdzielacz from "../components/Rozdzielacz"

import { auth } from "../services/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"

const Register = () => {
  const handleRegister = () => {
    console.log("Rejestracja...")
  }

  return (
    <ThemedView style={styles.container}>

    <ThemedText style={{}}>Rejestracja</ThemedText>

    <ThemedButton onPress={handleRegister}>
      <Text style={{ color: 'white' }}>Zarejestruj</Text>
    </ThemedButton>


    <Rozdzielacz height={90} />

    <Link href="/Login" style={styles.link}>
      Masz już konto? Zaloguj się
    </Link>

    </ThemedView>
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
