// import * as firebase from "firebase";
import {initializeApp} from "firebase/app"
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
// import "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyCS-OeeNMCvGtuY65N9Ntaux-TOEm2Nbq0",
    authDomain: "signal-clone-c107e.firebaseapp.com",
    projectId: "signal-clone-c107e",
    storageBucket: "signal-clone-c107e.appspot.com",
    messagingSenderId: "126669245218",
    appId: "1:126669245218:web:2ed3a8a0902910e9e7737b"
  };

// let app;
// if(firebase.apps.length === 0){
//   app= firebase.initializeApp(firebaseConfig);
// }
// else{
//   app= firebase.app();
// }
const app= initializeApp(firebaseConfig);
// const db = app.firestore();
// const auth = firebase.auth();

// export {db , auth};
const db = getFirestore(app);

export { db };