import React, {  useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Background from '../components/Background'
import { COLORS, FONTS, SIZES } from '../constants';
import logo from '../assets/logo.png'
import TextInput from '../components/TextInput';
import Buttons from '../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import { validationEmail,validationPassword } from '../helpers';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebase';
const Signin =() => {

    const [email,setEmail] = useState({value:'test@alpha.com',error:''})
    const [password,setPassword] = useState({value:'123456',error:''})
    const [loading,setLoading] = useState(false)
    const navigation = useNavigation()
    

    // Handlers
   const onPress = async () => {
        const emailError = validationEmail(email.value)
        const passwordError = validationPassword(password.value)
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        } else {
            setLoading(true)
            try {
                const response = await signInWithEmailAndPassword(FIREBASE_AUTH,email.value,password.value)
                if(response) navigation.navigate("Home") 
            } catch (error) {
                console.log("error:",error.message)
                setLoading(false)
            } finally {
                setLoading(false)
            }
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
            <TextInput 
                placeholder={'Enter Your Password'}
                value={password.value}
                errortext={password.error}
                secureTextEntry
                returnKeyType="done"
                onChangeText={(text) => setPassword({ value: text, error: '' })}
            />

            <View style={styles.forgotPassword}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ResetPasswordScreen')}
                >
                    <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>

            {
                loading ? <ActivityIndicator size="large" color={COLORS.bg} /> : (
                    <Buttons
                        title="Sign In"
                        pressHandler={onPress}
                        stylesText={styles.textButton}
                        stylesButton={styles.button}
                    />
                )
            }
            

            <View style={styles.row}>
                <Text>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>

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
    forgotPassword: {
        width: '80%',
        alignItems: 'flex-end',
        marginBottom: 5,
    },
    row: {
        flexDirection: 'row',
        marginTop: 5,
    },
    forgot: {
        fontSize: 13,
        color:  COLORS.second,
    },
    link: {
        fontWeight: 'bold',
        color: COLORS.bg,
    },
})

export default Signin