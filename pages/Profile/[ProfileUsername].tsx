import axios, { AxiosError, AxiosResponse } from "axios";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { FC, Fragment } from "react";
import nookies from "nookies";
import styles from "../../styles/Profile.module.scss";
import {
  getCookieBrowser,
  getCookieServerSide,
  parseJwt,
  tokenName,
} from "../../Utils/Helpers/auth";
import { Button } from "@material-ui/core";

interface User {
  username?: string;
  email?: string;
  posts?: [];
  createdAt?: string;
}

interface ApiResponse {
  user?: User;
  message?: string;
  errors?: string;
}
interface Props {
  apiResponse: ApiResponse;
  isUser: boolean;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  ctx: GetServerSidePropsContext
) => {
  const tokenCookie: string | null = getCookieServerSide(ctx);

  var isUser = false;
  const profileUsername: string = ctx.params?.ProfileUsername as string;
  var apiResponse: ApiResponse = {
    errors: "Error occured",
  };
  await axios
    .get(`http://localhost:5000/api/user/${profileUsername}`)
    .then((res: AxiosResponse) => {
      if (res.status === 200) {
        if (res.data?.user) {
          const user: User = res.data?.user;
          apiResponse = {
            user,
          };
          if (tokenCookie && user.email === parseJwt(tokenCookie).email) {
            isUser = true;
          }
        }
        if (res.data?.message) {
          const message: string = res.data?.message;
          apiResponse = {
            message,
          };
        }
        if (res.data?.errors) {
          const errors = res.data?.errors;
          apiResponse = {
            errors: errors[0]?.msg,
          };
        }
      }
    })
    .catch((err: AxiosError) => {
      if (err) {
        apiResponse = {
          errors: err.message,
        };
      }
    });
  return {
    props: { apiResponse, isUser },
  };
};

const ProfileSelf: FC<User> = (user?: User) => {
  return (
    <Fragment>
      <div className={styles.profileSelfContainer}>
        <div className={styles.profileSelfContainer__col1}>
          <h1>Hey there, {user?.username}</h1>
        </div>
        <div className={styles.profileSelfContainer__col2}>
          <Button onClick={() => {}}>Logout</Button>
        </div>
      </div>
    </Fragment>
  );
};

const Profile: NextPage<Props> = ({ apiResponse, isUser }) => {
  if (apiResponse?.user) {
    const apiUser: User = apiResponse?.user;
    if (isUser) {
      return ProfileSelf(apiResponse?.user);
    }
    return (
      <Fragment>
        <h1>{apiUser.username}</h1>
      </Fragment>
    );
  }

  if (apiResponse?.message) {
    return (
      <Fragment>
        <h1>{apiResponse?.message}</h1>
      </Fragment>
    );
  }

  return <h1>Some error</h1>;
};

export default Profile;
