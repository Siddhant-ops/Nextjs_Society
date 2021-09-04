import { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import { firebaseApp } from "../firebase";
import { dbConstants } from "../Constants";
import nookies from "nookies";
import { getUserInfo } from "../DB/dbHelpers";

firebaseApp();

export const tokenName = "next_society_vector";

export interface User {
  user: firebase.User;
  role: "SECRETARY" | "MEMBER" | "CMEMBER" | "SSTAFF" | "SECURITY";
}
export interface CookieUser {
  user: {
    uid: string;
    userName: string;
    userEmail: string;
    societyDocId: string;
  };
  role: "SECRETARY" | "MEMBER" | "CMEMBER" | "SSTAFF" | "SECURITY";
}

interface Context {
  userObj: User | null;
}

const authContext = createContext<Context>({
  userObj: null,
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
    return firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        setUserObject(null);
        nookies.destroy(null, tokenName, { path: "/" });
      } else {
        await getUserInfo(user).then((resp) => {
          // setting value for context
          setUserObject({ user, role: resp?.userRole });
        });
      }
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebase.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return {
    userObj: userObject,
    userId: (userObject && userObject?.user?.uid) ?? null,
  };
}
