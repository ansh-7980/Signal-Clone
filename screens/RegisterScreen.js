import { View ,StyleSheet} from 'react-native'
import React ,{useState ,useLayoutEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, Input ,Text} from 'react-native-elements';
import styled  from 'styled-components/native';
// import { auth } from '../firebase';
import { getAuth,createUserWithEmailAndPassword, onAuthStateChanged, signOut ,updateProfile } from "firebase/auth";

const auth = getAuth();


const MainView= styled.View`
flex:1;
align-items: center;
padding:10px;
background-color: white;
`
const InputView = styled.View`
width: 300px;
`
const RegisterScreen = ({navigation}) => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [imageUrl,setImageUrl] = useState("");
   

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackTitle: 'Back to login',
        })
    } ,[navigation])

    const register =()=>{

        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
          const user = userCredential.user;
            updateProfile(user,{
                displayName: name,
                photoURL: imageUrl || "https://images.unsplash.com/photo-1618042164219-62c820f10723?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",

            })
        })
        .catch((error)=>alert(error.message));
// console.log(photoURL)
    };
  return (
    <MainView>
    <StatusBar style='light'/>
      <Text h4 style={{marginBottom:50 ,marginTop:50}}>Create a Signal Account</Text>
      <InputView>
        <Input placeholder='Full name' autoFocus type="text" value={name} onChangeText={(text)=>setName(text)}/>
        <Input placeholder='Email'  type="email" value={email} onChangeText={(text)=>setEmail(text)}/>  
        <Input placeholder='Password' type="password" secureTextEntry value={password} onChangeText={(text)=>setPassword(text)}/>
        <Input placeholder="Profile Picture URL (optional)" type="text" value={imageUrl} onChangeText={(text) => setImageUrl(text)} onSubmitEditing={register}/>
      </InputView>

      <Button containerStyle={styles.button} raised onPress={register} title="Register"/>
    </MainView>
    
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    button:{
        width:200,
        marginTop:10,
    }

})