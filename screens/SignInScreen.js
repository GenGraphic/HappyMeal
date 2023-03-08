import { StyleSheet, Keyboard, Text, View, ImageBackground,TextInput,TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';


const DismissKeybord = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
);

const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const navigation = useNavigation();

    //navigate on Sign up if user have no accont
    const NavigateToSignUp = () => {
        navigation.navigate('SignUp')
    }
    //if user is signed in navigate to home
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                navigation.navigate('LocationScreen')
            }
        })

        return unsubscribe
    }, [])

    //sign in user
    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.navigate('LocationScreen')
            })
            .catch(err => alert(err))
    }

    return (
    <View style={styles.body}>
        <ImageBackground
        source={require('../assets/Login/Home-screen-v3.jpg')}
        resizeMode='cover'
        blurRadius={3}
        >
            <DismissKeybord>
            <View style={styles.blackTransparent}>
        
                <Image source={require('../assets/logo-noBkg.png')}  style={styles.logo}/>

                <View style={styles.inputForm}>
                    <Text style={styles.screenTitle}>Sign in</Text>
                
                    <View style={styles.nameInputField}>
                        <Image
                            source={require('../assets/icons/email.png')}
                            style={styles.icons}
                        />
                        <TextInput
                            style={{width:'100%', marginLeft: 10, height: '100%'}} 
                            placeholder='Your E-mail'
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>

                    <View style={styles.nameInputField}>
                        <Image
                            source={require('../assets/icons/pass.png')}
                            style={styles.icons}
                        />
                        <TextInput
                            style={{width:'100%', marginLeft: 10, height: '100%'}} 
                            placeholder='Password'
                            secureTextEntry={true}
                            onChangeText={(text) => setPass(text)}
                        />
                    </View>
                    <TouchableOpacity style={styles.registerBtn} onPress={handleSignIn}>
                        <Text style={styles.textBtn}>Sign in</Text>
                    </TouchableOpacity>

                    <Text style={[styles.whiteTxt, {marginTop: 10}]}>You dont't have an account? 
                        <Text
                        onPress={NavigateToSignUp}
                        style={{textDecorationLine: 'underline'}}>
                            Sign up
                        </Text>
                    </Text>
                </View>

                <View style={styles.policyAgreement}>
                    <Text style={styles.whiteTxt}>
                        By continuing, you agree to our 
                        <Text style={{textDecorationLine: 'underline'}}>Privacy Policy</Text> 
                        <Text style={{textDecorationLine: 'underline'}}>Terms and Conditions Refund</Text> & 
                        <Text style={{textDecorationLine: 'underline'}}>Cancellations Policy</Text>
                    </Text>
                </View>
            </View>
            </DismissKeybord>
        </ImageBackground>
    </View>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    whiteTxt: {
        color: '#FFF',
        textAlign: 'center'
    },
    icons: {
        width: 20,
        height: 20
    },

    body: {
        flex: 1,
    },
    blackTransparent: {
        backgroundColor: 'rgba(0, 0, 0 , 0.3)',
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    logo: {
        width:250,
        height: 250
    },
    screenTitle: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: 'bold'
    },
    inputForm: {
        alignItems: 'center'
    },
    nameInputField: {
        width: 300,
        height: 50,
        backgroundColor: '#F8F9F9',
        marginTop: 30,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    registerBtn: {
        marginTop: 30,
        width: 300,
        height: 55,
        backgroundColor: '#F99746',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBtn: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    policyAgreement: {
        marginTop: 50
    }
})