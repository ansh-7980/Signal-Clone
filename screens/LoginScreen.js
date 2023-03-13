import { View, Text ,Image ,TextInput ,StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { auth } from '../firebase';
import { getAuth,createUserWithEmailAndPassword, onAuthStateChanged, signOut ,signInWithEmailAndPassword} from "firebase/auth";
// import { onAuthStateChanged } from 'firebase/auth';



const Pic = styled.Image`
height: 150px;
width: 150px;
object-fit: contain;
margin-top: 20px;
margin-left: 10px;
margin-bottom: 10px
`
const TInput = styled(TextInput)`
border:1px;
height: 40px;
margin: 12px;
padding: 6px;
width: 300px;
`
const MainView= styled.View`
flex:1;
align-items: center;
// justify-content: center;
padding: 10px;
background-color: white;
`

const LoginScreen = ({navigation}) => {
    // const navigation = useNavigation(); this is another method
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const auth = getAuth();

    useEffect(()=>{
      const unsubscribe= onAuthStateChanged(auth,(authUser)=>{
        console.log(authUser)
            if(authUser){
                navigation.replace('Home')
            }
        })
        return unsubscribe;
    } ,[])

    const signIn = ()=>{
      signInWithEmailAndPassword(auth,email,password)
      .catch((error)=>alert(error))

    }
  return (
    <MainView>
        <StatusBar style="light" />
        <Pic 
        source={require("../assets/signal.png")}
        />

        <View>

        <TInput placeholder="Email" autoFocus type='email' value={email} onChangeText = {(text)=> setEmail(text)}/>
        <TInput placeholder="Password" secureTextEntry  type='password' value={password}  onChangeText = {(text)=> setPassword(text)} onSubmitEditing={signIn}/>
        </View>
        <Button containerStyle={styles.button} title="Login " onPress={signIn} />
        <Button  containerStyle={styles.button}  type="outline" title="Register" onPress={()=> navigation.navigate("Register")} />
    </MainView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    button:{
        width: 200,
        marginTop:10,
        color: "#4275DD"
    }

})