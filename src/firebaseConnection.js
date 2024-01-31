import { initializeApp } from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC9kBGyobJVXrzZ_HwHip0CFVzoYan3DPA",
    authDomain: "curso-react-88f53.firebaseapp.com",
    projectId: "curso-react-88f53",
    storageBucket: "curso-react-88f53.appspot.com",
    messagingSenderId: "64764886155",
    appId: "1:64764886155:web:a001ce3d0603f24a5ce88e",
    measurementId: "G-LX29WE1XG3"
  };

  const firebaseApp = initializeApp (firebaseConfig);

  const db = getFirestore(firebaseApp);

  export {db};