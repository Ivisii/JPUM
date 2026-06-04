import { Alert, StyleSheet, View } from "react-native";

import { supabase } from "../../lib/supabase";

import Rozdzielacz from "../../components/Rozdzielacz";
import ThemedButton from "../../components/ThemedButton";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";

const Settings = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleReportProblem = () => {
    Alert.alert(
      "Dziękujemy za zgłoszenie! Kod błędu został zapisany. Skontaktujemy się z Tobą mailowo.",
    );
  };

  const handleChangeTheme = () => {
    Alert.alert(
      "Aplikacja automatycznie dopasowuje się do ustawień Twojego telefonu. Przełącz tryb w ustawieniach systemu (Jasny/Ciemny), aby zobaczyć zmianę.",
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText> Ustawienia </ThemedText>

      <Rozdzielacz height={40} />

      <View style={styles.buttonWrapper}>
        <ThemedButton onPress={handleChangeTheme}>
          <ThemedText>Zmień motyw</ThemedText>
        </ThemedButton>

        <Rozdzielacz height={20} />

        <ThemedButton onPress={handleReportProblem}>
          <ThemedText>Zgłoś problem</ThemedText>
        </ThemedButton>

        <Rozdzielacz height={40} />

        <ThemedButton onPress={handleLogout}>
          <ThemedText>Wyloguj się</ThemedText>
        </ThemedButton>
      </View>
    </ThemedView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    borderBottomWidth: 1,
  },
  buttonWrapper: {
    width: "80%",
    alignItems: "center",
  },
});
