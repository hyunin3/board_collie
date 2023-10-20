// components/SearchBar.tsx
import React from 'react';
import { InputBase, Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar: React.FC = () => {
  return (
    <Paper component="form" sx={{ display: 'flex', alignItems: 'center', padding: '2px 4px', maxWidth: 400 }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="보드게임 검색"
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;
