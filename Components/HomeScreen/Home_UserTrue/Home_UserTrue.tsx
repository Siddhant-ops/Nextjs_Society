import { Button } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { Fragment } from "react";
import styles from "../../../styles/Home/Home_UserTrue.module.scss";
import { CookieUser } from "../../../Utils/Firebase/Auth/auth";

const Home_UserTrue = ({ user }: { user: CookieUser }) => {
  useEffect(() => {
    const noticeList = document.getElementById("noticeList");
    noticeList.scrollTo(0, noticeList.scrollHeight);
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Society Manager - Home</title>
      </Head>
      <div className={styles.container1}>
        <div className={styles.colContainer1}>
          <h3>Feed</h3>
          <h1>Latest Events</h1>
        </div>
        <div id="noticeList" className={styles.colContainer2}>
          <div className={styles.card}>
            <div className={styles.cardTopSection}>
              <p>Members</p>
              <h4>2:45PM</h4>
            </div>
            <h1>Event Title</h1>
            <h5>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Similique quis, soluta totam, laudantium hic vel corrupti ipsum
              explicabo exercitationem maiores unde nemo! A rem porro quia
              cupiditate cumque iure totam?
            </h5>
            <h5>UPLOADED ON AUGUST 12, 2021</h5>
          </div>
          <div className={styles.card}>
            <div className={styles.cardTopSection}>
              <p>Members</p>
              <h4>2:45PM</h4>
            </div>
            <h1>Event Title</h1>
            <h5>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Similique quis, soluta totam, laudantium hic vel corrupti ipsum
              explicabo exercitationem maiores unde nemo! A rem porro quia
              cupiditate cumque iure totam?
            </h5>
            <h5>UPLOADED ON AUGUST 12, 2021</h5>
          </div>
          <div className={styles.card}>
            <div className={styles.cardTopSection}>
              <p>Members</p>
              <h4>2:45PM</h4>
            </div>
            <h1>Event Title</h1>
            <h5>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Similique quis, soluta totam, laudantium hic vel corrupti ipsum
              explicabo exercitationem maiores unde nemo! A rem porro quia
              cupiditate cumque iure totam?
            </h5>
            <h5>UPLOADED ON AUGUST 12, 2021</h5>
          </div>
          <div className={styles.card}>
            <div className={styles.cardTopSection}>
              <p>Members</p>
              <h4>2:45PM</h4>
            </div>
            <h1>Event Title</h1>
            <h5>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Similique quis, soluta totam, laudantium hic vel corrupti ipsum
              explicabo exercitationem maiores unde nemo! A rem porro quia
              cupiditate cumque iure totam?
            </h5>
            <h5>UPLOADED ON AUGUST 12, 2021</h5>
          </div>
        </div>
      </div>
      <div className={styles.container2}>
        <form className={styles.colContainer1}>
          <h2>Wanna share something, post here</h2>
          <div>
            <input type="text" placeholder="Title..." />
            <textarea
              rows={15}
              placeholder="Take the initiative, share with others"
            />
          </div>
          <Button className={styles.submitBtn}>Post</Button>
        </form>
        <div className={styles.colContainer2}>
          <Image
            src="/static/Images/Home/UserTrue/img1.svg"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Home_UserTrue;
