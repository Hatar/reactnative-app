import React from 'react'
import { SafeAreaView, StyleSheet, View,Text } from 'react-native'
import Header from '../components/Header'
import { ICONS } from '../constants'
import CartItems from '../components/CartItems'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const Checkout =() => {
  const navigation = useNavigation()
  const {items} = useSelector((state)=>state.carts)
  return (
    <SafeAreaView style={styles.container}>
        <Header title={"Checkout"} isEnableIcon={false}/>
        <CartItems orderList={items} navigation={navigation}/>
    </SafeAreaView>
  )
}
export const styles = StyleSheet.create({
  container:{
    paddingTop: 15,
    flex:1,
  },
})
export default Checkout