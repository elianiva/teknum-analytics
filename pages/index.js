import styles from "#/styles/total.module.css";
import { get, set } from "#/utils/cache";
import { BASE_URL } from "#/utils/constant";

export default function Total({ data }) {
  return (
    <div className={styles.box}>
      <span className={styles.notice}>
        Total messages since 5th of December 2021
      </span>
      <span className={styles.total}>{data}</span>
    </div>
  );
}

export async function getServerSideProps() {
  const cached = get("total");
  if (cached) {
    return { props: { data: cached } };
  }

  const res = await fetch(`${BASE_URL}/total`);
  const total = await res.json();

  set("total", total);

  return { props: { data: total } };
}
