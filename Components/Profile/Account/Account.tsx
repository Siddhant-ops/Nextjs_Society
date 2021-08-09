import { Button, ButtonGroup, TextField } from "@material-ui/core";
import { useState } from "react";
import styles from "../../../styles/Profile/Account.module.scss";

const Account = ({ accountInfo }) => {
  const [userInfo, setUserInfo] = useState({
    name: accountInfo?.name,
    phoneNum: accountInfo?.phoneNum,
    email: accountInfo?.email,
    flatNumber: accountInfo?.flatNum,
  });

  return (
    <div className={styles.container}>
      <h1>Account</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <TextField
          className={styles.formInput}
          onChange={(e) => {
            setUserInfo((prevUserInfo) => {
              return { ...prevUserInfo, name: e.target.value };
            });
          }}
          value={userInfo?.name}
          required
          fullWidth
          variant="outlined"
          label="Name"
          type="text"
        />
        <TextField
          className={styles.formInput}
          onChange={(e) => {
            setUserInfo((prevUserInfo) => {
              return { ...prevUserInfo, phoneNum: e.target.value };
            });
          }}
          value={userInfo?.phoneNum}
          required
          fullWidth
          variant="outlined"
          label="Phone Number"
          type="text"
        />
        <TextField
          className={styles.formInput}
          onChange={(e) => {
            setUserInfo((prevUserInfo) => {
              return { ...prevUserInfo, email: e.target.value };
            });
          }}
          value={userInfo?.email}
          required
          fullWidth
          variant="outlined"
          label="Email"
          type="email"
        />
        <TextField
          className={styles.formInput}
          onChange={(e) => {
            setUserInfo((prevUserInfo) => {
              return { ...prevUserInfo, flatNumber: e.target.value };
            });
          }}
          value={userInfo?.flatNumber}
          required
          fullWidth
          variant="outlined"
          label="Flat Number"
          type="text"
        />
        <ButtonGroup
          color="inherit"
          fullWidth
          size="large"
          variant="outlined"
          aria-label="text button group"
        >
          <Button>Edit</Button>
          <Button>Save</Button>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default Account;
