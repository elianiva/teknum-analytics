import { ResponsiveLine } from "@nivo/line";
import { fixDate } from "#/utils/fixDate";
import { get, set } from "#/utils/cache";
import { BASE_URL } from "#/utils/constant";

export default function Hourly({ data }) {
  return (
    <div style={{ height: "20rem" }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        curve="natural"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "time",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "messages",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        colors={{ scheme: "nivo" }}
        pointSize={4}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        enableGridX={false}
        enableGridY={false}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}

const HOUR_MAP = {
  zero_hour: "00:00",
  one_hour: "01:00",
  two_hour: "02:00",
  three_hour: "03:00",
  four_hour: "04:00",
  five_hour: "05:00",
  six_hour: "06:00",
  seven_hour: "07:00",
  eight_hour: "08:00",
  nine_hour: "09:00",
  ten_hour: "10:00",
  eleven_hour: "11:00",
  twelve_hour: "12:00",
  thirteen_hour: "13:00",
  fourteen_hour: "14:00",
  fifteen_hour: "15:00",
  sixteen_hour: "16:00",
  seventeen_hour: "17:00",
  eighteen_hour: "18:00",
  nineteen_hour: "19:00",
  twenty_hour: "20:00",
  twentyone_hour: "21:00",
  twentytwo_hour: "22:00",
  twentythree_hour: "23:00",
};

export async function getServerSideProps() {
  const cached = get("hourly");
  if (cached) {
    return { props: { data: cached } };
  }

  const res = await fetch(`${BASE_URL}/hourly`);
  const data = await res.json();

  const hourly = data.reduce((acc, { todays_date, ...hourly }) => {
    return acc.concat({
      id: fixDate(todays_date),
      data: Object.keys(hourly).map((key) => ({
        x: HOUR_MAP[key],
        y: hourly[key],
      })),
    });
  }, []);

  set("hourly", hourly);

  return { props: { data: hourly } };
}
