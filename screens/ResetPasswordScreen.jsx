import React, {  useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Background from '../components/Background'
import { COLORS, FONTS, SIZES } from '../constants';
import logo from '../assets/logo.png'
import TextInput from '../components/TextInput';
import Buttons from '../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import { validationEmail } from '../helpers';

const ResetPasswordScreen =() => {

    const [email,setEmail] = useState({value:'test@alpha.com',error:''})
    const navigation = useNavigation()
    

    // Handlers
   const onPress = () => {
        const emailError = validationEmail(email.value)
        if (emailError) {
            setEmail({ ...email, error: emailError })
            return
        } else {
            navigation.navigate('Signin')
        }
    }


  return (
    <Background>
        <View style={styles.imageContainer}
        >
            <View style={styles.imageCard}>
                <Image style={styles.image} source={logo}/>
            </View>
        </View>
      
        <TextInput 
            placeholder={'Enter Your Email'}
            value={email.value}
            errortext={email.error}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            returnKeyType="next"
            onChangeText={(text) => setEmail({ value: text, error: '' })}
        />

        <Buttons
            title="Sign In"
            pressHandler={onPress}
            stylesText={styles.textButton}
            stylesButton={styles.button}
        />
    </Background>
  )
}


export const styles = StyleSheet.create({
    imageContainer: {
        top: -SIZES.small,
        flexDirection: "row",
        gap: SIZES.small,
    },
    imageCard: {
        borderRadius: SIZES.medium,
        padding: SIZES.small,
        backgroundColor: COLORS.cardBg,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: SIZES.medium,
    },
    button: {
        backgroundColor: COLORS.second,
        padding: SIZES.small + 4,
        width: '80%',
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

export default ResetPasswordScreen