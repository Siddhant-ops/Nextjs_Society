import { Dispatch, SetStateAction } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { dbConstants, roles } from "../Constants";
import { AlertStateType } from "../../../Components/Alert/PopAlert";
import { User } from "./auth";
import Router from "next/router";
import {
  v5 as uuidv5,
  validate as uuidValidate,
  version as uuidVersion,
} from "uuid";

// Secretary SignUp
interface SignUp_Secretary {
  name: string;
  phoneNum: string;
  email: string;
  password: string;
  societyFlatNum: string;
  societyName: string;
  societyId: string;
  societyAddress: string;
}

const signUp_Secretary = async (
  secretaryInfo: SignUp_Secretary,
  setSignUpState: Dispatch<SetStateAction<AlertStateType>>
) => {
  const userData = secretaryInfo;
  // Firstly authenticate User
  await firebase
    .auth()
    .createUserWithEmailAndPassword(userData?.email, userData?.password)
    .then((firebaseAuthResp) => {
      if (firebaseAuthResp) {
        //   Getting secretary user
        const secUser = firebaseAuthResp?.user;
        // Set secretary display name
        secUser
          .updateProfile({
            displayName: userData?.name,
          })
          .then(() => {
            // ////////////////
            // set society data
            const societyDocRef = firebase
              .firestore()
              .collection(dbConstants?.societyCollection)
              .doc(userData?.societyName);
            // creating a uuid
            const socUUID = uuidv5(
              userData?.societyName,
              process.env.NEXT_PUBLIC_NAMESPACE
            );
            societyDocRef
              .set({
                societyId: userData?.societyId,
                societyName: userData?.societyName,
                societyAddress: userData?.societyAddress,
                users: [{ id: secUser?.uid, role: roles?.secretary }],
                referralCode: socUUID,
              })
              .then(() => {
                // //////////////////////////////////////////////////////
                // Seeting first member of society in subcollection users
                const secretaryDocRef = societyDocRef
                  .collection(dbConstants?.userSubCollection)
                  .doc(userData?.name);
                // set secretary data
                secretaryDocRef
                  .set({
                    userName: userData?.name,
                    userEmail: userData?.email,
                    userRole: roles?.secretary,
                    userPhoneNum: userData?.phoneNum,
                    societyFlatNum: userData?.societyFlatNum,
                    accountCreated: firebase.firestore.Timestamp.now(),
                  })
                  .then(() => {
                    // ///////////////////////////////
                    // setting user in Colelction user
                    const usersDocRef = firebase
                      .firestore()
                      .collection(dbConstants?.usersCollection)
                      .doc(secUser?.email);
                    usersDocRef
                      .set({
                        userId: secUser?.uid,
                        role: roles?.secretary,
                        societyDocId: userData?.societyName,
                      })
                      .then(() => {
                        setSignUpState({
                          severity: "success",
                          message: "Successful SignUp",
                          visible: true,
                        });
                      })
                      .catch((err) => {
                        if (err) {
                          setSignUpState({
                            severity: "error",
                            message: err?.message,
                            visible: true,
                          });
                        }
                      });
                  })
                  .catch((err) => {
                    if (err) {
                      setSignUpState({
                        severity: "error",
                        message: err?.message,
                        visible: true,
                      });
                    }
                  });
              })
              .catch((err) => {
                if (err) {
                  setSignUpState({
                    severity: "error",
                    message: err?.message,
                    visible: true,
                  });
                }
              });
          })
          .catch((err) => {
            if (err) {
              setSignUpState({
                severity: "error",
                message: err?.message,
                visible: true,
              });
            }
          });
      }
    })
    .catch((err) => {
      if (err) {
        setSignUpState({
          severity: "error",
          message: err?.message,
          visible: true,
        });
      }
    });
};

// Member SignUp

interface SignUp_Member {
  name: string;
  phoneNum: string;
  email: string;
  password: string;
  societyFlatNum: string;
  role: string;
  referralCode: string;
}

