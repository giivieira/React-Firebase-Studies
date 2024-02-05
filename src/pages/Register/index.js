import {useState} from 'react'
import {Link} from 'react-router-dom'
import {auth} from '../../firebaseConnection'
import {useNavigate} from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'


export default function Register () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  async function handleLogin(e) {  // Função que confere se os campos de e-mail e senha foram preenchidos
    e.preventDefault();
    if(email !== '' && password !== ''){
      await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/admin', {replace: true})
      })
      .catch(() => {
        alert("Erro ao fazer cadastro")
      })
    }else{
      alert("Preencha todos os campos")
    }
  }

    return (
      <div className='home-container'>
        <h1>Cadastre-se</h1>
        <span>Vamos criar sua conta:</span>

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

          <button type='submit'>Cadastrar</button>

        </form>

        <Link className="button-link" to="/">
          Já possui uma conta? Login
        </Link>

      </div>
    )
  }
  