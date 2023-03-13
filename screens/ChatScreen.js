import { View, Text ,TouchableOpacity ,SafeAreaView, ScrollView, TextInput, Keyboard ,TouchableWithoutFeedback} from 'react-native'
import React ,{useLayoutEffect ,useState} from 'react'
import { Avatar } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import styled  from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import { doc, collection, addDoc, serverTimestamp ,onSnapshot,orderBy ,query} from "firebase/firestore"
import {db} from "../firebase"
import { getAuth, signOut  } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;
const HView= styled.View`
flex-direction:row;
justify-content: space-between;
width: 60px;
// margin-right:20px;
`
const MainView = styled.View`

flex:1;
`
const FView = styled.View`
flex-direction: row;
align-items: center;
width: 100%;
padding:16px;

`
const TInput = styled.TextInput`
bottom:0px;
height:40px;
flex:1;
margin-right:15px;
border-width:1px;
border:1px;
padding:10px;
color: gray;
border-radius: 30px;

`
const RecieverView = styled(View)`
padding: 10px;
background-color: "#ECECEC";
border: 1px;
border-radius: 15px;
align-self : flex-end;
margin-right: 15px;
margin-bottom: 20px;
// max-width: 80%;
position: relative;
`
const SenderView = styled.View`
// padding: 15px;
align-self : flex-start;
border: 1px;
border-radius: 15px;
background-color: "#2b68e6";
margin: 15px;
// margin-bottom: 20px;
// max-width: 80%;
position: relative;
`
const SenderName = styled.Text`
margin-left:10px;
padding-right:20px;
font-size:10px;
color: black;
`
const SenderText = styled.Text`
color: black;
font-weight: bold;
margin-left: 10px;
margin-bottom: 15px;
`
const RecieverText = styled.Text`
color: black;
font-weight : 500;
margin-left: 1px;
`

const ChatScreen = ({navigation ,route}) => {
  const [input , setInput ]= useState('');
  const [messages ,setMessages] = useState([])

 useLayoutEffect(()=>{
    navigation.setOptions({
        title: "chat",
        headerBackTitleVisible: false,
        headerTitleAlign: "left",
        headerTitle:()=>(
            <View
            style={{
                flexDirection:"row",
                alignItems:"center"
            }}
            >
                <Avatar rounded 
                source={{
                   uri:messages[0]?.data.photoURL || "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1678423351~exp=1678423951~hmac=e60820be4d0e6d61594633c66392ffbce5bdd89fa3c814a85739f12d995aa123",
                  }}/>
                <Text style={{color:"white" ,marginLeft:10 ,fontWeight:"800"}}>{route.params.chatName}</Text>

            </View>
        ),
        headerLeft:()=>(
            <TouchableOpacity  onPress={navigation.goBack}>

            </TouchableOpacity>
        ),
        headerRight:()=>(
          <HView>
            <TouchableOpacity>
            <Entypo name="video-camera" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
            </TouchableOpacity>
          </HView>
        )
    })
 },[navigation ,messages])

 const sendMessage =()=>{
  Keyboard.dismiss();
 
const messagesRef = collection(db, "chats", route.params.id, "messages");
const message = {
  timestamp: serverTimestamp(),
  message: input,
  displayName: auth.currentUser.displayName,
  email: auth.currentUser.email,
  photoURL: auth.currentUser.photoURL,
};

 addDoc(messagesRef, message);
setInput("")
 };

 useLayoutEffect(() => {
  const q = query(
    collection(db, "chats", route.params.id, "messages"),
    orderBy("timestamp", "asc")
  );
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setMessages(
      snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
    );
  });

  return unsubscribe;
}, [route]);

  return (
    <SafeAreaView style={{flex:1, backgroundColor:"white"}}>
      <StatusBar style='light'/>
      <MainView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
      <ScrollView contentContainerStyle={{paddingTop:15}}>
        
       {messages.map(({id , data})=>
       //firebase email === getstate.email
        data.email === user?.email ?(
          <RecieverView key={id}>
            <Avatar
            position ="absolute"
            rounded
            bottom={-20}
            right={-8}
            size={30} 
            source={{
              uri: data?.photoURL,
            }}
            />
            <RecieverText>{data.message}</RecieverText>
          </RecieverView>
        ) :(
          <SenderView key={id}>
           <Avatar
            position ="absolute"
            rounded
            bottom={-20}
            right={-8}
            size={30} 
            source={{
              uri: data?.photoURL,
            }}
            />
            <SenderText>{data.message}</SenderText>
            <SenderName>{data.displayName}</SenderName>
          </SenderView>

        )
        )}

      </ScrollView>
      <FView>
        <TInput value={input} onChangeText={(text)=> setInput(text)} onSubmitEditing={sendMessage} placeholder="Send Message" />
        <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
        <Ionicons name="send-sharp" size={24} color="black" />
        </TouchableOpacity>
      </FView>
      </>
      </TouchableWithoutFeedback>
      </MainView>
    </SafeAreaView>
  )
}

export default ChatScreen