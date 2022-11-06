import type { Serie } from "@nivo/line";
import { fixDate } from "~/utils/fixDate";
import { get, set } from "~/utils/cache";
import { BASE_URL } from "~/utils/constant";
import { HourlyGraph } from "./hourly-graph";

export default async function HourlyPage() {
  const hourlyMessages = await getHourlyMesssages();

  return <HourlyGraph data={hourlyMessages} />;
}

const HOUR_MAP = {
  zero_hour: "07:00",
  one_hour: "08:00",
  two_hour: "09:00",
  three_hour: "10:00",
  four_hour: "11:00",
  five_hour: "12:00",
  six_hour: "13:00",
  seven_hour: "14:00",
  eight_hour: "15:00",
  nine_hour: "16:00",
  ten_hour: "17:00",
  eleven_hour: "18:00",
  twelve_hour: "19:00",
  thirteen_hour: "20:00",
  fourteen_hour: "21:00",
  fifteen_hour: "22:00",
  sixteen_hour: "23:00",
  seventeen_hour: "00:00",
  eighteen_hour: "01:00",
  nineteen_hour: "02:00",
  twenty_hour: "03:00",
  twentyone_hour: "04:00",
  twentytwo_hour: "05:00",
  twentythree_hour: "06:00",
};

async function getHourlyMesssages(): Promise<Serie[]> {
  const cached = get<Serie[]>("hourly");
  if (cached) return cached;

  const res = await fetch(`${BASE_URL}/hourly`);
  const data = await res.json();

  const hourly = data.reduce((acc: Serie[], { todays_date, ...hourly }) => {
    return acc.concat({
      id: fixDate(todays_date),
      data: Object.keys(hourly).map((key) => ({
        x: HOUR_MAP[key],
        y: hourly[key],
      })),
    });
  }, [] as Serie[]);

  set("hourly", hourly);

  return hourly;
}
