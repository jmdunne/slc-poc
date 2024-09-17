import React from "react";
import { Commitment } from "../../data/types";
import { LineChart } from "@carbon/charts-react";
import { ChartTabularData } from "@carbon/charts/interfaces";
import { Tile } from "@carbon/react";

interface UtilizationChartProps {
  commitment: Commitment;
}

const UtilizationChart: React.FC<UtilizationChartProps> = ({ commitment }) => {
  // Mock data; replace with real data
  const lineData: ChartTabularData = [
    { group: "Actual Usage", date: "2023-01", value: 60 },
    { group: "Actual Usage", date: "2023-02", value: 65 },
    { group: "Actual Usage", date: "2023-03", value: 70 },
    { group: "Actual Usage", date: "2023-04", value: 68 },
    {
      group: "Actual Usage",
      date: "2023-05",
      value: commitment.utilizationRate,
    },
    { group: "Committed", date: "2023-01", value: 100 },
    { group: "Committed", date: "2023-02", value: 100 },
    { group: "Committed", date: "2023-03", value: 100 },
    { group: "Committed", date: "2023-04", value: 100 },
    { group: "Committed", date: "2023-05", value: 100 },
  ];

  const lineOptions = {
    title: "Utilization chart",
    axes: {
      bottom: {
        title: "Month",
        mapsTo: "date",
        scaleType: "time",
      },
      left: {
        mapsTo: "value",
        title: "Utilization (%)",
        scaleType: "linear",
      },
    },
    height: "400px",
    curve: "curveMonotoneX",
  };

  return (
    <Tile className="mb-4">
      <LineChart data={lineData} options={lineOptions} />
    </Tile>
  );
};

export default UtilizationChart;
