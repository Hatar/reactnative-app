import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import CartIcon from './CartIcon'
import BackButton from './BackButton'
import { useNavigation } from '@react-navigation/native'

const Header =({title,isEnableIcon}) =>{
  const navigation = useNavigation()  
  return (
    <View style={styles.header}>
        <BackButton goBack={navigation.goBack} />
        {
            title && (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.category}>
                        <Text style={styles.headerTitle}>{title}</Text>
                    </View>
                </View>
            )
        }
        {isEnableIcon && <CartIcon />}
    </View>
  )
}


export const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:45,
        marginHorizontal:10
        },
    category: {
        height: '100%',
        maxWidth: '80%',
        backgroundColor: COLORS.cardBg,
        paddingHorizontal: SIZES.medium * 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.xLarge
    },
    headerTitle:{
        color:COLORS.white,
        fontFamily:FONTS.bold,
        fontSize:SIZES.large,
    },
})

export default Header