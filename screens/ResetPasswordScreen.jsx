import React, {  useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native'
import Background from '../components/Background'
import { COLORS, FONTS, SIZES } from '../constants';
import logo from '../assets/logo.png'
import TextInput from '../components/TextInput';
import Buttons from '../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import { validationEmail } from '../helpers';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import BackButton from '../components/BackButton';
import { sendPasswordResetEmail } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebase';
const ResetPasswordScreen =() => {

    const [email,setEmail] = useState({value:'',error:''})
    const [loading,setLoading] = useState(false)
    const navigation = useNavigation()
    

    // Handlers
   const onPress = async() => {
        const emailError = validationEmail(email.value)
        setLoading(true);
        if (emailError) {
            setEmail({ ...email, error: emailError })
            setLoading(false);
            return
        } else {
             try {
                // reset password
                await sendPasswordResetEmail(FIREBASE_AUTH, email.value);
                navigation.navigate('Signin')
                } catch (error) {
                    setLoading(false);
                    alert('Error during signup:', error.message);
                } finally {
                    setLoading(false)
                }
}
    }


  return (
    <Background>
        <BackButton goBack={navigation.goBack} styleBackButton={styles.styleBackButton} />
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

{

            loading  ? <ActivityIndicator size="large" color={COLORS.bg} /> : 
                <Buttons
                    title="Sign In"
                    pressHandler={onPress}
                    stylesText={styles.textButton}
                    stylesButton={styles.button}
                />
            }

        
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
    styleBackButton:{
        position:'absolute',
        top: 50 + getStatusBarHeight(),
        left: 0,
    },
})

export default ResetPasswordScreen