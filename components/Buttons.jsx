import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const Buttons =({pressHandler,title,stylesText,Icon,stylesButton}) => {
 
  const RenderContentButton = () => {
    if(!Icon) {
            return <Text style={stylesText}>{title && title}</Text>
        } else {
            Icon
        }

  }
  return (
    <TouchableOpacity style={stylesButton} onPress={pressHandler}>
        <RenderContentButton />
    </TouchableOpacity>
  )
}

export default Buttons