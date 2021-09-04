import { GetServerSidePropsContext } from "next";

export const isAuthenticated = (ctx: GetServerSidePropsContext) => {
  if (ctx.req.headers) {
    if (ctx.req.headers.cookie) {
      const cookie = ctx.req.headers.cookie;
      return Promise.resolve(cookie);
    }
    return Promise.resolve(null);
  }
  return Promise.resolve(null);
};
