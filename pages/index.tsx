import { useAuth } from "../Utils/Firebase/Auth/auth";
import Home_UserFalse from "../Components/HomeScreen/Home_UserFalse";
import Home_UserTrue from "../Components/HomeScreen/Home_UserTrue";
import firebase from "firebase/app";
import "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const auth = useAuth();

  firebase.auth().signOut();

  if (auth?.userObj && auth?.userId) return <Home_UserTrue />;

  return <Home_UserFalse />;
}
