import { useState } from "react";
import Image from "next/image";
import {
  Button,
  TextField,
  SelectChangeEvent,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styles from "../../styles/SignUp/Member.module.scss";
import PopAlert, { AlertStateType } from "../../Components/Alert/PopAlert";
import { roles } from "../../Utils/Firebase/Constants";
import Head from "next/head";
import { signUp_Member } from "../../Utils/Firebase/Auth/authHelpers";
import { tokenName, User } from "../../Utils/Firebase/Auth/auth";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import nookies from "nookies";

const Member = () => {
  // SignUp Details
  const [userSignUpInfo, setUserSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
    phoneNum: "",
    societyFlatNum: "",
    referralCode: "",
    role: "",
  });

  const [signUpState, setSignUpState] = useState<AlertStateType>({
    visible: false,
    severity: "info",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const submitForm = () => {
    signUp_Member(userSignUpInfo, setSignUpState, setFormSubmitted);
  };

  // Disable Login Btn untill all fields are filled
  function disableSignUpBtn(): boolean {
    const {
      name,
      email,
      password,
      referralCode,
      phoneNum,
      societyFlatNum,
      role,
    } = userSignUpInfo;
    if (
      (name &&
        email &&
        password &&
        referralCode &&
        phoneNum &&
        societyFlatNum &&
        role) === ""
    )
      return true;
    else return false;
  }

  // Clear form after submission
  function clearForm() {
    setUserSignUpInfo({
      name: "",
      email: "",
      password: "",
      phoneNum: "",
      societyFlatNum: "",
      referralCode: "",
      role: "",
    });
  }

  // Modal show awaiting invitation confirmation

  return (
    <div className={styles.mainContainer}>
      <Head>
        <title>Society Manager - SignUp - Member</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <Image
            src="/static/Images/signUpImg.svg"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.formContainer}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h1>sign up</h1>
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
              label="Name"
              type="text"
            />
            <TextField
              onChange={(e) => {
                setUserSignUpInfo((prevUserLoginInfo) => {
                  return { ...prevUserLoginInfo, email: e.target.value };
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
                    referralCode: e.target.value,
                  };
                });
              }}
              value={userSignUpInfo?.referralCode}
              required
              fullWidth
              variant="outlined"
              label="Referral Code"
              type="text"
            />
            <FormControl variant="outlined" sx={{ m: 0, minWidth: 120 }}>
              <InputLabel id="simple-select-standard-label">Role</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select"
                value={userSignUpInfo?.role}
                label="Role"
                onChange={(e: SelectChangeEvent) => {
                  setUserSignUpInfo((prevUserLoginInfo) => {
                    return {
                      ...prevUserLoginInfo,
                      role: e.target.value,
                    };
                  });
                }}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={roles?.secretary}>Secretary</MenuItem>
                <MenuItem value={roles?.cMember}>Committee Member</MenuItem>
                <MenuItem value={roles?.member}>Member</MenuItem>
                <MenuItem value={roles?.sStaff}>Society Staff</MenuItem>
                <MenuItem value={roles?.security}>Watchman</MenuItem>
              </Select>
            </FormControl>
            <Button
              className={styles.brandBtn}
              type="submit"
              variant="outlined"
              disabled={disableSignUpBtn()}
              endIcon={<SendIcon />}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
      {PopAlert(signUpState, setSignUpState)}
    </div>
  );
};

export default Member;

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
