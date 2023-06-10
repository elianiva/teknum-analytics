import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import Nav from "~/components/nav";
import styles from "~/styles/index.module.css";
import "~/styles/globals.css";
import "@fontsource/rubik/400.css";
import "@fontsource/rubik/600.css";

const pages = [
  { icon: "#️⃣", name: "Total", route: "/" },
  { icon: "👤", name: "Users", route: "/users" },
  { icon: "🔮", name: "Dukun", route: "/dukun" },
  { icon: "🕒", name: "Hourly", route: "/hourly" },
  { icon: "📅", name: "Calendar", route: "/calendar" },
];

export default function RootLayout(props: PropsWithChildren<{}>) {

  return (
    <html>
      <body>
        <div className={styles.container}>
          <div className={styles.backdrop}></div>
          <h1 className={styles.title}>TEKNUM ANALYTICS</h1>
          <div className={styles.box}>
            <Nav pages={pages} />
            <div className={styles.box__content}>{props.children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
