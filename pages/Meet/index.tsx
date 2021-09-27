import styles from "../../styles/Meet/index.module.scss";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Button, Chip, Divider, IconButton, TextField } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DesktopDateTimePicker } from "@mui/lab";
import { useState } from "react";
import Link from "next/link";

const index = () => {
  const [value, setValue] = useState<Date | null>(new Date());
  return (
    <div className={styles.container}>
      <div className={styles.col1}>
        <div className={styles.box1}>
          <h5>Schedule</h5>
          <h3>Instant Meeting</h3>
          <form>
            <TextField
              style={{ borderBottom: "1px solid #141416" }}
              label="Title"
              variant="standard"
              fullWidth
              type="text"
            />
            <Button className={styles.brandBtn}>Create</Button>
          </form>
        </div>
        <Divider style={{ width: "100%" }}>
          <Chip label="Or" variant="outlined" />
        </Divider>
        <div className={styles.box2}>
          <h5>Schedule</h5>
          <h3>Meeting</h3>
          <form className={styles.scheduleMeeting}>
            <TextField
              style={{ borderBottom: "1px solid #141416" }}
              label="Title"
              variant="standard"
              fullWidth
              type="text"
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDateTimePicker
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Button
              style={{ width: "fit-content" }}
              className={styles.brandBtn}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
      <div className={styles.col2}>
        <div className={styles.row1}>
          <div className={styles.box}>
            <h3>Upcoming</h3>
            <span>
              <h1>Meetings</h1>
              <Link href="/Meet/Upcoming">
                <a>
                  <IconButton
                    style={{ border: "1px solid #141416" }}
                    size="small"
                  >
                    <ArrowForwardIosOutlinedIcon />
                  </IconButton>
                </a>
              </Link>
            </span>
          </div>
        </div>
        <div className={styles.row2}>
          <div className={styles.box}>
            <h3>Previous</h3>
            <span>
              <h1>Meetings</h1>
              <Link href="/Meet/Previous">
                <a>
                  <IconButton
                    style={{ border: "1px solid #141416" }}
                    size="small"
                  >
                    <ArrowForwardIosOutlinedIcon />
                  </IconButton>
                </a>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
