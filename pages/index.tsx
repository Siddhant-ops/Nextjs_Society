import { CookieUser, tokenName, useAuth } from "../Utils/Firebase/Auth/auth";
import Home_UserFalse from "../Components/HomeScreen/Home_UserFalse/Home_UserFalse";
import Home_UserTrue from "../Components/HomeScreen/Home_UserTrue";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { get__Cookie } from "../Utils/Firebase/Auth/Helper";

export default function Home({ user }: { user: CookieUser }) {
  const auth = useAuth();
  if (user?.user?.uid || auth.userObj?.user)
    return <Home_UserTrue user={user} />;
  return <Home_UserFalse />;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  return await get__Cookie(ctx).then((resp) => {
    return {
      props: {
        user: resp,
      },
    };
  });
};
