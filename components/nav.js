import styles from "#/styles/nav.module.css";
import Link from "next/link";

export default function Nav({ pages, active }) {
  return (
    <nav className={styles.box__nav}>
      {pages.map(({ name, route }, idx) => (
        <Link key={idx} href={route}>
          <a
            className={[
              styles.nav__item,
              active === route && styles.nav__item_active,
            ].join(" ")}
          >
            {name}
          </a>
        </Link>
      ))}
    </nav>
  );
}
