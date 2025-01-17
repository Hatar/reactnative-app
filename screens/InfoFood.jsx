import React from 'react'
import BackButton from '../components/BackButton'
import { useNavigation } from '@react-navigation/native'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import CartIcon from '../components/CartIcon'
import Buttons from '../components/Buttons'
import pizza from '../assets/pizza.png'
import star from '../assets/star.png'

const InfoFood =  () => {
  const navigation = useNavigation()

  const addToCart = () => {
    console.log('start add to cart')  
  }

  const renderHeader = () => {
    return (
        <View style={styles.header}>
            <BackButton goBack={navigation.goBack} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.category}>
                    <Text style={styles.headerTitle}>Category (Meal)</Text>
                </View>
            </View>
            <CartIcon />
        </View>
        
    )  
  }
 
  const renderFoodInformation = () => {
    return (
        <>
      
            <View style={{ alignItems: 'center' }}>
                <View style={styles.food_image}>
                    <Image
                        source={pizza}
                        resizeMode='contain'
                        style={{
                            width: SIZES.width - 24,
                            height: '95%',
                        }} 
                    />
                </View>
            </View>

            <View style={styles.bottom_container}>
                 {/* Title */}
                <Text style={styles.name}>Meals 1</Text>
                {/* Description */}
                <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus, vitae nisi! Doloribus odit sunt ratione provident at enim est officiis praesentium incidunt, sit repellat, ipsa saepe. A aut totam fuga!</Text>
                 {/* Duration */}
                <View style={styles.row_container}>
                    <Text style={styles.duration_text}>Duration:</Text>
                    <Text style={styles.duration_text}>10 - 20 min</Text>
                </View>
                <View style={styles.row_container}>
                    {/* Price */}
                    <Text style={styles.price}>$30</Text>
                    {/* Rating */}
                    <View style={{ flexDirection: 'row',alignItems:'center' }}>
                        <Image
                            source={star}
                            resizeMode="contain"
                            style={{
                                width: 23,
                                height: 23,
                            }} />
                        <Text style={styles.rating}>4.5</Text>
                    </View>

                </View>
            </View>

            {/* Add to Cart Button */}
            <View style={{ margin: 10 * 2, marginTop: 0 }}>
                <Buttons
                    title="Add to Cart"
                    pressHandler={addToCart}
                    stylesText={styles.textButton}
                    stylesButton={styles.button}
                />
            </View>

        </>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
        {renderHeader()}
        {renderFoodInformation()}
    </SafeAreaView>
  )
}


export const  styles = StyleSheet.create({
     container:{
        paddingTop: 15,
        flex:1,
     },
     header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:45,
        marginHorizontal:10
     },
     category: {
        height: '100%',
        maxWidth: '80%',
        backgroundColor: COLORS.cardBg,
        paddingHorizontal: SIZES.medium * 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.xLarge
    },
    headerTitle:{
        color:COLORS.white,
        fontFamily:FONTS.bold,
        fontSize:SIZES.large,
    },
    food_image: {
        height: SIZES.height * 0.30,
        marginTop: 16,
        paddingBottom: 20
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