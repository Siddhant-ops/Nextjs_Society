import { Fragment, useState } from "react";
import Image from "next/image";
import {
  Button,
  TextField,
  ButtonGroup,
  TextareaAutosize,
} from "@material-ui/core";
import styles from "../../styles/SignUp/Secretary.module.scss";
import PopAlert, { AlertStateType } from "../../Components/Alert/PopAlert";
import { useAuth } from "../../Utils/Firebase/Auth/auth";
import { signUp_Secretary } from "../../Utils/Firebase/Auth/authHelpers";

const Member = () => {
  const auth = useAuth();

  // loginDetails
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

  const [formNum, setFormNum] = useState(0);

  // Disable Login Btn untill all fields are filled
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
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <Image
            src="/static/Images/Components/SignUp/image_2.png"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={styles.formContainer}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signUp_Secretary(userSignUpInfo, setSignUpState, auth?.setUser);
            }}
          >
            <h2>
              Hey there chief, SignUp <span>here</span>
            </h2>
            {formNum === 0 && (
              <Fragment>
                <h4>Personal Details</h4>
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
                <Button
                  variant="outlined"
                  disabled={
                    (userSignUpInfo.name && userSignUpInfo.phoneNum) === ""
                      ? true
                      : false
                  }
                  color="secondary"
                  fullWidth
                  onClick={() => {
                    setFormNum(1);
                  }}
                >
                  Next
                </Button>
              </Fragment>
            )}
            {formNum === 1 && (
              <Fragment>
                <h4>Account Info</h4>
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
                <ButtonGroup fullWidth={true} variant="text" color="primary">
                  <Button
                    onClick={() => {
                      setFormNum(0);
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    disabled={
                      (userSignUpInfo.email &&
                        userSignUpInfo.password &&
                        userSignUpInfo.societyFlatNum) === ""
                        ? true
                        : false
                    }
                    onClick={() => {
                      setFormNum(2);
                    }}
                  >
                    Next
                  </Button>
                </ButtonGroup>
              </Fragment>
            )}
            {formNum === 2 && (
              <Fragment>
                <h4>Society Info</h4>
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
                  placeholder="Society Address"
                  minRows={4}
                  maxRows={10}
                  className={styles.form__textArea}
                />
                <ButtonGroup fullWidth={true} variant="text" color="primary">
                  <Button
                    onClick={() => {
                      setFormNum(1);
                    }}
                  >
                    Back
                  </Button>
                  <Button disabled={disableSignUpBtn()} type="submit">
                    Submit
                  </Button>
                  <Button
                    onClick={() => {
                      clearForm();
                      setFormNum(0);
                    }}
                    type="reset"
                    color="secondary"
                  >
                    clear form
                  </Button>
                </ButtonGroup>
              </Fragment>
            )}
          </form>
        </div>
      </div>
      {PopAlert(signUpState, setSignUpState)}
    </Fragment>
  );
};

export default Member;
