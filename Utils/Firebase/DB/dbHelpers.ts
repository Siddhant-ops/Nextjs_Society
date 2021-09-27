import firebase from "firebase/app";
import "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { AlertStateType } from "../../../Components/Alert/PopAlert";
import { CookieUser } from "../Auth/auth";
import { dbConstants } from "../Constants";

async function getUserInfo(user: firebase.User) {
  const userDoc = await firebase
    .firestore()
    .collection(dbConstants?.usersCollection)
    .doc(user?.uid)
    .get();

  if (userDoc.exists) {
    const userData = userDoc.data();
    const socDocId = userData?.societyDocId;
    const socDocRef = await firebase
      .firestore()
      .collection(dbConstants?.societyCollection)
      .doc(socDocId);
    if ((await socDocRef.get()).exists) {
      const userSubDoc = socDocRef
        .collection(dbConstants?.userSubCollection)
        .doc(user?.uid);
      if ((await userSubDoc.get()).exists) {
        const userDocData = (await userSubDoc.get()).data();
        const returnUserObj = {
          uid: user?.uid,
          userName: user?.displayName,
          accountCreated: userDocData?.accountCreated,
          societyFlatNum: userDocData?.societyFlatNum,
          userEmail: user?.email,
          userPhoneNum: userDocData?.userPhoneNum,
          userRole: userDocData?.userRole,
          societyDocId: socDocId,
        };
        return returnUserObj;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
}

async function getSocietyDoc(user: firebase.User) {
  const docData = await firebase
    .firestore()
    .collection(dbConstants?.usersCollection)
    .doc(user?.uid)
    .get();
  if (docData.exists) {
    const userData = docData.data();
    const socId = userData?.societyDocId;

    const socDoc = firebase
      .firestore()
      .collection(dbConstants?.societyCollection)
      .doc(socId);
    return socDoc;
  }
}

interface UserInfo {
  name: string;
  phoneNum: string;
  email: string;
  flatNumber: string;
  password: string;
}

const saveProfileInfo = async (
  setAlert: Dispatch<SetStateAction<AlertStateType>>,
  userInfo: UserInfo
) => {
  const userData = userInfo;

  try {
    const currentUser = firebase.auth().currentUser;
    await currentUser.updateEmail(userData?.email).then(() => {
      currentUser
        .updateProfile({
          displayName: userInfo?.name,
        })
        .then(() => {
          currentUser.updatePassword(userData?.password).then(() => {
            const societyDocPromise = getSocietyDoc(currentUser);
            societyDocPromise.then((_societyDoc) => {
              _societyDoc
                .collection(dbConstants?.userSubCollection)
                .doc(currentUser?.uid)
                .update({
                  userName: userData?.name,
                  userPhoneNum: userData?.phoneNum,
                  userEmail: userData?.email,
                  societyFlatNum: userData?.flatNumber,
                })
                .then(() => {
                  const userDoc = firebase
                    .firestore()
                    .collection(dbConstants?.usersCollection)
                    .doc(currentUser?.uid);
                  userDoc
                    .update({
                      email: userData?.email,
                    })
                    .then(() => {
                      setAlert({
                        severity: "success",
                        visible: true,
                        message: "Credentials changed Successfully",
                      });
                    });
                });
            });
          });
        });
    });
  } catch (err) {
    if (err) {
      setAlert({
        severity: "error",
        visible: true,
        message: err?.message ?? "Error",
      });
    }
  }
};

export { getSocietyDoc, saveProfileInfo, getUserInfo };
