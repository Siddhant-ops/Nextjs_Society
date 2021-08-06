import Head from "next/head";
import Image from "next/image";
import { Fragment } from "react";
import styles from "../../styles/Home/Home_UserFalse.module.scss";
import { getImagePath } from "../../Utils/Helpers/images";

const Home_UserFalse = () => {
  return (
    <Fragment>
      <Head>
        <title>Society Manager</title>
      </Head>
      <div className={styles.container}>
        {/* <Toolbar id="back-to-top-anchor" /> */}
        <h1 className={styles.title}>Society Manager</h1>
        <hr />
        <h1>Featured Articles</h1>
        <div className={styles.HeroCard}>
          <div className={styles.HeroCardImageContainer}>
            {/* <Image
              className={styles.HeroCardImage}
              src={getImagePath()}
              layout="fill"
              objectFit="fill"
            /> */}
          </div>
          <div className={styles.HeroCardContent}>
            {/* {quoteArray.map((quote, index) => {
              return <h2 key={index}>{quote?.q}</h2>;
            })} */}
          </div>
        </div>
        <h4>All Articles</h4>
        {/* <div className={styles.CardGrid}>
              {res.map((res: Array<object>) => some(res))}
            </div> */}
      </div>
    </Fragment>
  );
};

export default Home_UserFalse;
