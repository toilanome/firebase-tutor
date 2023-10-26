import {auth, googleProdvider} from "../config/firebase-config";
import {useState} from "react"
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"
export const Auth = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // console.log(auth?.currentUser?.photoURL);
    const signIN = async ()=>{
        await createUserWithEmailAndPassword(auth, email, password)
    }
    const signWithGoogle = async ()=>{
        try {
            await signInWithPopup(auth, googleProdvider)
        } catch (error) {
            console.log(error);
        }
    }
    const logOut = async () =>{
        await signOut(auth)
    }
    return (
        <div>
            <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value) } />
            <input placeholder="password" onChange={(e) => setPassword(e.target.value) }/>
            <button onClick={signIN}>SIgn in</button>
            <button onClick={signWithGoogle}>SIgn in gg</button>
            <button onClick={logOut}>Log out</button>
            
        </div>
    )
}