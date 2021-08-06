import {
  createContext,
  Dispatch,
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import firebase from "firebase/app";
import { firebaseApp } from "../firebase";
import { SetStateAction } from "react";
import { dbConstants } from "../Constants";
import { Unsubscribe } from "@material-ui/icons";

firebaseApp();

export interface User {
  user: firebase.User;
  role: "SECRETARY" | "MEMBER" | "CMEMBER" | "SSTAFF" | "SECURITY";
}

const authContext = createContext(null);

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

function getRole(user: firebase.User) {
  return firebase
    .firestore()
    .collection(dbConstants?.usersCollection)
    .doc(user?.email)
    .get()
    .then((docData) => {
      if (docData.exists) {
        const userData = docData.data();
        return userData;
      }
    });
}

function useProvideAuth() {
  const [userObject, setUserObject] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      console.log(user, new Date());

      if (user) {
        console.log(getRole(user));

        firebase
          .firestore()
          .collection(dbConstants?.usersCollection)
          .doc(user?.email)
          .get()
          .then((docData) => {
            if (docData.exists) {
              const userData = docData.data();
              setUserObject({
                user,
                role: userData?.role,
              });
            }
          })
          .catch((err) => {
            console.warn("some error occured", err);
          });
      } else {
        setUserObject(null);
      }
    });
    return unsubscribe();
  }, []);

  return {
    userObj: userObject,
    userId: userObject?.user && userObject.user.uid,
    setUserObject,
  };
}
