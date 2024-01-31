import {db} from './firebaseConnection'
import './app.css'
import { useState } from 'react';
import {doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc} from 'firebase/firestore'

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [idPost, setIdPost] = useState('');

  const [posts, setPosts] = useState([]);

  async function handleAdd() {

    //  Com "await addDoc" o id é gerado sozinho, com "await setDoc" eu escolho o id --> Exemplo:  await addDoc (collection(db, "posts", "idEscolhido")
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
      console.log("ERRO AO ATUALIZAR O POST")
    })

  }

  // Criando os campos para o usuário preencher, lista para exibir os posts e atualizá-los

  return (
    <div className="App">
      <h1>React Js + Firebase</h1>

      <div className='container'>

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
              <span>Autor: {post.autor} </span> <br/> <br/>
            </li>
            )
          })}

        </ul>


      </div>

    </div>
  );
}

export default App;
