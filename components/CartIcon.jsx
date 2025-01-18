import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTS, ICONS, SIZES } from '../constants'
import { useNavigation } from '@react-navigation/native'

const CartIcon =() => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity style={styles.cart} onPress={() => navigation.navigate('Checkout')}>
         <Image
            source={ICONS.cart}
            resizeMode="contain"
            style={{
                width: 35,
                height: 35,
            }}
          />
          <View style={styles.num}>
            <Text style={styles.text}>{15}</Text>
        </View>
    </TouchableOpacity>
  )
}


export const styles = StyleSheet.create({
    num: {
        position: 'absolute',
        top: -10,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.errors,
        height: 25,
        width: 25,
        borderRadius: 18
    },

    cart: {
        width: 50,
        paddingRight: SIZES.padding * 2,
        justifyContent: 'center'
    },

    text: {
        ...FONTS.bold,
        color: COLORS.white
    }
})


export default CartIcon