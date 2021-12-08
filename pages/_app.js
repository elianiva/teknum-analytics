import { useRouter } from "next/router";
import Nav from "#/components/nav";
import SEO from "#/components/seo";
import styles from "#/styles/index.module.css";
import "#/styles/globals.css";
import "@fontsource/rubik/400.css";
import "@fontsource/rubik/600.css";
import { useEffect, useState } from "react";

const pages = [
  { name: "#️⃣  Total", route: "/" },
  { name: "👤 Users", route: "/users" },
  { name: "🔮 Dukun", route: "/dukun" },
  { name: "🕒 Hourly", route: "/hourly" },
  { name: "📅 Calendar", route: "/calendar" },
];

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
    };
  }, [router]);

  return (
    <>
      <SEO />
      <div className={styles.container}>
        <div className={styles.backdrop}></div>
        <h1 className={styles.title}>TEKNUM ANALYTICS</h1>
        <div className={styles.box}>
          {isLoading && <div className={styles.loading}>Loading data...</div>}
          <Nav pages={pages} active={router.asPath} />
          <div className={styles.box__content}>
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </>
  );
}
