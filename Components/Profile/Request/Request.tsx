import styles from "../../../styles/Profile/Request.module.scss";

const Request = () => {
  return (
    <div className={styles.container}>
      <h1>Manage Requests</h1>
      <div className={styles.itemContainer}>
        <div className={styles.itemHeader}>
          <h5>Name</h5>
          <h5>Subject</h5>
          <h5>Date</h5>
        </div>
        <div className={styles.items}>
          <h5>Kasturi Patil</h5>
          <h5>Some Subject to talk on</h5>
          <h5>16 Jul, 21</h5>
        </div>
        <div className={styles.items}>
          <h5>Kasturi Patil</h5>
          <h5>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            laboriosam ipsum maxime commodi aliquid delectus excepturi explicabo
            est exercitationem autem cupiditate soluta ipsa accusamus vero quasi
            ullam, repellat tenetur! Corrupti.
          </h5>
          <h5>16 Jul, 21</h5>
        </div>
        <div className={styles.items}>
          <h5>Kasturi Patil</h5>
          <h5>Some Subject to talk on</h5>
          <h5>16 Jul, 21</h5>
        </div>
      </div>
    </div>
  );
};

export default Request;
