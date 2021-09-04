import { CookieUser, tokenName } from "./auth";
import nookies from "nookies";
import { getUserInfo } from "../DB/dbHelpers";
import firebase from "firebase";
import "firebase/app";
import { GetServerSidePropsContext } from "next";

const encrypt = (text: string) => {
  const salt = process.env.NEXT_PUBLIC_NAMESPACE;
  const textToChars = (text: string) =>
    text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};

const decrypt = (encoded: string) => {
  const salt = process.env.NEXT_PUBLIC_NAMESPACE;
  const textToChars = (text: string) =>
    text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
};

const set__Cookie = async (firebaseUser: firebase.User) => {
  await getUserInfo(firebaseUser).then((resp) => {
    // setting value for cookie
    const userObjValue: CookieUser = {
      user: {
        societyDocId: resp?.societyDocId,
        uid: resp?.uid,
        userEmail: resp?.userEmail,
        userName: resp?.userName,
      },
      role: resp?.userRole,
    };
    const encryptedToken = encrypt(JSON.stringify(userObjValue));
    nookies.set(null, tokenName, encryptedToken, {
      path: "/",
      // cookie set for 6 months
      maxAge: 6 * 31 * 24 * 60 * 60,
    });
  });
};

const get__Cookie = async (ctx: GetServerSidePropsContext) => {
  if (ctx.req.cookies) {
    const cookies = ctx.req.cookies;
    if (tokenName in cookies) {
      const cookie = cookies[tokenName];
      const decryptedToken = decrypt(cookie);
      const token: CookieUser = JSON.parse(decryptedToken);
      return token;
    }
    return null;
  }
  return null;
};

export { encrypt, decrypt, set__Cookie, get__Cookie };
