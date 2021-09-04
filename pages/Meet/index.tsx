import styles from "../../styles/Meet/index.module.scss";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import {
  Button,
  Chip,
  Divider,
  IconButton,
  TextField,
} from "@material-ui/core";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import { DesktopDateTimePicker, MobileDateTimePicker } from "@material-ui/lab";
import { useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
const index = () => {
  const isSmallDevice = useMediaQuery("(min-width:600px)");
  const [value, setValue] = useState<Date | null>(
    new Date("2018-01-01T00:00:00.000Z")
  );
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
        <Divider style={{ width: "100%" }} />
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
              {isSmallDevice ? (
                <MobileDateTimePicker
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              ) : (
                <DesktopDateTimePicker
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            </LocalizationProvider>
            <Button className={styles.brandBtn}>Create</Button>
          </form>
        </div>
      </div>
      <div className={styles.col2}>
        <div className={styles.row1}>
          <div className={styles.box}>
            <h3>Upcoming</h3>
            <span>
              <h1>Meetings</h1>
              <IconButton style={{ border: "1px solid #141416" }} size="small">
                <ArrowForwardIosOutlinedIcon />
              </IconButton>
            </span>
          </div>
        </div>
        <div className={styles.row2}>
          <div className={styles.box}>
            <h3>Previous</h3>
            <span>
              <h1>Meetings</h1>
              <IconButton style={{ border: "1px solid #141416" }} size="small">
                <ArrowForwardIosOutlinedIcon />
              </IconButton>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
