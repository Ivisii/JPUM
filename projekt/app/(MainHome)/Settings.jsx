import { StyleSheet } from "react-native";

import { supabase } from "../../lib/supabase";

import Rozdzielacz from "../../components/Rozdzielacz";
import ThemedButton from "../../components/ThemedButton";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";

const Settings = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText> Ustawienia </ThemedText>

      <Rozdzielacz height={40} />

      <ThemedButton onPress={handleLogout}>
        <ThemedText>Wyloguj się</ThemedText>
      </ThemedButton>
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
});
