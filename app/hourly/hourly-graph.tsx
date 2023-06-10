"use client";

import type { SVGAttributes } from "react";
import type { AxisTickProps } from "@nivo/axes";
import { ResponsiveLine, type Serie } from "@nivo/line";
import styles from "~/styles/tooltip.module.css";
import { useMediaQuery } from "~/utils/mediaQuery";

const customRenderTicks = ({
  opacity,
  textAnchor,
  textBaseline,
  textX,
  textY,
  value,
  x,
  y,
  tickIndex,
}: AxisTickProps<any>) => {
  // just render some of them so doesn't look crowded on mobile view
  if (tickIndex % 4 !== 0) return null;

  return (
    <g transform={`translate(${x + 10},${y}) rotate(45)`} style={{ opacity }}>
      <text
        alignmentBaseline={
          textBaseline as SVGAttributes<SVGTextElement>["alignmentBaseline"]
        }
        textAnchor={textAnchor}
        transform={`translate(${textX},${textY})`}
      >
        {value}
      </text>
    </g>
  );
};

export function HourlyGraph(props: { data: Serie[] }) {
  const { isMobile } = useMediaQuery();

  const marginProps = isMobile
    ? { top: 20, right: 10, bottom: 40, left: 50 }
    : { top: 20, right: 40, bottom: 40, left: 60 };

  return (
    <div style={{ height: "22rem" }}>
      <ResponsiveLine
        data={props.data}
        margin={marginProps}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 45,
          legendOffset: 36,
          legendPosition: "middle",
          renderTick: isMobile ? customRenderTicks : undefined,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "messages",
          legendOffset: -45,
          legendPosition: "middle",
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
            year: "numeric",
          });
          return (
            <div
              className={styles.tooltip}
              style={{
                bottom: point.data.y > 300 ? "-5.5rem" : 0,
                right: "5rem",
              }}
            >
              <span>{date}</span>
              <span
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: "0.25rem",
                }}
              >
                <b>{point.data.y.toString()}</b> msg
              </span>
            </div>
          );
        }}
        theme={{
          tooltip: {
            container: {
              fontFamily: '"Rubik", sans-serif',
              fontWeight: 400,
            },
          },
        }}
      />
    </div>
  );
}
