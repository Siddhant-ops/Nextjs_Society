import Router from "next/router";
import { Dispatch, SetStateAction } from "react";
import nookies from "nookies";
import axios, { AxiosError, AxiosResponse } from "axios";
import { actionTypes } from "../AuthContext/reducer";
import { Color } from "@material-ui/lab/Alert";
import { GetServerSidePropsContext } from "next";

// Interface userLgoinInfo
interface userInfoType {
  username: string;
  email: string;
  password: string;
}

// Interface Alert message
interface loginStateType {
  visible: boolean;
  severity: Color;
  message: string;
}

// Token Name
const tokenName = "next_blog_token";

// Parse JWT and get user Obj
function parseJwt(token: string): {
  username: string;
  email: string;
  iat: number;
  exp: number;
} {
  var base64Payload = token.split(".")[1];
  var payload = Buffer.from(base64Payload, "base64");
  return JSON.parse(payload.toString());
}
// check if token is valid
function validateToken(token: string): boolean {
  if (token) {
    var tokenExp = new Date(0);
    tokenExp.setUTCSeconds(parseJwt(token).exp);
    if (Date.now() <= +tokenExp) return true;
    else return false;
  } else return false;
}

// Set cookie
const setCookie = (value: string) => {
  if (process.browser) {
    nookies.set(null, tokenName, value, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
  }
};

// get cookie from Browser
const getCookieBrowser = () => {
  const cookies = nookies.get();
  var tokenCookie: string | null = null;
  for (const cookie in cookies) {
    if (Object.prototype.hasOwnProperty.call(cookies, cookie)) {
      const element = cookies[cookie];
      if (cookie === tokenName) {
        tokenCookie = element;
      }
    }
  }
  return tokenCookie;
};

const getCookieServerSide = (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  var tokenCookie: string | null = null;
  for (const cookie in cookies) {
    if (Object.prototype.hasOwnProperty.call(cookies, cookie)) {
      const element = cookies[cookie];
      if (cookie === tokenName) {
        tokenCookie = element;
      }
    }
  }
  return tokenCookie;
};

// Login func
const login = async (
  userInfo: userInfoType,
  setLoginState: Dispatch<SetStateAction<loginStateType>>,
  dispatch?: any
) => {
  const data = userInfo;
  await axios
    .post("http://localhost:5000/api/auth/login", data)
    .then((res: AxiosResponse) => {
      // if req is 200
      if (res.status === 200) {
        // if token is returned
        if (res.data?.token) {
          const token: string = res.data?.token;
          setLoginState({
            visible: true,
            severity: "success",
            message: "User login successfull",
          });
          setCookie(token);
          dispatch({
            type: actionTypes.SET_USER,
            user: token,
          });
          const user = parseJwt(token);
          setTimeout(() => {
            Router.push(`/Profile/${user?.username}`);
          }, 3000);
        }
        // If any message
        if (res.data?.message) {
          const message = res.data?.message;
          setLoginState({
            visible: true,
            severity: "info",
            message: message,
          });
        }
        // If any errors
        if (res.data?.errors) {
          const errors = res.data?.errors;
          setLoginState({
            visible: true,
            severity: "error",
            message: errors[0]?.msg,
          });
        }
      } else {
        // Errors in status code except 200
        if (res.data?.errors) {
          const errors = res.data?.errors;
          setLoginState({
            visible: true,
            severity: "error",
            message: errors[0]?.msg,
          });
        } else {
          // If no known Error then default to some error
          setLoginState({
            visible: true,
            severity: "error",
            message: "Error occured",
          });
        }
      }
    })
    // Catch Axios Error
    .catch((err: AxiosError) => {
      if (err) {
        setLoginState({
          visible: true,
          severity: "error",
          message: err.message,
        });
      }
    });
};

const logOut = () => {};

export type { userInfoType, loginStateType };
export {
  login,
  tokenName,
  parseJwt,
  validateToken,
  getCookieBrowser,
  getCookieServerSide,
};
