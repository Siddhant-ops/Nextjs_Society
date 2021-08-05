import { Fragment } from "react";
import { useAuth } from "../Utils/Firebase/Auth/auth";
import firebase from "firebase/app";
import "firebase/firestore";
import { dbConstants } from "../Utils/Firebase/Constants";
import { v5 } from "uuid";

export default function Contact() {
  const auth = useAuth();

  return (
    <Fragment>
      <h1>Hello Contact</h1>
      <h1>{auth?.userObj?.user?.email}</h1>
      {/* <button
        onClick={() => {
          auth?.signUp("siddhantdalvi3@gmail.com", "something123");
        }}
      >
        SignUp
      </button> */}
      {/* <button
        onClick={() => {
          _signIn("siddhantdalvi3@gmail.com", "something123", auth?.setUser);
        }}
      >
        Signin
      </button>
      <button
        onClick={() => {
          _signOut();
        }}
      >
        Signout
      </button> */}
    </Fragment>
  );
}
