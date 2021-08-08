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

interface Context {
  userObj: User | null;
  userId: string | null;
}

const authContext = createContext<Context>({
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

async function getRole(user: firebase.User) {
  const docData = await firebase
    .firestore()
    .collection(dbConstants?.usersCollection)
    .doc(user?.email)
    .get();
  if (docData.exists) {
    const userData = docData.data();
    return userData?.role;
  }
}
function useProvideAuth() {
  const [userObject, setUserObject] = useState<User | null>(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await getRole(user).then((resp) => {
          setUserObject({
            user,
            role: resp,
          });
        });
      } else {
        setUserObject(null);
      }
    });
    // return unsubscribe();
  }, []);

  return {
    userObj: userObject,
    userId: (userObject && userObject?.user?.uid) ?? null,
  };
}
