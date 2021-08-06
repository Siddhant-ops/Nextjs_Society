import { GetServerSidePropsContext } from "next";
import nookies from "nookies";

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

const removeCookie = () => {
  const cookies = nookies.get();
  for (const cookie in cookies) {
    if (Object.prototype.hasOwnProperty.call(cookies, cookie)) {
      if (cookie === tokenName) {
        console.log("hello");

        nookies.destroy(null, cookie);
      }
    }
  }
};

export {
  tokenName,
  setCookie,
  getCookieBrowser,
  getCookieServerSide,
  removeCookie,
  validateToken,
  parseJwt,
};
