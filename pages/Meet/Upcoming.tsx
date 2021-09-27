import styles from "../../styles/Meet/Upcoming.module.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button } from "@mui/material";

const Upcoming = () => {
  return (
    <div className={styles.container}>
      <h3>Upcoming</h3>
      <span>
        <h1>Meetings</h1>
        <KeyboardArrowDownIcon fontSize="large" />
      </span>
      <div className={styles.meetingsContainer}>
        <div className={styles.row}>
          <h5>Title</h5>
          <h5>Date</h5>
          <h5>Time</h5>
        </div>
        <div className={`${styles.row} ${styles.rowChildren}`}>
          <h5>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe
            ratione, obcaecati ex eligendi soluta aliquid facilis tenetur in
            reiciendis ipsum voluptates recusandae, fuga inventore, dignissimos
            velit dolore eius ipsa eveniet.
          </h5>
          <h5>12/03/2021</h5>
          <h5>12:45 AM</h5>
          <Button className={styles.actionBtn}>Edit</Button>
          <Button className={styles.actionBtn}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
