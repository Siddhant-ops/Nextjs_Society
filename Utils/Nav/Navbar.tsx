import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Fragment, FunctionComponent } from "react";
import { parseJwt } from "../Helpers/auth";
import { useStateValue } from "../AuthContext/stateProvider";

const Navbar: FunctionComponent = () => {
  const router = useRouter();
  const [{ user }] = useStateValue();

  return (
    <nav className={styles.nav}>
      <div className={styles.navWrapper}>
        <Link href="/">
          <a>
            <div className={styles.navLogoBox}>
              <h4>SM</h4>
            </div>
          </a>
        </Link>
        <IconButton
          onClick={() => {
            document.querySelector("#navUl").classList.toggle(styles.ulOpen);
          }}
          color="secondary"
          className={styles.Menu}
        >
          <MenuIcon color="secondary" />
        </IconButton>
      </div>
      <ul id="navUl">
        <li>
          <Link href="/Explore">
            <a className={router.pathname == "/Explore" ? styles.active : ""}>
              Explore
            </a>
          </Link>
        </li>
        <li>
          <Link href="/Contact">
            <a className={router.pathname == "/Contact" ? styles.active : ""}>
              Contact
            </a>
          </Link>
        </li>
        {user ? (
          <li>
            <Link href={`/Profile/${parseJwt(user)?.username}`}>
              <a
                className={
                  router.pathname === `/Profile/${parseJwt(user)?.username}`
                    ? styles.active
                    : ""
                }
              >
                Profile
              </a>
            </Link>
          </li>
        ) : (
          <Fragment>
            <li>
              <Link href="/Login">
                <a
                  className={router.pathname === "/Login" ? styles.active : ""}
                >
                  Login
                </a>
              </Link>
            </li>
            <li>
              <Link href="/Sign-up">
                <a>Sign-up</a>
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