const signUp_Member = async (
  memberInfo: SignUp_Member,
  setSignUpState: Dispatch<SetStateAction<AlertStateType>>,
  setFormSubmitted: Dispatch<SetStateAction<boolean>>
) => {
  const userData = memberInfo;

  try {
    // checking if the referralCode is true or not
    if (
      uuidValidate(userData?.referralCode) &&
      uuidVersion(userData?.referralCode) === 5
    ) {
      firebase
        .firestore()
        .collection(dbConstants.societyCollection)
        .onSnapshot((snaphsot) => {
          if (snaphsot) {
            // getting all docs within collection society
            const docs = snaphsot.docs;
            // checking for every doc
            docs.forEach((doc) => {
              // creating reference of doc
              const societyDocRef = firebase
                .firestore()
                .collection(dbConstants.societyCollection)
                .doc(doc.id);
              // getting data from doc
              societyDocRef.get().then((docResp) => {
                const docData = docResp.data();
                // matching referralcode
                if (
                  docData &&
                  docData[dbConstants?.referralCode] === userData?.referralCode
                ) {
                  // getting user signed up
                  firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                      userData?.email,
                      userData?.password
                    )
                    .then((firebaseAuthResponse) => {
                      if (firebaseAuthResponse) {
                        const memberUser = firebaseAuthResponse?.user;
                        // updating user displayName
                        memberUser
                          .updateProfile({ displayName: userData?.name })
                          .then(() => {
                            // further database logic of saving
                            const awaitMemberDocRef = societyDocRef
                              .collection(
                                dbConstants?.awaitingUsersSubCollection
                              )
                              .doc(memberUser?.email);
                            awaitMemberDocRef
                              .set({
                                name: memberInfo?.name,
                                phoneNum: memberInfo?.phoneNum,
                                email: memberInfo?.email,
                                societyFlatNum: memberInfo?.societyFlatNum,
                                role: memberInfo?.role,
                              })
                              .then(() => {
                                setFormSubmitted(true);
                                setSignUpState({
                                  message: "Sign Up successful",
                                  severity: "success",
                                  visible: true,
                                });
                              });
                          });
                      }
                    });
                } else {
                  setSignUpState({
                    severity: "error",
                    message: "Invalid referralCode",
                    visible: true,
                  });
                }
              });
            });
          }
        });
    } else {
      setSignUpState({
        severity: "error",
        message: "Invalid referralCode",
        visible: true,
      });
    }
  } catch (err) {
    if (err) {
      setSignUpState({
        severity: "error",
        message: err?.message,
        visible: true,
      });
    }
  }
};

interface LoginInfo {
  email: string;
  password: string;
}

const login = async (
  memberInfo: LoginInfo,
  setSignUpState: Dispatch<SetStateAction<AlertStateType>>
) => {
  const userData = memberInfo;
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(userData?.email, userData?.password)
      .then((firebaseAuthResp) => {
        if (firebaseAuthResp && firebaseAuthResp?.user) {
          const firebaseUser = firebaseAuthResp?.user;
          console.log(firebaseUser);

          firebase
            .firestore()
            .collection(dbConstants?.usersCollection)
            .doc(userData?.email)
            .get()
            .then((firestoreResp) => {
              if (firestoreResp.exists) {
                console.log("hello");
              }
            });
          // .onSnapshot((snapshot) => {
          //   console.log(snapshot);

          //   if (snapshot.exists) {
          //     setSignUpState({
          //       severity: "success",
          //       message: "login sucessful",
          //       visible: true,
          //     });
          //   } else {
          //     setSignUpState({
          //       severity: "info",
          //       message: "It looks like you aren't added to the group yet",
          //       visible: true,
          //     });
          //   }
          // });
        } else {
          setSignUpState({
            severity: "error",
            message: "Invalid Credentials",
            visible: true,
          });
        }
      });
  } catch (err) {
    if (err) {
      setSignUpState({
        severity: "error",
        message: err?.message,
        visible: true,
      });
    }
  }
};

export { signUp_Secretary, signUp_Member, login };
