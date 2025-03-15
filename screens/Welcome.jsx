import React, { useEffect, useRef, useState } from 'react'
import { Animated, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { COLORS, FONTS, ICONS, SIZES } from '../constants'
import Buttons from '../components/Buttons'
import {
  useNavigation,
} from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
const Welcome =() =>{
  const navigation = useNavigation()
  const duration = 1000;
  const delay = duration + 300;
  const fadeImageAnimation = useRef(new Animated.Value(0)).current;
  const positionAnimation = useRef(new Animated.ValueXY({ x: 0, y: -300 })).current;
  const fadeTextAnimation = useRef(new Animated.Value(0)).current;
  const moveButtonAnimation = useRef(new Animated.Value(1)).current;
  
  // get token

  
  const onPress = async () => {
    const token = await AsyncStorage.getItem('token')
    if(token) {
      navigation.navigate("Home")
    } else navigation.navigate("Signin")
  }

  // Image Animation
 const imageAnimationHandler = () => {
    Animated.sequence([
      Animated.timing(fadeImageAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(positionAnimation, {
        toValue: { x: 0, y: 0 }, // Move to the right position (x = 200, y = 0)
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };


  // Text Animation
  const textAnimationHandler = () => {
    Animated.timing(fadeTextAnimation, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  };


  // Button Animation
  const buttonAnimationHandler = () => {
    Animated.spring(moveButtonAnimation, {
      toValue: 0,
      friction: 4,
      delay,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
      imageAnimationHandler();
      textAnimationHandler();
      buttonAnimationHandler()
  },[imageAnimationHandler,textAnimationHandler,buttonAnimationHandler])


  return (
    <SafeAreaView style={styles.container}>
        <Animated.View style={[styles.imageContainer,{
            opacity: fadeImageAnimation,
            transform: positionAnimation.getTranslateTransform(),
          }]}
        >
            <View style={styles.imageCard}>
                <Image style={styles.image} source={ICONS.logo}/>
            </View>
        </Animated.View>
        <Animated.View 
          style={[
          styles.textContainer,
          {
            opacity: fadeTextAnimation,
          },
        ]}
        >
            <Text style={styles.mainText}>Find Amazing Eggs</Text>
            <Text style={styles.subText}>
                Explor the top collect of Eggs Xpress
            </Text>
        </Animated.View>
        <Animated.View 
          style={[
            styles.buttonContainer,
            {
              transform: [
                {
                  translateY: moveButtonAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 200],
                  }),
                },
              ],
            },
          ]}
        >
            <Buttons
                title="Get Started"
                pressHandler={onPress}
                stylesText={styles.textButton}
                stylesButton={styles.button}
            />
        </Animated.View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
    paddingHorizontal: SIZES.small + 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  imageContainer: {
    top: -SIZES.medium,
    flexDirection: "row",
    gap: SIZES.small,
  },
  imageCard: {
    borderRadius: SIZES.medium,
    padding: SIZES.small,
    backgroundColor: COLORS.cardBg,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: SIZES.medium,
  },
  textContainer: {
    margin: SIZES.small,
    padding: SIZES.small,
    marginVertical: SIZES.xLarge + 6,
  },
  mainText: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.xLarge + 5,
    textAlign: "center",
    color: COLORS.white,
  },
  subText: {
    fontFamily: FONTS.light,
    textAlign: "center",
    marginTop: SIZES.large,
    color: COLORS.gray,
  },
  buttonContainer: {
    position: "absolute",
    bottom: SIZES.xLarge + 10,
    marginVertical: SIZES.xLarge,
  },
  button: {
    backgroundColor: COLORS.second,
    padding: SIZES.small + 4,
    width: 240,
    alignItems: "center",
    borderRadius: SIZES.medium,
  },
  textButton: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.large,
  },
})

export default Welcome