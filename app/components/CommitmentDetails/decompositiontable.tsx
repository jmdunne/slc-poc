import React, { useState, useCallback } from "react";
import { Metric } from "../../data/types";
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Theme,
  Pagination,
  Search
} from "@carbon/react";

interface DecompositionTableProps {
  metrics: Metric[];
}

const DecompositionTable: React.FC<DecompositionTableProps> = ({ metrics }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const headers = [
    { key: "metricName", header: "Metric Name" },
    { key: "serviceName", header: "Service Name" },
    { key: "unitsCommitted", header: "Units Committed" },
    { key: "unitsUsed", header: "Units Used" },
    { key: "utilization", header: "Utilization (%)" },
    { key: "unitCost", header: "Unit Cost" },
    { key: "committedUnitsCost", header: "Committed Units Cost" },
    { key: "totalMetricCost", header: "Total Metric Cost" },
    { key: "totalCostUsed", header: "Total Cost Used" },
    { key: "status", header: "Status" },
  ];

  const filteredRows = metrics
    .filter((metric) =>
      Object.values(metric).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .map((metric, index) => ({
      id: String(index),
      metricName: metric.metricName,
      serviceName: metric.serviceName,
      unitsCommitted: metric.unitsCommitted.toLocaleString(),
      unitsUsed: metric.unitsUsed.toLocaleString(),
      utilization: `${metric.utilization}%`,
      unitCost: `$${metric.unitCost.toFixed(2)}`,
      committedUnitsCost: `$${(metric.unitsCommitted * metric.unitCost).toLocaleString()}`,
      totalMetricCost: `$${metric.totalCostCommitted.toLocaleString()}`,
      totalCostUsed: `$${metric.totalCostUsed.toLocaleString()}`,
      status: metric.status,
    }));

  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = useCallback((data: { page: number; pageSize: number }) => {
    setCurrentPage(data.page);
    setPageSize(data.pageSize);
  }, []);

  const totalCommittedSpend = metrics.reduce((total, metric) => total + metric.totalCostCommitted, 0);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-4">Commitment Decomposition</h3>
      <Search
        id="search-table"
        labelText="Search"
        placeholder="Search table"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Theme theme="white">
        <DataTable rows={paginatedRows} headers={headers} isSortable>
          {({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
            <Table {...getTableProps()} useZebraStyles>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader key={header.key} {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id} {...getRowProps({ row })}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DataTable>
        <Pagination
          totalItems={filteredRows.length}
          pageSize={pageSize}
          pageSizes={[10, 20, 30, 40, 50]}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Theme>
    </div>
  );
};

export default DecompositionTable;
