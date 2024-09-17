import React from "react";
import { Commitment } from "../../data/types";
import { Tile, ProgressBar, Theme } from "@carbon/react";

interface CommitmentOverviewProps {
  commitment: Commitment;
}

const CommitmentOverview: React.FC<CommitmentOverviewProps> = ({ commitment }) => {
  return (
    <Theme theme="white">
      <Tile className="mb-4">
        <h3 className="text-lg font-bold mb-4">Commitment Overview</h3>
        <div className="md:flex-row justify-between items-center mb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Committed Spend</p>
            <p className="text-xl font-bold">${commitment.totalCommittedSpend.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Actual Spend</p>
            <p className="text-xl font-bold">${commitment.totalActualSpend.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Savings</p>
            <p className="text-xl font-bold">${commitment.totalSavings.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Utilization Rate</p>
            <p className="text-xl font-bold">{commitment.utilizationRate}%</p>
          </div>
        </div>
        </div>
        <div className="mb-4">
          <Theme theme="g10">
            <ProgressBar
              value={(commitment.totalActualSpend / commitment.totalCommittedSpend) * 100}
            max={100}
            label="Spend Progress"
              helperText={`$${commitment.totalActualSpend.toLocaleString()} of $${commitment.totalCommittedSpend.toLocaleString()}`}
            />
          </Theme>
        </div>
      </Tile>
    </Theme>
  );
};

export default CommitmentOverview;