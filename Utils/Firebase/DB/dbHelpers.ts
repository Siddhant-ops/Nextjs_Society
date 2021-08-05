import firebase from "firebase/app";

const getUserInfo = async (user: firebase.User) => {
  const userUID = user?.uid;
  const db = firebase.firestore();
};
