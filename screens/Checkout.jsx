import React from 'react'
import { SafeAreaView, StyleSheet, View,Text } from 'react-native'
import Header from '../components/Header'
import CartItems from '../components/CartItems'
import { useSelector } from 'react-redux'
const Checkout =() => {
  const {items,total} = useSelector((state)=>state.carts)
  return (
    <SafeAreaView style={styles.container}>
        <Header title={"Checkout"} isEnableIcon={false}/>
        <CartItems orderList={items} total={total}/>
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