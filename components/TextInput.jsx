import React from 'react'
import { StyleSheet, TextInput as Input, View, Text } from 'react-native'
import { COLORS, SIZES } from '../constants'

const TextInput =({errortext,...props}) => {
  return (
    <View style={props.customWrapperInput ? props.customWrapperInput : styles.container}>
        <Input
            style={ props.customInput ? props.customInput : styles.input}
            {...props}
        />
        {errortext ? <Text style={styles.error}>{errortext}</Text> : null}
    </View>
  )
}

export const styles = StyleSheet.create({
    container:{
        width:'80%',
        marginVertical:2   
    },
    input: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    error: {
        fontSize: SIZES.small,
        color:COLORS.errors,
        paddingTop: 8,
    },
})

export default TextInput