import React from 'react'
import { TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const BackButton =({goBack, color, className}) => {
  return (
    <TouchableOpacity className={className ? className : 'absolute left-1 top-4'} onPress={goBack}> 
        <Ionicons name="chevron-back-outline" size={28} color={color ? color :"black"} />
    </TouchableOpacity>
  )
}

export default BackButton