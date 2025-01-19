import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import pizza from '../assets/pizza.png'
import { COLORS, FONTS, ICONS, SIZES } from '../constants'
import Buttons from './Buttons'

const CartItems =({orderList}) => {
  const renderItem = ({item}) =>{
    return (
        <TouchableOpacity style={styles.container}>
            {/* Image */}
            <Image
                source={pizza}
                resizeMode='contain'
                style={styles.image} 
            />

            <View style={styles.name_price_container}>

                <Text style={styles.name}>Lorem ipsum dolor sit amet consectetur.</Text>
                <Text style={styles.price}>{item.price}</Text>

                {/* Delete Image */}
                <TouchableOpacity style={styles.delete} onPress={() => console.log("delete item")}>
                    <Image
                        source={ICONS.deleteIcon}
                        resizeMode='contain'
                        style={{
                            height: 40,
                            width: 40,
                            tintColor: 'red'
                        }} />
                </TouchableOpacity>

                <View style={styles.qty_container}>
                    {/* decrease qty */}
                    <TouchableOpacity style={styles.decrease_qty}
                        onPress={() => console.log("decrease qty")}>
                        <Text style={styles.change_qty_text}>-</Text>
                    </TouchableOpacity>

                    {/* Quantity */}
                    <View style={styles.section_qty}>
                        <Text style={styles.qty}>2</Text>
                    </View>

                    {/* increase qty */}
                    <TouchableOpacity style={styles.increase_qty}
                        onPress={() => console.log("increase qty")}>
                        <Text style={styles.change_qty_text}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
  }

  return (
    <View style={{flex:1,marginTop: SIZES.padding * 3 }}>
        <FlatList
            data={orderList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{
                padding: 16,
            }}    
        />

        <View style={styles.bottom_container}>
            {/* Total */}
            <View style={styles.total}>
                <Text style={styles.total_text}>Total:</Text>
                <Text style={styles.total_text}>$ 199</Text>
            </View>
            {/* Order Button */}
            <View style={{ margin: SIZES.padding * 2, marginTop: 0 }}>
                <Buttons
                    title='Confirm Order'
                    pressHandler={() => console.log("confirm order")}
                    stylesText={styles.textButton}
                    stylesButton={styles.button}
                />
            </View>
        </View>
        
    </View>
  )
}
export const styles = StyleSheet.create({
    container: {
        margin: 8,
        elevation: 3,
        width: SIZES.width - 45,
        height: 120,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white
    },

    image: {
        position: 'absolute',
        marginLeft: 8,
        width: '30%',
        height: '100%',
        borderRadius: SIZES.radius,
    },

    name_price_container: {
        padding: SIZES.padding,
        position: 'absolute',
        right: 0,
        height: '100%',
        width: '65%',
    },

    name: {
        fontWeight:500,
        color: COLORS.black,
        width: (SIZES.width - (SIZES.padding * 20))
    },

    price: {
        fontWeight:500,
        color: COLORS.errors
    },

    delete: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: SIZES.padding,
        right: SIZES.padding,
        justifyContent: 'center',
        alignItems: 'center',
    },

    delete: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: SIZES.padding,
        right: SIZES.padding,
        justifyContent: 'center',
        alignItems: 'center',
    },


    qty_container: {
        position: 'absolute',
        bottom: 6,
        right: 15,
        height: 40,
        justifyContent: 'center',
        flexDirection: 'row'
    },

    section_qty: {
        width: 33,
        backgroundColor: COLORS.gray,
        alignItems: 'center',
        justifyContent: 'center'
    },

    qty:{
        fontFamily:FONTS.bold,
        fontSize:18
    },

    decrease_qty: {
        width: 33,
        backgroundColor: COLORS.gray,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },

    increase_qty: {
        width: 30,
        backgroundColor: COLORS.gray,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20
    },

    change_qty_text: {
        fontWeight:400,
        color: COLORS.black
    },

    bottom_container: {
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 5,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },

    total: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: SIZES.padding * 2,
        marginHorizontal: SIZES.padding * 3,
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 2
    },

    total_text: {
        marginLeft: SIZES.padding,
        color: COLORS.black,
        fontSize:SIZES.large,
        fontWeight:500
    },

    button: {
        backgroundColor: COLORS.bg,
        marginTop: SIZES.padding * 3,
        padding: SIZES.small + 4,
        alignItems: "center",
        borderRadius: SIZES.medium,
        marginVertical:10,
    },
    textButton: {
        color: COLORS.white,
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.large,
    },
})
export default CartItems