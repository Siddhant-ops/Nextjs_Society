import { GetServerSideProps, GetServerSidePropsContext } from "next";
import firebase from "firebase/app";
import "firebase/auth";
import styles from "../../styles/Profile/Profile.module.scss";
import { Button, IconButton } from "@material-ui/core";
import { dbConstants } from "../../Utils/Firebase/Constants";
import nookies from "nookies";
import { tokenName, User } from "../../Utils/Firebase/Auth/auth";
import {
  AccountCircleOutlined,
  ArrowBack,
  ArrowForward,
  GroupOutlined,
  InfoOutlined,
  MarkEmailUnreadOutlined,
  PhoneOutlined,
} from "@material-ui/icons";
import Head from "next/head";
import { Fragment } from "react";
import { useState } from "react";
import Account from "../../Components/Profile/Account/Account";
import Contact from "../../Components/Profile/Contact/Contact";
import Society from "../../Components/Profile/Society/Society";
import Manage from "../../Components/Profile/Manage/Manage";
import Request from "../../Components/Profile/Request/Request";

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { params } = ctx;

  const emailId = params?.ProfileUsername as string;

  const cookies = nookies.get(ctx);

  if (tokenName in cookies) {
    const cookieToken = cookies[tokenName];
    const token: User = JSON.parse(cookieToken);
    if (emailId !== token?.user?.email) {
      return {
        notFound: true,
      };
    } else {
      const userDoc = firebase
        .firestore()
        .collection(dbConstants?.usersCollection)
        ?.doc(token?.user?.email);
      const userData = (await userDoc.get()).data();

      const socDoc = firebase
        .firestore()
        .collection(dbConstants?.societyCollection)
        .doc(userData?.societyDocId);

      const alluserData = socDoc
        .collection(dbConstants?.userSubCollection)
        .doc(token?.user?.displayName);

      const data = (await alluserData.get()).data();

      const accountInfo = {
        name: data?.userName,
        phoneNum: data?.userPhoneNum,
        email: data?.userEmail,
        accountCreated: data?.accountCreated,
        role: token?.role,
        flatNum: data?.societyFlatNum,
      };

      if (token?.role === "SECRETARY") {
        const societyData = (await socDoc.get()).data();

        return {
          props: {
            accountInfo,
            societyData,
          },
        };
      }

      return {
        props: {
          accountInfo,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: "/Login",
        permanent: false,
      },
    };
  }
};

const Profile = ({ accountInfo }) => {
  const [sideBar, setSideBar] = useState({
    open: true,
    value: 0,
  });

  return (
    <Fragment>
      <Head>
        <title>Society Manager - Profile - {"emailId"}</title>
      </Head>
      <div id="container" className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.topSection}>
            <h4 hidden={!sideBar?.open}>My profile</h4>
            <IconButton
              onClick={() => {
                setSideBar((prevSideBar) => {
                  const prevOpen = prevSideBar?.open;
                  const container = document.getElementById("container");
                  if (prevOpen) {
                    container.style.gridTemplateColumns = "1fr 12fr";
                  } else {
                    container.style.gridTemplateColumns = "1fr 5fr";
                  }
                  return { ...prevSideBar, open: !prevOpen };
                });
              }}
              className={styles.iconBtn}
            >
              {sideBar?.open ? <ArrowBack /> : <ArrowForward />}
            </IconButton>
          </div>
          <div className={styles.tabSection}>
            <Button
              onClick={() => {
                setSideBar((prevSideBar) => {
                  return { ...prevSideBar, value: 0 };
                });
              }}
              className={sideBar?.value === 0 && styles.activeBtn}
              color="inherit"
              size="large"
              startIcon={<AccountCircleOutlined />}
              fullWidth={sideBar?.open}
            >
              {sideBar?.open ? "Account" : ""}
            </Button>
            <Button
              onClick={() => {
                setSideBar((prevSideBar) => {
                  return { ...prevSideBar, value: 1 };
                });
              }}
              className={sideBar?.value === 1 && styles.activeBtn}
              color="inherit"
              size="large"
              startIcon={<InfoOutlined />}
              fullWidth={sideBar?.open}
            >
              {sideBar?.open ? "Society" : ""}
            </Button>
            <Button
              onClick={() => {
                setSideBar((prevSideBar) => {
                  return { ...prevSideBar, value: 2 };
                });
              }}
              className={sideBar?.value === 2 && styles.activeBtn}
              color="inherit"
              size="large"
              startIcon={<PhoneOutlined />}
              fullWidth={sideBar?.open}
            >
              {sideBar?.open ? "Contact" : ""}
            </Button>
            <Button
              onClick={() => {
                setSideBar((prevSideBar) => {
                  return { ...prevSideBar, value: 3 };
                });
              }}
              className={sideBar?.value === 3 && styles.activeBtn}
              color="inherit"
              size="large"
              startIcon={<GroupOutlined />}
              fullWidth={sideBar?.open}
            >
              {sideBar?.open ? "Manage" : ""}
            </Button>
            <Button
              onClick={() => {
                setSideBar((prevSideBar) => {
                  return { ...prevSideBar, value: 4 };
                });
              }}
              className={sideBar?.value === 4 && styles.activeBtn}
              color="inherit"
              size="large"
              startIcon={<MarkEmailUnreadOutlined />}
              fullWidth={sideBar?.open}
            >
              {sideBar?.open ? "Requests" : ""}
            </Button>
          </div>
        </div>
        <div className={styles.mainContainer}>
          {sideBar?.value === 0 && <Account accountInfo={accountInfo} />}
          {sideBar?.value === 1 && <Society />}
          {sideBar?.value === 2 && <Contact />}
          {sideBar?.value === 3 && <Manage />}
          {sideBar?.value === 4 && <Request />}
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
