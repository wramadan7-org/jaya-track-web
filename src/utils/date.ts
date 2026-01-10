export const getDateTime = (utc: Date): { date: string; time: string } => {
  const year = utc.getFullYear();
  const month =
    utc.getMonth() + 1 <= 9
      ? `0${utc.getMonth() + 1}`
      : `${utc.getMonth() + 1}`;
  const date = utc.getDate() <= 9 ? `0${utc.getDate()}` : utc.getDate();
  const hh = String(utc.getHours()).padStart(2, "0");
  const mm = String(utc.getMinutes()).padStart(2, "0");

  const time = `${hh}:${mm}`;

  return {
    date: `${year}-${month}-${date}`,
    time: time,
  };
};
