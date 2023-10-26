import './App.css';
import {useEffect, useState} from "react"

import { Auth } from './compoments/auth';
import {db, auth} from './config/firebase-config'
import {getDocs, collection, addDoc, doc, deleteDoc, updateDoc} from 'firebase/firestore'
 function App() {
  const [movieList, setMovieList] = useState([])

  const [newTitleMovie, setNewTitleMovie] = useState("")
  const [newDateRelease, setNewDateRelease] = useState(0)
  const [isReciveOscar, setIsReciveOscar] = useState(false)


  const [updateTitle, setUpdateTitle] = useState("")

  const getCollection = collection(db, "movies")
  // console.log( 'conllect', getCollection);
  const getMovieList = async () =>{
    try {
    const data = await  getDocs(getCollection)
    const filleredData = data.docs.map((doc) =>   ({...doc.data(), id:doc.id}) )
    setMovieList(filleredData)
    console.log(filleredData);
    } catch (error) {
      console.log(error);
      
    }
    
  }
  useEffect(() => {
    
    getMovieList();
  } ,[])

  const onSubmit = async () =>{
    await addDoc(getCollection, {  title:newTitleMovie, releaseDate : newDateRelease, recivceOscar : isReciveOscar , userId: auth?.currentUser?.uid } )
    getMovieList()
  }

  const deleteMovie = async (id) =>{
    const movieDoc = doc(db, "movies", id) 
    await deleteDoc(movieDoc)
    getMovieList();
  }
  const updateMovie = async (id) =>{
    const movieDoc = doc(db, "movies", id) 
    await updateDoc(movieDoc, {title: updateTitle})
    getMovieList();
  }
  return (
    <div className="App">
      <Auth />

    <div>
      <input placeholder='Điền tên phim ' onChange={(e) => setNewTitleMovie(e.target.value)}/>
      <input type='number' placeholder='Điền ngày sản xuẩt' onChange={(e) => setNewDateRelease(Number(e.target.value))}/>
      <input type='checkbox' checked={isReciveOscar} onChange={(e) => setIsReciveOscar(e.target.checked)} />
      <label>Có được Oscar không ?</label>
      <button onClick={onSubmit}>Submit</button>
    </div>


      <div>
        {movieList.map((movie) =>(
          <div key={movie.id}>
            <h1 style={{color: movie.recivceOscar ? "red" : "blue"}}>{movie.title}</h1>
            <span>Date : {movie.releaseDate}</span>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

            <input placeholder='title update' onChange={(e) => setUpdateTitle(e.target.value)} />
            <button onClick={() => updateMovie(movie.id)}>update</button>
            </div>
        ))}
      </div>
    </div>
  );
}

export default App;
