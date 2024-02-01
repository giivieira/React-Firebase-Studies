import {db, auth} from './firebaseConnection' //Importando o banco de dados criado no firebase
import './app.css'
import { useState, useEffect } from 'react';
import {doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot} from 'firebase/firestore'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [idPost, setIdPost] = useState('');

  const [posts, setPosts] = useState([]);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState ('');

  const [user, setUser] = useState(false); //False pois ele não começa logado, precisa fazer o login
  const [userDetail, setUserDetail] = useState({})
  


  // Atualiza a lista de posts em tempo real, sem necessidade de recarregar a página --> (onSnapshot)
  useEffect(() => {
    async function loadPosts () {
      const unsub = onSnapshot(collection(db, "posts"), (snapshot) => { 
        let listaPost = [];

        snapshot.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          })
        })
  
        setPosts(listaPost);
      })
    }
    loadPosts();
  })

  async function handleAdd() { //Função para criar um novo post
    //  Com "await addDoc" o id é gerado sozinho, com "await setDoc" eu escolho o id --> Exemplo:  await setDoc (collection(db, "posts", "idEscolhido")
    await addDoc (collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
    .then(() => {
      console.log("CADASTRADO COM SUCESSO")
      setAutor('');
      setTitulo('')
    })
    .catch((error) => {
      console.log("ERRO" + error)
    })

  }

  //Função para buscar um post 
  async function buscarPost (){
    const postRef = collection(db, "posts")
    await getDocs(postRef)
    .then((snapshot) => {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor,
        })
      })
      setPosts(lista);
    })
    .catch((error) => {
      console.log("DEU ALGUM ERRO AO BUSCAR")
    })

  }

  // Função para editar os dados de um post
  async function editarPost() {
    const docRef = doc(db, "posts", idPost)
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor
    })
    .then(() => {
      console.log("POST ATUALIZADO")
      setIdPost('')
      setTitulo('')
      setAutor('')
    })
    .catch(() => {
      alert("ERRO AO ATUALIZAR O POST")
    })

  }

  //Função para excluir um post
  async function excluirPost (id) {
    const docRef = doc(db, "posts", id)
    await deleteDoc(docRef)
    .then(() => {
      alert("POST DELETADO COM SUCESSO")
    })
  }

  async function novoUsuario() { //Função para cadastrar novo usuário
    await createUserWithEmailAndPassword(auth, email, senha)
    .then(() => {
      alert("CADASTRADO COM SUCESSO")
      setEmail(''); //Limpando o campo depois do usuário ser cadastrado
      setSenha('') //Limpando o campo depois do usuário ser cadastrado
    })
    .catch((error) => {
      if(error.code === 'auth/weak-password'){
        alert("Senha muito fraca")
      }else if(error.code === 'auth/email-already-in-use'){
        alert("E-mail já existe")
      }
    })
  }

  async function logarUsuario() {
    await signInWithEmailAndPassword(auth, email, senha)
    .then(() => {
      alert("USUÁRIO LOGADO COM SUCESSO")
      setEmail('');
      setSenha('')

      setUserDetail ({
        uid: value.user.uid,
        email: value.user.email,
      })
      setUser(true);
    })
    .catch(() => {
      alert("ERRO AO FAZER O LOGIN")
    })
  }

  //Criando os campos para o usuário preencher, lista para exibir os posts e atualizar/alterar as informações
  return (
    <div className="App">
      <h1>React Js + Firebase</h1>

      { user && (
      <div>
        <strong>Bem-vindo(a)! Você está logado(a).</strong> <br/>
        <span>ID: {userDetail.uid} - E-mail: {userDetail.email}</span>
        <br/> <br/>
      <div/>
    )}
      

      <div className='container'>
        <h2>Usuários: </h2>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Digite um e-mail'/> <br/>

        <label>Senha</label>
        <input
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder='Informe sua senha'/> <br/>

          <button onClick={novoUsuario}>Cadastrar</button>
          <button onClick={logarUsuario}>Fazer Login</button>
      </div>

      <br/><br/>
      <hr/>

      <div className='container'>   
      <h2>POSTS:  </h2>
        <label>ID do post: </label>
        <input
        placeholder='Digite o ID do post'
        value={idPost}
        onChange={ (e) => setIdPost(e.target.value)}/> <br/>

        <label>Título:</label>
        <textarea
        type="text"
        placeholder='Digite o título'
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}/>

        <label>Autor:</label>
        <input
        type='text'
        placeholder='Autor do post'
        value={autor}
        onChange={(e) => setAutor(e.target.value)}/>

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarPost}>Buscar Post</button> <br/>
        <button onClick={editarPost}>Atualizar Post</button>

        <ul>
          {posts.map((post) => {
            return(
              <li key={post.id}>
                <strong>ID:{post.id}</strong> <br/>
                <span>Título: {post.titulo} </span> <br/>
                <span>Autor: {post.autor} </span> <br/> 
                <button onClick={ () => excluirPost(post.id)}>Excluir</button> <br/> <br/>
              </li>
              )
            })}

         </ul>


       </div>
            
    </div>
    );
  }

export default App;
