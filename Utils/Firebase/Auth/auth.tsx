import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
import firebase from "firebase/app";
import { firebaseApp } from "../firebase";
import { SetStateAction } from "react";
import { dbConstants } from "../Constants";

firebaseApp();

export interface User {
  user: firebase.User;
  role: "SECRETARY" | "MEMBER" | "CMEMBER" | "SSTAFF" | "SECURITY";
}

interface contextInterface {
  userObj: User | null;
  userId: string | null;
  setUser?: Dispatch<SetStateAction<User | null>>;
}

const authContext = createContext<contextInterface>({
  userObj: null,
  userId: null,
});

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [userObject, setUserObject] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserObject({ user, role: "SECRETARY" });
      } else {
        setUserObject(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return {
    userObj: userObject,
    userId: userObject && userObject.user.uid,
    setUserObject,
  };
}
