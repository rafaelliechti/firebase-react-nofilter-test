import React, {useContext, useEffect, useState} from 'react';
import {auth, storage} from './db';
import firebase from 'firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return firebase.firestore().collection('users').doc(cred.user.uid).set({
            email,
            role: 'guest'
        })
    });
}

function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

function googleLogin(email, password) {
    return auth.Goog(email, password);
}

function logout() {
    return auth.signOut();
}

function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
}

function updateEmail(email) {
    return auth.currentUser.updateEmail(email);
}

function updatePassword(password) {
    return auth.currentUser.updatePassword(password);
}

function uploadFile(file) {
    return storage.ref().child(file.name).put(file);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false)
        });
    }, []);

    const value = {
        currentUser,
        signUp,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        uploadFile
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
