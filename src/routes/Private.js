import { useEffect, useState } from "react";
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from '../firebaseConnection'
import {Navigate} from 'react-router-dom'


export default function Private({children}) { //Children --> propriedade utilizada para passar elementos filhos para um componente
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => { 
        async function checkLogin(){
            const unsub = onAuthStateChanged(auth, (user) => {
                if(user){ // Se tem usuário logado
                    const userData = { // Se houver um usuário, cria um objeto userData contendo informações do usuário
                        uid: user.uid,
                        email: user.email,
                    }

                    // // Armazena as informações do usuário localmente no navegador
                    // localStorage.setItem("@detailUser", JSON.stringify(userData))

                    setLoading(false); // Parar de carregar 
                    setSigned(true); // Logar usuário

                }else{ // Se não tem usuário logado
                    setLoading(false); // Parar de carregar
                    setSigned(false); // Não logar usuário
                }
            })
        } 
        checkLogin();
    }, [])

    if(loading){
        return (
            <div></div>
        )
    }

    if(!signed){
        return <Navigate to="/" />
    }

    return children;
}