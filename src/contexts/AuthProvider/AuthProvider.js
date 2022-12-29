import React, { createContext, useEffect, useState } from 'react';
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth';
import app from '../../firebase/firebase.config'
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Pages/Shared/Loading/Loading';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect( () =>{
     const unsubscribe =  onAuthStateChanged(auth, currentUser =>{
        console.log(currentUser);
        setUser(currentUser);
        setLoading(false);
      });
       
      return () =>{
        return unsubscribe();
      }
    } , [])

    const { data: userData = [], isLoading, refetch } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/user?email=${user?.email}`)
            const data = await res.json()
            return data
        }
    })

    if (isLoading) {
        return <Loading></Loading>;
    }



    const authInfo ={
        user,
        loading,
        createUser,
        updateUser,
        loginUser,
        userData,
        refetch,
        logOut

    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;