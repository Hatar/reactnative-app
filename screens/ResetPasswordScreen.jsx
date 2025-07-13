import React, { useState } from 'react'
import { ActivityIndicator, Image, View, Text } from 'react-native'
import Background from '../components/Background'
import logo from '../assets/logo.png'
import TextInput from '../components/TextInput';
import Buttons from '../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import { validationEmail } from '../helpers';
import BackButton from '../components/BackButton';
import { sendPasswordResetEmail } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebase';
import Logo from '../components/Logo';

const ResetPasswordScreen = () => {
    const [email, setEmail] = useState({ value: '', error: '' })
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    // Handlers
    const onPress = async () => {
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
            <Logo />
            <Text className="text-2xl font-bold text-center text-primary mb-2">Reset Password</Text>
            <Text className="text-base text-center text-gray-500 mb-6 px-6">Enter your email address and we'll send you a link to reset your password.</Text>
            <TextInput
                placeholder={'Enter Your Email'}
                value={email.value}
                errorText={email.error}
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                returnKeyType="next"
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                className="mb-4"
            />
            {loading ? (
                <ActivityIndicator size="large" color="#f9c32d" className="my-4" />
            ) : (
                <Buttons
                    title="Send Reset Link"
                    pressHandler={onPress}
                    className="bg-primary py-4 w-4/5 mx-auto rounded-xl mt-2"
                    textClassName="text-white text-lg font-semibold"
                />
            )}
        </Background>
    )
}

export default ResetPasswordScreen