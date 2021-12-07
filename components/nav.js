import styles from "#/styles/nav.module.css";

export default function Nav({ pages, active }) {
  return (
    <nav className={styles.box__nav}>
      {pages.map(({ name, route }, idx) => (
        <div
          key={idx}
          className={[
            styles.nav__item,
            active === route && styles.nav__item_active,
          ].join(" ")}
        >
          {name}
        </div>
      ))}
    </nav>
  );
}
