"use client";

import { type CalendarData, ResponsiveTimeRange } from "@nivo/calendar";
import { useMediaQuery } from "~/utils/mediaQuery";

export function CalendarGraph({ data, from, to }: CalendarData) {
  const { isMobile } = useMediaQuery();
  const marginProps = isMobile
    ? { top: 32, right: 0, bottom: 0, left: 0 }
    : { top: 32, right: 20, bottom: 20, left: 20 };

  return (
    <div style={{ height: "20rem" }}>
      <ResponsiveTimeRange
        data={data}
        from={from}
        to={to}
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
