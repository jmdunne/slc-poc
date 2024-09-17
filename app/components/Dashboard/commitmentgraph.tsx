import React from "react";
import { GroupedBarChart } from "@carbon/charts-react";
import { Commitment } from "../../data/types";
import { Tile } from "@carbon/react";
import { Theme } from "@carbon/react";
import { ScaleTypes } from "@carbon/charts-react";

interface CommitmentGraphProps {
  commitments: Commitment[];
}

const CommitmentGraph: React.FC<CommitmentGraphProps> = ({ commitments }) => {
  const getLast12Months = () => {
    const months = [];
    const today = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push(d.toISOString().slice(0, 7)); // Format: YYYY-MM
    }
    return months;
  };

  const last12Months = getLast12Months();

  const data = commitments.flatMap((commitment) =>
    last12Months.map((month) => {
      const monthSpend = commitment.monthlySpend.find((spend) => spend.month === month);
      return {
        group: commitment.id,
        key: month,
        value: monthSpend ? monthSpend.actualSpend : 0,
      };
    })
  );

  const options = {
    title: "Monthly Actual Spend by Commitment",
    axes: {
      left: { mapsTo: "value", title: "Amount ($)" },
      bottom: { mapsTo: "key", title: "Month", scaleType: ScaleTypes.LABELS },
    },
    height: "450px",
    groupMapsTo: "group",
    legend: { alignment: "center" },
  };

  return (
    <Theme theme="g10">
      <Tile className="mb-4">
        <GroupedBarChart data={data} options={options} />
      </Tile>
    </Theme>
  );
};

export default CommitmentGraph;
