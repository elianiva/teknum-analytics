import { useRouter } from "next/router";
import Nav from "../components/nav.js";
import styles from "../styles/index.module.css";

const pages = [
  { name: "Total", route: "/" },
  { name: "Users", route: "/users" },
  { name: "Hourly", route: "/hourly" },
  { name: "Calendar", route: "/calendar" },
];

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.backdrop}></div>
      <div className={styles.box}>
        <Nav pages={pages} active={router.asPath} />
        <div className={styles.box__content}>
          <h1>Hello World</h1>
        </div>
      </div>
    </div>
  );
}
