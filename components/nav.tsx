"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "~/styles/nav.module.css";
import { useMediaQuery } from "~/utils/mediaQuery";

export default function Nav({ pages }) {
  const { isMobile } = useMediaQuery();
  const pathname = usePathname();

  return (
    <nav className={styles.box__nav}>
      {pages.map(({ icon, name, route }, idx: number) => (
        <Link
          key={idx}
          href={route}
          className={[
            styles.nav__item,
            pathname === route && styles.nav__item_active,
          ].join(" ")}
        >
          <span>{`${icon} ${!isMobile ? name : ""}`}</span>
        </Link>
      ))}
    </nav>
  );
}
