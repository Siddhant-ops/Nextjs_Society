import { Fragment, useState } from "react";
import Image from "next/image";
import { Button, TextField, ButtonGroup } from "@material-ui/core";
import styles from "../../styles/SignUp/Member.module.scss";
import PopAlert, { AlertStateType } from "../../Components/Alert/PopAlert";

const Member = () => {
  // loginDetails
  const [userSignUpInfo, setUserSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
    phoneNum: "",
    societyFlatNum: "",
    referralCode: "",
  });

  const [signUpState, setSignUpState] = useState<AlertStateType>({
    visible: false,
    severity: "info",
    message: "",
  });

  const [formNum, setFormNum] = useState(0);

  // Disable Login Btn untill all fields are filled
  function disableSignUpBtn(): boolean {
    const { name, email, password, referralCode, phoneNum, societyFlatNum } =
      userSignUpInfo;
    if (
      (name &&
        email &&
        password &&
        referralCode &&
        phoneNum &&
        societyFlatNum) === ""
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
    });
  }

  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <Image
            src="/static/Images/Components/SignUp/image_1.png"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={styles.formContainer}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(userSignUpInfo);
            }}
          >
            <h2>
              Hey there member, SignUp <span>here</span>
            </h2>
            {formNum === 0 ? (
              <Fragment>
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
                <Button
                  variant="outlined"
                  disabled={
                    (userSignUpInfo.name &&
                      userSignUpInfo.email &&
                      userSignUpInfo.password &&
                      userSignUpInfo.phoneNum) === ""
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
            ) : (
              <Fragment>
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
                  label="Society Flat Num"
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
                  label="ReferralCode"
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
