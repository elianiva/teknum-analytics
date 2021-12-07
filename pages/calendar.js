import { ResponsiveCalendar } from "@nivo/calendar";
import { fixDate } from "#/utils/fixDate";

export default function Calendar({ data }) {
  return (
    <div style={{ height: "18rem" }}>
      <ResponsiveCalendar
        data={data}
        from="2021-01-01"
        to="2021-12-31"
        emptyColor="#f7fafb"
        colors={["#BEE3F8", "#90CDF4", "#63B3ED", "#4299E1"]}
        monthBorderWidth={2}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
      />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://teknologi-umum-captcha.fly.dev/hourly");
  const data = await res.json();

  const daily = data.reduce((acc, { todays_date, ...hourly }) => {
    const total = Object.values(hourly).reduce((acc, curr) => acc + curr, 0);
    return acc.concat({ day: fixDate(todays_date), value: total });
  }, []);

  return { props: { data: daily } };
}
