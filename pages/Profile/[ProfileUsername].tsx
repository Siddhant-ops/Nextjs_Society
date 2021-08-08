import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import firebase from "firebase/app";
import "firebase/auth";
import { FC, Fragment } from "react";
import styles from "../../styles/Profile.module.scss";
import { Button } from "@material-ui/core";
import { dbConstants } from "../../Utils/Firebase/Constants";

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { params } = ctx;

  const emailId = params?.ProfileUsername as string;

  return {
    props: { emailId },
  };
};

const Profile = ({ emailId }) => {
  return (
    <Button
      onClick={() => {
        firebase.auth().signOut();
      }}
    >
      SignOut
    </Button>
  );
};

export default Profile;
