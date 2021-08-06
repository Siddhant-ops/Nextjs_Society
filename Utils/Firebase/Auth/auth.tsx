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

firebaseApp();

export interface User {
  user: firebase.User;
  role: "SECRETARY" | "MEMBER" | "CMEMBER" | "SSTAFF" | "SECURITY";
}

interface contextInterface {
  userObj: User | null;
  userId: string | null;
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
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user, new Date());

      if (user) {
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
  }, []);

  return {
    userObj: userObject,
    userId: userObject.user && userObject.user.uid,
  };
}
