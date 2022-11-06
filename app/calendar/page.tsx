import type { CalendarData, CalendarDatum } from "@nivo/calendar";
import { fixDate } from "~/utils/fixDate";
import { get, set } from "~/utils/cache";
import { BASE_URL } from "~/utils/constant";
import { CalendarGraph } from "./calendar-graph";

export default async function CalendarPage() {
  const calendarData = await getDailyMessages();

  if (calendarData.data.length < 1) {
    return (
      <div style={{ width: "100%" }}>
        <span
          style={{
            display: "block",
            fontSize: "1.5rem",
            padding: "2rem 0",
            fontFamily: "'Rubik', sans-serif",
            textAlign: "center",
          }}
        >
          Work in Progress
        </span>
      </div>
    );
  }

  return <CalendarGraph {...calendarData} />;
}

export async function getDailyMessages(): Promise<CalendarData> {
  // TODO: implement the endpoint
  return { data: [], from: "", to: "" };

  const cached = get<CalendarData>("daily");
  if (cached) return cached;

  const res = await fetch(`${BASE_URL}/daily`);
  const data = await res.json();

  const daily = data.reduce(
    (acc: CalendarDatum[], { todays_date, ...hourly }) => {
      const total = Object.values(hourly).reduce((acc, curr) => acc + curr, 0);
      return acc.concat({ day: fixDate(todays_date), value: total });
    },
    [] as CalendarDatum[]
  );

  const sortedDaily = daily.sort(
    (a: CalendarDatum, b: CalendarDatum) =>
      new Date(a.day).getMilliseconds() - new Date(b.day).getMilliseconds()
  );

  const end = new Date(sortedDaily[sortedDaily.length - 1].day);
  end.setMonth(end.getMonth() + 1);

  const dailyMessage = {
    data: sortedDaily,
    from: "2022-11-06",
    to: fixDate(`${end.getFullYear()}-${end.getMonth()}-${end.getDate()}`),
  };

  set("daily", dailyMessage);

  return dailyMessage;
}
