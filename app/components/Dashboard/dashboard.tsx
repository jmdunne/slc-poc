"use client";

import React, { useState } from "react";
import CommitmentTable from "./commitmenttable";
import CommitmentSidePanel from "../CommitmentDetails/commitmentsidepanel";
import CommitmentTableSummary from "./commitmenttablesummary";
import { Commitment } from "../../data/types";
import { commitments } from "../../data/commitments"; // Import the commitments data
import CommitmentGraph from "./commitmentgraph";

const Dashboard: React.FC = () => {
  const [selectedCommitment, setSelectedCommitment] = useState<Commitment | null>(null);

  const handleRowClick = (commitment: Commitment) => {
    setSelectedCommitment(commitment);
  };

  const handlePanelClose = () => {
    setSelectedCommitment(null);
  };

  return (
    <div className="relative py-8">
      <CommitmentTableSummary commitments={commitments} />
      <CommitmentGraph commitments={commitments} />
      <CommitmentTable
        commitments={commitments}
        onRowClick={handleRowClick}
      />
      {selectedCommitment && (
        <CommitmentSidePanel
          commitment={selectedCommitment}
          onClose={handlePanelClose}
        />
      )}
    </div>
  );
};

export default Dashboard;
