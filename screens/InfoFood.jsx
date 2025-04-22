import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import Buttons from '../components/Buttons'
import star from '../assets/star.png'
import Header from '../components/Header'
import { Platform } from 'react-native'
import { addItemToCart } from '../redux/slices/cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { isIncludeInCart } from '../helpers'

const InfoFood =  ({route}) => {
  const {item} = route.params
  const {items} = useSelector((state)=>state.carts)
  const dispatch = useDispatch();

  const {width} = useWindowDimensions()

  const addToCart = () => {
    if(!isIncludeInCart(items,item)) {
        dispatch(addItemToCart(item))
    }
  }
 
  const renderFoodInformation = () => {
    const marginTop = Platform.OS === "ios" ? 10 : 20
    const height = Platform.OS === "ios" ? width === 576  ? 350 : 370 : width === 576  ? 400 : 470

    return (
        <>
            <View style={{ alignItems: 'center',marginTop }}>
                <View style={styles.food_image}>
                    <Image
                        source={{uri: item.imageUrl}}
                        resizeMode='contain'
                        style={{
                            width: SIZES.width,
                            height: '100%',
                        }} 
                    />
                </View>
            </View>
            <View style={[styles.bottom_container, { height }]}>
                 {/* Title */}
                <Text style={styles.name}>{item.title}</Text>
                {/* Description */}
                <Text style={styles.description}>{item.description}</Text>
                
                {item.recepies && item.recepies.length > 0 && (
                    <View style={{flexDirection:'row',justifyContent:"space-between", alignItems:'center',gap:8,paddingVertical: SIZES.padding, paddingHorizontal: SIZES.padding * 3,}}>
                        <Text style={styles.duration_text}>Recepies: </Text>
                        <Text style={{
                            fontWeight:500,
                            fontSize:SIZES.medium,
                            color: COLORS.bg,
                            color: COLORS.cardBg 
                        }}>
                            {item.recepies.join('  -  ')}
                        </Text>
                    </View>
                )}

                 {/* Duration */}
                <View style={styles.row_container}>
                    <Text style={styles.duration_text}>Duration:</Text>
                    <Text style={styles.duration_text}>10 - 20 min</Text>
                </View>
                <View style={styles.row_container}>
                    <Text style={styles.duration_text}>Price:</Text>
                    <Text style={styles.duration_text}>{item.price}$</Text>
                </View>
            </View>

            {/* Add to Cart Button */}
            <View style={{ margin: 10 * 2, marginTop: Platform.OS === "ios" ? 0: width === 576  ? -15 : 35 }}>
                <Buttons
                    title="Add to Cart"
                    pressHandler={() =>addToCart()}
                    stylesText={styles.textButton}
                    stylesButton={styles.button}
                />
            </View>

        </>
    )
  }
  return (
    
    <SafeAreaView style={styles.container}>
        <Header title={item?.title} isEnableIcon={true}/>
        {renderFoodInformation()}
    </SafeAreaView>
  )
}


export const  styles = StyleSheet.create({
    container:{
        paddingTop: 15,
        flex:1,
    },
    food_image: {
        height: SIZES.height * 0.30,
        marginTop: 16,
        paddingBottom: 20,
    },
    bottom_container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 6,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        shadowOpacity: 0.1,
        height:450
    },
    name: {
        textAlign: 'center',
        fontFamily:FONTS.semiBold,
        fontSize:SIZES.xLarge,
        paddingVertical: SIZES.padding * 1,
        marginHorizontal: SIZES.padding * 3,
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 1
    },
    description: {
        fontFamily:FONTS.semiBold,
        fontSize:SIZES.medium,
        letterSpacing:0.5,
        lineHeight:25,
        paddingVertical: SIZES.padding,
        marginHorizontal: SIZES.padding * 3,
        color: COLORS.bg,
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 1
    },
    row_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',    
        alignItems:'center',
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.padding * 3,
    },
    price: {
        fontFamily:FONTS.bold,
        fontSize:25
    },
    rating: {
        fontSize:SIZES.large
    },
    duration_text: {
        fontFamily:FONTS.bold,
        fontSize:SIZES.large,
        color: COLORS.bg
    },
    button: {
        backgroundColor: COLORS.bg,
        padding: SIZES.small + 4,
        alignItems: "center",
        borderRadius: SIZES.medium,
        marginVertical:10,
        top: 350,
        right: 0,
        left:0
    },
    textButton: {
        color: COLORS.white,
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.large,
    },

})

export default InfoFood