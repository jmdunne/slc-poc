"use client";

import React, { useState } from "react";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell, Tag, Button, Pagination, ProgressBar } from "@carbon/react";
import { Commitment } from "../../data/types";
import SearchBar from "./search";
import { Theme } from '@carbon/react';

interface CommitmentTableProps {
  commitments: Commitment[];
  onRowClick: (commitment: Commitment) => void;
}

const CommitmentTable: React.FC<CommitmentTableProps> = ({
  commitments,
  onRowClick,
}) => {
  const [filteredCommitments, setFilteredCommitments] = useState(commitments);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const headers = [
    { key: "id", header: "Commitment ID/Name" },
    { key: "services", header: "Services" },
    { key: "spendAndProgress", header: "Spend & Progress" },
    { key: "totalSavings", header: "Total Savings" },
    { key: "utilizationRate", header: "Utilization Rate (%)" },
    { key: "metricsCommitted", header: "Metrics Committed" },
    { key: "termDuration", header: "Term Duration" },
    { key: "actions", header: "Actions" },
  ];
  
  const handleSearch = (searchTerm: string) => {
    const filtered = commitments.filter((commitment) =>
      commitment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commitment.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCommitments(filtered);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  // Sort commitments by ID to ensure CMT-001 is first and CMT-007 is last
  const sortedCommitments = filteredCommitments.sort((a, b) => a.id.localeCompare(b.id));

  const paginatedCommitments = sortedCommitments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <Theme theme="g10">
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader key={header.key}>{header.header}</TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCommitments.map((commitment) => (
              <TableRow key={commitment.id}>
                <TableCell>
                  <p className="font-medium">{commitment.id}</p>
                  <p className="text-sm text-gray-500">{commitment.name}</p>
                </TableCell>
                <TableCell>
                  <Tag type="blue" size="sm">
                    {commitment.services.length}
                  </Tag>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="flex-grow">
                      <Theme theme="white">
                        <ProgressBar
                          value={(commitment.totalActualSpend / commitment.totalCommittedSpend) * 100}
                          max={100}
                          size="big"
                          label="Spend Progress"
                          hideLabel
                        />
                      </Theme>
                    </div>
                    <div className="flex-shrink-0 text-xs">
                      ${commitment.totalCommittedSpend}
                    </div>
                  </div>
                </TableCell>
                <TableCell>${commitment.totalSavings}</TableCell>
                <TableCell>{commitment.utilizationRate}%</TableCell>
                <TableCell>
                  <Tag type="blue" size="sm">
                    {commitment.metricsCommitted.length}
                  </Tag>
                </TableCell>
                <TableCell>
                  {commitment.startDate} - {commitment.endDate}
                </TableCell>
                <TableCell>
                  <Button kind="ghost" onClick={() => onRowClick(commitment)}>
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          totalItems={filteredCommitments.length}
          pageSize={pageSize}
          pageSizes={[10, 20, 30, 40, 50]}
          page={currentPage}
          onChange={handlePageChange}
          size="lg"
        />
      </Theme>
    </>
  );
};

export default CommitmentTable;
