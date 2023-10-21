import React, { useState } from 'react';
import { InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value); // 사용자가 검색어를 입력할 때마다 부모 컴포넌트에 알림
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <InputBase
        placeholder="Search…"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ paddingLeft: '10px' }}
      />
      <IconButton>
        <SearchIcon />
      </IconButton>
    </div>
  );
}

export default SearchBar;
