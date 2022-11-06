import styles from "~/styles/total.module.css";
import { get, set } from "~/utils/cache";
import { BASE_URL } from "~/utils/constant";

export default async function Page() {
  const total = await getMessagesTotal();

  return (
    <div className={styles.box}>
      <span className={styles.notice}>
        Total messages since 6th of November 2022
      </span>
      <span className={styles.total}>{total}</span>
    </div>
  );
}

async function getMessagesTotal(): Promise<number> {
  const cached = get<number>("total");
  if (cached) return cached;

  const res = await fetch(`${BASE_URL}/total`);
  const total = await res.text();
  const totalNumber = parseInt(total);

  set("total", totalNumber);

  return totalNumber;
}
