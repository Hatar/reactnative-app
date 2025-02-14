import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTS, ICONS, SIZES } from '../constants'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import Buttons from './Buttons'

const CustomeContent = ({item,isLastItem,isEnableChangeContent,handleDelete,handleEditFood}) => {
  const navigation = useNavigation()
  const {categories} = useSelector((state)=> state.categories)
  const isAdmin = useSelector((state) => state.auth.isAdminAuthenticated);
  const getNameOFCategory = categories.find((category) => category.id === item.categoryId)?.name


  const renderContentArticle = () => {
      return (
        <View>
            {
              isAdmin && (
                <View style={styles.actionsBtn}>
                  <Buttons
                      Icon={ICONS.EditIcon}
                      pressHandler={handleEditFood}
                      stylesButton={styles.button}
                  />
                  <Buttons
                      Icon={ICONS.deleteIcon}
                      pressHandler={handleDelete}
                      stylesButton={styles.button}
                  />
                </View>
              )
            }
            
            <Image source={{ uri: item.image || item.imageUrl }} style={styles.image_article}/>
            <View style={{margin:15,gap:10,justifyContent:'center'}}>
              {getNameOFCategory !== undefined ? <Text style={styles.article_title}>{getNameOFCategory}</Text> : ""}
              <Text style={styles.article_title}>{item.title}</Text>
              <Text ellipsizeMode='tail' numberOfLines={1}  style={styles.article_title}>{item.author || item.description}</Text>
              <Text style={styles.article_title}>{item.date || `${item.price}$`}</Text>
            </View>
        </View>
      )
  }

  const renderContentItemFood = () => {
    return (
      <View style={styles.infoSection}>
        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>{item.price}$</Text>
      </View>
    )
  }

  return (
      <TouchableOpacity style={[styles.itemContainer,isEnableChangeContent && styles.overideBackground,isLastItem && styles.lastItem]} onPress={() => {
            if(!isEnableChangeContent) {
              navigation.navigate('InfoFood',{
                  item:item
              })
            }
          }}>
          {!isEnableChangeContent &&
            <Image source={{uri:item.imageUrl}} style={!isEnableChangeContent ? styles.itemImage: styles.image_article} resizeMode="cover" />
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
    width: 100
  },
  itemPrice: {
    fontSize: SIZES.large,
    color: COLORS.white,
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
  },
  actionsBtn:{
    position:'absolute',
    right:10,
    top:10,
    zIndex:10,
    flexDirection: "row",
    gap: 5,

  },
  button: {
    backgroundColor: COLORS.white,
    padding: SIZES.small,
    alignItems: "center",
    borderRadius: SIZES.medium,
  },

})

export default CustomeContent