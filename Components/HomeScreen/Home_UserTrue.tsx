import Head from "next/head";
import { Fragment } from "react";
import styles from "../../styles/Home/Home_UserTrue.module.scss";
import Calendar from "./Calendar/Calendar";
import Feed from "./Feed/Feed";

interface Props {
  quoteArray: Array<{ a: string; h: string; q: string }>;
}

const Home_UserTrue = (props: Props) => {
  const { quoteArray } = props;

  return (
    <Fragment>
      <Head>
        <title>Society Manager</title>
      </Head>
      <div className={styles.container}>
        {/* <Toolbar id="back-to-top-anchor" /> */}
        <h1 className={styles.title}>Society Manager</h1>
        <hr />
      </div>
      <div className={styles.flexDiv}>
        <div className={styles.noticeBox}>
          <h4>Today's feed</h4>
          <hr />
          <Feed quote={quoteArray[0].q} />
        </div>
        <div className={styles.calendarBox}>
          <h4>Calendar</h4>
          <hr />
          <Calendar />
        </div>
      </div>
    </Fragment>
  );
};

export default Home_UserTrue;
