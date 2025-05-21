import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTS, ICONS, SIZES } from '../constants'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import Buttons from './Buttons'
import Ionicons from 'react-native-vector-icons/Ionicons';
const CustomeContent = ({item,isLastItem,isEnableChangeContent,isHome,isArticle,handleDelete,handleEditFood}) => {
  const navigation = useNavigation()
  const {categories} = useSelector((state)=> state.categories)
  const role = useSelector((state) => state.auth.role);
  
  let getNameOFCategory = "";
  if (item && item.categoryId !== undefined && categories.length > 0) {
    const category = categories.find((category) => {
      return category.categoryId === item?.categoryId;
    });
    if (category) {
      getNameOFCategory = category.nameCategory
    }
  }

  const renderContentArticle = () => {
      return (
        <View>
            {
              role ==="admin" && !isArticle && (
                <View style={styles.actionsBtn}>
                  <Buttons
                      Icon={<Ionicons name={"pencil-outline"} size={35} />} 
                      pressHandler={handleEditFood}
                      stylesButton={styles.button}
                  />
                  <Buttons
                      Icon={<Ionicons name={"trash-outline"} size={35} />}
                      pressHandler={handleDelete}
                      stylesButton={styles.button}
                  />
                </View>
              )
            }
            
            <Image source={{ uri: item?.image || item?.imageUrl }} style={styles.image_article}/>
            
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
              <View style={{margin:15,gap:10}}>
                {getNameOFCategory !== undefined ? 
                  <Text style={styles.article_title}> 
                  <Text style={styles.boldText}>Category: </Text>
                    {getNameOFCategory}
                  </Text> :
                  ""
                }
                
                <Text style={styles.article_title}>
                  <Text style={styles.boldText}>title: </Text>
                  {item?.title}
                </Text>
                
                {isHome && 
                  <Text ellipsizeMode='tail' numberOfLines={1}  style={styles.article_title}>
                    <Text style={styles.boldText}>Description: </Text>
                    {item?.author || item?.description}
                  </Text>
                }
                
                <Text style={styles.article_title}>
                  <Text style={styles.boldText}>{item?.price  ? "Price:"  : "Date:"}: </Text>
                  {item?.date || `${item?.price}$`}
                </Text>

                {item.recepies && item.recepies.length > 0 && (
                  <Text style={styles.article_title}>
                    <Text style={styles.boldText}>Recepies: </Text>
                    <Text style={{ color: COLORS.cardBg }}>
                      {item.recepies.join('  -  ')}
                    </Text>
                  </Text>
                )}
              </View>
              {!isArticle && 
                <View style={{margin:15,gap:10}}>
                  <Text style={styles.boldText}>{ item?.inStock ? "in Stock" : "Out of Stock" }</Text>
                </View>
              }
            </View>
        </View>
      )
  }

  const renderContentItemFood = () => {
    return (
      <View style={styles.infoSection}>
        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.itemTitle}>{item?.title}</Text>
        <Text style={styles.itemPrice}>{item?.price}$</Text>
      </View>
    )
  }

  return (
      <TouchableOpacity style={[styles.itemContainer,isEnableChangeContent && styles.overideBackground,isLastItem && styles.lastItem]} onPress={() => {
            if(!isArticle) {
              navigation.navigate('InfoFood',{item})
            }
          }}>
          {!isEnableChangeContent &&
            <Image source={{uri:item?.imageUrl}} style={!isEnableChangeContent ? styles.itemImage: styles.image_article} resizeMode="cover" />
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
    height:280,
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
  boldText:{
    fontWeight:600,
    fontSize:15,
    color:COLORS.second
  }

})

export default CustomeContent