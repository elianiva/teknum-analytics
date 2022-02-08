import { ResponsiveLine } from "@nivo/line";
import { fixDate } from "#/utils/fixDate";
import { get, set } from "#/utils/cache";
import { BASE_URL } from "#/utils/constant";
import styles from "#/styles/tooltip.module.css";
import { useMediaQuery } from "#/utils/mediaQuery";

const customRenderTicks = ({ opacity, textAnchor, textBaseline, textX, textY, value, x, y, tickIndex }) => {
  // just render some of them so doesn't look crowded on mobile view
  if (tickIndex % 4 !== 0) return null;

  return (
    <g transform={`translate(${x + 10},${y}) rotate(45)`} style={{ opacity }}>
      <text
        alignmentBaseline={textBaseline}
        textAnchor={textAnchor}
        transform={`translate(${textX},${textY})`}
      >
        {value}
      </text>
    </g>
  );
};

export default function Hourly({ data }) {
  const { isMobile } = useMediaQuery();

  const marginProps = isMobile
    ? { top: 20, right: 10, bottom: 40, left: 50 }
    : { top: 20, right: 40, bottom: 40, left: 60 };

  const renderTickProps = isMobile ? { renderTick: customRenderTicks } : {};

  return (
    <div style={{ height: "22rem" }}>
      <ResponsiveLine
        data={data}
        margin={marginProps}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false
        }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 45,
          legendOffset: 36,
          legendPosition: "middle",
          ...renderTickProps,
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "messages",
          legendOffset: -45,
          legendPosition: "middle"
        }}
        colors={{ scheme: "purple_blue" }}
        pointSize={0}
        pointBorderWidth={1}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        enableGridX={false}
        enableGridY={false}
        tooltip={({ point }) => {
          const date = new Date(point.serieId).toLocaleDateString("en-UK", {
            month: "long",
            day: "numeric",
            year: "numeric"
          });
          return (
            <div
              className={styles.tooltip}
              style={{
                bottom: point.data.y > 300 ? "-5.5rem" : 0,
                right: "5rem"
              }}
            >
              <span>{date}</span>
              <span
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: "0.25rem"
                }}
              >
                <b>{point.data.y}</b> msg
              </span>
            </div>
          );
        }}
        theme={{
          tooltip: {
            container: {
              fontFamily: '"Rubik", sans-serif',
              fontWeight: 400
            }
          }
        }}
      />
    </div>
  );
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
  twentythree_hour: "06:00"
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
        y: hourly[key]
      }))
    });
  }, []);

  set("hourly", hourly);

  return { props: { data: hourly } };
}
