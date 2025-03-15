import React from 'react'
import { StyleSheet,View,Image,Text, TouchableOpacity } from 'react-native'

const Buttons =({key,pressHandler,title,stylesText,Icon,stylesButton}) => {
  const RenderContentButton = () => {
    if (Icon && title) {
      return (
        <View style={styles.contentWrapper}>
          <Image
            source={Icon}
            resizeMode="contain"
            style={styles.icon}
          />
          <Text style={stylesText}>{title}</Text>
        </View>
      )
    } else if (Icon) {
      return (
        <Image
          source={Icon}
          resizeMode="contain"
          style={styles.icon}
        />
      )
    } else {
      return <Text style={stylesText}>{title}</Text>
    }
  }  
  return (
    <TouchableOpacity key={key} style={stylesButton} onPress={pressHandler}>
        <RenderContentButton />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  contentWrapper: {
    flexDirection: "row", // Arrange icon & text in a row
    alignItems: "center", // Align them vertically
    gap: 8, // Add spacing between icon & text
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default Buttons