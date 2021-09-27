import Link from "next/link";
import styles from "../../../styles/Profile/Contact.module.scss";

const Contact = () => {
  return (
    <div className={styles.container}>
      <h1>Contact Committee</h1>
      <div className={styles.itemContainer}>
        <div className={styles.itemHeader}>
          <h5>Name</h5>
          <h5>Email</h5>
          <h5>Profile</h5>
        </div>
        <div className={styles.items}>
          <h5>Kasturi Patil</h5>
          <h5>kasturip343@gmail.com</h5>
          <Link href="/">
            <a className={styles.linkProfile}>View</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
