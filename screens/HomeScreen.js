import { View, Text ,ScrollView ,SafeAreaView ,TouchableOpacity } from 'react-native'
import React ,{useLayoutEffect ,useState ,useEffect}from 'react'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from 'react-native-elements'
// import { auth } from '../firebase'
import { getAuth, signOut  } from "firebase/auth";
// import { getAuth } from "firebase/auth";
import { Entypo } from '@expo/vector-icons';
import { collection, getDocs,doc,onSnapshot ,query } from "firebase/firestore"; 
import {db} from "../firebase"

const auth = getAuth();

const HomeScreen = ({navigation}) => {

  const [chats,setChats] = useState([])

  const signOutUser =()=>{
    signOut(auth).then(()=>{
      navigation.replace("Login");
    })
  }

  useEffect(()=>{
    const unsubscribe = onSnapshot(
      collection(db, "chats"), 
      (snapshot) => {
        setChats(
          snapshot.docs.map((doc)=>({
            id: doc.id,
            data: doc.data(),
          }))
        )
      });

      return unsubscribe;

},[]);

  useLayoutEffect(()=>{
    const user = auth.currentUser;
    navigation.setOptions({
      title: "Signal",
      headerStyle:{backgroundColor :"#ffff"},
      headerTitleStyle:{color :"black"},
      headerTintColor: "black",
      headerLeft :()=> (
        <View style={{ marginLeft:20}}>
          <TouchableOpacity activeOpacity={0.5} onPress={signOutUser} style={{backgroundColor:"black"}}>
        <Avatar rounded size={30} source={{uri: user?.photoURL}}/>
        {/* console.log(user?.email); */}
        </TouchableOpacity>
        <View style={{width:99}}>
        <Text>{user?.email}</Text>
        </View>
        </View>
      ),
      headerRight:()=>(
        <View style={{flexDirection:"row" ,justifyContent:"space-between",width:80}}>
            <TouchableOpacity activeOpacity={0.5}>
            <Entypo name="camera" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate("AddChat")} activeOpacity={0.5}>
            <Entypo name="pencil" size={24} color="black" />
            </TouchableOpacity>
        </View>
      )
    });
  },[navigation]);

  const enterChat = (id, chatName)=>{
    navigation.navigate('Chat' ,{
      id,
      chatName
    })
  }
   
  return (
    <SafeAreaView>
      <ScrollView style={{height:"100%"}}>

        {chats.map(({id,data:{chatName}})=>(

        <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen