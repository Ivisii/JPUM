import { TextInput, useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors'


const ThemedTextPola = ({ style, ...props }) => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light

  return (
    <TextInput 
        style={[
            {
                backgroundColor: theme.uiBackground,
                color: theme.text,
                padding: 20,
                borderRadius: 6,
        },
            style]}
        {...props}
    />

  )
}

export default ThemedTextPola
