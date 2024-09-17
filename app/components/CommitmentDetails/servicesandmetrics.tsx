import React from "react";
import { Commitment } from "../../data/types";
import { Tile, Tag } from "@carbon/react";

interface ServicesAndMetricsProps {
  commitment: Commitment;
}

const ServicesAndMetrics: React.FC<ServicesAndMetricsProps> = ({ commitment }) => {
  return (
    <Tile className="mb-4">
      <h3 className="text-lg font-bold mb-2">Services and Metrics</h3>
      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-1">Services</p>
        <div className="flex flex-wrap gap-2">
          {commitment.services.map((service, index) => (
            <Tag key={index} type="blue" size="sm">
              {service}
            </Tag>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">Metrics Committed</p>
        <div className="flex flex-wrap gap-2">
          {commitment.metricsCommitted.map((metric, index) => (
            <Tag key={index} type="green" size="sm">
              {metric}
            </Tag>
          ))}
        </div>
      </div>
    </Tile>
  );
};

export default ServicesAndMetrics;
