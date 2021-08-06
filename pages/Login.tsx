import { Fragment, useState } from "react";
import Image from "next/image";
import { Button, TextField } from "@material-ui/core";
import styles from "../styles/Login.module.scss";
import PopAlert, { AlertStateType } from "../Components/Alert/PopAlert";
import Head from "next/head";

const Login = () => {
  // loginDetails
  const [userLoginInfo, setUserLoginInfo] = useState({
    email: "",
    password: "",
  });

  // Alert Config
  const [loginState, setLoginState] = useState<AlertStateType>({
    visible: false,
    severity: "info",
    message: "",
  });

  // Disable Login Btn untill all fields are filled
  function disableLoginBtn(): boolean {
    const { email, password } = userLoginInfo;
    if ((email && password) === "") return true;
    else return false;
  }

  // Clear form after submission
  function clearForm() {
    setUserLoginInfo({ email: "", password: "" });
  }

  return (
    <Fragment>
      <Head>
        <title>Society Manager - Login</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <Image
            src="/static/Images/LoginImg.png"
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
            <h1>login</h1>
            <TextField
              className={styles.formInput}
              onChange={(e) => {
                setUserLoginInfo((prevUserLoginInfo) => {
                  return { ...prevUserLoginInfo, email: e.target.value };
                });
              }}
              value={userLoginInfo?.email}
              required
              fullWidth
              variant="outlined"
              label="Email"
              type="email"
            />
            <TextField
              className={styles.formInput}
              onChange={(e) => {
                setUserLoginInfo((prevUserLoginInfo) => {
                  return { ...prevUserLoginInfo, password: e.target.value };
                });
              }}
              value={userLoginInfo?.password}
              required
              fullWidth
              variant="outlined"
              label="Password"
              type="password"
            />
            <h5>
              Have you forgotten your <span>password?</span>
            </h5>
            <Button
              className={styles.brandBtn}
              type="submit"
              variant="outlined"
              disabled={disableLoginBtn()}
            >
              Log in
            </Button>
          </form>
        </div>
      </div>
      {PopAlert(loginState, setLoginState)}
    </Fragment>
  );
};

export default Login;
