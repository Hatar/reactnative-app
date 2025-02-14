import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import Buttons from '../components/Buttons'
import Categories from './Categories'
import Foods from './Foods'

const Dashboard =  () => {  
  const [tabName,setTabName] = useState("categories")

  return (
    <SafeAreaView>
        <View style={styles.section_btns}>
            <Buttons
                title="Categories"
                pressHandler={() =>setTabName("categories")}
                stylesText={styles.textButton}
                stylesButton={styles.button}
            />
            <Buttons
                title="Foods"
                pressHandler={() =>setTabName("foods")}
                stylesText={styles.textButton}
                stylesButton={styles.button}
            />
        </View>
        {
          tabName === "categories" ? <Categories/> : <Foods/>
        }
    </SafeAreaView>
  )
}


export const  styles = StyleSheet.create({
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

})

export default Dashboard