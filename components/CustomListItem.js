import { View, Text } from 'react-native'
import React ,{useState ,useEffect}from 'react'
import { ListItem,Avatar } from 'react-native-elements'
import { doc, onSnapshot, orderBy, collection ,query} from "firebase/firestore";
import {db} from "../firebase"
import { getAuth, signOut  } from "firebase/auth";



const CustomListItem = ({id , chatName, enterChat}) => {
  const [chatMessages ,setChatMessages] = useState([]);

  
  useEffect(() => {
    const chatRef = collection(db, "chats", id, "messages");
    const unsubscribe = onSnapshot(
      query(chatRef, orderBy("timestamp", "desc")),
      (snapshot) => {
        setChatMessages(snapshot.docs.map((doc) => doc.data()));
      }
    );
  
    return unsubscribe;
  }, [id]);
  
  return (
    <ListItem onPress={()=> enterChat(id,chatName)} key={id} bottomDivider>
        <Avatar 
        rounded
        source={{
            uri: chatMessages?.[0]?.photoURL || "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1678423351~exp=1678423951~hmac=e60820be4d0e6d61594633c66392ffbce5bdd89fa3c814a85739f12d995aa123",
        }}
        />

        <ListItem.Content>
            <ListItem.Title style={{fontWeight:800}}>
                {chatName} 
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
              {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
            </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem