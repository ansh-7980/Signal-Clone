import { View, Text } from 'react-native'
import React ,{useLayoutEffect ,useState} from 'react'
import { Button ,Input } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons';
import {db} from "../firebase"
import { collection , addDoc } from "firebase/firestore";
import styled from 'styled-components/native';

const MainView = styled.View`
background-color: white;
padding: 30px;
height: 100%;
width: 100%
`

const AddChatScreen = ({navigation}) => {
    const[input , setInput] = useState("")

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:" Add a new Chat",
            headerBackTitle: "CHAT",
        })

    } ,[navigation])

    const createChat =  async()=>{
        try {
            const docRef = await addDoc(collection(db, "chats"), {
              chatName : input,
            }).then(()=>{
                navigation.goBack();
            })
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
  return (
    <MainView>
        <Input 
        placeholder='enter  a chat name'
        value={input} onChangeText={(text)=>setInput(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Entypo name="chat" size={26} color="black" />
        }
         
         />
         <Button disabled={!input} onPress={createChat} title="create a new chat" />
    </MainView>
  )
}

export default AddChatScreen