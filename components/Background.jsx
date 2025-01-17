import React from 'react'
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../constants'

const Background =({children}) => {
  return (
    <ImageBackground
        style={styles.background}
    >
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            {children}
      </KeyboardAvoidingView>    
    </ImageBackground>
  )
}


export const styles = StyleSheet.create({
    background:{
        flex:1,
        width:'100%',
        backgroundColor: COLORS.gray
    },
    container:{
        flex:1,
        padding:10,
        width:'100%',
        maxWidth:340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
export default Background