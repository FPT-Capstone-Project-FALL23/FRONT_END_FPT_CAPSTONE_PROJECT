import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 345, 4566, 30000];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
  "Page G",
  "Page G",
  "Page G",
  "Page G",
];

export default function ChartBars() {
  return (
    <BarChart
      width={500}
      height={300}
      series={[
        { data: pData, id: "pvId" },
        // { data: uData, label: "uv", id: "uvId" },
      ]}
      xAxis={[{ data: xLabels, scaleType: "band" }]}
    />
  );
}
