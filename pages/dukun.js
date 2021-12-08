import { BASE_URL } from "#/utils/constant";
import { get, set } from "#/utils/cache";
import { getMedal } from "#/utils/medal";
import styles from "#/styles/users.module.css";

export default function Dukun({ data }) {
  return (
    <table className={styles.list}>
      <thead>
        <tr>
          <th className={styles.list__header}>No</th>
          <th className={styles.list__header}>Name</th>
          <th className={styles.list__header}>Points</th>
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
            <td className={styles.list__score}>
              <span>🪙 {points}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export async function getServerSideProps() {
  const cached = get("dukun");
  if (cached) {
    return { props: { data: cached } };
  }

  const res = await fetch(`${BASE_URL}/dukun`);
  const users = await res.json();
  const sortedUsers = users.sort((a, b) => b.points - a.points);

  set("dukun", sortedUsers);

  return { props: { data: sortedUsers } };
}
