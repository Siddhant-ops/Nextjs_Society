import {
  Dispatch,
  Fragment,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import Image from "next/image";
import {
  SnackbarCloseReason,
  Button,
  TextField,
  ButtonGroup,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import styles from "../styles/Login.module.scss";

const Login = () => {
  // Get current user
  // const [{ user }, dispatch] = useStateValue();

  // loginDetails
  const [userLoginInfo, setUserLoginInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Alert Config
  const [loginState, setLoginState] = useState({
    visible: false,
    severity: "info",
    message: "",
  });

  // Login func
  // const submitForm = (userInfo: userInfoType) => {
  //   // const data = {
  //   //   username: "hudsud",
  //   //   email: "me@google.com",
  //   //   password: "Siddhandihayf$6678knn",
  //   // };
  //   const res = login(userInfo, setLoginState, dispatch);
  // };

  // Disable Login Btn untill all fields are filled
  // function disableLoginBtn(userInfo: userInfoType): boolean {
  //   const { username, email, password } = userInfo;
  //   if ((username && email && password) === "") return true;
  //   else return false;
  // }

  // Clear form after submission
  function clearForm() {
    setUserLoginInfo({ username: "", email: "", password: "" });
  }

  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <Image src="/static/Images/1 1.svg" layout="fill" objectFit="cover" />
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
                  return { ...prevUserLoginInfo, username: e.target.value };
                });
              }}
              value={userLoginInfo?.username}
              required
              fullWidth
              variant="outlined"
              label="Username"
              type="text"
            />
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
            <a href="https://google.com">Forgot password</a>
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
      {/* {showToast(loginState, setLoginState)} */}
    </Fragment>
  );
};

export default Login;

// function showToast(
//   loginState: loginStateType,
//   setLoginState: Dispatch<SetStateAction<loginStateType>>
// ) {
//   function closeToast(
//     event: SyntheticEvent<any, Event>,
//     reason?: SnackbarCloseReason
//   ) {
//     setLoginState({
//       visible: false,
//       severity: "info",
//       message: "",
//     });
//   }

//   return (
//     <Snackbar
//       open={loginState.visible}
//       autoHideDuration={5000}
//       onClose={closeToast}
//     >
//       <Alert onClose={closeToast} severity={loginState.severity}>
//         {loginState.message}
//       </Alert>
//     </Snackbar>
//   );
// }
