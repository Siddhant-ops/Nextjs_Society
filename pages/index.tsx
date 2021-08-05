import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useAuth } from "../Utils/Firebase/Auth/auth";
import axios from "axios";
import Home_UserFalse from "../Components/HomeScreen/Home_UserFalse";
import Home_UserTrue from "../Components/HomeScreen/Home_UserTrue";

export default function Home({ quoteOftheDay }) {
  const auth = useAuth();

  if (!quoteOftheDay) {
    return <h1>Loading</h1>;
  }

  if (auth?.userObj && auth?.userId)
    return <Home_UserTrue quoteArray={quoteOftheDay} />;

  return Home_UserFalse();
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const quoteOftheDay = await axios
    .get("https://zenquotes.io/api/today")
    .then((res) => {
      return res.data;
    });

  if (!quoteOftheDay) {
    return {
      notFound: true,
    };
  }

  return {
    props: { quoteOftheDay },
  };
};
