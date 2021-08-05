import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import firebase from "firebase/app";
import { FC, Fragment } from "react";
import styles from "../../styles/Profile.module.scss";
import { Button } from "@material-ui/core";

// export const getServerSideProps: GetServerSideProps = async (
//   ctx: GetServerSidePropsContext
// ) => {
//   await
//   return {
//     props: {},
//   };
// };

const ProfileSelf: FC<firebase.User> = (user?: firebase.User) => {
  return (
    <Fragment>
      <div className={styles.profileSelfContainer}>
        <div className={styles.profileSelfContainer__col1}>
          <h1>Hey there, {user?.email}</h1>
        </div>
        <div className={styles.profileSelfContainer__col2}>
          <Button onClick={() => {}}>Logout</Button>
        </div>
      </div>
    </Fragment>
  );
};

const Profile: NextPage = () => {
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
