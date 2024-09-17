import { useState, useCallback } from "react";

export function useTablePagination<T>(data: T[], initialPageSize: number = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = useCallback(
    (data: { page: number; pageSize: number }) => {
      setCurrentPage(data.page);
      setPageSize(data.pageSize);
    },
    []
  );

  return { currentPage, pageSize, paginatedData, handlePageChange };
}
