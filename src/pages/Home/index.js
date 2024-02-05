import {useState} from 'react'
import './home.css'
import {Link} from 'react-router-dom'
import {auth} from '../../firebaseConnection'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'


export default function Home () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate ();

  async function handleLogin(e) { 
    e.preventDefault(); // Impede o acesso do usuário antes que os dados sejam validados

    if(email !== '' && password !== ''){ // Se ambos os campos forem preenchidos 

      await signInWithEmailAndPassword(auth, email, password)
      .then(() => { // Se o suário for autenticado --> then (então): navegar para /admin
        navigate('/admin', {replace: true})
      })
      .catch(() => { // Se o usuário não for autenticado
        alert("Erro ao fazer login")
      })
    }else{
      alert("Preencha todos os campos") // Se algum ou ambos os campos não forem preenchidos
    }
  }

    return (
      <div className='home-container'>
        <h1>Lista de Tarefas</h1>
        <span>Gerencie suas tarefas diárias com mais praticidade</span>

        <form className='form' onSubmit={handleLogin}>
          <input type='text' /*Campo para o usuário informar o e-mail*/
          placeholder='Insira seu e-mail'
          value={email}
          onChange={(e) => setEmail(e.target.value)}>
          </input>

          <input type='password' /*Campo para o usuário informar a senha*/
          placeholder='Insira sua senha'
          value={password}
          onChange={(e) => setPassword(e.target.value)}>
          </input>

          <button type='submit'>Entrar</button>

        </form>

        <Link className="button-link" to="/register">
          Não possui uma conta? Cadastre-se
        </Link>

      </div>
    )
  }
  