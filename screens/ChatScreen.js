import React, { useLayoutEffect, useState } from 'react'
import { 
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView, ScrollView,
    StatusBar, StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
Platform } from 'react-native'
import { Avatar } from 'react-native-elements';
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import firebase from 'firebase/compat/app';
import { auth, db } from "../firebase";


const ChatScreen = ({ navigation, route }) => {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() =>{
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                <Avatar rounded source={{
                    uri: messages[0]?.data.photoURL || "https://lmis.kemsa.co.ke/assets/kemsa-logo.v01.jpg",
                }} />
                <Text style={{ color: "white", marginLeft: 10, fontWeight: "700"}}>{route.params.chatName}</Text>
                    
                </View>
            ),
            headerLeft: () =>(

                <TouchableOpacity style={{marginLeft: 10}} onPress={navigation.goBack}>
                <AntDesign name='arrowleft' size={24} color="white" />

                </TouchableOpacity>       
                ),
            headerRight: () =>(
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}>
                <TouchableOpacity>
                    <FontAwesome name="video-camera" size={24} color="white"/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="call" size={24} color="white"/>
                </TouchableOpacity>
                </View>
            ),
                        
            });
    },[navigation, messages]);


    const sendMessage = ()=>{
        Keyboard.dismiss();

        db.collection("chats").doc(route.params.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        });
        setInput("");
    };

    useLayoutEffect(() => {
        const unsubscribe = db.collection("chats")
        .doc(route.params.id)
        .collection("messages")
        .orderBy("timestamp", 'asc')
        .onSnapshot((snapshot) => 
        setMessages(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
        ));
    }, [route]);
    return (
        <SafeAreaView style={{flex:1, backgroundColor: "white"}}>
            <StatusBar style="light" />
            <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={90}
            
            >

                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <>
                    <ScrollView contentContainerStyle={{ paddingTop: 15}}>
                        {messages.map(({id, data}) =>
                        data.email === auth.currentUser.email ? (
                            <View key={id} style={styles.receiver}>
                                <Avatar 
                                    position="absolute"
                                    rounded
                                    bottom={-15}
                                    right={-5}
                                    size={30}
                                    source ={{
                                        uri: data.photoURL,
                                    }}
                                />
                                <Text style={styles.receiverText}>{data.message}</Text>
                            </View>
                        ): (
                            <View key={id} style={styles.sender}>
                                <Avatar 
                                position="absolute"
                                rounded
                                bottom={-15}
                                left={-5}
                                size={30}
                                source ={{
                                    uri: data.photoURL,
                                }}
                                 />
                                <Text style={styles.senderText}>{data.message}</Text>
                                <Text style={styles.senderName}>{data.displayName}</Text>
                            </View>
                        ))}
                    </ScrollView>

                    <View style={styles.footer}>

                        <TextInput 
                        value={input}
                        onChangeText={(text) => setInput(text)}
                        onSubmitEditing={sendMessage}
                        placeholder='Send message'
                        style={styles.TextInput} />

                        <TouchableOpacity  onPress={sendMessage} activeOpacity={0.5}>
                            <Ionicons name='send' size={24} color="#2B68E6" />
                        </TouchableOpacity>
                    </View>

                    </>
                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatScreen

const styles = StyleSheet.create({
    container: {
    flex:1,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    sender: {
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative",
    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },

    receiverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white",
    },
    receiver: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    TextInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: "#ECECEC",
        borderWidth: 1,
        padding:10,
        color: "grey",
        borderRadius: 30,
    },
});
