import React from "react";
import { Commitment } from "../../data/types";
import { Button } from "@carbon/react";
import { Close, Download } from "@carbon/icons-react";

interface HeaderSectionProps {
  commitment: Commitment;
  onClose: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  commitment,
  onClose,
}) => {
  return (
    <div className="flex justify-between items-start pt-8 pb-16">
      <div>
        <h1 className="text-4xl font-light">{commitment.name}</h1>
        <p className="text-sm text-gray-600 mt-1">
          Term: {commitment.startDate} - {commitment.endDate} (
          {commitment.remainingDuration} remaining) • Last updated on{" "}
          {commitment.lastUpdatedDate}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button size="sm" kind="secondary" renderIcon={Download}>
          Export data
        </Button>
        <Button
          size="sm"
          kind="ghost"
          renderIcon={Close}
          iconDescription="Close"
          onClick={onClose}
          hasIconOnly
        />
      </div>
    </div>
  );
};

export default HeaderSection;
