import { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseApp } from "../firebase";
import { _signIn, _signOut, _signUp } from "./authHelpers";

firebaseApp();

interface contextInterface {
  user: firebase.User | null;
  userId: string | null;
  signIn: (email: string, password: string) => Promise<firebase.User>;
  signUp: (email: string, password: string) => Promise<firebase.User>;
  signOut: () => void;
}

const authContext = createContext<contextInterface>({
  user: null,
  userId: null,
  signIn: _signIn,
  signUp: _signUp,
  signOut: _signOut,
});

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState<firebase.User | null>(null);

  const signIn = (email: string, password: string) => {
    return _signIn(email, password, setUser);
  };

  const signUp = (email: string, password: string) => {
    return _signUp(email, password, setUser);
  };

  const signOut = () => {
    _signOut(setUser);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
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
