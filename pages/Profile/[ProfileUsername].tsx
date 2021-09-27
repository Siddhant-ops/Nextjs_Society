import { GetServerSideProps, GetServerSidePropsContext } from "next";
import firebase from "firebase/app";
import "firebase/auth";
import styles from "../../styles/Profile/index.module.scss";
import { Button, IconButton, Tooltip } from "@mui/material";
import { dbConstants, SocietyDoc } from "../../Utils/Firebase/Constants";
import { CookieUser, tokenName } from "../../Utils/Firebase/Auth/auth";
import {
  AccountCircleOutlined,
  ArrowBack,
  ArrowForward,
  GroupOutlined,
  InfoOutlined,
  MarkEmailUnreadOutlined,
  PhoneOutlined,
} from "@mui/icons-material";
import Head from "next/head";
import { Fragment } from "react";
import { useState } from "react";
import Account from "../../Components/Profile/Account/Account";
import Contact from "../../Components/Profile/Contact/Contact";
import Society from "../../Components/Profile/Society/Society";
import Manage from "../../Components/Profile/Manage/Manage";
import Request from "../../Components/Profile/Request/Request";
import { decrypt } from "../../Utils/Firebase/Auth/Helper";

interface ProfileProps {
  accountInfo: AccountInfo;
  societyData?: SocietyData;
  userCountData?: UserCountData;
}

const Profile = ({ accountInfo, societyData, userCountData }: ProfileProps) => {
  const [sideBar, setSideBar] = useState({
    open: true,
    value: 0,
  });

  return (
    <Fragment>
      <Head>
        <title>Society Manager - Profile - {accountInfo?.email}</title>
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
            <Tooltip title="Profile" placement="right-start">
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
            </Tooltip>
            <Tooltip title="Society Info" placement="right-start">
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
            </Tooltip>
            <Tooltip title="Contact" placement="right-start">
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
            </Tooltip>
            <Tooltip title="Manage Users" placement="right-start">
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
            </Tooltip>
            <Tooltip title="Manage Requests" placement="right-start">
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
            </Tooltip>
          </div>
        </div>
        <div className={styles.mainContainer}>
          {sideBar?.value === 0 && <Account accountInfo={accountInfo} />}
          {sideBar?.value === 1 && (
            <Society societyData={societyData} userCountData={userCountData} />
          )}
          {sideBar?.value === 2 && <Contact />}
          {sideBar?.value === 3 && <Manage />}
          {sideBar?.value === 4 && <Request />}
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;

export interface AccountInfo {
  name: string;
  phoneNum: string;
  email: string;
  accountCreated: string;
  role: string;
  flatNum: string;
}

export interface SocietyData {
  referralCode: string;
  societyAddress: string;
  societyId: string;
  societyName: string;
}

export interface UserCountData {
  SECRETARY: number;
  MEMBER: number;
  CMEMBER: number;
  SSTAFF: number;
  SECURITY: number;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  // get params
  const { params } = ctx;

  // get email from url
  const emailId = params?.ProfileUsername as string;

  // check if headers exists
  if (ctx.req.cookies) {
    const cookies = ctx.req.cookies;

    if (tokenName in cookies) {
      // get cookie
      const cookie = cookies[tokenName];
      const decryptedCookie = decrypt(cookie);
      // decrypted and parsed cookie
      const token: CookieUser = JSON.parse(decryptedCookie);

      // check if the url email matches the current signed in user email
      if (emailId === token.user.userEmail) {
        // soc doc
        const socDoc = firebase
          .firestore()
          .collection(dbConstants?.societyCollection)
          .doc(token.user.societyDocId);

        // entire user data from soc collection
        const alluserData = socDoc
          .collection(dbConstants?.userSubCollection)
          .doc(token?.user?.uid);

        // userData
        const userData = (await alluserData.get()).data();

        const accountInfo = {
          name: userData?.userName,
          phoneNum: userData?.userPhoneNum,
          email: userData?.userEmail,
          accountCreated: userData?.accountCreated?.seconds,
          role: token?.role,
          flatNum: userData?.societyFlatNum,
        };

        // check if role of user is secretary if true then fetch additional info
        if (token?.role === "SECRETARY") {
          // get society Data
          const _societyData = (await socDoc.get()).data() as SocietyDoc;

          const societyData = {
            referralCode: _societyData?.referralCode,
            societyAddress: _societyData?.societyAddress,
            societyId: _societyData?.societyId,
            societyName: _societyData?.societyName,
          };

          // initializing members count
          let userCountData = {
            SECRETARY: 0,
            MEMBER: 0,
            CMEMBER: 0,
            SSTAFF: 0,
            SECURITY: 0,
          };

          // get members count
          _societyData?.users.map((userObj) => {
            switch (userObj?.role) {
              case "SECRETARY":
                userCountData.SECRETARY += 1;
                break;
              case "MEMBER":
                userCountData.MEMBER += 1;
                break;
              case "CMEMBER":
                userCountData.CMEMBER += 1;
                break;
              case "SSTAFF":
                userCountData.SSTAFF += 1;
                break;
              case "SECURITY":
                userCountData.SECURITY += 1;
                break;

              default:
                break;
            }
          });

          // send user account info, society info, and members count
          return {
            props: {
              accountInfo,
              societyData,
              userCountData,
            },
          };
        }

        // if not secretary then only send account info
        return {
          props: {
            accountInfo,
          },
        };
      }
      return {
        notFound: true,
      };
    }
    return {
      redirect: {
        destination: "/Login",
        permanent: false,
      },
    };
  }
  return {
    redirect: {
      destination: "/Login",
      permanent: false,
    },
  };
};
