import { StyleSheet, Image, useColorScheme } from 'react-native'


const ThemedLogo = ({ ...props }) => {
    const colorScheme = useColorScheme()
    const logo = colorScheme === 'dark'
    
  return (
      <Image source={logo} style={styles.logo} { ...props } />
  )
}

export default ThemedLogo

const styles = StyleSheet.create({
logo: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "top",
  },
})