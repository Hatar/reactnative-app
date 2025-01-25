import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { useNavigation } from '@react-navigation/native'

const CustomeContent = ({item,isLastItem,isEnableChangeContent}) => {
  const navigation = useNavigation()

  const renderContentArticle = () => {
      return (
        <View>
            <Image source={{ uri: item.image }} style={styles.image_article}/>
            <View style={{margin:15,gap:10,justifyContent:'center'}}>
              <Text style={styles.article_title}>{item.title}</Text>
              <Text style={styles.article_title}>{item.author}</Text>
              <Text style={styles.article_title}>{item.date}</Text>
            </View>
        </View>
      )
  }

  const renderContentItemFood = () => {
    return (
      <View style={styles.infoSection}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
    )
  }

  return (
      <TouchableOpacity style={[styles.itemContainer,isEnableChangeContent && styles.overideBackground,isLastItem && styles.lastItem]} onPress={() => {
            if(!isEnableChangeContent) {
              navigation.navigate('InfoFood')
            }
          }}>
          {!isEnableChangeContent &&
            <Image source={item.image} style={!isEnableChangeContent ? styles.itemImage: styles.image_article} resizeMode="cover" />
          }
          {!isEnableChangeContent ? renderContentItemFood () : renderContentArticle()  }
      </TouchableOpacity>
  )
}


export const styles = StyleSheet.create({
  itemContainer: {
    flex:1, 
    margin: 5,
    backgroundColor: COLORS.cardBg,
    borderColor:COLORS.gray,
    borderWidth:5,
    borderRadius: 20,
    padding: 10,
    position:'relative',
    height:170
  },
  overideBackground:{
    backgroundColor: COLORS.gray,
    color:COLORS.bg,
    borderWidth:0,
    padding:0,
    marginBottom: 15,
    height:250,
    borderLeftWidth:3,
    margin:0,
    borderColor:COLORS.errors,
    position:'static'
  },
  lastItem:{ 
    flex:0,
    width:170,
  },
  infoSection:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
    margin: 'auto',
  },
  itemTitle: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
  itemPrice: {
    fontSize: SIZES.large,
    color: COLORS.white,
  },
  button: {
    backgroundColor: COLORS.second,
    width: 25,
    height: 25,
    justifyContent:'center',
    alignItems: "center",
    borderRadius: 20,
    position:'absolute',
    right:-3,
    top:-118
  },
  textButton: {
    color: COLORS.white,
    fontFamily: FONTS.bold + 10,
    fontSize: SIZES.large,
  },
  image_article:{
    width:'100%',
    height:130,
    borderTopLeftRadius:20,
    borderTopRightRadius:20
  },
  article_title:{
    color:COLORS.cardBg,
    fontSize: SIZES.medium,
    fontWeight:500
  }

})

export default CustomeContent