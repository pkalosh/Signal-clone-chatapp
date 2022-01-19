import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements';
 import {db, auth} from "../firebase";


const CustomListItem = ({id, chatName, enterChat}) => {

    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = 
            db.collection("chats")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshop) =>
            setChatMessages(snapshop.docs.map((doc) => doc.data())));
        return unsubscribe;
        
    });

    return (
        <ListItem key={id} onPress={() => enterChat(id, chatName)} bottomDivider>
            <Avatar 
                rounded
                source ={{
                    uri: chatMessages?.[0]?.photoURL || "../assets/favicon.png"
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800"}} >
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                    {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
};

export default CustomListItem

const styles = StyleSheet.create({})
