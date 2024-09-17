"use client";

import React from "react";
import { Commitment } from "../../data/types";
import HeaderSection from "./headersection";
import CommitmentOverview from "./commitmentoverview";
import UtilizationChart from "./utilizationchart";
import ServicesAndMetrics from "./servicesandmetrics";
import DecompositionTable from "./decompositiontable";


interface CommitmentSidePanelProps {
  commitment: Commitment;
  onClose: () => void;
}

const CommitmentSidePanel: React.FC<CommitmentSidePanelProps> = ({
  commitment,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-y-0 right-0 w-1/2 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto"
      style={{ top: "48px", height: "calc(100vh - 48px)" }}
    >
      <div className="p-6">
        <HeaderSection commitment={commitment} onClose={onClose} />
        <CommitmentOverview commitment={commitment} />
        <UtilizationChart commitment={commitment} />
        <ServicesAndMetrics commitment={commitment} />
        <DecompositionTable metrics={commitment.metrics} />
      </div>
    </div>
  );
};

export default CommitmentSidePanel;
