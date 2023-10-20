// components/SearchFilterNavBar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import SearchBar from './SearchBar';

const SearchFilterNavBar: React.FC = () => {
  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          서치 필터
        </Typography>
        <SearchBar />
        <Button color="inherit">Filter</Button>
      </Toolbar>
    </AppBar>
  );
}

export default SearchFilterNavBar;
