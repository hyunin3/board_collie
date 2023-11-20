import React, { createContext, useState, useContext, ReactNode } from 'react';

type SearchContextType = {
  searchTag: string;
  setSearchTag: (tag: string) => void;
  searchType: string; 
  setSearchType: (type: string) => void; 
};

const SearchContext = createContext<SearchContextType>({
  searchTag: '',
  setSearchTag: () => {},
  searchType: 'title', 
  setSearchType: () => {} 
});


export const useSearch = () => useContext(SearchContext);

export const SearchProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [searchTag, setSearchTag] = useState('');
  const [searchType, setSearchType] = useState('title');
  return (
    <SearchContext.Provider value={{ searchTag, setSearchTag, searchType, setSearchType }}>
      {children}
    </SearchContext.Provider>
  );
};
