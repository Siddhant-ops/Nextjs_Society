import { Button, ButtonGroup, TextField } from "@mui/material";
import { useState } from "react";
import { AccountInfo } from "../../../pages/Profile/[ProfileUsername]";
import styles from "../../../styles/Profile/Account.module.scss";
import { saveProfileInfo } from "../../../Utils/Firebase/DB/dbHelpers";
import PopAlert, { AlertStateType } from "../../Alert/PopAlert";

const Account = ({ accountInfo }: { accountInfo: AccountInfo }) => {
  const [edit, setEdit] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: accountInfo?.name,
    phoneNum: accountInfo?.phoneNum,
    email: accountInfo?.email,
    flatNumber: accountInfo?.flatNum,
    password: "",
  });

  const [updateProfileState, setUpdateProfileState] = useState<AlertStateType>({
    severity: "info",
    message: "",
    visible: false,
  });

  const disableBtn = () => {
    if (
      !edit ||
      (userInfo?.email &&
        userInfo?.flatNumber &&
        userInfo?.name &&
        userInfo?.phoneNum) === ""
    )
      return true;
  };

  function toDateTime(secs) {
    var t = new Date(Date.UTC(1970, 0, 1)); // Epoch
    t.setUTCSeconds(secs);
    return t;
  }

  return (
    <div className={styles.container}>
      <h1>Account</h1>
      <h5>
        Account Created on :{" "}
        {toDateTime(accountInfo?.accountCreated).toDateString()}
      </h5>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveProfileInfo(setUpdateProfileState, userInfo);
        }}
      >
        <TextField
          disabled={!edit}
          className={styles.formInput}
          onChange={(e) => {
            if (edit) {
              setUserInfo((prevUserInfo) => {
                return { ...prevUserInfo, name: e.target.value };
              });
            }
          }}
          value={userInfo?.name}
          required
          fullWidth
          variant="outlined"
          label="Name"
          type="text"
        />
        <TextField
          disabled={!edit}
          className={styles.formInput}
          onChange={(e) => {
            if (edit) {
              setUserInfo((prevUserInfo) => {
                return { ...prevUserInfo, phoneNum: e.target.value };
              });
            }
          }}
          value={userInfo?.phoneNum}
          required
          fullWidth
          variant="outlined"
          label="Phone Number"
          type="text"
        />
        <TextField
          disabled={!edit}
          className={styles.formInput}
          onChange={(e) => {
            if (edit) {
              setUserInfo((prevUserInfo) => {
                return { ...prevUserInfo, email: e.target.value };
              });
            }
          }}
          value={userInfo?.email}
          required
          fullWidth
          variant="outlined"
          label="Email"
          type="email"
        />
        <TextField
          disabled={!edit}
          className={styles.formInput}
          onChange={(e) => {
            if (edit) {
              setUserInfo((prevUserInfo) => {
                return { ...prevUserInfo, flatNumber: e.target.value };
              });
            }
          }}
          value={userInfo?.flatNumber}
          required
          fullWidth
          variant="outlined"
          label="Flat Number"
          type="text"
        />
        <TextField
          disabled={!edit}
          className={styles.formInput}
          onChange={(e) => {
            if (edit) {
              setUserInfo((prevUserInfo) => {
                return { ...prevUserInfo, password: e.target.value };
              });
            }
          }}
          value={userInfo?.password}
          fullWidth
          variant="outlined"
          label="New Password"
          type="password"
        />
        <div className={styles.btnContainer}>
          <Button
            onClick={() => {
              setEdit((prevEdit) => {
                return !prevEdit;
              });
            }}
          >
            {!edit ? "turn on edit" : "turn off edit"}
          </Button>
          <Button type="submit" disabled={disableBtn()}>
            Save
          </Button>
        </div>
      </form>
      {PopAlert(updateProfileState, setUpdateProfileState)}
    </div>
  );
};

export default Account;
