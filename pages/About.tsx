import { Fragment } from "react";
import styles from "../styles/About.module.scss";

export default function About() {
  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.colContainer1}>
          <h1>features</h1>
        </div>
        <div className={styles.colContainer2}>
          <div className={styles.nestedCol1}>
            <div className={styles.card}>
              <h1>1.</h1>
              <h2>Feature</h2>
              <h5>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                cum voluptas incidunt aliquam perspiciatis autem sunt eaque
                aperiam placeat quidem, pariatur veritatis maiores repellendus
                at, veniam rem cumque! Excepturi, deserunt.
              </h5>
            </div>
            <div className={styles.card}>
              <h1>3.</h1>
              <h2>Feature</h2>
              <h5>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                cum voluptas incidunt aliquam perspiciatis autem sunt eaque
                aperiam placeat quidem, pariatur veritatis maiores repellendus
                at, veniam rem cumque! Excepturi, deserunt.
              </h5>
            </div>
            <div className={styles.card}>
              <h1>5.</h1>
              <h2>Feature</h2>
              <h5>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                cum voluptas incidunt aliquam perspiciatis autem sunt eaque
                aperiam placeat quidem, pariatur veritatis maiores repellendus
                at, veniam rem cumque! Excepturi, deserunt.
              </h5>
            </div>
            <div className={styles.card}>
              <h1>7.</h1>
              <h2>Feature</h2>
              <h5>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                cum voluptas incidunt aliquam perspiciatis autem sunt eaque
                aperiam placeat quidem, pariatur veritatis maiores repellendus
                at, veniam rem cumque! Excepturi, deserunt.
              </h5>
            </div>
            <div className={styles.card}>
              <h1>9.</h1>
              <h2>Feature</h2>
              <h5>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                cum voluptas incidunt aliquam perspiciatis autem sunt eaque
                aperiam placeat quidem, pariatur veritatis maiores repellendus
                at, veniam rem cumque! Excepturi, deserunt.
              </h5>
            </div>
          </div>
          <div className={styles.nestedCol2}>
            <div className={styles.card}>
              <h1>2.</h1>
              <h2>Feature</h2>
              <h5>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                cum voluptas incidunt aliquam perspiciatis autem sunt eaque
                aperiam placeat quidem, pariatur veritatis maiores repellendus
                at, veniam rem cumque! Excepturi, deserunt.
              </h5>
            </div>
            <div className={styles.card}>
              <h1>4.</h1>
              <h2>Feature</h2>
              <h5>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                cum voluptas incidunt aliquam perspiciatis autem sunt eaque
                aperiam placeat quidem, pariatur veritatis maiores repellendus
                at, veniam rem cumque! Excepturi, deserunt.
              </h5>
            </div>
            <div className={styles.card}>
              <h1>6.</h1>
              <h2>Feature</h2>
              <h5>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                cum voluptas incidunt aliquam perspiciatis autem sunt eaque
                aperiam placeat quidem, pariatur veritatis maiores repellendus
                at, veniam rem cumque! Excepturi, deserunt.
              </h5>
            </div>
            <div className={styles.card}>
              <h1>8.</h1>
              <h2>Feature</h2>
              <h5>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                cum voluptas incidunt aliquam perspiciatis autem sunt eaque
                aperiam placeat quidem, pariatur veritatis maiores repellendus
                at, veniam rem cumque! Excepturi, deserunt.
              </h5>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
