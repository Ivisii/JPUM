import { Link } from "expo-router"
import { StyleSheet, Text } from "react-native"

import ThemedView from "../components/ThemedView"
import ThemedText from "../components/ThemedText"
import ThemedButton from "../components/ThemedButton"
import ThemedLogo from "../components/ThemedLogo"
import Rozdzielacz from "../components/Rozdzielacz"


const Login = () => {

  const handleLogin = () => {
    console.log("Logowanie...")
  }


  return (
    <ThemedView style={styles.container}>

    <ThemedText>Logowanie</ThemedText>

    <ThemedButton onPress={handleLogin}>
        <Text style={{ color: 'white' }}>Zaloguj</Text>
    </ThemedButton>

    <Rozdzielacz height={60} />
      <Link href="/Register" style={styles.link}>
        Nie masz konta? Zarejestruj się
      </Link>

    <Rozdzielacz height={150}/>
      <Link href="/Home" style={styles.link}>
        H O M E
      </Link>


    </ThemedView>
  );
};

export default Login;

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
