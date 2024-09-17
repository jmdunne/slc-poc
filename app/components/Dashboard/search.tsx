import React from "react";
import { Search } from "@carbon/react";
import { Theme } from '@carbon/react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <Theme theme="g10">
    <Search
      size="lg"
      labelText="Search commitments"
      placeholder="Search by ID or name"
      onChange={(e: { target: HTMLInputElement; type: "change"; }) =>
        onSearch(e.target.value)
      }
    />
    </Theme>
  );
};

export default SearchBar;
