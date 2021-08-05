import { Fragment, useState } from "react";
import Image from "next/image";
import { Button, TextField, ButtonGroup } from "@material-ui/core";
import styles from "../styles/Login.module.scss";
import PopAlert, { AlertStateType } from "../Components/Alert/PopAlert";

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
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <Image
            src="/static/Images/Components/Login/Login.svg"
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
            <h2>
              Hey there,
              <br />
              just checking if it's really <span>you</span>
            </h2>
            <TextField
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
            <Button variant="outlined" color="secondary">
              Forgot Password
            </Button>
            <ButtonGroup fullWidth={true} variant="text" color="primary">
              <Button type="submit">Login</Button>
              <Button
                onClick={() => {
                  clearForm();
                }}
                type="reset"
                color="secondary"
              >
                Clear form
              </Button>
            </ButtonGroup>
          </form>
        </div>
      </div>
      {PopAlert(loginState, setLoginState)}
    </Fragment>
  );
};

export default Login;
