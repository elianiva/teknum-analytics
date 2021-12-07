import { useRouter } from "next/router";
import Nav from "#/components/nav.js";
import styles from "#/styles/index.module.css";
import "#/styles/globals.css";

const pages = [
  { name: "Total", route: "/" },
  { name: "Users", route: "/users" },
  { name: "Hourly", route: "/hourly" },
  { name: "Calendar", route: "/calendar" },
];

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.backdrop}></div>
      <div className={styles.box}>
        <Nav pages={pages} active={router.asPath} />
        <div className={styles.box__content}>
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

export default MyApp;
