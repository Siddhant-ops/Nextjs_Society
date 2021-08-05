import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/SignUp/index.module.scss";

const index = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mainCol1}>
        <h1>Members Only!!!</h1>
        <h3>
          Hey there, if you are a society member other than secretary, please
          signUp from here
        </h3>
        <h5>
          SignUp only if your society secretary has created an account and
          shared a referral code
        </h5>
        <Link href="/SignUp/Member">
          <a className={styles.link_btn}>Member SignUp</a>
        </Link>
      </div>
      <div className={styles.mainCol2}>
        <h1>Secretary Here!!!</h1>
        <h3>
          Hey there, if you are a society secretary, please signUp from here
        </h3>
        <h5>
          SignUp and we will generate a referral Code which is used to add
          members when they signUp
        </h5>
        <Link href="/SignUp/Secretary">
          <a className={styles.link_btn}>Secretary SignUp</a>
        </Link>
      </div>
      <div className={styles.mainCol3}>
        <div className={styles.infoBox}>
          <h5>
            referralCode is a secret six digit code which is usefull when
            members signup, it is created when secretary creates an account
          </h5>
        </div>
      </div>
    </div>
  );
};

export default index;
