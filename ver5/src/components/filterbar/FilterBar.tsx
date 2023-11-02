import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from '@emotion/styled';

interface FilterBarProps {
  numberOfPlayers: string;
  setNumberOfPlayers: React.Dispatch<React.SetStateAction<string>>;
  style?: React.CSSProperties;
  tagFilter: string | null;
  setTagFilter: React.Dispatch<React.SetStateAction<string | null>>;
}

const FilterBarContainer = styled(Accordion)`
  background-color: #FFE090;
  box-shadow: none;
  &:before {
    display: none;
  }
`;

const CustomSelect = styled(Select<string>)`
  & .MuiSelect-select {
    padding: 6px 32px 6px 12px;
    border-radius: 15px;
    background-color: #D9D9D9;
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;

const FilterBar: React.FC<FilterBarProps> = ({ numberOfPlayers, setNumberOfPlayers, tagFilter, setTagFilter, style }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    setNumberOfPlayers(event.target.value);
  };

  const handleTagClick = (tag: string) => {
    if (tagFilter === tag) {
      setTagFilter(null);
    } else {
      setTagFilter(tag);
    }
  };

  const tagList = ["카드 게임", "어린이 게임", "추리", "투표", "퍼즐", "주사위"];


  const renderValue = (selectedValue: string) => {
    if (selectedValue === "") {
      return <em>인원수</em>;
    }
    if (selectedValue === "all") {
      return "상관없음";
    }
    return `${selectedValue}명`;
  };

  return (
    <FilterBarContainer style={style}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} >
        <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
          <CustomSelect
            value={numberOfPlayers}
            onChange={handleChange}
            displayEmpty
            renderValue={renderValue}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem disabled value="">
              <em>인원수</em>
            </MenuItem>
            <MenuItem value="all">
              상관없음
            </MenuItem>
            {Array.from({ length: 8 }, (_, i) => i + 1).map(number => (
              <MenuItem value={number.toString()} key={number}>
                {number}인
              </MenuItem>
            ))}
          </CustomSelect>
        </FormControl>
      </AccordionSummary>
      <AccordionDetails>
        {tagList.map(tag => (
          <Chip 
            key={tag} 
            label={tag} 
            onClick={() => handleTagClick(tag)} 
            style={{ margin: '4px' }}
            variant={tagFilter === tag ? 'filled' : 'outlined'}
          />
        ))}
      </AccordionDetails>
    </FilterBarContainer>
  );
};

export default FilterBar;
