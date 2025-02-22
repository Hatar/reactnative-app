import React, { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Background from '../components/Background';
import { COLORS, FONTS, SIZES } from '../constants';
import logo from '../assets/logo.png';
import TextInput from '../components/TextInput';
import Buttons from '../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton';
import { validateConfirmPassword, validationOtherFields, validationPassword, validationEmail } from '../helpers';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebase';

const Signup = () => {
    const navigation = useNavigation();
    
    const [firstname, setFirstname] = useState({ value: '', error: '' });
    const [lastname, setLastname] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' });
    const [loading, setLoading] = useState(false);

    // Handlers
    const onSignUpPressed = async () => {
        let isValid = true;
    
        // Validate input fields
        const firstNameError = validationOtherFields("firstname", firstname.value);
        const lastNameError = validationOtherFields("lastname", lastname.value);
        const emailError = validationEmail(email.value);
        const passwordError = validationPassword(password.value);
        const confirmPasswordError = validateConfirmPassword(password.value, confirmPassword.value);
    
        // Validation
        if (firstNameError) {
            setFirstname((prev) => ({ ...prev, error: firstNameError }));
            isValid = false;
        }
    
        if (lastNameError) {
            setLastname((prev) => ({ ...prev, error: lastNameError }));
            isValid = false;
        }
    
        if (emailError) {
            setEmail((prev) => ({ ...prev, error: emailError }));
            isValid = false;
        }
    
        if (passwordError) {
            setPassword((prev) => ({ ...prev, error: passwordError }));
            isValid = false;
        }
    
        if (confirmPasswordError) {
            setConfirmPassword((prev) => ({ ...prev, error: confirmPasswordError }));
            isValid = false;
        }
    
        // If all validations pass, proceed with Firebase authentication
        if (isValid) {
            setLoading(true);
    
            try {
                console.log('Attempting to create user...');
                
                // Create a new user with email and password
                const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email.value, password.value);
                if (response) navigation.navigate("Signin");
            } catch (error) {
                console.error('Error during signup:', error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Background>
            <BackButton goBack={navigation.goBack} styleBackButton={styles.styleBackButton} />
            <View style={styles.imageContainer}>
                <View style={styles.imageCard}>
                    <Image style={styles.image} source={logo} />
                </View>
            </View>
            <Text style={styles.title}>Create Your Account</Text>
            <Text style={styles.subtitle}>Join us and start exploring today!</Text>
            
            <TextInput 
                placeholder={'Enter First Name'}
                value={firstname.value}
                errortext={firstname.error}
                autoCapitalize="words"
                returnKeyType="next"
                onChangeText={(text) => setFirstname({ value: text, error: '' })}
            />
            <TextInput 
                placeholder={'Enter Last Name'}
                value={lastname.value}
                errortext={lastname.error}
                autoCapitalize="words"
                returnKeyType="next"
                onChangeText={(text) => setLastname({ value: text, error: '' })}
            />
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
            <TextInput 
                placeholder={'Confirm Password'}
                value={confirmPassword.value}
                errortext={confirmPassword.error}
                secureTextEntry
                returnKeyType="done"
                onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
            />
            {loading ? <ActivityIndicator size="large" color={COLORS.bg} /> : 
                <Buttons
                    title="Sign Up"
                    pressHandler={onSignUpPressed}
                    stylesText={styles.textButton}
                    stylesButton={styles.button}
                />
            }
            <View style={styles.row}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace('Signin')}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
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
    title: {
        fontSize: SIZES.xLarge,
        fontFamily: FONTS.bold,
        color: COLORS.primary,
        textAlign: 'center',
        marginTop: 10,
    },
    subtitle: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.regular,
        color: COLORS.cardBg,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: COLORS.second,
        padding: SIZES.small + 4,
        width: '100%',
        alignItems: "center",
        borderRadius: SIZES.medium,
        marginVertical: 10,
    },
    textButton: {
        color: COLORS.white,
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.large,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: COLORS.errors,
    },
    styleBackButton: {
        position: 'absolute',
        top: 50 + getStatusBarHeight(),
        left: 4,
    },
});

export default Signup;
