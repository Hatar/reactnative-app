import React from 'react'
import { SafeAreaView, StyleSheet,View,Text  } from 'react-native'
import Header from '../components/Header'
import { COLORS,FONTS,SIZES } from '../constants'
import Buttons from '../components/Buttons'

const Cart =() => {
  const onPress = () =>{
    console.log("clicked")
  }
  return (
    <SafeAreaView style={styles.container}>
        <Header isEnableIcon={false}/>
        <View style={styles.content_cart}>
            <Text style={styles.header_title}>Payment Method</Text>

            <Buttons
                title="Credit Or Debit"
                pressHandler={onPress}
                stylesText={styles.textButton}
                stylesButton={[styles.button, { backgroundColor: COLORS.black }]}
            />
            <Buttons
                title="Apple Pay"
                pressHandler={onPress}
                stylesText={styles.textButton}
                stylesButton={[styles.button, { backgroundColor: COLORS.errors }]}
            />
            <Buttons
                title="Cash"
                pressHandler={onPress}
                stylesText={styles.textButton}
                stylesButton={styles.button}
            />
        </View>
    </SafeAreaView>
  )
}
export const styles = StyleSheet.create({
    container:{
        paddingTop: 15,
        width:'100%',
        flex:1,
    },
    content_cart:{
        flex:1,
        padding:30,
        width:'100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header_title:{
        color:COLORS.bg,
        fontFamily:FONTS.bold,
        fontWeight:500,
        fontSize:SIZES.large + 10,
        marginBottom: 20
    },
    button: {
        backgroundColor: COLORS.second,
        padding: SIZES.small + 4,
        width: '100%',
        alignItems: "center",
        borderRadius: SIZES.medium,
        marginVertical:10,
    },
    textButton: {
        color: COLORS.white,
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.large,
    },
})
export default Cart