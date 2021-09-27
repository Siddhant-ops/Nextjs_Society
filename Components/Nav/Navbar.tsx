import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Navbar/Navbar.module.scss";
import { IconButton } from "@mui/material";
import { Fragment, useEffect } from "react";
import { useAuth } from "../../Utils/Firebase/Auth/auth";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { NextComponentType } from "next";

const Navbar: NextComponentType = () => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 10) {
        document.getElementById("nav").classList.add(styles.navFixed);
        document.getElementById("nav").classList.remove(styles.nav);
      } else {
        document.getElementById("nav").classList.remove(styles.navFixed);
        document.getElementById("nav").classList.add(styles.nav);
      }
    });
    window.removeEventListener("scroll", () => {
      if (window.scrollY >= 10) {
        document.getElementById("nav").classList.add(styles.navFixed);
        document.getElementById("nav").classList.remove(styles.nav);
      } else {
        document.getElementById("nav").classList.remove(styles.navFixed);
        document.getElementById("nav").classList.add(styles.nav);
      }
    });
  }, []);

  return (
    <nav id="nav" className={styles.nav}>
      <div className={styles.navContainer}>
        <div className={styles.navWrapper}>
          <IconButton
            onClick={() => {
              document.querySelector("#navUl").classList.toggle(styles.ulOpen);
            }}
            className={styles.Menu}
          >
            <CircleOutlinedIcon />
          </IconButton>
          <Link href="/">
            <a className={styles.navLogoBox}>
              <Image src="/logo_1.png" layout="fill" objectFit="contain" />
            </a>
          </Link>
        </div>
        <ul id="navUl">
          {auth?.userObj && auth?.userObj?.role === "SECRETARY" ? (
            <Fragment>
              <li>
                <Link href="/Contact">
                  <a
                    className={
                      router.pathname == "/Contact" ? styles.active : ""
                    }
                  >
                    <h5>Contact</h5>
                  </a>
                </Link>
              </li>
              {/* <li>
                <Button
                  onClick={() => {
                    firebase.auth().signOut();
                  }}
                >
                  Log out
                </Button>
              </li> */}
              <li>
                <Link href="/Meet">
                  <a
                    className={
                      router.pathname.includes("/Meet") ? styles.active : ""
                    }
                  >
                    <h5>Meet</h5>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/Profile/${auth?.userObj?.user?.email}`}>
                  <a
                    className={
                      router.pathname ===
                      `/Profile/${auth?.userObj?.user?.email}`
                        ? styles.active
                        : ""
                    }
                  >
                    <h5>Profile</h5>
                  </a>
                </Link>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li>
                <Link href="/About">
                  <a
                    className={router.pathname == "/About" ? styles.active : ""}
                  >
                    <h5>About</h5>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/Contact">
                  <a
                    className={
                      router.pathname == "/Contact" ? styles.active : ""
                    }
                  >
                    <h5>Contact</h5>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/Login">
                  <a
                    className={
                      router.pathname === "/Login" ? styles.active : ""
                    }
                  >
                    <h5>Login</h5>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/SignUp">
                  <a
                    className={
                      router.pathname.includes("/SignUp") ? styles.active : ""
                    }
                  >
                    <h5>Sign-up</h5>
                  </a>
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
