import { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import { firebaseApp } from "../firebase";

firebaseApp();

const authContext = createContext(null);

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    setUser(response.user);
    return response.user;
  };

  const signUp = async (email, password) => {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    setUser(response.user);
    return response.user;
  };

  const signOut = async () => {
    await firebase.auth().signOut();
    setUser(false);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    userId: user && user.uid,
    signIn,
    signUp,
    signOut,
  };
}
