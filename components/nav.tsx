import styles from "~/styles/nav.module.css";
import Link from "next/link";
import { useMediaQuery } from "~/utils/mediaQuery";

export default function Nav({ pages, active }) {
  const { isMobile } = useMediaQuery();

  return (
    <nav className={styles.box__nav}>
      {pages.map(({ icon, name, route }, idx) => (
        <Link
          key={idx}
          href={route}
          className={[
            styles.nav__item,
            active === route && styles.nav__item_active,
          ].join(" ")}
        >
          <span>{`${icon} ${!isMobile ? name : ""}`}</span>
        </Link>
      ))}
    </nav>
  );
}
