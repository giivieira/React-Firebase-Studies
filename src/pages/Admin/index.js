import { useState, useEffect } from 'react'
import './admin.css'
import {auth, db} from '../../firebaseConnection'
import { signOut } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'


export default function Admin() {
    const [tarefaInput, setTarefaInput] = useState('')
    const [user, setUser] = useState({})

    useEffect(() => {
        async function loadTarefas() { // Carrega as tarefas do usuário logado
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))
        }
        loadTarefas();
    }, [])

    async function handleRegister(e) {
        e.preventDefault(); 
        if(tarefaInput === '') { // Se o campo tarefaInput estiver vazio
            alert("Digite uma tarefa...")
            return;
        }

        await addDoc(collection(db, "tarefas"), { // Registrar tarefa na lista
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid
        })
        .then(() => {
            console.log("Tarefa Registrada")
            setTarefaInput('') // Limpar o campo de adicionar tarefa
        })
        .catch((error) => {

        
        alert("Erro ao registrar " + error)
        })
    }

    async function handleLogout() {
        await signOut(auth);
    }

    return(
        <div className='admin-container'>
            <h1>Minhas tarefas</h1>

            <form className='form' onSubmit={handleRegister}>
                <textarea placeholder='Digite sua tarefa...'
                value={tarefaInput}
                onChange={(e) => setTarefaInput(e.target.value)}
                />

                <button className='btn-register' type='submit'>Registrar Tarefa</button>
            </form>

            <article className='list'>
                <p>Estudar React JS</p>

                <div>
                    <button>Editar</button>
                    <button className='btn-delete'>Concluir</button>
                </div>
            </article>

            <button className='btn-logout' onClick={handleLogout}>Sair</button>

        </div>
    )
}