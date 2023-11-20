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
    background-color: #f4ede2;
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;

const FilterBar: React.FC<FilterBarProps> = ({ numberOfPlayers, setNumberOfPlayers, tagFilter, setTagFilter, style }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    setNumberOfPlayers(event.target.value === "all" ? '' : event.target.value);
  };

  const handleTagClick = (event: React.MouseEvent, tag: string) => {
    event.stopPropagation();
    if (tagFilter === tag) {
      setTagFilter(null);
    } else {
      setTagFilter(tag);
    }
  };

  const oldTagList = ["핸드 관리", "세트 모으기", "파티 게임", "어린이 게임", "카드 게임", "추리", "투표", "퍼즐", "주사위", "블러핑"];
  const newTagList = ["액션 / 손재주", "동물", "추상 전략", "실시간", "운 시험 게임", "타일 놓기", "치고받기", "경제", "패턴 구축", "팀전 게임", "판타지"];

  const renderValue = (selectedValue: string) => {
    if (selectedValue === '') {
      return <em>인원수</em>;
    }
    return selectedValue === "all" ? "상관없음" : `${selectedValue}명`;
  };
  
  return (
    <FilterBarContainer style={style}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} >
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
          <CustomSelect
            value={numberOfPlayers}
            onChange={handleChange}
            onClick={(event: React.MouseEvent) => event.stopPropagation()}
            displayEmpty
            renderValue={renderValue}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem disabled value="">
              <em>인원수</em>
            </MenuItem>
            <MenuItem value="">
              상관없음
            </MenuItem>
            {Array.from({ length: 8 }, (_, i) => i + 1).map(number => (
              <MenuItem value={number.toString()} key={number}>
                {number}인
              </MenuItem>
            ))}
          </CustomSelect>
        </FormControl>
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start', marginLeft: '60px' }}>
            {oldTagList.map(tag => (
              <Chip 
                key={tag} 
                label={tag} 
                onClick={(event) => handleTagClick(event, tag)} 
                style={{ margin: '4px' }}
                variant={tagFilter === tag ? 'filled' : 'outlined'}
              />
            ))}
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
  <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '195px' }}>
    {newTagList.map(tag => (
      <Chip 
        key={tag} 
        label={tag} 
        onClick={(event) => handleTagClick(event, tag)} 
        style={{ margin: '4px' }}
        variant={tagFilter === tag ? 'filled' : 'outlined'}
      />
    ))}
  </div>
</AccordionDetails>
    </FilterBarContainer>
  );
};

export default FilterBar;