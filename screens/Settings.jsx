import React from 'react'
import { SafeAreaView, Text, View,StyleSheet } from 'react-native'
import Header from '../components/Header'

const Settings =() => {
  return (
    <SafeAreaView style={styles.container}>
        <Header isEnableIcon={true}/>
        <View><Text>Settings</Text></View>
    </SafeAreaView>
  )
}


export const  styles = StyleSheet.create({
    container:{
        paddingTop: 15,
        flex:1,
    }
})

export default Settings