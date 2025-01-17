import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import arrowBack from '../assets/arrow_back.png'

const BackButton =({goBack,styleBackButton}) => {
  return (
    <TouchableOpacity style={styleBackButton} onPress={goBack}>
        <Image style={styles.image} source={arrowBack} />
    </TouchableOpacity>
  )
}

export const styles = StyleSheet.create({
    image: {
        width: 24,
        height: 24,
    },
})

export default BackButton