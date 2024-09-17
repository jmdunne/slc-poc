import React from "react";
import { Commitment } from "../../data/types";
import { Tile } from "@carbon/react";
import { Theme } from '@carbon/react';
import { calculateCommitmentSummary } from "../../utils/commitmentCalculations";

interface CommitmentTableSummaryProps {
  commitments: Commitment[];
}

const CommitmentTableSummary: React.FC<CommitmentTableSummaryProps> = ({ commitments }) => {
  const summary = calculateCommitmentSummary(commitments);

  return (
    <Theme theme="g10">
      <Tile className="mb-0.5">
        <h3 className="text-lg font-bold mb-4">Commitment Usage</h3>
        <div className="mb-2 grid grid-cols-4 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Committed Spend</p>
            <p className="text-xl font-bold">${summary.totalCommittedSpend.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Actual Spend</p>
            <p className="text-xl font-bold">${summary.totalActualSpend.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Commitments</p>
            <p className="text-xl font-bold">{summary.totalCommitments}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Savings</p>
            <p className="text-xl font-bold">${summary.totalSavings.toLocaleString()}</p>
          </div>
        </div>
      </Tile>
    </Theme>
  );
};

export default CommitmentTableSummary;
