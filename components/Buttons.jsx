import React from 'react'
import { Image,Text, TouchableOpacity } from 'react-native'

const Buttons =({pressHandler,title,stylesText,Icon,stylesButton}) => {
  const RenderContentButton = () => {
    if(!Icon) {
            return <Text style={stylesText}>{title && title}</Text>
        } else {
            return <Image
                source={Icon}
                resizeMode="contain"
                style={{
                    width: 25,
                    height: 25,
                }}
              />
        }

  }
  return (
    <TouchableOpacity style={stylesButton} onPress={pressHandler}>
        <RenderContentButton />
    </TouchableOpacity>
  )
}

export default Buttons