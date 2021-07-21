import { Fragment, useState } from "react";
import styles from "../styles/Explore.module.scss";
import Loading from "../Utils/Loading/Loading";

export default function Explore() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <Fragment>
      <div className={styles.introContainer}>
        <h3>You searched for : {searchInput}</h3>
      </div>
      <Loading />
    </Fragment>
  );
}
