import React from 'react'
import { SafeAreaView, StyleSheet, View,Text } from 'react-native'
import Header from '../components/Header'
import { ICONS } from '../constants'
import CartItems from '../components/CartItems'

const Checkout =() => {
  const orderList = [
      { id: '1', title: 'MEALS', price: '$12.99', image: ICONS.biryani },
      { id: '2', title: 'MEALS', price: '$9.99', image: ICONS.pizza },
      { id: '1', title: 'COMBOS', price: '$12.99', image: ICONS.biryani },
  ]
  return (
    <SafeAreaView style={styles.container}>
        <Header title={"Checkout"} isEnableIcon={false}/>
        <CartItems orderList={orderList}/>
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