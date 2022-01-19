import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import {Button,Image, Input } from 'react-native-elements';
import HomeScreen from '../screens/HomeScreen';
import { auth, db } from "../firebase";


const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, SetPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) =>{
            if (authUser) {
                navigation.replace("Home");
            }
        });
        return unsubscribe;
    }, []);

    const signIn = () =>{

        auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error));

    };



    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light' />
            <Image source= {{
                uri: "https://lmis.kemsa.co.ke/assets/kemsa-logo.v01.jpg",
            }} 
            style= {{ width:335, height:125,marginTop:10, borderRadius:8}}
            />
            <View style = {styles.inputContainer} >
                <Input placeholder='Email' autoFocus type="email"  value={email} onChangeText={(text) =>setEmail(text)}/>
                <Input placeholder='Password' secureTextEntry type="password" value={password} onChangeText={(text) =>SetPassword(text)} onSubmitEditing={signIn} />
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title="login" />
            <Button containerStyle={styles.button} onPress={()=> {navigation.navigate("Register")}} type='outline' title="Sign Up" />
            <Button />
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor:"white",

    },
    inputContainer: { width: 300,},
    button: {
        width: 200,
        marginTop: 10,
    },
});
