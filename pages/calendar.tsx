import { ResponsiveTimeRange } from "@nivo/calendar";
import { fixDate } from "~/utils/fixDate";
import { get, set } from "~/utils/cache";
import { BASE_URL } from "~/utils/constant";
import { useMediaQuery } from "~/utils/mediaQuery";

export default function Calendar({ data: { sortedDaily, start, end } }) {
  const { isMobile } = useMediaQuery();

  const marginProps = isMobile
    ? { top: 32, right: 0, bottom: 0, left: 0 }
    : { top: 32, right: 20, bottom: 20, left: 20 };

  return (
    <div style={{ height: "20rem" }}>
      <ResponsiveTimeRange
        data={sortedDaily}
        from={start}
        to={end}
        emptyColor="#f7fafb"
        margin={marginProps}
        colors={["#BEE3F8", "#90CDF4", "#63B3ED", "#4299E1"]}
        monthLegendOffset={14}
        monthLegendPosition="before"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
      />
    </div>
  );
}

export async function getServerSideProps() {
  const cached = get("daily");
  if (cached) {
    return { props: { data: cached.data } };
  }

  const res = await fetch(`${BASE_URL}/hourly`);
  const data = await res.json();

  const daily = data.reduce((acc, { todays_date, ...hourly }) => {
    const total = Object.values(hourly).reduce((acc, curr) => acc + curr, 0);
    return acc.concat({ day: fixDate(todays_date), value: total });
  }, []);

  const sortedDaily = daily.sort(
    (a, b) =>
      new Date(a.day).getMilliseconds() - new Date(b.day).getMilliseconds()
  );

  const end = new Date(sortedDaily[sortedDaily.length - 1].day);
  end.setMonth(end.getMonth() + 1);

  const result = {
    sortedDaily,
    start: "2021-12-01",
    end: fixDate(`${end.getFullYear()}-${end.getMonth()}-${end.getDate()}`),
  };

  set("daily", { data: result });

  return {
    props: { data: result },
  };
}
