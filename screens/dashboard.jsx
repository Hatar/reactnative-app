import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
const Dashboard =  () => {  
  return (
    <SafeAreaView style={styles.container}>
        <View><Text className="text-red-500">dashabord</Text></View>
    </SafeAreaView>
  )
}

export const  styles = StyleSheet.create({
    container:{
      paddingTop: 15,
      flex:1,
  },
})

export default Dashboard