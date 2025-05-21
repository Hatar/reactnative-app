import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native'
import Background from '../components/Background'
import { COLORS, ICONS } from '../constants';
import TextInput from '../components/TextInput';
import Buttons from '../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import { validationEmail, validationPassword } from '../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { actSignIn, clearStateAuth } from '../redux/slices/auth/authSlice';
import Logo from '../components/Logo';

const Signin = () => {
    const [email, setEmail] = useState({ value: 'a2a@Uexample.com', error: '' })
    const [password, setPassword] = useState({ value: '12An0&23b', error: '' })
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const { loading, error, user } = useSelector((state) => state.auth);

    const onPress = async () => {
        const emailError = validationEmail(email.value)
        const passwordError = validationPassword(password.value)
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        } 
        const response = await dispatch(actSignIn({ email: email.value, password: password.value }))
        if (response?.error?.message !== "Rejected") {
            await navigation.navigate('MainTabs');
        }
    }

    useEffect(() => {
        if (user !== null) {
            setEmail({ value: user.email, error: '' })
            setPassword({ value: user.password, error: '' })
        }
    }, [user])

    return (
        <Background>
            <Logo />

            {error && (
                <Text className="text-lg font-medium text-red-600 mb-4 text-center">
                    {error}
                </Text>
            )}
            
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

            <View className='w-full flex-row justify-end mb-6'>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ResetPasswordScreen')}
                >
                    <Text className='text-gray-500 text-sm'>Forgot your password?</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color={COLORS.bg} />
            ) : (
                <Buttons
                    title="Log In"
                    pressHandler={onPress}
                    stylesButton="w-full h-14 bg-primary rounded-lg justify-center items-center"
                    stylesText="text-xl text-black font-bold"
                />
            )}
            
            <View className='flex-row justify-center items-center mt-6'>
                <Text className='text-gray-600'>Don't have an account? </Text>
                <TouchableOpacity 
                    onPress={() => {
                        dispatch(clearStateAuth())
                        navigation.navigate("Signup")
                    }}
                >
                    <Text className='font-bold text-gray-700'>Sign up</Text>
                </TouchableOpacity>
            </View>
        </Background>
    )
}

export default Signin