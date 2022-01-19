import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import {Button, Image,Text, Input } from 'react-native-elements';

import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { auth, db } from "../firebase";

const RegisterScreen = ({navigation }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const register = ()=>{
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || "https://lmis.kemsa.co.ke/assets/kemsa-logo.v01.jpg"
            });
        }).catch((error) => alert(error.message));
    };

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackTitle: "Back to Login",
        });

    }, [navigation]);

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light' />
            <Text h3 style={{ marginBottom:50 }}>Create KEMSA  Account</Text>
            <View style={styles.inputContainer}>
                <Input placeholder="Full Name" autofocus type="text"  value = {name} onChangeText={(text) =>setName(text)}/>
                <Input placeholder="Email"  type="email"  value = {email} onChangeText={(text) =>setEmail(text)}/>
                <Input placeholder="Password"  type="password"  secureTextEntry value = {password} onChangeText={(text) =>setPassword(text)}/>
                <Input placeholder="Profile Image Url"  type="text"  onSubmitEditing={register}  value = {imageUrl} onChangeText={(text) =>setImageUrl(text)}/>

            </View>
            <Button  
            containerStyle={styles.button}
            raised
            onPress={register}
            title="Register"
            />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        padding:10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10
    },
})
