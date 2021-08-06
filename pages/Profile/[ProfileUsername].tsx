import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import firebase from "firebase/app";
import { FC, Fragment } from "react";
import styles from "../../styles/Profile.module.scss";
import { Button } from "@material-ui/core";

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { params } = ctx;
  console.log(params);

  return {
    props: {},
  };
};

const Profile = () => {
  return <h1>Some error</h1>;
};

export default Profile;
