import { Dispatch, SetStateAction } from "react";
import firebase from "firebase/app";
import "firebase/auth";

// user signin
const _signIn = async (
  email: string,
  password: string,
  setUser?: Dispatch<SetStateAction<firebase.User | null>>
) => {
  var response: firebase.User | null = null;
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((authResp) => {
      if (authResp) {
        response = authResp.user;
        setUser(response);
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
  return response;
};

// user signup
const _signUp = async (
  email: string,
  password: string,
  setUser?: Dispatch<SetStateAction<firebase.User | null>>
) => {
  var response: firebase.User | null = null;
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((authResp) => {
      if (authResp) {
        response = authResp.user;
        setUser(response);
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
  return response;
};

// user signOut
const _signOut = async (
  setUser?: Dispatch<SetStateAction<firebase.User | null>>
) => {
  await firebase.auth().signOut();
  setUser(null);
};

export { _signIn, _signUp, _signOut };
