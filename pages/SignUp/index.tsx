import Link from "next/link";
import styles from "../../styles/SignUp/index.module.scss";
import { IconButton } from "@material-ui/core";
import { ArrowForwardIosOutlined } from "@material-ui/icons";
import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { tokenName, User } from "../../Utils/Firebase/Auth/auth";

const index = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Society Manager - SignUp</title>
      </Head>
      <div className={styles.col1}>
        <div className={styles.colContainer}>
          <h1>members</h1>
          <h4>
            If you are a society member other than secretary, please sign up
            from here
          </h4>
          <h5>
            Sign up only if your society secretary has created an account and
            shared a referral code.
          </h5>
          <Link href="/SignUp/Member">
            <a>
              <IconButton className={styles.forwardArrowBtn}>
                <ArrowForwardIosOutlined />
              </IconButton>
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.col2}>
        <div className={styles.colContainer}>
          <h1>secretary</h1>
          <h4>If you are a society secretary, please sign up from here</h4>
          <h5>
            Sign up and we will generate a referral code which is used to add
            members when they sign up.
          </h5>
          <Link href="/SignUp/Secretary">
            <a>
              <IconButton className={styles.forwardArrowBtn}>
                <ArrowForwardIosOutlined />
              </IconButton>
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.arrow}>
        <div className={styles.ball}></div>
        <div className={styles.line}></div>
      </div>
      <div className={styles.referralCodeHintDiv}>
        <p>
          Referral Code is secret code which is usefull when members sign up, it
          is created when secretary created an account
        </p>
      </div>
    </div>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const cookies = nookies.get(ctx);
  if (tokenName in cookies) {
    const cookieToken = cookies[tokenName];
    const token: User = JSON.parse(cookieToken);
    if (token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }
  return {
    props: {},
  };
};
