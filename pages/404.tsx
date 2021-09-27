import styles from "../styles/404.module.scss";
import Image from "next/image";
import Link from "next/link";

const page404 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/static/Images/404.svg" layout="fill" objectFit="contain" />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.content}>
          <h1>apologies,</h1>
          <h4>we couldn't find the page you were looking for</h4>
          <Link href="/">
            <a>go to homepage</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page404;
