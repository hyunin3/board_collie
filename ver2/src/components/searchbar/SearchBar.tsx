import React, { useState, CSSProperties } from 'react';
import { TextField, Grid, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  onSearch: (query: string) => void;
  style?: CSSProperties; 
}

const SearchBar: React.FC<Props> = ({ onSearch, style }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => { 
    onSearch(inputValue);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2} style={{ marginTop: '15px', ...style }}>
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
              fontFamily: 'Jua, sans-serif',
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
      <Button 
          variant="contained" 
          onClick={handleSearchClick}
          sx={{
            borderRadius: '15px', 
            backgroundColor: '#FDCD51',
            fontFamily: 'Jua, sans-serif',
            paddingX: '30px',
            color: 'black',
          }}
        >
          검색
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
