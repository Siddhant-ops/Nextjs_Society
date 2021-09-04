import Link from "next/link";
import styles from "../../../styles/Profile/Manage.module.scss";

const Manage = () => {
  return (
    <div className={styles.container}>
      <h1>Manage Users</h1>
      <div className={styles.itemContainer}>
        <div className={styles.itemHeader}>
          <h5>Name</h5>
          <h5>Email</h5>
          <h5>Flat Number</h5>
        </div>
        <div className={styles.items}>
          <h5>Kasturi Patil</h5>
          <h5>kasturip343@gmail.com</h5>
          <h5>101</h5>
          <Link href="/">
            <a className={styles.linkProfile}>View</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Manage;
