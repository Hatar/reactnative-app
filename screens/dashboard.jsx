import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import Buttons from '../components/Buttons'
import Categories from './Categories'
import Foods from './Foods'

const Dashboard =  () => {  
  const [tabName,setTabName] = useState("categories")
  return (
    <SafeAreaView style={styles.container}>
        {/* <View style={styles.section_btns}>
            <Buttons
                title="Categories"
                pressHandler={() =>setTabName("categories")}
                stylesText={styles.textButton}
                stylesButton={[styles.button,tabName === "categories" && styles.activeButton,]}
            />
            <Buttons
                title="Foods"
                pressHandler={() =>setTabName("foods")}
                stylesText={styles.textButton}
                stylesButton={[styles.button,tabName === "foods" && styles.activeButton,]}
            />
        </View>
        {
          tabName === "categories" ? <Categories/> : <Foods/>
        } */}
        <View><Text>dashabord</Text></View>
    </SafeAreaView>
  )
}


export const  styles = StyleSheet.create({
    container:{
      paddingTop: 15,
      flex:1,
  },
    section_btns:{
      flexDirection:"row",
      gap:10
    },
    button: {
        backgroundColor: COLORS.bg,
        padding: SIZES.small+5,
        alignItems: "center",
        borderRadius: SIZES.medium,
        marginVertical:5,
    },
    textButton: {
        color: COLORS.white,
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.large,
    },
    activeButton: {
      backgroundColor: COLORS.errors, // Change this to highlight the active button
    },

})

export default Dashboard