import React, { useState } from 'react';
import { TextField, Grid, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => { 
    onSearch(inputValue);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2} style={{ marginBottom: '20px' }}>
      <Grid item xs={4}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="제목이나 태그를 입력해주세요"
          InputProps={{
            endAdornment: <SearchIcon  style={{ marginRight: '10px' }} />,
            sx: {
              height: '6vh',
              borderRadius: '30px',
              backgroundColor: isFocused ? 'white' : '#e7e7e7',
            },
          }}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: isFocused ? "" : 'none',
              height: '6vh',
            },
          }}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained" color="primary" onClick={handleSearchClick}>
          검색
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
