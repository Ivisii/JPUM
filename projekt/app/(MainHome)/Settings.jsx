import { StyleSheet } from 'react-native'
import { Link } from "expo-router"

import ThemedView from "../../components/ThemedView"
import ThemedText from "../../components/ThemedText"
import ThemedButton from "../../components/ThemedButton"
import Rozdzielacz from "../../components/Rozdzielacz"

const Settings = () => {
  return (
    <ThemedView style={styles.container}>

    <ThemedText title={true}> Ustawienia </ThemedText>

    </ThemedView>
  )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    link: {
    borderBottomWidth: 1,
    },
})