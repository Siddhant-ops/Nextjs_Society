import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { getImagePath } from "../Utils/Helpers/images";
import { useScrollTrigger, Zoom, Fab, Toolbar } from "@material-ui/core";
import { KeyboardArrowUp } from "@material-ui/icons";
import styles from "../styles/Home.module.scss";
import { Fragment } from "react";

interface Props {
  children: React.ReactElement;
}

function ScrollTop(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role="presentation"
        style={{ position: "fixed", bottom: "16px", right: "16px" }}
      >
        {children}
      </div>
    </Zoom>
  );
}

export default function Home({ res }) {
  const some = (res) => {
    return (
      <div key={res?.id} className={styles.Card}>
        <span>
          <small>March 05, 2021</small>
          <Link href="/">
            <a></a>
          </Link>
        </span>
        <h3>{res?.title}</h3>
      </div>
    );
  };

  if (!res) {
    return <h1>Loading</h1>;
  }

  return (
    <Fragment>
      <Head>
        <title>The BLOG</title>
      </Head>
      <div className={styles.container}>
        <Toolbar id="back-to-top-anchor" />
        <h1 className={styles.title}>The Blog</h1>
        <h1>Featured Article</h1>
        <div className={styles.HeroCard}>
          <div className={styles.HeroCardImageContainer}>
            <Image
              className={styles.HeroCardImage}
              src={getImagePath()}
              layout="fill"
              objectFit="fill"
            />
          </div>
          <div className={styles.HeroCardContent}>
            <small>March 05, 2021</small>
            <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
            <h5>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
              assumenda, porro, amet harum esse, illo reiciendis enim earum sunt
              cupiditate modi et iusto? Cum doloribus voluptatem dolores!
              Nesciunt, unde molestias.
            </h5>
          </div>
        </div>
        <h4>All Articles</h4>
        <div className={styles.CardGrid}>
          {res.map((res: Array<object>) => some(res))}
        </div>
        <ScrollTop>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUp />
          </Fab>
        </ScrollTop>
      </div>
    </Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const res: object = await fetch(
    "https://jsonplaceholder.typicode.com/posts/"
  ).then((resp) => {
    return resp.json();
  });

  if (!res) {
    return {
      notFound: true,
    };
  }

  return {
    props: { res },
  };
};
