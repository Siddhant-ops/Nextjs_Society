import {
  Button,
  ButtonGroup,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import { NextComponentType } from "next";
import { useState } from "react";
import {
  SocietyData,
  UserCountData,
} from "../../../pages/Profile/[ProfileUsername]";
import styles from "../../../styles/Profile/Society.module.scss";

const Society = ({
  societyData,
  userCountData,
}: {
  societyData: SocietyData;
  userCountData: UserCountData;
}) => {
  const [edit, setEdit] = useState(false);
  const [societyInfo, setSocietyInfo] = useState({
    societyName: societyData?.societyName,
    societyId: societyData?.societyId,
    societyAddress: societyData?.societyAddress,
  });

  const disableBtn = () => {
    if (
      !edit ||
      (societyInfo?.societyName &&
        societyInfo?.societyId &&
        societyInfo?.societyAddress) === ""
    )
      return true;
  };

  return (
    <div className={styles.container}>
      <div className={styles.col1}>
        <div className={styles.colContainer}>
          <h1>Society Information</h1>
          <form>
            <TextField
              disabled={!edit}
              onChange={(e) => {
                setSocietyInfo((prevSocietyInfo) => {
                  return { ...prevSocietyInfo, societyName: e.target.value };
                });
              }}
              value={societyInfo?.societyName}
              required
              fullWidth
              variant="outlined"
              type="text"
              label="Society Name"
            />
            <TextField
              disabled={!edit}
              onChange={(e) => {
                setSocietyInfo((prevSocietyInfo) => {
                  return { ...prevSocietyInfo, societyId: e.target.value };
                });
              }}
              value={societyInfo?.societyId}
              required
              fullWidth
              variant="outlined"
              type="text"
              label="Society Id"
            />
            <TextareaAutosize
              disabled={!edit}
              onChange={(e) => {
                setSocietyInfo((prevSocietyInfo) => {
                  return {
                    ...prevSocietyInfo,
                    societyAddress: e.target.value,
                  };
                });
              }}
              value={societyInfo?.societyAddress}
              required
              placeholder="Society Address *"
              minRows={4}
              maxRows={10}
              className={styles.form__textArea}
            />
            <ButtonGroup
              color="inherit"
              fullWidth
              size="large"
              variant="outlined"
              aria-label="text button group"
            >
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
            </ButtonGroup>
          </form>
        </div>
      </div>
      <div className={styles.col2}>
        <div className={styles.colContainer}>
          <h1>Users</h1>
          <div className={styles.itemContainer}>
            {Object.keys(userCountData).map((values, index) => {
              return (
                <div key={index} className={styles.items}>
                  <h5>{values}</h5>
                  <h5>{userCountData[values]}</h5>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Society;
