import { Fragment, useState } from "react";
import Image from "next/image";
import { Button, TextField, TextareaAutosize } from "@material-ui/core";
import styles from "../../styles/SignUp/Secretary.module.scss";
import PopAlert, { AlertStateType } from "../../Components/Alert/PopAlert";
import { tokenName, useAuth, User } from "../../Utils/Firebase/Auth/auth";
import { signUp_Secretary } from "../../Utils/Firebase/Auth/authHelpers";
import Head from "next/head";
import SendIcon from "@material-ui/icons/Send";
import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import nookies from "nookies";

const Secretary = () => {
  // SignUp details
  const [userSignUpInfo, setUserSignUpInfo] = useState({
    name: "",
    phoneNum: "",
    email: "",
    password: "",
    societyFlatNum: "",
    societyName: "",
    societyId: "",
    societyAddress: "",
  });

  const [signUpState, setSignUpState] = useState<AlertStateType>({
    visible: false,
    severity: "info",
    message: "",
  });

  // Disable SignUp Btn untill all fields are filled
  function disableSignUpBtn(): boolean {
    if (
      (userSignUpInfo.name &&
        userSignUpInfo.email &&
        userSignUpInfo.password &&
        userSignUpInfo.phoneNum &&
        userSignUpInfo.societyFlatNum &&
        userSignUpInfo.societyId &&
        userSignUpInfo.societyName &&
        userSignUpInfo.societyAddress) === ""
    )
      return true;
    else return false;
  }

  // Clear form after submission
  function clearForm() {
    setUserSignUpInfo({
      // Personal Details
      name: "",
      email: "",
      password: "",
      phoneNum: "",
      // Society Details
      societyFlatNum: "",
      societyName: "",
      societyId: "",
      societyAddress: "",
    });
  }

  return (
    <Fragment>
      <Head>
        <title>Society Manager - SignUp - Secretary</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <Image
            src="/static/Images/MemberSignUpImage.png"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={styles.formContainer}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signUp_Secretary(userSignUpInfo, setSignUpState);
            }}
          >
            <h1>Sign Up</h1>
            <TextField
              onChange={(e) => {
                setUserSignUpInfo((prevUserLoginInfo) => {
                  return { ...prevUserLoginInfo, name: e.target.value };
                });
              }}
              value={userSignUpInfo?.name}
              required
              fullWidth
              variant="outlined"
              label="name"
              type="text"
            />
            <TextField
              onChange={(e) => {
                setUserSignUpInfo((prevUserLoginInfo) => {
                  return { ...prevUserLoginInfo, phoneNum: e.target.value };
                });
              }}
              value={userSignUpInfo?.phoneNum}
              required
              fullWidth
              variant="outlined"
              label="Phone Number"
              type="tel"
            />
            <TextField
              onChange={(e) => {
                setUserSignUpInfo((prevUserLoginInfo) => {
                  return {
                    ...prevUserLoginInfo,
                    email: e.target.value.toLowerCase(),
                  };
                });
              }}
              value={userSignUpInfo?.email}
              required
              fullWidth
              variant="outlined"
              label="Email"
              type="email"
            />
            <TextField
              onChange={(e) => {
                setUserSignUpInfo((prevUserLoginInfo) => {
                  return { ...prevUserLoginInfo, password: e.target.value };
                });
              }}
              value={userSignUpInfo?.password}
              required
              fullWidth
              variant="outlined"
              label="Password"
              type="password"
            />
            <TextField
              onChange={(e) => {
                setUserSignUpInfo((prevUserLoginInfo) => {
                  return {
                    ...prevUserLoginInfo,
                    societyFlatNum: e.target.value,
                  };
                });
              }}
              value={userSignUpInfo?.societyFlatNum}
              required
              fullWidth
              variant="outlined"
              label="Society Flat Number"
              type="text"
            />
            <TextField
              onChange={(e) => {
                setUserSignUpInfo((prevUserLoginInfo) => {
                  return {
                    ...prevUserLoginInfo,
                    societyName: e.target.value,
                  };
                });
              }}
              value={userSignUpInfo?.societyName}
              required
              fullWidth
              variant="outlined"
              label="Society Name"
              type="text"
            />
            <TextField
              onChange={(e) => {
                setUserSignUpInfo((prevUserLoginInfo) => {
                  return {
                    ...prevUserLoginInfo,
                    societyId: e.target.value,
                  };
                });
              }}
              value={userSignUpInfo?.societyId}
              required
              fullWidth
              variant="outlined"
              label="Society Registration Id"
              type="text"
            />
            <TextareaAutosize
              onChange={(e) => {
                setUserSignUpInfo((prevUserLoginInfo) => {
                  return {
                    ...prevUserLoginInfo,
                    societyAddress: e.target.value,
                  };
                });
              }}
              value={userSignUpInfo?.societyAddress}
              required
              placeholder="Society Address *"
              minRows={4}
              maxRows={10}
              className={styles.form__textArea}
            />
            <Button
              endIcon={<SendIcon />}
              className={styles.brandBtn}
              disabled={disableSignUpBtn()}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
      {PopAlert(signUpState, setSignUpState)}
    </Fragment>
  );
};

export default Secretary;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const cookies = nookies.get(ctx);
  if (tokenName in cookies) {
    const cookieToken = cookies[tokenName];
    const token: User = JSON.parse(cookieToken);
    if (token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }
  return {
    props: {},
  };
};
