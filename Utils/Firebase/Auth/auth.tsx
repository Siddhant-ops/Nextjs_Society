import { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import { firebaseApp } from "../firebase";
import { dbConstants } from "../Constants";
import nookies from "nookies";

firebaseApp();

export const tokenName = "next_society_vector";

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
    return firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        setUserObject(null);
        nookies.destroy(null, tokenName, { path: "/" });
      } else {
        await getRole(user).then((resp) => {
          setUserObject({
            user,
            role: resp,
          });
          nookies.set(null, tokenName, JSON.stringify({ user, role: resp }), {
            path: "/",
          });
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
