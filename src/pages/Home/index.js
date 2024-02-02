import {useState} from 'react'
import './home.css'



export default function Home () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

    return (
      <div className='home-container'>
        <h1>Lista de Tarefas</h1>
        <span>Gerencie suas tarefas diárias com mais praticidade</span>

        <form className='form'>
          <input type='text' /*Campo para o usuário informar o e-mail*/
          placeholder='Insira seu e-mail'
          value={email}
          onChange={(e) => setEmail(e.target.value)}>
          </input>

          <input type='password' /*Campo para o usuário informar a senha*/
          autoComplete={false}
          placeholder='Insira sua senha'
          value={password}
          onChange={(e) => setPassword(e.target.value)}>
          </input>

          <button type='submit'>Entrar</button>

        </form>

      </div>
    )
  }
  