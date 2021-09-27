import Head from "next/head";
import styles from "../../../styles/Home/Home_UserFalse.module.scss";
import SecurityIcon from "@mui/icons-material/Security";
import GroupsIcon from "@mui/icons-material/Groups";
const Home_UserFalse = () => {
  return (
    <div className={styles.mainContainer}>
      <Head>
        <title>Society Manager</title>
      </Head>
      <div className={styles.container1}>
        <div className={styles.containerCol1}></div>
        <div className={styles.containerCol2}>
          <div className={styles.wrapper}>
            <h3>What is</h3>
            <h1>Society manager</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel alias
              molestias omnis earum modi harum fugit minus, in sint corrupti cum
              quas quisquam a obcaecati nulla, dolorum cupiditate, asperiores
              dolorem.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.container2}>
        <div className={styles.containerCol1}>
          <div className={styles.wrapper}>
            <SecurityIcon fontSize="large" />
            <h3>What is</h3>
            <h1>Society manager</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel alias
              molestias omnis earum modi harum fugit minus, in sint corrupti cum
              quas quisquam a obcaecati nulla, dolorum cupiditate, asperiores
              dolorem.
            </p>
          </div>
        </div>
        <div className={styles.containerCol2}>
          <div className={styles.wrapper}>
            <GroupsIcon fontSize="large" />
            <h3>What is</h3>
            <h1>Society manager</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel alias
              molestias omnis earum modi harum fugit minus, in sint corrupti cum
              quas quisquam a obcaecati nulla, dolorum cupiditate, asperiores
              dolorem.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.container3}>
        <h3>society manager</h3>
        <h1>for everyone</h1>
        <h5>
          Securing and managing a community is complex. We make it simple for:
        </h5>
        <div className={styles.colContainer}>
          <div className={styles.containerCol1}>
            <div className={styles.wrapper}>
              <h1>1.</h1>
              <h3>developing &</h3>
              <h3>MANAGEMENT</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                alias molestias omnis earum modi harum fugit minus, in sint
                corrupti cum quas quisquam a obcaecati nulla, dolorum
                cupiditate, asperiores dolorem.
              </p>
            </div>
          </div>
          <div className={styles.containerCol2}>
            <div className={styles.wrapper}>
              <h1>2.</h1>
              <h3>co-operative</h3>
              <h3>MANAGEMENT</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                alias molestias omnis earum modi harum fugit minus, in sint
                corrupti cum quas quisquam a obcaecati nulla, dolorum
                cupiditate, asperiores dolorem.
              </p>
            </div>
          </div>
          <div className={styles.containerCol3}>
            <div className={styles.wrapper}>
              <h1>3.</h1>
              <h3>security</h3>
              <h3>MANAGEMENT</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                alias molestias omnis earum modi harum fugit minus, in sint
                corrupti cum quas quisquam a obcaecati nulla, dolorum
                cupiditate, asperiores dolorem.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container4}>
        <h3>why choose </h3>
        <h1>society manager?</h1>
        <h5>
          For the very same reasons the other millions-plus homes around India
          have chosen us
        </h5>
        <div className={styles.featureList}></div>
      </div>
    </div>
  );
};

export default Home_UserFalse;
