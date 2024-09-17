import { useState, useCallback } from "react";

export function useTableSearch<T extends Record<string, unknown>>(initialData: T[]) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = initialData.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  return { searchTerm, filteredData, handleSearch };
}
