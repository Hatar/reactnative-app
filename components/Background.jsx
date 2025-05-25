import React from 'react'
import { ImageBackground, KeyboardAvoidingView, StyleSheet } from 'react-native'

const Background =({children}) => {
  return (
    <ImageBackground
        className='bg-bgLight flex-1 w-full'
        >
        <KeyboardAvoidingView className="flex-1 w-[90%] self-center items-center justify-center"  behavior="padding">
            {children}
      </KeyboardAvoidingView>    
    </ImageBackground>
  )
}


export const styles = StyleSheet.create({
    background:{
        flex:1,
        width:'100%',
    },
    container:{
        flex:1,
        width:'90%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
export default Background