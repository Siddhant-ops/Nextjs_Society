import { Fragment, useState } from "react";
import Image from "next/image";
import { Backdrop, Button, Fade, Modal, TextField } from "@material-ui/core";
import styles from "../styles/Login.module.scss";
import PopAlert, { AlertStateType } from "../Components/Alert/PopAlert";
import Head from "next/head";
import { login, resetPassword } from "../Utils/Firebase/Auth/authHelpers";
import { useRouter } from "next/router";
import SendIcon from "@material-ui/icons/Send";

const Login = () => {
  const router = useRouter();

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

  const [resetModal, setResetModal] = useState({
    visible: false,
    inputEmail: "",
    submitted: false,
  });

  // Disable Login Btn untill all fields are filled
  function disableLoginBtn(): boolean {
    const { email, password } = userLoginInfo;
    if ((email && password) === "") return true;
    else return false;
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
              login(userLoginInfo, setLoginState);
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
              Have you forgotten your{" "}
              <span
                onClick={() => {
                  setResetModal((prevResetModal) => {
                    return { ...prevResetModal, visible: true };
                  });
                }}
              >
                password?
              </span>
            </h5>
            <Button
              className={styles.brandBtn}
              type="submit"
              variant="outlined"
              disabled={disableLoginBtn()}
              endIcon={<SendIcon />}
            >
              Log in
            </Button>
          </form>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={resetModal?.visible}
        onClose={() => {
          setResetModal((prevResetModal) => {
            return { ...prevResetModal, visible: false };
          });
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={resetModal?.visible}>
          <div className={styles.resetModal}>
            <h3>We regret to hear you loose your password</h3>
            <h5>But no worries, we will send you a link to reset it</h5>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                resetPassword(setLoginState, resetModal, setResetModal);
              }}
            >
              {resetModal?.submitted ? (
                <h1>We have sent you an email for password reset</h1>
              ) : (
                <Fragment>
                  <TextField
                    className={styles.formInput}
                    onChange={(e) => {
                      setResetModal((prevResetModal) => {
                        return {
                          ...prevResetModal,
                          inputEmail: e.target.value,
                        };
                      });
                    }}
                    value={resetModal?.inputEmail}
                    required
                    fullWidth
                    variant="outlined"
                    label="Email"
                    type="email"
                  />
                  <Button
                    fullWidth
                    className={styles.brandBtn}
                    type="submit"
                    variant="outlined"
                    disabled={resetModal?.inputEmail === ""}
                  >
                    Log in
                  </Button>
                </Fragment>
              )}
            </form>
          </div>
        </Fade>
      </Modal>
      {PopAlert(loginState, setLoginState)}
    </Fragment>
  );
};

export default Login;
