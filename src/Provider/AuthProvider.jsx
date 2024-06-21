import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import auth from '../firebase/firebase.config'
import UseAxiosPublic from "../UseHook/UseAxiosPublic/UseAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = UseAxiosPublic()

    const createUser = (email, password) => {
        console.log(email, password)
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true);    
        return signInWithPopup(auth, googleProvider);            
    };
    
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updatedProfile = (name, photo) =>{
        return updateProfile(auth.currentUser, {displayName:name, photoURL: photo});
    }





    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("Current user Found", currentUser)

            if(currentUser){
                //get token and store client
                const userInfo = {email: currentUser.email}
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                    }
                })
            }else{
                //TODO: remove token (if token store in client site, local storage, caching, in memory)
                localStorage.removeItem('access-token')
            }




            setLoading(false)
        })

        return () => {
            unSubscribe();
        }
    }, [])





    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updatedProfile,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;