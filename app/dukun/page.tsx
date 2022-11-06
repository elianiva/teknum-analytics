import { BASE_URL } from "~/utils/constant";
import { get, set } from "~/utils/cache";
import { getMedal } from "~/utils/medal";
import styles from "~/styles/users.module.css";
import { classNames } from "~/utils/styles";

export default async function DukunPage() {
  const data = await getDukunData();

  return (
    <table className={styles.list}>
      <thead>
        <tr>
          <th className={styles.list__header}>No</th>
          <th className={styles.list__header}>Name</th>
          <th className={classNames(styles.list__header, styles.frozen_column)}>
            Points
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ firstName, lastName, points, userName }, idx) => (
          <tr key={idx}>
            <td className={styles.list__no}>{idx + 1}.</td>
            <td className={styles.list__name}>
              <span style={{ whiteSpace: "nowrap" }}>
                {firstName + (lastName && ` ${lastName}`)}
                {userName ? (
                  <a
                    className={styles.list__username}
                    href={`https://t.me/${userName}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    @{userName}
                  </a>
                ) : (
                  <span className={styles.list__no_username}>no username</span>
                )}
                {getMedal(idx + 1)}
              </span>
            </td>
            <td
              className={classNames(styles.list__score, styles.frozen_column)}
            >
              <span>🪙 {points}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

type Dukun = {
  userID: number;
  firstName: string;
  lastName: string;
  userName: string;
  points: number;
  master: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function getDukunData(): Promise<Dukun[]> {
  const cached = get<Dukun[]>("dukun");
  if (cached) return cached;

  const res = await fetch(`${BASE_URL}/dukun`);
  const dukun = (await res.json()) as Dukun[];
  const sortedDukun = dukun.sort((a, b) => b.points - a.points);

  set("dukun", sortedDukun);

  return sortedDukun;
}
