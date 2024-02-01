import { initializeApp } from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

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

  const db = getFirestore(firebaseApp); //Conexão com o banco de dados
  const auth = getAuth(firebaseApp) //Conexão com a autenticação

  export {db, auth}; //Exportando banco de dados e autenticação para poder chamá-los em outros arquivos