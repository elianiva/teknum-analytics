export const getMedal = (rank) => {
  if (rank === 1) return " 🥇";
  if (rank === 2) return " 🥈";
  if (rank === 3) return " 🥉";
  return "";
};
